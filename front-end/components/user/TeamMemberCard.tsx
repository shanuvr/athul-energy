import Image from "next/image";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

interface TeamMemberCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function TeamMemberCard({ member, priority = false }: TeamMemberCardProps) {
  const showImage = Boolean(member.image);

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
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#002425] via-slate-900 to-[#023126]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-emerald-500/20 blur-2xl"
            />
            <div className="relative flex items-center gap-3">
              <span className="font-display text-3xl font-semibold tracking-tight text-white/95">
                {initials}
              </span>
              <span className="h-4 w-px bg-white/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                Athul Energy
              </span>
            </div>
          </div>
        )}

        {/* Department Pill */}
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
          {member.departmentLabel}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Name and Official Role */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold tracking-tight text-slate-900 sm:text-lg truncate">
              {member.name}
            </h3>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
              {member.role}
            </p>
          </div>
          {member.badge && (
            <span className="shrink-0 rounded-full border border-emerald-600/30 bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-800">
              {member.badge}
            </span>
          )}
        </div>

        {/* Qualification */}
        <div className="mt-3 flex items-start gap-1.5 text-[11.5px] text-slate-600">
          <GraduationCap className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
          <span className="line-clamp-2 leading-relaxed">{member.qualification}</span>
        </div>

        {/* Function / Plant Domain */}
        <div className="mt-2 flex items-start gap-1.5 text-[11.5px] text-slate-600">
          <Briefcase className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
          <p className="line-clamp-3 leading-relaxed text-slate-600">
            {member.function}
          </p>
        </div>

        {/* Certifications Badges */}
        <div className="mt-4 flex flex-wrap gap-1 border-t border-slate-100 pt-3">
          {member.certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1 rounded bg-slate-100/90 px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
            >
              <Award className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
              <span>{cert}</span>
            </span>
          ))}
        </div>

        {/* Experience Footer */}
        <div className="mt-auto border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>{member.experienceYears}+ years in industry</span>
          {member.sector && (
            <span className="font-medium text-emerald-800">{member.sector}</span>
          )}
        </div>
      </div>
    </article>
  );
}
