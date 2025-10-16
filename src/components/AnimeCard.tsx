import Link from "next/link";

export default function AnimeCard({ anime }) {
  return (
    <div className="border rounded shadow hover:shadow-lg transition overflow-hidden">
      <img src={anime.image} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h2 className="text-lg font-bold">{anime.title}</h2>
        <p className="text-gray-500">{anime.category}</p>
        <Link href={`/anime/${anime.id}`} className="text-blue-500 mt-2 block">Watch</Link>
      </div>
    </div>
  );
}
