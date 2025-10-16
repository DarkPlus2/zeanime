import { prisma } from "@/lib/prisma";
import AnimeList from "@/components/AnimeList";

export default async function FavoritesPage() {
  const favorites = await prisma.favorite.findMany({
    include: { anime: true },
    where: { userId: 1 }, // Replace with auth
  });

  const animes = favorites.map((fav) => fav.anime);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Favorites</h1>
      <AnimeList animes={animes} />
    </div>
  );
}favorites/page.tsx
