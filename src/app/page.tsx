import { prisma } from "@/lib/prisma";
import AnimeCard from "@/components/AnimeCard";

export default async function HomePage() {
  const animes = await prisma.anime.findMany({
    include: { genres: true },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Zeanime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
