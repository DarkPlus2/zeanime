// components/AnimeInfo.tsx
interface AnimeInfoProps {
  anime: any;
}

export default function AnimeInfo({ anime }: AnimeInfoProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
      <p className="text-gray-400 mb-2">{anime.year} • {anime.genre?.join(', ')}</p>
      <p className="mb-4">{anime.description}</p>
      <div className="flex flex-wrap gap-2">
        {anime.tags?.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-secondary rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
