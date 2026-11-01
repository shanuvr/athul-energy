import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/team-data";
import TeamMemberCard from "@/components/user/TeamMemberCard";

export default function TeamDirectory() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="block h-px w-10 bg-emerald-600" />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Fifteen specialists, one roster
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Energy auditors, safety inspectors, thermographers, green building
            consultants and field coordinators — each record lists statutory
            accreditation, qualification and field scope.
          </p>
        </div>
        <p className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          BEE · EMC Kerala · CEA
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} priority={index < 3} />
        ))}
      </div>

      <div className="relative isolate overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 px-5 py-7 text-white sm:px-8 sm:py-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-emerald-500/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Start a conversation
            </span>
            <h3 className="mt-2.5 text-balance font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              Need a specialist for a specific site or standard?
            </h3>
            <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-slate-400 sm:text-sm">
              Tell us the site, the standard and the outcome you need. We will
              scope the right discipline and field team.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
            <Link
              href="/contact"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Request an audit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+917356111990"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
