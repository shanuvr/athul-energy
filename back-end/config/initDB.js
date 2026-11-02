import bcrypt from "bcryptjs";
import { Admin } from "../model/Admin.js";
import { Gallery } from "../model/Gallery.js";

/**
 * Initializes database tables and automatically seeds default admin on first startup
 */
export async function initDB() {
  try {
    // 1. Ensure empty table structures exist in MySQL
    await Admin.sync({ alter: true });
    await Gallery.sync({ alter: true });

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
  } catch (error) {
    console.error("❌ Database initialization / auto-seed failed:", error.message);
    throw error;
  }
}

export default initDB;

