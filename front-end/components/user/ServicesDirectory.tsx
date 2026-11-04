"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Flame,
  FileCheck2,
  GraduationCap,
  LayoutGrid,
  Layers,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Factory,
  Building2,
  Award,
  ShieldAlert,
  Thermometer,
  Activity,
  Droplets,
  Leaf,
  Volume2,
  Wind,
  Sun,
  ClipboardCheck,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  type ServiceCategoryId,
} from "@/lib/services-data";

// Professional Lucide category icons with strictly enforced size classes
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
    return <Zap className={mergedClass} strokeWidth={2.2} />;
  }
  if (type === "shield") {
    return <ShieldCheck className={mergedClass} strokeWidth={2.2} />;
  }
  if (type === "flame") {
    return <Flame className={mergedClass} strokeWidth={2.2} />;
  }
  if (type === "fileCheck") {
    return <FileCheck2 className={mergedClass} strokeWidth={2.2} />;
  }
  if (type === "graduation") {
    return <GraduationCap className={mergedClass} strokeWidth={2.2} />;
  }
  return <LayoutGrid className={mergedClass} strokeWidth={2.2} />;
}

// Distinct, professional Lucide emblems for each service domain
function ServiceVisualEmblem({
  slug,
  className = "h-5 w-5 sm:h-6 sm:w-6 text-[#15803d]",
}: {
  slug: string;
  className?: string;
}) {
  const iconClass = `${className} shrink-0`;

  // Thermal imaging & Thermography
  if (slug.includes("thermography") || slug.includes("thermal-imaging") || slug.includes("hot-spot")) {
    return <Thermometer className={iconClass} strokeWidth={1.8} />;
  }

  // Electrical & Industrial Safety, Arc Flash, Hazard
  if (slug.includes("safety-audit") || slug.includes("cea") || slug.includes("arc-flash")) {
    return <ShieldCheck className={iconClass} strokeWidth={1.8} />;
  }
  if (slug.includes("hazard") || slug.includes("fire-safety")) {
    return <ShieldAlert className={iconClass} strokeWidth={1.8} />;
  }

  // Mandatory BEE, PAT Scheme, Monitoring & Verification
  if (slug.includes("mandatory-bee") || slug.includes("pat-scheme") || slug.includes("perform-achieve")) {
    return <Award className={iconClass} strokeWidth={1.8} />;
  }

  // Building & Commercial energy audits
  if (slug.includes("building-energy") || slug.includes("commercial-building") || slug.includes("hvac")) {
    return <Building2 className={iconClass} strokeWidth={1.8} />;
  }

  // Detailed industrial energy audits
  if (slug.includes("detailed-energy-audit") || slug.includes("boiler") || slug.includes("furnace")) {
    return <Factory className={iconClass} strokeWidth={1.8} />;
  }

  // Power Quality, Harmonics, ETAP
  if (slug.includes("power-quality") || slug.includes("harmonic") || slug.includes("etap")) {
    return <Activity className={iconClass} strokeWidth={1.8} />;
  }

  // Water Audit & Ultrasonic Flow
  if (slug.includes("water") || slug.includes("ultrasonic-flow")) {
    return <Droplets className={iconClass} strokeWidth={1.8} />;
  }

  // NAAC, Green Audit, GRIHA, NABH
  if (slug.includes("naac") || slug.includes("griha") || slug.includes("nabh") || slug.includes("green")) {
    return <Leaf className={iconClass} strokeWidth={1.8} />;
  }

  // Solar PV
  if (slug.includes("solar")) {
    return <Sun className={iconClass} strokeWidth={1.8} />;
  }

  // Acoustic / Sound
  if (slug.includes("acoustic") || slug.includes("noise") || slug.includes("vibration")) {
    return <Volume2 className={iconClass} strokeWidth={1.8} />;
  }

  // Compressed Air
  if (slug.includes("compressed-air")) {
    return <Wind className={iconClass} strokeWidth={1.8} />;
  }

  // Technical Training
  if (slug.includes("training") || slug.includes("exam") || slug.includes("workshop")) {
    return <GraduationCap className={iconClass} strokeWidth={1.8} />;
  }

  // Default certificate / check
  return <ClipboardCheck className={iconClass} strokeWidth={1.8} />;
}

export default function ServicesDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId | "all">("all");

  // Read URL search parameter safely on client-side mount without de-opting SSR/Static HTML export
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCat = params.get("cat") as ServiceCategoryId | null;
      if (
        urlCat &&
        [
          "energy-audits",
          "safety-audits",
          "surveys-thermography",
          "compliance-studies",
          "training",
        ].includes(urlCat)
      ) {
        setSelectedCategory(urlCat);
      }
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

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
                <LayoutGrid className="w-4 h-4 text-emerald-800" strokeWidth={2.2} />
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
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${mobileCatOpen ? "rotate-180 text-emerald-700" : ""}`}
              strokeWidth={2.2}
            />
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
                    <Layers className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
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
              <Search className="h-3.5 w-3.5 text-slate-400" strokeWidth={2.2} />
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
                <X className="h-3 w-3" strokeWidth={2.2} />
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
              <LayoutGrid className="w-5 h-5 text-emerald-800" strokeWidth={2.2} />
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
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${
                          isActive ? "text-[#4ade80] translate-x-0.5" : "text-slate-400 group-hover:translate-x-0.5"
                        }`}
                        strokeWidth={2.2}
                      />
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
                    <Layers className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  </span>
                  <span className="text-[13.5px]">All Other Services</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    selectedCategory === "all" ? "bg-emerald-500/25 text-[#4ade80]" : "bg-slate-100 text-slate-600"
                  }`}>
                    {categoryCounts.all}
                  </span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${selectedCategory === "all" ? "text-[#4ade80]" : "text-slate-400"}`}
                    strokeWidth={2.2}
                  />
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
                <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
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
                  <X className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* Empty search state */}
          {filteredServices.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center my-4 sm:my-6">
              <Search className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-slate-300" strokeWidth={1.5} />
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
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_10px_30px_-16px_rgba(15,23,42,0.25)] sm:p-5"
              >
                {/* Subtle top accent revealed on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-300 group-hover:scale-x-100"
                />

                {/* Full-card stretched link (makes entire card navigate to service detail page) */}
                <Link
                  prefetch={false}
                  href={`/services/${service.slug}`}
                  className="absolute inset-0 z-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  aria-label={`View full specifications and methodology for ${service.title}`}
                />

                {/* Top Row: Left Thumbnail + Details */}
                <div className="relative z-1 pointer-events-none flex items-start gap-3 sm:gap-4 min-w-0">
                  {/* Real service photo thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 sm:h-20 sm:w-20">
                    <Image
                      src={`/services/${service.slug}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 80px, 64px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                    <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-md bg-white/95 text-emerald-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                      <ServiceVisualEmblem
                        slug={service.slug}
                        className="h-3 w-3"
                      />
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                          {service.categoryLabel}
                        </span>
                        <h3 className="mt-0.5 text-[13px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-emerald-800 sm:text-[15px]">
                          {service.title}
                        </h3>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        {service.badge && (
                          <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9.5px] font-semibold text-slate-500 sm:text-[10px]">
                            {service.badge}
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className="hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors duration-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white sm:inline-flex"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      </div>
                    </div>

                    <p className="mt-1.5 text-[11px] sm:text-[12.5px] leading-relaxed text-slate-600 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Checkmarked Key Deliverables (as seen in Mockup) */}
                <div className="relative z-1 pointer-events-none mt-2.5 pt-2 border-t border-slate-100/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] sm:text-[11.5px] text-slate-700 font-medium">
                  {service.keyDeliverables.slice(0, 2).map((deliv, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      <span className="line-clamp-1">{deliv}</span>
                    </span>
                  ))}
                </div>

                {/* Bottom Action Bar: primary view-details button + secondary book-audit button */}
                <div className="pointer-events-none relative z-1 mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="pointer-events-auto relative z-10 inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800 sm:text-xs"
                  >
                    <span>View details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </Link>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="pointer-events-auto relative z-10 inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:text-xs"
                  >
                    <Calendar className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                    Book audit
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
