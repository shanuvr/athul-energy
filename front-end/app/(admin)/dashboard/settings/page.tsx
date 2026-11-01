"use client";

import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  CheckCircle2,
  Award,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Security &amp; Statutory Profiles
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Portal &amp; Security Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Manage accredited auditor credentials, two-factor authentication, and statutory agency registration details.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-500/10 p-3.5 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Settings saved successfully. All changes logged under statutory guidelines.</span>
        </div>
      )}

      {/* Auditor Credentials Card */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Lead Accredited Auditor Profile</h2>
            <p className="text-xs text-slate-400">
              Primary identity attached to statutory filings for BEE and EMC Kerala.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Auditor Full Name
              </label>
              <input
                type="text"
                defaultValue="Er. Santhosh A."
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                BEE Accreditation Number
              </label>
              <input
                type="text"
                defaultValue="AEA-0275"
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Official Correspondence Email
              </label>
              <input
                type="email"
                defaultValue="admin@athulenergy.com"
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                GSTIN Number
              </label>
              <input
                type="text"
                defaultValue="32AAOCA8529M1Z6"
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
            >
              Update Auditor Profile
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password Card */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Access Credentials &amp; 2FA</h2>
            <p className="text-xs text-slate-400">
              Update password and ensure two-factor encryption for administrative workstations.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-white/5">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</span>
            <p className="text-[11px] text-slate-400">
              Enforce time-based OTP for statutory audit submissions.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Enabled
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-white/5">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">Session Inactivity Timeout</span>
            <p className="text-[11px] text-slate-400">
              Automatically lock workstation session after 60 minutes of inactivity.
            </p>
          </div>
          <span className="text-xs text-slate-300 font-mono">60 Minutes</span>
        </div>
      </div>
    </div>
  );
}
