export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "leadership" | "energy-audits" | "bee-experts" | "operations";
  departmentLabel: string;
  qualification: string;
  function: string;
  experienceYears: number;
  badge?: string;
  image?: string;
  certifications: string[];
  featured?: boolean;
  sector?: string;
}

export interface TeamDepartment {
  id: TeamMember["department"] | "all";
  label: string;
  shortLabel: string;
}

export const TEAM_DEPARTMENTS: TeamDepartment[] = [
  { id: "all", label: "All Specialists", shortLabel: "All" },
  { id: "leadership", label: "Leadership & Senior Auditors", shortLabel: "Leadership" },
  { id: "energy-audits", label: "Project Engineers & Auditors", shortLabel: "Audit Engineers" },
  { id: "bee-experts", label: "BEE Sector Empaneled Experts", shortLabel: "BEE Empaneled Experts" },
  { id: "operations", label: "Operations & Administration", shortLabel: "Operations" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  // ==========================================
  // 1. Executive Leadership & Senior Auditors
  // ==========================================
  {
    id: "santhosh-a",
    name: "Er. Santhosh A.",
    role: "Managing Director & Accredited Energy Auditor",
    department: "leadership",
    departmentLabel: "Executive Leadership",
    qualification: "B-Tech (Mech)., MBA & PG Diploma in Energy Management, ISO 14064 GHG Accounting Lead Verifier",
    function: "20 years of experience in Industry, 16 years in energy audit. Leads overall technical direction, BEE statutory sign-offs, and industrial plant audit governance.",
    experienceYears: 20,
    badge: "BEE AEA-0275",
    image: "/team/santhosh-a.webp",
    certifications: [
      "Accredited Energy Auditor (AEA 0275)",
      "ISO 14064 GHG Lead Verifier",
      "PG Diploma in Energy Management",
    ],
    featured: true,
  },
  {
    id: "ashok-kmp",
    name: "Er. Ashok K. M. P.",
    role: "Project Director & BEE Certified Energy Auditor",
    department: "leadership",
    departmentLabel: "Executive Leadership",
    qualification: "M-Tech in Energy Engineering, PG Diploma in Environment & Sustainable Development, ISO 14064 GHG Lead Verifier",
    function: "14 years in Energy and Electrical safety audit. GRIHA CP and ANERT Approved Solar power plant Inspector.",
    experienceYears: 14,
    badge: "BEE EA-34760/22",
    image: "/team/ashok-kmp.webp",
    certifications: [
      "BEE Certified Energy Auditor (EA-34760/22)",
      "GRIHA Certified Professional (GRIHA CP)",
      "ANERT Approved Solar Inspector",
      "ISO 14064 GHG Verifier",
    ],
    featured: true,
  },
  {
    id: "della-david",
    name: "Della David",
    role: "Consultant & BEE Certified Energy Auditor",
    department: "leadership",
    departmentLabel: "Consultant & Auditor",
    qualification: "M-Tech Power Electronics, ISO 14064 GHG Accounting Lead Verifier, IGBC AP, Certified Water Auditor",
    function: "13 years as Asst. Professor and 5 years in Energy and Electrical safety audit. Specialized in power electronics, water auditing, and GHG accounting.",
    experienceYears: 13,
    badge: "BEE EA-34867/22",
    image: "/team/della-david.webp",
    certifications: [
      "BEE Certified Energy Auditor (EA-34867/22)",
      "ISO 14064 GHG Lead Verifier",
      "IGBC Accredited Professional",
      "Certified Water Auditor (IPA)",
    ],
    featured: true,
  },

  // ==========================================
  // 2. Project Engineers & Energy Managers
  // ==========================================
  {
    id: "jaideep-pp",
    name: "Jaideep P. P.",
    role: "Sr. Project Engineer & BEE Certified Energy Manager",
    department: "energy-audits",
    departmentLabel: "Project Engineering",
    qualification: "B-Tech Electrical, M-Tech Energy Engineering",
    function: "12 years in Energy and electrical safety Audit. Specializes in HT/LT distribution networks, power quality analysis, and motor load optimization.",
    experienceYears: 12,
    badge: "BEE EM-1664/23",
    image: "/team/jaideep-pp.webp",
    certifications: [
      "BEE Certified Energy Manager (EM-1664/23)",
      "M-Tech Energy Engineering",
      "Electrical Safety Specialist",
    ],
  },
  {
    id: "harikrishnan-k",
    name: "Harikrishnan K.",
    role: "Project Engineer & BEE Certified Energy Auditor",
    department: "energy-audits",
    departmentLabel: "Project Engineering",
    qualification: "B-Tech in Production, Diploma in Petrochemical, IGBC AP, Certified Water Auditor (IPA)",
    function: "05 years in Energy and electrical safety Audit. Expert in petrochemical process systems, green building compliance, and comprehensive water audits.",
    experienceYears: 5,
    badge: "BEE EA-35356/24",
    image: "/team/harikrishnan-k.webp",
    certifications: [
      "BEE Certified Energy Auditor (EA-35356/24)",
      "IGBC Accredited Professional",
      "Certified Water Auditor (IPA)",
      "Petrochemical Specialist",
    ],
  },
  {
    id: "keerthana-k",
    name: "Keerthana K.",
    role: "Project Engineer & BEE Certified Energy Manager",
    department: "energy-audits",
    departmentLabel: "Project Engineering",
    qualification: "B-Tech in Electrical, EMC Certified Home Auditor",
    function: "04 years in Energy and electrical safety audit. Focuses on commercial lighting, building energy audits, and domestic energy compliance.",
    experienceYears: 4,
    badge: "BEE EM-11843/24",
    image: "",
    certifications: [
      "BEE Certified Energy Manager (EM-11843/24)",
      "EMC Certified Home Auditor",
      "Electrical Safety Inspector",
    ],
  },
  {
    id: "neema-joy-p",
    name: "Neema Joy P.",
    role: "Project Engineer & BEE Certified Energy Manager",
    department: "energy-audits",
    departmentLabel: "Project Engineering",
    qualification: "B-Tech in Electrical",
    function: "03 years in Energy and electrical safety audit. Electrical measurements, harmonic studies, and energy conservation measures (ECMs) for industrial sites.",
    experienceYears: 3,
    badge: "BEE EM-12029/25",
    image: "/team/neema-joy-p.webp",
    certifications: [
      "BEE Certified Energy Manager (EM-12029/25)",
      "Energy & Safety Auditor",
    ],
  },
  {
    id: "jijiraj-k-r",
    name: "Jijiraj K. R.",
    role: "Administrative Manager",
    department: "operations",
    departmentLabel: "Operations & Admin",
    qualification: "B-Tech in Electronics & Communication, EMC Certified Home Auditor",
    function: "10 years in Energy and electrical safety audit and operational coordination. Oversees field audit logistics, instrument dispatch, and client operations.",
    experienceYears: 10,
    badge: "EMC Certified",
    image: "/team/jijiraj-k-r.webp",
    certifications: [
      "EMC Certified Home Auditor",
      "B-Tech ECE",
      "Operations Coordinator",
    ],
  },

  // ==========================================
  // 3. Sector Empaneled with BEE (Advisors & Specialists)
  // ==========================================
  {
    id: "chillayil-jayaraman",
    name: "Mr. Chillayil Jayaraman",
    role: "BEE Empaneled Sector Expert – Refinery",
    department: "bee-experts",
    departmentLabel: "BEE Empaneled Expert",
    sector: "Refinery",
    qualification: "B-Tech (Electrical Engineering), Fulbright Scholar at Lawrence Berkeley National Lab, California",
    function: "24 years' experience in Refinery sector. Fulbright Scholar under Fulbright-Nehru Environmental Leadership program-2010. Empaneled expert with BEE for petroleum refinery audits.",
    experienceYears: 24,
    badge: "BEE EA-926 · Refinery",
    image: "/team/chillayil-jayaraman.webp",
    certifications: [
      "BEE Empaneled Expert (Refinery)",
      "Fulbright Scholar (LBNL California)",
      "BEE Certified Energy Auditor (EA-926)",
    ],
    featured: true,
  },
  {
    id: "gayathri-nair-r",
    name: "Ms. Gayathri Nair R.",
    role: "BEE Empaneled Sector Expert – DISCOM",
    department: "bee-experts",
    departmentLabel: "BEE Empaneled Expert",
    sector: "DISCOM",
    qualification: "B.E. (Electrical Engineering), Retired Chief Engineer (Commercial & Tariff), KSEB Limited",
    function: "28 years' experience in KSEB Limited (DISCOM). Expert in electricity distribution networks, commercial tariff structuring, open access, and grid regulations.",
    experienceYears: 28,
    badge: "BEE EA-5918 · DISCOM",
    image: "/team/gayathri-nair-r.webp",
    certifications: [
      "BEE Empaneled Expert (DISCOM)",
      "Retired Chief Engineer KSEB",
      "BEE Certified Energy Auditor (EA-5918)",
    ],
    featured: true,
  },
  {
    id: "p-rajesh",
    name: "Mr. P. Rajesh",
    role: "BEE Empaneled Sector Expert – Thermal Power Plant",
    department: "bee-experts",
    departmentLabel: "BEE Empaneled Expert",
    sector: "Thermal Power plant",
    qualification: "BE (Mechanical Engineering), M.Tech (Power Generation Technology)",
    function: "33 years' experience in NTPC. Former faculty in Administrative Staff College of India (ASCI), Hyderabad in 'Center for Energy Studies'. Empaneled with BEE for thermal power plants.",
    experienceYears: 33,
    badge: "BEE EA-33429/21 · Power Plant",
    image: "",
    certifications: [
      "BEE Empaneled Expert (Thermal Power)",
      "Former NTPC Specialist (33 yrs)",
      "Former Faculty ASCI Hyderabad",
    ],
    featured: true,
  },
  {
    id: "mrs-maya",
    name: "Mrs. Maya",
    role: "BEE Empaneled Sector Expert – Building",
    department: "bee-experts",
    departmentLabel: "BEE Empaneled Expert",
    sector: "Building",
    qualification: "B.E (Civil Engineering), M.Tech, Building Energy Efficiency Expert of EMC, Chartered Engineer (IEI)",
    function: "Building Energy Efficiency Expert of EMC. Chartered Engineer by Institution of Engineers, Approved Valuer by Institution of Valuers (India) and Valuer / Expert Engineer with RERA.",
    experienceYears: 20,
    badge: "BEE / EMC Building Expert",
    image: "",
    certifications: [
      "Building Energy Efficiency Expert (EMC)",
      "Chartered Engineer (IEI)",
      "Approved Valuer & RERA Expert",
    ],
    featured: true,
  },
];

export function getTeamMembersByDepartment(
  department: TeamMember["department"] | "all"
): TeamMember[] {
  if (department === "all") {
    return TEAM_MEMBERS;
  }
  return TEAM_MEMBERS.filter((m) => m.department === department);
}

export function getFeaturedTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.featured);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
