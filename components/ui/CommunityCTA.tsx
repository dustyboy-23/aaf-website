import { ArrowRight } from "lucide-react";
import { goHref } from "@/lib/links";

/**
 * The single soft CTA. Value-framed, never urgent. This is the ONLY pitch on
 * the site. Per the IA, no page except /community renders more than one of
 * these. The join link routes through /go/site so the raw destination is never
 * exposed.
 *
 * `proof` is an optional, swappable slot that ships empty. It reads complete
 * without it — only pass real, verified content.
 */
export function CommunityCTA({
  variant = "default",
  source = "site",
  proof,
}: {
  variant?: "default" | "article" | "about";
  source?: string;
  proof?: React.ReactNode;
}) {
  const headline =
    variant === "about"
      ? "If this is your kind of thing, come say hello."
      : variant === "article"
        ? "Want to go deeper on this?"
        : "There's a room for people building the same thing.";

  const body =
    variant === "article"
      ? "Everything here stays free to read. When you'd rather learn it alongside a group working on the same stuff, the community's open. It's free to join."
      : "It's all free to read here. When you want to go deeper with people building the same thing, the community's open. It's free to join.";

  return (
    <aside className="rounded-xl border border-hairline bg-paper-2 px-7 py-9 sm:px-10 sm:py-11">
      <p className="eyebrow">The community</p>
      <h2 className="mt-3 font-display text-[1.7rem] sm:text-[2rem] leading-[1.12] tracking-[-0.02em] text-ink font-medium">
        {headline}
      </h2>
      <p className="mt-4 font-serif text-[1.12rem] leading-relaxed text-ink-soft max-w-xl">
        {body}
      </p>
      {proof ? <div className="mt-6">{proof}</div> : null}
      <a
        href={goHref(source)}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-paper transition-transform hover:-translate-y-0.5"
      >
        Come see the community
        <ArrowRight size={17} strokeWidth={2} />
      </a>
    </aside>
  );
}
