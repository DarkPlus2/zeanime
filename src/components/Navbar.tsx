import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">Zeanime</Link>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/search">Search</Link>
      </div>
    </nav>
  );
}
