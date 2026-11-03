import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Blog } from "../model/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || "https://www.athulenergy.com";

export const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/services", priority: "0.9", changefreq: "weekly" },
  { loc: "/blog", priority: "0.9", changefreq: "daily" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  { loc: "/downloads", priority: "0.8", changefreq: "weekly" },
  { loc: "/gallery", priority: "0.7", changefreq: "weekly" },
  { loc: "/team", priority: "0.7", changefreq: "monthly" },
];

export const SERVICE_SLUGS = [
  "behavioural-based-safety",
  "college-faculty-student-skill-workshops",
  "commercial-building-energy-audit",
  "construction-site-safety-audit",
  "detailed-energy-audit",
  "earth-pit-resistance-testing",
  "ecbc-building-simulation-compliance",
  "electrical-distribution-loss-study",
  "electrical-safety-audit",
  "energy-accounting-service",
  "energy-auditor-training-service",
  "energy-conservation-efficiency-workshop",
  "etap-power-system-study",
  "fire-safety-audit",
  "green-audit-naac-accreditation",
  "griha-energy-audit",
  "industrial-electrical-safety-training",
  "industrial-occupational-safety-audit",
  "infrared-thermal-imaging-survey",
  "investment-grade-energy-audit-service",
  "iso-50001-enms-consultancy",
  "lightning-protection-study",
  "lux-level-illumination-survey",
  "mandatory-bee-emc-audit",
  "mechanical-industrial-thermography-service",
  "monitoring-verification-under-perform-achieve-and-trade-pat-scheme",
  "nabh-nqas-hospital-safety-audit",
  "overhead-line-distribution-survey",
  "pat-scheme-verification",
  "power-quality-harmonics-study",
  "process-safety-hazop-study",
  "renewable-consumption-obligation-rco",
  "thermal-energy-audit-service",
  "ultrasonic-flow-measurement-services",
  "water-audit-balancing",
];

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date) {
  try {
    if (!date) return new Date().toISOString().split("T")[0];
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
    return d.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

/**
 * Generate fresh XML sitemap string querying live database
 */
export async function generateSitemapXml(siteUrl = BASE_URL) {
  const cleanBase = siteUrl.replace(/\/+$/, "");
  const today = new Date().toISOString().split("T")[0];

  // Fetch all published blogs from database
  let publishedBlogs = [];
  try {
    publishedBlogs = await Blog.findAll({
      where: { isPublished: true },
      attributes: ["id", "title", "slug", "coverImage", "publishedAt", "updatedAt"],
      order: [["publishedAt", "DESC"], ["id", "DESC"]],
    });
  } catch (err) {
    console.warn("Sitemap: Could not query blogs table (DB offline?), skipping dynamic blogs:", err.message);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // 1. Core Static Pages
  for (const page of STATIC_PAGES) {
    const loc = page.loc === "/" ? cleanBase : `${cleanBase}${page.loc}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. All 35 Services Pages
  for (const slug of SERVICE_SLUGS) {
    xml += `  <url>\n`;
    xml += `    <loc>${cleanBase}/services/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // 3. Dynamic Published Blog Posts
  for (const blog of publishedBlogs) {
    if (!blog.slug) continue;
    const blogUrl = `${cleanBase}/blog/${blog.slug}`;
    const lastMod = formatDate(blog.updatedAt || blog.publishedAt);

    xml += `  <url>\n`;
    xml += `    <loc>${blogUrl}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;

    // Google Image SEO for blog cover image
    if (blog.coverImage) {
      const imgUrl = blog.coverImage.startsWith("http")
        ? blog.coverImage
        : `${cleanBase}${blog.coverImage.startsWith("/") ? "" : "/"}${blog.coverImage}`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      if (blog.title) {
        xml += `      <image:title>${escapeXml(blog.title)}</image:title>\n`;
      }
      xml += `    </image:image>\n`;
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

/**
 * Synchronize generated sitemap to disk files so static servers or CDN also serve it
 */
export async function syncSitemapFiles(siteUrl = BASE_URL) {
  try {
    const xml = await generateSitemapXml(siteUrl);

    // Target locations
    const targets = [
      path.resolve(__dirname, "../../front-end/public/sitemap.xml"),
      path.resolve(__dirname, "../../front-end/out/sitemap.xml"),
    ];

    for (const target of targets) {
      try {
        const parentDir = path.dirname(target);
        if (fs.existsSync(parentDir)) {
          fs.writeFileSync(target, xml, "utf8");
          console.log(`[Sitemap] Synced sitemap.xml to ${target}`);
        }
      } catch (e) {
        console.warn(`[Sitemap] Could not write to ${target}:`, e.message);
      }
    }

    return xml;
  } catch (error) {
    console.error("[Sitemap] Error synchronizing sitemap files:", error.message);
    return null;
  }
}

