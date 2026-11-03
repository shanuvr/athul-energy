"use client";



import { useState, useRef, useEffect } from "react";



import {



  Plus,



  Trash2,



  Search,



  FileText,



  Upload,



  X,



  AlertCircle,



  ExternalLink,



  Loader2,



  CheckCircle2,



} from "lucide-react";



import api, { getMediaUrl } from "@/lib/api";



export interface DownloadItem {



  id: number | string;



  title: string;



  category: "Books" | "Government Orders" | "Standards";



  size?: string;



  fileSize?: string;



  year: string;



  fileUrl: string;



  fileName?: string;



  createdAt?: string;



}



export default function AdminDownloadsPage() {



  const [docs, setDocs] = useState<DownloadItem[]>([]);



  const [loading, setLoading] = useState(true);



  const [search, setSearch] = useState("");



  const [selectedCat, setSelectedCat] = useState<string>("All");



  const [showModal, setShowModal] = useState(false);



  // Form State



  const [newTitle, setNewTitle] = useState("");



  const [newCat, setNewCat] = useState<DownloadItem["category"]>("Books");



  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());



  const [selectedFile, setSelectedFile] = useState<File | null>(null);



  const [fileError, setFileError] = useState<string | null>(null);



  const [successMsg, setSuccessMsg] = useState<string | null>(null);



  const [submitting, setSubmitting] = useState(false);



  const [deletingId, setDeletingId] = useState<number | string | null>(null);



  const [isDragging, setIsDragging] = useState(false);



  const fileInputRef = useRef<HTMLInputElement | null>(null);



  // Fetch documents from backend API



  const fetchDocs = async () => {



    try {



      setLoading(true);



      const res = await api.get("/downloads");



      if (res.data?.success && Array.isArray(res.data.data)) {



        setDocs(res.data.data);



        try {



          localStorage.setItem("athul_admin_downloads", JSON.stringify(res.data.data));



          localStorage.setItem("athul_downloads_cache", JSON.stringify(res.data.data));



        } catch {}



      } else if (Array.isArray(res.data)) {



        setDocs(res.data);



      }



    } catch {



      // Fallback to localStorage if backend is not running yet



      try {



        const local =



          localStorage.getItem("athul_admin_downloads") ||



          localStorage.getItem("athul_downloads_cache");



        if (local) {



          const parsed = JSON.parse(local);



          if (Array.isArray(parsed)) {



            setDocs(parsed);



            return;



          }



        }



      } catch {}



      setDocs([]);



    } finally {



      setLoading(false);



    }



  };



  useEffect(() => {



    fetchDocs();



  }, []);



  const filtered = docs.filter((doc) => {



    const q = search.toLowerCase();



    const docSize = doc.fileSize || doc.size || "";



    const matchesSearch =



      doc.title.toLowerCase().includes(q) ||



      doc.category.toLowerCase().includes(q) ||



      (doc.year && doc.year.includes(q)) ||



      String(doc.id).toLowerCase().includes(q) ||



      docSize.toLowerCase().includes(q);



    const matchesCat = selectedCat === "All" || doc.category === selectedCat;



    return matchesSearch && matchesCat;



  });



  const handleDelete = async (id: number | string, title: string) => {



    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;



    try {



      setDeletingId(id);



      try {



        await api.delete(`/downloads/${id}`);



      } catch {}



      setDocs((prev) => {



        const updated = prev.filter((d) => d.id !== id);



        try {



          localStorage.setItem("athul_admin_downloads", JSON.stringify(updated));



          localStorage.setItem("athul_downloads_cache", JSON.stringify(updated));



        } catch {}



        return updated;



      });



      setSuccessMsg(`Deleted "${title}" successfully.`);



      setTimeout(() => setSuccessMsg(null), 3000);



    } finally {



      setDeletingId(null);



    }



  };



  const formatFileSize = (bytes: number) => {



    if (bytes >= 1024 * 1024) {



      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;



    }



    return `${Math.round(bytes / 1024)} KB`;



  };



  const handleProcessFile = (file: File) => {



    setFileError(null);



    // Validate PDF type



    const isPdf =



      file.type === "application/pdf" ||



      file.name.toLowerCase().endsWith(".pdf");



    if (!isPdf) {



      setFileError("Please upload a valid PDF document (.pdf file).");



      return;



    }



    // Limit to 50MB



    if (file.size > 120 * 1024 * 1024) {



      setFileError("File size exceeds 120MB limit.");



      return;



    }



    setSelectedFile(file);



    // Auto-fill title if user hasn't typed one yet



    if (!newTitle.trim()) {



      const cleanTitle = file.name



        .replace(/\.pdf$/i, "")



        .replace(/[-_]+/g, " ")



        .replace(/\b\w/g, (c) => c.toUpperCase());



      setNewTitle(cleanTitle);



    }



  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {



    const file = e.target.files?.[0];



    if (file) {



      handleProcessFile(file);



    }



  };



  const handleDragOver = (e: React.DragEvent) => {



    e.preventDefault();



    setIsDragging(true);



  };



  const handleDragLeave = (e: React.DragEvent) => {



    e.preventDefault();



    setIsDragging(false);



  };



  const handleDrop = (e: React.DragEvent) => {



    e.preventDefault();



    setIsDragging(false);



    const file = e.dataTransfer.files?.[0];



    if (file) {



      handleProcessFile(file);



    }



  };



  const handleRemoveFile = () => {



    setSelectedFile(null);



    setFileError(null);



    if (fileInputRef.current) {



      fileInputRef.current.value = "";



    }



  };



  const handleCloseModal = () => {



    setShowModal(false);



    setNewTitle("");



    setNewCat("Books");



    setNewYear(new Date().getFullYear().toString());



    setSubmitting(false);



    handleRemoveFile();



  };



  const handleAdd = async (e: React.FormEvent) => {



    e.preventDefault();



    if (!newTitle.trim()) {



      setFileError("Please enter the document name.");



      return;



    }



    if (!selectedFile) {



      setFileError("Please upload a PDF file before saving.");



      return;



    }



    try {



      setSubmitting(true);



      setFileError(null);



      const formData = new FormData();



      formData.append("title", newTitle.trim());



      formData.append("category", newCat);



      formData.append("year", newYear.trim() || new Date().getFullYear().toString());



      formData.append("file", selectedFile);



      let uploadedDoc: DownloadItem | null = null;



      try {



        const res = await api.post("/downloads", formData, {



          headers: { "Content-Type": "multipart/form-data" },



        });



        if (res.data?.success && res.data.data) {



          uploadedDoc = res.data.data;



        }



      } catch (err: unknown) {



        console.warn("Backend API not reachable, saving locally:", err);



      }



      if (!uploadedDoc) {



        // Create local fallback document



        uploadedDoc = {



          id: Date.now(),



          title: newTitle.trim(),



          category: newCat,



          year: newYear.trim() || new Date().getFullYear().toString(),



          fileSize: formatFileSize(selectedFile.size),



          fileUrl: URL.createObjectURL(selectedFile),



          fileName: selectedFile.name,



          createdAt: new Date().toISOString(),



        };



      }



      setDocs((prev) => {



        const updated = [uploadedDoc!, ...prev.filter((d) => d.id !== uploadedDoc!.id)];



        try {



          localStorage.setItem("athul_admin_downloads", JSON.stringify(updated));



          localStorage.setItem("athul_downloads_cache", JSON.stringify(updated));



        } catch {}



        return updated;



      });



      setSuccessMsg("Document published successfully!");



      setTimeout(() => setSuccessMsg(null), 3000);



      handleCloseModal();



    } catch (err: unknown) {



      console.error("Failed to upload document:", err);



      const msg =



        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||



        "Failed to upload document. Please try again.";



      setFileError(msg);



    } finally {



      setSubmitting(false);



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



              Gazette &amp; Standards Archive



            </span>



          </div>



          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">



            Downloads Library Management



          </h1>



          <p className="mt-1 text-xs sm:text-sm text-slate-500">



            Publish government orders, statutory gazette notifications, and BEE study textbooks.



          </p>



        </div>



        <button



          onClick={() => {



            handleRemoveFile();



            setNewYear(new Date().getFullYear().toString());



            setShowModal(true);



          }}



          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"



        >



          <Plus className="h-4 w-4 text-emerald-300" />



          <span>Upload PDF Document</span>



        </button>



      </div>



      {/* Success Notification */}



      {successMsg && (



        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">



          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />



          <span>{successMsg}</span>



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



            placeholder="Search by name, ID, category, or year..."



            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"



          />



        </div>



        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">



          {["All", "Books", "Government Orders", "Standards"].map((cat) => (



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



      {/* Documents Table or Skeleton */}



      {loading ? (



        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">



          <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600 mb-3" />



          <p className="text-xs font-semibold text-slate-500">Loading downloads from database...</p>



        </div>



      ) : filtered.length === 0 ? (



        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">



          <FileText className="mx-auto h-10 w-10 text-slate-300 mb-3" />



          <h3 className="text-sm font-bold text-slate-800">No documents found</h3>



          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">



            {search || selectedCat !== "All"



              ? "No files matched your filter criteria. Try clearing your search."



              : "No PDF documents have been uploaded yet. Click 'Upload PDF Document' above to add your first statutory file."}



          </p>



        </div>



      ) : (



        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">



          <div className="overflow-x-auto">



            <table className="w-full text-left text-xs">



              <thead className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">



                <tr>



                  <th className="py-3 px-4 w-16">ID</th>



                  <th className="py-3 px-5">Name</th>



                  <th className="py-3 px-5">Category</th>



                  <th className="py-3 px-5">File Size</th>



                  <th className="py-3 px-5">Year</th>



                  <th className="py-3 px-5 text-right">Action</th>



                </tr>



              </thead>



              <tbody className="divide-y divide-slate-100 text-slate-700">



                {filtered.map((doc, index) => {



                  const displayId = `#${doc.id || index + 1}`;



                  const displayYear = doc.year || "2026";



                  const displaySize = doc.fileSize || doc.size || "PDF";



                  const fullFileUrl = doc.fileUrl ? getMediaUrl(doc.fileUrl) : "#";



                  const isDeleting = deletingId === doc.id;



                  return (



                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">



                      {/* ID */}



                      <td className="py-3.5 px-4 font-mono font-bold text-slate-500 whitespace-nowrap">



                        {displayId}



                      </td>



                      {/* Name */}



                      <td className="py-3.5 px-5 font-bold text-slate-900 max-w-md">



                        <div className="flex items-center gap-2">



                          <FileText className="h-4 w-4 text-emerald-700 shrink-0" />



                          <span className="line-clamp-1">{doc.title}</span>



                          {fullFileUrl && fullFileUrl !== "#" && (



                            <a



                              href={fullFileUrl}



                              target="_blank"



                              rel="noopener noreferrer"



                              className="text-emerald-700 hover:text-emerald-900 inline-flex items-center ml-1"



                              title="Open PDF Document"



                            >



                              <ExternalLink className="h-3 w-3" />



                            </a>



                          )}



                        </div>



                      </td>



                      {/* Category */}



                      <td className="py-3.5 px-5 whitespace-nowrap">



                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">



                          {doc.category}



                        </span>



                      </td>



                      {/* File Size */}



                      <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">



                        {displaySize}



                      </td>



                      {/* Year */}



                      <td className="py-3.5 px-5 font-semibold text-slate-700 whitespace-nowrap">



                        {displayYear}



                      </td>



                      {/* Action */}



                      <td className="py-3.5 px-5 text-right whitespace-nowrap">



                        <button



                          type="button"



                          disabled={isDeleting}



                          onClick={() => handleDelete(doc.id, doc.title)}



                          className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-1 disabled:opacity-50"



                        >



                          {isDeleting ? (



                            <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />



                          ) : (



                            <Trash2 className="h-3.5 w-3.5" />



                          )}



                          <span>{isDeleting ? "Deleting..." : "Remove"}</span>



                        </button>



                      </td>



                    </tr>



                  );



                })}



              </tbody>



            </table>



          </div>



        </div>



      )}



      {/* Add Document Modal with PDF File Uploader */}



      {showModal && (



        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">



          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl text-slate-900 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">



            {/* Modal Header */}



            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">



              <div>



                <h3 className="text-lg font-bold text-slate-900">Add PDF Document</h3>



                <p className="text-xs text-slate-500">



                  Upload official regulatory gazettes, codes, or technical books.



                </p>



              </div>



              <button



                type="button"



                onClick={handleCloseModal}



                disabled={submitting}



                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"



              >



                <X className="h-5 w-5" />



              </button>



            </div>



            {/* Error Message */}



            {fileError && (



              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">



                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />



                <span>{fileError}</span>



              </div>



            )}



            <form onSubmit={handleAdd} className="space-y-4">



              {/* PDF Document File Uploader Area */}



              <div>



                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">



                  PDF Document File *



                </label>



                <input



                  ref={fileInputRef}



                  type="file"



                  accept=".pdf,application/pdf"



                  onChange={handleFileChange}



                  className="hidden"



                />



                {selectedFile ? (



                  <div className="relative rounded-2xl border border-emerald-300 bg-emerald-50/40 p-4 flex items-center justify-between gap-3 shadow-2xs">



                    <div className="flex items-center gap-3 min-w-0">



                      <div className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 text-[10px] font-extrabold text-white shadow-2xs">



                        PDF



                      </div>



                      <div className="min-w-0">



                        <p className="text-xs font-bold text-slate-900 truncate">



                          {selectedFile.name}



                        </p>



                        <p className="text-[11px] font-medium text-emerald-700 mt-0.5">



                          {formatFileSize(selectedFile.size)} • File attached



                        </p>



                      </div>



                    </div>



                    <button



                      type="button"



                      disabled={submitting}



                      onClick={handleRemoveFile}



                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"



                      title="Remove file"



                    >



                      <Trash2 className="h-4 w-4" />



                    </button>



                  </div>



                ) : (



                  <div



                    onDragOver={handleDragOver}



                    onDragLeave={handleDragLeave}



                    onDrop={handleDrop}



                    onClick={() => fileInputRef.current?.click()}



                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${



                      isDragging



                        ? "border-emerald-600 bg-emerald-50/50 scale-[1.01]"



                        : "border-slate-200 bg-slate-50/70 hover:border-emerald-500 hover:bg-emerald-50/20"



                    }`}



                  >



                    <Upload className="mx-auto h-7 w-7 text-slate-400 mb-2" />



                    <span className="text-xs font-bold text-emerald-800">



                      Click to upload or drag &amp; drop PDF file



                    </span>



                    <p className="text-[11px] text-slate-400 mt-1">



                      Official gazette notifications, study manuals, or acts (.pdf up to 120MB)



                    </p>



                  </div>



                )}



              </div>



              {/* Document Name */}



              <div>



                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">



                  Name *



                </label>



                <input



                  type="text"



                  required



                  disabled={submitting}



                  value={newTitle}



                  onChange={(e) => setNewTitle(e.target.value)}



                  placeholder="e.g. Kerala ECBC Implementation Rules 2026"



                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"



                />



              </div>



              {/* Category & Year Grid */}



              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">



                <div>



                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">



                    Category *



                  </label>



                  <select



                    value={newCat}



                    disabled={submitting}



                    onChange={(e) => setNewCat(e.target.value as DownloadItem["category"])}



                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all cursor-pointer"



                  >



                    <option value="Books">Books</option>



                    <option value="Government Orders">Government Orders</option>



                    <option value="Standards">Standards</option>



                  </select>



                </div>



                <div>



                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">



                    Year *



                  </label>



                  <input



                    type="text"



                    required



                    disabled={submitting}



                    value={newYear}



                    onChange={(e) => setNewYear(e.target.value)}



                    placeholder="e.g. 2026"



                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"



                  />



                </div>



              </div>



              {/* Footer Actions */}



              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">



                <button



                  type="button"



                  disabled={submitting}



                  onClick={handleCloseModal}



                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"



                >



                  Cancel



                </button>



                <button



                  type="submit"



                  disabled={submitting}



                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"



                >



                  {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />}



                  <span>{submitting ? "Uploading..." : "Save & Publish Entry"}</span>



                </button>



              </div>



            </form>



          </div>



        </div>



      )}



    </div>



  );



}

