import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const animes = await prisma.anime.findMany();
    return res.json(animes);
  }

  if (req.method === "POST") {
    const { title, slug, thumbnail, type } = req.body;
    const anime = await prisma.anime.create({ data: { title, slug, thumbnail, type } });
    return res.json(anime);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await prisma.anime.delete({ where: { id: String(id) } });
    return res.json({ success: true });
  }

  return res.status(405).end();
}
