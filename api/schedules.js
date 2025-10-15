import { pool } from "./connect.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { anime_id, next_episode, estimated_date } = req.body;
      const result = await pool.query(
        `INSERT INTO schedules (anime_id, next_episode, estimated_date)
         VALUES ($1, $2, $3) RETURNING *`,
        [anime_id, next_episode, estimated_date]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add schedule" });
    }
  } else if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT * FROM schedules ORDER BY estimated_date ASC"
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch schedules" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
