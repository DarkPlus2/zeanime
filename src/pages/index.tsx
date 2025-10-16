import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { prisma } from "../lib/db";

type Props = { animes: any[] };

export default function Home({ animes }: Props) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Zeanime — Trending</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Latest</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {animes.map((a) => (
            <Link key={a.id} href={`/anime/${a.id}`}>
              <a className="block bg-zcard rounded overflow-hidden hover:scale-105 transition">
                <img src={a.thumbnail} alt={a.title} className="w-full h-44 object-cover" />
                <div className="p-2 font-semibold">{a.title}</div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const animes = await prisma.anime.findMany({
    orderBy: { releaseDate: "desc" },
    take: 24,
    select: { id: true, title: true, thumbnail: true },
  });
  return { props: { animes } };
};
