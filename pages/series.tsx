// pages/series.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

interface Anime {
  id: string;
  title: string;
  cover: string;
  genre: string[];
  rating: number;
  year: number;
}

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi"];

export default function Series() {
  const [series, setSeries] = useState<Anime[]>([]);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"trending" | "rating" | "latest">("trending");

  useEffect(() => {
    let url = `/api/animes?type=series&sort=${sortOption}`;
    if (filterGenre) url += `&genre=${filterGenre}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setSeries(data));
  }, [filterGenre, sortOption]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-6 border-b border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Anime Series</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterGenre || ""}
            onChange={(e) => setFilterGenre(e.target.value || null)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="trending">Trending</option>
            <option value="rating">Top Rated</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </header>

      <main className="p-6">
        {series.length === 0 ? (
          <p className="text-gray-400 text-center mt-12">No series found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {series.map((anime) => (
              <Link key={anime.id} href={`/watch/${anime.id}`} className="group relative">
                <img
                  src={anime.cover}
                  alt={anime.title}
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="mt-2 flex flex-col gap-1">
                  <p className="text-sm font-semibold truncate">{anime.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{anime.year}</span>
                    <span>⭐ {anime.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {anime.genre.map((g) => (
                      <span key={g} className="text-xs bg-purple-600 px-2 py-0.5 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="p-6 text-center text-gray-400 border-t border-gray-700 mt-12">
        © 2025 Zeanime. All rights reserved.
      </footer>
    </div>
  );
}
