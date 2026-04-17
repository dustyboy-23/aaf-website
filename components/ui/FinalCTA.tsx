import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-silver/30 mb-6">the system is alive</p>
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-4">Are you in?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/news" className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-mono text-xs uppercase tracking-widest hover:bg-neon-cyan/20 transition-colors">Enter the nexus</Link>
          <Link href="/signal" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-silver font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Latest drops</Link>
        </div>
      </div>
    </section>
  );
}
