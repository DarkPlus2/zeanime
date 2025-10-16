import Link from "next/link";

export interface Episode {
  id: number;
  title: string;
  number: number;
  animeId: number;
}

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={`/anime/${episode.animeId}/episode/${episode.id}`}
      className="block p-3 bg-card border rounded-lg hover:bg-accent transition"
    >
      <h4 className="font-medium">Episode {episode.number}</h4>
      <p className="text-muted-foreground text-sm truncate">{episode.title}</p>
    </Link>
  );
}
