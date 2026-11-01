import Link from "next/link";

interface NewsEventItem {
  id: string;
  type: "EVENT" | "NEWS" | "TRAINING";
  typeColor: "emerald" | "blue" | "amber";
  title: string;
  excerpt: string;
  date: string;
  meta: string;
  href: string;
}

const NEWS_EVENTS: NewsEventItem[] = [
  {
    id: "ne-1",
    type: "EVENT",
    typeColor: "emerald",
    title: "Industrial Energy Conservation & BEE Compliance Seminar 2026",
    excerpt:
      "Athul Energy led an intensive technical seminar on ISO 50001 energy management frameworks and thermal efficiency optimization for manufacturing plant heads in Kerala.",
    date: "Oct 28, 2026",
    meta: "Kochi, Kerala",
    href: "/blog/complete-guide-to-bee-mandatory-energy-audits",
  },
  {
    id: "ne-2",
    type: "NEWS",
    typeColor: "blue",
    title: "Completion of Comprehensive Energy Audit for 25+ Industrial Units",
    excerpt:
      "Our accredited auditing team successfully finalized deep-dive electrical and thermal assessments, projecting over 4.2 GWh in cumulative annual energy savings.",
    date: "Oct 14, 2026",
    meta: "Energy Auditing",
    href: "/blog/industrial-boiler-steam-efficiency-ecms",
  },
  {
    id: "ne-3",
    type: "TRAINING",
    typeColor: "amber",
    title: "Hands-on Power Quality Analysis & Harmonic Mitigation Session",
    excerpt:
      "Specialized training module for electrical engineers covering IEEE 519 compliance, active harmonic filter sizing, and power factor penalty prevention.",
    date: "Sep 30, 2026",
    meta: "Technical Workshop",
    href: "/blog/power-quality-harmonics-ieee-519-compliance",
  },
];

export default function HomeNewsEvents() {
  return (
    <section
      id="news-events"
      aria-labelledby="news-events-heading"
      className="relative w-full overflow-hidden bg-slate-50/70 pt-14 pb-18 sm:pt-16 sm:pb-22 lg:pt-20 lg:pb-24 border-t border-slate-200/60"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Green Accent Lines */}
        <div className="flex flex-col items-center text-center">
          {/* Top Badge Flanked by Green Horizontal Lines */}
          <div className="flex items-center gap-3 text-emerald-600" aria-hidden="true">
            <div className="h-[1.5px] w-12 sm:w-16 bg-emerald-600" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              News &amp; Events
            </span>
            <div className="h-[1.5px] w-12 sm:w-16 bg-emerald-600" />
          </div>

          {/* Heading */}
          <h2
            id="news-events-heading"
            className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="text-[#002425]">Recent </span>
            <span className="text-emerald-600">Updates &amp; Insights</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-2.5 max-w-2xl text-pretty text-xs sm:text-sm text-slate-600 leading-relaxed">
            Stay informed about our latest technical seminars, industrial audit breakthroughs,
            accreditation milestones, and upcoming energy efficiency workshops.
          </p>
        </div>

        {/* 3 Teaser Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {NEWS_EVENTS.map((item) => {
            const badgeClasses = {
              emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
              blue: "bg-blue-100 text-blue-800 border-blue-200",
              amber: "bg-amber-100 text-amber-900 border-amber-200",
            }[item.typeColor];

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                {/* Card Top: Category Badge, Date, and Meta */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeClasses}`}
                    >
                      {item.type}
                    </span>

                    {/* Date with calendar icon */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <svg
                        className="h-3.5 w-3.5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Card Content: Title & Excerpt */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    <Link href={item.href} className="focus:outline-none">
                      <span className="absolute inset-0 rounded-3xl" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Card Bottom Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-600 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{item.meta}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors">
                    <span>Read Details</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All News & Events Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-white px-7 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-700 hover:scale-[1.02] active:scale-98"
          >
            <span>View All News &amp; Events</span>
            <svg
              className="h-4 w-4 text-emerald-600 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
