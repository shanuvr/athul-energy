"use client";

import { useState, useMemo, useEffect } from "react";

import Link from "next/link";

import api, { getMediaUrl } from "@/lib/api";

export interface DocumentItem {

  id: number | string;

  title: string;

  category: "Books" | "Government Orders" | "Standards" | string;

  format?: string;

  fileSize?: string;

  size?: string;

  fileUrl?: string;

  downloadUrl?: string;

}

interface HomeDownloadsClientProps {

  documents?: DocumentItem[];

}

const CATEGORIES = [

  "All",

  "Books",

  "Government Orders",

  "Standards",

] as const;

function PdfIcon({ className = "h-9 w-9 shrink-0" }: { className?: string }) {

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

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {

  return (

    <svg

      className={className}

      fill="none"

      viewBox="0 0 24 24"

      stroke="currentColor"

      strokeWidth={2.2}

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

    >

      <path d="M12 4v11m0 0l-4-4m4 4l4-4" />

      <path d="M4 19h16" />

    </svg>

  );

}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {

  return (

    <svg

      className={className}

      fill="none"

      viewBox="0 0 24 24"

      stroke="currentColor"

      strokeWidth={2.2}

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

    >

      <circle cx="11" cy="11" r="7" />

      <path d="m20 20-3.5-3.5" />

    </svg>

  );

}

export default function HomeDownloadsClient({

  documents: initialDocs,

}: HomeDownloadsClientProps) {

  const [docs, setDocs] = useState<DocumentItem[]>(initialDocs || []);

  const [loading, setLoading] = useState<boolean>(!initialDocs || initialDocs.length === 0);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {

    let isMounted = true;

    const fetchRecentDownloads = async () => {

      try {

        const res = await api.get("/downloads?limit=6");

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

              setDocs(parsed.slice(0, 6));

              return;

            }

          }

        } catch {}

        setDocs([]);

      } finally {

        if (isMounted) setLoading(false);

      }

    };

    fetchRecentDownloads();

    return () => {

      isMounted = false;

    };

  }, []);

  const filteredDocuments = useMemo(() => {

    return docs.filter((doc) => {

      const matchesCategory =

        activeCategory === "All" || doc.category === activeCategory;

      const matchesSearch =

        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||

        (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;

    });

  }, [docs, activeCategory, searchQuery]);

  const visibleDocuments = filteredDocuments.slice(0, 4);

  return (

    <div className="w-full space-y-4 sm:space-y-5">

      {/* Search and Category Filter Bar */}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

        {/* Search Input Box */}

        <div className="relative flex-1">

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-emerald-300/70">

            <SearchIcon className="h-4 w-4" />

          </div>

          <input

            type="search"

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            placeholder="Search documents..."

            className="w-full rounded-full border border-emerald-500/30 bg-[#02201b]/80 py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-emerald-200/50 backdrop-blur-sm transition-all duration-200 focus:border-emerald-400 focus:bg-[#032a24] focus:outline-none focus:ring-2 focus:ring-emerald-400/20"

          />

        </div>

        {/* Category Pills */}

        <div

          role="tablist"

          aria-label="Filter documents by category"

          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"

        >

          {CATEGORIES.map((category) => {

            const isActive = activeCategory === category;

            return (

              <button

                key={category}

                type="button"

                role="tab"

                aria-selected={isActive}

                onClick={() => setActiveCategory(category)}

                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${

                  isActive

                    ? "bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-400/80"

                    : "bg-[#062c26]/90 text-slate-300 border border-emerald-800/60 hover:bg-[#0c4037] hover:text-white"

                }`}

              >

                {category}

              </button>

            );

          })}

        </div>

      </div>

      {/* Document Cards Grid - Maximum 4 cards */}

      {loading ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">

          {[1, 2].map((n) => (

            <div

              key={n}

              className="rounded-2xl border border-white/10 bg-white/5 p-3.5 animate-pulse flex items-center justify-between"

            >

              <div className="h-10 w-3/4 bg-white/10 rounded-lg" />

              <div className="h-8 w-8 bg-white/10 rounded-full" />

            </div>

          ))}

        </div>

      ) : visibleDocuments.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">

          {visibleDocuments.map((doc) => {

            const downloadHref = doc.fileUrl

              ? getMediaUrl(doc.fileUrl)

              : doc.downloadUrl || "/downloads";

            const displaySize = doc.fileSize || doc.size || "PDF";

            return (

              <article

                key={doc.id}

                className="group relative flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white p-3 sm:p-3.5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-emerald-200"

              >

                <div className="flex items-center gap-3 min-w-0">

                  <PdfIcon className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />

                  <div className="min-w-0">

                    <h3 className="text-slate-900 font-bold text-xs sm:text-[13.5px] leading-snug truncate group-hover:text-emerald-700 transition-colors">

                      {doc.title}

                    </h3>

                    <p className="mt-0.5 text-[10.5px] sm:text-xs font-medium text-slate-500">

                      PDF • {displaySize}

                    </p>

                  </div>

                </div>

                {/* Download Action Button */}

                {downloadHref && downloadHref !== "#" ? (

                  <a

                    href={downloadHref}

                    target="_blank"

                    rel="noopener noreferrer"

                    aria-label={`Open / Download ${doc.title} in new tab`}

                    title={`Open / Download ${doc.title} in new tab`}

                    className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-all duration-200 hover:bg-emerald-500 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 cursor-pointer"

                  >

                    <DownloadIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                  </a>

                ) : (

                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400 cursor-not-allowed">

                    <DownloadIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                  </span>

                )}

              </article>

            );

          })}

        </div>

      ) : (

        <div className="rounded-2xl border border-emerald-800/50 bg-[#052923]/70 p-6 text-center backdrop-blur-sm">

          <p className="text-xs sm:text-sm text-slate-300">

            {searchQuery

              ? `No documents found matching "${searchQuery}".`

              : "No statutory documents have been published yet."}

          </p>

          {searchQuery && (

            <button

              type="button"

              onClick={() => {

                setSearchQuery("");

                setActiveCategory("All");

              }}

              className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"

            >

              Clear filters

            </button>

          )}

        </div>

      )}

      {/* View All Documents Action Button -> Links to dedicated page */}

      <div className="mt-2 sm:mt-3 flex justify-center">

        <Link

          href="/downloads"

          className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-[#02201b]/90 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-950 hover:scale-[1.02] active:scale-98"

        >

          <span>View All Documents</span>

          <svg

            className="h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 group-hover:translate-x-1"

            fill="none"

            viewBox="0 0 24 24"

            stroke="currentColor"

            strokeWidth={2.2}

          >

            <path

              strokeLinecap="round"

              strokeLinejoin="round"

              d="M5 12h14M13 6l6 6-6 6"

            />

          </svg>

        </Link>

      </div>

    </div>

  );

}
