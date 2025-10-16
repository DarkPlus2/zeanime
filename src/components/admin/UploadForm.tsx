import { useState } from "react";

export default function UploadForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    title: "",
    type: "movie",
    embedUrl: "",
    thumbnail: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zbg border border-zaccent"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zbg border border-zaccent"
      >
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <input
        type="text"
        name="embedUrl"
        placeholder="Embed URL (Abyss/Filemoon)"
        value={form.embedUrl}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zbg border border-zaccent"
      />
      <input
        type="text"
        name="thumbnail"
        placeholder="Thumbnail URL"
        value={form.thumbnail}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zbg border border-zaccent"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zbg border border-zaccent"
      ></textarea>
      <button
        type="submit"
        className="bg-zaccent hover:bg-zaccent/80 px-4 py-2 rounded text-white font-semibold w-full"
      >
        Save
      </button>
    </form>
  );
}
