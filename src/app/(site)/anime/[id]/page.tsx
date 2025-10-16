import { getAnimeById } from "@/lib/getAnime";
import PlayerEmbed from "@/components/PlayerEmbed";

export default async function AnimePage({ params }: { params: { id: string } }) {
  const anime = await getAnimeById(Number(params.id));

  if (!anime) {
    return <div className="text-center text-gray-400">Anime not found</div>;
  }

  return (
    <div className="space-y-6">
      <img
        src={anime.coverImage ?? anime.image}
        alt={anime.title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg"
      />
      <h1 className="text-3xl font-semibold">{anime.title}</h1>
      <p className="text-gray-300">{anime.description}</p>

      <h2 className="text-xl font-semibold mt-8">Watch Episodes</h2>
      <div className="space-y-4">
        {anime.episodes.map((ep) => (
          <div key={ep.id} className="border border-gray-800 p-4 rounded-xl bg-gray-900">
            <h3 className="text-lg font-medium mb-2">Episode {ep.number}: {ep.title}</h3>
            <PlayerEmbed url={ep.embedUrl1 || ep.embedUrl2 || ep.embedUrl3 || ""} />
          </div>
        ))}
      </div>
    </div>
  );
}
