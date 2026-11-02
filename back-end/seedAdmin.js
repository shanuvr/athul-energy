import bcrypt from "bcryptjs";
import { connectDB, sequelize } from "./config/db.js";
import { Admin } from "./model/Admin.js";

async function seedAdmin() {
  try {
    await connectDB();
    await Admin.sync({ alter: true });

    const adminEmail = "admin@athulenergy.com";
    const plainPassword = "athul@2026";

    // Hash the password with bcrypt (salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Check if admin already exists
    const existing = await Admin.findOne({ where: { email: adminEmail } });

    if (existing) {
      existing.password = hashedPassword;
      await existing.save();
      console.log(`✅ Admin account updated successfully: ${adminEmail}`);
    } else {
      await Admin.create({
        name: "Athul Energy Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "superadmin",
      });
      console.log(`✅ Admin account created successfully: ${adminEmail}`);
    }

    console.log(`🔑 Login Email: ${adminEmail}`);
    console.log(`🔑 Login Password: ${plainPassword}`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
    process.exit(1);
  }
}

seedAdmin();

