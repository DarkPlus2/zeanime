"use client";

import { useState } from "react";

export default function GenreFilter() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const genres = ["Action", "Adventure", "Romance", "Fantasy", "Comedy"]; // example

  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          className={`px-3 py-1 rounded-full border transition ${
            selectedGenre === genre
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
