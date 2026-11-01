import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowLeft,
  Activity,
  FileCheck2,
  Award,
  Sparkles,
  Layers,
} from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Portal Sign In | Athul Energy Consultants",
  description:
    "Secure administrative login for Athul Energy accredited energy auditors and administrative staff. Restricted internal access.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      {/* Left Column: Command & Security Brand Showcase (Desktop) */}
      <section className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-[#053824] to-slate-900 p-12 xl:p-16 text-white border-r border-white/10">
        {/* Subtle Geometric Ambient Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 80%)",
          }}
        />

        {/* Ambient Radial Glowing Orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-500/15 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-10 h-[24rem] w-[24rem] rounded-full bg-teal-500/10 blur-[130px]"
        />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Athul Energy Consultants Home"
          >
            <div className="rounded-2xl bg-white p-2.5 shadow-md">
              <Image
                src="/athul-logo.png"
                alt="Athul Energy Consultants Logo"
                width={160}
                height={50}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              BEE Accredited AEA-0275
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
              Operations Command
            </span>
          </div>
        </div>

        {/* Central Display Message */}
        <div className="relative z-10 my-10 max-w-xl">
          <h1 className="font-display text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Centralized Industrial Energy &amp; Operations Command
          </h1>
          <p className="mt-4 text-sm xl:text-base leading-relaxed text-slate-300">
            Internal administration portal for managing statutory energy audits,
            electrical safety compliance reviews, engineering downloads, and
            certified baseline SEC documentation.
          </p>

          {/* Feature Highlights Grid */}
          <div className="mt-8 space-y-3.5">
            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs p-3.5 transition-all hover:bg-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  Statutory Audit Repositories
                </h2>
                <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                  Manage Form-A/B compliance filings for Designated Consumers (BEE &amp; EMC Kerala).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs p-3.5 transition-all hover:bg-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  Instrumentation &amp; Field Analytics
                </h2>
                <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                  Access Class-A power quality logs, FLIR thermal scans, and boiler test measurements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs p-3.5 transition-all hover:bg-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  Strict Confidentiality &amp; NDA
                </h2>
                <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                  Role-based access controls for accredited lead auditors and field engineering staff.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Regulatory Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-2 border-t border-white/10 pt-6 text-[11px] text-slate-400">
          <span>© 2026 Athul Energy Consultants Pvt. Ltd.</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System Status: All Services Operational
          </span>
        </div>
      </section>

      {/* Right Column: Authentication Panel */}
      <section className="relative flex flex-1 flex-col justify-between overflow-y-auto bg-slate-100/80 p-6 sm:p-10 lg:p-16">
        {/* Subtle architectural dot pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Header Navigation */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Public Website</span>
          </Link>

          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Internal Auth v2.4
          </span>
        </div>

        {/* Mobile-Only Brand Header */}
        <div className="relative z-10 lg:hidden mb-6 text-center">
          <div className="inline-block rounded-2xl bg-white p-3 shadow-sm border border-slate-200 mb-3">
            <Image
              src="/athul-logo.png"
              alt="Athul Energy Consultants Logo"
              width={160}
              height={50}
              className="h-8 w-auto object-contain mx-auto"
              priority
            />
          </div>
          <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
            Administrative Portal
          </span>
        </div>

        {/* Form Container */}
        <div className="relative z-10 my-auto py-4">
          <AdminLoginForm />
        </div>

        {/* Bottom Help Note */}
        <div className="relative z-10 mt-8 text-center text-xs text-slate-500">
          <p>
            Authorized personnel only. All access attempts are logged and monitored under statutory guidelines.
          </p>
        </div>
      </section>
    </div>
  );
}
