"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  company: string;
}

interface HomeTestimonialsTrackProps {
  testimonials: TestimonialItem[];
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <figure className="group relative flex h-[210px] w-[250px] shrink-0 select-none flex-col rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md sm:h-[230px] sm:w-[300px] sm:p-4">
      <svg
        aria-hidden="true"
        className="mb-1.5 h-4 w-4 shrink-0 text-emerald-600 sm:mb-2 sm:h-5 sm:w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="flex-1 overflow-hidden">
        <p className="text-[11px] leading-relaxed text-slate-700 sm:text-[12.5px]">
          {testimonial.quote.length > 180
            ? testimonial.quote.slice(0, 177) + "..."
            : testimonial.quote}
        </p>
      </blockquote>
      <figcaption className="mt-2 shrink-0 border-t border-slate-100 pt-2 sm:mt-3 sm:pt-3">
        <div className="text-[11.5px] font-semibold text-slate-900 sm:text-[12.5px]">
          {testimonial.name}
        </div>
        {testimonial.title && (
          <div className="mt-0.5 text-[9.5px] text-slate-500 sm:text-[10.5px]">
            {testimonial.title}
          </div>
        )}
        {testimonial.company && (
          <div className="mt-0.5 text-[9.5px] font-medium text-emerald-700 sm:text-[10.5px]">
            {testimonial.company}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default function HomeTestimonialsTrack({
  testimonials,
}: HomeTestimonialsTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Repeat testimonials 4 times for seamless continuous wrapping
  const repeated = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Helper to mark interaction and schedule auto-resume
  const markInteraction = useCallback(() => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1800);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Center scroll slightly so leftward dragging wraps smoothly right from the start
    if (container.scrollLeft === 0) {
      const half = container.scrollWidth / 2;
      container.scrollLeft = half > 0 ? half / 2 : 1;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;
    const speed = 0.65; // pixels per frame (~39px/sec at 60fps)

    const tick = () => {
      if (
        container &&
        !prefersReducedMotion &&
        !isHoveredRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current
      ) {
        container.scrollLeft += speed;

        const half = container.scrollWidth / 2;
        if (half > 0) {
          if (container.scrollLeft >= half) {
            container.scrollLeft -= half;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += half;
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Native scroll listener (handles touch swiping & trackpad/wheel)
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const half = container.scrollWidth / 2;
    if (half > 0) {
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += half;
      }
    }

    // Only mark user interaction if it wasn't triggered by internal auto-scroll
    if (isDraggingRef.current || isHoveredRef.current) {
      markInteraction();
    }
  };

  // Mouse Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    markInteraction();
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;

    // Capture pointer so dragging outside bounds still tracks smoothly
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    markInteraction();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.25; // Drag sensitivity
    container.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    markInteraction();

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative -mx-4 overflow-hidden sm:mx-0">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={markInteraction}
        onTouchMove={markInteraction}
        onTouchEnd={markInteraction}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`group/track flex w-full gap-2 overflow-x-auto overflow-y-hidden px-4 pb-2 sm:gap-3 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
        role="region"
        aria-label="Client testimonials carousel"
        tabIndex={0}
      >
        {repeated.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>

      {/* Edge gradient masks for smooth fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-slate-50 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-slate-50 to-transparent sm:w-12" />
    </div>
  );
}
