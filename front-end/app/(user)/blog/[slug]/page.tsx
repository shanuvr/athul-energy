import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  ChevronRight,
  ShieldCheck,
  User,
  ArrowRight,
  Phone,
  Bookmark,
  Share2,
  CheckCircle2,
  Lock,
  ListOrdered,
  BookOpen,
} from "lucide-react";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-data";
import BlogCard from "@/components/user/BlogCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Athul Energy",
    };
  }

  return {
    title: `${post.title} | Athul Energy Consultants`,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
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
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 2);

  // Structured Data (JSON-LD) for Google TechArticle schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.athulenergy.com${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
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
      "@id": `https://www.athulenergy.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50/60 pb-16">
        {/* Top Breadcrumb & Article Header */}
        <section className="border-b border-slate-200/90 bg-white py-6 sm:py-10 shadow-2xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-4 overflow-x-auto whitespace-nowrap scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <Link href="/" className="shrink-0 hover:text-emerald-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
              <Link href="/blog" className="shrink-0 hover:text-emerald-700 transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
              <Link
                href={`/blog`}
                className="shrink-0 hover:text-emerald-700 transition-colors"
              >
                {post.categoryLabel}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
              <span className="shrink-0 font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                  {post.categoryLabel}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <span className="text-slate-300">•</span>

                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <Clock className="h-3 w-3 text-slate-400" />
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
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xs prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-base sm:prose-h3:text-lg prose-h3:mt-6 prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-sm prose-li:text-slate-600 prose-table:text-xs">
                {/* Parse Markdown content sections */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatArticleContent(post.content),
                  }}
                />
              </div>

              {/* Tags Section */}
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
              {/* Sticky Container */}
              <div className="sticky top-20 space-y-6">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md space-y-4">
                  <div>
                    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Empanelled Firm
                    </span>
                    <h3 className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Schedule a Facility Audit
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Need assistance with BEE statutory audits, electrical safety sign-offs, or power quality mitigation?
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
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
