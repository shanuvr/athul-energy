import Link from "next/link";
import HomeTestimonialsTrack, {
  TestimonialItem,
} from "./HomeTestimonialsTrack";

const testimonials: TestimonialItem[] = [
  {
    quote:
      "The audit conducted by M/s Athul Energy Consultants was highly beneficial to us. Their accredited engineering team worked with utmost professionalism, producing accurate quantification of energy losses and providing high-ROI recommendations that directly optimized our manufacturing efficiency.",
    name: "Salil Kumar .G",
    title: "Sr. Manager – Services",
    company: "FCI OEN Connectors Ltd.",
  },
  {
    quote:
      "Effective technical interaction, dedicated workforce training, and state-of-the-art calibrated instruments made the mandatory energy and electrical safety audits a resounding success. Their reports provided clear compliance verification under CEA and BEE guidelines.",
    name: "P. R. Mohan",
    title: "Deputy General Manager (Technical Services)",
    company: "Transformers and Electricals Kerala Ltd. (TELK)",
  },
  {
    quote:
      "We are pleased to declare that Athul Energy executed the comprehensive thermal and electrical audit to our complete satisfaction. Their engineers evaluated all operational sectors and provided exact financial payback estimates for each intervention.",
    name: "S. Santhosh Bhatt",
    title: "Sr. Manager – Maintenance Engineering",
    company: "Süd-Chemie India Pvt. Ltd.",
  },
  {
    quote:
      "Athul Energy's power quality and harmonic analysis solved longstanding capacitor-bank tripping issues at our extraction facility. Their IEEE 519 compliance report was exceptionally detailed and practical.",
    name: "K. Radhakrishnan",
    title: "Head of Electrical Infrastructure",
    company: "Synthite Industries Pvt. Ltd.",
  },
];

export default function HomeTestimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-slate-50 overflow-hidden w-full"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="flex items-center justify-between border-b border-slate-300/80 pb-4">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Testimonials
          </span>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.12em] text-slate-400">
            Client feedback
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-4">
            <h2
              id="testimonials-heading"
              className="text-balance font-display text-[1.8rem] font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-[2.5rem] lg:text-[3.25rem]"
            >
              Trusted by industries across Kerala
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-[12.5px] leading-relaxed text-slate-600 sm:mt-5 sm:text-[15px] lg:text-base">
              Our clients value our practical approach, accurate reporting, and
              actionable recommendations that help them meet compliance
              requirements and improve energy efficiency.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 border-b border-slate-900 pb-1 text-[13px] font-semibold text-slate-900 transition-colors duration-200 hover:border-emerald-700 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50 sm:mt-7 sm:text-sm"
            >
              Discuss your project
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <HomeTestimonialsTrack testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
