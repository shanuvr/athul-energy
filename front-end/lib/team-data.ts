export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department:
    | "leadership"
    | "energy-audits"
    | "electrical-safety"
    | "thermal-surveys"
    | "green-sustainability"
    | "operations";
  departmentLabel: string;
  qualification: string;
  function: string;
  experienceYears: number;
  badge?: string;
  image?: string;
  certifications: string[];
  featured?: boolean;
}

export interface TeamDepartment {
  id: TeamMember["department"] | "all";
  label: string;
  shortLabel: string;
}

export const TEAM_DEPARTMENTS: TeamDepartment[] = [
  { id: "all", label: "All Specialists", shortLabel: "All" },
  { id: "leadership", label: "Executive Leadership", shortLabel: "Leadership" },
  { id: "energy-audits", label: "Energy Audits & BEE", shortLabel: "Energy Audits" },
  { id: "electrical-safety", label: "Electrical Safety & CEA", shortLabel: "Safety Audits" },
  { id: "thermal-surveys", label: "Thermography & Surveys", shortLabel: "Thermography" },
  { id: "green-sustainability", label: "Green Buildings & NAAC", shortLabel: "Sustainability" },
  { id: "operations", label: "Project & Operations", shortLabel: "Operations" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  // ==========================================
  // 1. Executive Leadership
  // ==========================================
  {
    id: "santhosh-a",
    name: "Santhosh A.",
    role: "Founder & Managing Director / Lead Accredited Energy Auditor",
    department: "leadership",
    departmentLabel: "Executive Leadership",
    qualification: "B.Tech Electrical Engineering, BEE Accredited Energy Auditor (AEA-0275 / EmAEA 091)",
    function: "Overall technical direction, final audit sign-off, high-voltage plant reviews, PAT scheme verification, and government liaison with BEE & EMC Kerala.",
    experienceYears: 25,
    badge: "BEE AEA-0275",
    image: "/team/santhosh-a.jpg",
    certifications: [
      "BEE Accredited Energy Auditor",
      "EMC Kerala Empanelled Auditor",
      "ISO 50001 Lead Auditor",
      "GEDA & MEDA Empanelled Specialist",
    ],
    featured: true,
  },
  {
    id: "ashok-kmp",
    name: "Ashok K. M. P.",
    role: "Technical Director & Senior Energy Consultant",
    department: "leadership",
    departmentLabel: "Executive Leadership",
    qualification: "B.Tech Mechanical Engineering, BEE Certified Energy Manager, PGD in Energy Management",
    function: "Thermal utility modeling, industrial boiler & steam network optimization, cogeneration feasibility, and strategic energy conservation roadmap development.",
    experienceYears: 22,
    badge: "Certified Energy Manager",
    image: "/team/ashok-kmp.jpg",
    certifications: [
      "BEE Certified Energy Manager",
      "ASME PTC 4 Boiler Specialist",
      "Steam Systems Engineering (Spirax Certified)",
    ],
    featured: true,
  },

  // ==========================================
  // 2. Energy Audits & BEE Benchmarking
  // ==========================================
  {
    id: "sreejith-p-menon",
    name: "Sreejith P. Menon",
    role: "Lead Energy Auditor & Electrical Design Specialist",
    department: "energy-audits",
    departmentLabel: "Energy Audits & BEE",
    qualification: "B.Tech Electrical & Electronics, BEE Certified Energy Auditor (EA-1842)",
    function: "Specific Energy Consumption (SEC) benchmarking, mass & energy balance modeling, HT/LT power distribution logging, and Designated Consumer (DC) PAT verification.",
    experienceYears: 14,
    badge: "BEE Certified EA",
    image: "/team/sreejith-p-menon.jpg",
    certifications: [
      "BEE Certified Energy Auditor",
      "Class-A Power Quality Specialist",
      "IEEE 519 Harmonics Assessor",
    ],
    featured: true,
  },
  {
    id: "naveen-krishna",
    name: "Naveen Krishna",
    role: "Senior Energy Audit Engineer",
    department: "energy-audits",
    departmentLabel: "Energy Audits & BEE",
    qualification: "B.Tech Electrical Engineering, Certified Energy Professional",
    function: "Field measurement of motor loading, variable frequency drive (VFD) applications, compressed air leakage detection, and sub-station transformer efficiency tests.",
    experienceYears: 8,
    badge: "Energy Engineer",
    image: "/team/naveen-krishna.jpg",
    certifications: ["BEE Certified Candidate", "Ultrasonic Compressed Air Auditor"],
  },
  {
    id: "nikhila-v-s",
    name: "Nikhila V. S.",
    role: "Energy Modeling & Data Analytics Engineer",
    department: "energy-audits",
    departmentLabel: "Energy Audits & BEE",
    qualification: "M.Tech Energy Systems, B.Tech Electrical",
    function: "Energy consumption regression modeling, cumulative sum (CUSUM) analysis, baseline tariff scheduling, and client technical reporting.",
    experienceYears: 6,
    badge: "M.Tech Energy Systems",
    image: "/team/nikhila-v-s.jpg",
    certifications: ["Energy Modeling Specialist", "ISO 50001 Internal Auditor"],
  },

  // ==========================================
  // 3. Electrical Safety & CEA Regulations
  // ==========================================
  {
    id: "babu-t-v",
    name: "Babu T. V.",
    role: "Head of Electrical Safety & Statutory Audits",
    department: "electrical-safety",
    departmentLabel: "Electrical Safety & CEA",
    qualification: "Diploma in Electrical Engineering, BEE Certified Energy Manager, CEA Safety Inspector",
    function: "Central Electricity Authority (CEA 2010) compliance inspections, arc flash hazard analysis (IEEE 1584), relay coordination studies, and substation safety sign-offs.",
    experienceYears: 30,
    badge: "Senior Safety Lead",
    image: "/team/babu-t-v.jpg",
    certifications: [
      "CEA Regulations 2010 Assessor",
      "BEE Certified Energy Manager",
      "IS 14489 Safety Auditor",
      "NFPA 70E Arc Flash Specialist",
    ],
    featured: true,
  },
  {
    id: "gopakumar-r",
    name: "Gopakumar R.",
    role: "Senior Protection & Earthing Specialist",
    department: "electrical-safety",
    departmentLabel: "Electrical Safety & CEA",
    qualification: "B.Tech Electrical & Electronics, Certified Protection Engineer",
    function: "IS 3043 soil resistivity and earth pit impedance testing, fault current calculations, ETAP power simulation, and lightning protection system (IS/IEC 62305) verification.",
    experienceYears: 12,
    badge: "Earthing Specialist",
    image: "/team/gopakumar-r.jpg",
    certifications: ["IS 3043 Earthing Specialist", "ETAP Power Grid Certified"],
  },
  {
    id: "rahul-k-vijay",
    name: "Rahul K. Vijay",
    role: "Electrical Safety Field Engineer",
    department: "electrical-safety",
    departmentLabel: "Electrical Safety & CEA",
    qualification: "B.Tech Electrical Engineering",
    function: "On-site insulation resistance (Megger) testing, breaker trip timing tests, neutral-to-earth voltage logging, and statutory inspection documentation.",
    experienceYears: 5,
    badge: "Safety Inspector",
    image: "/team/rahul-k-vijay.jpg",
    certifications: ["Industrial Safety Diploma", "Lockout/Tagout (LOTO) Trainer"],
  },

  // ==========================================
  // 4. Thermography & Condition Monitoring
  // ==========================================
  {
    id: "dinil-vasan",
    name: "Dinil Vasan",
    role: "Lead Thermographer & Condition Monitoring Engineer",
    department: "thermal-surveys",
    departmentLabel: "Thermography & Surveys",
    qualification: "B.Tech Mechanical Engineering, ITC Certified Level-II Thermographer",
    function: "High-resolution thermal scanning of switchboards, bus ducts, motor bearings, refractory linings, and steam traps using calibrated FLIR infrared cameras.",
    experienceYears: 10,
    badge: "FLIR Level-II",
    image: "/team/dinil-vasan.jpg",
    certifications: [
      "ITC Certified Level-II Thermographer (ISO 18434-1)",
      "ASTM E1934 Thermal Inspector",
      "Vibration Analysis Level-I",
    ],
    featured: true,
  },
  {
    id: "anil-kumar-a-k",
    name: "Anil Kumar A. K.",
    role: "Senior Flow & Thermal Utilities Specialist",
    department: "thermal-surveys",
    departmentLabel: "Thermography & Surveys",
    qualification: "Diploma Mechanical Engineering, AMIE",
    function: "Non-invasive clamp-on transit-time ultrasonic flow testing for chilled water and cooling tower networks, boiler blowdown heat recovery, and steam trap registers.",
    experienceYears: 24,
    badge: "Ultrasonic Flow Specialist",
    image: "/team/anil-kumar-a-k.jpg",
    certifications: ["Ultrasonic Testing Specialist", "Water & Steam Utility Auditor"],
  },
  {
    id: "mohammed-haneefa",
    name: "Mohammed Haneefa",
    role: "HVAC & Thermal Survey Engineer",
    department: "thermal-surveys",
    departmentLabel: "Thermography & Surveys",
    qualification: "B.Tech Mechanical Engineering",
    function: "Chiller COP measurement, psychrometric airflow diagnostics, cooling tower approach testing, and thermal insulation deficiency mapping.",
    experienceYears: 5,
    badge: "HVAC Diagnostics",
    image: "/team/mohammed-haneefa.jpg",
    certifications: ["ASHRAE Chiller Testing", "Thermal Diagnostics Specialist"],
  },

  // ==========================================
  // 5. Green Buildings & Sustainability
  // ==========================================
  {
    id: "gayatri-r-nair",
    name: "Gayatri R. Nair",
    role: "Senior Sustainability & Green Audit Specialist",
    department: "green-sustainability",
    departmentLabel: "Green Buildings & NAAC",
    qualification: "M.Tech Environmental Engineering, GRIHA Certified Professional, IGBC AP",
    function: "NAAC Criteria 7 institutional green audits, carbon footprint accounting (Scope 1, 2 & 3), GRIHA & IGBC green building compliance, and water balance auditing.",
    experienceYears: 11,
    badge: "GRIHA CP / IGBC AP",
    image: "/team/gayatri-r-nair.jpg",
    certifications: [
      "GRIHA Certified Professional",
      "IGBC Accredited Professional",
      "ISO 14064 GHG Lead Verifier",
      "ECBC Master Trainer",
    ],
    featured: true,
  },
  {
    id: "deepa-ganesh",
    name: "Deepa Ganesh",
    role: "Associate Green Building Consultant",
    department: "green-sustainability",
    departmentLabel: "Green Buildings & NAAC",
    qualification: "B.Tech Civil Engineering, GRIHA Certified Professional",
    function: "Building envelope thermal comfort simulation, daylight factor lux mapping, rainwater harvesting potential, and green building certification dossier filing.",
    experienceYears: 16,
    badge: "GRIHA Evaluator",
    image: "/team/deepa-ganesh.jpg",
    certifications: ["GRIHA Evaluator", "IGBC Accredited Professional"],
  },

  // ==========================================
  // 6. Project Management & Operations
  // ==========================================
  {
    id: "abhilash-nair",
    name: "Abhilash Nair",
    role: "Head of Operations & Client Liaison",
    department: "operations",
    departmentLabel: "Project & Operations",
    qualification: "MBA Operations Management, B.A.",
    function: "Audit scheduling, field instrument dispatch & NABL calibration registry, client NDA execution, and statutory liaison with industrial inspectorates.",
    experienceYears: 12,
    badge: "Operations Head",
    image: "/team/abhilash-nair.jpg",
    certifications: ["Quality Management Systems (ISO 9001)", "Operations Strategy"],
  },
  {
    id: "pramod-kumar-n",
    name: "Pramod Kumar N.",
    role: "Senior On-Site Field Project Coordinator",
    department: "operations",
    departmentLabel: "Project & Operations",
    qualification: "Diploma Civil & Electrical Engineering",
    function: "Shutdown coordination, industrial safety permit issuance, plant site logistics, and sensor installation oversight during live audit campaigns.",
    experienceYears: 20,
    badge: "Site Coordinator",
    image: "/team/pramod-kumar-n.jpg",
    certifications: ["Industrial Plant Safety Officer", "Shutdown Management"],
  },
];

export function getTeamMembersByDepartment(department: TeamMember["department"] | "all"): TeamMember[] {
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
