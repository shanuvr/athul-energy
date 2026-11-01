"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Search,
  ExternalLink,
  Sparkles,
  Clock,
  User,
  Star,
  CheckCircle2,
} from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<BlogPost["category"]>("energy-audits");
  const [newReadTime, setNewReadTime] = useState("6 min read");
  const [newExcerpt, setNewExcerpt] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      p.author.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      )
    );
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newTitle,
      excerpt: newExcerpt || "Technical energy audit scoping documentation.",
      content: "<p>Article draft content.</p>",
      coverImage: "/services/detailed-energy-audit.jpg",
      category: newCategory,
      categoryLabel: "Energy Management",
      author: {
        name: "Er. Santhosh A.",
        role: "Lead Accredited Energy Auditor (AEA-0275)",
      },
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: newReadTime,
      tags: ["Energy", "BEE", "Audit"],
      featured: false,
      seo: {
        metaTitle: newTitle,
        metaDescription: newExcerpt,
        keywords: ["energy audit"],
      },
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewExcerpt("");
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Technical Content &amp; Whitepapers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Blog &amp; Knowledge Base CMS
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Publish and edit engineering guides, statutory audit explainers, and technical articles.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Create Article</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, category or author..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 px-2 shrink-0 font-medium">
          Showing <strong>{filtered.length}</strong> technical articles
        </div>
      </div>

      {/* Articles Table */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-[10.5px] uppercase font-bold text-slate-400 tracking-wider bg-slate-950/50">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Discipline</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Read Time</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-white/10">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="font-bold text-white hover:text-emerald-300 transition-colors line-clamp-1 flex items-center gap-1"
                        >
                          <span>{post.title}</span>
                          <ExternalLink className="h-3 w-3 opacity-40 shrink-0" />
                        </Link>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {post.categoryLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="block font-medium">{post.author.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {post.readTime}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {post.publishedAt}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(post.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        post.featured
                          ? "text-amber-400 bg-amber-400/10"
                          : "text-slate-600 hover:text-slate-400"
                      }`}
                      title={post.featured ? "Featured on blog header" : "Set as featured"}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 text-slate-500 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-7 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Create Technical Whitepaper</h2>
            <p className="mt-1 text-xs text-slate-400">
              Draft an engineering article with reading time and category taxonomy.
            </p>

            <form onSubmit={handleCreate} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Ultrasonic Flow Measurement in Industrial Chillers"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Engineering Discipline
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as BlogPost["category"])
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="energy-audits">BEE Energy Audits</option>
                    <option value="electrical-safety">Electrical Safety (CEA)</option>
                    <option value="thermography">Infrared Thermography</option>
                    <option value="power-quality">Power Quality &amp; Harmonics</option>
                    <option value="thermal-utilities">Boiler &amp; Steam Systems</option>
                    <option value="sustainability">Green Building &amp; NAAC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    placeholder="e.g. 7 min read"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Executive Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Summary of technical methodology, statutory code references, and audit ROI..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
