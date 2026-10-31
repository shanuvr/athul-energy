"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imagePosition: string;
}

const services: ServiceItem[] = [
  {
    title: "Energy audit and BEE compliance",
    category: "Industrial & commercial",
    description:
      "Electrical and thermal audits, SEC analysis and statutory reporting for BEE and EMC Kerala requirements.",
    imageSrc: "/hero-desk.png",
    imagePosition: "18% 55%",
  },
  {
    title: "Electrical safety audit",
    category: "Safety & compliance",
    description:
      "Protection coordination, earthing, hazard review and thermal imaging to verify site safety and CEA compliance.",
    imageSrc: "/hero-desk.png",
    imagePosition: "78% 42%",
  },
  {
    title: "Power quality and harmonics",
    category: "Supply reliability",
    description:
      "Harmonic and power-factor studies, ETAP simulation and filter sizing to reduce losses and equipment stress.",
    imageSrc: "/hero-desk.png",
    imagePosition: "48% 22%",
  },
  {
    title: "Green and NAAC audit",
    category: "Institutional",
    description:
      "Green, environment and NAAC audits with carbon and water-balance assessments for campuses and institutions.",
    imageSrc: "/hero-mobile.png",
    imagePosition: "70% 30%",
  },
  {
    title: "Thermal imaging survey",
    category: "Predictive maintenance",
    description:
      "Infrared scans of panels, motors and distribution equipment to locate hot spots before failure.",
    imageSrc: "/hero-desk.png",
    imagePosition: "30% 18%",
  },
  {
    title: "Environment and carbon audit",
    category: "Sustainability",
    description:
      "Environment audits, carbon footprint analysis and resource reviews for compliance and reporting.",
    imageSrc: "/hero-mobile.png",
    imagePosition: "30% 70%",
  },
  {
    title: "Measurement and verification",
    category: "Implementation support",
    description:
      "Baseline development, payback analysis and measurement & verification after audit recommendations.",
    imageSrc: "/hero-desk.png",
    imagePosition: "90% 58%",
  },
];

export default function HomeServices() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = mobileRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!wrapper || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    let cancelled = false;

    mm.add("(max-width: 1023px)", () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (distance() <= 0) return;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
        if (progressRef.current) {
          gsap.set(progressRef.current, { clearProps: "transform" });
        }
      };
    });

    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      aria-label="Services"
      className="relative bg-slate-50"
    >
      <div
        ref={mobileRef}
        className="relative flex min-h-svh flex-col justify-center bg-slate-50 px-4 pb-4 pt-[var(--header-h)] lg:hidden"
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-300/80 pb-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Services
            </span>
            <span className="text-[10px] font-medium tabular-nums tracking-[0.12em] text-slate-400">
              01 — 07
            </span>
          </div>

          <h2
            id="services-heading-mobile"
            className="mt-5 text-balance font-display text-[1.5rem] font-bold leading-[1.1] tracking-tight text-slate-950"
          >
            Energy audit &amp; electrical safety services in Kerala
          </h2>
          <p className="mt-3 max-w-md text-pretty text-[12px] leading-relaxed text-slate-600">
            Practical audits and engineering studies for industrial,
            institutional and commercial sites.
          </p>
          <Link
            href="/services"
            className="group mt-4 inline-flex items-center gap-1.5 border-b border-slate-900 pb-1 text-[11px] font-semibold text-slate-900 transition-colors duration-200 hover:border-emerald-700 hover:text-emerald-700"
          >
            Explore all services
            <svg
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>

          <div ref={viewportRef} className="mt-6 -mx-4 overflow-hidden">
            <ul
              aria-label="Services"
              ref={trackRef}
              className="flex w-max gap-3 px-4 will-change-transform"
            >
              {services.map((service) => (
                <li
                  key={service.title}
                  className="w-[calc((100vw-2rem-0.75rem)/2)] max-w-[300px] shrink-0"
                >
                  <Link
                    href="/services"
                    className="group relative flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors duration-200 hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 sm:flex-row sm:p-3.5"
                  >
                    <span className="relative block aspect-[5/3] w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-inset ring-slate-900/5 sm:aspect-auto sm:h-16 sm:w-16">
                      <Image
                        src={service.imageSrc}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 64px, 50vw"
                        quality={75}
                        style={{ objectPosition: service.imagePosition }}
                        className="object-cover"
                      />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col sm:pr-6">
                      <span className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                        {service.category}
                      </span>
                      <h3 className="mt-1 font-display text-[0.875rem] font-semibold leading-snug tracking-tight text-slate-950 sm:text-[0.95rem]">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-relaxed text-slate-600 sm:text-[11px]">
                        {service.description}
                      </p>
                    </span>

                    <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1 text-slate-400 shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:text-emerald-700 sm:right-3.5 sm:top-3.5">
                      <svg
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M8 7h9v9"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <div className="h-px w-full overflow-hidden bg-slate-200">
              <span
                ref={progressRef}
                className="block h-full origin-left scale-x-0 bg-emerald-700"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>Scroll to explore</span>
              <span className="font-semibold text-emerald-700">01 — 07</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-8 py-28">
          <div className="flex items-center justify-between border-b border-slate-300/80 pb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Services
            </span>
            <span className="text-[11px] font-medium tabular-nums tracking-[0.12em] text-slate-400">
              01 — 07
            </span>
          </div>

          <div className="mt-14 grid grid-cols-12 gap-16">
            <div className="sticky top-32 col-span-5 self-start">
              <h2
                id="services-heading"
                className="text-balance font-display text-[3.25rem] font-bold leading-[1.04] tracking-tight text-slate-950"
              >
                Energy audit &amp; electrical safety services in Kerala
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-slate-600">
                Practical audits and engineering studies for industrial,
                institutional and commercial sites — from statutory BEE and EMC
                work to power quality and green certification.
              </p>
              <Link
                href="/services"
                className="group mt-7 inline-flex items-center gap-2 border-b border-slate-900 pb-1 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:border-emerald-700 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50"
              >
                Explore all services
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </Link>
            </div>

            <div className="col-span-7 min-w-0">
              <ul className="border-t border-slate-300/80">
                {services.map((service, index) => (
                  <li key={service.title}>
                    <Link
                      href="/services"
                      className="group -mx-4 grid grid-cols-[2.25rem_5rem_1fr_auto] items-start gap-x-5 border-b border-slate-300/80 px-4 py-7 transition-colors duration-200 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/40"
                    >
                      <span className="pt-1 font-display text-[11px] font-semibold tabular-nums tracking-[0.12em] text-slate-400 transition-colors duration-200 group-hover:text-emerald-700">
                        0{index + 1}
                      </span>

                      <span className="relative block aspect-square w-20 overflow-hidden rounded-md bg-slate-200 ring-1 ring-inset ring-slate-900/5">
                        <Image
                          src={service.imageSrc}
                          alt=""
                          fill
                          sizes="80px"
                          quality={75}
                          style={{ objectPosition: service.imagePosition }}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                          {service.category}
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-emerald-800">
                          {service.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                      </span>

                      <span className="mt-1 text-slate-400 transition-colors duration-200 group-hover:text-emerald-700">
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M8 7h9v9"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
