import type { MetadataRoute } from "next";
import { getPosts, getTags } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aiagentsfirst.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/articles`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/start-here`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/community`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const { PILLARS } = await import("@/lib/site");
  const { getAllArticles } = await import("@/lib/hub");
  const pillarPages: MetadataRoute.Sitemap = PILLARS.map((p) => ({
    url: `${baseUrl}/articles/topic/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  const hubPages: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const { posts } = await getPosts({ limit: 1000 });
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tags = await getTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...pillarPages, ...hubPages, ...postPages, ...tagPages];
}
