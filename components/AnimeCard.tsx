// components/AnimeCard.tsx
import Link from 'next/link';

interface AnimeCardProps {
  anime: any;
  episode?: any;
}

export default function AnimeCard({ anime, episode }: AnimeCardProps) {
  return (
    <Link href={episode ? `/watch/${episode.id}` : `/watch/${anime.id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
        <img
          src={anime.image || '/assets/placeholder.jpg'}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <h3 className="text-lg font-semibold truncate">{anime.title}</h3>
          {episode && (
            <p className="text-sm text-gray-400 truncate">
              Episode {episode.number}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
