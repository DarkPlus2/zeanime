// components/AdminPanel.tsx
export default function AdminPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-900 rounded shadow text-white">
        <h2 className="text-xl font-bold mb-2">Manage Anime</h2>
        <p>Add, edit, or remove anime entries.</p>
      </div>
      <div className="p-4 bg-gray-900 rounded shadow text-white">
        <h2 className="text-xl font-bold mb-2">Reports & Logs</h2>
        <p>View user reports and system logs.</p>
      </div>
    </div>
  );
}
