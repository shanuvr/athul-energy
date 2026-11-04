import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Phone,
  Lock,
  ListOrdered,
} from "lucide-react";
import { fetchBlogs, fetchBlogBySlug } from "@/lib/blog-api";
import BlogCard from "@/components/user/BlogCard";
import Breadcrumbs from "@/components/user/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  if (!posts || posts.length === 0) {
    return [{ slug: "_" }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "_") {
    return {
      title: "Article Not Found | Athul Energy Consultants",
      description: "The requested engineering insight or article could not be located.",
    };
  }
  const { post } = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Athul Energy Consultants",
      description: "The requested engineering insight or article could not be located.",
    };
  }

  const cleanTitle = post.title.replace(/\s*\|\s*Athul Energy.*$/i, "").trim();
  const fullTitle = post.seo?.metaTitle
    ? post.seo.metaTitle
    : `${cleanTitle} | Athul Energy Consultants`;
  const metaDescription = post.seo?.metaDescription || post.excerpt;
  const canonicalUrl = `https://www.athulenergy.com/blog/${post.slug}`;
  const ogImageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://www.athulenergy.com${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
      siteName: "Athul Energy Consultants",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 animate-pulse">
      <div className="border-b border-slate-200/90 bg-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-48 bg-slate-200 rounded mb-4" />
          <div className="h-8 w-3/4 bg-slate-200 rounded mb-3" />
          <div className="h-4 w-1/2 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] w-full max-w-3xl bg-slate-200 rounded-2xl mb-6" />
        <div className="space-y-3 max-w-3xl">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

async function BlogPostContent({ params }: Props) {
  const { slug } = await params;
  if (slug === "_") {
    notFound();
  }
  const { post, related: relatedPosts } = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://www.athulenergy.com/blog/${post.slug}`;
  const postImageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://www.athulenergy.com${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`;

  // Structured Data (JSON-LD) for Google TechArticle schema + Breadcrumbs
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        headline: post.title,
        description: post.excerpt,
        image: postImageUrl,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        inLanguage: "en-IN",
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
          description: post.author.bio,
        },
        publisher: {
          "@type": "Organization",
          name: "Athul Energy Consultants Pvt. Ltd.",
          url: "https://www.athulenergy.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.athulenergy.com/athul-logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.athulenergy.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Technical Blog",
            item: "https://www.athulenergy.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <div className="min-h-screen bg-slate-50/60 pb-16">
        {/* Top Breadcrumb & Article Header */}
        <section className="border-b border-slate-200/90 bg-white py-6 sm:py-10 shadow-2xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation with BreadcrumbList Schema */}
            <Breadcrumbs
              items={[
                { label: "Engineering Insights", href: "/blog" },
                { label: post.title },
              ]}
              className="px-0 py-0 mb-4"
            />

            {/* Article Header Metadata */}
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                  {post.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {post.publishedAt}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                {post.excerpt}
              </p>

              {/* Author Strip */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white font-bold text-xs shadow-xs">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900">
                      {post.author.name}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {post.author.role}
                    </span>
                  </div>
                </div>

                {post.author.badge && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    {post.author.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Article Container */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Columns: Article Hero Image & Technical Content */}
            <main className="lg:col-span-8 space-y-6">
              {/* Featured Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 850px"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[11px]">
                  <span className="font-semibold text-slate-200">
                    Field Study Dossier · Athul Energy Consultants
                  </span>
                  <span className="rounded-md bg-black/40 backdrop-blur-xs px-2 py-0.5 border border-white/20 text-emerald-300 font-bold text-[10px]">
                    NABL Calibrated Instrumentation
                  </span>
                </div>
              </div>

              {/* Key Takeaways Callout Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  Key Statutory Takeaways for Plant Managers
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-950 leading-relaxed list-disc list-inside">
                  <li>Mandatory compliance intervals must be adhered to avoid Section 26 fines under the Energy Conservation Act 2001.</li>
                  <li>All baseline SEC and electrical safety reports require direct sign-off by a BEE Accredited Energy Auditor.</li>
                  <li>Third-party verified NABL instrument calibration is legally required for Form 1 and Form A/B verification.</li>
                </ul>
              </div>

              {/* Formatted Article Body */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xs blog-article-content max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatArticleContent(post.content),
                  }}
                />
              </div>

              {/* Tags Section */}
              {post.tags && post.tags.length > 0 && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Related Engineering Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white font-extrabold text-sm shadow-sm">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Article Author &amp; Technical Auditor
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {post.author.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {post.author.role}
                    </p>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Technical Articles */}
              {relatedPosts.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Related Technical Guides
                    </h3>
                    <Link
                      href="/blog"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      View all insights →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedPosts.map((rel) => (
                      <BlogCard key={rel.id} post={rel} />
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* Right 4 Columns: Sticky Table of Contents & Consultation Box */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 lg:top-36 space-y-6">
                {/* Table of Contents */}
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3 text-slate-900 font-bold text-xs uppercase tracking-wider">
                      <ListOrdered className="h-4 w-4 text-emerald-700" />
                      Table of Contents
                    </div>
                    <nav className="space-y-1.5 text-xs">
                      {post.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-slate-600 hover:text-emerald-800 hover:font-semibold transition-colors py-1 leading-snug"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Consultation & Scoping Box */}
                <div className="rounded-2xl border border-emerald-200/90 bg-white p-6 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Statutory Consultation
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    Plan Your Statutory Audit with Athul Energy
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connect directly with Er. Santhosh A. and our certified engineering auditors to assess facility compliance under EC Act 2001 or CEA Regulations.
                  </p>

                  <div className="pt-2 space-y-2">
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#053824] py-3 text-xs font-bold text-white shadow-2xs hover:bg-emerald-800 transition-colors"
                    >
                      Request Audit Scoping
                      <ArrowRight className="h-3.5 w-3.5 text-[#4ade80]" />
                    </Link>

                    <a
                      href="tel:+917356111990"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      +91 73561 11990
                    </a>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 leading-relaxed border border-slate-100 flex items-start gap-2">
                    <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-700 block">NDA Assured:</strong>
                      Plant single-line diagrams and utility bills are handled strictly under non-disclosure agreements.
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Basic markdown-to-HTML formatter to transform headings, lists, tables, and blockquotes cleanly
 */
function formatArticleContent(content: string): string {
  let html = content
    // Convert ## Heading {#id} to <h2 id="id">Heading</h2>
    .replace(/^##\s+(.+?)\s+\{#(.+?)\}/gm, '<h2 id="$2" class="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-100">$1</h2>')
    // Convert standard ## Heading to <h2>Heading</h2>
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-100">$1</h2>')
    // Convert ### Subheading to <h3>Subheading</h3>
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-base sm:text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
    // Convert blockquotes
    .replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-emerald-500 bg-emerald-50/50 p-4 rounded-r-xl my-4 text-xs sm:text-sm text-slate-700 font-medium italic">$1</blockquote>')
    // Convert Markdown tables (simple regex parser)
    .replace(/\|(.+)\|/g, (match) => {
      if (match.includes("---")) return ""; // Skip delimiter row
      const cells = match.split("|").filter((c) => c.trim().length > 0);
      const isHeader = match.includes("**");
      const tag = isHeader ? "th" : "td";
      const rowContent = cells
        .map(
          (c) =>
            `<${tag} class="border border-slate-200 px-3 py-2 text-left ${
              isHeader ? "bg-slate-100 font-bold text-slate-900" : "text-slate-700"
            }">${c.trim()}</${tag}>`
        )
        .join("");
      return `<tr class="hover:bg-slate-50">${rowContent}</tr>`;
    })
    // Convert bold text **text** to <strong>text</strong>
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    // Convert bullet points
    .replace(/^-\s+(.+)$/gm, '<li class="text-xs sm:text-sm text-slate-600 mb-1">$1</li>')
    // Convert paragraph line breaks
    .replace(/\n\n/g, "</p><p class='mt-3 text-xs sm:text-sm leading-relaxed text-slate-600'>");

  // Wrap table rows in a styled table if table tags exist
  if (html.includes("<tr")) {
    html = html.replace(
      /(<tr[\s\S]+?<\/tr>)/g,
      '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-slate-200 rounded-xl overflow-hidden">$1</table></div>'
    );
  }

  return `<p class='text-xs sm:text-sm leading-relaxed text-slate-600'>${html}</p>`;
}
