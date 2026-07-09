"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/make-money", label: "Make Money" },
  { href: "/create", label: "Create" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

const communityUrl = "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--canvas)]/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            : "bg-[var(--canvas)]/80 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <nav className="container-main flex items-center justify-between h-[68px]" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[1.35rem] text-[var(--text-primary)] tracking-tight hover:text-[var(--accent)] transition-colors duration-200"
          >
            AI Agents First
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors duration-200 rounded-md ${
                  isActive(link.href)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-light)]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--accent)] rounded-full" />
                )}
              </Link>
            ))}
            <div className="w-px h-5 bg-[var(--border)] mx-2" />
            <a
              href={communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-[var(--accent)] text-[var(--accent)] rounded-full px-5 py-2 text-[0.8125rem] font-medium hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
            >
              Community
              <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[var(--text-primary)] hover:bg-[var(--border-light)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--canvas)] md:hidden" style={{ paddingTop: "68px" }}>
          <nav className="container-main py-8" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-[var(--accent)] bg-[var(--accent-light)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--border-light)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-[var(--border)] mt-4">
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 px-4 text-lg font-medium text-[var(--accent)] rounded-lg hover:bg-[var(--accent-light)] transition-colors"
                >
                  Community
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
