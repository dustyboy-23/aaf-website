import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="shrink-0">
            <Image
              src="/dusty.jpg"
              alt="Dustin Gilmour"
              width={72}
              height={72}
              className="rounded-full border border-border"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-white mb-3">
              Built by Dustin Gilmour
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-lg mb-6">
              Building the AI agent layer. This is where I put the best
              intelligence, tutorials, and tools I find while doing the work
              myself. No filler. Real signal from the frontier.
            </p>
            <p className="text-sm text-text-tertiary">
              Get the daily brief delivered to your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
