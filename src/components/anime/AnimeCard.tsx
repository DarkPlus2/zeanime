import Link from "next/link";

export default function AnimeCard({ anime }: { anime: any }) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="bg-zcard hover:bg-zaccent/50 transition p-3 rounded-xl shadow-md">
        <img
          src={anime.thumbnail}
          alt={anime.title}
          className="rounded-lg w-full h-48 object-cover"
        />
        <p className="mt-2 text-center font-semibold">{anime.title}</p>
      </div>
    </Link>
  );
}
