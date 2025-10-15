import { pool } from "./connect.js";

export default async function handler(req, res) {
  try {
    const { title, description, poster, genres, type, hindi_dub } = req.body;

    const result = await pool.query(
      `INSERT INTO animes (title, description, poster, genres, type, hindi_dub)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, poster, genres, type, hindi_dub]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add anime" });
  }
}
