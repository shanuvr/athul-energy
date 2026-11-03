"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  Upload,
  Trash2,
  Loader2,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog-api";
import { updateBlogPost, fetchBlogBySlug } from "@/lib/blog-api";

const RichTextEditor = dynamic(
  () => import("@/components/admin/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[420px] rounded-2xl border border-slate-200 bg-slate-50/50 p-6 animate-pulse flex items-center justify-center text-xs text-slate-400">
        Initializing Rich Text Editor...
      </div>
    ),
  }
);

export default function EditBlogPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
          <span className="text-xs font-medium">Loading editor...</span>
        </div>
      }
    >
      <EditBlogPageContent />
    </Suspense>
  );
}

function EditBlogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [isLoading, setIsLoading] = useState(true);

  // Core Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<BlogPost["category"]>("energy-audits");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverFileName, setCoverFileName] = useState("");
  const [coverAlt, setCoverAlt] = useState("");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [authorName, setAuthorName] = useState("Er. Santhosh A.");
  const [authorRole, setAuthorRole] = useState("Lead BEE Accredited Energy Auditor (AEA-0275)");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Load existing blog post data
  useEffect(() => {
    if (!id) {
      setError("No article ID provided in query params (?id=...).");
      setIsLoading(false);
      return;
    }

    async function loadPost() {
      try {
        setIsLoading(true);
        const { post } = await fetchBlogBySlug(id);
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setCategory(post.category);
          setExcerpt(post.excerpt);
          setContent(post.content || "");
          setCoverImage(post.coverImage);
          setMetaTitle(post.seo?.metaTitle || `${post.title} | Athul Energy Consultants`);
          setMetaDescription(post.seo?.metaDescription || post.excerpt);
          setKeywordsInput(
            Array.isArray(post.seo?.keywords)
              ? post.seo.keywords.join(", ")
              : Array.isArray(post.tags)
              ? post.tags.join(", ")
              : ""
          );
          if (post.author?.name) setAuthorName(post.author.name);
          if (post.author?.role) setAuthorRole(post.author.role);
        } else {
          setError(`Article with ID/slug '${id}' not found.`);
        }
      } catch (err: any) {
        console.error("Failed to load article:", err);
        setError("Failed to fetch article details from database.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImage(event.target.result as string);
          if (!coverAlt) {
            setCoverAlt(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverImage("");
    setCoverFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Article title is required.");
      setActiveTab("content");
      return;
    }

    if (!slug.trim()) {
      setError("A clean URL slug is required for search engines.");
      setActiveTab("seo");
      return;
    }

    if (!content.trim()) {
      setError("Article content is required.");
      setActiveTab("content");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("slug", slug.trim());
      formData.append("category", category);
      formData.append("excerpt", excerpt.trim() || title.trim());
      formData.append("content", content.trim());
      if (coverFile) {
        formData.append("coverImage", coverFile);
      } else if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      formData.append("metaTitle", metaTitle.trim() || `${title} | Athul Energy Consultants`);
      formData.append("metaDescription", metaDescription.trim() || excerpt.trim());
      formData.append("keywords", keywordsInput.trim());
      formData.append("authorName", authorName.trim());
      formData.append("authorRole", authorRole.trim());

      await updateBlogPost(id, formData);

      setSuccessToast(true);
      setTimeout(() => {
        router.push("/dashboard/blog");
      }, 1200);
    } catch (err: any) {
      console.error("Failed to update blog post:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update article. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400 space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
        <span className="text-xs font-medium">Loading article details for editing...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#053824] text-white px-5 py-3 text-xs font-semibold shadow-2xl animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
          <span>Article updated successfully! Redirecting...</span>
        </div>
      )}

      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <Link
            href="/dashboard/blog"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Technical Articles</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Edit Technical Article
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Update technical content, cover imagery, and optimize Google SEO meta tags.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/dashboard/blog"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>{isSubmitting ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "content"
              ? "bg-[#053824] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>1. Article Content &amp; Formatting</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "seo"
              ? "bg-[#053824] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>2. SEO Suite &amp; Google Preview</span>
        </button>
      </div>

      {/* Main Content Area */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "content" ? (
          /* =================== TAB 1: CONTENT =================== */
          <div className="space-y-6">
            {/* Title & Category Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Article Title (H1) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Complete Guide to Mandatory BEE Energy Audits for Designated Consumers"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BlogPost["category"])}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all font-medium"
                  >
                    <option value="energy-audits">BEE Energy Audits</option>
                    <option value="electrical-safety">Electrical Safety (CEA)</option>
                    <option value="thermography">Infrared Thermography</option>
                    <option value="power-quality">Power Quality &amp; Harmonics</option>
                    <option value="thermal-utilities">Boiler &amp; Steam Systems</option>
                    <option value="sustainability">Green Building &amp; NAAC</option>
                  </select>
                </div>
              </div>

              {/* Cover Image File Upload Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Featured Cover Image <span className="text-slate-400 font-normal">(File Upload)</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {coverImage ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 flex items-center gap-3.5">
                      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-200 shadow-2xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverImage}
                          alt={coverAlt || "Article cover preview"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate mb-1.5">
                          {coverFileName || coverImage.split("/").pop() || "Cover image attached"}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <Upload className="h-3 w-3 text-emerald-700" />
                            <span>Replace</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveCover}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-full h-24 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-600 bg-slate-50/70 hover:bg-emerald-50/30 transition-all p-3 cursor-pointer group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-700 shadow-2xs mb-1.5 transition-colors">
                        <Upload className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-800 transition-colors">
                        Click to upload new cover image
                      </span>
                      <span className="text-[10px] text-slate-400">
                        PNG, JPG, WEBP (16:9 ratio recommended)
                      </span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Cover Image Alt Text (SEO)
                  </label>
                  <input
                    type="text"
                    value={coverAlt}
                    onChange={(e) => setCoverAlt(e.target.value)}
                    placeholder="e.g. Lead energy auditor inspecting switchgear with power analyzer"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
                  />
                  <p className="mt-1 text-[10.5px] text-slate-400">
                    Descriptive text indexed by Google Images.
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Lead Excerpt / Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Provide an executive technical summary for directory cards and snippet previews..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all leading-relaxed"
                />
              </div>
            </div>

            {/* Rich Text Editor Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Technical Article Body (H2/H3, Tables, Checklists) <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Use ## for H2 sections to automatically generate the Table of Contents.
                  </p>
                </div>
              </div>

              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>
        ) : (
          /* =================== TAB 2: SEO SUITE =================== */
          <div className="space-y-6">
            {/* Google SERP Snippet Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Google Search Result Preview (Page 1 Simulator)
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-sans space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Athul Energy</span>
                  <span className="text-slate-400">›</span>
                  <span className="text-slate-500 truncate">blog › {slug || "your-article-slug"}</span>
                </div>
                <div className="text-base sm:text-lg font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
                  {metaTitle || `${title || "Article Title"} | Athul Energy Consultants`}
                </div>
                <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {metaDescription || excerpt || "Write an informative meta description to encourage high organic click-through rates from engineering leads on Google."}
                </div>
              </div>
            </div>

            {/* SEO Form Inputs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              {/* URL Slug */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Custom Clean URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl border border-slate-200 bg-slate-50 focus-within:border-emerald-600 overflow-hidden">
                  <span className="inline-flex items-center px-3 text-xs text-slate-500 bg-slate-100/80 border-r border-slate-200 select-none">
                    athulenergy.com/blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-"))}
                    placeholder="clean-article-slug"
                    className="w-full px-3 py-2 text-xs font-mono text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Meta Title (Google Title Tag)
                  </label>
                  <span className="text-[10.5px] text-slate-400 font-mono">
                    {metaTitle.length}/60 recommended
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Complete Guide to BEE Mandatory Energy Audits | Athul Energy"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Meta Description (SERP Snippet)
                  </label>
                  <span className="text-[10.5px] text-slate-400 font-mono">
                    {metaDescription.length}/155 recommended
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Accredited technical audit guide detailing Form 1 filing protocols, SEC benchmark calculations, and BEE statutory compliance..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Focus Keywords */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Focus SEO Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  placeholder="BEE Energy Audit, Electrical Safety Audit, Harmonics IEEE 519, Kerala"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Author & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Accredited Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author Professional Role
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Link
            href="/dashboard/blog"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>

          <div className="flex items-center gap-2">
            {activeTab === "content" ? (
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                Next: Configure SEO &amp; Preview →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                ← Back to Content
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-6 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

