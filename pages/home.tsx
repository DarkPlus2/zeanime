import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

interface Anime {
  id: number;
  title: string;
  poster: string;
}

export default function Home() {
  const [trending, setTrending] = useState<Anime[]>([]);
  const [latest, setLatest] = useState<Anime[]>([]);

  useEffect(() => {
    fetch("/api/animes?filter=trending")
      .then((res) => res.json())
      .then(setTrending)
      .catch(() => console.log("Failed to fetch trending anime"));

    fetch("/api/animes?filter=latest")
      .then((res) => res.json())
      .then(setLatest)
      .catch(() => console.log("Failed to fetch latest anime"));
  }, []);

  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* Trending Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Anime</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Latest Episodes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Episodes</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {latest.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
}
