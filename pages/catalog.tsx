// pages/catalog.tsx
import AnimeCard from '../components/AnimeCard';
import { getCatalog } from '../lib/api';

export default function Catalog({ catalog }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Catalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {catalog.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const catalog = await getCatalog();
  return { props: { catalog }, revalidate: 3600 };
}
