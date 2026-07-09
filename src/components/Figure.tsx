import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
  variant?: "default" | "screenshot" | "diagram";
}

export function Figure({ src, alt, caption, label, variant = "default" }: FigureProps) {
  const shadowClass =
    variant === "screenshot"
      ? "shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[var(--border)]"
      : variant === "diagram"
      ? "border border-[var(--border)] bg-[var(--surface)] p-6"
      : "shadow-[0_2px_8px_rgba(0,0,0,0.04)]";

  const radiusClass = variant === "diagram" ? "rounded-xl" : "rounded-lg";

  return (
    <figure className="my-8">
      <div className={`overflow-hidden ${radiusClass} ${shadowClass}`}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
          {label && (
            <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
              {label}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
