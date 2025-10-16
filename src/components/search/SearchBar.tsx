import { useRouter } from "next/router";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-zcard rounded-lg overflow-hidden shadow-md"
    >
      <input
        type="text"
        placeholder="Search anime..."
        className="w-full bg-transparent px-3 py-2 outline-none text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-zaccent text-white">
        <Search size={18} />
      </button>
    </form>
  );
}
