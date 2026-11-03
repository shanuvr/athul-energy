import type { Metadata } from "next";
import Image from "next/image";
import DownloadsPageClient from "@/components/user/DownloadsPageClient";

export const metadata: Metadata = {
  title: "Statutory Downloads, Government Orders & Standards | Athul Energy Consultants",
  description:
    "Official regulatory gazettes, Bureau of Energy Efficiency (BEE) guidebooks, Central Electricity Authority (CEA) safety standards, K-ECBC orders, and energy auditing study manuals.",
  keywords: [
    "BEE Guide Books PDF",
    "CEA Regulations 2010 Gazette",
    "K-ECBC Kerala Gazette",
    "Energy Conservation Act amended",
    "Electricity Act 2003 statutory audit",
    "NAAC Criteria 7 Green Audit Manual",
    "Athul Energy Downloads",
  ],
  alternates: {
    canonical: "/downloads",
  },
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section — compact banner with greenish background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-green-50/50 to-white border-b border-emerald-100/60 py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
