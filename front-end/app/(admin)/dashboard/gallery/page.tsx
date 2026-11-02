"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Search,
  Upload,
  Loader2,
  ImageIcon,
  X,
  AlertCircle,
} from "lucide-react";
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

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [newCaption, setNewCaption] = useState("");
  const [newCat, setNewCat] = useState("Energy audits");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch real gallery images from backend
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
        err instanceof Error ? err.message : "Failed to load gallery images";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Filter images by search and category
  const filtered = images.filter((img) => {
    const matchesSearch =
      img.caption?.toLowerCase().includes(search.toLowerCase()) ||
      img.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || img.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false);
    setNewCaption("");
    setNewCat("Energy audits");
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFormError(null);
  };

  // Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFormError("Please select an image file to upload.");
      return;
    }
    if (!newCaption.trim()) {
      setFormError("Please enter an image caption.");
      return;
    }

    try {
      setUploading(true);
      setFormError(null);

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("caption", newCaption.trim());
      formData.append("category", newCat);
      formData.append("alt", newCaption.trim());

      const res = await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success && res.data.data) {
        setImages((prev) => [res.data.data, ...prev]);
        closeModal();
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Upload failed. Please check server connection.";
      setFormError(msg);
    } finally {
      setUploading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) {
      return;
    }

    try {
      await api.delete(`/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err: unknown) {
      alert("Failed to delete image. Please check server connection.");
    }
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
            Upload and curate verified site inspections, infrared thermograms, and field audit photos.
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
            placeholder="Search by caption or category..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
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

      {/* Loading & Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-200 bg-white">
          <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mb-3" />
          <p className="text-xs font-medium text-slate-500">Loading gallery photos from database...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Could not load images from backend: {error}</span>
          </div>
          <button
            onClick={fetchImages}
            className="px-3 py-1 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 bg-white text-center">
          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No gallery photos found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            {search || selectedCat !== "All"
              ? "No photos match your current filter criteria."
              : "No photos have been uploaded yet. Click 'Add Gallery Photo' to upload your first field photo."}
          </p>
          {!search && selectedCat === "All" && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Photo</span>
            </button>
          )}
        </div>
      )}

      {/* Gallery Cards Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={getMediaUrl(img.imageUrl)}
                    alt={img.alt || img.caption}
                    fill
                    unoptimized
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

              <div className="p-3.5 pt-0 flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  {img.createdAt
                    ? new Date(img.createdAt).toLocaleDateString()
                    : ""}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  className="font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="Remove photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Upload Gallery Photo</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add verified site inspections, infrared thermograms, or audit photos.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              {/* Image Picker */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Select Image File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="relative h-40 w-full rounded-2xl border border-slate-200 overflow-hidden group">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity gap-1"
                    >
                      <Upload className="h-4 w-4" /> Change Image
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 flex flex-col items-center justify-center text-slate-500 transition-colors gap-1.5 cursor-pointer"
                  >
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700">
                      Click to choose photo
                    </span>
                    <span className="text-[10px] text-slate-400">
                      PNG, JPG, or WebP up to 10 MB
                    </span>
                  </button>
                )}
              </div>

              {/* Caption */}
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                >
                  <option value="Energy audits">Energy audits</option>
                  <option value="Training">Training</option>
                  <option value="Thermography">Thermography</option>
                  <option value="Safety audits">Safety audits</option>
                  <option value="Power quality">Power quality</option>
                  <option value="Green building">Green building</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={uploading}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Save Photo</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
