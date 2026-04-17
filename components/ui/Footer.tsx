import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-black text-lg uppercase tracking-tight text-white mb-3">AI Agents First</h3>
            <p className="text-sm text-silver/60 max-w-xs">The living AI intelligence hub. News, tutorials, tools, and community for the agent era.</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-silver/40 mb-3">Navigate</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/news", label: "Live Intelligence" },
                { href: "/learn", label: "Agent Academy" },
                { href: "/deep-dives", label: "Deep Analysis" },
                { href: "/tools", label: "Tool Vault" },
                { href: "/signal", label: "Signal Feed" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-silver/60 hover:text-neon-cyan-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-silver/40 mb-3">Subscribe</h4>
            <p className="text-sm text-silver/50 mb-4">Daily signal drops. Zero noise.</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="font-mono text-xs text-silver/30 uppercase tracking-widest">&copy; {new Date().getFullYear()} AI Agents First</p>
        </div>
      </div>
    </footer>
  );
}
