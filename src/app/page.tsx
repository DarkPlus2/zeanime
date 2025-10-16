import AnimeCard from "@/components/AnimeCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const animes = await prisma.anime.findMany({ take: 12 });
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Zeanime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
      </div>
    </div>
  );
}
