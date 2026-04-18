import type { Metadata } from "next";
import { getPostsByTag, getTags } from "@/lib/content";
import { TagPageLayout } from "@/components/ui/TagPageLayout";
import { tagMeta } from "@/lib/constants";
import { tutorialFilters, tutorialBucketsFor } from "@/lib/tutorial-filters";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const meta = tagMeta[tag];
  const title = meta?.title ?? tag.charAt(0).toUpperCase() + tag.slice(1);
  const description = meta?.description ?? `All articles tagged "${tag}" on AI Agents First.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/tag/${tag}` },
    openGraph: {
      title: `${title} — AI Agents First`,
      description,
      url: `${siteUrl}/tag/${tag}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const { posts } = await getPostsByTag(tag, { limit: 60 });
  const meta = tagMeta[tag] ?? {
    title: tag.charAt(0).toUpperCase() + tag.slice(1),
    eyebrow: "Archive",
    description: `Every article tagged "${tag}".`,
  };

  const filters = tag === "tutorials" ? tutorialFilters : undefined;
  const bucketFor = tag === "tutorials" ? tutorialBucketsFor : undefined;

  return (
    <TagPageLayout
      posts={posts}
      tagSlug={tag}
      title={meta.title}
      eyebrow={meta.eyebrow}
      description={meta.description}
      filters={filters}
      bucketFor={bucketFor}
    />
  );
}
