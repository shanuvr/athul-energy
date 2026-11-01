import Link from "next/link";
import HomeTestimonialsTrack, {
  TestimonialItem,
} from "./HomeTestimonialsTrack";

const testimonials: TestimonialItem[] = [
  {
    quote:
      "The audit conducted by M/s Athul Energy Consultants was highly beneficial to us and we found that their team worked professionally to make accurate results and they gave sufficient input to increase efficiency in many sectors of operations.",
    name: "Salil Kumar .G",
    title: "Sr. Manager – Services",
    company: "FCI OEN CONNECTORS",
  },
  {
    quote:
      "Effective interaction, training to staff, professional team with advanced instruments made the energy audit and the report successful.",
    name: "DGM",
    title: "Technical Services",
    company: "",
  },
  {
    quote:
      "We are happy to declare that they had executed the job well to our satisfaction. The team touched all concerned areas of energy losses & gave us a report with accurate quantification. We are happy to recommend M/s Athul Energy to any other firm for a similar works.",
    name: "S. Santhosh Bhatt",
    title: "Sr. Manager Maintenance",
    company: "SUD CHEMIE INDIA PVT LTD.",
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
