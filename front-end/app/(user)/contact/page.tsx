
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import ContactForm from "@/components/user/ContactForm";
import ContactFAQ from "@/components/user/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us | Athul Energy Consultants",
  description:
    "Contact Athul Energy Consultants in Thrissur, Kerala, to scope a BEE accredited energy audit, CEA electrical safety inspection or statutory compliance review.",
  keywords: [
    "Contact Athul Energy Consultants",
    "Energy auditor Thrissur",
    "BEE energy audit enquiry",
    "Electrical safety audit Kerala",
    "Energy audit quote Kerala",
    "Energy audit proposal Kerala",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Athul Energy Consultants",
    description:
      "Request an engineering scope or statutory audit proposal from BEE Accredited Energy Auditors.",
    url: "https://www.athulenergy.com/contact",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Head Office Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Athul Energy Consultants",
    description:
      "Request an engineering scope or statutory audit proposal from BEE Accredited Energy Auditors.",
    images: ["/hero-desk.webp"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.athulenergy.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://www.athulenergy.com/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://www.athulenergy.com/contact#webpage",
      name: "Contact Athul Energy Consultants",
      description:
        "Official inquiry and technical contact channel for Athul Energy Consultants Pvt. Ltd. in Thrissur, Kerala.",
      url: "https://www.athulenergy.com/contact",
      mainEntity: {
        "@type": "ProfessionalService",
        "@id": "https://www.athulenergy.com/#organization",
        name: "Athul Energy Consultants Pvt. Ltd.",
        telephone: "+91-7356111990",
        email: "info@athulenergy.com",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.athulenergy.com/contact#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How quickly can Athul Energy mobilize an audit team to our plant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For urgent statutory deadlines, CEA electrical safety notices, or insurance compliance inspections, we can deploy an accredited engineering team within 48 to 72 hours across Kerala, Tamil Nadu, and Karnataka.",
          },
        },
        {
          "@type": "Question",
          name: "Are your audit reports recognized by BEE and State Designated Agencies (EMC Kerala)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100%. Athul Energy Consultants Pvt. Ltd. is an approved energy auditing firm empanelled with Energy Management Centre (EMC) Kerala, GEDA, and MEDA. Our lead auditor holds Bureau of Energy Efficiency Accredited Energy Auditor credential (AEA-0275).",
          },
        },
        {
          "@type": "Question",
          name: "Do you supply measurement equipment, or does the plant need to provide meters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our engineers bring our own calibrated, high-precision test instrumentation including Class-A power quality analyzers (Fluke / Hioki), FLIR Level-II infrared thermal imagers, ultrasonic non-invasive flow meters, and earth resistance testers.",
          },
        },
      ],
    },
  ],
};

const mapQuery = encodeURIComponent(
  "Capital Legend Building, Korappath Lane, Thrissur North, Kerala 680020"
);
const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const channels = [
  {
    label: "Call the office",
    value: "+91 73561 11990",
    href: "tel:+917356111990",
    icon: Phone,
    external: false,
  },
  {
    label: "Email",
    value: "info@athulenergy.com",
    href: "mailto:info@athulenergy.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Head office",
    value: "Capital Legend Building, Thrissur",
    href: mapLink,
    icon: MapPin,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <span aria-hidden="true" className="h-px w-8 bg-emerald-400/70" />
                Contact
              </div>

              <h1 className="mt-5 text-balance font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Tell us about your site.
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-slate-300 sm:text-base">
                Audit scoping, statutory compliance, a second opinion, or a
                straightforward quote — start here and we will point you to the
                right team.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400/80" />
                  Replies within one working day
                </span>
                <span>Thrissur, Kerala</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-t border-white/10">
                {channels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {channel.label}
                          </span>
                          <span className="mt-0.5 block truncate text-[13px] font-medium text-white transition-colors group-hover:text-emerald-300">
                            {channel.value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400" />
                    </a>
                  );
                })}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                For urgent shutdown coordination, call the office directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form and office details */}
      <section className="relative isolate overflow-hidden bg-slate-100/75 border-t border-slate-200/90 py-12 sm:py-16">
        {/* Subtle architectural background texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left Column: Form Card with Elevation */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Differentiated Map & Dark Headquarters Terminal */}
            <aside className="lg:col-span-5 space-y-6">
              {/* Map Card: Framed Tech Deck */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
                {/* Map Header Ribbon */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700">
                      Capital Legend Building
                    </span>
                  </div>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 text-[10.5px] font-bold text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                {/* Map Iframe */}
                <div className="relative h-[260px] sm:h-[290px] w-full bg-slate-100">
                  <iframe
                    src={mapEmbedUrl}
                    title="Athul Energy Consultants head office location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>

                {/* Transit & Access Strip */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60 py-2.5 text-center text-[10px] text-slate-600">
                  <div className="px-1 font-medium">
                    <span className="block font-bold text-slate-900">2.5 km</span>
                    <span>TCR Railway</span>
                  </div>
                  <div className="px-1 font-medium">
                    <span className="block font-bold text-slate-900">6.0 km</span>
                    <span>NH 544 Bypass</span>
                  </div>
                  <div className="px-1 font-medium">
                    <span className="block font-bold text-slate-900">55 km</span>
                    <span>Cochin Airport</span>
                  </div>
                </div>
              </div>

              {/* Head Office Card: High-Contrast Dark Charcoal & Emerald */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-[#053824] p-6 sm:p-7 text-white shadow-2xl shadow-slate-950/25 ring-1 ring-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-400/25 text-emerald-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[9.5px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                        Corporate Head Office
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Athul Energy Consultants Pvt. Ltd.
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                    Est. 2008
                  </span>
                </div>

                <address className="mt-4 text-[13px] not-italic leading-relaxed text-slate-300">
                  <span className="font-semibold text-white">Capital Legend Building,</span>
                  <br />
                  Korappath Lane, Thrissur North,
                  <br />
                  Kerala, India — 680020
                </address>

                {/* Statutory Registration Badges */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                    <span className="block text-slate-400">GST Registration</span>
                    <span className="font-mono font-bold text-emerald-300">32AAOCA8529M1Z6</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                    <span className="block text-slate-400">BEE Accredited</span>
                    <span className="font-bold text-emerald-300">AEA-0275</span>
                  </div>
                </div>

                {/* Direct Contact Links */}
                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[12.5px]">
                  <a
                    href="tel:+917356111990"
                    className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-emerald-400">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <span>+91 73561 11990</span>
                    <span className="text-[11px] text-slate-500">/ 11991</span>
                  </a>
                  <a
                    href="mailto:info@athulenergy.com"
                    className="flex items-center gap-2.5 break-all text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-emerald-400">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <span>info@athulenergy.com</span>
                  </a>
                  <p className="flex items-center gap-2.5 text-slate-400 text-xs">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-emerald-400">
                      <Clock className="h-3.5 w-3.5" />
                    </span>
                    <span>Mon–Sat · 9:00 AM – 6:00 PM IST</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Frequently Asked Technical & Statutory Questions */}
          <div className="mt-12 sm:mt-16">
            <ContactFAQ />
          </div>
        </div>
      </section>
    </div>
  );
}
