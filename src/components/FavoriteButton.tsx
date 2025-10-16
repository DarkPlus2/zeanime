"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton({ animeId }: { animeId: number }) {
  const [fav, setFav] = useState(false);

  return (
    <button
      onClick={() => setFav(!fav)}
      className="flex items-center gap-2 mt-4 text-sm"
    >
      <Heart
        size={20}
        className={fav ? "fill-red-500 text-red-500" : "text-muted-foreground"}
      />
      {fav ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
