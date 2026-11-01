"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomeCTA() {
  const [contactInput, setContactInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setLoading(true);
    // Simulate instantaneous, responsive feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setContactInput("");
    }, 600);
  };

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Floating High-Impact Hero Banner Card */}
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-[#002425] via-[#013832] to-[#001e1d] p-7 sm:p-12 lg:p-16 text-white shadow-2xl shadow-emerald-950/20 border border-emerald-500/25">
          {/* Subtle Ambient Radial Glows & Background Energy Lines */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"
            aria-hidden="true"
          />

          {/* Decorative Laser Vector Grid Pattern in Background */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-10 select-none"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 100 Q 250 50, 500 150 T 1000 100"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path
              d="M0 300 Q 300 200, 600 350 T 1000 250"
              stroke="#34D399"
              strokeWidth="1.5"
            />
            <path
              d="M0 500 Q 350 400, 700 520 T 1000 450"
              stroke="#6EE7B7"
              strokeWidth="1"
            />
          </svg>

          {/* Main Card Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Top Badge with Pulsing Live Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Empower Your Facility&apos;s Energy Future
              </span>
            </div>

            {/* Main Headline */}
            <h2
              id="cta-heading"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]"
            >
              Ready to Cut Energy Losses &amp; Ensure{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300">
                100% Statutory Compliance?
              </span>
            </h2>

            {/* Subheadline description */}
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-xs sm:text-sm lg:text-base text-emerald-100/80 leading-relaxed font-normal">
              Partner with Athul Energy&apos;s BEE-accredited energy auditors. We identify hidden
              power drains, eliminate maximum demand penalties, and deliver verifiable cost
              savings with <span className="font-semibold text-white">zero plant disruption</span>.
            </p>

            {/* Multi-Tier Action Buttons: 2 side-by-side on mobile, flex row on desktop */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 sm:flex sm:items-center sm:justify-center">
              {/* Primary High-Contrast Magnetic Button */}
              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 px-3.5 py-3 sm:px-8 sm:py-4 text-[11px] xs:text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-400/35 active:scale-95 text-center"
              >
                <span className="sm:hidden">Schedule Audit</span>
                <span className="hidden sm:inline">Schedule an Energy Audit</span>
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-950 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Secondary Direct Call Button */}
              <a
                href="tel:+917356111990"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-3 sm:px-7 sm:py-4 text-[11px] xs:text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95 text-center"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="sm:hidden">Call Auditor</span>
                <span className="hidden sm:inline">Call +91 73561 11990</span>
              </a>
            </div>

            {/* Quick Consultation Callback Bar: 2 items side-by-side in single horizontal pill */}
            <div className="mt-5 sm:mt-7 mx-auto max-w-lg">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-400/40 bg-emerald-900/60 p-4 text-emerald-200 backdrop-blur-md animate-in fade-in duration-300">
                  <div className="flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-emerald-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Request Received!</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs text-emerald-100/80">
                    Our accredited auditor will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex flex-row items-center gap-1.5 rounded-full bg-white/10 p-1 sm:p-1.5 border border-white/15 backdrop-blur-md"
                >
                  <div className="relative flex-1 min-w-0">
                    <input
                      type="text"
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      placeholder="Enter phone or email"
                      aria-label="Phone or email for quick callback"
                      required
                      className="h-10 sm:h-12 w-full bg-transparent px-3.5 sm:px-5 text-xs sm:text-sm text-white placeholder:text-emerald-100/60 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold text-slate-950 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <span className="sm:hidden">Get Callback</span>
                        <span className="hidden sm:inline">Request Callback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Trust Micro-Badges Bar */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-emerald-500/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-100">
                  100% Confidential
                </span>
                <span className="text-[10px] text-emerald-300/70">Zero plant downtime</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-100">
                  BEE &amp; EMC Accredited
                </span>
                <span className="text-[10px] text-emerald-300/70">Statutory reports</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-100">
                  12% - 25% Savings
                </span>
                <span className="text-[10px] text-emerald-300/70">Proven track record</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-100">
                  24h Scope &amp; Quote
                </span>
                <span className="text-[10px] text-emerald-300/70">Swift turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
