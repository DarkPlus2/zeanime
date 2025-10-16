import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-zcard/70 backdrop-blur-lg border-b border-zaccent sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-zaccent">Zeanime</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/movie">Movies</Link>
          <Link href="/series">Series</Link>
          <Link href="/azlist">A–Z</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/search" className="flex items-center gap-1">
            <Search size={18} /> Search
          </Link>
        </div>

        <button
          className="md:hidden text-zaccent"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zcard p-4 space-y-2">
          <Link href="/movie">Movies</Link>
          <Link href="/series">Series</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/search">Search</Link>
        </div>
      )}
    </nav>
  );
}
