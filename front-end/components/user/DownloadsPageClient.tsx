"use client";

import { useState, useMemo, useEffect } from "react";

import {

  Search,

  Download,

  BookOpen,

  FileText,

  Layers,

  Gavel,

  Calendar,

  Database,

  X,

  ExternalLink,

  Loader2,

} from "lucide-react";

import api, { getMediaUrl } from "@/lib/api";

export interface DownloadDoc {

  id: number | string;

  title: string;

  category: "Books" | "Government Orders" | "Standards" | string;

  format?: string;

  fileSize?: string;

  size?: string;

  year: string;

  fileUrl?: string;

  downloadUrl?: string;

  fileName?: string;

}

const CATEGORIES = [

  { id: "All", label: "All", icon: null },

  { id: "Books", label: "Books", icon: BookOpen },

  { id: "Government Orders", label: "Govt. Orders", icon: FileText },

  { id: "Standards", label: "Standards", icon: Layers },

  { id: "Regulations", label: "Regulations", icon: Gavel },

] as const;

function PdfIcon({ className = "h-9 w-7 shrink-0" }: { className?: string }) {

  return (

    <svg

      className={className}

      viewBox="0 0 36 44"

      fill="none"

      xmlns="http://www.w3.org/2000/svg"

      aria-hidden="true"

    >

      <path

        d="M4 3C2.89543 3 2 3.89543 2 5V39C2 40.1046 2.89543 41 4 41H32C33.1046 41 34 40.1046 34 39V14L23 3H4Z"

        fill="#FFFFFF"

        stroke="#CBD5E1"

        strokeWidth="1.25"

      />

      <path

        d="M23 3V12C23 13.1046 23.8954 14 25 14H34"

        fill="#F1F5F9"

        stroke="#CBD5E1"

        strokeWidth="1.25"

        strokeLinejoin="round"

      />

      <rect x="2" y="22" width="22" height="13" rx="2.5" fill="#EF4444" />

      <text

        x="13"

        y="31.5"

        textAnchor="middle"

        fill="#FFFFFF"

        fontSize="7.5"

        fontWeight="800"

        fontFamily="system-ui, -apple-system, sans-serif"

        letterSpacing="0.4px"

      >

        PDF

      </text>

    </svg>

  );

}

export default function DownloadsPageClient() {

  const [docs, setDocs] = useState<DownloadDoc[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [search, setSearch] = useState<string>("");

  useEffect(() => {

    let isMounted = true;

    const fetchDownloads = async () => {

      try {

        setLoading(true);

        const res = await api.get("/downloads");

        if (!isMounted) return;

        if (res.data?.success && Array.isArray(res.data.data)) {

          setDocs(res.data.data);

          try {

            localStorage.setItem("athul_downloads_cache", JSON.stringify(res.data.data));

          } catch {}

        } else if (Array.isArray(res.data)) {

          setDocs(res.data);

          try {

            localStorage.setItem("athul_downloads_cache", JSON.stringify(res.data));

          } catch {}

        } else {

          setDocs([]);

        }

      } catch {

        // Fallback gracefully without console error overlay

        if (!isMounted) return;

        try {

          const cached =

            localStorage.getItem("athul_downloads_cache") ||

            localStorage.getItem("athul_admin_downloads");

          if (cached) {

            const parsed = JSON.parse(cached);

            if (Array.isArray(parsed) && parsed.length > 0) {

              setDocs(parsed);

              return;

            }

          }

        } catch {}

        setDocs([]);

      } finally {

        if (isMounted) setLoading(false);

      }

    };

    fetchDownloads();

    return () => {

      isMounted = false;

    };

  }, []);

  const categoryCounts = useMemo(() => {

    const counts: Record<string, number> = {

      All: docs.length,

      Books: 0,

      "Government Orders": 0,

      Standards: 0,

      Regulations: 0,

    };

    docs.forEach((doc) => {

      if (counts[doc.category] !== undefined) {

        counts[doc.category] = (counts[doc.category] || 0) + 1;

      }

    });

    return counts;

  }, [docs]);

  const filteredDocs = useMemo(() => {

    const q = search.trim().toLowerCase();

    return docs.filter((doc) => {

      const matchesCategory =

        activeCategory === "All" || doc.category === activeCategory;

      const matchesSearch =

        q === "" ||

        doc.title.toLowerCase().includes(q) ||

        (doc.category && doc.category.toLowerCase().includes(q)) ||

        (doc.year && doc.year.includes(q));

      return matchesCategory && matchesSearch;

    });

  }, [docs, activeCategory, search]);

  const getCategoryIcon = (category: string) => {

    const cls = "h-3.5 w-3.5 text-slate-600 shrink-0";

    switch (category) {

      case "Books":

        return <BookOpen className={cls} />;

      case "Government Orders":

        return <FileText className={cls} />;

      case "Standards":

        return <Layers className={cls} />;

      case "Regulations":

        return <Gavel className={cls} />;

      default:

        return null;

    }

  };

  const getCategoryDisplay = (category: string) =>

    category;

  return (

    <div className="space-y-6">

      {/* ===== Filter + Search row ===== */}

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

        {/* Category pills */}

        <div className="flex items-center gap-2.5 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          {CATEGORIES.map((cat) => {

            const isActive = activeCategory === cat.id;

            const count = categoryCounts[cat.id] || 0;

            const Icon = cat.icon;

            return (

              <button

                key={cat.id}

                type="button"

                onClick={() => setActiveCategory(cat.id)}

                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${

                  isActive

                    ? "bg-[#053824] text-white shadow-md"

                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"

                }`}

              >

                {Icon && <Icon className="h-4 w-4 shrink-0" />}

                <span>{cat.label}</span>

                <span

                  className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${

                    isActive ? "text-emerald-100" : "bg-slate-200/70 text-slate-600"

                  }`}

                >

                  {isActive ? `(${count})` : count}

                </span>

              </button>

            );

          })}

        </div>

        {/* Search */}

        <div className="relative w-full lg:w-72 shrink-0">

          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <input

            type="text"

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            placeholder="Search documents..."

            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"

          />

          {search && (

            <button

              type="button"

              onClick={() => setSearch("")}

              aria-label="Clear search"

              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"

            >

              <X className="h-3.5 w-3.5" />

            </button>

          )}

        </div>

      </div>

      {/* ===== Documents Grid or Loading / Empty States ===== */}

      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {[1, 2, 3, 4].map((n) => (

            <div

              key={n}

              className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-2xs animate-pulse flex items-center justify-between gap-3"

            >

              <div className="flex items-center gap-3 flex-1 min-w-0">

                <div className="h-9 w-7 bg-slate-200 rounded-md shrink-0" />

                <div className="space-y-2 flex-1">

                  <div className="h-3.5 bg-slate-200 rounded-md w-3/4" />

                  <div className="h-2.5 bg-slate-100 rounded-md w-1/2" />

                </div>

              </div>

              <div className="h-8 w-20 bg-slate-100 rounded-lg shrink-0" />

            </div>

          ))}

        </div>

      ) : filteredDocs.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {filteredDocs.map((doc) => {

            const downloadHref = doc.fileUrl

              ? getMediaUrl(doc.fileUrl)

              : doc.downloadUrl || "#";

            const displaySize = doc.fileSize || doc.size || "PDF";

            const displayYear = doc.year || "2026";

            return (

              <article

                key={doc.id}

                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 hover:border-emerald-200 hover:shadow-sm transition-all"

              >

                {/* PDF Icon */}

                <PdfIcon className="h-8 w-6 shrink-0" />

                {/* Title + meta — grows to fill space */}

                <div className="min-w-0 flex-1">

                  <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-1 group-hover:text-emerald-900 transition-colors">

                    {doc.title}

                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-slate-700 font-medium">

                      {getCategoryIcon(doc.category)}

                      {getCategoryDisplay(doc.category)}

                    </span>

                    <span className="flex items-center gap-1">

                      <Calendar className="h-3 w-3 text-slate-400 shrink-0" />

                      {displayYear}

                    </span>

                    <span className="flex items-center gap-1">

                      <Database className="h-3 w-3 text-slate-400 shrink-0" />

                      {displaySize}

                    </span>

                  </div>

                </div>

                {/* Download button — pinned to the right */}

                {downloadHref && downloadHref !== "#" ? (

                  <a

                    href={downloadHref}

                    target="_blank"

                    rel="noopener noreferrer"

                    title={`Open / Download ${doc.title} in new tab`}

                    className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-emerald-700 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-[#053824] hover:border-[#053824] hover:text-white transition-all cursor-pointer"

                  >

                    <Download className="h-3.5 w-3.5" />

                    <span className="hidden sm:inline">Download</span>

                  </a>

                ) : (

                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400 cursor-not-allowed">

                    <Download className="h-3.5 w-3.5" />

                    <span className="hidden sm:inline">Unavailable</span>

                  </span>

                )}

              </article>

            );

          })}

        </div>

      ) : (

        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 bg-white text-center">

          <FileText className="h-10 w-10 text-slate-300 mb-3" />

          <h3 className="text-sm font-bold text-slate-800">No documents found</h3>

          <p className="mt-1 text-xs text-slate-500 max-w-sm">

            {search || activeCategory !== "All"

              ? `No statutory files matched "${search}". Try selecting another category or clearing your search.`

              : "No statutory documents have been published yet. Please check back soon."}

          </p>

          {(search || activeCategory !== "All") && (

            <button

              type="button"

              onClick={() => {

                setSearch("");

                setActiveCategory("All");

              }}

              className="mt-4 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer"

            >

              Clear Filters

            </button>

          )}

        </div>

      )}

      {/* ===== Statutory advisory notice ===== */}

      <div className="relative isolate overflow-hidden rounded-3xl border border-slate-800 bg-[#002425] p-6 sm:p-8 text-white shadow-xl">

        <div

          aria-hidden="true"

          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl"

        />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          <div className="max-w-xl">

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">

              Statutory Advisory Notice

            </span>

            <h4 className="mt-1 text-lg font-bold text-white">

              Need certified audit assistance under these standards?

            </h4>

            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">

              Our BEE Accredited Energy Auditors and CEA Safety Specialists

              conduct statutory audits, PAT cycle verifications, and K-ECBC

              compliance for designated consumers across Kerala and South India.

            </p>

          </div>

          <a

            href="/contact"

            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-colors cursor-pointer shadow-sm"

          >

            <span>Request Statutory Audit</span>

            <ExternalLink className="h-4 w-4" />

          </a>

        </div>

      </div>

    </div>

  );

}
