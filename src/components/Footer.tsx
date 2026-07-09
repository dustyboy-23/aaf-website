"use client";

import Link from "next/link";
import { MessageCircle, Play, Rss } from "lucide-react";

const communityUrl = "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about";

export function Footer() {
  return (
    <footer className="bg-[var(--canvas)] border-t border-[var(--border)]">
      <div className="container-main pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-display text-[1.5rem] text-[var(--text-primary)] tracking-tight inline-block mb-3"
            >
              AI Agents First
            </Link>
            <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Free AI tutorials, tool reviews, and news. I test the tools so you do not have to.
            </p>
          </div>

          {/* Links column */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-body text-[0.8125rem] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
              Browse
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/tools", label: "AI Tools" },
                { href: "/make-money", label: "Make Money" },
                { href: "/create", label: "Create" },
                { href: "/news", label: "News" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community + Social column */}
          <div className="md:col-span-3">
            <h3 className="font-body text-[0.8125rem] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
              Community
            </h3>
            <a
              href={communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.9375rem] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-150 inline-block mb-6"
            >
              Join on Skool
            </a>

            <h3 className="font-body text-[0.8125rem] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
              Follow
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/aiagentsfirst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com/@aiagentsfirst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                <Play className="w-4.5 h-4.5" />
              </a>
              <a
                href="/feed.xml"
                aria-label="RSS Feed"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                <Rss className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} AI Agents First
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[0.75rem] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[0.75rem] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
