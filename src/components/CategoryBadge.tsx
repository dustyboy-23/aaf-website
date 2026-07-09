interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-block font-mono text-xs font-medium text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1 rounded">
      {category}
    </span>
  );
}
