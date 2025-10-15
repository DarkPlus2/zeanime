import React from "react";

const AnimeInfo: React.FC<{ anime: any }> = ({ anime }) => (
  <section className="glass p-6 mt-6">
    <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
    <p className="text-gray-300 mb-4">{anime.description}</p>
    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
      <span>Type: {anime.type}</span>
      <span>Genres: {anime.genres?.join(", ")}</span>
      {anime.hindi_dub && <span className="text-green-400">Hindi Dubbed</span>}
      <span>Status: {anime.status}</span>
    </div>
  </section>
);

export default AnimeInfo;
