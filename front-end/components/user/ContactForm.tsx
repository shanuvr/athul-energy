"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building2,
  Layers,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  MessageCircle,
  MapPin,
  Zap,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { submitInquiry } from "@/lib/inquiry-api";

const labelClass =
  "text-[10.5px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5";

const fieldContainerClass = "relative";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10";

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
    organisation: "",
    location: "",
    load: "",
    interest: "",
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
        company: formData.organisation || undefined,
        location: formData.location || undefined,
        load: formData.load || undefined,
        service: formData.interest || "General Audit Scoping",
        message: formData.message,
        source: "contact-page",
      });

      if (res.success && res.data?.ticketId) {
        setTicketId(res.data.ticketId);
        setSubmitted(true);
      } else {
        throw new Error(res.message || "Failed to submit inquiry");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      // Fallback: If backend is completely unreachable, still enable direct email
      setErrorMsg(
        err.response?.data?.message ||
          err.message ||
          "Could not reach inquiry server. Please email info@athulenergy.com directly."
      );
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
    `Hello Athul Energy Team,\nI have submitted an audit scoping inquiry.\n\n*Ticket ID:* ${ticketId || "Pending"}\n*Name:* ${formData.name || "Client"}\n*Company:* ${formData.organisation || "Not specified"}\n*Service:* ${formData.interest || "Audit Scoping"}\n*Location:* ${formData.location || "Kerala / South India"}\n*Connected Load:* ${formData.load || "—"}\n*Notes:* ${formData.message || "Please provide quotation and scoping schedule."}`
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
      {/* Top Emerald Gradient Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400" />

      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            Priority Plant Audit Desk
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Request an Audit Scoping &amp; Quotation
        </h2>
        <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500">
          Tell us the site, the compliance standard and the timeline. Er. Santhosh A. and our BEE accredited team
          will review your plant specifics and respond with an official scope within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-mono font-bold text-emerald-900">
                Ticket #{ticketId}
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 font-display">
                Inquiry Logged Successfully!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your audit scoping inquiry has been assigned ticket{" "}
                <strong className="text-emerald-800 font-mono">#{ticketId}</strong> and forwarded to our lead engineering auditors.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={copyTicket}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
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
                  organisation: "",
                  location: "",
                  load: "",
                  interest: "",
                  message: "",
                });
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
            >
              ← Submit another plant inquiry
            </button>
          </div>
        </div>
      ) : (
        <form className="mt-6 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold">Submission Notice</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
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
                  placeholder="Rajesh Nair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Work email <span className="text-red-500">*</span>
              </label>
              <div className={fieldContainerClass}>
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone Number */}
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

            {/* Organisation */}
            <div>
              <label htmlFor="organisation" className={labelClass}>
                Organisation / Plant Facility
              </label>
              <div className={fieldContainerClass}>
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  placeholder="Synthite Industries / Apollo Tyres"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Plant Location & Contract Demand */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="location" className={labelClass}>
                Plant Location / District
              </label>
              <div className={fieldContainerClass}>
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Ernakulam / Palakkad / Coimbatore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="load" className={labelClass}>
                Connected Load / Demand (kVA / HT)
              </label>
              <div className={fieldContainerClass}>
                <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="load"
                  name="load"
                  type="text"
                  placeholder="e.g. 1250 kVA · 11 kV HT or 500 kW"
                  value={formData.load}
                  onChange={(e) => setFormData({ ...formData, load: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Service Category */}
          <div>
            <label htmlFor="interest" className={labelClass}>
              Requested Engineering Discipline
            </label>
            <div className={fieldContainerClass}>
              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className={`${inputClass} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-9 cursor-pointer`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">Select an engineering discipline</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.shortTitle}>
                    {category.title} ({category.badge})
                  </option>
                ))}
                <option value="Multi-disciplinary / Statutory Combined Audit">
                  Multi-disciplinary Statutory Combined Audit (BEE + CEA Safety)
                </option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Scope Specifics / Statutory Requirements <span className="text-red-500">*</span>
            </label>
            <div className={fieldContainerClass}>
              <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Mention specific areas: e.g. transformer thermal imaging, harmonics violation penalty, steam boiler efficiency, or statutory compliance deadlines..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 resize-y"
              />
            </div>
          </div>

          {/* Submit & Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-[11px] leading-relaxed text-slate-400">
              Protected under professional Non-Disclosure Agreements (NDA).
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#053824] px-7 text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                  <span>Submitting Scope...</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 text-emerald-400" />
                </>
              )}
            </button>
          </div>

          {/* Trust Badges Footer */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-slate-100 pt-4 text-[10.5px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Strict NDA Confidentiality
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              24h Proposal Turnaround
            </span>
            <span>BEE AEA-0275 Lead Auditor</span>
          </div>
        </form>
      )}
    </div>
  );
}
