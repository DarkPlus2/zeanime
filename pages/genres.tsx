// pages/genres.tsx
import Link from 'next/link';
import { getGenres } from '../lib/api';

export default function Genres({ genres }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Genres</h1>
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.slug}`} className="px-4 py-2 rounded bg-secondary text-white">
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const genres = await getGenres();
  return { props: { genres }, revalidate: 3600 };
}
