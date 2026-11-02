"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, ShieldCheck, Users } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/team-data";
import TeamMemberCard from "@/components/user/TeamMemberCard";

type FilterTab = "all" | "core" | "bee-experts";

export default function TeamDirectory() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const coreTeam = TEAM_MEMBERS.filter((m) => m.department !== "bee-experts");
  const beeExperts = TEAM_MEMBERS.filter((m) => m.department === "bee-experts");

  const displayedMembers =
    activeTab === "core"
      ? coreTeam
      : activeTab === "bee-experts"
      ? beeExperts
      : TEAM_MEMBERS;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header and Filter Controls */}
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="block h-1 w-12 bg-emerald-600 rounded-full" />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Accredited Auditors &amp; Empaneled Sector Specialists
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A comprehensive roster of BEE Accredited Energy Auditors, Certified
            Energy Managers, and statutory sector specialists empanelled for
            Refineries, Power Plants, DISCOMs, and Commercial Buildings.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200/80 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-3.5 w-3.5 text-emerald-600" />
            <span>All Specialists ({TEAM_MEMBERS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("core")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "core"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Our Core Team ({coreTeam.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bee-experts")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "bee-experts"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>BEE Sector Experts ({beeExperts.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayedMembers.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} priority={index < 3} />
        ))}
      </div>

      {/* Bottom CTA Card */}
      <div className="relative isolate overflow-hidden rounded-3xl border border-slate-800 bg-[#002425] px-6 py-8 text-white sm:px-10 sm:py-10 shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              Statutory Consultation &amp; Audits
            </span>
            <h3 className="mt-2.5 text-balance font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              Need a qualified specialist for your plant or commercial facility?
            </h3>
            <p className="mt-2 text-pretty text-xs leading-relaxed text-slate-300 sm:text-sm">
              Connect with our BEE Accredited Energy Auditors to scope mandatory
              BEE/EMC statutory cycles, electrical safety reviews, or PAT M&amp;V
              mandates.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
            <Link
              href="/contact"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 text-xs sm:text-sm font-bold text-slate-950 transition-colors cursor-pointer shadow-sm"
            >
              Request an audit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+917356111990"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              +91 73561 11990
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
