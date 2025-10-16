import Link from "next/link";

type AnimeCardProps = {
  anime: {
    id: number;
    title: string;
    image: string | null;
  };
};

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="border rounded shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={anime.image || "/placeholder.png"}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <h3 className="font-semibold">{anime.title}</h3>
        </div>
      </div>
    </Link>
  );
}
