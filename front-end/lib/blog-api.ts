import api, { getMediaUrl } from "@/lib/api";

export interface BlogAuthor {
  name: string;
  role: string;
  badge?: string;
  avatar?: string;
  bio?: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category:
    | "energy-audits"
    | "electrical-safety"
    | "thermography"
    | "power-quality"
    | "thermal-utilities"
    | "sustainability";
  categoryLabel: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  isPublished?: boolean;
  viewsCount?: number;
  tableOfContents?: TableOfContentItem[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  canonicalUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogCategory {
  id: BlogPost["category"] | "all";
  label: string;
  shortLabel: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", label: "All Insights", shortLabel: "All" },
  { id: "energy-audits", label: "BEE Energy Audits", shortLabel: "Energy Audits" },
  { id: "electrical-safety", label: "Electrical Safety (CEA)", shortLabel: "Safety Audits" },
  { id: "thermography", label: "Infrared Thermography", shortLabel: "Thermography" },
  { id: "power-quality", label: "Power Quality & Harmonics", shortLabel: "Power Quality" },
  { id: "thermal-utilities", label: "Boiler & Steam Systems", shortLabel: "Boiler & Steam" },
  { id: "sustainability", label: "Green Building & NAAC", shortLabel: "Sustainability" },
];

export interface BlogApiResponse {
  success: boolean;
  total?: number;
  count?: number;
  data: BlogPost[];
}

export interface SingleBlogResponse {
  success: boolean;
  data: BlogPost;
  related?: BlogPost[];
}

/**
 * Normalizes backend DB response into a strongly-typed BlogPost object
 */
export function normalizeBlogPost(raw: any): BlogPost {
  if (!raw) return raw;

  // Safe parse JSON tags/keywords/TOC
  let tags: string[] = [];
  if (Array.isArray(raw.tags)) {
    tags = raw.tags;
  } else if (typeof raw.tags === "string") {
    try {
      tags = JSON.parse(raw.tags);
    } catch {
      tags = raw.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
  }

  let keywords: string[] = [];
  if (Array.isArray(raw.keywords)) {
    keywords = raw.keywords;
  } else if (typeof raw.keywords === "string") {
    try {
      keywords = JSON.parse(raw.keywords);
    } catch {
      keywords = raw.keywords.split(",").map((k: string) => k.trim()).filter(Boolean);
    }
  }

  let tableOfContents = [];
  if (Array.isArray(raw.tableOfContents)) {
    tableOfContents = raw.tableOfContents;
  } else if (typeof raw.tableOfContents === "string") {
    try {
      tableOfContents = JSON.parse(raw.tableOfContents);
    } catch {
      tableOfContents = [];
    }
  }

  return {
    id: String(raw.id || raw.slug || `post-${Date.now()}`),
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    content: raw.content || "",
    coverImage: getMediaUrl(raw.coverImage),
    category: raw.category || "energy-audits",
    categoryLabel: raw.categoryLabel || "BEE Energy Audits",
    featured: Boolean(raw.featured),
    publishedAt: raw.publishedAt || new Date().toISOString().split("T")[0],
    readTime: raw.readTime || "5 min read",
    tags,
    tableOfContents,
    author: {
      name: raw.authorName || raw.author?.name || "Er. Santhosh A.",
      role:
        raw.authorRole ||
        raw.author?.role ||
        "Lead BEE Accredited Energy Auditor (AEA-0275)",
      badge: raw.authorBadge || raw.author?.badge || "AEA-0275 / EmAEA 091",
      avatar: raw.authorAvatar || raw.author?.avatar,
      bio:
        raw.authorBio ||
        raw.author?.bio ||
        "Founder & Managing Director of Athul Energy Consultants Pvt. Ltd.",
    },
    seo: {
      metaTitle: raw.metaTitle || raw.seo?.metaTitle || `${raw.title} | Athul Energy Consultants`,
      metaDescription: raw.metaDescription || raw.seo?.metaDescription || raw.excerpt,
      keywords: keywords.length > 0 ? keywords : tags,
    },
    isPublished: raw.isPublished !== undefined ? Boolean(raw.isPublished) : true,
    viewsCount: Number(raw.viewsCount) || 0,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

/**
 * Fetch all blogs with optional filtering (category, search, all)
 */
export async function fetchBlogs(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  all?: boolean;
  limit?: number;
}): Promise<BlogPost[]> {
  try {
    const res = await api.get("/blog", {
      params: {
        category: params?.category && params.category !== "all" ? params.category : undefined,
        search: params?.search?.trim() ? params.search.trim() : undefined,
        featured: params?.featured ? "true" : undefined,
        all: params?.all ? "true" : undefined,
        limit: params?.limit,
      },
    });

    if (res.data?.success && Array.isArray(res.data.data)) {
      return res.data.data.map(normalizeBlogPost);
    }
  } catch (error) {
    console.warn("fetchBlogs API call failed:", error);
  }

  return [];
}

/**
 * Fetch single blog post by slug with related posts
 */
export async function fetchBlogBySlug(slug: string): Promise<{
  post: BlogPost | null;
  related: BlogPost[];
}> {
  try {
    const res = await api.get(`/blog/${slug}`);
    if (res.data?.success && res.data.data) {
      const post = normalizeBlogPost(res.data.data);
      const related = Array.isArray(res.data.related)
        ? res.data.related.map(normalizeBlogPost)
        : [];
      return { post, related };
    }
  } catch (error) {
    console.warn(`fetchBlogBySlug(${slug}) API call failed:`, error);
  }

  return { post: null, related: [] };
}

/**
 * Fetch recent blogs (e.g. 3 for homepage)
 */
export async function fetchRecentBlogs(limit = 3): Promise<BlogPost[]> {
  return fetchBlogs({ limit });
}

/**
 * Create a new blog post with cover image (Admin)
 */
export async function createBlogPost(formData: FormData) {
  const res = await api.post("/blog", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

/**
 * Update an existing blog post (Admin)
 */
export async function updateBlogPost(id: string | number, formData: FormData) {
  const res = await api.put(`/blog/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

/**
 * Delete a blog post (Admin)
 */
export async function deleteBlogPost(id: string | number) {
  const res = await api.delete(`/blog/${id}`);
  return res.data;
}

/**
 * Toggle featured spotlight (Admin)
 */
export async function toggleBlogFeatured(id: string | number) {
  const res = await api.patch(`/blog/${id}/toggle-featured`);
  return res.data;
}

/**
 * Toggle publish/draft status (Admin)
 */
export async function toggleBlogPublish(id: string | number) {
  const res = await api.patch(`/blog/${id}/toggle-publish`);
  return res.data;
}
