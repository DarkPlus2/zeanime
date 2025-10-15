// pages/series.tsx
import AnimeCard from '../components/AnimeCard';
import { getSeries } from '../lib/api';

export default function Series({ series }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Series</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {series.map((s) => (
          <AnimeCard key={s.id} anime={s} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const series = await getSeries();
  return { props: { series }, revalidate: 3600 };
}
