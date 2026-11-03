"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Search,
  ExternalLink,
  Star,
  Edit,
  CheckCircle2,
  AlertCircle,
  Globe,
  Loader2,
  Calendar,
} from "lucide-react";
import {
  fetchBlogs,
  deleteBlogPost,
  toggleBlogFeatured,
  toggleBlogPublish,
  type BlogPost,
} from "@/lib/blog-api";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = useCallback((msg: string, isError = false) => {
    if (isError) {
      setToastError(msg);
      setTimeout(() => setToastError(null), 3500);
    } else {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, []);

  // Load articles from backend API
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs({ all: true });
      setPosts(data);
    } catch (err: unknown) {
      console.error("Failed to load blog posts:", err);
      showToast("Could not load from backend. Showing cached list.", true);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filtered = posts.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search.trim() ||
      p.title.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q);
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleFeatured = async (id: string) => {
    try {
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
      );
      await toggleBlogFeatured(id);
      showToast("Featured status updated successfully");
    } catch (err: unknown) {
      console.error("Failed to toggle featured:", err);
      showToast("Failed to update featured status", true);
      loadPosts(); // Revert
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, isPublished: p.isPublished !== undefined ? !p.isPublished : false }
            : p
        )
      );
      await toggleBlogPublish(id);
      showToast("Article visibility updated");
    } catch (err: unknown) {
      console.error("Failed to toggle publish:", err);
      showToast("Failed to update publish status", true);
      loadPosts(); // Revert
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      setIsDeleting(true);
      await deleteBlogPost(deleteConfirmId);
      setPosts((prev) => prev.filter((p) => p.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      showToast("Article deleted permanently");
    } catch (err: unknown) {
      console.error("Failed to delete blog post:", err);
      showToast("Failed to delete article. Check backend server.", true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold shadow-2xl animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {toastError && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-red-600 text-white px-4 py-3 text-xs font-semibold shadow-2xl animate-in slide-in-from-bottom-3">
          <AlertCircle className="h-4 w-4 text-white shrink-0" />
          <span>{toastError}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Technical Article</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete this article and its uploaded cover media? This action cannot be undone and will affect live search URLs.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
              >
                {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Dynamic Publishing Desk · MySQL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Technical Blog &amp; Whitepapers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Publish and manage SEO-optimized technical articles with H1/H2 hierarchy, cover image uploads, and Google SERP snippets.
          </p>
        </div>

        <Link
          href="/dashboard/blog/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Write Technical Post</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by article title, slug, author, or category..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {[
            { id: "all", label: "All Categories" },
            { id: "energy-audits", label: "BEE Audits" },
            { id: "electrical-safety", label: "Safety (CEA)" },
            { id: "power-quality", label: "Power Quality" },
            { id: "thermography", label: "Thermography" },
            { id: "thermal-utilities", label: "Boiler & Steam" },
            { id: "sustainability", label: "Sustainability" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#053824] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
          <span className="text-xs font-medium">Fetching articles from database...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400">
              No technical articles found matching your query.
            </div>
          ) : (
            filtered.map((post) => (
              <div
                key={post.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {post.categoryLabel}
                      </span>
                      {post.isPublished === false && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(post.id)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          post.featured
                            ? "text-amber-500 bg-amber-50"
                            : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"
                        }`}
                        title={post.featured ? "Featured on Home" : "Set as featured"}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  {/* Slug & Date */}
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-400 mt-1.5 mb-2">
                    <div className="flex items-center gap-1 truncate max-w-[200px]">
                      <Globe className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="truncate">/blog/{post.slug}</span>
                    </div>
                    <span className="text-slate-400 font-sans flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.seo?.metaDescription || post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                      {post.author.name[0]}
                    </div>
                    <span className="text-[11px] font-medium text-slate-600 truncate">
                      {post.author.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(post.id)}
                      className={`px-2 py-1 rounded-lg text-[10.5px] font-bold cursor-pointer transition-colors ${
                        post.isPublished !== false
                          ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                          : "text-amber-700 bg-amber-50 hover:bg-amber-100"
                      }`}
                      title={post.isPublished !== false ? "Click to set Draft" : "Click to Publish"}
                    >
                      {post.isPublished !== false ? "Live" : "Draft"}
                    </button>

                    <Link
                      href={`/dashboard/blog/edit?id=${post.id}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Edit article & SEO"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      title="View live page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(post.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
