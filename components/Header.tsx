import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/series", label: "Series" },
    { href: "/movies", label: "Movies" },
    { href: "/genres", label: "Genres" },
    { href: "/azlist", label: "A-Z" }
  ];

  return (
    <header className="bg-panel sticky top-0 z-40 border-b border-gray-800 shadow-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/home" className="text-2xl font-bold text-primary">
          Zeanime
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary transition ${
                router.pathname === item.href ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <button
            onClick={() => router.push("/admin")}
            className="hidden sm:inline bg-primary text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
