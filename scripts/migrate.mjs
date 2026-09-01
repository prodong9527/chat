import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const { neon } = await import("@neondatabase/serverless");
const migrationsDirectory = fileURLToPath(new URL("../db/migrations/", import.meta.url));
const sql = neon(process.env.DATABASE_URL);
const migrationFiles = (await readdir(migrationsDirectory))
  .filter((file) => file.endsWith(".sql"))
  .sort();

for (const file of migrationFiles) {
  const contents = await readFile(new URL(`../db/migrations/${file}`, import.meta.url), "utf8");
  const statements = contents
    .split(/^\s*-- migrate:break\s*$/m)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }
}
