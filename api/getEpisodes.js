import { pool } from "./connect.js";

export default async function handler(req, res) {
  try {
    const animeId = req.query.anime_id;

    const result = await pool.query(
      "SELECT * FROM episodes WHERE anime_id = $1 ORDER BY episode_number ASC",
      [animeId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
}
