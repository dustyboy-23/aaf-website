import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { SITE_TAGLINE, PILLARS } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-ink-soft max-w-sm">
              {SITE_TAGLINE}. Everything here stays free to read. The community is
              just where we go deeper together, if you want to.
            </p>
            <Link
              href="/community"
              className="mt-4 inline-block text-[0.95rem] text-accent-ink underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors"
            >
              See what the community is
            </Link>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Read</h4>
            <ul className="flex flex-col gap-2.5">
              {PILLARS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/articles/topic/${p.slug}`}
                    className="text-[0.95rem] text-ink-mute hover:text-ink transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Site</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/articles", label: "All articles" },
                { href: "/start-here", label: "Start here" },
                { href: "/about", label: "About" },
                { href: "/community", label: "Community" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.95rem] text-ink-mute hover:text-ink transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.82rem] text-ink-mute">&copy; {year} All rights reserved.</p>
          <div className="flex items-center gap-5 text-[0.82rem] text-ink-mute">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
