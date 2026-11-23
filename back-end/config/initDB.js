import bcrypt from "bcryptjs";
import { Admin } from "../model/Admin.js";
import { Gallery } from "../model/Gallery.js";
import { Client } from "../model/Client.js";
import { Download } from "../model/Download.js";
import { Blog } from "../model/Blog.js";
import { Inquiry } from "../model/Inquiry.js";

const INITIAL_CLIENTS = [
  { name: "Transformers and Electricals Kerala Ltd. (TELK)", logoUrl: "/clients/telk.webp", order: 1 },
  { name: "Indian Railways", logoUrl: "/clients/indian-railways.webp", order: 2 },
  { name: "Airports Authority of India (AAI)", logoUrl: "/clients/airports-authority-of-india.webp", order: 3 },
  { name: "Milma (Kerala Co-operative Milk Marketing Federation)", logoUrl: "/clients/milma.webp", order: 4 },
  { name: "Petronet LNG Limited", logoUrl: "/clients/petronet-lng.webp", order: 5 },
  { name: "A.V. Thomas Group (AVT)", logoUrl: "/clients/avt.webp", order: 6 },
  { name: "Synthite Industries Pvt. Ltd.", logoUrl: "/clients/synthite.webp", order: 7 },
  { name: "Federal Bank", logoUrl: "/clients/federal-bank.webp", order: 8 },
  { name: "PCBL Limited", logoUrl: "/clients/pcbl.webp", order: 9 },
  { name: "South Indian Bank", logoUrl: "/clients/south-indian-bank.webp", order: 10 },
  { name: "Kanan Devan Hills Plantations Company (KDHP)", logoUrl: "/clients/kanan-devan-hills-plantation.webp", order: 11 },
  { name: "Aster MIMS Hospital", logoUrl: "/clients/aster-mims.webp", order: 12 },
  { name: "Union Bank of India", logoUrl: "/clients/union-bank-of-india.webp", order: 13 },
  { name: "Mar Sleeva Medicity Palai", logoUrl: "/clients/mar-sleeva-medicity.webp", order: 14 },
  { name: "National Health Mission (NHM)", logoUrl: "/clients/national-health-mission.webp", order: 15 },
  { name: "Daya General Hospital", logoUrl: "/clients/daya-hospital.webp", order: 16 },
  { name: "Süd-Chemie India Pvt. Ltd.", logoUrl: "/clients/sud-chemie.webp", order: 17 },
  { name: "IQRAA International Hospital", logoUrl: "/clients/iqraa-hospital.webp", order: 18 },
  { name: "Thrissur Corporation Electricity Department (TCED)", logoUrl: "/clients/tced.webp", order: 19 },
  { name: "FICCI", logoUrl: "/clients/ficci.webp", order: 20 },
  { name: "Karnataka State Cricket Association (KSCA)", logoUrl: "/clients/karnataka-cricket-association.webp", order: 21 },
  { name: "World Resources Institute India (WRI India)", logoUrl: "/clients/wri-india.webp", order: 22 },
  { name: "Pactive Sustainable Solutions", logoUrl: "/clients/pactive.webp", order: 23 },
  { name: "Team Sudhan", logoUrl: "/clients/team-sudhan.webp", order: 24 },
];

/**
 * Initializes database tables and automatically seeds default admin on first startup
 */
export async function initDB() {
  try {
    // 1. Ensure empty table structures exist in MySQL (use sync() instead of alter to prevent hitting MySQL 64 index limit)
    await Admin.sync();
    await Gallery.sync();
    await Client.sync();
    await Download.sync();
    await Blog.sync();
    await Inquiry.sync();

    // 2. Check if default superadmin exists
    const defaultEmail = process.env.ADMIN_EMAIL || "admin@athulenergy.com";
    const defaultPassword = process.env.ADMIN_PASSWORD || "athul@2026";

    const existingAdmin = await Admin.findOne({
      where: { email: defaultEmail.toLowerCase().trim() },
    });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await Admin.create({
        name: "Athul Energy Admin",
        email: defaultEmail.toLowerCase().trim(),
        password: hashedPassword,
        role: "superadmin",
      });

      console.log(`✅ [Auto-Seed] Initial superadmin created: ${defaultEmail}`);
    } else {
      console.log(`✅ [Database] Superadmin verified: ${defaultEmail}`);
    }

    // 3. Auto-seed initial 11 client logos if table is empty
    const clientCount = await Client.count();
    if (clientCount === 0) {
      await Client.bulkCreate(INITIAL_CLIENTS);
      console.log(`✅ [Auto-Seed] Successfully seeded ${INITIAL_CLIENTS.length} client partner logos`);
    } else {
      console.log(`✅ [Database] Client partners verified: ${clientCount} logos in database`);
    }
  } catch (error) {
    console.error("❌ Database initialization / auto-seed failed:", error.message);
    throw error;
  }
}

export default initDB;

