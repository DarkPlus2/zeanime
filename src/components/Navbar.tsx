"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur border-b">
      <Link href="/" className="text-xl font-bold">
        Zeanime
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/favorites" className="hover:underline">
          Favorites
        </Link>
        <Link href="/genres" className="hover:underline">
          Genres
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
