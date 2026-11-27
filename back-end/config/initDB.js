import bcrypt from "bcryptjs";
import { sequelize } from "./db.js";
import { Admin } from "../model/Admin.js";
import { Gallery } from "../model/Gallery.js";
import { Client } from "../model/Client.js";
import { Download } from "../model/Download.js";
import { Blog } from "../model/Blog.js";
import { Inquiry } from "../model/Inquiry.js";

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

    // Ensure inquiries.status supports 'Review Pending' and 'Responded' on existing databases
    try {
      await sequelize.query(
        "ALTER TABLE inquiries MODIFY COLUMN status VARCHAR(32) NOT NULL DEFAULT 'Review Pending'"
      );
      await sequelize.query(
        "UPDATE inquiries SET status = 'Responded' WHERE status IN ('Proposal Sent', 'Scheduled', 'Completed', 'Archived')"
      );
      await sequelize.query(
        "ALTER TABLE inquiries MODIFY COLUMN status ENUM('Review Pending', 'Responded') NOT NULL DEFAULT 'Review Pending'"
      );
    } catch (migrationErr) {
      console.warn("⚠️ Inquiry status migration note:", migrationErr.message);
    }

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

    // 3. Report client partners count without auto-re-seeding deleted logos
    const clientCount = await Client.count();
    console.log(`✅ [Database] Client partners verified: ${clientCount} logos in database`);
  } catch (error) {
    console.error("❌ Database initialization / auto-seed failed:", error.message);
    throw error;
  }
}

export default initDB;

