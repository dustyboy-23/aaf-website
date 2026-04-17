export interface GhostPost {
  id: string;
  uuid: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  reading_time: number;
  tags: GhostTag[];
  primary_tag: GhostTag | null;
  url: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
}

export interface GhostTag {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  feature_image: string | null;
  visibility: string;
  url: string;
}

export interface GhostPage {
  id: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  tags: GhostTag[];
  primary_tag: GhostTag | null;
  url: string;
}

export interface GhostPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number | null;
  prev: number | null;
}

export interface GhostPostsResponse {
  posts: GhostPost[];
  meta: { pagination: GhostPagination };
}

export interface GhostPostResponse {
  posts: GhostPost[];
}

export interface GhostTagsResponse {
  tags: GhostTag[];
  meta: { pagination: GhostPagination };
}
