import type { Metadata } from "next";
import { getPostsByTag, getTags } from "@/lib/content";
import { TagPageLayout } from "@/components/ui/TagPageLayout";
import { tagMeta } from "@/lib/constants";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const meta = tagMeta[tag];
  const title = meta?.title ?? tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `${title} — AI Agents First`,
    description:
      meta?.description ?? `All articles tagged "${tag}" on AI Agents First.`,
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

  return (
    <TagPageLayout
      posts={posts}
      tagSlug={tag}
      title={meta.title}
      eyebrow={meta.eyebrow}
      description={meta.description}
    />
  );
}
