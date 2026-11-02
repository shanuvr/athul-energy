"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

const PHRASES = [
  "Centralized Energy Audit Command.",
  "BEE & EMC Statutory Compliance.",
  "FLIR Thermography. Class-A Power Quality.",
  "Trusted by Industries across Kerala.",
  "15+ Years. Certified. Accredited.",
];

export default function TypewriterHero() {
  const [displayed, setDisplayed] = useState("");
  const stateRef = useRef({
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const { phraseIndex, charIndex, isDeleting } = stateRef.current;
      const current = PHRASES[phraseIndex];

      if (!isDeleting) {
        if (charIndex < current.length) {
          stateRef.current.charIndex = charIndex + 1;
          setDisplayed(current.slice(0, charIndex + 1));
          timer = setTimeout(tick, 55);
        } else {
          // Pause then start deleting
          timer = setTimeout(() => {
            stateRef.current.isDeleting = true;
            tick();
          }, 1800);
        }
      } else {
        if (charIndex > 0) {
          stateRef.current.charIndex = charIndex - 1;
          setDisplayed(current.slice(0, charIndex - 1));
          timer = setTimeout(tick, 28);
        } else {
          // Move to next phrase
          stateRef.current.phraseIndex = (phraseIndex + 1) % PHRASES.length;
          stateRef.current.isDeleting = false;
          timer = setTimeout(tick, 120);
        }
      }
    }

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          BEE Accredited AEA-0275
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">
          Operations Command
        </span>
      </div>

      {/* Typewriter text */}
      <div className="min-h-[8rem]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400/60 mb-3">
          Athul Energy Portal —
        </p>
        <h1 className="font-display text-3xl xl:text-[2.5rem] font-extrabold tracking-tight text-white leading-snug">
          {displayed}
          <span className="inline-block w-[3px] h-8 xl:h-9 bg-emerald-400 ml-1 align-middle animate-pulse rounded-sm" />
        </h1>
      </div>
    </div>
  );
}
