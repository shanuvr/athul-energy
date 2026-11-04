import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Engineering team", href: "/about/team" },
  { label: "Downloads", href: "/downloads" },
  { label: "Gallery", href: "/gallery" },
  { label: "Technical blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const empanelments = ["BEE AEA-0275", "EMC Kerala", "GEDA", "MEDA"];

const copyrightYear = 2026;

const linkClass =
  "inline-flex text-[12.5px] leading-relaxed text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white";

const headingClass =
  "text-[9.5px] font-semibold uppercase tracking-[0.2em] text-slate-500";

export default function UserFooter() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-400">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link prefetch={false}
              href="/"
              aria-label="Athul Energy Consultants — home"
              className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <Image
                src="/athul-logo.webp"
                alt="Athul Energy Consultants"
                width={190}
                height={63}
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p className="mt-5 max-w-sm text-pretty text-[13px] leading-relaxed text-slate-400">
              BEE accredited energy audit and electrical safety consultants
              serving industrial, commercial and institutional sites across
              Kerala since 2008.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {empanelments.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  )}
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="tel:+917356111990"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                +91 73561 11990
              </a>
              <a
                href="mailto:info@athulenergy.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                Email us
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <nav aria-labelledby="footer-company">
              <h3 id="footer-company" className={headingClass}>
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link prefetch={false} href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-services">
              <h3 id="footer-services" className={headingClass}>
                Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {SERVICE_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <Link prefetch={false}
                      href={`/services?cat=${category.id}`}
                      className={linkClass}
                    >
                      {category.shortTitle}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link prefetch={false}
                    href="/services"
                    className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-emerald-400 transition-colors duration-200 hover:text-emerald-300"
                  >
                    All 35 engineering services
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h3 className={headingClass}>Head office</h3>
              <address className="mt-4 space-y-3 text-[12.5px] not-italic leading-relaxed text-slate-400">
                <p className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                  <span>
                    Capital Legend Building,
                    <br />
                    Korappath Lane, Thrissur North,
                    <br />
                    Kerala 680020
                  </span>
                </p>
                <p>
                  <a
                    href="tel:+917356111990"
                    className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                    +91 73561 11990 / 11991
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@athulenergy.com"
                    className="inline-flex items-center gap-2.5 break-all transition-colors duration-200 hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                    info@athulenergy.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Regional Industrial Coverage Bar */}
        <div className="border-t border-slate-900 py-4 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-slate-400">Active Audit Hubs:</span>
            <span>Thrissur (Headquarters)</span>
            <span>·</span>
            <span>Kochi / Ernakulam</span>
            <span>·</span>
            <span>Palakkad (KINFRA)</span>
            <span>·</span>
            <span>Kozhikode</span>
            <span>·</span>
            <span>Trivandrum</span>
            <span>·</span>
            <span>Pan-India SDAs</span>
          </div>
          <span className="text-emerald-400/80 font-medium">BEE AEA-0275 · CEA 2010 · ISO 50001</span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} Athul Energy Consultants Pvt. Ltd. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="uppercase tracking-[0.14em]">
              BEE accredited · Est. 2008
            </span>
            <Link prefetch={false}
              href="/contact"
              className="group inline-flex items-center gap-1 font-semibold text-slate-300 transition-colors duration-200 hover:text-emerald-300"
            >
              Request an audit
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
