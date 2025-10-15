import React from "react";
import Link from "next/link";

interface AnimeCardProps {
  anime: any;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => (
  <Link href={`/watch/${anime.id}`} className="block group">
    <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105">
      <img
        src={anime.poster || "/assets/placeholder.jpg"}
        alt={anime.title}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-lg font-semibold">{anime.title}</h3>
        <p className="text-xs text-gray-300 line-clamp-2">
          {anime.description}
        </p>
      </div>
    </div>
  </Link>
);

export default AnimeCard;
