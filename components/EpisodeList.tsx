// components/EpisodeList.tsx
import Link from 'next/link';

interface EpisodeListProps {
  episodes: { id: string; number: number; title?: string }[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
      {episodes.map((ep) => (
        <Link key={ep.id} href={`/watch/${ep.id}`} className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-center">
          Episode {ep.number} {ep.title && `- ${ep.title}`}
        </Link>
      ))}
    </div>
  );
}
