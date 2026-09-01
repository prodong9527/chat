import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | undefined;

export function getSql() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  sqlClient ??= neon(connectionString);
  return sqlClient;
}
