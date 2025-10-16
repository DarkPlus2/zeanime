import React, { useEffect, useState } from "react";

export default function AdminEpisodes() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [secret, setSecret] = useState("");
  const [form, setForm] = useState({ animeId: "", title: "", number: 1, server: "abyss", embedUrl: "", isDub: false });

  useEffect(() => {
    fetch("/api/animes").then(r => r.json()).then(setAnimes);
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/episodes", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Created");
    else alert("Failed");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Episodes</h1>
      <div className="mb-4">
        <input placeholder="Admin secret" value={secret} onChange={e => setSecret(e.target.value)} className="px-2 py-1 rounded bg-black/30" />
      </div>

      <form onSubmit={create} className="grid gap-2">
        <select value={form.animeId} onChange={e => setForm({ ...form, animeId: e.target.value })} className="p-2 bg-zcard rounded">
          <option value="">Select anime</option>
          {animes.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Episode title" className="p-2 bg-zcard rounded" />
        <input type="number" value={form.number} onChange={e => setForm({ ...form, number: Number(e.target.value) })} className="p-2 bg-zcard rounded" />
        <select value={form.server} onChange={e => setForm({ ...form, server: e.target.value })} className="p-2 bg-zcard rounded">
          <option value="abyss">Abyss</option>
          <option value="filemoon">Filemoon</option>
        </select>
        <input value={form.embedUrl} onChange={e => setForm({ ...form, embedUrl: e.target.value })} placeholder="Embed URL (full)" className="p-2 bg-zcard rounded" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isDub} onChange={e => setForm({ ...form, isDub: e.target.checked })} /> Dub</label>
        <button className="px-4 py-2 bg-zcard rounded">Create Episode</button>
      </form>
    </div>
  );
}
