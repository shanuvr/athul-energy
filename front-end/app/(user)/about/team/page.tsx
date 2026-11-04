import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TeamDirectory from "@/components/user/TeamDirectory";
import Breadcrumbs from "@/components/user/Breadcrumbs";

export const metadata: Metadata = {
  title: "Engineering Team & Leadership",
  description:
    "Meet our multidisciplinary team of BEE Accredited Energy Auditors (AEA-0275), Certified Energy Managers, and BEE Empaneled Sector Experts for Refineries, Thermal Power, DISCOMs, and Buildings.",
  alternates: {
    canonical: "/about/team",
  },
  openGraph: {
    title: "Engineering Team & Leadership | Athul Energy",
    description:
      "Meet our multidisciplinary team of BEE Accredited Energy Auditors, Certified Energy Managers, and BEE Empaneled Sector Experts.",
    url: "https://www.athulenergy.com/about/team",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Engineering Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Team & Leadership | Athul Energy Consultants",
    description:
      "Meet our certified BEE Accredited Energy Auditors and statutory inspection experts.",
    images: ["/hero-desk.webp"],
  },
};

const teamJsonLd = {
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
          name: "About Us",
          item: "https://www.athulenergy.com/about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Our Engineering Team",
          item: "https://www.athulenergy.com/about/team",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.athulenergy.com/about/team#webpage",
      name: "Athul Energy Engineering Team & Leadership",
      description:
        "Accredited Energy Auditors, Certified Energy Managers, and Empaneled Sector Specialists.",
      url: "https://www.athulenergy.com/about/team",
    },
  ],
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      {/* Top Hero Section */}
      <section className="border-b border-slate-200 bg-white py-8 shadow-2xs sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation with BreadcrumbList Schema */}
          <Breadcrumbs
            items={[
              { label: "About Us", href: "/about" },
              { label: "Our Engineering Team" },
            ]}
            className="px-0 py-0 mb-6"
          />

          <div className="max-w-3xl">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Technical leadership
            </p>

            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Our multidisciplinary audit &amp; engineering team
            </h1>

            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Led by BEE Accredited Energy Auditors with over 20 years of
              industry experience. Our engineers and empaneled specialists bring
              accredited statutory qualifications, certified instrumentation, and
              rigorous field testing across industrial plants, refineries, power
              stations, and commercial facilities.
            </p>

            <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              12 Accredited Specialists &amp; Empaneled Experts · Thrissur, Kerala
            </p>
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <TeamDirectory />
      </div>
    </div>
  );
}
