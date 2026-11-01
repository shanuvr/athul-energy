"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/team-data";

interface TeamMemberCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function TeamMemberCard({ member, priority = false }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(member.image) && !imageError;

  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)]">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-950">
        {showImage ? (
          <Image
            src={member.image as string}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            priority={priority}
            className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
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
            <span className="relative font-display text-4xl font-semibold tracking-tight text-white">
              {initials}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent"
        />

        <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65">
          {member.departmentLabel}
        </span>

        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3 text-[10px] font-semibold">
          <span className="text-emerald-300">
            {member.experienceYears} years experience
          </span>
          {member.badge && (
            <span className="truncate text-white/60">{member.badge}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-display text-base font-semibold leading-snug tracking-tight text-slate-900">
          {member.name}
        </h4>
        <p className="mt-0.5 text-[11.5px] leading-snug text-slate-600">
          {member.role}
        </p>

        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="text-[11px] font-medium leading-relaxed text-slate-700">
            {member.qualification}
          </p>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
            {member.function}
          </p>
        </div>

        <p className="mt-auto pt-3 text-[10px] uppercase tracking-[0.12em] text-slate-400">
          {member.certifications.slice(0, 2).join(" · ")}
        </p>
      </div>
    </article>
  );
}
