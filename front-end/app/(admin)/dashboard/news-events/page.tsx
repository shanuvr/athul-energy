"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Search,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

interface NewsItem {
  id: string;
  type: "EVENT" | "NEWS" | "TRAINING";
  title: string;
  excerpt: string;
  date: string;
  meta: string;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "ne-1",
    type: "EVENT",
    title: "Industrial Energy Conservation & BEE Compliance Seminar 2026",
    excerpt:
      "Athul Energy led an intensive technical seminar on ISO 50001 energy management frameworks and thermal efficiency optimization for manufacturing plant heads in Kerala.",
    date: "Oct 28, 2026",
    meta: "Kochi, Kerala",
  },
  {
    id: "ne-2",
    type: "NEWS",
    title: "Completion of Comprehensive Energy Audit for 25+ Industrial Units",
    excerpt:
      "Our accredited auditing team successfully finalized deep-dive electrical and thermal assessments, projecting over 4.2 GWh in cumulative annual energy savings.",
    date: "Oct 14, 2026",
    meta: "Energy Auditing",
  },
  {
    id: "ne-3",
    type: "TRAINING",
    title: "Hands-on Power Quality Analysis & Harmonic Mitigation Session",
    excerpt:
      "Specialized training module for electrical engineers covering IEEE 519 compliance, active harmonic filter sizing, and power factor penalty prevention.",
    date: "Sep 30, 2026",
    meta: "Technical Workshop",
  },
];

export default function AdminNewsEventsPage() {
  const [items, setItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<NewsItem["type"]>("EVENT");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newLocation, setNewLocation] = useState("Thrissur, Kerala");

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      item.meta.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: NewsItem = {
      id: `ne-${Date.now()}`,
      type: newType,
      title: newTitle,
      excerpt: newExcerpt || "Details announced shortly on the website.",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      meta: newLocation,
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setNewExcerpt("");
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Public Newsfeed &amp; Seminars
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            News &amp; Events Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Publish upcoming industrial workshops, regulatory announcements, and field milestones.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Post News / Event</span>
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
            placeholder="Search news by topic, title or location..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 px-2 shrink-0 font-medium">
          Showing <strong>{filtered.length}</strong> published updates
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.type === "EVENT"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : item.type === "NEWS"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  {item.date}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-500" />
                  {item.meta}
                </span>
              </div>

              <h2 className="text-base font-bold text-white hover:text-emerald-300 transition-colors">
                {item.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors"
                title="Delete update"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-7 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Post News or Technical Event</h2>
            <p className="mt-1 text-xs text-slate-400">
              Create an announcement for the home page news and events marquee.
            </p>

            <form onSubmit={handleCreate} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Energy Management Workshop for Food Processing Plants"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) =>
                      setNewType(e.target.value as NewsItem["type"])
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="EVENT">Technical Event / Seminar</option>
                    <option value="NEWS">Press &amp; Audit Milestone</option>
                    <option value="TRAINING">Engineer Training Session</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Summary / Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Key topics, accreditation benefits, or regulatory takeaways..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none resize-y"
                />
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
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
