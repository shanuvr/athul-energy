import type { Metadata } from "next";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Gallery | Athul Energy Consultants",
  description:
    "Field photographs from Athul Energy Consultants — energy audits, thermal surveys, electrical safety inspections and technical training across Kerala.",
  keywords: [
    "Athul Energy gallery",
    "Energy audit field work",
    "Thermal imaging survey Kerala",
    "Electrical safety inspection",
    "BEE energy auditor training",
  ],
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      <section className="border-b border-slate-200 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Field archive
              </p>
              <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                From the field
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                Audits, thermal surveys, safety inspections and training
                sessions from industrial, commercial and institutional sites
                across Kerala and beyond.
              </p>
            </div>
            <p className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {GALLERY_IMAGES.length} frames
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((image, index) => (
            <figure
              key={image.src}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                priority={index < 3}
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90"
              />

              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  {image.category}
                </span>
                <p className="mt-1 text-[13px] font-medium leading-snug text-white">
                  {image.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
