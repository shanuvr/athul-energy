"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

interface LeadershipCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function LeadershipCard({ member, priority = false }: LeadershipCardProps) {
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-slate-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        {showImage ? (
          <Image
            src={member.image as string}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-14 -right-10 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative text-center">
              <span className="font-display text-5xl font-semibold tracking-tight text-white">
                {initials}
              </span>
              <span className="mt-2 block text-[9.5px] font-semibold uppercase tracking-[0.24em] text-emerald-400/80">
                Athul Energy
              </span>
            </div>
          </div>
        )}

        <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
          {member.departmentLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-slate-900">
              {member.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{member.role}</p>
          </div>
          <span className="shrink-0 pt-0.5 text-[11px] font-semibold tabular-nums text-slate-400">
            {member.experienceYears} yrs
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-[12.5px] leading-relaxed text-slate-500">
          {member.function}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="truncate text-[11px] font-medium text-emerald-700">
            {member.badge ?? member.certifications[0]}
          </span>
          <Link
            href="/about/team"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Profile
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
