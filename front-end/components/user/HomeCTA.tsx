import Link from "next/link";
import HomeCTAForm from "./HomeCTAForm";

export default function HomeCTA() {
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

            {/* Quick Consultation Callback Bar (Extracted Client Component Leaf) */}
            <div className="mt-5 sm:mt-7 mx-auto max-w-lg">
              <HomeCTAForm />
            </div>

            {/* Credibility & Trust Markers Footer */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-[11px] sm:text-xs font-semibold text-emerald-200/90 tracking-wide uppercase">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>BEE Accredited AEA-0275</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>EMC Kerala Empanelled</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>1000+ Completed Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Zero Plant Disruption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
