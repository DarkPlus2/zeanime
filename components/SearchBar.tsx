// components/SearchBar.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length > 2) router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-l px-4 py-2 w-full md:w-64 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
      />
      <button type="submit" className="bg-secondary px-4 py-2 rounded-r hover:bg-secondary/80 transition">
        Search
      </button>
    </form>
  );
}
