"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api, { getMediaUrl } from "@/lib/api";

interface ClientLogo {
  id: string | number;
  name: string;
  logo: string;
}

const DEFAULT_CLIENTS: ClientLogo[] = [
  { id: "telk", name: "Transformers and Electricals Kerala Ltd. (TELK)", logo: "/clients/telk.webp" },
  { id: "aai", name: "Airports Authority of India (AAI)", logo: "/clients/airports-authority-of-india.webp" },
  { id: "petronet", name: "Petronet LNG Limited", logo: "/clients/petronet-lng.webp" },
  { id: "synthite", name: "Synthite Industries Pvt. Ltd.", logo: "/clients/synthite.webp" },
  { id: "andhra-bank", name: "Andhra Bank", logo: "/clients/andhra-bank.webp" },
  { id: "central-bank", name: "Central Bank of India", logo: "/clients/central-bank-of-india.webp" },
  { id: "pnb", name: "Punjab National Bank", logo: "/clients/punjab-national-bank.webp" },
  { id: "syndicate-bank", name: "Syndicate Bank", logo: "/clients/syndicate-bank.webp" },
  { id: "union-bank", name: "Union Bank of India", logo: "/clients/union-bank-of-india.webp" },
  { id: "sud-chemie", name: "Süd-Chemie India Pvt. Ltd.", logo: "/clients/sud-chemie.webp" },
  { id: "ksca", name: "Karnataka State Cricket Association (KSCA)", logo: "/clients/karnataka-cricket-association.webp" },
];

function LogoMarqueeRow({
  logos,
  direction,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
}) {
  if (!logos || logos.length === 0) return null;

  // Duplicate items for continuous scrolling loop
  const items = logos.length < 5 ? [...logos, ...logos, ...logos, ...logos] : [...logos, ...logos];

  return (
    <div className="relative overflow-hidden w-full group/marquee">
      <div
        className={`flex w-max items-center gap-4 sm:gap-6 group-hover/marquee:[animation-play-state:paused] ${
          direction === "left" ? "animate-clients-left" : "animate-clients-right"
        }`}
      >
        {items.map((client, index) => {
          const isDuplicate = index >= logos.length;
          return (
            <div
              key={`${client.id}-${index}`}
              className="flex h-20 w-[200px] sm:h-24 sm:w-[230px] items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xs transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 shrink-0"
              aria-hidden={isDuplicate ? "true" : undefined}
              aria-label={isDuplicate ? undefined : client.name}
            >
              <Image
                src={client.logo}
                alt={isDuplicate ? "" : `${client.name} - Athul Energy Client`}
                width={220}
                height={90}
                loading="lazy"
                unoptimized
                className="h-16 sm:h-20 w-auto max-w-[94%] max-h-[90%] object-contain transition-all duration-300"
              />
            </div>
          );
        })}
      </div>
      {/* Edge Fading Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
}

export default function HomeClients() {
  const [clients, setClients] = useState<ClientLogo[]>(DEFAULT_CLIENTS);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/clients")
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || (Array.isArray(res.data) ? res.data : null);
        if (Array.isArray(data) && data.length > 0) {
          const mapped: ClientLogo[] = data.map((item: { id: number | string; name: string; logoUrl: string }) => ({
            id: item.id,
            name: item.name,
            logo: getMediaUrl(item.logoUrl),
          }));
          setClients(mapped);
        }
      })
      .catch((err) => {
        // Silently keep default fallback client list on error
        console.debug("Using fallback static client list:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Split into rowOne and rowTwo for smooth bidirectional movement
  const rowOne = clients.filter((_, idx) => idx % 2 === 0);
  const rowTwo = clients.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative w-full overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Green Accent Lines */}
        <div className="flex flex-col items-center text-center">
          {/* Top Badge Flanked by Green Horizontal Lines */}
          <div className="flex items-center gap-3 text-emerald-600" aria-hidden="true">
            <div className="h-[1.5px] w-12 sm:w-16 bg-emerald-600" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Our Clients
            </span>
            <div className="h-[1.5px] w-12 sm:w-16 bg-emerald-600" />
          </div>

          {/* Heading */}
          <h2
            id="clients-heading"
            className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="text-[#002425]">Our </span>
            <span className="text-emerald-600">Valued </span>
            <span className="text-[#002425]">Clients</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-xs sm:text-sm text-slate-600 leading-relaxed">
            We are proud to serve a diverse range of industries across Kerala and beyond with
            reliable energy audit and compliance solutions.
          </p>
        </div>

        {/* 2-Row Animated Logo Marquee */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
          <LogoMarqueeRow logos={rowOne.length > 0 ? rowOne : clients} direction="left" />
          <LogoMarqueeRow logos={rowTwo.length > 0 ? rowTwo : clients} direction="right" />
        </div>

        {/* View All Clients Action Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            prefetch={false}
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-white px-7 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-700 hover:scale-[1.02] active:scale-98"
          >
            <span>View All Clients</span>
            <svg
              className="h-4 w-4 text-emerald-600 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 3 Metric Stat Pillars */}
        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
          {/* Stat 1: Industries Served */}
          <div className="flex items-center gap-3.5">
            <div className="text-emerald-600" aria-hidden="true">
              <svg viewBox="0 0 36 36" className="h-9 w-9 sm:h-10 sm:w-10" fill="none">
                <rect x="4" y="10" width="14" height="22" rx="1.5" stroke="#16A34A" strokeWidth="2" />
                <rect x="18" y="4" width="14" height="28" rx="1.5" stroke="#16A34A" strokeWidth="2" />
                <circle cx="8.5" cy="16" r="1.2" fill="#16A34A" />
                <circle cx="13.5" cy="16" r="1.2" fill="#16A34A" />
                <circle cx="8.5" cy="22" r="1.2" fill="#16A34A" />
                <circle cx="13.5" cy="22" r="1.2" fill="#16A34A" />
                <circle cx="23" cy="10" r="1.2" fill="#16A34A" />
                <circle cx="27" cy="10" r="1.2" fill="#16A34A" />
                <circle cx="23" cy="16" r="1.2" fill="#16A34A" />
                <circle cx="27" cy="16" r="1.2" fill="#16A34A" />
                <circle cx="23" cy="22" r="1.2" fill="#16A34A" />
                <circle cx="27" cy="22" r="1.2" fill="#16A34A" />
              </svg>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                100+
              </p>
              <p className="text-xs sm:text-[13px] font-medium text-slate-500 mt-1">
                Industries Served
              </p>
            </div>
          </div>

          {/* Stat 2: Years of Experience */}
          <div className="flex items-center gap-3.5">
            <div className="text-emerald-600" aria-hidden="true">
              <svg
                viewBox="0 0 36 36"
                className="h-9 w-9 sm:h-10 sm:w-10"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 14L13 7L18 12L23 7L30 14" />
                <path d="M10 18L14 22L18 18L22 22L26 18" />
                <path d="M14 26L18 30L22 26" />
                <path d="M4 18L10 18M32 18L26 18" />
              </svg>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                15+
              </p>
              <p className="text-xs sm:text-[13px] font-medium text-slate-500 mt-1">
                Years of Experience
              </p>
            </div>
          </div>

          {/* Stat 3: Leading Organizations */}
          <div className="flex items-center gap-3.5">
            <div className="text-emerald-600" aria-hidden="true">
              <svg viewBox="0 0 36 36" className="h-9 w-9 sm:h-10 sm:w-10" fill="none">
                <path
                  d="M18 4L6 8V17C6 24 11 30 18 32C25 30 30 24 30 17V8L18 4Z"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 18L16.5 21.5L23 15"
                  stroke="#16A34A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-[12.5px] font-medium text-slate-500 leading-none">
                Trusted by
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                Leading Organizations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Green Waves at Section Bottom */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-36 overflow-hidden z-0 select-none opacity-80"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0 160C280 120 540 150 780 130C1040 110 1240 145 1440 160V160H0Z"
            fill="url(#clients-green-glow)"
          />
          <path
            d="M-50 160C120 110 320 90 520 145C620 172 740 130 900 160"
            stroke="#22C55E"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <path
            d="M-40 160C140 118 340 100 540 150C640 175 760 135 920 160"
            stroke="#16A34A"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />
          <path
            d="M700 160C880 115 1100 85 1320 125C1390 138 1440 150 1500 160"
            stroke="#22C55E"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M720 160C900 122 1120 95 1340 132C1405 144 1450 154 1510 160"
            stroke="#16A34A"
            strokeWidth="0.75"
            strokeOpacity="0.3"
          />
          <defs>
            <linearGradient
              id="clients-green-glow"
              x1="0"
              y1="100"
              x2="1440"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F0FDF4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#DCFCE7" stopOpacity="0.5" />
              <stop offset="1" stopColor="#F0FDF4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
