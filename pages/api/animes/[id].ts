import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const adminKey = req.headers["x-admin-key"];

  if (req.method === "GET") {
    const { rows } = await query("SELECT * FROM animes WHERE id=$1", [id]);
    return res.status(200).json(rows[0]);
  }

  if (req.method === "DELETE") {
    if (adminKey !== process.env.ADMIN_KEY) return res.status(403).json({ error: "Unauthorized" });
    await query("DELETE FROM animes WHERE id=$1", [id]);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
