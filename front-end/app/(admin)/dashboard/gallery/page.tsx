"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Search,
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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Field Evidence Archive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Photo Gallery Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Curate verified site inspections, infrared thermograms, and hands-on training photographs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by caption or industry type..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-slate-900/75 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  {img.category}
                </span>
              </div>

              <div className="p-3.5">
                <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </div>

            <div className="p-3.5 pt-0 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleDelete(img.src)}
                className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                title="Remove photo"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Field Photo</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add verified audit photos or thermal analysis captures.
            </p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Ultrasonic Flow Measurement at Steam Condensate Line"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                >
                  <option value="Energy audits">Energy audits</option>
                  <option value="Training">Training</option>
                  <option value="Thermography">Thermography</option>
                  <option value="Safety audits">Safety audits</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
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
