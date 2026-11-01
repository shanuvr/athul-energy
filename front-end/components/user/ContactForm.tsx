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
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

const labelClass =
  "text-[10.5px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5";

const fieldContainerClass = "relative";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    interest: "",
    message: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setFormData({ name, email, phone, organisation, interest, message });

    const subject = encodeURIComponent(
      `Audit enquiry — ${organisation || name || "Website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Organisation: ${organisation || "—"}`,
        `Interest: ${interest || "—"}`,
        "",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:info@athulenergy.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Athul Energy Team,\nI would like to scope an audit.\n\n*Name:* ${formData.name || "Client"}\n*Company:* ${formData.organisation || "Not specified"}\n*Interest:* ${formData.interest || "Audit Scoping"}\n*Phone:* ${formData.phone || "—"}\n*Message:* ${formData.message || "Please provide quotation."}`
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
          Send an enquiry
        </h2>
        <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500">
          Tell us the site, the standard and the timeline. An accredited engineer
          will review your plant specifics and respond with the right scope.
        </p>
      </div>

      <form className="mt-6 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
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
                className={inputClass}
              />
            </div>
          </div>

          {/* Organisation */}
          <div>
            <label htmlFor="organisation" className={labelClass}>
              Organisation / Facility
            </label>
            <div className={fieldContainerClass}>
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="organisation"
                name="organisation"
                type="text"
                autoComplete="organization"
                placeholder="Plant / institution / company"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="interest" className={labelClass}>
            What do you need?
          </label>
          <div className={fieldContainerClass}>
            <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              id="interest"
              name="interest"
              defaultValue=""
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
              <option value="Something else">Something else / Multi-disciplinary Audit</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message <span className="text-red-500">*</span>
          </label>
          <div className={fieldContainerClass}>
            <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Site type, connected load (kVA), location, or statutory deadline..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 resize-y"
            />
          </div>
        </div>

        {/* Submit & Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <p className="text-[11px] leading-relaxed text-slate-400">
            Protected by professional NDA. Details pre-filled into your email.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="submit"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#053824] px-6 text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer"
            >
              <span>Send enquiry</span>
              <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {submitted && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <p className="font-bold">Your email app has been opened with your inquiry.</p>
                <p className="mt-1 text-slate-600">
                  If your mail app did not launch, email us directly at{" "}
                  <a
                    href="mailto:info@athulenergy.com"
                    className="font-bold text-emerald-800 underline underline-offset-2"
                  >
                    info@athulenergy.com
                  </a>
                  .
                </p>
                <div className="mt-3">
                  <a
                    href={`https://wa.me/917356111990?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#20ba5a] transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Also Send to WhatsApp (+91 73561 11990)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges Footer */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-slate-100 pt-4 text-[10.5px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Strict NDA Confidentiality
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            24h Proposal SLA
          </span>
          <span>BEE AEA-0275 Lead Auditor</span>
        </div>
      </form>
    </div>
  );
}
