// components/CategoryList.tsx
import Link from 'next/link';

interface CategoryListProps {
  categories: { id: string; name: string; slug: string }[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/genres/${cat.slug}`} className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/80">
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
