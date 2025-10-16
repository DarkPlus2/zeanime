type Props = {
  anime: {
    title: string;
    description: string | null;
    category: string | null;
    genres: { name: string }[];
  };
};

export default function AnimeDetails({ anime }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{anime.title}</h1>
      <p className="mt-2 text-gray-300">{anime.description}</p>
      <p className="mt-2">
        Category: <strong>{anime.category}</strong>
      </p>
      <p className="mt-2">
        Genres: {anime.genres.map((g) => g.name).join(", ")}
      </p>
    </div>
  );
}
