import { pool } from "./connect.js";

export default async function handler(req, res) {
  try {
    const result = await pool.query("SELECT * FROM animes ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load anime list" });
  }
}
