"use client";

import Link from "next/link";

export function MobileHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Ambient gradient blobs for visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[160px] opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white">
          AI Agents First
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-silver/50">
          news / learn / build / connect
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="#feed"
            className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-mono text-xs uppercase tracking-widest hover:bg-neon-cyan/20 transition-colors"
          >
            Enter the nexus
          </Link>
          <Link
            href="/signal"
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-silver font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Latest drops
          </Link>
        </div>
      </div>
    </section>
  );
}
