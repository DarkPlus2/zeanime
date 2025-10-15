// pages/admin.tsx
import AdminPanel from '../components/AdminPanel';

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
      <AdminPanel />
    </div>
  );
}
