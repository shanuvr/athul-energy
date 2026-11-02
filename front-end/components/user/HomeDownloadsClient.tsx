"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface DocumentItem {
  id: string;
  title: string;
  category: "Books" | "Government Orders" | "Standards" | string;
  format: "PDF";
  size: string;
  downloadUrl: string;
}

interface HomeDownloadsClientProps {
  documents: DocumentItem[];
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
      {/* Document page with folded corner */}
      <path
        d="M4 3C2.89543 3 2 3.89543 2 5V39C2 40.1046 2.89543 41 4 41H32C33.1046 41 34 40.1046 34 39V14L23 3H4Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.25"
      />
      {/* Folded flap */}
      <path
        d="M23 3V12C23 13.1046 23.8954 14 25 14H34"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Red PDF banner badge */}
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
  documents,
}: HomeDownloadsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        doc.title.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [documents, activeCategory, searchQuery]);

  // Display MAXIMUM 4 files at any time on the homepage (per design specification)
  const visibleDocuments = filtered.slice(0, 4);

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      {/* Search Bar & Filter Row */}
      <div className="flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            aria-label="Search documents"
            className="h-11 sm:h-12 w-full rounded-full bg-white px-5 pr-11 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
            <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div
          role="tablist"
          aria-label="Document categories"
          className="flex w-full items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
      {visibleDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {visibleDocuments.map((doc) => (
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
                    {doc.format} • {doc.size}
                  </p>
                </div>
              </div>

              {/* Download Action Button */}
              <a
                href={doc.downloadUrl}
                download
                aria-label={`Download ${doc.title}`}
                className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-all duration-200 hover:bg-emerald-500 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                <DownloadIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-800/50 bg-[#052923]/70 p-6 text-center backdrop-blur-sm">
          <p className="text-xs sm:text-sm text-slate-300">
            No documents found matching &ldquo;{searchQuery}&rdquo;.
          </p>
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
