import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { prisma } from "../lib/db";

type Props = { animes: any[] };

export default function Catalog({ animes }: Props) {
  // simple A–Z grouping on server side; here we just list
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((a) => (
          <Link key={a.id} href={`/anime/${a.id}`}>
            <a className="block bg-zcard rounded overflow-hidden hover:scale-105 transition">
              <img src={a.thumbnail} alt={a.title} className="w-full h-36 object-cover" />
              <div className="p-2 text-sm font-medium">{a.title}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const animes = await prisma.anime.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, thumbnail: true },
    take: 1000,
  });
  return { props: { animes } };
};
