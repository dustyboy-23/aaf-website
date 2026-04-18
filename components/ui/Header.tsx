"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/tag/tutorials", label: "Tutorials" },
  { href: "/tag/comparisons", label: "Comparisons" },
  { href: "/tag/money", label: "Money" },
  { href: "/tag/opinion", label: "Opinion" },
  { href: "/news", label: "All Articles" },
  {
    href: "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about",
    label: "Community",
    external: true,
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-base text-text-primary hover:text-accent transition-colors">
            AI Agents First
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/#newsletter"
              className="hidden sm:inline-flex px-4 py-1.5 rounded-md bg-accent text-surface text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              Get the daily
            </Link>
            <button
              className="md:hidden text-text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/#newsletter"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center px-4 py-2 rounded-md bg-accent text-surface text-sm font-semibold hover:bg-accent/90 transition-colors mt-2"
            >
              Get the daily
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
