"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Search,
  Upload,
  X,
  AlertCircle,
  Loader2,
  Building2,
} from "lucide-react";
import api, { getMediaUrl } from "@/lib/api";

interface ClientItem {
  id: number | string;
  name: string;
  logoUrl: string;
  order?: number;
  createdAt?: string;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/clients");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setClients(res.data.data);
      } else if (Array.isArray(res.data)) {
        setClients(res.data);
      }
    } catch (err: unknown) {
      console.error("Failed to load clients:", err);
      setErrorMsg("Failed to load client logos from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
      setErrorMsg("Please upload a valid image file (PNG, WEBP, SVG, or JPG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit.");
      return;
    }

    setErrorMsg(null);
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleResetModal = () => {
    setShowAddModal(false);
    setNewClientName("");
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    setErrorMsg(null);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      setErrorMsg("Please enter the client company name.");
      return;
    }
    if (!selectedFile) {
      setErrorMsg("Please upload a logo image file.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const formData = new FormData();
      formData.append("name", newClientName.trim());
      formData.append("logo", selectedFile);

      const res = await api.post("/clients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success && res.data.data) {
        setClients((prev) => [...prev, res.data.data]);
        setSuccessMsg(`"${newClientName}" added to client marquee successfully.`);
        setTimeout(() => setSuccessMsg(null), 4000);
        handleResetModal();
      } else {
        throw new Error(res.data?.message || "Failed to add client logo");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setErrorMsg(
        error.response?.data?.message || error.message || "Failed to upload client logo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the logo for "${name}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
      setSuccessMsg(`Logo for "${name}" removed successfully.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove client logo."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Homepage Carousel &amp; Partners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Our Clients Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Upload partner logos and manage the client marquee displayed on the public homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Add Client Logo</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {errorMsg && !showAddModal && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs sm:text-sm text-red-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-600 hover:text-red-900">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients by company name..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 px-2 shrink-0 font-medium">
          Showing <strong className="text-slate-800">{filtered.length}</strong> active client logos
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-xs text-slate-500">Loading client logos from database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-center p-6">
          <Building2 className="h-10 w-10 text-slate-300 mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No client logos found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {search
              ? "No companies matched your search filter."
              : "No client logos added yet. Click 'Add Client Logo' to upload."}
          </p>
        </div>
      ) : (
        /* Clients Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((c) => {
            const logoSrc = getMediaUrl(c.logoUrl);
            const isDeleting = deletingId === c.id;

            return (
              <div
                key={c.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Logo Preview Area */}
                  <div className="relative h-24 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-center p-3 mb-3 group-hover:bg-white transition-colors">
                    <Image
                      src={logoSrc}
                      alt={c.name}
                      width={220}
                      height={90}
                      unoptimized
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  <h2 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {c.name}
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>ID #{c.id}</span>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => handleDelete(c.id, c.name)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
                    title="Remove client logo"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    <span>{isDeleting ? "Removing..." : "Remove"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add Client Logo</h3>
                <p className="text-xs text-slate-500">
                  Upload an image logo to display on the homepage marquee.
                </p>
              </div>
              <button
                onClick={handleResetModal}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddClient} className="space-y-4">
              {/* Company Legal Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Cochin Shipyard Ltd."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
                />
              </div>

              {/* Logo File Uploader */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Logo Image (PNG, WEBP, SVG, JPG) *
                </label>

                {filePreview ? (
                  <div className="relative rounded-2xl border border-emerald-300 bg-emerald-50/30 p-4 flex flex-col items-center justify-center">
                    <div className="relative h-24 w-full flex items-center justify-center">
                      <Image
                        src={filePreview}
                        alt="Logo preview"
                        width={200}
                        height={80}
                        unoptimized
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-medium text-slate-600 truncate max-w-full">
                      {selectedFile?.name} ({(selectedFile ? selectedFile.size / 1024 : 0).toFixed(1)} KB)
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        URL.revokeObjectURL(filePreview);
                        setFilePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Remove &amp; Choose Another</span>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-6 text-center hover:border-emerald-500 hover:bg-emerald-50/20 transition-all"
                  >
                    <Upload className="mx-auto h-7 w-7 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-emerald-800">
                      Click to upload logo file
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      PNG, WEBP, SVG, JPG up to 10MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/webp, image/svg+xml, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleResetModal}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !newClientName.trim() || !selectedFile}
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Save Logo</span>
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
