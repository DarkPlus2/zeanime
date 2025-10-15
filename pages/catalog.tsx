import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

const Catalog: React.FC = () => {
  const [animes, setAnimes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/animes")
      .then((res) => res.json())
      .then(setAnimes);
  }, []);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Anime Catalog</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
