import Link from "next/link";
import type { ReactNode } from "react";
import { branchEndpoints } from "@/lib/constants";

const icons: Record<string, ReactNode> = {
  "/news": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "/learn": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  "/network": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  "/deep-dives": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  "/tools": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "/signal": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" />
    </svg>
  ),
};

export function CategoryShowcase() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-6">
          Explore
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {branchEndpoints.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug}
              className="group article-card flex flex-col items-center text-center p-5 gap-3"
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                {icons[cat.slug]}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-text-tertiary mt-1 leading-snug hidden sm:block">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
