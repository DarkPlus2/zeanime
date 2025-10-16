import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    { name: "Anime", link: "/admin/anime" },
    { name: "Series", link: "/admin/series" },
    { name: "Movies", link: "/admin/movie" },
    { name: "Episodes", link: "/admin/episodes" }
  ];

  return (
    <div className="bg-zbg text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">⚙️ Zeanime Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sections.map((s) => (
          <Link href={s.link} key={s.name}>
            <div className="bg-zcard hover:bg-zaccent transition p-6 rounded-lg text-center shadow cursor-pointer">
              <h2 className="text-xl font-semibold">{s.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
