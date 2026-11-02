"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  FileText,
  BookOpen,
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";

export interface DownloadDoc {
  id: string;
  title: string;
  category: "Books" | "Government Orders" | "Standards" | "Regulations";
  format: "PDF";
  size: string;
  date: string;
  authority: string;
  description: string;
  downloadUrl: string;
}

export const STATUTORY_DOCUMENTS: DownloadDoc[] = [
  // ==========================================
  // 1. Books & Technical Handbooks
  // ==========================================
  {
    id: "book-1",
    title: "BEE Guide Book 1: General Aspects of Energy Management & Audit",
    category: "Books",
    format: "PDF",
    size: "8.4 MB",
    date: "2024 Edition",
    authority: "Bureau of Energy Efficiency (BEE)",
    description:
      "Core statutory study manual covering energy security, national energy conservation acts, global environmental concerns, energy monitoring and financial management.",
    downloadUrl: "#download-bee-book-1",
  },
  {
    id: "book-2",
    title: "BEE Guide Book 2: Energy Efficiency in Thermal Utilities & Boilers",
    category: "Books",
    format: "PDF",
    size: "9.2 MB",
    date: "2024 Edition",
    authority: "Bureau of Energy Efficiency (BEE)",
    description:
      "Comprehensive engineering manual for industrial boilers, steam distribution, furnaces, waste heat recovery, and refractory insulation systems.",
    downloadUrl: "#download-bee-book-2",
  },
  {
    id: "book-3",
    title: "BEE Guide Book 3: Energy Efficiency in Electrical Utilities",
    category: "Books",
    format: "PDF",
    size: "7.8 MB",
    date: "2024 Edition",
    authority: "Bureau of Energy Efficiency (BEE)",
    description:
      "Electrical distribution systems, power factor correction, transformers, electric motors, compressed air, HVAC, refrigeration, and cooling towers.",
    downloadUrl: "#download-bee-book-3",
  },
  {
    id: "book-4",
    title: "BEE Guide Book 4: Energy Performance Assessment for Utility Equipment",
    category: "Books",
    format: "PDF",
    size: "11.5 MB",
    date: "2024 Edition",
    authority: "Bureau of Energy Efficiency (BEE)",
    description:
      "Detailed test procedures, calculation methodologies, and instrumentation protocols for field verification of industrial equipment efficiency.",
    downloadUrl: "#download-bee-book-4",
  },
  {
    id: "book-5",
    title: "Industrial Electrical Safety Handbook & Inspection Manual",
    category: "Books",
    format: "PDF",
    size: "4.6 MB",
    date: "Revised 2023",
    authority: "Athul Energy Technical Directorate",
    description:
      "Field engineering handbook on CEA 2010 safety rules, switchboard clearances, earthing pit measurement, arc-flash boundary, and transformer protection.",
    downloadUrl: "#download-safety-handbook",
  },

  // ==========================================
  // 2. Government Orders & Gazettes
  // ==========================================
  {
    id: "go-1",
    title: "Kerala State Energy Conservation Building Code (K-ECBC) Gazette",
    category: "Government Orders",
    format: "PDF",
    size: "4.1 MB",
    date: "19/02/2020",
    authority: "Government of Kerala / EMC Kerala",
    description:
      "Official gazette notification prescribing mandatory energy efficiency design standards for commercial and institutional buildings across Kerala.",
    downloadUrl: "#download-k-ecbc-gazette",
  },
  {
    id: "go-2",
    title: "Electricity Act 2003 (Statutory Energy Auditing Provisions)",
    category: "Government Orders",
    format: "PDF",
    size: "3.2 MB",
    date: "Act No. 36 of 2003",
    authority: "Ministry of Power, Govt. of India",
    description:
      "The foundational central legislation governing generation, transmission, distribution, consumer metering, and mandatory safety compliance across India.",
    downloadUrl: "#download-electricity-act-2003",
  },
  {
    id: "go-3",
    title: "Energy Conservation Act 2001 (Amended 2010 & 2022 Provisions)",
    category: "Government Orders",
    format: "PDF",
    size: "2.9 MB",
    date: "Amended 2022",
    authority: "Parliament of India / BEE",
    description:
      "Statutory provisions defining Designated Consumers (DCs), mandatory energy audits, energy consumption standards, and carbon credit trading scheme.",
    downloadUrl: "#download-ec-act-amended",
  },
  {
    id: "go-4",
    title: "Kerala Municipality Building Rules (KMBR 2019 – Energy & Solar Chapter)",
    category: "Government Orders",
    format: "PDF",
    size: "5.6 MB",
    date: "26/03/2020",
    authority: "Local Self Government Dept., Kerala",
    description:
      "State statutory building bylaws mandating rooftop solar PV installation, rainwater harvesting, and electrical safety certifications for building occupancy.",
    downloadUrl: "#download-kmbr-2019",
  },
  {
    id: "go-5",
    title: "EMC Kerala Mandatory Energy Audit Order for Industrial & HT Consumers",
    category: "Government Orders",
    format: "PDF",
    size: "1.8 MB",
    date: "Statutory Order",
    authority: "Energy Management Centre (EMC) Kerala",
    description:
      "State designated agency order specifying periodic statutory energy audit cycles and filing deadlines for HT and EHT industrial plants in Kerala.",
    downloadUrl: "#download-emc-mandatory-order",
  },

  // ==========================================
  // 3. Standards & Technical Codes
  // ==========================================
  {
    id: "std-1",
    title: "CEA Regulations on Power Quality & Grid Harmonics (IEEE 519 Limits)",
    category: "Standards",
    format: "PDF",
    size: "1.8 MB",
    date: "19/02/2020",
    authority: "Central Electricity Authority (CEA)",
    description:
      "Technical standards specifying Total Harmonic Distortion (THD) voltage and current injection limits for bulk industrial consumers connected to the grid.",
    downloadUrl: "#download-cea-harmonics",
  },
  {
    id: "std-2",
    title: "CEA (Measures Relating to Safety and Electric Supply) Regulations 2010",
    category: "Standards",
    format: "PDF",
    size: "3.4 MB",
    date: "Statutory Gazette",
    authority: "Central Electricity Authority (CEA)",
    description:
      "Mandatory safety regulations covering electrical installations, earthing standards, insulation testing, hazardous atmospheres, and periodic safety audits.",
    downloadUrl: "#download-cea-safety-2010",
  },
  {
    id: "std-3",
    title: "ISO 50001:2018 Energy Management Systems Standard Guidance",
    category: "Standards",
    format: "PDF",
    size: "2.5 MB",
    date: "ISO International",
    authority: "International Organization for Standardization",
    description:
      "Systematic framework for industrial organizations to establish energy baselines (EnB), energy performance indicators (EnPIs), and continual efficiency improvements.",
    downloadUrl: "#download-iso-50001",
  },
  {
    id: "std-4",
    title: "NAAC Criteria 7: Environmental & Green Audit Implementation Manual",
    category: "Standards",
    format: "PDF",
    size: "2.1 MB",
    date: "24/06/2020",
    authority: "National Assessment & Accreditation Council",
    description:
      "Official institutional assessment guidelines for conducting Green Audits, Energy Audits, and Environment Audits for higher educational colleges and universities.",
    downloadUrl: "#download-naac-criteria-7",
  },
  {
    id: "std-5",
    title: "Solid Waste Management Guidelines & Effluent Discharge Rules",
    category: "Standards",
    format: "PDF",
    size: "3.8 MB",
    date: "26/03/2020",
    authority: "Suchitwa Mission / KSPCB",
    description:
      "Statutory guidelines for industrial and commercial campus waste segregation, decentralized composting, wastewater recycling, and pollution board compliance.",
    downloadUrl: "#download-solid-waste-guidelines",
  },

  // ==========================================
  // 4. Regulations & Policies
  // ==========================================
  {
    id: "reg-1",
    title: "KSERC (Renewable Energy & Net Metering) Regulations 2020",
    category: "Regulations",
    format: "PDF",
    size: "2.4 MB",
    date: "19/02/2020",
    authority: "Kerala State Electricity Regulatory Commission",
    description:
      "Comprehensive regulatory framework governing grid-interactive solar installations, net-metering settlement, banking of energy, and wheeling charges.",
    downloadUrl: "#download-kserc-regulations",
  },
  {
    id: "reg-2",
    title: "Environment Audit Rules 2025 (Statutory Green Audit Guidelines)",
    category: "Regulations",
    format: "PDF",
    size: "3.5 MB",
    date: "07/09/2025",
    authority: "MoEFCC / Central Pollution Control Board",
    description:
      "Updated statutory guidelines for carbon footprint inventorying, air emission monitoring, and biodiversity compliance reporting for industrial sites.",
    downloadUrl: "#download-environment-audit-rules",
  },
];

const CATEGORIES = [
  "All",
  "Books",
  "Government Orders",
  "Standards",
  "Regulations",
] as const;

function PdfIcon({ className = "h-11 w-11 shrink-0" }: { className?: string }) {
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

export default function DownloadsPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredDocs = useMemo(() => {
    return STATUTORY_DOCUMENTS.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        doc.title.toLowerCase().includes(q) ||
        doc.authority.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: STATUTORY_DOCUMENTS.length,
      Books: 0,
      "Government Orders": 0,
      Standards: 0,
      Regulations: 0,
    };
    STATUTORY_DOCUMENTS.forEach((doc) => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Search Bar & Category Filter Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by title, standard code, authority (e.g. BEE, CEA, K-ECBC)..."
            className="h-12 sm:h-13 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#053824] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredDocs.length}</strong> statutory documents
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </span>
        <span className="hidden sm:inline text-slate-400">
          Official Gazette Notifications &amp; PDF Downloads
        </span>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredDocs.map((doc) => {
            const isBook = doc.category === "Books";
            const isGO = doc.category === "Government Orders";
            const isStd = doc.category === "Standards";

            return (
              <article
                key={doc.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-emerald-600/40 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Card Header: Category Badge & Format */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        isBook
                          ? "bg-amber-50 text-amber-800 border border-amber-200/80"
                          : isGO
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                          : isStd
                          ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                          : "bg-purple-50 text-purple-800 border border-purple-200/80"
                      }`}
                    >
                      {isBook && <BookOpen className="h-3 w-3" />}
                      {isGO && <Scale className="h-3 w-3" />}
                      {isStd && <ShieldCheck className="h-3 w-3" />}
                      {!isBook && !isGO && !isStd && <Award className="h-3 w-3" />}
                      <span>{doc.category}</span>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-400">
                      {doc.size} • {doc.date}
                    </span>
                  </div>

                  {/* Document Icon + Title Block */}
                  <div className="flex items-start gap-3.5">
                    <PdfIcon className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 drop-shadow-xs" />
                    <div className="min-w-0">
                      <h3 className="font-display text-base sm:text-[16.5px] font-bold leading-snug tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-emerald-700">
                        {doc.authority}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Verified Gazette Copy</span>
                  </div>

                  <a
                    href={doc.downloadUrl}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer group-hover:scale-[1.02]"
                    title={`Download ${doc.title}`}
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 bg-white text-center">
          <FileText className="h-10 w-10 text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No documents found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            No statutory files matched &ldquo;{search}&rdquo;. Try clearing your search filter or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-4 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Statutory Advisory Notice Box */}
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
            <h4 className="mt-1 text-lg font-bold text-white font-display">
              Need certified audit assistance under these standards?
            </h4>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Our BEE Accredited Energy Auditors and CEA Safety Specialists conduct
              statutory audits, PAT cycle verifications, and K-ECBC compliance for
              designated consumers across Kerala and South India.
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
