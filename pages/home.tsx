// pages/home.tsx
import AnimeCard from '../components/AnimeCard';
import { getTrendingAnime, getLatestEpisodes } from '../lib/api';

export default function Home({ trending, latest }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Trending Anime</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {trending.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-8 mb-4">Latest Episodes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {latest.map((ep) => (
          <AnimeCard key={ep.id} anime={ep.anime} episode={ep} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const trending = await getTrendingAnime();
  const latest = await getLatestEpisodes();

  return { props: { trending, latest }, revalidate: 3600 };
}
