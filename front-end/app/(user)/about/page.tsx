import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Zap,
  Building2,
  Users2,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Phone,
  Layers,
  Wrench,
  Sparkles,
  BarChart3,
  Flame,
  GraduationCap,
} from "lucide-react";
import { getFeaturedTeamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/user/TeamMemberCard";

export const metadata: Metadata = {
  title: "About Us | Athul Energy Consultants",
  description:
    "Athul Energy Consultants Pvt. Ltd. (AEC) is a premier BEE Accredited Energy Auditing and Electrical Safety consulting firm empanelled with EMC Kerala, GEDA, and MEDA.",
  keywords: [
    "About Athul Energy Consultants",
    "Energy Auditor Kerala",
    "BEE Accredited Energy Auditor firm Thrissur",
    "Santhosh A Energy Auditor",
    "EMC Kerala empanelled auditor",
    "Industrial energy audit Kerala",
  ],
};

export default function AboutPage() {
  const featuredMembers = getFeaturedTeamMembers();

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/90 bg-white py-10 sm:py-16 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                Govt. Accredited Energy Engineering Firm
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                Est. 2008 · Thrissur, Kerala
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pioneers in Industrial Energy Conservation &amp; Electrical Safety
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              Athul Energy Consultants Pvt. Ltd. (AEC) is an accredited energy engineering and statutory compliance firm. We assist Designated Consumers, continuous process plants, hospitals, commercial complexes, and academic institutions in eliminating electrical/thermal inefficiencies and meeting strict statutory safety standards.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about/team"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#053824] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-emerald-800 transition-colors"
              >
                Meet Our Audit Team
                <ArrowRight className="h-4 w-4 text-[#4ade80]" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Explore 30+ Audit Disciplines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Credentials & Statutory Empanelments */}
      <section id="accreditations" className="border-b border-slate-200/90 bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Authoritative Empanelments
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Recognized by Central &amp; State Regulators
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-3 font-bold">
                BEE
              </div>
              <h3 className="text-sm font-bold text-white">Bureau of Energy Efficiency</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Empanelled Class-A Accredited Energy Auditor firm (AEA-0275) authorized under the Energy Conservation Act 2001.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-3 font-bold">
                EMC
              </div>
              <h3 className="text-sm font-bold text-white">EMC Kerala (Govt. of Kerala)</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Empanelled Energy Auditing Firm with the State Designated Agency (SDA) under the Department of Power, Kerala.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-3 font-bold">
                GEDA
              </div>
              <h3 className="text-sm font-bold text-white">GEDA &amp; MEDA State Empanelments</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Approved auditor status across Gujarat (GEDA), Maharashtra (MEDA), and southern industrial corridors.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-3 font-bold">
                CEA
              </div>
              <h3 className="text-sm font-bold text-white">CEA 2010 &amp; IS Standards</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Qualified inspectors for Central Electricity Authority safety regulations, IS 14489, and IS 3043 earthing codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Disciplines Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Multidisciplinary Engineering Audits Under One Roof
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Complete cross-disciplinary field assessments with calibrated precision instruments and guaranteed zero site downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-[#15803d] mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Energy Audits &amp; PAT M&amp;V</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Class-0.2 power loggers, SEC benchmarks, motor load profiling, boiler &amp; chiller efficiency, and Designated Consumer ESCert verification.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Electrical Safety &amp; Arc Flash</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                CEA Regulations 2010 safety compliance, IEEE 1584 arc flash boundary studies, relay coordination, and IS 3043 earth pit impedance testing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-800 mb-4">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FLIR Thermography Surveys</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Level-II non-contact predictive infrared diagnostics under full load to pinpoint busbar loose connections, phase imbalances, and bearing friction.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800 mb-4">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Green Building &amp; NAAC</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Institutional green audits for NAAC Criteria 7, hospital NABH electrical safety clearance, GRIHA compliance, and Scope 1 &amp; 2 carbon accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Spotlight Section */}
      <section id="team" className="border-t border-slate-200/90 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                Our Specialists
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Engineering Leadership &amp; Senior Consultants
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Audits are led by senior professionals with certified credentials and statutory empaneled standing.
              </p>
            </div>

            <Link
              href="/about/team"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors shrink-0"
            >
              View Full Engineering Team (15+ Specialists)
              <ArrowRight className="h-3.5 w-3.5 text-[#4ade80]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about/team"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition-colors"
            >
              <Users2 className="h-4 w-4 text-emerald-700" />
              Explore All 15+ Team Members with Qualifications &amp; Functions →
            </Link>
          </div>
        </div>
      </section>

      {/* NABL Calibrated Field Instrumentation */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">
                  Traceable Precision
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                  NABL Calibrated Field Instrumentation
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Every audit report from Athul Energy includes valid calibration certificates. We maintain dedicated sets of Class-A power quality analyzers (Fluke / Krykard), FLIR infrared cameras, transit-time ultrasonic flow meters, and flue gas analyzers.
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#053824] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-emerald-800 transition-colors"
              >
                Schedule an Audit Consultation
                <ArrowRight className="h-4 w-4 text-[#4ade80]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
