"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Plus,
  Upload,
  Trash2,
  Edit2,
  CheckCircle2,
  Search,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  category: "Chemical" | "Manufacturing" | "Automotive" | "Healthcare" | "Textile" | "Institutions";
  logo: string;
  auditsCompleted: number;
}

const INITIAL_CLIENTS: ClientItem[] = [
  { id: "c1", name: "Sud-Chemie India Pvt. Ltd.", category: "Chemical", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=SUD-CHEMIE&font=inter", auditsCompleted: 4 },
  { id: "c2", name: "FCI OEN Connectors Ltd.", category: "Manufacturing", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=FCI+OEN&font=inter", auditsCompleted: 3 },
  { id: "c3", name: "Carborundum Universal Ltd.", category: "Manufacturing", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=CARBORUNDUM&font=inter", auditsCompleted: 5 },
  { id: "c4", name: "Apollo Tyres Ltd.", category: "Automotive", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=APOLLO+TYRES&font=inter", auditsCompleted: 2 },
  { id: "c5", name: "Synthite Industries Pvt. Ltd.", category: "Chemical", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=SYNTHITE&font=inter", auditsCompleted: 6 },
  { id: "c6", name: "Arjuna Natural Pvt. Ltd.", category: "Chemical", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=ARJUNA+NATURAL&font=inter", auditsCompleted: 3 },
  { id: "c7", name: "Aster Medcity Healthcare", category: "Healthcare", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=ASTER+MEDCITY&font=inter", auditsCompleted: 4 },
  { id: "c8", name: "Kitex Garments Ltd.", category: "Textile", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=KITEX&font=inter", auditsCompleted: 3 },
  { id: "c9", name: "St. Thomas College Autonomous", category: "Institutions", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=ST+THOMAS&font=inter", auditsCompleted: 2 },
  { id: "c10", name: "Nitta Gelatin India Ltd.", category: "Chemical", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=NITTA+GELATIN&font=inter", auditsCompleted: 4 },
  { id: "c11", name: "Western India Plywoods Ltd.", category: "Manufacturing", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=WIP+PLYWOODS&font=inter", auditsCompleted: 3 },
  { id: "c12", name: "GTCS Engineering Systems", category: "Manufacturing", logo: "https://placehold.co/220x90/0f172a/38ef7d?text=GTCS+SYSTEMS&font=inter", auditsCompleted: 2 },
];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientCat, setNewClientCat] = useState<ClientItem["category"]>("Manufacturing");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newLogo: ClientItem = {
      id: `c-${Date.now()}`,
      name: newClientName,
      category: newClientCat,
      logo: `https://placehold.co/220x90/0f172a/38ef7d?text=${encodeURIComponent(
        newClientName.toUpperCase()
      )}&font=inter`,
      auditsCompleted: 1,
    };

    setClients([newLogo, ...clients]);
    setNewClientName("");
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Homepage Carousel &amp; Partners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Our Clients Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Upload partner logos and manage the client marquee displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Add Client Logo</span>
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
            placeholder="Search clients by company name or sector..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 px-2 shrink-0 font-medium">
          Showing <strong>{filtered.length}</strong> active client logos
        </div>
      </div>

      {/* Clients Logo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Logo Preview Container */}
              <div className="relative h-20 w-full rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center p-2 mb-3 overflow-hidden">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={180}
                  height={60}
                  className="max-h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>

              {/* Client Info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xs font-bold text-white leading-snug line-clamp-1">
                    {client.name}
                  </h2>
                  <span className="inline-block mt-1 rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    {client.category}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 shrink-0 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {client.auditsCompleted} Audits
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] text-slate-500">Live on Home</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDelete(client.id)}
                  className="p-1 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  title="Remove client"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Add New Client Partner</h2>
            <p className="mt-1 text-xs text-slate-400">
              Enter industrial client name to generate brand logo tile for the homepage marquee.
            </p>

            <form onSubmit={handleAddClient} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Company / Factory Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Apollo Tyres / Sud-Chemie"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Industrial Sector
                </label>
                <select
                  value={newClientCat}
                  onChange={(e) =>
                    setNewClientCat(e.target.value as ClientItem["category"])
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Chemical">Chemical &amp; Petrochemicals</option>
                  <option value="Automotive">Automotive &amp; Tyres</option>
                  <option value="Healthcare">Healthcare &amp; Hospitals</option>
                  <option value="Textile">Textiles &amp; Garments</option>
                  <option value="Institutions">Institutions &amp; Universities</option>
                </select>
              </div>

              <div className="rounded-xl border border-dashed border-white/20 bg-slate-950/60 p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                <span className="block text-xs font-semibold text-slate-300">
                  Logo Image (PNG / SVG)
                </span>
                <span className="text-[10px] text-slate-500">
                  Mockup logo automatically generated for demonstration
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
