import { GetServerSideProps } from "next";
import React from "react";
import { prisma } from "../../lib/db";

export default function MoviePage({ movie }: { movie: any }) {
  if (!movie) return <div className="p-6">Movie not found</div>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p className="text-gray-300 my-3">{movie.description}</p>
      <div className="bg-black aspect-video rounded overflow-hidden">
        <iframe src={movie.embedUrl} allowFullScreen className="w-full h-full border-none" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const movie = await prisma.movie.findUnique({ where: { id } });
  return { props: { movie: movie ?? null } };
};
