import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

const Home: React.FC = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/animes?filter=trending")
      .then((res) => res.json())
      .then(setTrending);

    fetch("/api/animes?filter=latest")
      .then((res) => res.json())
      .then(setLatest);
  }, []);

  return (
    <div className="container py-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

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
};

export default Home;
