import { prisma } from "@/lib/db";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function AnimeDetails({ anime }: any) {
  return (
    <div className="p-6 text-white bg-zbg min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={anime.thumbnail} alt={anime.title} className="w-64 rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <p className="text-gray-300 mt-2">{anime.description}</p>
          <p className="mt-2 text-sm text-zaccent">
            {anime.genres.join(", ")} | {anime.status}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Episodes</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {anime.episodes.map((ep: any) => (
            <Link href={`/watch/${ep.id}`} key={ep.id}>
              <li className="bg-zcard p-3 rounded hover:bg-zaccent hover:text-white transition">
                Episode {ep.number}: {ep.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const anime = await prisma.anime.findUnique({
    where: { id: String(params?.id) },
    include: { episodes: true },
  });
  return { props: { anime } };
};
