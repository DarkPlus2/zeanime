import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default function SeriesDetails({ series }: any) {
  if (!series) return <div className="text-white p-6">Series not found.</div>;

  return (
    <div className="bg-zbg text-white min-h-screen p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={series.thumbnail} alt={series.title} className="w-64 rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{series.title}</h1>
          <p className="text-gray-300 mt-3">{series.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Episodes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {series.episodes.map((ep: any) => (
            <Link href={`/watch/${ep.id}`} key={ep.id}>
              <div className="bg-zcard hover:bg-zaccent transition p-3 rounded-lg text-center cursor-pointer">
                Episode {ep.number}: {ep.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const series = await prisma.series.findUnique({
    where: { id: String(params?.id) },
    include: { episodes: true }
  });
  return { props: { series } };
};
