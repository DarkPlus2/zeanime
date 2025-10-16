import { getAllAnimes } from "@/lib/getAnime";
import { AnimeGrid } from "@/components/AnimeGrid";

export default async function HomePage() {
  const animes = await getAllAnimes();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Zeanime</h1>
      <AnimeGrid animes={animes} />
    </div>
  );
}
