import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default function SeriesPage({ series }: any) {
  return (
    <div className="bg-zbg text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📺 Anime Series</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {series.map((s: any) => (
          <Link href={`/series/${s.id}`} key={s.id}>
            <div className="bg-zcard hover:bg-zaccent transition p-3 rounded-lg shadow-md">
              <img
                src={s.thumbnail}
                alt={s.title}
                className="rounded-lg w-full h-48 object-cover"
              />
              <p className="mt-2 text-sm font-semibold text-center">{s.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const series = await prisma.series.findMany();
  return { props: { series } };
};
