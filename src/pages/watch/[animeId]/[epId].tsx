import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { prisma } from "../../../lib/db";

type Props = { anime: any; episode: any };

export default function WatchPage({ anime, episode }: Props) {
  const [embed, setEmbed] = useState<string>(episode?.embedUrl || "");
  if (!anime || !episode) return <div className="p-6">Not found.</div>;

  // If you store multiple servers as multiple Episode rows or JSON, adapt this to show server selector.
  // Here: episode.server and episode.embedUrl are used.
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">{anime.title} — {episode.title || `Episode ${episode.number}`}</h1>

      <div className="bg-black rounded overflow-hidden aspect-video">
        <iframe src={embed} allowFullScreen className="w-full h-full border-none" />
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          {/* Example server buttons (if multiple are stored, render them) */}
          <button className="px-3 py-1 bg-zcard rounded" onClick={() => setEmbed(episode.embedUrl)}>
            {episode.server}
          </button>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">All Episodes</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
          {anime.episodes.map((ep: any) => (
            <a key={ep.id} href={`/watch/${anime.id}/${ep.id}`} className="p-2 bg-zcard rounded text-sm">
              {ep.number ? `Ep ${ep.number}` : ep.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const animeId = ctx.params?.animeId as string;
  const epId = ctx.params?.epId as string;

  const anime = await prisma.anime.findUnique({
    where: { id: animeId },
    include: { episodes: { orderBy: { number: "asc" } } },
  });
  const episode = await prisma.episode.findUnique({ where: { id: epId } });

  return { props: { anime: anime ?? null, episode: episode ?? null } };
};
