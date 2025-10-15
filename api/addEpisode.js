import { pool } from "./connect.js";

export default async function handler(req, res) {
  try {
    const {
      anime_id,
      episode_number,
      title,
      abyss_link,
      filemoon_link
    } = req.body;

    const result = await pool.query(
      `INSERT INTO episodes (anime_id, episode_number, title, abyss_link, filemoon_link, servers)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [anime_id, episode_number, title, abyss_link, filemoon_link, ["Abyss", "Filemoon"]]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add episode" });
  }
}
