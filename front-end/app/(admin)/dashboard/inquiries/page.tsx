"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  RefreshCw,
  Trash2,
  Clock,
  CheckCircle2,
  Send,
  AlertCircle,
  Copy,
  Check,
  MessageCircle,
  User,
} from "lucide-react";
import {
  Inquiry,
  InquiryStatus,
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
  fetchInquiryStats,
  InquiryStats,
} from "@/lib/inquiry-api";

const STATUS_OPTIONS: InquiryStatus[] = [
  "Review Pending",
  "Proposal Sent",
  "Scheduled",
  "Completed",
  "Archived",
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    pending: 0,
    proposalSent: 0,
    scheduled: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Notes editing state in modal
  const [editingNotes, setEditingNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [inquiriesRes, statsRes] = await Promise.all([
        fetchInquiries({
          search: search.trim() || undefined,
          status: statusFilter !== "All" ? statusFilter : undefined,
        }),
        fetchInquiryStats().catch(() => ({ data: null })),
      ]);

      if (inquiriesRes.success) {
        setInquiries(inquiriesRes.data || []);
      }
      if (statsRes?.data) {
        setStats(statsRes.data);
      }
    } catch (err: any) {
      console.error("Error loading inquiries:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load inquiries. Ensure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // When an inquiry is opened in modal, sync its internal notes
  useEffect(() => {
    if (selectedInquiry) {
      setEditingNotes(selectedInquiry.notes || "");
    }
  }, [selectedInquiry]);

  const handleStatusChange = async (
    id: number,
    newStatus: InquiryStatus,
    notesToSave?: string
  ) => {
    try {
      const res = await updateInquiryStatus(
        id,
        newStatus,
        notesToSave !== undefined ? notesToSave : selectedInquiry?.notes || undefined
      );
      if (res.success && res.data) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...res.data } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, ...res.data });
        }
        fetchInquiryStats().then((s) => s.data && setStats(s.data)).catch(() => {});
      }
    } catch (err: any) {
      console.error("Failed to update status:", err);
      alert(err.response?.data?.message || "Failed to update inquiry status");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await updateInquiryStatus(
        selectedInquiry.id,
        selectedInquiry.status,
        editingNotes
      );
      if (res.success) {
        setSelectedInquiry((prev) => (prev ? { ...prev, notes: editingNotes } : null));
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === selectedInquiry.id ? { ...item, notes: editingNotes } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteInquiry(id);
      if (res.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        setDeleteConfirmId(null);
        fetchInquiryStats().then((s) => s.data && setStats(s.data)).catch(() => {});
      }
    } catch (err: any) {
      console.error("Failed to delete inquiry:", err);
      alert(err.response?.data?.message || "Failed to delete inquiry");
    }
  };

  const copyTicket = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    setCopiedId(ticket);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadgeClass = (status: InquiryStatus) => {
    switch (status) {
      case "Review Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Proposal Sent":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Scheduled":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Archived":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
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
              Inquiries Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Inquiries &amp; Leads
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Messages and scoping inquiries submitted by clients through your website forms.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => loadData()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Inquiries</span>
            <MessageSquare className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 font-display">
            {stats.total}
          </p>
          <span className="text-[10.5px] text-slate-400">All-time received</span>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
            <span>Review Pending</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-900 font-display">
            {stats.pending}
          </p>
          <span className="text-[10.5px] text-amber-700 font-medium">Requires review</span>
        </div>

        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-blue-800 text-xs font-bold">
            <span>Proposals Sent</span>
            <Send className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-blue-900 font-display">
            {stats.proposalSent}
          </p>
          <span className="text-[10.5px] text-blue-700 font-medium">Responded</span>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span>Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-900 font-display">
            {stats.scheduled + stats.completed}
          </p>
          <span className="text-[10.5px] text-emerald-700 font-medium">Finished / Scheduled</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket ID, client name, email, phone, or message..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {["All", ...STATUS_OPTIONS].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#053824] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Database Notice</p>
            <p className="mt-0.5">{error}</p>
          </div>
          <button
            onClick={loadData}
            className="underline font-bold text-red-800 hover:text-red-950"
          >
            Retry
          </button>
        </div>
      )}

      {/* Inquiries Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <RefreshCw className="h-6 w-6 animate-spin text-emerald-600 mx-auto mb-2" />
                    <span>Loading inquiries from database...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="max-w-sm mx-auto space-y-2">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <p className="font-bold text-slate-700 text-sm">No Inquiries Found</p>
                      <p className="text-xs text-slate-500">
                        {statusFilter !== "All" || search
                          ? "No inquiries matched your search or status filter."
                          : "Your inquiries table is clean. When clients submit inquiries via the contact page or homepage, they will appear here in real time."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Ticket */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-700">
                        <span>{inq.ticketId}</span>
                        <button
                          type="button"
                          onClick={() => copyTicket(inq.ticketId)}
                          title="Copy Ticket ID"
                          className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          {copiedId === inq.ticketId ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {inq.name}
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-slate-600 hover:text-emerald-700 hover:underline flex items-center gap-1.5"
                      >
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{inq.email}</span>
                      </a>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {inq.phone ? (
                        <a
                          href={`tel:${inq.phone}`}
                          className="text-slate-600 hover:text-emerald-700 hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{inq.phone}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Message Preview */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="truncate text-slate-600" title={inq.message}>
                        {inq.message}
                      </p>
                    </td>

                    {/* Received Date */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                      {formatDate(inq.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getStatusBadgeClass(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="rounded-lg bg-slate-100 hover:bg-[#053824] hover:text-white px-2.5 py-1 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(inq.id)}
                        className="rounded-lg p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Review Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl text-slate-900 animate-in zoom-in-95 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3.5 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    {selectedInquiry.ticketId}
                  </span>
                  <span className="text-xs text-slate-400">· {formatDate(selectedInquiry.createdAt)}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Inquiry from {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Contact Details Box */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 mb-4 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2 text-slate-800">
                  <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-bold">{selectedInquiry.name}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="hover:text-emerald-700 hover:underline truncate font-medium"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="hover:text-emerald-700 hover:underline font-medium"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <span>Source:</span>
                  <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {selectedInquiry.source || "contact-page"}
                  </span>
                </div>
              </div>
            </div>

            {/* Client Message */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 mb-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Client Message
              </span>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Internal Auditor Notes */}
            <div className="rounded-xl border border-slate-200 p-3.5 mb-5 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="auditorNotes" className="text-[10.5px] uppercase font-bold text-slate-500">
                  Internal Notes / Follow-up Reference
                </label>
                {savingNotes && (
                  <span className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-1">
                    <RefreshCw className="h-3 w-3 animate-spin" /> Saving...
                  </span>
                )}
              </div>
              <textarea
                id="auditorNotes"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                onBlur={handleSaveNotes}
                rows={2}
                placeholder="Add private notes or quotation reference..."
                className="w-full text-xs rounded-lg border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            {/* Footer Status & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedInquiry.id,
                      e.target.value as InquiryStatus,
                      editingNotes
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedInquiry.name},\nRegarding your Athul Energy inquiry ${selectedInquiry.ticketId}:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Athul Energy — Inquiry ${selectedInquiry.ticketId}`
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Send Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Delete Inquiry</h4>
                <p className="text-xs text-slate-500 mt-0.5">Are you sure you want to delete this inquiry record? This action cannot be undone.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-xl bg-red-600 hover:bg-red-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
