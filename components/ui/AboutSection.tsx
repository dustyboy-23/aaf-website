import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="shrink-0">
            <Image src="/dusty.jpg" alt="Dustin Gilmour" width={80} height={80} className="rounded-full border-2 border-neon-cyan/20" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Built by Dustin Gilmour</h2>
            <p className="text-silver/60 max-w-lg mb-6">Building the AI agent layer. This is where I put the best intelligence, tutorials, and tools I find while doing the work myself. No filler, no regurgitated GPT summaries. Real signal from the frontier.</p>
            <div className="glass rounded-lg p-6 max-w-md">
              <h3 className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-3">Get the daily signal</h3>
              <p className="text-sm text-silver/50 mb-4">One email. The best from the day. No noise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
