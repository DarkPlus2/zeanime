import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default function Home({ animes, movies, series }: any) {
  return (
    <div className="p-6 space-y-10 text-white bg-zbg min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🎬 Zeanime Home</h1>

      <section>
        <h2 className="text-2xl mb-2">Trending Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {animes.map((anime: any) => (
            <Link href={`/anime/${anime.id}`} key={anime.id}>
              <div className="bg-zcard p-3 rounded-lg shadow hover:scale-105 transition">
                <img src={anime.thumbnail} alt={anime.title} className="rounded-md w-full" />
                <p className="mt-2 font-medium">{anime.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-2">Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-zcard p-3 rounded-lg shadow hover:scale-105 transition">
                <img src={movie.thumbnail} alt={movie.title} className="rounded-md w-full" />
                <p className="mt-2 font-medium">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-2">Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {series.map((s: any) => (
            <Link href={`/series/${s.id}`} key={s.id}>
              <div className="bg-zcard p-3 rounded-lg shadow hover:scale-105 transition">
                <img src={s.thumbnail} alt={s.title} className="rounded-md w-full" />
                <p className="mt-2 font-medium">{s.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const animes = await prisma.anime.findMany({ take: 8 });
  const movies = await prisma.movie.findMany({ take: 8 });
  const series = await prisma.series.findMany({ take: 8 });

  return {
    props: { animes, movies, series },
  };
};
