import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Set in Vercel Environment Variables
  ssl: { rejectUnauthorized: false }
});
