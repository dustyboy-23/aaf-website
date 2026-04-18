import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About */}
          <div className="flex items-start gap-5">
            <Image
              src="/dusty.jpg"
              alt="Dustin Gilmour"
              width={56}
              height={56}
              className="rounded-full border border-border shrink-0"
            />
            <div>
              <h3 className="text-base font-semibold text-white mb-2">
                Built by Dustin Gilmour
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Building the AI agent layer. Real signal from the frontier -- no
                filler, no regurgitated summaries.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:text-right">
            <p className="text-lg font-semibold text-white mb-2">
              The agent era moves fast.
            </p>
            <p className="text-sm text-text-secondary mb-5">
              Get the daily brief. One read. Zero noise.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex px-7 py-3 rounded-md bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              Get the daily signal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
