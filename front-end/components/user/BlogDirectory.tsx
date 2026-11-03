"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Phone,
  ShieldCheck,
  Layers,
  Zap,
  Flame,
  Activity,
  Gauge,
  Leaf,
  SlidersHorizontal,
} from "lucide-react";
import {
  BLOG_CATEGORIES,
  type BlogPost,
  fetchBlogs,
} from "@/lib/blog-api";
import BlogCard from "@/components/user/BlogCard";

function getCategoryIcon(id: string) {
  switch (id) {
    case "energy-audits":
      return Zap;
    case "electrical-safety":
      return ShieldCheck;
    case "thermography":
      return Flame;
    case "power-quality":
      return Activity;
    case "thermal-utilities":
      return Gauge;
    case "sustainability":
      return Leaf;
    default:
      return Layers;
  }
}

interface BlogDirectoryProps {
  initialPosts?: BlogPost[];
}

export default function BlogDirectory({ initialPosts = [] }: BlogDirectoryProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs().then((data) => {
      if (Array.isArray(data)) {
        setPosts(data);
      }
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;

      // Search query filter
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryLabel.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, posts]);

  // Lead featured post (only shown when no specific search is active and on 'all' tab)
  const featuredPost = useMemo(() => {
    if (activeCategory === "all" && !searchQuery.trim() && posts.length > 0) {
      return posts.find((p) => p.featured) || posts[0];
    }
    return null;
  }, [activeCategory, searchQuery, posts]);

  // Remaining posts when featured post is highlighted
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic or standard (e.g. BEE, CEA, Harmonics)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 sm:pl-10 pr-8 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Total Count Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
          <span className="font-medium">
            Showing <strong className="text-slate-900">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
          {activeCategory !== "all" && (
            <button
              onClick={() => setActiveCategory("all")}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {BLOG_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? posts.length
                : posts.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#053824] text-white shadow-xs font-bold"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-800"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-emerald-300" : "text-slate-400"}`} />
                <span>{cat.shortLabel}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* When NO articles are published yet in the database */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mb-3 border border-emerald-100">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Technical Articles Coming Soon</h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Our accredited energy auditors and electrical safety engineers publish practical statutory whitepapers, case studies, and compliance insights regularly.
          </p>
        </div>
      ) : (
        <>
          {/* Featured Whitepaper Showcase (only when available) */}
          {featuredPost && (
            <>
              {/* Mobile View: Compact Horizontal Featured Card */}
              <div className="sm:hidden group relative flex flex-row items-center gap-3.5 p-3 rounded-2xl border border-emerald-400/60 bg-emerald-50/20 shadow-2xs hover:border-emerald-500 transition-all">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-900 shadow-2xs">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-1.5 left-1.5">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-500 text-slate-950 font-black text-[8px] uppercase tracking-wider px-1.5 py-0.5 shadow-xs">
                      <Sparkles className="h-2 w-2" />
                      Featured
                    </span>
                  </div>

                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-md bg-black/75 backdrop-blur-xs px-1.5 py-0.5 text-[9.5px] font-semibold text-white shadow-xs">
                    <Clock className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                    <span className="whitespace-nowrap">{featuredPost.readTime}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider truncate">
                        {featuredPost.categoryLabel}
                      </span>
                    </div>

                    <h2 className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                      {featuredPost.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 mt-2 truncate">
                    <span className="font-medium text-slate-700 truncate">{featuredPost.author.name}</span>
                    <span className="text-slate-300">•</span>
                    <span className="shrink-0">{featuredPost.publishedAt}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={featuredPost.title}
                />
              </div>

              {/* Tablet & Desktop View */}
              <div className="hidden sm:block relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:border-emerald-600/40 hover:shadow-lg transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:col-span-7 bg-slate-950 overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        Featured Technical Guide
                      </span>
                      <span className="rounded-full bg-black/60 backdrop-blur-xs border border-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5">
                        {featuredPost.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{featuredPost.author.name}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-300">{featuredPost.author.role}</span>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{featuredPost.publishedAt}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {featuredPost.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                      <span className="text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                        Read Full Technical Article
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={featuredPost.title}
                />
              </div>
            </>
          )}

          {/* Main Feed of Articles */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No matching articles found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any technical guides matching &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center rounded-xl bg-[#053824] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {gridPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Consultation Callout Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              Statutory Engineering Assistance
            </span>
            <h3 className="mt-2 text-lg sm:text-2xl font-bold tracking-tight">
              Require a Plant Audit or Statutory Compliance Verification?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our accredited engineers conduct comprehensive field measurements, calculate baseline SEC, and provide signed statutory documentation for BEE, EMC Kerala, and CEA requirements.
            </p>
          </div>

          <div className="shrink-0 flex flex-row sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-500 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm text-center cursor-pointer"
            >
              <span>Plant Audit Scoping</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="tel:+917356111990"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors text-center"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              <span>Call Team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
