import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Anime {
  id: number;
  title: string;
  poster: string;
}

export default function Index() {
  const router = useRouter();
  const [trending, setTrending] = useState<Anime[]>([]);

  useEffect(() => {
    // Fetch trending animes from API
    fetch("/api/animes?filter=trending")
      .then((res) => res.json())
      .then((data) => setTrending(data))
      .catch(() => console.log("Failed to fetch trending anime"));
  }, []);

  return (
    <div className="min-h-screen bg-surface text-white flex flex-col">
      {/* Header */}
      <header className="bg-panel p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-500">Zeanime</h1>
        <button
          onClick={() => router.push("/home")}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition"
        >
          Go to Home
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-16 bg-gradient-to-b from-purple-900 to-black">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Watch Your Favorite Anime
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
          Stream latest episodes, movies, and series. Fully Hindi dubbed content available.
        </p>
        <button
          onClick={() => router.push("/home")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Explore Zeanime
        </button>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-2xl font-bold mb-6">Trending Now</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {trending.length > 0 ? (
            trending.map((anime) => (
              <div
                key={anime.id}
                className="bg-panel rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer"
                onClick={() => router.push(`/watch/${anime.id}`)}
              >
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2">
                  <h4 className="text-sm font-semibold truncate">{anime.title}</h4>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Loading trending animes...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-panel text-gray-400 py-6 text-center mt-auto">
        &copy; {new Date().getFullYear()} Zeanime. All rights reserved.
      </footer>
    </div>
  );
}
