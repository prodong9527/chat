import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getSql } from "@/lib/db/client";

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = "huafu_admin";
const SESSION_SECONDS = 60 * 60 * 12;

export class AdminError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new AdminError(500, "admin session is not configured");
  return secret;
}

function sign(token: string) {
  return createHmac("sha256", sessionSecret()).update(token).digest("base64url");
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function sessionCookie(value: string, maxAge = SESSION_SECONDS) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function readCookie(request: Request, name: string) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim().split("=", 2))
    .find(([key]) => key === name)?.[1];
}

export async function verifyAdminPassword(password: string) {
  const encoded = process.env.ADMIN_PASSWORD_HASH;
  if (!encoded) throw new AdminError(500, "admin password is not configured");

  const [kind, salt, expected] = encoded.split("$");
  if (kind !== "scrypt" || !salt || !expected) return false;

  const actual = Buffer.from((await scrypt(password, Buffer.from(salt, "base64"), Buffer.from(expected, "base64").length)) as ArrayBuffer);
  const expectedBuffer = Buffer.from(expected, "base64");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export async function createAdminSession() {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  const sql = getSql();

  await sql`
    INSERT INTO admin_sessions (token_hash, expires_at)
    VALUES (${tokenHash(token)}, ${expiresAt}::timestamptz)`;

  return sessionCookie(`${token}.${sign(token)}`);
}

export function clearAdminSession() {
  return sessionCookie("", 0);
}

export async function requireAdmin(request: Request) {
  const signedToken = readCookie(request, COOKIE_NAME);
  const [token, signature] = signedToken?.split(".") ?? [];
  if (!token || !signature) throw new AdminError(401, "admin login required");

  const expected = sign(token);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new AdminError(401, "invalid admin session");
  }

  const sql = getSql();
  const rows = (await sql`
    SELECT id FROM admin_sessions
    WHERE token_hash = ${tokenHash(token)} AND expires_at > now()`) as unknown as { id: string }[];
  if (!rows[0]) throw new AdminError(401, "expired admin session");
  return { sessionId: rows[0].id };
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw new AdminError(403, "origin check failed");
  }
}

export function adminErrorResponse(error: unknown) {
  if (error instanceof AdminError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  return Response.json({ error: "admin request failed" }, { status: 500 });
}
