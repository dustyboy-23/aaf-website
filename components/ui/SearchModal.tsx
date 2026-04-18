"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchIndexEntry } from "@/app/api/search-index/route";

/**
 * Cmd+K command palette for content search.
 *
 * Behavior:
 * - Opens via SearchTrigger button OR Cmd+K (Mac) / Ctrl+K (others) anywhere.
 * - Index lazy-loads on first open, then cached in memory for the session.
 * - Substring match on title + excerpt + tag (case-insensitive).
 * - Arrow keys navigate, Enter goes to selected, ESC closes.
 * - Click backdrop closes.
 *
 * No external deps — substring match handles 40-500 articles fine. Upgrade
 * to Fuse.js or Algolia past ~500 articles when relevance ranking matters.
 */
type Props = {
  open: boolean;
  onClose: () => void;
};

const MAX_RESULTS = 8;

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const i = lower.indexOf(q);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-accent/20 text-accent rounded px-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function SearchModal({ open, onClose }: Props) {
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Lazy-load index on first open
  useEffect(() => {
    if (open && index === null && !loading) {
      setLoading(true);
      fetch("/api/search-index")
        .then((r) => r.json())
        .then((data: SearchIndexEntry[]) => setIndex(data))
        .catch(() => setIndex([]))
        .finally(() => setLoading(false));
    }
  }, [open, index, loading]);

  // Auto-focus input on open + reset on close
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => {
    if (!index || !query.trim()) return [];
    const q = query.toLowerCase();
    return index
      .filter((e) => {
        return (
          e.title.toLowerCase().includes(q) ||
          e.excerpt.toLowerCase().includes(q) ||
          (e.primaryTag?.toLowerCase().includes(q) ?? false)
        );
      })
      .slice(0, MAX_RESULTS);
  }, [index, query]);

  // Keyboard nav
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        const target = results[active];
        if (target) {
          router.push(`/${target.slug}`);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, router, onClose]);

  // Reset active index when results change
  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl rounded-xl border border-white/10 bg-[#0d0d14] shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tags, topics..."
            aria-label="Search articles"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-base"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 text-[10px] font-medium text-white/40 uppercase tracking-wider">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="px-5 py-8 text-center text-sm text-white/40">Loading index...</div>
          )}
          {!loading && query.trim() === "" && (
            <div className="px-5 py-8 text-center text-sm text-white/40">
              Type to search across {index?.length ?? "..."} articles.
            </div>
          )}
          {!loading && query.trim() !== "" && results.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-white/40">
              No matches for &ldquo;{query}&rdquo;. Try a different keyword.
            </div>
          )}
          {results.map((r, i) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              onClick={onClose}
              onMouseEnter={() => setActive(i)}
              className={`block px-5 py-3 border-l-2 transition-colors ${
                i === active
                  ? "border-accent bg-white/[0.04]"
                  : "border-transparent hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {r.primaryTag && (
                  <span className="text-[10px] uppercase tracking-wider text-accent font-medium">
                    {r.primaryTag}
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold text-white leading-snug">
                {highlight(r.title, query)}
              </div>
              {r.excerpt && (
                <div className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed">
                  {highlight(r.excerpt, query)}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">↵</kbd> open
            </span>
          </div>
          <span>{results.length > 0 && `${results.length} result${results.length === 1 ? "" : "s"}`}</span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/40"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
