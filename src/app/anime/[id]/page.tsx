import { prisma } from "@/lib/prisma";
import PlayerEmbed from "@/components/PlayerEmbed";
import { notFound } from "next/navigation";

export default async function AnimePage({ params }) {
  const anime = await prisma.anime.findUnique({
    where: { id: Number(params.id) },
    include: { episodes: true }
  });
  if (!anime) return notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{anime.title}</h1>
      <p className="my-2">{anime.description}</p>
      {anime.episodes.map(ep => (
        <div key={ep.id} className="my-4">
          <h2 className="text-xl">{ep.title}</h2>
          <PlayerEmbed url={ep.url} />
        </div>
      ))}
    </div>
  );
}
