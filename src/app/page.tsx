import { prisma } from "@/lib/prisma";
import AnimeList from "@/components/AnimeList";
import { Anime } from "@/components/AnimeCard";

export default async function HomePage() {
  const animes: Anime[] = await prisma.anime.findMany({
    orderBy: { id: "asc" },
    take: 20,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Zeanime</h1>
      <AnimeList animes={animes} />
    </div>
  );
}
