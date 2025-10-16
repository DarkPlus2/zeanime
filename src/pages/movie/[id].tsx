import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db";

export default function MovieDetails({ movie }: any) {
  if (!movie) return <div className="text-white p-6">Movie not found.</div>;

  return (
    <div className="bg-zbg text-white min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6">
        <img src={movie.thumbnail} alt={movie.title} className="w-64 rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-3">{movie.description}</p>
          <p className="mt-2 text-sm text-zaccent">{movie.isDub ? "Dubbed" : "Subbed"}</p>
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl mb-2 font-semibold">Watch Now</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={movie.embedUrl}
            className="w-full h-[70vh] rounded-lg border-2 border-zaccent"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const movie = await prisma.movie.findUnique({
    where: { id: String(params?.id) }
  });
  return { props: { movie } };
};
