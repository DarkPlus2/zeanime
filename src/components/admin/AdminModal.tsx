import { X } from "lucide-react";

export default function AdminModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zcard p-6 rounded-xl w-[95%] max-w-md relative border border-zaccent">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zaccent hover:text-red-400"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
