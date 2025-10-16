import { GetServerSideProps } from "next";
import React from "react";
import { prisma } from "../../lib/db";
import Link from "next/link";

export default function SeriesPage({ series }: { series: any }) {
  if (!series) return <div className="p-6">Series not found</div>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{series.title}</h1>
      <p className="text-gray-300 my-3">{series.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {series.episodes.map((ep: any) => (
          <Link key={ep.id} href={`/watch/${series.id}/${ep.id}`}>
            <a className="p-2 bg-zcard rounded text-sm">{ep.title}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const series = await prisma.series.findUnique({
    where: { id },
    include: { episodes: { orderBy: { number: "asc" } } }
  });
  return { props: { series: series ?? null } };
}
