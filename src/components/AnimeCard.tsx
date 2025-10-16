const AnimeCard = ({ anime }) => (
  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
    <img src={anime.image} className="w-full h-48 object-cover"/>
    <div className="p-4">
      <h2 className="text-xl font-semibold">{anime.title}</h2>
      <p className="text-gray-500 mt-1">{anime.category}</p>
    </div>
  </div>
);
