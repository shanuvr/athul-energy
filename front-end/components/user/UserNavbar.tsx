"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ServiceItem {
  title: string;
  desc: string;
  href: string;
  icon: ReactNode;
}

const iconClass = "h-[18px] w-[18px]";

const serviceItems: ServiceItem[] = [
  {
    title: "Energy Audits",
    desc: "Detailed electrical, thermal and mandatory BEE / EMC statutory assessments.",
    href: "/services",
    icon: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h4.5l2.25-6 3.75 12 2.25-6H21" />
      </svg>
    ),
  },
  {
    title: "Electrical Safety Audits",
    desc: "CEA regulation compliance, hazard analysis and protection verification.",
    href: "/services",
    icon: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.4c0 4.3-2.9 7.6-7 9.6-4.1-2-7-5.3-7-9.6V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 12l1.9 1.9 3.6-3.8" />
      </svg>
    ),
  },
  {
    title: "Power Quality & Harmonics",
    desc: "Harmonics study, filter sizing, ETAP simulation and thermal imaging.",
    href: "/services",
    icon: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L5 13h5l-1 8 8-10h-5l1-8z" />
      </svg>
    ),
  },
  {
    title: "Green & NAAC Audits",
    desc: "Institutional green cover, carbon footprint calculation and water balancing.",
    href: "/services",
    icon: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4c-8 0-14 3.6-14 10a5 5 0 005 5c6.4 0 9-6 9-15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21c2.5-6 6.5-9.5 12-11.5" />
      </svg>
    ),
  },
];

export default function UserNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const isServicesActive = pathname.startsWith("/services");
  const transparent = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility strip */}
      <div
        className={`hidden border-b border-white/10 transition-colors duration-300 lg:block ${
          transparent ? "bg-transparent" : "bg-slate-950"
        }`}
      >
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-6 px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-emerald-300">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.4c0 4.3-2.9 7.6-7 9.6-4.1-2-7-5.3-7-9.6V6l7-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 12l1.9 1.9 3.6-3.8" />
              </svg>
              Govt. accredited
            </span>

            <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />

            <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.02em] text-white">
              EMC Kerala <span className="px-0.5 text-white/40">/</span> BEE{" "}
              <span className="px-0.5 text-white/40">/</span> GEDA
            </span>

            <span className="hidden h-3.5 w-px bg-white/10 xl:block" aria-hidden="true" />

            <span className="hidden whitespace-nowrap text-[11px] tracking-[0.02em] text-white xl:inline">
              Energy <span className="text-white/50">·</span> Safety{" "}
              <span className="text-white/50">·</span> Sustainability
              <span className="ml-1.5 text-white">since 2008</span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <a
              href="tel:+917356111990"
              className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-[11px] font-medium tracking-[0.02em] text-white transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-emerald-400 transition-colors duration-200 group-hover:bg-emerald-500/15 group-hover:text-emerald-300">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h1.6c.5 0 .9.3 1 .8l.9 3a1 1 0 01-.3 1L7.5 9a12 12 0 007.5 7.5l1.2-1.2a1 1 0 011-.3l3 .9c.5.1.8.5.8 1v1.6a2.5 2.5 0 01-2.5 2.5C10.6 21 3 13.4 3 5.5z" />
                </svg>
              </span>
              +91 73561 11990
            </a>

            <span className="h-4 w-px bg-white/10" aria-hidden="true" />

            <a
              href="mailto:info@athulenergy.com"
              className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-[11px] font-medium tracking-[0.02em] text-white transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-emerald-400 transition-colors duration-200 group-hover:bg-emerald-500/15 group-hover:text-emerald-300">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
                </svg>
              </span>
              info@athulenergy.com
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`relative w-full border-b transition-all duration-300 ${
          transparent
            ? "border-transparent bg-transparent"
            : `bg-white/95 backdrop-blur-md ${
                scrolled
                  ? "border-slate-200 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]"
                  : "border-slate-200/80"
              }`
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[68px] xl:px-8">
          {/* Brand */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Athul Energy Consultants — home">
            <Image
              src="/athul-logo.png"
              alt="Athul Energy Consultants"
              width={190}
              height={63}
              priority
              className="h-9 w-auto object-contain lg:h-10"
            />
          </Link>

          {/* Desktop links */}
          <div className="ml-auto hidden h-full items-center lg:flex">
            <NavLink href="/" label="Home" active={pathname === "/"} transparent={transparent} />
            <NavLink href="/about" label="About" active={isActive("/about")} transparent={transparent} />

            {/* Services dropdown */}
            <div
              className="relative flex h-full items-center"
              ref={dropdownRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`group relative inline-flex h-full items-center gap-1.5 px-3 text-[13px] font-medium tracking-[0.015em] transition-colors duration-200 focus-visible:outline-none ${
                  transparent
                    ? isServicesActive || servicesOpen
                      ? "text-white"
                      : "text-white hover:text-white"
                    : isServicesActive || servicesOpen
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-950"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    servicesOpen
                      ? transparent
                        ? "rotate-180 text-emerald-300"
                        : "rotate-180 text-emerald-600"
                      : transparent
                        ? "text-white group-hover:text-white"
                        : "text-slate-400 group-hover:text-slate-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-t-full transition-transform duration-300 ease-out ${
                    transparent ? "bg-emerald-400" : "bg-emerald-600"
                  } ${isServicesActive || servicesOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                  servicesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.4)]">
                  <div className="grid grid-cols-2 gap-0.5 p-2.5">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group/item flex gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-slate-50"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 transition-colors duration-150 group-hover/item:border-emerald-200 group-hover/item:bg-emerald-50 group-hover/item:text-emerald-700">
                          {item.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-800 transition-colors group-hover/item:text-emerald-800">
                            {item.title}
                            <svg
                              className="h-3 w-3 -translate-x-1 text-emerald-600 opacity-0 transition-all duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
                            </svg>
                          </span>
                          <span className="mt-1 block text-[11.5px] leading-relaxed text-slate-500">
                            {item.desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2.5">
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      Field-tested methodology
                    </span>
                    <Link
                      href="/services"
                      className="group/all inline-flex items-center gap-1 text-[11.5px] font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                    >
                      All services
                      <svg
                        className="h-3 w-3 transition-transform duration-150 group-hover/all:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <NavLink href="/gallery" label="Gallery" active={isActive("/gallery")} transparent={transparent} />
            <NavLink href="/blog" label="Blog" active={isActive("/blog")} transparent={transparent} />
            <NavLink href="/contact" label="Contact" active={isActive("/contact")} transparent={transparent} />
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className={`group hidden h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[12.5px] font-semibold text-white transition-colors duration-200 lg:inline-flex ${
              transparent
                ? "bg-white/10 ring-1 ring-inset ring-white/25 backdrop-blur-sm hover:bg-white/20"
                : "bg-slate-900 hover:bg-emerald-700"
            }`}
          >
            Request an audit
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 lg:hidden ${
              transparent ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
            }`}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`overflow-y-auto overflow-x-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-out lg:hidden ${
            mobileOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 pb-6 pt-3 sm:px-6">
            <nav className="flex flex-col">
              <MobileLink href="/" label="Home" active={pathname === "/"} />
              <MobileLink href="/about" label="About" active={isActive("/about")} />

              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className={`flex items-center justify-between rounded-lg px-3 py-3 text-[14px] font-medium transition-colors ${
                  isServicesActive ? "text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mb-2 ml-3 space-y-0.5 border-l border-slate-200 pl-3">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-2.5 rounded-md px-2 py-2 text-[13px] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        <span className="text-slate-400">{item.icon}</span>
                        {item.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1 px-2 py-2 text-[12px] font-semibold text-emerald-700"
                    >
                      View all services
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              <MobileLink href="/gallery" label="Gallery" active={isActive("/gallery")} />
              <MobileLink href="/blog" label="Blog" active={isActive("/blog")} />
              <MobileLink href="/contact" label="Contact" active={isActive("/contact")} />
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              <a
                href="tel:+917356111990"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2.5 text-[12.5px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h1.6c.5 0 .9.3 1 .8l.9 3a1 1 0 01-.3 1L7.5 9a12 12 0 007.5 7.5l1.2-1.2a1 1 0 011-.3l3 .9c.5.1.8.5.8 1v1.6a2.5 2.5 0 01-2.5 2.5C10.6 21 3 13.4 3 5.5z" />
                </svg>
                Call us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-3 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Request an audit
              </Link>
            </div>

            <p className="mt-3 text-center text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-400">
              EMC Kerala · BEE · GEDA accredited
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  transparent,
}: {
  href: string;
  label: string;
  active: boolean;
  transparent: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative inline-flex h-full items-center px-3 text-[13px] font-medium tracking-[0.015em] transition-colors duration-200 ${
        transparent
          ? active
            ? "text-white"
            : "text-white hover:text-white"
          : active
            ? "text-slate-950"
            : "text-slate-500 hover:text-slate-950"
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-t-full transition-transform duration-300 ease-out ${
          transparent ? "bg-emerald-400" : "bg-emerald-600"
        } ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </Link>
  );
}

function MobileLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between rounded-lg px-3 py-3 text-[14px] font-medium transition-colors ${
        active ? "bg-slate-50 text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      {label}
      <svg
        className={`h-4 w-4 transition-colors ${active ? "text-emerald-600" : "text-slate-300"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
