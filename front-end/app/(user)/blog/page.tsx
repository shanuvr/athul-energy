import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, ShieldCheck } from "lucide-react";
import BlogDirectory from "@/components/user/BlogDirectory";

export const metadata: Metadata = {
  title: "Engineering Insights & Energy Audit Guides | Athul Energy Consultants",
  description:
    "Authoritative technical articles and compliance guides on BEE mandatory audits, CEA 2010 electrical safety, infrared thermography, harmonic mitigation, and boiler efficiency.",
  keywords: [
    "Energy Audit Blog",
    "BEE Mandatory Energy Audit Guide",
    "CEA Regulations 2010 Electrical Safety",
    "Infrared Thermography Guide",
    "IEEE 519 Harmonic Mitigation",
    "Boiler Efficiency Energy Conservation",
    "NAAC Criteria 7 Green Audit",
    "Athul Energy Technical Insights",
  ],
  openGraph: {
    title: "Engineering Insights & Energy Audit Guides | Athul Energy Consultants",
    description:
      "Authoritative technical articles and compliance guides on BEE mandatory audits, CEA 2010 electrical safety, and industrial energy efficiency.",
    url: "https://www.athulenergy.com/blog",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Hero Header Section */}
      <section className="border-b border-slate-200/90 bg-white py-5 sm:py-10 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link href="/" className="shrink-0 hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <span className="shrink-0 font-semibold text-slate-900">
              Technical Blog &amp; Insights
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-emerald-800">
                  <BookOpen className="h-3.5 w-3.5" />
                  Engineering Guides &amp; Whitepapers
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-slate-700">
                  BEE Accredited Auditor Insights
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Technical Knowledge, Statutory Codes &amp; Energy Guides
              </h1>

              <p className="mt-2 sm:mt-3 text-xs sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                Practical, field-tested guidance from our accredited energy auditors and electrical safety specialists. Covering BEE PAT scheme compliance, CEA regulations, FLIR thermography, and high-ROI energy conservation measures.
              </p>
            </div>

            {/* Credibility Micro-metrics */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-center">
                <span className="block text-lg font-extrabold text-emerald-800">100%</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  Accredited
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-center">
                <span className="block text-lg font-extrabold text-emerald-800">Field-Tested</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  Case Studies
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Directory Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <BlogDirectory />
      </div>
    </div>
  );
}
