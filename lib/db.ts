// lib/db.ts
import pkg from "pg";
const { Pool } = pkg;
let pool: pkg.Pool;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable not set");
}

if (!globalThis.__pgPool) {
  globalThis.__pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
}
pool = globalThis.__pgPool;

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res;
}
