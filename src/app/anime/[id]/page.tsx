import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PlayerEmbed from "@/components/PlayerEmbed";
import AnimeDetails from "@/components/AnimeDetails";

type AnimePageProps = { params: { id: string } };

export default async function AnimePage({ params }: AnimePageProps) {
  const anime = await prisma.anime.findUnique({
    where: { id: Number(params.id) },
    include: { episodes: true, genres: true },
  });

  if (!anime) return notFound();

  return (
    <div>
      <AnimeDetails anime={anime} />
      <h2 className="text-2xl font-bold mt-6 mb-4">Episodes</h2>
      <div className="space-y-4">
        {anime.episodes.map((ep) => (
          <div key={ep.id}>
            <h3 className="font-semibold mb-2">{ep.title}</h3>
            <PlayerEmbed url={ep.embedUrl1} />
          </div>
        ))}
      </div>
    </div>
  );
}
