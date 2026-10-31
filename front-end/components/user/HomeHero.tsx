import Link from "next/link";
import { getImageProps } from "next/image";

const heroAlt =
  "Athul Energy engineer inspecting an industrial electrical panel with a thermal imaging camera during an energy audit";

const commonImageProps = {
  alt: heroAlt,
  sizes: "100vw",
};

const { props: desktopImage } = getImageProps({
  ...commonImageProps,
  src: "/hero-desk.png",
  width: 1672,
  height: 941,
  quality: 85,
});

const { props: mobileImage } = getImageProps({
  ...commonImageProps,
  src: "/hero-mobile.png",
  width: 1086,
  height: 1448,
  quality: 75,
});

export default function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate -mt-[var(--header-h)] flex min-h-[100svh] items-center overflow-hidden bg-slate-950 pt-[var(--header-h)]"
    >
      <picture className="absolute inset-0">
        <source
          media="(max-width: 1023px)"
          srcSet={mobileImage.srcSet}
          sizes={mobileImage.sizes}
        />
        <source
          media="(min-width: 1024px)"
          srcSet={desktopImage.srcSet}
          sizes={desktopImage.sizes}
        />
        <img
          {...mobileImage}
          alt={heroAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero-zoom h-full w-full object-cover object-[50%_35%] lg:object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/25 lg:bg-linear-to-r lg:from-slate-950 lg:via-slate-950/85 lg:to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-slate-950/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950 to-transparent lg:hidden" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-500/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-teal-400/15 blur-[120px]"
      />

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-14 xl:px-8">
        <div className="max-w-2xl">
          <div className="hero-rise hero-delay-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300 backdrop-blur-sm sm:gap-2.5 sm:px-3.5 sm:text-[10.5px] sm:tracking-[0.16em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="hero-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            EMC Kerala · BEE · GEDA · MEDA accredited
          </div>

          <h1
            id="hero-heading"
            className="hero-title hero-rise hero-delay-2 mt-4 text-balance font-display text-[1.875rem] font-bold leading-[1.03] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Energy Audit &amp; Electrical Safety Consultants
            <span className="mt-1 block bg-linear-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              in Kerala
            </span>
          </h1>

          <p className="hero-subhead hero-rise hero-delay-3 mt-4 max-w-md text-pretty text-sm leading-relaxed text-slate-300 sm:mt-6 sm:max-w-xl sm:text-lg">
            Since 2008, helping industries, institutions and buildings cut
            energy costs, meet statutory compliance and build a safer, greener
            future.
          </p>

          <div className="hero-ctas hero-rise hero-delay-4 mt-6 flex flex-row items-center gap-2 sm:mt-9 sm:gap-3">
            <Link
              href="/contact"
              className="group inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-500 px-2.5 text-xs font-semibold text-slate-950 shadow-[0_16px_50px_-16px_rgba(16,185,129,0.9)] transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:h-12 sm:flex-none sm:gap-2 sm:px-6 sm:text-sm"
            >
              <span className="sm:hidden">Request an Audit</span>
              <span className="hidden sm:inline">Request an Energy Audit</span>
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>

            <Link
              href="/services"
              className="group inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:h-12 sm:flex-none sm:gap-2 sm:px-6 sm:text-sm"
            >
              <span className="sm:hidden">Services</span>
              <span className="hidden sm:inline">Explore Services</span>
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M8 7h9v9"
                />
              </svg>
            </Link>
          </div>

          <div className="hero-trust hero-rise hero-delay-5 mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[10.5px] font-medium uppercase tracking-[0.15em] text-slate-400 sm:mt-10 sm:flex sm:pt-6">
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 3v5.4c0 4.3-2.9 7.6-7 9.6-4.1-2-7-5.3-7-9.6V6l7-3z"
                />
              </svg>
              Since 2008
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z"
                />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
              Kerala, India
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
              BEE · EMC · GEDA · MEDA
            </span>
          </div>
        </div>
      </div>

      <div className="hero-cue hero-fade hero-delay-6 absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[9.5px] font-medium uppercase tracking-[0.3em] text-slate-500">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="hero-scroll h-1.5 w-1 rounded-full bg-emerald-400" />
        </span>
      </div>
    </section>
  );
}
