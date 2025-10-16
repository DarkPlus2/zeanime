import { prisma } from "./prisma";

export async function getAllAnimes() {
  return prisma.anime.findMany({
    include: { episodes: true },
    orderBy: { id: "asc" },
  });
}

export async function getAnimeBySlug(slug: string) {
  return prisma.anime.findUnique({
    where: { slug },
    include: { episodes: true },
  });
}
