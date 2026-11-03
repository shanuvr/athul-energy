import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import {
  getTeamMemberById,
  type TeamMember,
} from "@/lib/team-data";
import LeadershipCard from "@/components/user/LeadershipCard";
import {
  ABOUT_DISCIPLINES,
  ABOUT_EMPANELMENTS,
  ABOUT_PROOF_POINTS,
  ABOUT_STORY,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
  ABOUT_VISION_MISSION,
} from "@/lib/about-data";

export const metadata: Metadata = {
  title: "About Us | Athul Energy Consultants",
  description:
    "Athul Energy Consultants Pvt. Ltd. (AEC) is a premier BEE Accredited Energy Auditing and Electrical Safety consulting firm empanelled with EMC Kerala, GEDA, and MEDA since 2008.",
  keywords: [
    "About Athul Energy Consultants",
    "Energy Auditor Kerala",
    "BEE Accredited Energy Auditor AEA-0275",
    "Santhosh A Energy Auditor",
    "EMC Kerala empanelled auditor",
    "Industrial energy audit Kerala",
    "Electrical safety consulting Thrissur",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Athul Energy Consultants",
    description:
      "BEE Accredited Energy Auditing (AEA-0275) and Electrical Safety consultancy firm empanelled with EMC Kerala, GEDA, and MEDA since 2008.",
    url: "https://www.athulenergy.com/about",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Engineering Leadership and Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Athul Energy Consultants",
    description:
      "Premier BEE Accredited Energy Auditing and Electrical Safety consulting firm based in Thrissur, Kerala.",
    images: ["/hero-desk.webp"],
  },
};

const aboutJsonLd = {
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
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.athulenergy.com/about#webpage",
      name: "About Athul Energy Consultants",
      description:
        "Overview of Athul Energy Consultants' engineering credentials, BEE AEA-0275 accreditation, EMC Kerala empanelment, leadership, and track record since 2008.",
      url: "https://www.athulenergy.com/about",
      mainEntity: {
        "@type": "Organization",
        name: "Athul Energy Consultants Pvt. Ltd.",
        foundingDate: "2008",
        founder: {
          "@type": "Person",
          name: "Er. Santhosh A.",
          jobTitle: "Managing Director & Lead Energy Auditor",
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              name: "BEE Accredited Energy Auditor (AEA-0275)",
              credentialCategory: "degree",
              recognizedBy: {
                "@type": "GovernmentOrganization",
                name: "Bureau of Energy Efficiency, Ministry of Power, Govt. of India",
              },
            },
          ],
        },
      },
    },
  ],
};

const leaderIds = ["santhosh-a", "ashok-kmp", "gayathri-nair-r"];

export default function AboutPage() {
  const leaders = leaderIds
    .map((id) => getTeamMemberById(id))
    .filter((member): member is TeamMember => Boolean(member));

  const [vision, mission] = [ABOUT_VISION_MISSION.vision, ABOUT_VISION_MISSION.mission];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero-desk.webp"
            alt="Energy audit engineers inspecting industrial electrical equipment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/55" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at center, black, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black, transparent 78%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <span>Est. 2008</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-400/70" />
              <span>Thrissur, Kerala</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-400/70" />
              <span className="text-emerald-300/90">BEE AEA-0275</span>
            </div>

            <h1 className="mt-5 text-balance font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Energy engineering for Kerala&apos;s industrial backbone
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Athul Energy Consultants is a Thrissur-based energy audit and
              electrical safety firm working with Designated Consumers,
              continuous process plants, hospitals, commercial buildings and
              academic institutions across Kerala.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/services"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-slate-950 shadow-[0_16px_50px_-16px_rgba(16,185,129,0.9)] transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Explore audit services
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about/team"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Meet the engineering team
              </Link>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-4">
            {ABOUT_PROOF_POINTS.map((point) => (
              <div key={point.label} className="bg-slate-950/90 px-4 py-4 sm:px-5 sm:py-5">
                <dd className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {point.value}
                </dd>
                <dt className="mt-1 text-[9.5px] font-semibold uppercase leading-snug tracking-[0.14em] text-slate-400">
                  {point.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Company profile
              </span>
              <h2 className="mt-3 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[2.5rem]">
                {ABOUT_STORY.heading}
              </h2>

              <dl className="mt-8 space-y-4 border-t border-slate-200 pt-5 text-xs">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Founded
                  </dt>
                  <dd className="font-semibold text-slate-900">2008</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Head office
                  </dt>
                  <dd className="font-semibold text-slate-900">Thrissur, Kerala</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Accreditation
                  </dt>
                  <dd className="font-semibold text-slate-900">BEE AEA-0275</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-5 text-pretty text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
                {ABOUT_STORY.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/services/infrared-thermal-imaging-survey.webp"
                    alt="Thermal imaging survey of an industrial electrical distribution board"
                    fill
                    sizes="(max-width: 1023px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-[11px] leading-relaxed text-slate-500">
                  On-site FLIR Level-II thermal survey — one of 30 audit
                  disciplines delivered by our field team.
                </figcaption>
              </figure>

              <blockquote className="mt-8 border-l-2 border-emerald-600 pl-5">
                <p className="text-pretty font-display text-lg font-medium leading-snug tracking-tight text-slate-900 sm:text-xl">
                  &ldquo;{ABOUT_STORY.quote}&rdquo;
                </p>
                <footer className="mt-3 text-[11px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {ABOUT_STORY.quoteAttribution}
                  </span>{" "}
                  · {ABOUT_STORY.quoteRole}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, mission, values & empanelments */}
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
          className="pointer-events-none absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Purpose
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Vision · Mission · Values
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[vision, mission].map((item) => (
              <div key={item.label} className="border-t border-white/10 pt-6">
                <span className="font-display text-[11px] font-semibold uppercase tabular-nums tracking-[0.2em] text-emerald-400">
                  {item.number} — {item.label}
                </span>
                <p className="mt-4 text-balance font-display text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
                  {item.statement}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-x-12 border-t border-white/10 sm:grid-cols-2">
            {ABOUT_VALUES.map((value, index) => (
              <div key={value.title} className="flex gap-4 border-b border-white/10 py-5">
                <span className="pt-0.5 font-display text-[10px] font-semibold tabular-nums tracking-[0.16em] text-emerald-400">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-white">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Accredited &amp; empanelled
            </span>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {ABOUT_EMPANELMENTS.map((item) => (
                <div key={item.mark} className="bg-slate-950 px-4 py-4">
                  <span className="font-display text-lg font-bold tracking-tight text-white">
                    {item.mark}
                  </span>
                  <span className="mt-1 block text-[9.5px] leading-snug text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Milestones
            </span>
            <h2 className="mt-3 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[2.5rem]">
              A practice shaped by the field, not the brochure
            </h2>
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_TIMELINE.map((item) => (
              <div key={item.year} className="border-t border-slate-300 pt-5">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {item.year}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines index */}
      <section className="border-y border-slate-200 bg-slate-50/70 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                What we do
              </span>
              <h2 className="mt-3 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[2.5rem]">
                Five disciplines. Thirty audit services.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-emerald-800"
            >
              All audit services
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-200">
            {ABOUT_DISCIPLINES.map((discipline, index) => (
              <Link
                key={discipline.title}
                href={discipline.href}
                className="group grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-b border-slate-200 py-5 transition-colors hover:bg-white sm:grid-cols-[2.5rem_16rem_1fr_auto] sm:items-center sm:gap-6 sm:px-2"
              >
                <span className="row-span-2 font-display text-[10px] font-semibold tabular-nums tracking-[0.16em] text-slate-400 sm:row-span-1">
                  0{index + 1}
                </span>
                <span className="font-display text-base font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800 sm:text-lg">
                  {discipline.title}
                </span>
                <span className="col-start-2 text-[12.5px] leading-relaxed text-slate-500 sm:col-start-auto sm:text-[13px]">
                  {discipline.description}
                </span>
                <ArrowUpRight className="hidden h-4 w-4 text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Our specialists
              </span>
              <h2 className="mt-3 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[2.5rem]">
                The engineers who sign the findings
              </h2>
              <p className="mt-3 text-pretty text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                Audits are led by senior professionals with certified
                credentials and statutory empaneled standing.
              </p>
            </div>
            <Link
              href="/about/team"
              className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-emerald-800"
            >
              View all 15+ specialists
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((member) => (
              <LeadershipCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-emerald-500/15 blur-[110px]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Next step
            </span>
            <h2 className="mt-3 text-balance font-display text-2xl font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.4rem]">
              Planning an audit or a statutory compliance review?
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">
              Tell us about your site and we will scope the right discipline,
              instrumentation and reporting format.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Request an audit
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+917356111990"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Phone className="h-4 w-4 text-emerald-300" />
              +91 73561 11990
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
