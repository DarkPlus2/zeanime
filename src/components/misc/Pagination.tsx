export default function Pagination({ page, totalPages, onChange }: any) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="bg-zcard px-3 py-1 rounded disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-zaccent font-semibold">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="bg-zcard px-3 py-1 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
