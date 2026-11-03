"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/inquiry-api";

export default function HomeCTAForm() {
  const [contactInput, setContactInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setLoading(true);
    try {
      const isEmail = contactInput.includes("@");
      const res = await submitInquiry({
        name: "Homepage Quick Lead",
        email: isEmail
          ? contactInput.trim()
          : `visitor-${Date.now()}@callback.athulenergy.local`,
        phone: !isEmail ? contactInput.trim() : undefined,
        company: "Website Visitor",
        service: "General Audit Scoping Request",
        message: `Quick callback requested via homepage banner for contact: ${contactInput.trim()}`,
        source: "home-cta",
      });

      if (res.data?.ticketId) {
        setTicketId(res.data.ticketId);
      }
      setSubmitted(true);
      setContactInput("");
    } catch (err) {
      console.error("HomeCTA submit error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-900/60 p-4 text-emerald-200 backdrop-blur-md animate-in fade-in duration-300">
        <div className="flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-emerald-300">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Request Received! {ticketId ? `(#${ticketId})` : ""}</span>
        </div>
        <p className="mt-1 text-[11px] sm:text-xs text-emerald-100/80 text-center">
          Our accredited auditor will contact you within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-row items-center gap-1.5 rounded-full bg-white/10 p-1 sm:p-1.5 border border-white/15 backdrop-blur-md"
    >
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          value={contactInput}
          onChange={(e) => setContactInput(e.target.value)}
          placeholder="Enter phone or email"
          aria-label="Phone or email for quick callback"
          required
          className="h-10 sm:h-12 w-full bg-transparent px-3.5 sm:px-5 text-xs sm:text-sm text-white placeholder:text-emerald-100/60 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold text-slate-950 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <span className="sm:hidden">Get Callback</span>
            <span className="hidden sm:inline">Request Callback</span>
          </>
        )}
      </button>
    </form>
  );
}
