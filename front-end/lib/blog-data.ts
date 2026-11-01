export interface BlogAuthor {
  name: string;
  role: string;
  badge?: string;
  avatar?: string;
  bio?: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full technical markdown/HTML formatted article content
  coverImage: string;
  category:
    | "energy-audits"
    | "electrical-safety"
    | "thermography"
    | "power-quality"
    | "thermal-utilities"
    | "sustainability";
  categoryLabel: string;
  author: BlogAuthor;
  publishedAt: string; // e.g. "2026-10-25"
  readTime: string; // e.g. "7 min read"
  tags: string[];
  featured?: boolean;
  tableOfContents?: TableOfContentItem[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: BlogPost["category"] | "all";
  label: string;
  shortLabel: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", label: "All Insights", shortLabel: "All" },
  { id: "energy-audits", label: "BEE Energy Audits", shortLabel: "Energy Audits" },
  { id: "electrical-safety", label: "Electrical Safety (CEA)", shortLabel: "Safety Audits" },
  { id: "thermography", label: "Infrared Thermography", shortLabel: "Thermography" },
  { id: "power-quality", label: "Power Quality & Harmonics", shortLabel: "Power Quality" },
  { id: "thermal-utilities", label: "Boiler & Steam Systems", shortLabel: "Boiler & Steam" },
  { id: "sustainability", label: "Green Building & NAAC", shortLabel: "Sustainability" },
];

export const BLOG_POSTS: BlogPost[] = [
  // ==========================================
  // Article 1 (Featured): BEE Mandatory Audits
  // ==========================================
  {
    id: "post-1",
    slug: "complete-guide-to-bee-mandatory-energy-audits",
    title: "Complete Guide to Mandatory BEE Energy Audits for Designated Consumers (PAT Scheme)",
    excerpt:
      "A technical walkthrough for plant managers and electrical heads on compliance under the Energy Conservation Act 2001, Form 1 filings, SEC baseline benchmarking, and ESCerts trading.",
    coverImage: "/services/detailed-energy-audit.jpg",
    category: "energy-audits",
    categoryLabel: "BEE Energy Audits",
    featured: true,
    publishedAt: "2026-10-28",
    readTime: "8 min read",
    tags: ["BEE Audit", "PAT Scheme", "Designated Consumer", "Form 1", "Energy Conservation Act"],
    author: {
      name: "Santhosh A.",
      role: "Lead BEE Accredited Energy Auditor (AEA-0275)",
      badge: "AEA-0275 / EmAEA 091",
      bio: "Founder & Managing Director of Athul Energy Consultants Pvt. Ltd. with over 25 years of field experience conducting mandatory statutory audits across heavy industrial sectors in India.",
    },
    tableOfContents: [
      { id: "legal-framework", title: "1. Legal Framework: EC Act 2001 & PAT Cycles" },
      { id: "dc-thresholds", title: "2. Designated Consumer (DC) Energy Thresholds" },
      { id: "four-phase-protocol", title: "3. The 4-Phase Statutory Audit Protocol" },
      { id: "form-1-filing", title: "4. Form 1, Form A/B Filing & Statutory Reporting" },
      { id: "escerts-financials", title: "5. Monetizing Compliance via ESCerts (Trading)" },
      { id: "audit-readiness-checklist", title: "6. Plant Manager Audit Readiness Checklist" },
    ],
    seo: {
      metaTitle: "Guide to BEE Mandatory Energy Audits for Designated Consumers | Athul Energy",
      metaDescription:
        "Understand statutory compliance under the Energy Conservation Act 2001, Form 1 filings, SEC benchmarks, and PAT verification by accredited BEE energy auditors.",
      keywords: [
        "BEE Mandatory Energy Audit",
        "Designated Consumers PAT Scheme",
        "Energy Conservation Act 2001",
        "Accredited Energy Auditor Kerala",
        "BEE Form 1 Filing",
        "ESCerts trading",
      ],
    },
    content: `
## 1. Legal Framework: EC Act 2001 & PAT Cycles {#legal-framework}

Under **Section 14(a) of the Energy Conservation Act (EC Act) 2001**, the Central Government has mandated that all commercial facilities and industrial plants falling within designated energy-intensive sectors and exceeding prescribed threshold consumption levels must undergo an official **Mandatory Energy Audit** by a Bureau of Energy Efficiency (BEE) **Accredited Energy Auditor (AEA)**.

The **Perform, Achieve and Trade (PAT)** scheme represents India's flagship market-based mechanism under the National Mission for Enhanced Energy Efficiency (NMEEE). It operates in 3-year rolling cycles requiring each designated consumer to achieve specific reductions in their **Specific Energy Consumption (SEC)**:

> **Statutory Citation:**
> *"Every Designated Consumer shall get energy audits conducted by an accredited energy auditor in the manner and intervals specified under BEE (Manner and Intervals of Time for Conduct of Energy Audit) Regulations."*

---

## 2. Designated Consumer (DC) Energy Thresholds {#dc-thresholds}

Industrial facilities operating in the following sectors are categorized as Designated Consumers when their annual total energy consumption equals or exceeds these statutory thresholds (measured in Metric Tonnes of Oil Equivalent - MTOE):

| Industrial Sector | Minimum Threshold (MTOE / Year) | Primary Energy Metrics |
| :--- | :---: | :--- |
| **Thermal Power Plants (Coal/Gas)** | 30,000 MTOE | Net Station Heat Rate (kCal/kWh) |
| **Cement Mills** | 30,000 MTOE | Specific Power (kWh/t) & Heat (kCal/kg clinker) |
| **Iron & Steel** | 30,000 MTOE | Giga Calories per Tonne of Crude Steel |
| **Textile (Composite)** | 3,000 MTOE | kWh per Kilogram of Finished Fabric |
| **Pulp & Paper** | 30,000 MTOE | Tonnes of Steam & kWh per Tonne of Paper |
| **Commercial Buildings (DISCOM)** | 100 kW / 120 kVA connected | Energy Performance Index (kWh/sq.m/yr) |

---

## 3. The 4-Phase Statutory Audit Protocol {#four-phase-protocol}

When Athul Energy's team of Accredited Energy Auditors executes a mandatory audit, the process is structured into four non-negotiable engineering phases:

### Phase 1: Pre-Audit Single-Line & Billing Harmonization
- Collation of historical 12-to-36 months utility bills (HT power, natural gas, biomass, diesel, coal).
- Review of Single-Line Diagrams (SLD), motor control centers (MCC), and process piping & instrumentation diagrams (P&ID).
- Establishment of the baseline plant operating hours, production volume, and sub-metering reconciliation.

### Phase 2: Live On-Site Precision Field Logging
- Deployment of Class-A true RMS power quality analyzers across incoming HT 11kV/33kV/66kV transformers.
- Direct non-contact transit-time ultrasonic flow measurement on chilled water and condenser water circuits.
- Flue gas combustion analysis (O2%, CO ppm, excess air ratio, stack temperature) on all utility boilers and thermic fluid heaters.
- Level-II infrared thermography on all LT distribution switchboards to spot phase imbalances and connection resistance.

### Phase 3: Mass & Energy Balance Mathematical Modeling
- Calculation of distribution transformer copper and core losses.
- Specific Energy Consumption (SEC) derivation for each distinct production line against BEE benchmarks.
- Compressed air network leakage quantification via pressure-decay testing.

### Phase 4: Energy Conservation Measures (ECM) & Payback Roadmap
- Categorization of identified savings into Zero-Cost (operational tweaks), Low-Cost (insulation, VFD additions), and Capital Retrofits (waste heat recovery, boiler burner upgrades).
- Financial metrics including Simple Payback Period, Net Present Value (NPV), and Internal Rate of Return (IRR).

---

## 4. Form 1, Form A/B Filing & Statutory Reporting {#form-1-filing}

Once field measurements and modeling are completed, the Designated Consumer must submit official compliance documentation to both the **State Designated Agency (SDA)** (such as EMC Kerala or MEDA) and the **Bureau of Energy Efficiency (BEE)**:

1. **Form 1:** Annual energy consumption details, fuel inventory, production logs, and specific energy consumption metrics. Must be submitted within 3 months of the financial year close.
2. **Form A (Audit Report Certification):** Official sign-off by the BEE Accredited Energy Auditor certifying that the audit was conducted according to statutory codes.
3. **Form B (Action Plan Implementation):** Details of the energy conservation recommendations implemented by the DC and verified savings achieved.

Failure to submit Form 1 or conduct audits within prescribed intervals attracts statutory penalties under Section 26 of the Energy Conservation Act, with daily fines for ongoing non-compliance.

---

## 5. Monetizing Compliance via ESCerts (Trading) {#escerts-financials}

One of the most powerful financial incentives in the PAT framework is the **Energy Saving Certificate (ESCert)** mechanism:

- If a Designated Consumer achieves energy savings **exceeding** its statutory SEC reduction target, BEE issues tradeable ESCerts (where 1 ESCert = 1 MTOE of energy saved).
- These ESCerts can be traded on national power exchanges (IEX and PXIL) to other Designated Consumers who have fallen short of their target.
- For high-performing plants, ESCerts generate substantial recurring financial returns that offset the costs of plant energy-saving retrofits.

---

## 6. Plant Manager Audit Readiness Checklist {#audit-readiness-checklist}

To ensure your facility is prepared for an accredited BEE audit with zero friction, keep the following documentation organized:

- [ ] Complete 12-month HT electricity bills, maximum demand charts, and TOD tariff breakdown.
- [ ] Updated Single-Line Diagram (SLD) reflecting all DG sets, transformers, and capacitor banks.
- [ ] Fuel purchase invoices, calorific value test reports (GCV/NCV for coal, furnace oil, diesel, or biomass).
- [ ] Daily production logs matching the corresponding 12-month billing period.
- [ ] Chiller, boiler, and air compressor manufacturer performance data sheets.
- [ ] Previous energy audit reports and records of implemented conservation measures.

### Partner with Accredited Auditors
Athul Energy Consultants Pvt. Ltd. is an empanelled Class-A Accredited Energy Auditing firm with credentials across BEE, EMC Kerala, GEDA, and MEDA. Contact our accredited lead auditors at **+91 73561 11990** or submit your plant details for a formal statutory audit proposal.
`,
  },

  // ==========================================
  // Article 2: CEA Regulations 2010 Electrical Safety
  // ==========================================
  {
    id: "post-2",
    slug: "cea-regulations-2010-electrical-safety-checklist",
    title: "CEA Regulations 2010: Complete Electrical Safety Audit Checklist for HT & LT Plants",
    excerpt:
      "A deep dive into mandatory Central Electricity Authority safety standards, relay coordination, arc flash boundaries, transformer clearance, and IS 3043 earthing pit impedance.",
    coverImage: "/services/electrical-safety-audit.jpg",
    category: "electrical-safety",
    categoryLabel: "Electrical Safety (CEA)",
    featured: false,
    publishedAt: "2026-10-18",
    readTime: "7 min read",
    tags: ["CEA 2010", "Electrical Safety", "Arc Flash", "IS 3043 Earthing", "Relay Coordination"],
    author: {
      name: "Babu T. V.",
      role: "Head of Electrical Safety & Statutory Audits",
      badge: "30+ Years CEA Specialist",
      bio: "Senior electrical safety inspector with over three decades of field testing across heavy industrial switchgear, HT substations, and industrial manufacturing plants.",
    },
    tableOfContents: [
      { id: "cea-scope", title: "1. Scope of CEA Regulations 2010" },
      { id: "critical-clauses", title: "2. Key Mandatory Safety Clauses" },
      { id: "earthing-impedance", title: "3. IS 3043 Earthing & Soil Resistivity" },
      { id: "arc-flash-hazards", title: "4. Arc Flash Protection (IEEE 1584 & NFPA 70E)" },
      { id: "common-violations", title: "5. Top 5 Most Common Safety Violations" },
    ],
    seo: {
      metaTitle: "CEA Regulations 2010 Electrical Safety Checklist | Athul Energy",
      metaDescription:
        "Comprehensive checklist for Central Electricity Authority 2010 safety regulations, arc flash calculations, relay coordination, and IS 3043 earthing inspection.",
      keywords: [
        "CEA Regulations 2010",
        "Electrical Safety Audit Kerala",
        "IS 3043 Earthing Pit Testing",
        "Arc Flash Hazard Analysis",
        "Relay Coordination Study",
        "HT Substation Safety",
      ],
    },
    content: `
## 1. Scope of CEA Regulations 2010 {#cea-scope}

The **Central Electricity Authority (Measures relating to Safety and Electric Supply) Regulations, 2010** forms the statutory backbone of electrical safety across India. Under these regulations, every commercial establishment, hospital, IT park, and industrial factory operating electrical installations must comply with strict physical clearances, protective relay settings, and insulation tolerances.

Industrial fires caused by electrical short circuits represent over **65% of industrial accidents in India**. Routine electrical safety audits are both a statutory obligation and a critical operational safeguard.

---

## 2. Key Mandatory Safety Clauses {#critical-clauses}

During an electrical safety audit, our certified safety auditors systematically evaluate compliance against the following core statutory clauses:

- **Regulation 12:** Earth-fault and overcurrent protection on all generating units and major power transformers.
- **Regulation 35:** Periodic inspection and testing of consumer installations by authorized electrical inspectors.
- **Regulation 43:** Clearances above ground of the lowest conductor of overhead lines.
- **Regulation 44:** Electric traction and high-voltage substation perimeter clearances.
- **Regulation 100:** Mandatory provision of rubber insulation mats (IS 15652) with test voltages matched to panel operating levels.

---

## 3. IS 3043 Earthing & Soil Resistivity {#earthing-impedance}

Proper earthing provides an instantaneous path for fault current, safeguarding personnel against touch and step voltages. All earthing systems must adhere to **IS 3043:2018**:

### Earthing Resistance Thresholds:
- **Substations & HT Switchyards:** Combined earth resistance should not exceed **1.0 Ohm** (ideally < 0.5 Ohm for generating stations).
- **Industrial Distribution Panels:** Individual earth pit resistance should not exceed **2.0 to 5.0 Ohms**.
- **Neutral Grounding (Transformers & DGs):** Dedicated neutral earth pits must maintain independent impedance and never be looped with lightning protection pits.

### Testing Methodology:
Our engineers utilize calibrated four-terminal digital Earth Resistance testers using the Fall-of-Potential method, plotting resistance curves against electrode distance to detect soil stratification.

---

## 4. Arc Flash Hazards (IEEE 1584 & NFPA 70E) {#arc-flash-hazards}

An arc flash generates temperatures exceeding **19,000°C**—hotter than the surface of the sun—causing catastrophic pressure waves and fatal burns.

Our safety audits include arc flash hazard calculations:
1. **Short Circuit Modeling:** Fault current determination across busbars using ETAP / computer simulation.
2. **Clearing Time Verification:** Verification of breaker trip curves and upstream relay coordination.
3. **Incident Energy Calculation (cal/cm²):** Determining exact boundary distances and specifying correct Personal Protective Equipment (PPE Level 1 to 4) labels on all switchboards.

---

## 5. Top 5 Most Common Safety Violations Spotted on Sites {#common-violations}

1. **Missing or Bypassed Relay Interlocks:** Breaker trip units wired around because of nuisance tripping rather than fixing the underlying leakage.
2. **Sub-standard Insulation Mats:** Using generic decorative rubber mats instead of tested **IS 15652 Class-A/B/C** electrical safety grade mats.
3. **Improper Neutral-Earth Bonding:** Neutral looped back into body ground at downstream distribution boards, introducing dangerous neutral-to-earth voltages.
4. **Blocked Switchgear Aisles:** Storage boxes and spare equipment stacked within the mandatory 1.0 to 1.25m front clearance zone.
5. **Deteriorated Earth Pit Electrode Rods:** Corroded pipe/plate electrodes with dry backfill soil yielding earth resistance values exceeding 25 Ohms.

Ensure your plant is protected against legal liabilities and hazardous downtime. Book an official electrical safety audit with Athul Energy's senior safety engineers today.
`,
  },

  // ==========================================
  // Article 3: Infrared Thermography
  // ==========================================
  {
    id: "post-3",
    slug: "infrared-thermography-predictive-maintenance",
    title: "Infrared Thermography in Predictive Maintenance: Detecting Busbar & Bearing Hotspots Early",
    excerpt:
      "How non-contact thermal scanning with calibrated FLIR cameras prevents catastrophic switchgear failures, transformer bushing degradation, and motor bearing burnouts.",
    coverImage: "/services/infrared-thermal-imaging-survey.jpg",
    category: "thermography",
    categoryLabel: "Infrared Thermography",
    featured: false,
    publishedAt: "2026-10-10",
    readTime: "6 min read",
    tags: ["Thermography", "FLIR Level-II", "Predictive Maintenance", "Hotspot Detection", "ISO 18434-1"],
    author: {
      name: "Dinil Vasan",
      role: "Lead Thermographer & Condition Monitoring Engineer",
      badge: "FLIR Level-II Certified",
      bio: "ITC Certified Level-II Thermographer with a focus on non-destructive condition monitoring across industrial substations, paper mills, and continuous process plants.",
    },
    tableOfContents: [
      { id: "thermography-basics", title: "1. Why Predictive Thermography Matters" },
      { id: "delta-t-matrix", title: "2. The Delta-T (ΔT) Severity Matrix" },
      { id: "electrical-hotspots", title: "3. Electrical Switchboard Inspection Protocols" },
      { id: "mechanical-diagnostics", title: "4. Mechanical Thermography: Bearings & Couplings" },
      { id: "best-practices", title: "5. Best Practices During an Infrared Survey" },
    ],
    seo: {
      metaTitle: "Infrared Thermography for Predictive Maintenance | Athul Energy",
      metaDescription:
        "Learn how FLIR Level-II thermal scanning identifies electrical busbar hot spots, phase imbalances, and motor bearing friction without stopping production.",
      keywords: [
        "Infrared Thermography Survey",
        "FLIR Thermal Imaging Kerala",
        "Electrical Panel Hotspot Detection",
        "Delta-T Severity Matrix",
        "Predictive Maintenance Thermography",
      ],
    },
    content: `
## 1. Why Predictive Thermography Matters {#thermography-basics}

Every electrical and mechanical failure is preceded by abnormal heat generation. Before a busbar joint fuses, an insulated cable melts, or a bearing seizes, the junction temperature rises significantly above ambient levels due to increased electrical resistance ($P = I^2R$) or mechanical friction.

**Infrared Thermography** allows certified engineers to inspect live electrical installations and rotating equipment under full operational load without interrupting factory production.

---

## 2. The Delta-T (ΔT) Severity Matrix {#delta-t-matrix}

Thermal scanning is not just about capturing pretty false-color pictures; it requires scientific quantification of temperature differences ($\Delta T$). Athul Energy utilizes the standardized **ASTM E1934 / NFPA 70B** severity criteria:

| Severity Level | Temperature Rise ($\Delta T$) Above Baseline | Recommended Corrective Action |
| :--- | :---: | :--- |
| **Minor (Advisory)** | 1°C to 10°C | Repair during next scheduled maintenance shutdown. |
| **Moderate (Intermediate)** | 11°C to 20°C | Schedule inspection and maintenance within 7 to 14 days. |
| **Critical (Serious)** | 21°C to 40°C | Urgent maintenance required within 24 to 48 hours. |
| **Emergency (Danger)** | > 40°C | **Immediate intervention required.** High risk of flashover, insulation melt, or fire. |

---

## 3. Electrical Switchboard Inspection Protocols {#electrical-hotspots}

For an infrared scan to be valid, the following electrical conditions must be observed:
- **Minimum 40% Electrical Loading:** Scans conducted at light loads (e.g. during lunch break or weekend standby) produce misleadingly low thermal gradients because heat dissipation scales with the square of current ($I^2$).
- **Direct Line of Sight:** Infrared radiation does not pass through solid metal doors or standard Plexiglas covers. Panels must be safely opened or equipped with certified **IR Windows** (Calcium Fluoride or Germanium optics).
- **Emissivity Calibration:** Setting the correct emissivity ($\epsilon$) on the thermal imager (typically 0.95 for painted metal and PVC insulation, 0.20 to 0.40 for bare oxidized copper busbars).

---

## 4. Mechanical Thermography: Bearings & Couplings {#mechanical-diagnostics}

Beyond electrical panels, thermal imaging provides indispensable insights for mechanical equipment:
- **Motor Bearings:** Detecting inadequate lubrication, over-greasing, or misalignment between motor and pump shafts.
- **Steam Traps:** Verifying whether steam traps are blown open (wasting live steam) or plugged cold (causing condensate backup and water hammer).
- **Furnace Refractory Walls:** Identifying refractory brick erosion and hot gas leaks on industrial kilns and boilers.

---

## 5. Best Practices During an Infrared Survey {#best-practices}

1. Conduct surveys at peak production hours when transformers and switchgear carry maximum current.
2. Pair every thermal radiograph with a standard digital photograph for exact component identification.
3. Record ambient temperature, relative humidity, and operating current on the report.
4. Verify hot spots using contact surface pyrometers to cross-reference optical emissivity.

Athul Energy deploys NABL-calibrated Level-II FLIR cameras with high spatial resolution to deliver comprehensive thermal inspection dossiers.
`,
  },

  // ==========================================
  // Article 4: Power Quality & Harmonics
  // ==========================================
  {
    id: "post-4",
    slug: "power-quality-harmonics-ieee-519-compliance",
    title: "Power Quality Harmonics & IEEE 519: Sizing Active Harmonic Filters to Avoid Utility Penalties",
    excerpt:
      "Understanding Total Harmonic Distortion (THD-V and THD-I), neutral overheating, capacitor bank resonance, and how to size Active Harmonic Filters (AHF) for clean power.",
    coverImage: "/services/power-quality-harmonics-study.jpg",
    category: "power-quality",
    categoryLabel: "Power Quality & Harmonics",
    featured: false,
    publishedAt: "2026-09-28",
    readTime: "7 min read",
    tags: ["Power Quality", "Harmonics", "IEEE 519", "Active Harmonic Filter", "THD"],
    author: {
      name: "Sreejith P. Menon",
      role: "Lead Energy Auditor & Electrical Design Specialist",
      badge: "BEE EA-1842",
      bio: "Power systems and harmonics engineer specializing in Class-A power quality logging, IEEE 519 compliance verification, and filter sizing for manufacturing plants.",
    },
    tableOfContents: [
      { id: "what-are-harmonics", title: "1. What are Harmonics and Why Do They Occur?" },
      { id: "harmonic-hazards", title: "2. The Hidden Cost of High THD in Plants" },
      { id: "ieee-519-limits", title: "3. IEEE 519-2022 Statutory Voltage & Current Limits" },
      { id: "filter-technologies", title: "4. Passive Detuned vs. Active Harmonic Filters" },
      { id: "how-to-size-ahf", title: "5. Sizing Active Harmonic Filters Correctly" },
    ],
    seo: {
      metaTitle: "Power Quality Harmonics & IEEE 519 Compliance | Athul Energy",
      metaDescription:
        "Understand Total Harmonic Distortion (THD), neutral conductor burning, capacitor resonance, and Active Harmonic Filter (AHF) sizing under IEEE 519 standards.",
      keywords: [
        "Power Quality Harmonics Audit",
        "IEEE 519 Compliance Kerala",
        "Active Harmonic Filter Sizing",
        "Total Harmonic Distortion THD",
        "Transformer Derating K-Factor",
      ],
    },
    content: `
## 1. What are Harmonics and Why Do They Occur? {#what-are-harmonics}

In a balanced, linear AC power network, current and voltage maintain a clean 50 Hz sinusoidal waveform. However, modern industrial facilities rely heavily on **non-linear electrical loads**:
- Variable Frequency Drives (VFDs) and DC drives.
- Uninterruptible Power Supplies (UPS) and rectifiers.
- Induction melting furnaces and welding equipment.
- LED driver electronics and server power supplies.

These devices draw current in abrupt pulses rather than smooth waves, generating harmonic frequencies that are integer multiples of the fundamental 50 Hz frequency (3rd = 150 Hz, 5th = 250 Hz, 7th = 350 Hz, 11th = 550 Hz).

---

## 2. The Hidden Cost of High THD in Plants {#harmonic-hazards}

Excessive harmonic distortion introduces severe operational and financial hazards:
1. **Transformer Overheating & K-Factor Derating:** Eddy current losses in transformer iron cores scale with the square of frequency ($f^2$), causing transformers to overheat even when running at 70% rated kVA load.
2. **Neutral Conductor Overheating:** Triplen harmonics (3rd, 9th, 15th) do not cancel out at the neutral point; they add arithmetically, causing neutral currents to exceed phase currents and burning neutral cables.
3. **Capacitor Bank Explosions:** Shunt power factor capacitors offer low impedance at high frequencies ($X_c = 1 / 2\pi fC$), drawing harmonic currents that cause bulging, insulation failure, and catastrophic resonance.
4. **Nuisance Breaker Tripping:** Electronic trip units miscalculate true RMS values, causing unexpected factory blackouts.

---

## 3. IEEE 519-2022 Statutory Voltage & Current Limits {#ieee-519-limits}

Under **IEEE 519-2022**, the maximum allowable Total Harmonic Distortion at the Point of Common Coupling (PCC) depends on the system voltage and the plant's Short Circuit Ratio ($I_{sc} / I_L$):

### Voltage Harmonic Limits at PCC:
- **Bus Voltage $\le$ 1.0 kV:** Maximum Individual Harmonic = **5.0%**, Total Voltage Distortion ($THD_V$) = **8.0%**.
- **Bus Voltage 1.0 kV to 69 kV:** Maximum Individual Harmonic = **3.0%**, Total Voltage Distortion ($THD_V$) = **5.0%**.

State electricity regulatory commissions (SERCs) across India have begun enforcing strict penalties or disconnection notices for industrial facilities exceeding prescribed harmonic distortion limits at the utility metering boundary.

---

## 4. Passive Detuned vs. Active Harmonic Filters {#filter-technologies}

- **Passive Detuned Reactors (7% or 14%):** Installed in series with power factor capacitor banks to shift the resonant frequency below the 5th harmonic (to 189 Hz or 134 Hz). They protect the capacitors from resonance but do not actively cancel harmonic currents.
- **Active Harmonic Filters (AHF):** High-speed IGBT-based power electronic systems that monitor line current in real time, generate an exact opposite phase-shifted canceling current, and inject it into the busbar within milliseconds.

---

## 5. Sizing Active Harmonic Filters Correctly {#how-to-size-ahf}

To size an AHF properly without overpaying or leaving harmonic currents unmitigated:
1. Conduct a continuous 24-to-72 hour Class-A power quality log across full production cycles.
2. Determine the fundamental load current ($I_1$) and the 5th, 7th, 11th, and 13th harmonic currents ($I_h$).
3. Calculate the required harmonic compensation current:
   $$I_{AHF} = \sqrt{I_5^2 + I_7^2 + I_{11}^2 + I_{13}^2} \times 1.25 \text{ (Safety Margin)}$$
4. Ensure the selected unit supports simultaneous dynamic reactive power (kVAr) compensation and phase unbalance correction.

Athul Energy provides complete Class-A power quality logging and third-party verified AHF sizing reports.
`,
  },

  // ==========================================
  // Article 5: Boiler & Steam Energy Conservation
  // ==========================================
  {
    id: "post-5",
    slug: "industrial-boiler-steam-efficiency-ecms",
    title: "Industrial Boiler & Steam System Efficiency: 5 High-ROI Energy Conservation Measures (ECMs)",
    excerpt:
      "A thermal engineering guide to maximizing boiler direct/indirect efficiency, excess air tuning, blowdown waste heat recovery, and steam trap population surveys.",
    coverImage: "/services/thermal-energy-audit-service.jpg",
    category: "thermal-utilities",
    categoryLabel: "Boiler & Steam Systems",
    featured: false,
    publishedAt: "2026-09-14",
    readTime: "7 min read",
    tags: ["Boiler Efficiency", "Steam Traps", "Waste Heat Recovery", "Thermal Audit", "ASME PTC 4"],
    author: {
      name: "Ashok K. M. P.",
      role: "Technical Director & Senior Energy Consultant",
      badge: "Certified Energy Manager",
      bio: "Thermal systems specialist with 22 years of experience optimizing boiler plants, steam networks, and waste heat recovery systems in process manufacturing.",
    },
    tableOfContents: [
      { id: "boiler-losses", title: "1. Understanding Boiler Heat Losses (BS 845 / ASME PTC 4)" },
      { id: "ecm-1-excess-air", title: "2. ECM 1: Combustion Excess Air Tuning" },
      { id: "ecm-2-economizer", title: "3. ECM 2: Flue Gas Economizers & Air Pre-heaters" },
      { id: "ecm-3-blowdown", title: "4. ECM 3: Automatic TDS Blowdown & Heat Recovery" },
      { id: "ecm-4-steam-traps", title: "5. ECM 4: Eliminating Steam Trap Failures" },
      { id: "ecm-5-insulation", title: "6. ECM 5: Pipeline Insulation & Condensate Return" },
    ],
    seo: {
      metaTitle: "Industrial Boiler & Steam Efficiency Guide | Athul Energy",
      metaDescription:
        "Learn 5 high-ROI energy conservation measures for industrial boilers, flue gas heat recovery, blowdown TDS control, and steam trap testing under ASME PTC 4.",
      keywords: [
        "Boiler Efficiency Audit",
        "Steam Trap Testing Survey",
        "Flue Gas Waste Heat Recovery",
        "Excess Air Combustion Tuning",
        "Thermal Energy Audit Kerala",
      ],
    },
    content: `
## 1. Understanding Boiler Heat Losses (BS 845 / ASME PTC 4) {#boiler-losses}

In process industries—such as food processing, chemicals, rubber, textiles, and pharmaceuticals—fuel used in boilers represents between **40% and 70% of total plant energy expenditure**.

While direct boiler efficiency provides an operational estimate ($\text{Heat Output} / \text{Heat Input}$), a thorough thermal audit utilizes the **Indirect Heat Loss Method** to quantify exact energy loss channels:
- Dry flue gas stack loss ($L_1$, typically 10% to 25%).
- Loss due to hydrogen in fuel forming water vapor ($L_2$, 4% to 8%).
- Moisture in fuel and combustion air ($L_3$ & $L_4$).
- Unburnt fuel losses in ash / incomplete combustion ($L_5$).
- Surface radiation and convection losses ($L_6$, 1% to 3%).

---

## 2. ECM 1: Combustion Excess Air Tuning {#ecm-1-excess-air}

For complete fuel combustion, theoretical stoichiometric air is insufficient; extra air must be provided. However, **too much excess air carries valuable heat straight out of the chimney stack**:

- Every **15% reduction in excess air** or **1% decrease in flue gas $O_2$** improves overall boiler thermal efficiency by approximately **0.5% to 1.0%**.
- Ideal Flue Gas Oxygen Targets:
  - Natural Gas: **2.0% to 3.0% $O_2$** (approx 10% to 15% excess air).
  - Light Diesel Oil (LDO) / Furnace Oil: **3.0% to 4.5% $O_2$** (15% to 25% excess air).
  - Coal / Briquette / Biomass: **4.5% to 6.5% $O_2$** (25% to 40% excess air).

Installing automated trim oxygen sensors with modulating variable-speed combustion air fans typically pays back in under **4 to 6 months**.

---

## 3. ECM 2: Flue Gas Economizers & Air Pre-heaters {#ecm-2-economizer}

Flue gas temperatures leaving standard industrial boilers often exceed 220°C to 280°C. That represents hundreds of thousands of BTUs vented to the atmosphere daily.

- **Rule of Thumb:** Every **22°C drop in flue gas temperature** achieved by preheating boiler feedwater yields a **1% fuel savings**.
- Installing an exhaust gas economizer to heat feedwater from 30°C to 80°C regularly achieves **4% to 7% overall fuel reduction**.

---

## 4. ECM 3: Automatic TDS Blowdown & Heat Recovery {#ecm-3-blowdown}

To prevent scaling and dissolved solids buildup, boiler water is continuously purged (blowdown). Manual blowdown is notoriously inefficient—either over-purging (wasting hot treated water) or under-purging (scaling boiler tubes).

- Implementing an **Automatic Total Dissolved Solids (TDS) Blowdown System** maintains precise conductivity levels.
- Passing continuous blowdown water through a flash vessel and heat exchanger recovers flash steam and preheats make-up water, turning a major thermal loss into usable energy.

---

## 5. ECM 4: Eliminating Steam Trap Failures {#ecm-4-steam-traps}

In unmonitored industrial steam networks, between **20% and 35% of all steam traps are either stuck open (leaking live steam) or plugged cold (waterlogged)**:

- A single 15mm thermodynamic steam trap blowing open at 8 bar(g) leaks approximately **18 kg of live steam per hour**.
- Running 8,000 hours per year, this single failed trap wastes over **144 tonnes of steam annually**, costing upwards of ₹3,50,000 in wasted fuel.
- Ultrasonic and thermographic testing of 100% of the trap population identifies leaking traps for immediate rebuild or replacement.

---

## 6. ECM 5: Pipeline Insulation & Condensate Return {#ecm-5-insulation}

- **Insulating Bare Valves and Flanges:** An uninsulated 4-inch gate valve operating at 170°C loses as much heat as 3 meters of bare pipe, costing over ₹25,000 annually. Removable thermal insulation jackets provide an instant 60-day ROI.
- **Maximizing Condensate Return:** Every 6°C increase in boiler feedwater temperature achieved by returning pure, hot condensate saves 1% of fuel and drastically reduces chemical treatment costs.

Athul Energy provides complete thermal audits, flue gas logging, and steam network optimization.
`,
  },

  // ==========================================
  // Article 6: NAAC Criteria 7 Green Audits
  // ==========================================
  {
    id: "post-6",
    slug: "naac-criteria-7-institutional-green-audit-guide",
    title: "NAAC Criteria 7: Complete Green, Energy & Environmental Audit Guide for Universities & Colleges",
    excerpt:
      "A comprehensive compliance manual for educational institutions on preparing Energy, Green, Environmental, and Water audit reports for NAAC accreditation grade enhancement.",
    coverImage: "/services/green-audit-naac-accreditation.jpg",
    category: "sustainability",
    categoryLabel: "Green Building & NAAC",
    featured: false,
    publishedAt: "2026-08-30",
    readTime: "6 min read",
    tags: ["NAAC Audit", "Green Audit", "Criteria 7", "Environmental Audit", "Campus Sustainability"],
    author: {
      name: "Gayatri R. Nair",
      role: "Senior Sustainability & Green Audit Specialist",
      badge: "GRIHA CP / IGBC AP",
      bio: "Environmental and green building consultant with extensive experience evaluating college campuses, universities, and healthcare facilities for sustainability credentials.",
    },
    tableOfContents: [
      { id: "naac-criteria-7-overview", title: "1. Understanding NAAC Criteria 7 Requirements" },
      { id: "the-three-audits", title: "2. The Three Core Audits: Energy, Green & Environment" },
      { id: "water-waste-auditing", title: "3. Water Audit & Waste Management Verification" },
      { id: "carbon-footprint", title: "4. Campus Carbon Footprint (Scope 1 & 2)" },
      { id: "documentation-checklist", title: "5. Documentation Required for Peer Team Review" },
    ],
    seo: {
      metaTitle: "NAAC Criteria 7 Green, Energy & Environment Audit Guide | Athul Energy",
      metaDescription:
        "Step-by-step guide for colleges and universities to score maximum points under NAAC Criteria 7 with official certified Green, Energy, and Environmental audits.",
      keywords: [
        "NAAC Criteria 7 Green Audit",
        "College Energy Audit Kerala",
        "Environmental Audit for NAAC",
        "Campus Carbon Footprint Calculation",
        "Certified Green Auditor Kerala",
      ],
    },
    content: `
## 1. Understanding NAAC Criteria 7 Requirements {#naac-criteria-7-overview}

Under the National Assessment and Accreditation Council (NAAC) assessment framework, **Criterion VII: Institutional Values and Best Practices** holds significant weight in determining an educational institution's final cumulative grade point average (CGPA):

- **Metric 7.1.2:** Alternate sources of energy and energy conservation measures (Solar, Biogas, Wheeling to the grid, Sensor-based energy conservation, Use of LED bulbs).
- **Metric 7.1.3:** Facilities for the management of the various types of degradable and non-degradable waste.
- **Metric 7.1.4:** Water conservation facilities available in the institution (Rainwater harvesting, borewell recharge, waste water recycling, maintenance of water bodies).
- **Metric 7.1.6:** Quality audits on environment and energy regularly undertaken by the institution (Green audit, Energy audit, Environment audit, Clean and green campus recognitions/awards).

---

## 2. The Three Core Audits: Energy, Green & Environment {#the-three-audits}

NAAC mandates that quality audits must be conducted by **external accredited certification bodies**:

### 1. Energy Audit
- Detailed electrical consumption analysis across classrooms, science laboratories, computer centers, and hostels.
- Identification of high-consumption lighting fixtures, older ceiling fans, and legacy air conditioning systems.
- Solar photovoltaic (Rooftop PV) feasibility and grid-tied net-metering potential.

### 2. Green Audit
- Flora and fauna biodiversity indexing of the campus acreage.
- Green cover ratio (canopy cover relative to built-up area).
- Pedestrian-friendly pathways, bicycle provisions, and restricted automobile zones.

### 3. Environmental Audit
- Ambient air quality monitoring (PM2.5, PM10, SOx, NOx).
- Noise level surveys in silent zones (libraries, exam halls, residential hostels).
- E-waste disposal compliance and hazardous chemical management in chemistry/biology laboratories.

---

## 3. Water Audit & Waste Management Verification {#water-waste-auditing}

- **Per Capita Water Consumption:** Benchmarking daily water utilization per student/staff against standard NBC guidelines (typically 45–135 liters/head/day).
- **Rainwater Harvesting Catchment Modeling:** Calculating rooftop surface areas, runoff coefficients, and underground rainwater recharge tank capacities.
- **Sewage Treatment Plants (STP):** Verifying treated water quality for campus garden irrigation and toilet flushing.
- **Solid Waste Management:** Auditing organic waste composting, biogas generation from college canteen food waste, and tie-ups with certified recyclers.

---

## 4. Campus Carbon Footprint (Scope 1 & 2) {#carbon-footprint}

Our accredited audit reports calculate the institution's net greenhouse gas emissions expressed in Metric Tonnes of $CO_2$ Equivalent ($tCO_2e$):
- **Scope 1 (Direct):** Fuel consumed by college bus fleets, diesel generators, and LPG used in hostels and canteens.
- **Scope 2 (Indirect):** Grid electricity purchased from state utilities.
- **Carbon Sequestration:** Offsetting calculations based on mature trees present on the campus grounds.

---

## 5. Documentation Required for Peer Team Review {#documentation-checklist}

To satisfy NAAC Peer Team verification without audit queries:
- [ ] Official audit certificates issued by an accredited engineering firm (bearing valid BEE and Government empanelment credentials).
- [ ] Geotagged photographs of solar panels, rainwater harvesting pits, biogas plants, and sensor-based lighting.
- [ ] Institutional policies on environment, energy usage, and plastic ban officially approved by the Governing Council.
- [ ] Action Taken Reports (ATR) demonstrating implementation of previous audit recommendations.

Athul Energy has guided hundreds of premier colleges, engineering universities, and medical institutions across India to secure stellar NAAC Criteria 7 ratings.
`,
  },
];

// ==========================================
// Repository Query Functions
// (Standard enterprise abstraction: Easy to swap with backend API fetch calls)
// ==========================================

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPost(): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"] | "all"): BlogPost[] {
  if (category === "all") {
    return getAllPosts();
  }
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, category: BlogPost["category"], limit = 2): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && (p.category === category || p.featured))
    .slice(0, limit);
}

export function getAllCategories(): BlogCategory[] {
  return BLOG_CATEGORIES;
}
