import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Op } from "sequelize";
import { Blog } from "../model/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Slugify a string into a clean, URL-safe slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculate approximate reading time from content
 */
function calculateReadTime(content) {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>?/gm, "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Extract Table of Contents from markdown H2 headings
 */
function extractTableOfContents(content) {
  if (!content) return [];
  const lines = content.split("\n");
  const toc = [];
  const h2RegexWithId = /^##\s+(.+?)\s+\{#(.+?)\}/;
  const h2Regex = /^##\s+(.+)$/;

  for (const line of lines) {
    const matchWithId = line.match(h2RegexWithId);
    if (matchWithId) {
      toc.push({
        id: matchWithId[2].trim(),
        title: matchWithId[1].trim(),
      });
      continue;
    }
    const match = line.match(h2Regex);
    if (match) {
      const title = match[1].trim();
      const id = slugify(title);
      toc.push({ id, title });
    }
  }
  return toc;
}

/**
 * Safely parse JSON array or comma-delimited string
 */
function parseArrayField(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}

/**
 * GET /api/blog
 * Fetch all blogs with filtering, search, and pagination
 */
export async function getAllBlogs(req, res) {
  try {
    const { category, search, featured, all, page, limit } = req.query;

    const where = {};

    // By default, public queries only see published posts
    if (all !== "true") {
      where.isPublished = true;
    }

    // Category filter
    if (category && category !== "all") {
      where.category = category;
    }

    // Featured filter
    if (featured === "true") {
      where.featured = true;
    }

    // Search query
    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      where[Op.or] = [
        { title: { [Op.like]: q } },
        { excerpt: { [Op.like]: q } },
        { authorName: { [Op.like]: q } },
        { categoryLabel: { [Op.like]: q } },
        { slug: { [Op.like]: q } },
      ];
    }

    const order = [
      ["featured", "DESC"],
      ["publishedAt", "DESC"],
      ["id", "DESC"],
    ];

    // Optional pagination
    let pagination = {};
    if (limit && !isNaN(parseInt(limit, 10))) {
      const parsedLimit = parseInt(limit, 10);
      const parsedPage = page && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1;
      pagination = {
        limit: parsedLimit,
        offset: (parsedPage - 1) * parsedLimit,
      };
    }

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where,
      order,
      ...pagination,
    });

    return res.status(200).json({
      success: true,
      total: count,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve blogs",
      error: error.message,
    });
  }
}

/**
 * GET /api/blog/:slug
 * Fetch single blog by slug, increment view count, and return related posts
 */
export async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    const { preview } = req.query;

    // Search by slug first, fallback to id if numeric
    const where = {};
    if (!isNaN(slug)) {
      where[Op.or] = [{ slug }, { id: parseInt(slug, 10) }];
    } else {
      where.slug = slug;
    }

    const blog = await Blog.findOne({ where });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Article not found with slug '${slug}'`,
      });
    }

    // If post is not published and not in preview mode
    if (!blog.isPublished && preview !== "true") {
      return res.status(404).json({
        success: false,
        message: "This article is currently in draft mode",
      });
    }

    // Atomically increment views count (silent: true avoids touching updatedAt)
    try {
      await Blog.increment("viewsCount", {
        by: 1,
        where: { id: blog.id },
        silent: true,
      });
      blog.viewsCount += 1;
    } catch (e) {
      console.warn("Could not increment views count:", e.message);
    }

    // Fetch related published posts in the same category
    const relatedPosts = await Blog.findAll({
      where: {
        category: blog.category,
        isPublished: true,
        id: { [Op.ne]: blog.id },
      },
      order: [
        ["featured", "DESC"],
        ["publishedAt", "DESC"],
      ],
      limit: 3,
    });

    return res.status(200).json({
      success: true,
      data: blog,
      related: relatedPosts,
    });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch article",
      error: error.message,
    });
  }
}

/**
 * POST /api/blog
 * Create a new blog post (Admin protected, supports cover image upload)
 */
export async function createBlog(req, res) {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category = "energy-audits",
      categoryLabel,
      authorName = "Er. Santhosh A.",
      authorRole = "Lead BEE Accredited Energy Auditor (AEA-0275)",
      authorBadge = "AEA-0275 / EmAEA 091",
      authorAvatar,
      authorBio,
      publishedAt,
      readTime,
      tags,
      tableOfContents,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      featured,
      isPublished,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Article title is required",
      });
    }

    if (!excerpt || !excerpt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Article excerpt is required",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Article content is required",
      });
    }

    // Determine cover image URL
    let coverImage = req.body.coverImage;
    if (req.file) {
      coverImage = `/media/blog/${req.file.filename}`;
    }

    if (!coverImage) {
      coverImage = "/services/detailed-energy-audit.webp"; // Default fallback cover
    }

    // Generate clean slug
    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    // Ensure slug uniqueness
    const existing = await Blog.findOne({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Auto calculate read time if missing
    const finalReadTime = readTime && readTime.trim() ? readTime : calculateReadTime(content);

    // Auto extract TOC if missing
    const parsedTOC =
      tableOfContents && typeof tableOfContents !== "string"
        ? tableOfContents
        : (typeof tableOfContents === "string" && tableOfContents.trim() ? parseArrayField(tableOfContents) : extractTableOfContents(content));

    // Determine category label mapping
    const categoryLabels = {
      "energy-audits": "BEE Energy Audits",
      "electrical-safety": "Electrical Safety (CEA)",
      "thermography": "Infrared Thermography",
      "power-quality": "Power Quality & Harmonics",
      "thermal-utilities": "Boiler & Steam Systems",
      "sustainability": "Green Building & NAAC",
    };
    const finalCategoryLabel = categoryLabel || categoryLabels[category] || "Technical Engineering";

    // Auto-generate SEO fields if not provided
    const finalMetaTitle = metaTitle && metaTitle.trim() ? metaTitle : `${title.trim()} | Athul Energy Consultants`;
    const finalMetaDescription = metaDescription && metaDescription.trim() ? metaDescription : excerpt.trim();

    const newBlog = await Blog.create({
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage,
      category,
      categoryLabel: finalCategoryLabel,
      authorName: authorName.trim(),
      authorRole: authorRole.trim(),
      authorBadge: authorBadge?.trim() || null,
      authorAvatar: authorAvatar?.trim() || null,
      authorBio: authorBio?.trim() || null,
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
      readTime: finalReadTime,
      tags: parseArrayField(tags),
      tableOfContents: parsedTOC,
      metaTitle: finalMetaTitle,
      metaDescription: finalMetaDescription,
      keywords: parseArrayField(keywords),
      canonicalUrl: canonicalUrl?.trim() || `https://www.athulenergy.com/blog/${finalSlug}`,
      featured: featured === true || featured === "true",
      isPublished: isPublished === undefined ? true : (isPublished === true || isPublished === "true"),
    });

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog post",
      error: error.message,
    });
  }
}

/**
 * PUT /api/blog/:id
 * Update blog post (Admin protected)
 */
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post #${id} not found`,
      });
    }

    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      categoryLabel,
      authorName,
      authorRole,
      authorBadge,
      authorAvatar,
      authorBio,
      publishedAt,
      readTime,
      tags,
      tableOfContents,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      featured,
      isPublished,
    } = req.body;

    // Handle new cover image upload
    if (req.file) {
      const oldCover = blog.coverImage;
      blog.coverImage = `/media/blog/${req.file.filename}`;

      // Clean up previous uploaded image if stored locally in /media/blog/
      if (oldCover && oldCover.startsWith("/media/blog/")) {
        const oldPath = path.join(__dirname, "..", oldCover);
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {
            console.warn("Failed to delete old cover image:", e.message);
          }
        }
      }
    } else if (req.body.coverImage) {
      blog.coverImage = req.body.coverImage;
    }

    if (title !== undefined) blog.title = title.trim();
    if (excerpt !== undefined) blog.excerpt = excerpt.trim();
    if (content !== undefined) {
      blog.content = content.trim();
      // recalculate read time if not explicitly provided
      if (!readTime) {
        blog.readTime = calculateReadTime(content);
      }
    }

    if (customSlug) {
      const newSlug = slugify(customSlug);
      if (newSlug !== blog.slug) {
        const existing = await Blog.findOne({
          where: { slug: newSlug, id: { [Op.ne]: blog.id } },
        });
        if (existing) {
          blog.slug = `${newSlug}-${Date.now().toString().slice(-4)}`;
        } else {
          blog.slug = newSlug;
        }
      }
    }

    if (category !== undefined) blog.category = category;
    if (categoryLabel !== undefined) blog.categoryLabel = categoryLabel;
    if (authorName !== undefined) blog.authorName = authorName;
    if (authorRole !== undefined) blog.authorRole = authorRole;
    if (authorBadge !== undefined) blog.authorBadge = authorBadge;
    if (authorAvatar !== undefined) blog.authorAvatar = authorAvatar;
    if (authorBio !== undefined) blog.authorBio = authorBio;
    if (publishedAt !== undefined) blog.publishedAt = publishedAt;
    if (readTime !== undefined) blog.readTime = readTime;
    if (tags !== undefined) blog.tags = parseArrayField(tags);
    if (tableOfContents !== undefined) {
      blog.tableOfContents =
        typeof tableOfContents === "string"
          ? parseArrayField(tableOfContents)
          : tableOfContents;
    }
    if (metaTitle !== undefined) blog.metaTitle = metaTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;
    if (keywords !== undefined) blog.keywords = parseArrayField(keywords);
    if (canonicalUrl !== undefined) blog.canonicalUrl = canonicalUrl;
    if (featured !== undefined) blog.featured = featured === true || featured === "true";
    if (isPublished !== undefined) blog.isPublished = isPublished === true || isPublished === "true";

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog post",
      error: error.message,
    });
  }
}

/**
 * DELETE /api/blog/:id
 * Delete blog post and associated media file (Admin protected)
 */
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post #${id} not found`,
      });
    }

    // Clean up cover image file if stored locally in /media/blog/
    if (blog.coverImage && blog.coverImage.startsWith("/media/blog/")) {
      const filePath = path.join(__dirname, "..", blog.coverImage);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn("Failed to delete cover file:", e.message);
        }
      }
    }

    await blog.destroy();

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog post",
      error: error.message,
    });
  }
}

/**
 * PATCH /api/blog/:id/toggle-featured
 */
export async function toggleFeatured(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post #${id} not found`,
      });
    }

    blog.featured = !blog.featured;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog post ${blog.featured ? "marked as featured" : "unmarked as featured"}`,
      data: { id: blog.id, featured: blog.featured },
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update featured status",
      error: error.message,
    });
  }
}

/**
 * PATCH /api/blog/:id/toggle-publish
 */
export async function togglePublish(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post #${id} not found`,
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog post is now ${blog.isPublished ? "Published" : "Draft"}`,
      data: { id: blog.id, isPublished: blog.isPublished },
    });
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update publish status",
      error: error.message,
    });
  }
}

