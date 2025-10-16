import { useState, useEffect } from "react";

export default function AdminAnime() {
  const [animes, setAnimes] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", thumbnail: "", type: "TV" });

  useEffect(() => {
    fetch("/api/anime")
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/anime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ title: "", slug: "", thumbnail: "", type: "TV" });
    const res = await fetch("/api/anime");
    setAnimes(await res.json());
  };

  return (
    <div className="bg-zbg text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Anime</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded bg-zcard text-white"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          className="p-2 rounded bg-zcard text-white"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          className="p-2 rounded bg-zcard text-white"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />
        <select
          className="p-2 rounded bg-zcard text-white"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>TV</option>
          <option>Movie</option>
          <option>OVA</option>
        </select>
        <button className="col-span-2 bg-zaccent hover:bg-purple-800 p-2 rounded font-semibold">
          Add Anime
        </button>
      </form>

      <div className="grid gap-4">
        {animes.map((anime: any) => (
          <div key={anime.id} className="bg-zcard p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{anime.title}</p>
              <p className="text-sm text-gray-400">{anime.type}</p>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              onClick={async () => {
                await fetch(`/api/anime?id=${anime.id}`, { method: "DELETE" });
                const res = await fetch("/api/anime");
                setAnimes(await res.json());
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
