// lib/db.ts
import pkg from "pg";
const { Pool } = pkg;

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: any;
}

if (!process.env.DATABASE_URL) {
  throw new Error("Please set DATABASE_URL in env");
}

if (!global.__pgPool) {
  global.__pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
}

export const pool = global.__pgPool as pkg.Pool;

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params || []);
  return res;
}
