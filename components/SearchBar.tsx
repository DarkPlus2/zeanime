import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      const timeout = setTimeout(async () => {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      }, 300);
      return () => clearTimeout(timeout);
    } else setSuggestions([]);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-surface border border-gray-700 rounded-full px-4 py-1 w-48 md:w-60 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search anime..."
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute bg-panel w-full mt-1 border border-gray-700 rounded-lg overflow-hidden z-50">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => router.push(`/watch/${s.id}`)}
              className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
