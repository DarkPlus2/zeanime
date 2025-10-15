// pages/home.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

interface Anime {
  id: string;
  title: string;
  cover: string;
  genre: string[];
  rating: number;
}

export default function Home() {
  const [trending, setTrending] = useState<Anime[]>([]);
  const [featured, setFeatured] = useState<Anime[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Anime[]>([]);

  useEffect(() => {
    // Fetch trending anime
    fetch("/api/animes?sort=trending&limit=5")
      .then(res => res.json())
      .then(data => setTrending(data));

    // Fetch featured anime
    fetch("/api/animes?sort=featured&limit=5")
      .then(res => res.json())
      .then(data => setFeatured(data));
  }, []);

  useEffect(() => {
    if (search.trim() === "") return setSearchResults([]);
    fetch(`/api/animes/search?q=${search}`)
      .then(res => res.json())
      .then(data => setSearchResults(data));
  }, [search]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-black/70 to-black/90">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-5xl font-bold tracking-wide">Zeanime</h1>
          <p className="text-lg text-gray-300">Stream trending anime instantly</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anime..."
            className="mt-4 w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map(anime => (
              <Link key={anime.id} href={`/watch/${anime.id}`} className="group relative">
                <img src={anime.cover} alt={anime.title} className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" />
                <p className="mt-2 text-sm font-medium truncate">{anime.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Anime Carousel */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Featured Anime</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-500">
          {featured.map(anime => (
            <Link key={anime.id} href={`/watch/${anime.id}`} className="min-w-[180px] relative group">
              <img src={anime.cover} alt={anime.title} className="rounded-lg h-64 object-cover group-hover:scale-105 transition-transform duration-200" />
              <p className="mt-2 text-sm font-medium truncate">{anime.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Trending Anime</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trending.map(anime => (
            <Link key={anime.id} href={`/watch/${anime.id}`} className="group relative">
              <img src={anime.cover} alt={anime.title} className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
                ⭐ {anime.rating.toFixed(1)}
              </div>
              <p className="mt-2 text-sm font-medium truncate">{anime.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-400 border-t border-gray-700 mt-12">
        © 2025 Zeanime. All rights reserved.
      </footer>
    </div>
  );
}
