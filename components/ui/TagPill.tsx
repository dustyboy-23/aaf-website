import { categoryColors } from "@/lib/constants";

interface TagPillProps {
  tag: string;
  className?: string;
}

export function TagPill({ tag, className = "" }: TagPillProps) {
  const color = categoryColors[tag.toLowerCase()] ?? "#6b7280";

  return (
    <span
      className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded ${className}`}
      style={{ color, backgroundColor: `${color}14` }}
    >
      {tag}
    </span>
  );
}
