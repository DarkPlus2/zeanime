import EpisodeCard, { Episode } from "./EpisodeCard";

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {episodes.map((ep) => (
        <EpisodeCard key={ep.id} episode={ep} />
      ))}
    </div>
  );
}
