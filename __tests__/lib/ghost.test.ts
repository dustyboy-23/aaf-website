import type { GhostPost, GhostTag } from "@/lib/ghost.types";

process.env.GHOST_URL = "https://test.ghost.io";
process.env.GHOST_CONTENT_KEY = "test-key";

// Import after setting env vars
import {
  getPosts,
  getPostBySlug,
  getPostsByTag,
  getFeaturedPosts,
  getAllSlugs,
  getTags,
} from "@/lib/ghost";

const mockTag: GhostTag = {
  id: "tag-1",
  slug: "ai-agents",
  name: "AI Agents",
  description: "Posts about AI agents",
  feature_image: null,
  visibility: "public",
  url: "https://test.ghost.io/tag/ai-agents/",
};

const mockPost: GhostPost = {
  id: "post-1",
  uuid: "uuid-1234",
  slug: "test-post",
  title: "Test Post",
  html: "<p>Hello world</p>",
  excerpt: "Hello world",
  feature_image: "https://test.ghost.io/content/images/test.jpg",
  featured: false,
  published_at: "2026-04-01T10:00:00.000Z",
  updated_at: "2026-04-01T10:00:00.000Z",
  reading_time: 3,
  tags: [mockTag],
  primary_tag: mockTag,
  url: "https://test.ghost.io/test-post/",
  meta_title: null,
  meta_description: null,
  og_image: null,
  og_title: null,
  og_description: null,
};

const mockPagination = {
  page: 1,
  limit: 15,
  pages: 1,
  total: 1,
  next: null,
  prev: null,
};

function mockFetchOk(body: unknown): jest.Mock {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: async () => body,
  });
}

function mockFetchError(status: number): jest.Mock {
  return jest.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => ({ errors: [{ message: "Not Found" }] }),
  });
}

describe("Ghost API helpers", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getPosts", () => {
    it("calls the correct URL with default params and returns posts", async () => {
      const fetchMock = mockFetchOk({
        posts: [mockPost],
        meta: { pagination: mockPagination },
      });
      global.fetch = fetchMock;

      const result = await getPosts();

      expect(result.posts).toHaveLength(1);
      expect(result.posts[0].slug).toBe("test-post");
      expect(result.meta.pagination.total).toBe(1);

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("https://test.ghost.io/ghost/api/content/posts/");
      expect(calledUrl).toContain("key=test-key");
      expect(calledUrl).toContain("include=tags");
      expect(calledUrl).toContain("limit=15");
      expect(calledUrl).toContain("page=1");
      expect(calledUrl).toContain("order=published_at+desc");
    });

    it("accepts custom limit and page params", async () => {
      const fetchMock = mockFetchOk({
        posts: [mockPost],
        meta: { pagination: { ...mockPagination, limit: 5, page: 2 } },
      });
      global.fetch = fetchMock;

      await getPosts({ limit: 5, page: 2 });

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("limit=5");
      expect(calledUrl).toContain("page=2");
    });

    it("throws on non-ok response", async () => {
      global.fetch = mockFetchError(500);

      await expect(getPosts()).rejects.toThrow("Ghost API error: 500");
    });
  });

  describe("getPostBySlug", () => {
    it("fetches a single post by slug and returns it", async () => {
      const fetchMock = mockFetchOk({ posts: [mockPost] });
      global.fetch = fetchMock;

      const result = await getPostBySlug("test-post");

      expect(result).not.toBeNull();
      expect(result?.slug).toBe("test-post");
      expect(result?.title).toBe("Test Post");

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("posts/slug/test-post");
      expect(calledUrl).toContain("include=tags");
    });

    it("returns null when post is not found (empty posts array)", async () => {
      global.fetch = mockFetchOk({ posts: [] });

      const result = await getPostBySlug("nonexistent-post");

      expect(result).toBeNull();
    });
  });

  describe("getPostsByTag", () => {
    it("filters posts by tag slug and URL contains filter param", async () => {
      const fetchMock = mockFetchOk({
        posts: [mockPost],
        meta: { pagination: mockPagination },
      });
      global.fetch = fetchMock;

      const result = await getPostsByTag("ai-agents");

      expect(result.posts).toHaveLength(1);

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("filter=tag%3Aai-agents");
      expect(calledUrl).toContain("include=tags");
      expect(calledUrl).toContain("limit=15");
    });

    it("accepts custom limit and page for tag queries", async () => {
      const fetchMock = mockFetchOk({
        posts: [],
        meta: { pagination: { ...mockPagination, total: 0 } },
      });
      global.fetch = fetchMock;

      await getPostsByTag("ai-agents", { limit: 10, page: 3 });

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("limit=10");
      expect(calledUrl).toContain("page=3");
    });
  });

  describe("getFeaturedPosts", () => {
    it("fetches featured posts with the featured filter", async () => {
      const featuredPost = { ...mockPost, featured: true };
      const fetchMock = mockFetchOk({
        posts: [featuredPost],
        meta: { pagination: mockPagination },
      });
      global.fetch = fetchMock;

      const result = await getFeaturedPosts();

      expect(result).toHaveLength(1);
      expect(result[0].featured).toBe(true);

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("filter=featured%3Atrue");
      expect(calledUrl).toContain("limit=3");
    });
  });

  describe("getAllSlugs", () => {
    it("returns an array of slug strings", async () => {
      const fetchMock = mockFetchOk({
        posts: [{ slug: "first-post" }, { slug: "second-post" }],
        meta: { pagination: mockPagination },
      });
      global.fetch = fetchMock;

      const result = await getAllSlugs();

      expect(result).toEqual(["first-post", "second-post"]);

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("fields=slug");
      expect(calledUrl).toContain("limit=all");
    });
  });

  describe("getTags", () => {
    it("returns all tags", async () => {
      const fetchMock = mockFetchOk({
        tags: [mockTag],
        meta: { pagination: mockPagination },
      });
      global.fetch = fetchMock;

      const result = await getTags();

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("ai-agents");
      expect(result[0].name).toBe("AI Agents");

      const calledUrl = fetchMock.mock.calls[0][0] as string;
      expect(calledUrl).toContain("/ghost/api/content/tags/");
      expect(calledUrl).toContain("limit=all");
    });

    it("throws on non-ok response", async () => {
      global.fetch = mockFetchError(403);

      await expect(getTags()).rejects.toThrow("Ghost API error: 403");
    });
  });
});
