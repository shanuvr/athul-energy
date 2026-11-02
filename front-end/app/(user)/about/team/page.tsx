import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TeamDirectory from "@/components/user/TeamDirectory";

export const metadata: Metadata = {
  title: "Engineering Team & Leadership | Athul Energy Consultants",
  description:
    "Meet our multidisciplinary team of BEE Accredited Energy Auditors, Certified Energy Managers, and BEE Empaneled Sector Experts for Refineries, Thermal Power, DISCOMs, and Buildings.",
  keywords: [
    "Athul Energy Team",
    "BEE Accredited Energy Auditor Kerala",
    "Santhosh A Energy Auditor",
    "Ashok KMP Energy Auditor",
    "Electrical Safety Auditor",
    "BEE Sector Empaneled Experts",
    "Energy Auditing Specialists",
  ],
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Hero Section */}
      <section className="border-b border-slate-200 bg-white py-8 shadow-2xs sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1 text-[11px] text-slate-500 scrollbar-none sm:text-xs">
            <Link href="/" className="shrink-0 transition-colors hover:text-emerald-700">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <Link href="/about" className="shrink-0 transition-colors hover:text-emerald-700">
              About Us
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <span className="shrink-0 font-semibold text-slate-900">
              Our Engineering Team
            </span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Technical leadership
            </p>

            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Our multidisciplinary audit &amp; engineering team
            </h1>

            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Led by BEE Accredited Energy Auditors with over 20 years of
              industry experience. Our engineers and empaneled specialists bring
              accredited statutory qualifications, certified instrumentation, and
              rigorous field testing across industrial plants, refineries, power
              stations, and commercial facilities.
            </p>

            <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              12 Accredited Specialists &amp; Empaneled Experts · Thrissur, Kerala
            </p>
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <TeamDirectory />
      </div>
    </div>
  );
}
