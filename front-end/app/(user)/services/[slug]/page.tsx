import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SERVICES_DATA,
  getServiceBySlug,
  getServicesByCategory,
  SERVICE_CATEGORIES,
} from "@/lib/services-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Athul Energy",
    };
  }

  return {
    title: `${service.title} | Athul Energy Consultants`,
    description: service.shortDesc,
    keywords: [
      service.title,
      service.categoryLabel,
      ...service.standards,
      ...service.targetIndustries,
    ],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const categoryInfo = SERVICE_CATEGORIES.find((c) => c.id === service.category);
  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Breadcrumb & Hero */}
      <section className="border-b border-slate-200/80 bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-700 transition-colors">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services?cat=${service.category}`}
              className="hover:text-emerald-700 transition-colors"
            >
              {categoryInfo?.shortTitle || service.categoryLabel}
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-xs">
              {service.title}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                  {service.categoryLabel}
                </span>

                {service.badge && (
                  <span className="inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-800">
                    {service.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                {service.shortDesc}
              </p>

              {/* Standard Badges */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Mandatory Standards:
                </span>
                {service.standards.map((std, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Request Audit Proposal
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href="tel:+917356111990"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h1.6c.5 0 .9.3 1 .8l.9 3a1 1 0 01-.3 1L7.5 9a12 12 0 007.5 7.5l1.2-1.2a1 1 0 011-.3l3 .9c.5.1.8.5.8 1v1.6a2.5 2.5 0 01-2.5 2.5C10.6 21 3 13.4 3 5.5z" />
                </svg>
                Speak with AEA Auditor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Technical Specifications Body */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Detailed Specifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Scope */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Scope of Work &amp; Technical Methodology
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                {service.fullDesc}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                All measurements, calculations, and risk analyses adhere strictly to accredited
                procedures formulated in accordance with the Bureau of Energy Efficiency (BEE),
                Central Electricity Authority (CEA), and relevant Indian Standard (IS) codes.
              </p>
            </div>

            {/* Deliverables List */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Tangible Deliverables &amp; Client Reports
              </h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyDeliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                      {deliv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precision Instruments Used */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Testing Tools &amp; NABL Calibrated Equipment
              </h2>
              <p className="mt-3 text-xs text-slate-500">
                Our engineering team deploys the following calibrated instruments for this service:
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {service.equipmentUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800"
                  >
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Applicable Sectors */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Target Sectors &amp; Industries
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.targetIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Services in Category */}
            {relatedServices.length > 0 && (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Related Services in {categoryInfo?.shortTitle || "this Category"}
                </h2>
                <div className="mt-4 space-y-3">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">
                          {rel.shortDesc}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Consultation Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-6">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">
                  Accredited Service
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  Request an Audit for This Discipline
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  Submit your plant details to receive an official scope, quotation, and schedule from our accredited energy auditors.
                </p>
              </div>

              <div className="space-y-3 border-y border-slate-100 py-4 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Report Turnaround:</span>
                  <span className="font-semibold text-slate-900">7 – 14 business days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Accreditation:</span>
                  <span className="font-semibold text-slate-900">BEE &amp; EMC Kerala</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Field Disruptions:</span>
                  <span className="font-semibold text-emerald-700">Zero (Non-invasive testing)</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                >
                  Book Official Consultation
                </Link>

                <a
                  href="tel:+917356111990"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h1.6c.5 0 .9.3 1 .8l.9 3a1 1 0 01-.3 1L7.5 9a12 12 0 007.5 7.5l1.2-1.2a1 1 0 011-.3l3 .9c.5.1.8.5.8 1v1.6a2.5 2.5 0 01-2.5 2.5C10.6 21 3 13.4 3 5.5z" />
                  </svg>
                  +91 73561 11990
                </a>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 text-[11px] text-slate-500 leading-relaxed border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1">Confidentiality Assured:</span>
                All industrial electrical single line diagrams, load logs, and utility bills are handled under strict confidentiality agreements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
