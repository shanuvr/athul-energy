import type { Metadata } from "next";
import Image from "next/image";
import DownloadsPageClient from "@/components/user/DownloadsPageClient";
import Breadcrumbs from "@/components/user/Breadcrumbs";

export const metadata: Metadata = {
  title: "Statutory Downloads, Government Orders & Standards",
  description:
    "Official regulatory gazettes, Bureau of Energy Efficiency (BEE) guidebooks, Central Electricity Authority (CEA) safety standards, K-ECBC orders, and energy auditing study manuals.",
  alternates: {
    canonical: "/downloads",
  },
  openGraph: {
    title: "Statutory Downloads, Government Orders & Standards | Athul Energy",
    description:
      "Official regulatory gazettes, BEE guidebooks, CEA safety regulations, and compliance manuals.",
    url: "https://www.athulenergy.com/downloads",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Statutory Downloads and Regulatory Publications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statutory Downloads & Regulatory Publications | Athul Energy Consultants",
    description:
      "BEE guidebooks, CEA safety regulations, and compliance manuals.",
    images: ["/hero-desk.webp"],
  },
};

const downloadsJsonLd = {
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
          name: "Downloads",
          item: "https://www.athulenergy.com/downloads",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.athulenergy.com/downloads#webpage",
      name: "Regulatory & Statutory Downloads Archive",
      description:
        "Technical guidebooks, gazette notifications, and standards published for plant engineers and facility managers.",
      url: "https://www.athulenergy.com/downloads",
    },
  ],
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadsJsonLd) }}
      />
      {/* Hero Section — compact banner with greenish background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-green-50/50 to-white border-b border-emerald-100/60 py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Regulatory Downloads" }]}
            className="px-0 pt-0 pb-2.5"
          />
          {/* Always side-by-side: text left, image right */}
          <div className="flex flex-row items-center justify-between gap-4">
            {/* Left Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-6 sm:h-8 rounded-full bg-emerald-600 shrink-0" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Downloads
                </h1>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-4">
                Statutory documents, guidelines and government publications.
              </p>
            </div>

            {/* Right Hero Illustration */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-emerald-100/60 blur-2xl -z-10"
              />
              <Image
                src="/downloads-hero.webp"
                alt="Downloads illustration"
                width={180}
                height={180}
                priority
                className="w-20 sm:w-28 md:w-36 h-auto object-contain select-none mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content List Container */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:pt-8 sm:px-6 lg:px-8">
        <DownloadsPageClient />
      </main>
    </div>
  );
}
