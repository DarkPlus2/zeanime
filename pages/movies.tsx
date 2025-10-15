// pages/movies.tsx
import AnimeCard from '../components/AnimeCard';
import { getMovies } from '../lib/api';
import { useState } from 'react';

export default function Movies({ initialMovies }) {
  const [movies, setMovies] = useState(initialMovies);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <AnimeCard key={movie.id} anime={movie} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const initialMovies = await getMovies();
  return { props: { initialMovies }, revalidate: 3600 };
}
