import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

export default function Series() {
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/animes?type=series")
      .then((res) => res.json())
      .then(setSeries)
      .catch(() => console.log("Failed to fetch series"));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Series</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {series.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
