"use client";

import { useState, useRef, useEffect } from "react";

export interface AccreditationItem {
  id: string;
  name: string;
  fullName: string;
  status: "ACCREDITED" | "EMPANELLED" | "APPROVED";
  certTitle: "Accreditation Certificate" | "Empanelment Certificate" | "Recognition Certificate";
  colorTheme: "green" | "blue" | "gold";
  certNumber: string;
  validThrough: string;
  scope: string;
}

const ACCREDITATIONS: AccreditationItem[] = [
  {
    id: "emc",
    name: "EMC Kerala",
    fullName: "Energy Management Centre, Kerala",
    status: "ACCREDITED",
    certTitle: "Accreditation Certificate",
    colorTheme: "green",
    certNumber: "EMC/EA/2023/KL-042",
    validThrough: "2027",
    scope: "Energy Auditing & Conservation Studies in Kerala",
  },
  {
    id: "bee",
    name: "BEE",
    fullName: "Bureau of Energy Efficiency",
    status: "ACCREDITED",
    certTitle: "Empanelment Certificate",
    colorTheme: "blue",
    certNumber: "BEE/AEA/2022/IND-108",
    validThrough: "2026",
    scope: "Accredited Energy Auditor (AEA) - Grade A",
  },
  {
    id: "geda",
    name: "GEDA",
    fullName: "Gujarat Energy Development Agency",
    status: "EMPANELLED",
    certTitle: "Empanelment Certificate",
    colorTheme: "gold",
    certNumber: "GEDA/EA/EMPANEL/2023-45",
    validThrough: "2026",
    scope: "Mandatory Energy Audit & Solar Consultancy",
  },
  {
    id: "meda",
    name: "MEDA",
    fullName: "Maharashtra Energy Development Agency",
    status: "ACCREDITED",
    certTitle: "Accreditation Certificate",
    colorTheme: "blue",
    certNumber: "MEDA/EC/EA-P/2023/88",
    validThrough: "2026",
    scope: "Class-A Energy Auditor for Industrial Sectors",
  },
  {
    id: "govt",
    name: "Government Approved",
    fullName: "Empanelled by Government Bodies",
    status: "APPROVED",
    certTitle: "Recognition Certificate",
    colorTheme: "green",
    certNumber: "GOI/MNRE/EC-AUTH/991",
    validThrough: "2028",
    scope: "Statutory Energy & Safety Audits across India",
  },
];

/* ─── Organization Logo SVGs matching the uploaded screenshot ─── */
function OrgLogo({ id }: { id: string }) {
  if (id === "emc") {
    // Stylized "emc" with 3 leaves sprouting from the 'c'
    return (
      <div className="flex items-center justify-center gap-1.5 h-8">
        <svg
          viewBox="0 0 54 32"
          className="h-7 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Leaves sprouting */}
          <path
            d="M34 14C32 9 35 4 41 3C42 8 39 12 34 14Z"
            fill="#22C55E"
          />
          <path
            d="M39 13C41 8 46 6 50 8C49 13 45 15 39 13Z"
            fill="#16A34A"
          />
          <path
            d="M36 10C37 6 42 3 45 2C46 6 43 9 36 10Z"
            fill="#4ADE80"
          />
          {/* Stem curve */}
          <path
            d="M36 15C37 13 39 11 41 10"
            stroke="#15803D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* 'e' */}
          <text
            x="2"
            y="26"
            fill="#15803D"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="22"
            fontWeight="900"
            letterSpacing="-0.5px"
          >
            em
          </text>
          {/* 'c' */}
          <text
            x="32"
            y="26"
            fill="#15803D"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="22"
            fontWeight="900"
          >
            c
          </text>
        </svg>
      </div>
    );
  }

  if (id === "bee") {
    // Circular Bureau of Energy Efficiency star/flower emblem
    return (
      <div className="flex items-center justify-center gap-1.5 h-8">
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 text-emerald-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="14" stroke="#004D25" strokeWidth="2" />
          <circle cx="16" cy="16" r="11" stroke="#004D25" strokeWidth="1" strokeDasharray="2 2" />
          {/* 4 stylized petals */}
          <path
            d="M16 6C14 11 14 13 16 16C18 13 18 11 16 6Z"
            fill="#004D25"
          />
          <path
            d="M16 26C14 21 14 19 16 16C18 19 18 21 16 26Z"
            fill="#004D25"
          />
          <path
            d="M6 16C11 14 13 14 16 16C13 18 11 18 6 16Z"
            fill="#004D25"
          />
          <path
            d="M26 16C21 14 19 14 16 16C19 18 21 18 26 16Z"
            fill="#004D25"
          />
          <circle cx="16" cy="16" r="2.5" fill="#22C55E" />
        </svg>
      </div>
    );
  }

  if (id === "geda") {
    // Green leaf swirl logo for GEDA
    return (
      <div className="flex items-center justify-center gap-1.5 h-8">
        <svg
          viewBox="0 0 36 32"
          className="h-7 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Green leaf body */}
          <path
            d="M6 24C4 16 12 7 28 6C27 15 20 25 6 24Z"
            fill="#16A34A"
          />
          {/* Inner swirl leaf */}
          <path
            d="M8 22C11 14 18 10 26 8C22 15 16 21 8 22Z"
            fill="#22C55E"
          />
          {/* Leaf vein */}
          <path
            d="M7 23C13 18 19 13 27 7"
            stroke="#FFFFFF"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (id === "meda") {
    // Orange sunburst / energy wheel emblem for MEDA
    return (
      <div className="flex items-center justify-center gap-1.5 h-8">
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="5" fill="#F97316" />
          {/* Radiating sun gear teeth / petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (deg, i) => (
              <rect
                key={i}
                x="14.5"
                y="3"
                width="3"
                height="5"
                rx="1.5"
                fill="#EA580C"
                transform={`rotate(${deg} 16 16)`}
              />
            )
          )}
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Government Approved - Ashoka Lion Emblem silhouette
  return (
    <div className="flex items-center justify-center gap-1.5 h-8">
      <svg
        viewBox="0 0 32 36"
        className="h-7 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Ashoka Capital Emblem representation in green */}
        <path
          d="M16 3C14 3 13 4.5 13 6C13 7.5 14 8 16 8C18 8 19 7.5 19 6C19 4.5 18 3 16 3Z"
          fill="#15803D"
        />
        {/* Three lions crown profile */}
        <path
          d="M9 8C7 8 6 9.5 6 12C6 15 9 17 11 18L10 24H22L21 18C23 17 26 15 26 12C26 9.5 25 8 23 8C21 8 20 9.5 20 11C20 11 18 9 16 9C14 9 12 11 12 11C12 9.5 11 8 9 8Z"
          fill="#15803D"
        />
        {/* Abacus platform */}
        <rect x="7" y="24" width="18" height="3" rx="0.5" fill="#166534" />
        <circle cx="16" cy="25.5" r="1.2" fill="#FFFFFF" />
        {/* Base pedestal */}
        <path d="M9 27L6 33H26L23 27H9Z" fill="#15803D" />
      </svg>
    </div>
  );
}

/* ─── Miniature Certificate Component with Ornate Filigree, Gold Seal & Signature ─── */
function CertificateMiniature({
  certTitle,
  colorTheme,
}: {
  certTitle: string;
  colorTheme: "green" | "blue" | "gold";
}) {
  const themeColors = {
    green: {
      border: "#22C55E",
      borderDark: "#15803D",
      filigree: "#16A34A",
      bgTint: "#F6FBF7",
      text: "#0F3820",
    },
    blue: {
      border: "#3B82F6",
      borderDark: "#1D4ED8",
      filigree: "#2563EB",
      bgTint: "#F6FAFD",
      text: "#1E3A8A",
    },
    gold: {
      border: "#EAB308",
      borderDark: "#B45309",
      filigree: "#D97706",
      bgTint: "#FDFCF6",
      text: "#78350F",
    },
  }[colorTheme];

  return (
    <div
      className="relative w-full aspect-[1.38/1] rounded-lg p-2 flex flex-col justify-between overflow-hidden shadow-inner border"
      style={{
        backgroundColor: themeColors.bgTint,
        borderColor: `${themeColors.border}55`,
      }}
    >
      {/* Ornate Certificate Outer Frame */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 220 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Outer border line */}
        <rect
          x="5"
          y="5"
          width="210"
          height="146"
          rx="3"
          stroke={themeColors.filigree}
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        {/* Inner thin decorative border */}
        <rect
          x="8.5"
          y="8.5"
          width="203"
          height="139"
          rx="2"
          stroke={themeColors.filigree}
          strokeWidth="0.6"
          strokeDasharray="2 1.5"
          strokeOpacity="0.5"
        />

        {/* Top-Left Corner Filigree */}
        <g stroke={themeColors.filigree} strokeWidth="1" fill="none">
          <path d="M5 15 C11 15 15 11 15 5" />
          <path d="M8 18 C14 18 18 14 18 8" strokeWidth="0.6" />
          <circle cx="11" cy="11" r="1.5" fill={themeColors.filigree} />
        </g>

        {/* Top-Right Corner Filigree */}
        <g stroke={themeColors.filigree} strokeWidth="1" fill="none">
          <path d="M215 15 C209 15 205 11 205 5" />
          <path d="M212 18 C206 18 202 14 202 8" strokeWidth="0.6" />
          <circle cx="209" cy="11" r="1.5" fill={themeColors.filigree} />
        </g>

        {/* Bottom-Left Corner Filigree */}
        <g stroke={themeColors.filigree} strokeWidth="1" fill="none">
          <path d="M5 141 C11 141 15 145 15 151" />
          <path d="M8 138 C14 138 18 142 18 148" strokeWidth="0.6" />
          <circle cx="11" cy="145" r="1.5" fill={themeColors.filigree} />
        </g>

        {/* Bottom-Right Corner Filigree */}
        <g stroke={themeColors.filigree} strokeWidth="1" fill="none">
          <path d="M215 141 C209 141 205 145 205 151" />
          <path d="M212 138 C206 138 202 142 202 148" strokeWidth="0.6" />
          <circle cx="209" cy="145" r="1.5" fill={themeColors.filigree} />
        </g>
      </svg>

      {/* Certificate Content */}
      <div className="relative z-10 flex flex-col items-center pt-2.5 sm:pt-3 px-2">
        {/* Certificate Title */}
        <h4
          className="font-serif text-[11px] sm:text-[12px] font-bold text-center tracking-tight leading-none"
          style={{ color: themeColors.text }}
        >
          {certTitle}
        </h4>

        {/* Placeholder Document Lines */}
        <div className="mt-2.5 w-full flex flex-col items-center gap-1 opacity-70">
          <div className="h-[2px] w-[75%] rounded-full bg-slate-300" />
          <div className="h-[2px] w-[60%] rounded-full bg-slate-300" />
          <div className="h-[2px] w-[50%] rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Certificate Bottom Elements: Gold Ribbon Seal & Signature */}
      <div className="relative z-10 flex items-end justify-between px-2 pb-1">
        {/* Golden Medal Ribbon Seal */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 28 32"
            className="h-6 w-5 sm:h-7 sm:w-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Ribbons */}
            <path d="M8 18L5 29L12 25L14 18H8Z" fill="#D97706" />
            <path d="M20 18L23 29L16 25L14 18H20Z" fill="#B45309" />
            {/* Gold Rosette Disc */}
            <circle cx="14" cy="13" r="10" fill="url(#gold-grad)" />
            <circle
              cx="14"
              cy="13"
              r="7.5"
              stroke="#92400E"
              strokeWidth="0.8"
              strokeDasharray="1.5 1"
            />
            {/* Star in center */}
            <path
              d="M14 8.5L15.3 11.5L18.5 11.8L16 14L16.8 17.2L14 15.5L11.2 17.2L12 14L9.5 11.8L12.7 11.5L14 8.5Z"
              fill="#FDE68A"
            />
            <defs>
              <linearGradient
                id="gold-grad"
                x1="4"
                y1="3"
                x2="24"
                y2="23"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FBBF24" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Elegant Blue Signature Flourish */}
        <div className="opacity-90 pr-1">
          <svg
            viewBox="0 0 46 16"
            className="h-3.5 sm:h-4 w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 13C6 11 11 6 14 7C17 8 13 14 17 13C21 12 24 8 28 8C31 8 32 12 37 11C41 10 44 6 45 5"
              stroke="#0284C7"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section Component ─── */
export default function HomeCertifications() {
  const [activeId, setActiveId] = useState<string>("geda"); // GEDA is featured by default
  const [modalCert, setModalCert] = useState<AccreditationItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndex = ACCREDITATIONS.findIndex((a) => a.id === activeId);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const containerWidth = container.offsetWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + ACCREDITATIONS.length) % ACCREDITATIONS.length;
    setActiveId(ACCREDITATIONS[newIndex].id);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % ACCREDITATIONS.length;
    setActiveId(ACCREDITATIONS[newIndex].id);
    scrollToCard(newIndex);
  };

  const handleSelect = (index: number) => {
    setActiveId(ACCREDITATIONS[index].id);
    scrollToCard(index);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveId(ACCREDITATIONS[closestIndex].id);
    }
  };

  useEffect(() => {
    // Initial smooth scroll to center the featured card on mobile/tablet viewports
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        scrollToCard(activeIndex);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative w-full overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
          <div className="flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-slate-800">
              Certifications &amp; Empanelments
            </span>
            <div className="mt-1.5 h-1 w-14 rounded-full bg-emerald-600" />
          </div>
          <span className="text-xs sm:text-[13px] font-medium text-slate-500">
            Recognised by statutory bodies
          </span>
        </div>

        {/* Section Heading with Laurel Crest */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center text-center">
          {/* Laurel Wreath Badge Crest flanked by fading lines */}
          <div className="flex items-center gap-3 text-emerald-600" aria-hidden="true">
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-emerald-500" />
            <svg
              viewBox="0 0 48 40"
              className="h-8 w-10 sm:h-9 sm:w-12 text-emerald-600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Laurel Branch */}
              <path
                d="M16 32C11 28 8 20 12 10"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M12 11C9 10 7 13 8 16C10 16 12 14 12 11Z" fill="#16A34A" />
              <path d="M10 17C7 17 6 20 7 23C9 23 11 20 10 17Z" fill="#16A34A" />
              <path d="M11 24C9 25 8 28 10 30C12 30 13 27 11 24Z" fill="#16A34A" />

              {/* Right Laurel Branch */}
              <path
                d="M32 32C37 28 40 20 36 10"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M36 11C39 10 41 13 40 16C38 16 36 14 36 11Z" fill="#16A34A" />
              <path d="M38 17C41 17 42 20 41 23C39 23 37 20 38 17Z" fill="#16A34A" />
              <path d="M37 24C39 25 40 28 38 30C36 30 35 27 37 24Z" fill="#16A34A" />

              {/* Center Medal Badge */}
              <circle cx="24" cy="20" r="8" fill="#16A34A" />
              <circle cx="24" cy="20" r="6" stroke="#DCFCE7" strokeWidth="1" />
              {/* Checkmark inside medal */}
              <path
                d="M21 20L23 22L27 17"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Bottom Ribbon Tails */}
              <path d="M21 27L19 35L24 33L22 28" fill="#15803D" />
              <path d="M27 27L29 35L24 33L26 28" fill="#166534" />
            </svg>
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>

          {/* Heading */}
          <h2
            id="certifications-heading"
            className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="text-[#002425]">Our </span>
            <span className="text-emerald-600">Accreditations</span>
          </h2>

          {/* Subtitle description */}
          <p className="mx-auto mt-2.5 max-w-2xl text-pretty text-xs sm:text-sm text-slate-600 leading-relaxed">
            Empanelled and accredited by Energy Management Centre Kerala, Bureau of Energy
            Efficiency, GEDA and MEDA for energy auditing and allied services.
          </p>
        </div>

        {/* 5 Accreditation Cards Row / Carousel */}
        <div className="mt-8 sm:mt-10">
          {/* Horizontally scrollable on mobile/tablet, 5-col grid on desktop */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-smooth pt-4 sm:pt-5 pb-5 lg:pt-0 lg:pb-0 px-4 sm:px-6 lg:px-0 -mx-4 sm:-mx-6 lg:mx-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {ACCREDITATIONS.map((item, index) => {
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => handleSelect(index)}
                  className={`group relative flex flex-col justify-between rounded-2xl bg-white p-4 transition-all duration-300 cursor-pointer w-[270px] xs:w-[290px] sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-center lg:snap-align-none select-none ${
                    isActive
                      ? "border-2 border-emerald-500 shadow-xl shadow-emerald-600/10 ring-4 ring-emerald-500/10 -translate-y-1"
                      : "border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Top: Logo & Title */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-2">
                      <OrgLogo id={item.id} />
                      <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                    </div>

                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                      {item.fullName}
                    </p>

                    {/* Status Pill Badge */}
                    <div className="mt-2.5">
                      <span className="inline-block rounded-full bg-[#0b5126] px-3 py-0.5 text-[9.5px] sm:text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Certificate Miniature Preview */}
                  <div className="my-3 sm:my-3.5 w-full">
                    <CertificateMiniature
                      certTitle={item.certTitle}
                      colorTheme={item.colorTheme}
                    />
                  </div>

                  {/* Bottom: View Certificate Button */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(item.id);
                        setModalCert(item);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2 px-3 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#0d6832] text-white hover:bg-[#0a5227] shadow-md hover:scale-[1.02] active:scale-98"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200/90 hover:bg-emerald-100 hover:text-emerald-900"
                      }`}
                    >
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Controls: ONLY visible on mobile/tablet, HIDDEN on desktop */}
          <div className="mt-5 flex lg:hidden items-center justify-center gap-3">
            {/* Prev Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous accreditation"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {ACCREDITATIONS.map((item, index) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    aria-label={`Go to ${item.name}`}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? "h-3 w-3 bg-emerald-600 scale-110 shadow-sm"
                        : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next accreditation"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Wave/Laser Curves at Section Bottom (matching uploaded screenshot) */}
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
          {/* Soft background glow */}
          <path
            d="M0 160C280 120 540 150 780 130C1040 110 1240 145 1440 160V160H0Z"
            fill="url(#soft-green-glow)"
          />
          {/* Laser wave curves left side */}
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
            d="M-30 160C160 126 360 110 560 155C660 178 780 140 940 160"
            stroke="#4ADE80"
            strokeWidth="0.6"
            strokeOpacity="0.25"
          />
          {/* Laser wave curves right side */}
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
          <path
            d="M740 160C920 130 1140 105 1360 140C1420 150 1460 157 1520 160"
            stroke="#86EFAC"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient id="soft-green-glow" x1="0" y1="100" x2="1440" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0FDF4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#DCFCE7" stopOpacity="0.6" />
              <stop offset="1" stopColor="#F0FDF4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Interactive Certificate View Modal */}
      {modalCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <OrgLogo id={modalCert.id} />
                <div>
                  <h3
                    id="cert-modal-title"
                    className="text-base sm:text-lg font-bold text-slate-900"
                  >
                    {modalCert.name} - {modalCert.certTitle}
                  </h3>
                  <p className="text-xs text-slate-500">{modalCert.fullName}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalCert(null)}
                aria-label="Close certificate modal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body: Large Certificate Frame */}
            <div className="mt-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
                <CertificateMiniature
                  certTitle={modalCert.certTitle}
                  colorTheme={modalCert.colorTheme}
                />
              </div>

              {/* Certificate Metadata Details */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
                <div>
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Accreditation No.
                  </span>
                  <p className="mt-0.5 font-bold text-slate-800">{modalCert.certNumber}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Valid Through
                  </span>
                  <p className="mt-0.5 font-bold text-emerald-700">{modalCert.validThrough}</p>
                </div>
                <div className="col-span-2 pt-1 border-t border-emerald-100/70">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Certified Scope
                  </span>
                  <p className="mt-0.5 text-slate-700 leading-relaxed font-medium">
                    {modalCert.scope}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalCert(null)}
                className="rounded-full px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading official accreditation record for ${modalCert.name}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
