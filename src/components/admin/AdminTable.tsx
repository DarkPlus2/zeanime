import { Pencil, Trash2 } from "lucide-react";

interface TableProps {
  data: any[];
  columns: string[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function AdminTable({ data, columns, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto bg-zcard rounded-lg border border-zaccent shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-zaccent text-white uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2">{col}</th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="border-t border-zaccent/40 hover:bg-zaccent/20">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2">{item[col]}</td>
                ))}
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit && onEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-gray-400">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
