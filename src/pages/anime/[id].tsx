import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { prisma } from "../../lib/db";

type Props = { anime: any };

export default function AnimePage({ anime }: Props) {
  if (!anime) return <div className="p-6">Anime not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="md:flex gap-6">
        <img src={anime.thumbnail} className="w-full md:w-48 rounded" />
        <div>
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          <p className="text-sm text-gray-300 my-3">{anime.description}</p>
          <div className="text-sm text-gray-400">Genres: {(anime.genres || []).join(", ")}</div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Episodes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {anime.episodes.map((ep: any) => (
            <Link key={ep.id} href={`/watch/${anime.id}/${ep.id}`}>
              <a className="p-2 bg-zcard rounded text-sm">{ep.number ? `Ep ${ep.number}` : ep.title}</a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const anime = await prisma.anime.findUnique({
    where: { id },
    include: { episodes: { orderBy: { number: "asc" } } },
  });
  return { props: { anime: anime ?? null } };
};
