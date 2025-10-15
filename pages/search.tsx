// pages/search.tsx
import { useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import { searchAnime } from '../lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const res = await searchAnime(value);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search anime..."
        className="w-full p-3 rounded border border-gray-700 bg-bg text-text mb-6"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
