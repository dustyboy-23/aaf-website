import Link from "next/link";

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
                { href: "/news", label: "The Feed" },
                { href: "/tag/tutorials", label: "Tutorials" },
                { href: "/tag/comparisons", label: "Comparisons" },
                { href: "/tag/money", label: "Money" },
                { href: "/tag/opinion", label: "Takes" },
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
                { href: "/playbook", label: "Free Playbook" },
                { href: "/#newsletter", label: "Newsletter" },
                {
                  href: "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about",
                  label: "Community",
                  external: true,
                },
                { href: "/llms.txt", label: "llms.txt" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((link) =>
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
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
              Get the daily
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              One email, every morning. Builds, tools, and frontier research
              that actually matter.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex mt-4 px-5 py-2 rounded-md bg-accent text-surface text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              Subscribe free
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
