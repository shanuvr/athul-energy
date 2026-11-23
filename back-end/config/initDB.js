import bcrypt from "bcryptjs";
import { Admin } from "../model/Admin.js";
import { Gallery } from "../model/Gallery.js";
import { Client } from "../model/Client.js";
import { Download } from "../model/Download.js";
import { Blog } from "../model/Blog.js";
import { Inquiry } from "../model/Inquiry.js";

const INITIAL_CLIENTS = [
  { name: "Transformers and Electricals Kerala Ltd. (TELK)", logoUrl: "/clients/telk.webp", order: 1 },
  { name: "Indian Railways", logoUrl: "/clients/indian_railways_logo_white_bg_enhanced_1200x480.jpg", order: 2 },
  { name: "Airports Authority of India (AAI)", logoUrl: "/clients/airports_authority_india_logo_white_bg_400x160.jpg", order: 3 },
  { name: "Milma (Kerala Co-operative Milk Marketing Federation)", logoUrl: "/clients/milma_logo_white_bg_400x160.jpg", order: 4 },
  { name: "Petronet LNG Limited", logoUrl: "/clients/petronet-lng.webp", order: 5 },
  { name: "A.V. Thomas Group (AVT)", logoUrl: "/clients/avt_logo_white_bg_400x160.jpg", order: 6 },
  { name: "Synthite Industries Pvt. Ltd.", logoUrl: "/clients/synthite.webp", order: 7 },
  { name: "Federal Bank", logoUrl: "/clients/federal_bank_logo_white_bg_enhanced_1200x480.jpg", order: 8 },
  { name: "PCBL Limited", logoUrl: "/clients/pcbl_chemical_logo_400x160_retina_fixed.png", order: 9 },
  { name: "South Indian Bank", logoUrl: "/clients/south_indian_bank_logo_white_bg_enhanced_1200x480.jpg", order: 10 },
  { name: "Kanan Devan Hills Plantations Company (KDHP)", logoUrl: "/clients/Kanan Devan Hills Plantation Logo.png", order: 11 },
  { name: "Aster MIMS Hospital", logoUrl: "/clients/aster_mims_logo_white_bg_enhanced_1200x480.jpg", order: 12 },
  { name: "Union Bank of India", logoUrl: "/clients/union-bank-of-india.webp", order: 13 },
  { name: "Mar Sleeva Medicity Palai", logoUrl: "/clients/mar_sleeva_medcity_palai_logo_white_bg_enhanced_1200x480.jpg", order: 14 },
  { name: "National Health Mission (NHM)", logoUrl: "/clients/national_health_mission_logo_white_bg_400x160.jpg", order: 15 },
  { name: "Daya General Hospital", logoUrl: "/clients/daya_hospital_logo_enhanced_white_bg_1200x480.jpg", order: 16 },
  { name: "Süd-Chemie India Pvt. Ltd.", logoUrl: "/clients/sud-chemie.webp", order: 17 },
  { name: "IQRAA International Hospital", logoUrl: "/clients/iqraa_hospital_logo_white_bg_400x160.jpg", order: 18 },
  { name: "Thrissur Corporation Electricity Department (TCED)", logoUrl: "/clients/tced_logo_white_bg_400x160.jpg", order: 19 },
  { name: "FICCI", logoUrl: "/clients/ficci_100_years_logo_enhanced_white_bg_1200x480.jpg", order: 20 },
  { name: "Karnataka State Cricket Association (KSCA)", logoUrl: "/clients/karnataka-cricket-association.webp", order: 21 },
  { name: "World Resources Institute India (WRI India)", logoUrl: "/clients/wri_india_logo_white_bg_400x160.jpg", order: 22 },
  { name: "Pactive Sustainable Solutions", logoUrl: "/clients/pactive_sustainable_solutions_logo_white_canvas_1200x480.jpg", order: 23 },
  { name: "Team Sudhan", logoUrl: "/clients/team_sudhan_logo_white_bg_enhanced_1200x480.jpg", order: 24 },
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

