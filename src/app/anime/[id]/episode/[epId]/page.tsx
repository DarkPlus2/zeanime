import { prisma } from "@/lib/prisma";
import PlayerEmbed from "@/components/PlayerEmbed";

interface Props {
  params: { id: string; epId: string };
}

export default async function EpisodePage({ params }: Props) {
  const episode = await prisma.episode.findUnique({
    where: { id: Number(params.epId) },
  });

  if (!episode) return <p>Episode not found.</p>;

  // Select the first non-null embed URL
  const url = episode.embedUrl1 || episode.embedUrl2 || episode.embedUrl3;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{episode.title}</h1>
      {url ? <PlayerEmbed url={url} /> : <p>No video available</p>}
    </div>
  );
}
