import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DownloadsPageClient from "@/components/user/DownloadsPageClient";

export const metadata: Metadata = {
  title: "Statutory Downloads, Government Orders & Standards | Athul Energy Consultants",
  description:
    "Official regulatory gazettes, Bureau of Energy Efficiency (BEE) guidebooks, Central Electricity Authority (CEA) safety standards, K-ECBC orders, and energy auditing study manuals.",
  keywords: [
    "BEE Guide Books PDF",
    "CEA Regulations 2010 Gazette",
    "K-ECBC Kerala Gazette",
    "Energy Conservation Act amended",
    "Electricity Act 2003 statutory audit",
    "NAAC Criteria 7 Green Audit Manual",
    "Athul Energy Downloads",
  ],
  alternates: {
    canonical: "/downloads",
  },
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Hero Section */}
      <section className="border-b border-slate-200 bg-white py-10 sm:py-14 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="font-semibold text-slate-900">Downloads &amp; Knowledge Base</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                Statutory Regulatory Knowledge Base
              </span>
            </div>

            <h1 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Technical Standards, Government Orders &amp; Reference Books
            </h1>

            <p className="mt-3 text-pretty text-sm sm:text-base leading-relaxed text-slate-600">
              Access and download official Central &amp; State Government Gazette orders,
              Bureau of Energy Efficiency (BEE) study books, Central Electricity Authority (CEA)
              safety regulations, and environmental compliance standards.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Verified Gazette Copies
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Official BEE Guidebooks
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                CEA Safety Codes 2010
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Downloads Container */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <DownloadsPageClient />
      </main>
    </div>
  );
}
