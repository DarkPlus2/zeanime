import React, { useState, useEffect } from "react";

const AdminPanel: React.FC = () => {
  const [animes, setAnimes] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", poster: "" });
  const [adminKey, setAdminKey] = useState("");

  const loadAnimes = async () => {
    const res = await fetch("/api/animes");
    const data = await res.json();
    setAnimes(data);
  };

  useEffect(() => {
    loadAnimes();
  }, []);

  const handleAdd = async () => {
    if (!form.title) return alert("Title required");
    const res = await fetch("/api/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Added!");
      setForm({ title: "", description: "", poster: "" });
      loadAnimes();
    } else alert("Error adding anime");
  };

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <input
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
        placeholder="Admin Key"
        type="password"
        className="bg-panel px-3 py-2 rounded w-72 border border-gray-700 mb-3"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass p-4">
          <h2 className="font-semibold mb-2">Add Anime</h2>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-2 p-2 bg-surface border border-gray-700 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mb-2 p-2 bg-surface border border-gray-700 rounded"
          />
          <input
            placeholder="Poster URL"
            value={form.poster}
            onChange={(e) => setForm({ ...form, poster: e.target.value })}
            className="w-full mb-2 p-2 bg-surface border border-gray-700 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        <div className="glass p-4">
          <h2 className="font-semibold mb-3">Existing Animes</h2>
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {animes.map((a) => (
              <div key={a.id} className="flex justify-between items-center bg-panel p-2 rounded">
                <span>{a.title}</span>
                <button
                  className="text-red-400 hover:text-red-500"
                  onClick={async () => {
                    await fetch(`/api/animes/${a.id}`, {
                      method: "DELETE",
                      headers: { "x-admin-key": adminKey },
                    });
                    loadAnimes();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
