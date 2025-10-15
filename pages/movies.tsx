import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/animes?type=movie")
      .then((res) => res.json())
      .then(setMovies)
      .catch(() => console.log("Failed to fetch movies"));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
