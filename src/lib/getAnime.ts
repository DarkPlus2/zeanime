import { prisma } from "./prisma";

export async function getAllAnimes() {
  return prisma.anime.findMany({
    include: { episodes: true },
    orderBy: { id: "asc" },
  });
}

export async function getAnimeById(id: number) {
  return prisma.anime.findUnique({
    where: { id },
    include: { episodes: true },
  });
}
