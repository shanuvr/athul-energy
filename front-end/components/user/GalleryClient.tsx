"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, ImageIcon, AlertCircle } from "lucide-react";
import { api, getMediaUrl } from "@/lib/api";

export interface GalleryItem {
  id: number;
  title?: string;
  caption: string;
  category: string;
  imageUrl: string;
  alt?: string;
  createdAt?: string;
}

const CATEGORIES = [
  "All",
  "Energy audits",
  "Training",
  "Thermography",
  "Safety audits",
  "Power quality",
  "Green building",
];

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState("All");

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/gallery");
      if (res.data?.success) {
        setImages(res.data.data || []);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load gallery photos";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filtered = images.filter((img) => {
    if (selectedCat === "All") return true;
    return img.category?.toLowerCase() === selectedCat.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Page Header */}
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
              {loading ? "Loading..." : `${filtered.length} frames`}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto scrollbar-hide pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-[#053824] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-medium text-slate-500">
              Loading verified field photographs...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-white border border-red-200">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm font-semibold text-slate-800">
              Unable to load gallery photos
            </p>
            <p className="text-xs text-slate-500 mt-1 mb-4">{error}</p>
            <button
              onClick={fetchImages}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-200 bg-white text-center">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No photos found in this category
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm">
              {selectedCat !== "All"
                ? "Try selecting 'All' or check back later for newly added field photos."
                : "Photos uploaded by the admin will appear here."}
            </p>
          </div>
        )}

        {/* Live Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((image, index) => (
              <figure
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={getMediaUrl(image.imageUrl)}
                    alt={image.alt || image.caption}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95"
                />

                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-block rounded-full bg-emerald-500/20 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 border border-emerald-400/30">
                    {image.category}
                  </span>
                  <p className="mt-1.5 text-[13px] font-semibold leading-snug text-white">
                    {image.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

