import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-mono text-xs uppercase tracking-widest text-neon-magenta mb-4">Signal lost</p>
      <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-4">404</h1>
      <p className="text-silver/60 mb-8 max-w-md">This node doesn&apos;t exist in the network. It may have been moved or deactivated.</p>
      <Link href="/" className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-mono text-xs uppercase tracking-widest hover:bg-neon-cyan/20 transition-colors">Return to nexus</Link>
    </div>
  );
}
