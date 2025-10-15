// pages/azlist.tsx
import Link from 'next/link';
import { getAZList } from '../lib/api';

export default function AZList({ letters }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Anime A-Z</h1>
      <div className="flex flex-wrap gap-4">
        {letters.map((letter) => (
          <Link key={letter} href={`/azlist/${letter}`} className="px-3 py-1 rounded bg-primary text-white">
            {letter}
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const letters = await getAZList();
  return { props: { letters } };
}
