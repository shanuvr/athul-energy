import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Award, Factory, Users2 } from "lucide-react";
import TeamDirectory from "@/components/user/TeamDirectory";

export const metadata: Metadata = {
  title: "Engineering Team & Leadership | Athul Energy Consultants",
  description:
    "Meet our multidisciplinary team of BEE Accredited Energy Auditors, CEA Electrical Safety Inspectors, FLIR Level-II Thermographers, and GRIHA Green Building specialists.",
  keywords: [
    "Athul Energy Team",
    "BEE Accredited Energy Auditor Kerala",
    "Santhosh A Energy Auditor",
    "Electrical Safety Auditor",
    "FLIR Thermographer Kerala",
    "GRIHA Consultant",
    "Energy Auditing Specialists",
  ],
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Hero Section */}
      <section className="border-b border-slate-200/90 bg-white py-8 sm:py-12 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-4 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <Link href="/" className="shrink-0 hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <Link href="/about" className="shrink-0 hover:text-emerald-700 transition-colors">
              About Us
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <span className="shrink-0 font-semibold text-slate-900">
              Our Engineering Team
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                  <Users2 className="h-3.5 w-3.5" />
                  Technical Leadership &amp; Field Specialists
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                  BEE &amp; EMC Kerala Empanelled
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Our Multidisciplinary Audit &amp; Engineering Team
              </h1>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                Led by BEE Accredited Energy Auditors with over 25 years of industry experience. Our multidisciplinary engineers bring accredited qualifications, certified instrumentation, and rigorous field testing across electrical, thermal, safety, and green building domains.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center min-w-[110px]">
                <span className="block text-xl font-extrabold text-emerald-800">25+</span>
                <span className="text-[10.5px] font-medium text-slate-500 uppercase tracking-wider">
                  Years Exp
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center min-w-[110px]">
                <span className="block text-xl font-extrabold text-emerald-800">1,000+</span>
                <span className="text-[10.5px] font-medium text-slate-500 uppercase tracking-wider">
                  Audits Done
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center min-w-[110px]">
                <span className="block text-xl font-extrabold text-emerald-800">BEE AEA</span>
                <span className="text-[10.5px] font-medium text-slate-500 uppercase tracking-wider">
                  Accredited
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center min-w-[110px]">
                <span className="block text-xl font-extrabold text-emerald-800">100%</span>
                <span className="text-[10.5px] font-medium text-slate-500 uppercase tracking-wider">
                  NABL Tools
                </span>
              </div>
            </div>
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
