"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  type BlogPost,
} from "@/lib/blog-data";
import BlogCard from "@/components/user/BlogCard";

export default function BlogDirectory() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
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
  }, [activeCategory, searchQuery]);

  // Lead featured post (only shown when no specific search is active and on 'all' tab)
  const featuredPost = useMemo(() => {
    if (activeCategory === "all" && !searchQuery.trim()) {
      return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
    }
    return null;
  }, [activeCategory, searchQuery]);

  // Remaining posts when featured post is highlighted
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic, standard, or keyword (e.g. BEE, CEA, Harmonics, Boiler)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Article Count Tag */}
        <div className="shrink-0 text-xs font-semibold text-slate-500 self-center">
          Showing <strong className="text-slate-900">{filteredPosts.length}</strong> technical guides
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {BLOG_CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? BLOG_POSTS.length
              : BLOG_POSTS.filter((p) => p.category === cat.id).length;

          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#053824] text-white shadow-2xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span>{cat.shortLabel}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                  isActive
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Whitepaper Hero Banner */}
      {featuredPost && (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:border-emerald-400 hover:shadow-md transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image on Left / Top */}
            <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-900 min-h-[260px] sm:min-h-[320px]">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1 text-[11px] font-extrabold text-slate-950 shadow-sm uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" />
                  Featured Technical Whitepaper
                </span>
              </div>
            </div>

            {/* Content on Right */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 bg-white">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                  <span className="font-bold text-emerald-800">
                    {featuredPost.categoryLabel}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featuredPost.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-900">
                    {featuredPost.author.name}
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    {featuredPost.author.role}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  Read Full Guide
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="absolute inset-0 z-0"
            aria-label={`Read featured whitepaper: ${featuredPost.title}`}
          />
        </div>
      )}

      {/* Main Grid of Articles */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No articles found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            We couldn’t find any technical guides matching &quot;{searchQuery}&quot;. Try searching for BEE, CEA, Harmonics, or Boiler.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-4 inline-flex items-center rounded-xl bg-[#053824] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Consultation Callout Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              Statutory Engineering Assistance
            </span>
            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight">
              Require a Plant Audit or Statutory Compliance Verification?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our accredited engineers conduct comprehensive field measurements, calculate baseline SEC, and provide signed statutory documentation for BEE, EMC Kerala, and CEA requirements.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Request Plant Audit Scoping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+917356111990"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              +91 73561 11990
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
