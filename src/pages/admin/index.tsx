import React from "react";
import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/anime"><a className="p-4 bg-zcard rounded">Manage Anime</a></Link>
        <Link href="/admin/episodes"><a className="p-4 bg-zcard rounded">Manage Episodes</a></Link>
        <Link href="/admin/movies"><a className="p-4 bg-zcard rounded">Manage Movies</a></Link>
      </div>

      <p className="text-sm text-gray-400 mt-6">Note: API routes require ADMIN_SECRET in header.</p>
    </div>
  );
}
