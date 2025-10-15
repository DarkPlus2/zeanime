// components/Header.tsx
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-md">
      <Link href="/" className="text-2xl font-bold hover:text-secondary">ZeAnime</Link>
      <nav className="flex gap-4 mt-2 md:mt-0">
        <Link href="/home" className="hover:text-secondary">Home</Link>
        <Link href="/movies" className="hover:text-secondary">Movies</Link>
        <Link href="/series" className="hover:text-secondary">Series</Link>
        <Link href="/catalog" className="hover:text-secondary">Catalog</Link>
      </nav>
      <div className="mt-2 md:mt-0">
        <SearchBar />
      </div>
    </header>
  );
}
