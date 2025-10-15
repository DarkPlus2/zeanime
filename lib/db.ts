import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Vercel SSL
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
