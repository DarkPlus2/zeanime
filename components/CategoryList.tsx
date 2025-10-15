import React from "react";

const CategoryList: React.FC<{ categories: string[]; onSelect: (c: string) => void }> = ({
  categories,
  onSelect,
}) => (
  <div className="flex flex-wrap gap-3 py-4">
    {categories.map((c) => (
      <button
        key={c}
        onClick={() => onSelect(c)}
        className="px-3 py-1 bg-panel rounded-full border border-gray-700 hover:border-primary hover:text-primary transition"
      >
        {c}
      </button>
    ))}
  </div>
);

export default CategoryList;
