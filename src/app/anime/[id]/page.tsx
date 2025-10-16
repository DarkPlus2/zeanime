import { prisma } from "@/lib/prisma";
import AnimeDetails from "@/components/AnimeDetails";
import EpisodeList from "@/components/EpisodeList";

interface Props {
  params: { id: string };
}

export default async function AnimePage({ params }: Props) {
  const anime = await prisma.anime.findUnique({
    where: { id: Number(params.id) },
    include: { episodes: true },
  });

  if (!anime) return <p>Anime not found.</p>;

  return (
    <div className="space-y-6">
      <AnimeDetails anime={anime} />
      <h2 className="text-2xl font-bold mt-6">Episodes</h2>
      <EpisodeList episodes={anime.episodes} />
    </div>
  );
}
