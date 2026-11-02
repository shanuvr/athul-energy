import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  FileCheck2,
  Wrench,
  Factory,
  Check,
  Target,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Lock,
} from "lucide-react";
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

export default function ServiceDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<ServiceDetailSkeleton />}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}

function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 animate-pulse">
      <div className="border-b border-slate-200/90 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-48 bg-slate-200 rounded mb-4" />
          <div className="h-8 w-2/3 bg-slate-200 rounded mb-3" />
          <div className="h-4 w-1/3 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] w-full max-w-3xl bg-slate-200 rounded-2xl mb-6" />
      </div>
    </div>
  );
}

async function ServiceDetailContent({ params }: Props) {
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
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Compact Hero Section */}
      <section className="border-b border-slate-200/90 bg-white py-6 sm:py-8 lg:py-10 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation - Compact, single line, horizontally scrollable on mobile */}
          <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-5 overflow-x-auto whitespace-nowrap scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link href="/" className="shrink-0 hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <Link href="/services" className="shrink-0 hover:text-emerald-700 transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <Link
              href={`/services?cat=${service.category}`}
              className="shrink-0 hover:text-emerald-700 transition-colors"
            >
              {categoryInfo?.shortTitle || service.categoryLabel}
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
            <span className="shrink-0 font-semibold text-slate-900">
              {service.title}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-2.5">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-emerald-800">
                  {service.categoryLabel}
                </span>

                {service.badge && (
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-slate-800">
                    {service.badge}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="mt-2 sm:mt-2.5 text-xs sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                {service.shortDesc}
              </p>

              {/* Mandatory Standards Badges */}
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                  Mandatory Standards:
                </span>
                {service.standards.map((std, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-slate-200/90 bg-slate-50 px-2 py-0.5 text-[10.5px] sm:text-[11px] font-medium text-slate-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons - Side-by-Side on mobile */}
            <div className="shrink-0 grid grid-cols-2 gap-2 sm:flex sm:flex-row lg:flex-col lg:w-56 pt-1 sm:pt-2 lg:pt-0">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 rounded-xl bg-[#053824] px-2.5 sm:px-5 py-2.5 text-[11px] sm:text-xs lg:text-sm font-bold text-white shadow-2xs transition-colors hover:bg-emerald-800 text-center leading-tight"
              >
                <span className="hidden sm:inline">Request Audit Proposal</span>
                <span className="sm:hidden">Request Proposal</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#4ade80]" />
              </Link>
              <a
                href="tel:+917356111990"
                className="inline-flex items-center justify-center gap-1 sm:gap-2 rounded-xl border border-slate-300 bg-white px-2.5 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 text-center leading-tight"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span className="hidden sm:inline">Speak with AEA Auditor</span>
                <span className="sm:hidden">Call Auditor</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Technical Specifications Body */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left 2 Columns: Detailed Technical Dossier */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Service Photo Showcase */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={`/services/${service.slug}.webp`}
                  alt={`${service.title} - Certified Engineering Service by Athul Energy`}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-slate-100">
                      BEE Accredited Field Engineering Protocol
                    </span>
                  </div>
                  <span className="rounded-md bg-black/40 backdrop-blur-xs border border-white/20 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-300">
                    NABL Calibrated Equipment
                  </span>
                </div>
              </div>
            </div>

            {/* Scope of Work & Comprehensive Technical Methodology */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
                <FileCheck2 className="h-5 w-5 text-[#15803d]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Scope of Work &amp; Technical Methodology
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                {service.fullDesc}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Our accredited energy auditors deploy high-precision, NABL-calibrated instruments to capture true RMS electrical parameters, thermal gradients, and mass-flow metrics. All measurements adhere strictly to BEE protocols, CEA 2010 safety regulations, and applicable Indian Standards (IS).
              </p>

              {/* 4-Step Technical Audit Roadmap */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5">
                  Standard 4-Phase Audit Workflow
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                    <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 mb-1.5">
                      Phase 1
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">Pre-Audit Data &amp; Single-Line Review</h4>
                    <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                      Verification of historical 12-month utility bills, single-line diagrams (SLD), connected load lists, and baseline operating hours.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                    <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 mb-1.5">
                      Phase 2
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">On-Site Field Logging &amp; Measurement</h4>
                    <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                      Deployment of Class-A power quality analyzers, infrared cameras, and flow sensors across transformers, panels, and motors.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                    <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 mb-1.5">
                      Phase 3
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">Energy &amp; Mass Balance Modeling</h4>
                    <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                      Calculation of Specific Energy Consumption (SEC), distribution line losses, boiler/chiller efficiencies, and harmonic distortions.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                    <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 mb-1.5">
                      Phase 4
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">Prioritized ECM &amp; Payback Roadmap</h4>
                    <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                      Actionable Energy Conservation Measures categorized into Zero-Cost, Low-Cost, and High-ROI retrofits with verified payback schedules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Audit Objectives & Financial Value */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
                <Target className="h-5 w-5 text-[#15803d]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Core Audit Objectives &amp; Measurable Benefits
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Operating Cost Reduction:</strong>
                    Identify tangible energy savings typically ranging between 8% to 22% of total plant power bills.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Statutory Compliance:</strong>
                    Satisfy BEE, State Designated Agency (EMC Kerala), and CEA safety statutory filing requirements.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Asset Protection &amp; Reliability:</strong>
                    Mitigate electrical hotspot degradation, arc flashes, and premature insulation breakdown.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Decarbonization &amp; ESG:</strong>
                    Direct reduction of Specific Energy Consumption (SEC) and greenhouse gas (Scope 1 &amp; 2) footprints.
                  </div>
                </div>
              </div>
            </div>

            {/* Tangible Deliverables List */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
                <BarChart3 className="h-5 w-5 text-[#15803d]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Tangible Deliverables &amp; Client Reports
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.keyDeliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803d] mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800 leading-snug">
                      {deliv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precision Calibrated Instruments */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-3">
                <Wrench className="h-5 w-5 text-[#15803d]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Testing Tools &amp; NABL Calibrated Equipment
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Our engineering team deploys the following calibrated precision instruments during this service:
              </p>
              <div className="flex flex-wrap gap-2">
                {service.equipmentUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800"
                  >
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Applicable Sectors */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-3">
                <Factory className="h-5 w-5 text-[#15803d]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Target Sectors &amp; Industries
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
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
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-3">
                  <Layers className="h-5 w-5 text-[#15803d]" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Related Services in {categoryInfo?.shortTitle || "this Category"}
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-[11.5px] text-slate-500 mt-0.5 line-clamp-1">
                          {rel.shortDesc}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Consultation Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md space-y-5">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Accredited Service
                </span>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  Request an Audit for This Discipline
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  Submit your plant details to receive an official scope, quotation, and schedule from our accredited energy auditors.
                </p>
              </div>

              <div className="space-y-2.5 border-y border-slate-100 py-3.5 text-xs text-slate-600">
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
                  <span className="font-semibold text-[#15803d]">Zero (Non-invasive testing)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#053824] py-3 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-emerald-800"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#4ade80]" />
                  Book Official Consultation
                </Link>

                <a
                  href="tel:+917356111990"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  +91 73561 11990
                </a>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 leading-relaxed border border-slate-100 flex items-start gap-2">
                <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-700 block">Confidentiality Assured:</strong>
                  All single-line diagrams, operating logs, and utility bills are handled under non-disclosure agreements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
