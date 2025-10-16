"use client";
import Link from "next/link";
import Image from "next/image";

export interface Anime {
  id: number;
  title: string;
  image?: string | null;
  category?: string | null;
}

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
    >
      <div className="relative w-full h-64">
        <Image
          src={anime.image || "/placeholder.jpg"}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-lg truncate">{anime.title}</h3>
        {anime.category && (
          <p className="text-sm text-muted-foreground">{anime.category}</p>
        )}
      </div>
    </Link>
  );
}
