import { Anime } from "./AnimeCard";
import GenreFilter from "./GenreFilter";
import FavoriteButton from "./FavoriteButton";

export default function AnimeDetails({ anime }: { anime: Anime }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.image || "/placeholder.jpg"}
          alt={anime.title}
          className="w-full md:w-72 rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <p className="text-muted-foreground mt-2">{anime.category}</p>
          <FavoriteButton animeId={anime.id} />
          <GenreFilter />
        </div>
      </div>
    </div>
  );
}
