export interface AboutProofPoint {
  value: string;
  label: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutDiscipline {
  title: string;
  description: string;
  href: string;
}

export const ABOUT_PROOF_POINTS: AboutProofPoint[] = [
  { value: "2008", label: "Established in Thrissur" },
  { value: "1,000+", label: "Audits delivered" },
  { value: "30", label: "Audit disciplines" },
  { value: "15+", label: "Field specialists" },
];

export const ABOUT_STORY = {
  heading: "A Thrissur practice built on measured evidence",
  paragraphs: [
    "Athul Energy Consultants was founded in Thrissur in 2008 to give industrial and institutional clients something the market rarely offered: energy audit findings that were measured on site, documented to statutory standards, and practical enough to implement.",
    "Since then the practice has grown into a multidisciplinary engineering firm serving Designated Consumers, continuous process plants, hospitals, commercial buildings and academic institutions across Kerala and the southern industrial corridor.",
    "Our work sits at the intersection of energy conservation and electrical safety. Every engagement combines calibrated field instrumentation, verified operating data and clear engineering judgement — so savings are never claimed at the expense of safety or uptime.",
  ],
  quote:
    "An audit is only useful when the findings can be implemented. We measure on site, verify the numbers, and stay through implementation.",
  quoteAttribution: "Santhosh A.",
  quoteRole: "Founder & Lead Accredited Energy Auditor (BEE AEA-0275)",
};

export const ABOUT_VISION_MISSION = {
  vision: {
    number: "01",
    label: "Vision",
    statement:
      "To be Kerala's most trusted energy engineering practice — where statutory compliance, operational efficiency and electrical safety are delivered as one measurable outcome.",
  },
  mission: {
    number: "02",
    label: "Mission",
    statement:
      "To give every industrial, commercial and institutional client clear, evidence-based audit findings, prioritised recommendations and verified savings — without compromising safety or site availability.",
  },
};

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: "Evidence before opinion",
    description:
      "Calibrated instruments, measured operating data and traceable calculations underpin every recommendation we make.",
  },
  {
    title: "Statutory rigour",
    description:
      "BEE, EMC Kerala and CEA requirements are treated as the floor of our work, not the ceiling.",
  },
  {
    title: "Implementation over paperwork",
    description:
      "Recommendations are ranked by payback, with measurement and verification support after implementation.",
  },
  {
    title: "Safety and sustainability together",
    description:
      "Energy savings are never pursued at the cost of electrical safety, equipment reliability or compliance.",
  },
];

export const ABOUT_TIMELINE: AboutTimelineItem[] = [
  {
    year: "2008",
    title: "Founded in Thrissur",
    description:
      "The practice opens with a focus on industrial energy audits and electrical safety inspections.",
  },
  {
    year: "2010s",
    title: "National accreditation",
    description:
      "BEE Accredited Energy Auditor status (AEA-0275 / EmAEA 091) and EMC Kerala empanelment follow.",
  },
  {
    year: "Expansion",
    title: "Multi-state empanelment",
    description:
      "GEDA and MEDA approvals extend the practice across Gujarat, Maharashtra and southern industrial corridors.",
  },
  {
    year: "Today",
    title: "30 disciplines, one team",
    description:
      "15+ specialists deliver 1,000+ audits across energy, safety, thermography, green building and training.",
  },
];

export const ABOUT_DISCIPLINES: AboutDiscipline[] = [
  {
    title: "Energy Audits & PAT M&V",
    description:
      "Detailed electrical and thermal audits, SEC benchmarking and Designated Consumer verification.",
    href: "/services?cat=energy-audits",
  },
  {
    title: "Electrical Safety & CEA",
    description:
      "CEA Regulations 2010 compliance, arc flash studies, relay coordination and IS 3043 earthing tests.",
    href: "/services?cat=safety-audits",
  },
  {
    title: "Thermography & Surveys",
    description:
      "FLIR Level-II infrared scanning, ultrasonic flow measurement and power quality diagnostics.",
    href: "/services?cat=surveys-thermography",
  },
  {
    title: "Compliance, Green & NAAC",
    description:
      "GRIHA and IGBC audits, NAAC Criteria 7, NABH hospital safety and ISO 50001 consultancy.",
    href: "/services?cat=compliance-studies",
  },
  {
    title: "Technical Training",
    description:
      "BEE examination coaching, industrial electrical safety programmes and LOTO workshops.",
    href: "/services?cat=training",
  },
];

export const ABOUT_EMPANELMENTS = [
  { mark: "BEE", label: "Bureau of Energy Efficiency" },
  { mark: "EMC", label: "Kerala State Designated Agency" },
  { mark: "GEDA", label: "Gujarat Energy Development Agency" },
  { mark: "MEDA", label: "Maharashtra Energy Development Agency" },
  { mark: "CEA", label: "Central Electricity Authority standards" },
];
