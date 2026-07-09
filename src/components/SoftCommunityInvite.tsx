import { ExternalLink } from "lucide-react";

const communityUrl = "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about";

interface SoftCommunityInviteProps {
  context?: "article" | "homepage";
}

export function SoftCommunityInvite({ context = "homepage" }: SoftCommunityInviteProps) {
  const copy =
    context === "article"
      ? "If you are stuck on this or want to go deeper, there is a free community where people share what they are building."
      : "If you want help implementing any of this, there is a free community where people share what they are building.";

  return (
    <div className="bg-[var(--border-light)] rounded-xl p-6 md:p-8">
      <p className="font-body text-[1rem] text-[var(--text-primary)] leading-relaxed">
        {copy}{" "}
        <a
          href={communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-[0.2em] hover:text-[var(--accent-hover)] transition-colors duration-150 inline-flex items-center gap-1"
        >
          Join the community
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
