import AnimeCard, { Anime } from "./AnimeCard";

export default function AnimeList({ animes }: { animes: Anime[] }) {
  if (!animes?.length) {
    return <p className="text-center text-muted-foreground">No anime found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
