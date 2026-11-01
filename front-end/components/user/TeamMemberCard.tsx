"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Clock,
  GraduationCap,
  Wrench,
  CheckCircle2,
  User,
} from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

interface TeamMemberCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function TeamMemberCard({ member, priority = false }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);

  // Department specific accent colors
  const getDeptColor = (dept: TeamMember["department"]) => {
    switch (dept) {
      case "leadership":
        return {
          badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
          gradient: "from-emerald-700 to-emerald-950",
          ring: "ring-emerald-400",
        };
      case "energy-audits":
        return {
          badge: "bg-blue-100 text-blue-900 border-blue-200",
          gradient: "from-blue-700 to-slate-900",
          ring: "ring-blue-400",
        };
      case "electrical-safety":
        return {
          badge: "bg-amber-100 text-amber-900 border-amber-200",
          gradient: "from-amber-700 to-slate-950",
          ring: "ring-amber-400",
        };
      case "thermal-surveys":
        return {
          badge: "bg-rose-100 text-rose-900 border-rose-200",
          gradient: "from-rose-700 to-slate-950",
          ring: "ring-rose-400",
        };
      case "green-sustainability":
        return {
          badge: "bg-teal-100 text-teal-900 border-teal-200",
          gradient: "from-teal-700 to-slate-950",
          ring: "ring-teal-400",
        };
      case "operations":
      default:
        return {
          badge: "bg-slate-100 text-slate-800 border-slate-200",
          gradient: "from-slate-700 to-slate-950",
          ring: "ring-slate-400",
        };
    }
  };

  const colors = getDeptColor(member.department);

  // Extract initials (e.g. Santhosh A. -> SA)
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        {/* Top Header: Avatar + Designation */}
        <div className="flex items-start gap-4">
          {/* Avatar / Portrait Box */}
          <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-sm ring-2 ring-slate-100">
            {member.image && !imageError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="72px"
                priority={priority}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${colors.gradient} text-white shadow-inner`}
              >
                <div className="text-center">
                  <span className="text-lg font-extrabold tracking-wider">{initials}</span>
                  <div className="text-[9px] font-medium uppercase tracking-widest text-emerald-300/90 opacity-90">
                    AEC
                  </div>
                </div>
              </div>
            )}

            {/* Experience Badge Overlay */}
            <span className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-2xs py-0.5 text-center text-[9px] font-bold text-emerald-300">
              {member.experienceYears}y exp
            </span>
          </div>

          {/* Name & Role */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}
              >
                {member.departmentLabel}
              </span>
              {member.badge && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  {member.badge}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
              {member.name}
            </h3>

            <p className="mt-0.5 text-xs font-medium text-slate-600 leading-snug">
              {member.role}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3.5 border-t border-slate-100" />

        {/* Technical Qualification (GTCS Spec) */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <GraduationCap className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Qualification
              </span>
              <span className="font-semibold text-slate-900 leading-snug block">
                {member.qualification}
              </span>
            </div>
          </div>

          {/* Function / Responsibilities (GTCS Spec) */}
          <div className="flex items-start gap-2 text-slate-600 pt-1">
            <Wrench className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Function &amp; Scope
              </span>
              <p className="text-[11.5px] leading-relaxed text-slate-600 mt-0.5">
                {member.function}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Footer Pills */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
        {member.certifications.slice(0, 3).map((cert, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 text-[10.5px] font-medium text-slate-700"
          >
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}
