"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

interface TeamMemberCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function TeamMemberCard({ member, priority = false }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(member.image) && !imageError;

  const initials = member.name
    .replace(/^Er\.\s+|^Mr\.\s+|^Ms\.\s+|^Mrs\.\s+/, "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-600/30 hover:shadow-[0_18px_40px_-25px_rgba(5,56,36,0.3)]">
      {/* Top Banner / Avatar Header */}
      <div className="relative aspect-[16/7.5] w-full overflow-hidden bg-[#002425]">
        {showImage ? (
          <Image
            src={member.image as string}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 right-0 h-36 w-36 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <span className="relative font-display text-4xl font-semibold tracking-tight text-white/90">
              {initials}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
        />

        <div className="absolute left-3.5 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-black/40 backdrop-blur-xs px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/20">
            {member.departmentLabel}
          </span>
          {member.sector && (
            <span className="rounded-full bg-emerald-600/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-2xs">
              BEE: {member.sector}
            </span>
          )}
        </div>

        <div className="absolute inset-x-3.5 bottom-2.5 flex items-center justify-between gap-3 text-[10.5px] font-semibold">
          <span className="text-emerald-300 flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {member.experienceYears} yrs experience
          </span>
          {member.badge && (
            <span className="truncate rounded-md bg-white/10 px-2 py-0.5 text-white/90 font-mono text-[9.5px]">
              {member.badge}
            </span>
          )}
        </div>
      </div>

      {/* Body Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base sm:text-[17px] font-bold leading-snug tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-emerald-700 leading-snug">
          {member.role}
        </p>

        {/* Qualifications */}
        <div className="mt-3.5 space-y-2.5 border-t border-slate-100 pt-3">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
            <p className="text-[11.5px] font-medium leading-relaxed text-slate-700">
              {member.qualification}
            </p>
          </div>

          <p className="text-[11.5px] leading-relaxed text-slate-500 pl-6">
            {member.function}
          </p>
        </div>

        {/* Certifications Pills at Bottom */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
          {member.certifications.slice(0, 3).map((cert, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600"
            >
              <Award className="h-2.5 w-2.5 text-emerald-600" />
              <span className="truncate max-w-[180px]">{cert}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
