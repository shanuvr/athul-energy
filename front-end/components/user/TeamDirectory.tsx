"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  LayoutGrid,
  Table as TableIcon,
  ShieldCheck,
  GraduationCap,
  Wrench,
  Award,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import {
  TEAM_MEMBERS,
  TEAM_DEPARTMENTS,
  type TeamMember,
} from "@/lib/team-data";
import TeamMemberCard from "@/components/user/TeamMemberCard";

export default function TeamDirectory() {
  const [activeDept, setActiveDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((member) => {
      // Department Filter
      const matchesDept =
        activeDept === "all" || member.department === activeDept;

      // Search Query Filter
      if (!searchQuery.trim()) return matchesDept;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.qualification.toLowerCase().includes(q) ||
        member.function.toLowerCase().includes(q) ||
        member.departmentLabel.toLowerCase().includes(q) ||
        (member.badge && member.badge.toLowerCase().includes(q)) ||
        member.certifications.some((c) => c.toLowerCase().includes(q));

      return matchesDept && matchesSearch;
    });
  }, [activeDept, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, qualification, or certification (e.g. BEE, FLIR, CEA)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher (Cards vs GTCS Technical Table) */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border border-slate-200 rounded-xl p-1 bg-slate-50">
          <button
            onClick={() => setViewMode("cards")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              viewMode === "cards"
                ? "bg-white text-emerald-900 shadow-2xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Visual Cards
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              viewMode === "table"
                ? "bg-white text-emerald-900 shadow-2xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" />
            GTCS Spec Table
          </button>
        </div>
      </div>

      {/* Department Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {TEAM_DEPARTMENTS.map((dept) => {
          const count =
            dept.id === "all"
              ? TEAM_MEMBERS.length
              : TEAM_MEMBERS.filter((m) => m.department === dept.id).length;

          const isActive = activeDept === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#053824] text-white shadow-2xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span>{dept.shortLabel}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                  isActive
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredMembers.length}</strong> of {TEAM_MEMBERS.length} engineering specialists
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {filteredMembers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No specialists found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            We couldn’t find any team member matching &quot;{searchQuery}&quot;. Try searching for BEE, Safety, FLIR, or Thermal.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveDept("all");
            }}
            className="mt-4 inline-flex items-center rounded-xl bg-[#053824] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
          >
            Show All Specialists
          </button>
        </div>
      ) : viewMode === "cards" ? (
        /* Visual Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        /* GTCS Technical Table View (Enhanced with Modern Responsive Styling) */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-white font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-3.5 w-12 text-center">Sl.</th>
                  <th className="py-3 px-4 min-w-[200px]">Specialist &amp; Role</th>
                  <th className="py-3 px-4 min-w-[140px]">Department</th>
                  <th className="py-3 px-4 min-w-[200px]">Technical Qualification</th>
                  <th className="py-3 px-4 min-w-[240px]">Core Function &amp; Scope</th>
                  <th className="py-3 px-3.5 w-24 text-center">Experience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredMembers.map((member, index) => {
                  const initials = member.name
                    .split(" ")
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Serial Number */}
                      <td className="py-3.5 px-3.5 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      {/* Name & Photo */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-800 text-white shadow-2xs flex items-center justify-center font-bold text-xs">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <span>{initials}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-emerald-800 block transition-colors">
                              {member.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block leading-tight">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          {member.departmentLabel}
                        </span>
                      </td>

                      {/* Qualification */}
                      <td className="py-3.5 px-4 font-medium text-slate-800 leading-snug">
                        {member.qualification}
                      </td>

                      {/* Function */}
                      <td className="py-3.5 px-4 text-slate-600 leading-relaxed text-[11.5px]">
                        {member.function}
                      </td>

                      {/* Experience in Years */}
                      <td className="py-3.5 px-3.5 text-center font-bold text-emerald-800 whitespace-nowrap">
                        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px]">
                          {member.experienceYears} Years
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              Empanelled Field Engineers
            </span>
            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight">
              Work Directly with BEE Accredited Lead Energy Auditors
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our multidisciplinary engineering team brings over 25 years of field experience across thermal power plants, cement mills, hospitals, and designated consumers.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Request Plant Audit Scoping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+917356111990"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
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
