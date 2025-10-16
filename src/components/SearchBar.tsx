"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="relative"
    >
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-3 py-2 border rounded-lg w-full bg-background"
      />
      <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
    </form>
  );
}
