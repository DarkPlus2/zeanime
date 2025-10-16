import { UserCircle } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center bg-zcard border-b border-zaccent px-6 py-3">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-3">
        <UserCircle size={28} className="text-zaccent" />
        <span>Admin</span>
      </div>
    </header>
  );
}
