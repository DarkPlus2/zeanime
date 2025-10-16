import React, { useEffect, useState } from "react";

type AnimeForm = { title: string; slug: string; thumbnail: string; description?: string; genres?: string };

export default function AdminAnime() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState<AnimeForm>({ title: "", slug: "", thumbnail: "", description: "", genres: "" });
  const [secret, setSecret] = useState<string>("");

  async function load() {
    const res = await fetch("/api/animes");
    setList(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function createAnime(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ ...form, genres: form.genres.split(",").map(s => s.trim()) }),
    });
    if (res.ok) { setForm({ title: "", slug: "", thumbnail: "", description: "", genres: "" }); load(); }
    else alert("Failed");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Anime</h1>
      <div className="mb-4">
        <input placeholder="Admin secret" value={secret} onChange={e => setSecret(e.target.value)} className="px-2 py-1 rounded bg-black/30" />
      </div>

      <form onSubmit={createAnime} className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="p-2 bg-zcard rounded" />
        <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="p-2 bg-zcard rounded" />
        <input value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="Thumbnail URL" className="p-2 bg-zcard rounded col-span-2" />
        <input value={form.genres} onChange={e => setForm({ ...form, genres: e.target.value })} placeholder="Genres (comma separated)" className="p-2 bg-zcard rounded col-span-2" />
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="p-2 bg-zcard rounded col-span-2" />
        <button className="col-span-2 px-4 py-2 bg-zcard rounded">Create</button>
      </form>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Existing</h2>
        <div className="grid gap-2">
          {list.map(a => <div key={a.id} className="p-2 bg-zcard rounded">{a.title}</div>)}
        </div>
      </section>
    </div>
  );
}
