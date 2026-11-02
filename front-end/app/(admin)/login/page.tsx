import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import TypewriterHero from "@/components/admin/TypewriterHero";

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
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-slate-950 text-slate-100">

      {/* ── Left Panel ── */}
      <section className="relative hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-[#053824] to-slate-900 px-12 xl:px-16 py-10 text-white border-r border-white/10">

        {/* Grid bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 80%)",
          }}
        />
        {/* Glow orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" aria-label="Athul Energy home" className="inline-flex">
            <div className="rounded-xl bg-white/95 px-3 py-2 shadow-md">
              <Image
                src="/athul-logo.webp"
                alt="Athul Energy Consultants"
                width={140}
                height={44}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Typewriter hero — centred vertically */}
        <TypewriterHero />

        {/* Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-1 border-t border-white/10 pt-5 text-[10.5px] text-slate-500">
          <span>© 2026 Athul Energy Consultants Pvt. Ltd.</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Services Operational
          </span>
        </div>
      </section>

      {/* ── Right Panel ── */}
      <section className="relative flex flex-1 flex-col overflow-hidden bg-slate-100/80">

        {/* Dot pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between shrink-0 px-6 sm:px-10 py-4 border-b border-slate-200/60">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3 w-3 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            Return to Website
          </Link>
          <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            Internal Auth v2.4
          </span>
        </div>

        {/* Mobile logo */}
        <div className="relative z-10 lg:hidden shrink-0 flex items-center justify-center pt-4">
          <div className="inline-flex flex-col items-center gap-1.5">
            <div className="rounded-xl bg-white p-2 shadow-sm border border-slate-200">
              <Image src="/athul-logo.webp" alt="Athul Energy Consultants Logo" width={120} height={38} className="h-7 w-auto object-contain" priority />
            </div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-800">Administrative Portal</span>
          </div>
        </div>

        {/* Form */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 sm:px-8 py-4 overflow-hidden">
          <AdminLoginForm />
        </div>

        {/* Bottom note */}
        <p className="relative z-10 shrink-0 text-center text-[10.5px] text-slate-400 px-6 py-3 border-t border-slate-200/60">
          Authorized personnel only. All access attempts are logged under statutory guidelines.
        </p>
      </section>
    </div>
  );
}
