import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Anime
export async function getAnimes() {
  return prisma.anime.findMany({ include: { episodes: true } });
}
export async function getAnimeById(id: string) {
  return prisma.anime.findUnique({ where: { id }, include: { episodes: true } });
}

// Series
export async function getSeries() {
  return prisma.series.findMany({ include: { episodes: true } });
}

// Movies
export async function getMovies() {
  return prisma.movie.findMany();
}
