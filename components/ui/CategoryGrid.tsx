import Link from "next/link";
import { branchEndpoints } from "@/lib/constants";

export function CategoryGrid() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-8 pb-4 border-b border-border">
          Explore
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {branchEndpoints.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug}
              className="group border-l-2 pl-4 py-1 transition-colors"
              style={{ borderLeftColor: cat.color }}
            >
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {cat.label}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mt-1">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
