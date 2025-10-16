import Link from "next/link";
import { Anime } from "@prisma/client";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition">
        <img
          src={anime.image ?? "/placeholder.jpg"}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h2 className="text-lg font-semibold truncate">{anime.title}</h2>
          {anime.category && <p className="text-sm text-gray-400">{anime.category}</p>}
        </div>
      </div>
    </Link>
  );
}
