import bcrypt from "bcryptjs";
import { Admin } from "../model/Admin.js";
import { Gallery } from "../model/Gallery.js";
import { Client } from "../model/Client.js";

const INITIAL_CLIENTS = [
  { name: "Transformers and Electricals Kerala Ltd. (TELK)", logoUrl: "/clients/telk.webp", order: 1 },
  { name: "Airports Authority of India (AAI)", logoUrl: "/clients/airports-authority-of-india.webp", order: 2 },
  { name: "Petronet LNG Limited", logoUrl: "/clients/petronet-lng.webp", order: 3 },
  { name: "Synthite Industries Pvt. Ltd.", logoUrl: "/clients/synthite.webp", order: 4 },
  { name: "Andhra Bank", logoUrl: "/clients/andhra-bank.webp", order: 5 },
  { name: "Central Bank of India", logoUrl: "/clients/central-bank-of-india.webp", order: 6 },
  { name: "Punjab National Bank", logoUrl: "/clients/punjab-national-bank.webp", order: 7 },
  { name: "Syndicate Bank", logoUrl: "/clients/syndicate-bank.webp", order: 8 },
  { name: "Union Bank of India", logoUrl: "/clients/union-bank-of-india.webp", order: 9 },
  { name: "Süd-Chemie India Pvt. Ltd.", logoUrl: "/clients/sud-chemie.webp", order: 10 },
  { name: "Karnataka State Cricket Association (KSCA)", logoUrl: "/clients/karnataka-cricket-association.webp", order: 11 },
];

/**
 * Initializes database tables and automatically seeds default admin on first startup
 */
export async function initDB() {
  try {
    // 1. Ensure empty table structures exist in MySQL
    await Admin.sync({ alter: true });
    await Gallery.sync({ alter: true });
    await Client.sync({ alter: true });

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

