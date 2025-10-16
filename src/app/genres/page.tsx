import { prisma } from "@/lib/prisma";
import AnimeList from "@/components/AnimeList";

export default async function GenresPage() {
  const genres = await prisma.genre.findMany({
    include: { animes: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Genres</h1>
      {genres.map((genre) => (
        <div key={genre.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{genre.name}</h2>
          <AnimeList animes={genre.animes} />
        </div>
      ))}
    </div>
  );
}
