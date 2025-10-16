import Link from "next/link";
import { Film, Layers, PlaySquare, Settings } from "lucide-react";

const links = [
  { name: "Movies", href: "/admin/movies", icon: Film },
  { name: "Series", href: "/admin/series", icon: Layers },
  { name: "Episodes", href: "/admin/episodes", icon: PlaySquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-zcard border-r border-zaccent p-4 space-y-6">
      <h1 className="text-2xl font-bold text-zaccent text-center">Zeanime Admin</h1>
      <nav className="space-y-2">
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zaccent/40 transition"
          >
            <Icon size={18} /> {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
