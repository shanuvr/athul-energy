"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  type ServiceCategoryId,
  type ServiceDetail,
} from "@/lib/services-data";

// Custom category icons with strictly enforced size classes to avoid SVG blowout
function CategorySymbol({
  type,
  className = "",
  size = "h-4 w-4",
}: {
  type: string;
  className?: string;
  size?: string;
}) {
  const mergedClass = `${size} shrink-0 ${className}`;

  if (type === "zap") {
    return (
      <svg className={mergedClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg className={mergedClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.4c0 4.3-2.9 7.6-7 9.6-4.1-2-7-5.3-7-9.6V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 12l1.9 1.9 3.6-3.8" />
      </svg>
    );
  }
  if (type === "flame") {
    return (
      <svg className={mergedClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  if (type === "fileCheck") {
    return (
      <svg className={mergedClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }
  // graduation
  return (
    <svg className={mergedClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}

// Distinct visual illustrations/emblems for service cards matching the mockup
function ServiceVisualEmblem({
  slug,
  className = "h-5 w-5 sm:h-6 sm:w-6 text-[#15803d]",
}: {
  slug: string;
  className?: string;
}) {
  const iconClass = `${className} shrink-0`;

  if (slug.includes("detailed-energy-audit") || slug.includes("building-energy")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  if (slug.includes("mandatory-bee") || slug.includes("pat-scheme") || slug.includes("perform-achieve")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (slug.includes("safety-audit") || slug.includes("cea") || slug.includes("hazard")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }

  if (slug.includes("thermography") || slug.includes("thermal-imaging") || slug.includes("hot-spot")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (slug.includes("power-quality") || slug.includes("harmonic") || slug.includes("etap")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }

  if (slug.includes("water") || slug.includes("ultrasonic-flow")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }

  if (slug.includes("naac") || slug.includes("griha") || slug.includes("nabh") || slug.includes("green")) {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }

  // Default certificate / check
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export default function ServicesDirectory() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as ServiceCategoryId) || "energy-audits";

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId | "all">(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  // Sync category state from URL query
  useEffect(() => {
    const cat = searchParams.get("cat") as ServiceCategoryId | null;
    if (cat && ["energy-audits", "safety-audits", "surveys-thermography", "compliance-studies", "training"].includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SERVICES_DATA.length };
    SERVICE_CATEGORIES.forEach((cat) => {
      counts[cat.id] = SERVICES_DATA.filter((s) => s.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchCat = selectedCategory === "all" || service.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = service.title.toLowerCase().includes(q);
      const matchDesc = service.shortDesc.toLowerCase().includes(q) || service.fullDesc.toLowerCase().includes(q);
      const matchStandards = service.standards.some((s) => s.toLowerCase().includes(q));
      const matchDeliverables = service.keyDeliverables.some((d) => d.toLowerCase().includes(q));
      const matchEquipment = service.equipmentUsed.some((e) => e.toLowerCase().includes(q));

      return matchTitle || matchDesc || matchStandards || matchDeliverables || matchEquipment;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategory = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory);
  const activeTitle = selectedCategory === "all" ? "All Engineering Services" : (activeCategory?.title || "Services");
  const activeShortTitle = selectedCategory === "all" ? "All Services" : (activeCategory?.shortTitle || "Services");
  const activeCount = selectedCategory === "all" ? SERVICES_DATA.length : (categoryCounts[selectedCategory] || 0);

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-12">
      {/* Mobile Category Dropdown Selector + Search Bar (Matching Mockup 2) */}
      <div className="lg:hidden mb-4">
        {/* Category Dropdown Pill */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-xs">
          <button
            type="button"
            onClick={() => setMobileCatOpen(!mobileCatOpen)}
            className="flex w-full items-center justify-between text-left"
            aria-expanded={mobileCatOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100/80 shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                  Service Categories
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                  {activeShortTitle} ({activeCount})
                </span>
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${mobileCatOpen ? "rotate-180 text-emerald-700" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expanded Category Menu */}
          {mobileCatOpen && (
            <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setMobileCatOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#053824] text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <CategorySymbol
                        type={cat.iconType}
                        className={isActive ? "text-[#4ade80]" : "text-emerald-700"}
                        size="h-3.5 w-3.5"
                      />
                      <span className="truncate">{cat.shortTitle}</span>
                    </span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${
                      isActive ? "bg-emerald-500/25 text-[#4ade80]" : "bg-slate-100 text-slate-600"
                    }`}>
                      {categoryCounts[cat.id]}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setMobileCatOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-all ${
                  selectedCategory === "all" ? "bg-[#053824] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className={selectedCategory === "all" ? "text-[#4ade80]" : "text-emerald-700"}>
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </span>
                  <span className="truncate">All Disciplines</span>
                </span>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 shrink-0">
                  {categoryCounts.all}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Search Input Bar (Mobile - placed right under category selector as in Mockup 2) */}
        <div className="mt-2.5">
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Energy Audit, PAT, BEE...)"
              className="w-full rounded-full border border-slate-200 bg-white py-1.5 pl-9 pr-8 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Column Split (Desktop Viewport matching Mockup 1) */}
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* Left Sticky Sidebar (Desktop Only) */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 mb-2 border-b border-slate-100 pb-3">
              <svg className="w-5 h-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Service Categories</h3>
            </div>

            {/* Category Navigation Items */}
            <nav className="space-y-1">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all ${
                      isActive
                        ? "bg-[#053824] text-white shadow-sm font-bold"
                        : "text-slate-700 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={isActive ? "text-[#4ade80]" : "text-emerald-700 group-hover:text-emerald-800"}>
                        <CategorySymbol type={cat.iconType} size="h-4 w-4" />
                      </span>
                      <span className="text-[13.5px] truncate">{cat.shortTitle}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          isActive
                            ? "bg-emerald-500/25 text-[#4ade80]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {count}
                      </span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform ${
                          isActive ? "text-[#4ade80] translate-x-0.5" : "text-slate-400 group-hover:translate-x-0.5"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}

              {/* All Services Option */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#053824] text-white shadow-sm font-bold"
                    : "text-slate-700 hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={selectedCategory === "all" ? "text-[#4ade80]" : "text-emerald-700"}>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </span>
                  <span className="text-[13.5px]">All Other Services</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    selectedCategory === "all" ? "bg-emerald-500/25 text-[#4ade80]" : "bg-slate-100 text-slate-600"
                  }`}>
                    {categoryCounts.all}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 ${selectedCategory === "all" ? "text-[#4ade80]" : "text-slate-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </nav>
          </div>
        </aside>

        {/* Right Main Panel (Matches Mockup 1 & 2) */}
        <main className="flex-1 min-w-0 w-full">
          {/* Top Category Title & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            {/* Category header with icon and count */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#ecfdf5] border border-emerald-100 text-[#15803d]">
                <CategorySymbol
                  type={activeCategory?.iconType || "zap"}
                  size="h-5 w-5 sm:h-6 sm:w-6"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-900 truncate">
                  {selectedCategory === "all"
                    ? "All Engineering Services"
                    : (activeCategory?.shortTitle ? `${activeCategory.shortTitle} Services` : activeTitle)}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {filteredServices.length} services available
                </p>
              </div>
            </div>

            {/* Search Input Bar (Desktop only, since mobile has it right under category selector) */}
            <div className="hidden lg:block relative w-72 xl:w-80 shrink-0">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. Energy Audit, BEE, PAT...)"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-8 text-[12.5px] text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Empty search state */}
          {filteredServices.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center my-4 sm:my-6">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-3 text-sm sm:text-base font-semibold text-slate-900">No matching services</h3>
              <p className="mt-1 text-xs text-slate-500">
                We couldn&apos;t find any service matching &quot;{searchQuery}&quot;. Try typing &quot;BEE&quot;, &quot;Safety&quot;, &quot;Thermal&quot;, or &quot;GRIHA&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-3.5 inline-flex items-center rounded-lg bg-[#053824] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800"
              >
                Reset search &amp; filters
              </button>
            </div>
          )}

          {/* Horizontal Service Cards List (Exact matching Mockup 1 & 2 with interactive click affordances) */}
          <div className="space-y-3 sm:space-y-4">
            {filteredServices.map((service) => (
              <div
                key={service.slug}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md cursor-pointer"
              >
                {/* Full-card stretched link (makes entire card navigate to service detail page) */}
                <Link
                  href={`/services/${service.slug}`}
                  className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  aria-label={`View full specifications and methodology for ${service.title}`}
                />

                {/* Top Row: Left Thumbnail + Details */}
                <div className="relative z-1 pointer-events-none flex items-start gap-3 sm:gap-4 min-w-0">
                  {/* Visual Emblem Thumbnail with hover scale effect */}
                  <div className="flex h-11 w-11 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#ecfdf5] border border-emerald-100 text-[#15803d] shadow-2xs group-hover:scale-105 group-hover:bg-emerald-100/70 group-hover:border-emerald-300 transition-all duration-200">
                    <ServiceVisualEmblem slug={service.slug} />
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h3 className="text-[13px] sm:text-[15.5px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug flex items-center gap-1.5">
                        <span>{service.title}</span>
                        <svg
                          className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </h3>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {service.badge && (
                          <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold text-[#15803d]">
                            {service.badge}
                          </span>
                        )}
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                          Full Scope ↗
                        </span>
                      </div>
                    </div>

                    <p className="mt-1 text-[11px] sm:text-[12.5px] leading-relaxed text-slate-600 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Checkmarked Key Deliverables (as seen in Mockup) */}
                <div className="relative z-1 pointer-events-none mt-2.5 pt-2 border-t border-slate-100/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] sm:text-[11.5px] text-slate-700 font-medium">
                  {service.keyDeliverables.slice(0, 2).map((deliv, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5">
                      <span className="text-[#15803d] font-bold text-[11px]">✓</span>
                      <span className="line-clamp-1">{deliv}</span>
                    </span>
                  ))}
                </div>

                {/* Bottom Action Bar: Prominent 'Explore Scope & Specs' button on left, 'Book Audit' button on right */}
                <div className="relative z-1 mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/90 bg-emerald-50/70 px-3 py-1.5 text-[11px] sm:text-xs font-bold text-emerald-800 shadow-2xs group-hover:bg-[#053824] group-hover:text-white group-hover:border-[#053824] transition-all duration-200">
                    <span>Explore Scope &amp; Specs</span>
                    <svg
                      className="h-3 w-3 text-emerald-600 group-hover:text-[#4ade80] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="relative z-10 inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-[#053824] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-2xs transition-all hover:bg-emerald-800 hover:scale-[1.02] active:scale-95"
                  >
                    <svg className="h-3.5 w-3.5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Audit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
