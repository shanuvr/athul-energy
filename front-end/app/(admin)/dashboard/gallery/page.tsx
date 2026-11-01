"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";
import { GALLERY_IMAGES, type GalleryImage } from "@/lib/gallery-data";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newCat, setNewCat] = useState("Energy audits");

  const categories = ["All", "Energy audits", "Training", "Thermography", "Safety audits"];

  const filtered = images.filter((img) => {
    const matchesSearch =
      img.caption.toLowerCase().includes(search.toLowerCase()) ||
      img.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || img.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (src: string) => {
    setImages(images.filter((img) => img.src !== src));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const newImg: GalleryImage = {
      src: "/services/detailed-energy-audit.jpg",
      alt: newCaption,
      caption: newCaption,
      category: newCat,
      width: 1376,
      height: 768,
    };

    setImages([newImg, ...images]);
    setNewCaption("");
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Media &amp; Visual Evidence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Photo Gallery Archive
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Upload and organize field audit photographs, thermal imaging scans, and safety inspection evidence.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Upload Field Photo</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos by caption or discipline..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCat === cat
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((image, idx) => (
          <div
            key={`${image.src}-${idx}`}
            className="group rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo Thumbnail */}
              <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <span className="absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-emerald-300">
                  {image.category}
                </span>
              </div>

              {/* Caption */}
              <div className="p-3.5">
                <p className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {image.caption}
                </p>
                <span className="block mt-1 text-[10px] text-slate-500">
                  {image.width} × {image.height} px
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-3.5 pb-3 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-2">
              <span className="text-[10px]">Published</span>
              <button
                type="button"
                onClick={() => handleDelete(image.src)}
                className="p-1 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Delete photo"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Upload Field Audit Photo</h2>
            <p className="mt-1 text-xs text-slate-400">
              Add photographs from site inspections, thermographic surveys, or training sessions.
            </p>

            <form onSubmit={handleUpload} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Photo Caption *
                </label>
                <input
                  type="text"
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Switchyard Transformer Thermal Hotspot Inspection"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Energy audits">Energy audits</option>
                  <option value="Safety audits">Safety audits</option>
                  <option value="Thermography">Thermography</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div className="rounded-xl border border-dashed border-white/20 bg-slate-950/60 p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                <span className="block text-xs font-semibold text-slate-300">
                  Select JPEG / PNG Photo
                </span>
                <span className="text-[10px] text-slate-500">
                  Standard photo preview automatically assigned
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
