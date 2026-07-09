interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <span className="inline-block font-mono text-[0.6875rem] font-medium text-[var(--accent)] uppercase tracking-[0.12em] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body text-[1.0625rem] text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
