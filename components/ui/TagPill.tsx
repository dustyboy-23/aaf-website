import { categoryColors } from "@/lib/constants";

interface TagPillProps {
  tag: string;
  className?: string;
}

export function TagPill({ tag, className = "" }: TagPillProps) {
  const color = categoryColors[tag.toLowerCase()] ?? "#6b7280";

  return (
    <span
      className={`inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${className}`}
      style={{ color, borderColor: `${color}33`, backgroundColor: `${color}11` }}
    >
      {tag}
    </span>
  );
}
