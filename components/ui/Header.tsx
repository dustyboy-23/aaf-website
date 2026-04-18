"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchModal } from "./SearchModal";

type NavLink = {
  href: string;
  label: string;
  /** Match prefix — if pathname starts with any of these, link is active */
  match?: string[];
  external?: boolean;
};

const navLinks: NavLink[] = [
  { href: "/tag/tutorials", label: "Tutorials", match: ["/tag/tutorials"] },
  { href: "/tag/comparisons", label: "Comparisons", match: ["/tag/comparisons"] },
  { href: "/tag/money", label: "Money", match: ["/tag/money"] },
  { href: "/tag/opinion", label: "Takes", match: ["/tag/opinion"] },
  { href: "/news", label: "The Feed", match: ["/news"] },
  { href: "/about", label: "About", match: ["/about"] },
  {
    href: "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about",
    label: "Community",
    external: true,
  },
];

/**
 * Small inline logo glyph — neon nexus node.
 *
 * Matches the hero's cyan/ultraviolet palette: a bright core ring with a
 * softer outer orbit. Gives the wordmark a visual anchor so the header
 * doesn't read as generic "blog with text logo."
 */
function NexusMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className="shrink-0"
      style={{ filter: "drop-shadow(0 0 8px rgba(69,240,255,0.45))" }}
    >
      <circle cx="13" cy="13" r="11.5" stroke="#8A63FF" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx="13" cy="13" r="7.5" stroke="#45F0FF" strokeOpacity="0.7" strokeWidth="1" />
      <circle cx="13" cy="13" r="3" fill="#45F0FF" />
      <circle cx="13" cy="13" r="3" fill="url(#core-glow)" />
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#45F0FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function isActive(link: NavLink, pathname: string): boolean {
  if (link.external) return false;
  if (link.match) return link.match.some((p) => pathname === p || pathname.startsWith(p + "/"));
  return pathname === link.href;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Cmd+K / Ctrl+K opens search from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    <header className="fixed top-0 left-0 right-0 z-50 header-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-8">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90"
          >
            <NexusMark />
            <span className="font-black text-[15px] sm:text-base tracking-[-0.01em] text-white leading-none">
              AI Agents First
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link, pathname);
              const classes = `text-[13px] font-semibold tracking-[0.01em] transition-colors relative py-1 ${
                active
                  ? "text-white"
                  : "text-white/65 hover:text-white"
              }`;
              const indicator = active ? (
                <span
                  className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #45F0FF 35%, #8A63FF 65%, transparent)",
                    boxShadow: "0 0 8px rgba(69,240,255,0.6)",
                  }}
                />
              ) : null;
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  {link.label}
                  {indicator}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={classes}>
                  {link.label}
                  {indicator}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-colors text-white/50 hover:text-white/80"
              aria-label="Search articles"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-[12px] font-medium">Search</span>
              <kbd className="ml-1 px-1.5 py-0.5 rounded border border-white/10 text-[10px] font-medium tracking-wider">⌘K</kbd>
            </button>
            {/* Mobile search icon-only */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="md:hidden text-white/70 hover:text-white"
              aria-label="Search articles"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <Link
              href="/#newsletter"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold text-[#04050A] transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
                boxShadow:
                  "0 0 14px rgba(69,240,255,0.3), 0 0 28px rgba(138,99,255,0.2)",
              }}
            >
              Get the daily
            </Link>
            <button
              className="md:hidden text-white/80"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link, pathname);
              const classes = `text-sm font-semibold py-2 transition-colors ${
                active ? "text-[color:var(--color-neon-cyan)]" : "text-white/75 hover:text-white"
              }`;
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className={classes}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={classes}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#newsletter"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center gap-1.5 mt-3 px-4 py-2.5 rounded-full text-sm font-bold text-[#04050A]"
              style={{
                background: "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
              }}
            >
              Get the daily
            </Link>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
