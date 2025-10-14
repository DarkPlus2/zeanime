import { pool } from "./connect.js";

export default async function handler(req, res) {
  try {
    const result = await pool.query("SELECT * FROM animes ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database fetch error" });
  }
}
