import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

export default function Catalog() {
  const [animes, setAnimes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/animes")
      .then((res) => res.json())
      .then(setAnimes)
      .catch(() => console.log("Failed to fetch catalog"));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Anime Catalog</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
