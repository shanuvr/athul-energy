"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How quickly can Athul Energy mobilize an audit team to our plant?",
    answer:
      "For urgent statutory deadlines, CEA electrical safety notices, or insurance compliance inspections, we can deploy an accredited engineering team within 48 to 72 hours across Kerala, Tamil Nadu, and Karnataka. Standard comprehensive energy audits are scheduled within 5 to 7 business days following preliminary questionnaire submission.",
  },
  {
    question: "What preliminary documents are needed to prepare a formal technical & commercial proposal?",
    answer:
      "To provide an accurate scope and quotation, we review: (1) Last 12 months' electricity utility bills (showing kVA demand and power factor), (2) Electrical Single Line Diagram (SLD), (3) Connected transformer capacities, and (4) Major thermal fuel consumption logs (diesel, furnace oil, biomass, or LPG).",
  },
  {
    question: "Are your audit reports recognized by BEE and State Designated Agencies (EMC Kerala)?",
    answer:
      "Yes, 100%. Athul Energy Consultants Pvt. Ltd. is an approved energy auditing firm empanelled with Energy Management Centre (EMC) Kerala, Gujarat Energy Development Agency (GEDA), and Maharashtra Energy Development Agency (MEDA). Our lead auditor holds Bureau of Energy Efficiency Accredited Energy Auditor credential (AEA-0275).",
  },
  {
    question: "Do you supply measurement equipment, or does the plant need to provide meters?",
    answer:
      "Our engineers bring our own calibrated, high-precision test instrumentation including Class-A power quality analyzers (Fluke / Hioki), FLIR Level-II infrared thermal imagers, ultrasonic non-invasive flow meters, digital manometers, pitot tubes, flue gas analyzers, and calibrated earth resistance testers.",
  },
  {
    question: "How does Athul Energy handle intellectual property & plant data confidentiality?",
    answer:
      "All client single-line diagrams, production metrics, specific energy consumption (SEC) baselines, and proprietary process layouts are strictly protected under non-disclosure agreements (NDAs) signed before site mobilization.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="h-4 w-4 text-emerald-600" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
          Scoping & Process FAQs
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Frequently Asked Audit Questions
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-500">
        Common queries regarding field measurements, statutory validity, and proposal turnarounds.
      </p>

      <div className="mt-6 space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-emerald-300 bg-emerald-50/20 shadow-2xs"
                  : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] leading-relaxed text-slate-600 border-t border-slate-100/80 mt-1">
                  <p className="pt-2">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
