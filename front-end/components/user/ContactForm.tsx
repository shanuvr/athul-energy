"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  MessageCircle,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry-api";

const labelClass =
  "text-[10.5px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1";

const fieldContainerClass = "relative";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/10";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        service: "General Audit Scoping",
        message: formData.message,
        source: "contact-page",
      });

      if (res.success && res.data?.ticketId) {
        setTicketId(res.data.ticketId);
        setSubmitted(true);
      } else {
        throw new Error(res.message || "Failed to submit inquiry");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Could not reach inquiry server. Please email info@athulenergy.com directly.";
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  }

  const copyTicket = () => {
    if (!ticketId) return;
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Athul Energy Team,\nI have submitted an inquiry via your website.\n\n*Ticket ID:* ${ticketId || "Pending"}\n*Name:* ${formData.name || "Client"}\n*Email:* ${formData.email || "—"}\n*Phone:* ${formData.phone || "—"}\n*Message:* ${formData.message || "Please provide quotation."}`
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
      {/* Top Emerald Gradient Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400" />

      {/* Header */}
      <div className="border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            Priority Audit Desk
          </span>
        </div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          Send an enquiry
        </h2>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          Tell us what you need and our accredited engineering auditors will review your requirements and respond promptly.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-900">
                Ticket #{ticketId}
              </span>
              <h3 className="mt-1.5 text-lg sm:text-xl font-black text-slate-900 font-display">
                Inquiry Logged Successfully!
              </h3>
              <p className="mt-1 text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your inquiry has been assigned ticket{" "}
                <strong className="text-emerald-800 font-mono">#{ticketId}</strong> and forwarded to our lead engineering auditors.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={copyTicket}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy Ticket ID</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/917356111990?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Follow up on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                });
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
            >
              ← Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form className="mt-4 space-y-3.5" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold">Submission Notice</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </label>
            <div className={fieldContainerClass}>
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Rajesh Nair"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Work Email & Phone / WhatsApp side-by-side */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <div className={fieldContainerClass}>
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="e.g. you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone / WhatsApp
              </label>
              <div className={fieldContainerClass}>
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Message <span className="text-red-500">*</span>
            </label>
            <div className={fieldContainerClass}>
              <MessageSquare className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                placeholder="Tell us about your requirements, facility, or query..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/10 resize-y"
              />
            </div>
          </div>

          {/* Submit Button Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
            <p className="text-[11px] leading-tight text-slate-400">
              Protected under professional NDA.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#053824] px-6 text-xs font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-300" />
                  <span>Sending Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Send enquiry</span>
                  <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-emerald-400" />
                </>
              )}
            </button>
          </div>

          {/* Trust Badges Footer */}
          <div className="flex flex-wrap items-center justify-between gap-y-1.5 border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Strict NDA Confidentiality
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              24h Response SLA
            </span>
            <span>BEE AEA-0275 Lead Auditor</span>
          </div>
        </form>
      )}
    </div>
  );
}
