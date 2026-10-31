import Link from "next/link";

const credentials = [
  {
    label: "Statutory empanelment",
    title: "BEE, EMC Kerala, GEDA and MEDA",
    description:
      "Energy audit and related technical work delivered under the empanelment and accreditation requirements of the relevant statutory bodies.",
  },
  {
    label: "Field experience since 2008",
    title: "Industrial, commercial and institutional sites",
    description:
      "A Thrissur-based practice serving organisations that need practical, site-specific audit work.",
  },
  {
    label: "Engineering depth",
    title: "From electrical safety to carbon reporting",
    description:
      "Electrical safety, power quality and harmonics, thermal imaging, green and NAAC audits, environment and carbon studies.",
  },
  {
    label: "Implementation focus",
    title: "Findings, payback and verification",
    description:
      "Clear audit findings, prioritised recommendations, payback analysis and measurement and verification support after implementation.",
  },
];

const proofPoints = [
  { value: "2008", label: "Established in Thrissur", mobileLabel: "Since" },
  { value: "7", label: "Audit and engineering services", mobileLabel: "Services" },
  { value: "4", label: "Statutory empanelments", mobileLabel: "Empanelments" },
];

export default function HomeCredentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="relative isolate overflow-hidden bg-slate-950 text-white"
    >
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

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Credentials
          </span>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.12em] text-slate-400">
            Since 2008
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="credentials-heading"
              className="text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:text-[3.25rem]"
            >
              BEE-accredited energy audit consultants in Kerala since 2008
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[13px] leading-relaxed text-slate-300 sm:text-[15px] lg:text-base">
              Athul Energy Consultants is a Thrissur-based energy audit and
              electrical safety consultancy working with industrial, commercial
              and institutional sites across Kerala. Since 2008, our energy
              auditors in Kerala have supported statutory BEE and EMC Kerala
              compliance, power quality studies, thermal surveys and green
              audits.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-[13px] leading-relaxed text-slate-400 sm:text-[15px] lg:text-base">
              The practice combines field audit work with practical engineering
              support — clear findings, prioritised recommendations, payback
              analysis and measurement and verification after implementation.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/contact"
                className="group inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 text-[13px] font-semibold text-slate-950 shadow-[0_16px_50px_-16px_rgba(16,185,129,0.9)] transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-5 sm:text-sm"
              >
                <span className="sm:hidden">Discuss audit</span>
                <span className="hidden sm:inline">Discuss your site audit</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </Link>
              <Link
                href="/services"
                className="group inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-5 sm:text-sm"
              >
                <span className="sm:hidden">View services</span>
                <span className="hidden sm:inline">Explore audit services</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-emerald-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M8 7h9v9"
                  />
                </svg>
              </Link>
            </div>

            <a
              href="tel:+917356111990"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5.5A2.5 2.5 0 015.5 3h1.6c.5 0 .9.3 1 .8l.9 3a1 1 0 01-.3 1L7.5 9a12 12 0 007.5 7.5l1.2-1.2a1 1 0 011-.3l3 .9c.5.1.8.5.8 1v1.6a2.5 2.5 0 01-2.5 2.5C10.6 21 3 13.4 3 5.5z"
                />
              </svg>
              +91 73561 11990
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:block sm:border-t sm:border-white/10">
              {credentials.map((item, index) => (
                <div
                  key={item.label}
                  className="grid h-full grid-cols-[1fr_auto] content-start gap-x-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[2.5rem_1fr] sm:gap-x-5 sm:gap-y-0 sm:rounded-none sm:border-0 sm:border-b sm:border-white/10 sm:bg-transparent sm:px-0 sm:py-6"
                >
                  <span className="pt-0.5 font-display text-[10px] font-semibold tabular-nums tracking-[0.16em] text-emerald-400 sm:row-span-3 sm:pt-1">
                    0{index + 1}
                  </span>
                  <p className="text-right text-[8px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-emerald-400/90 sm:col-start-2 sm:row-start-1 sm:text-left sm:text-[9.5px] sm:tracking-[0.16em]">
                    {item.label}
                  </p>
                  <h3 className="col-span-2 mt-3 font-display text-[15px] font-semibold leading-snug tracking-tight text-white sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:mt-1.5 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="col-span-2 mt-2 line-clamp-3 max-w-xl text-pretty text-[11px] leading-relaxed text-slate-400 sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:mt-1.5 sm:line-clamp-none sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-10 lg:mt-14">
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="bg-slate-950 px-2 py-3 sm:px-5 sm:py-6"
            >
              <dt className="whitespace-nowrap text-[8px] font-semibold uppercase leading-none tracking-[0.08em] text-slate-400 sm:whitespace-normal sm:text-[9px] sm:leading-normal sm:tracking-[0.14em]">
                <span className="sm:hidden">{point.mobileLabel}</span>
                <span className="hidden sm:inline">{point.label}</span>
              </dt>
              <dd className="mt-1 font-display text-lg font-bold tracking-tight text-white sm:mt-1.5 sm:text-3xl">
                {point.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-slate-200">Head office:</span> Thrissur,
            Kerala
          </p>
          <p>Industrial · Commercial · Institutional</p>
        </div>
      </div>
    </section>
  );
}
