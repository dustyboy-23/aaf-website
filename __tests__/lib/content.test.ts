import {
  getPosts,
  getPostBySlug,
  getPostsByTag,
  getAllSlugs,
  getTags,
} from "@/lib/content";

describe("Local content loader", () => {
  it("getAllSlugs returns a non-empty array of strings", async () => {
    const slugs = await getAllSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    expect(typeof slugs[0]).toBe("string");
  });

  it("getPosts returns paginated posts sorted newest first", async () => {
    const result = await getPosts({ limit: 5, page: 1 });
    expect(result.posts.length).toBeGreaterThan(0);
    expect(result.posts.length).toBeLessThanOrEqual(5);
    expect(result.meta.pagination.page).toBe(1);
    expect(result.meta.pagination.total).toBeGreaterThan(0);
    if (result.posts.length >= 2) {
      const first = new Date(result.posts[0].published_at).getTime();
      const second = new Date(result.posts[1].published_at).getTime();
      expect(first).toBeGreaterThanOrEqual(second);
    }
  });

  it("getPostBySlug returns a post for a known slug", async () => {
    const slugs = await getAllSlugs();
    const post = await getPostBySlug(slugs[0]);
    expect(post).not.toBeNull();
    expect(post?.slug).toBe(slugs[0]);
    expect(post?.html).toBeTruthy();
    expect(post?.title).toBeTruthy();
  });

  it("getPostBySlug returns null for an unknown slug", async () => {
    const post = await getPostBySlug("definitely-not-a-real-slug-xyz-123");
    expect(post).toBeNull();
  });

  it("getTags returns all unique tags across posts", async () => {
    const tags = await getTags();
    expect(Array.isArray(tags)).toBe(true);
    const slugs = tags.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getPostsByTag filters posts by tag slug", async () => {
    const tags = await getTags();
    if (tags.length === 0) return;
    const tag = tags[0];
    const result = await getPostsByTag(tag.slug);
    for (const post of result.posts) {
      expect(post.tags.some((t) => t.slug === tag.slug)).toBe(true);
    }
  });
});
