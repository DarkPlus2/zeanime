import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers["x-admin-key"];

  if (req.method === "GET") {
    const filter = req.query.filter;
    const { rows } = await query(
      filter === "trending"
        ? "SELECT * FROM animes ORDER BY views DESC LIMIT 12"
        : filter === "latest"
        ? "SELECT * FROM animes ORDER BY created_at DESC LIMIT 12"
        : "SELECT * FROM animes ORDER BY title ASC"
    );
    return res.status(200).json(rows);
  }

  if (req.method === "POST") {
    if (adminKey !== process.env.ADMIN_KEY) return res.status(403).json({ error: "Unauthorized" });
    const { title, description, poster } = req.body;
    const { rows } = await query(
      "INSERT INTO animes(title, description, poster) VALUES($1,$2,$3) RETURNING *",
      [title, description, poster]
    );
    return res.status(201).json(rows[0]);
  }

  res.status(405).end();
}
