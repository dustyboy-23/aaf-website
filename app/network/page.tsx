import type { Metadata } from "next";

export const metadata: Metadata = { title: "The Network", description: "Questions, answers, and the builder community. Coming soon." };

export default function NetworkPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-4">The Network</h1>
      <p className="font-mono text-xs uppercase tracking-widest text-silver/50 mb-16">questions, answers, builder community</p>
      <div className="glass rounded-lg p-12 text-center">
        <div className="inline-block mb-6">
          <div className="w-16 h-16 rounded-full bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5">
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-silver/60 max-w-md mx-auto">The Network is where builders ask questions, share answers, and connect. We are building something worth waiting for.</p>
      </div>
    </div>
  );
}
