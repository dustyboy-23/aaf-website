"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const navLinks = [
  { href: "/articles", label: "Articles", match: ["/articles"] },
  { href: "/start-here", label: "Start Here", match: ["/start-here"] },
  { href: "/about", label: "About", match: ["/about"] },
  { href: "/community", label: "Community", match: ["/community"] },
];

function isActive(match: string[], pathname: string): boolean {
  return match.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 header-blur">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex h-[64px] items-center justify-between gap-8">
          <Wordmark />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.match, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.9rem] tracking-[0.01em] transition-colors ${
                    active ? "text-ink" : "text-ink-mute hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden text-ink"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-5 flex flex-col gap-1 border-t border-hairline pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[1.05rem] font-serif py-2 text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
