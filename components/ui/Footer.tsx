import Link from "next/link";

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/aiagentsfirst",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/aiagentsfirst",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@aiagentsfirst",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-base text-text-primary mb-3">
              AI Agents First
            </h3>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              The intelligence hub for the agent era. News, tutorials, tools,
              and community.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/news", label: "News" },
                { href: "/learn", label: "Learn" },
                { href: "/deep-dives", label: "Deep Dives" },
                { href: "/tools", label: "Tools" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/signal", label: "Daily Signal" },
                { href: "/network", label: "Network" },
                { href: "/llms.txt", label: "llms.txt" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
              Connect
            </h4>
            <div className="flex items-center gap-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-text-secondary">
              Daily signal. Zero noise.
            </p>
            <Link
              href="/signal"
              className="inline-flex mt-3 px-5 py-2 rounded-md bg-accent text-surface text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} AI Agents First. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
