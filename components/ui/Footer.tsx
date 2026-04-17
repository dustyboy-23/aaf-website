import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                { href: "/signal", label: "Signal" },
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
              Subscribe
            </h4>
            <p className="text-sm text-text-secondary">
              Daily signal. Zero noise.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} AI Agents First
          </p>
        </div>
      </div>
    </footer>
  );
}
