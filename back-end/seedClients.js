import { connectDB, sequelize } from "./config/db.js";
import { Client } from "./model/Client.js";

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
 * One-time manual seed script for initial client logos.
 * Run with: node seedClients.js
 */
async function seedClients() {
  try {
    await connectDB();
    await Client.sync();

    const existingCount = await Client.count();
    if (existingCount > 0) {
      console.log(`ℹ️ Clients table already has ${existingCount} records. Skipping seed.`);
    } else {
      await Client.bulkCreate(INITIAL_CLIENTS);
      console.log(`✅ Successfully seeded ${INITIAL_CLIENTS.length} client partner logos.`);
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed clients:", error);
    process.exit(1);
  }
}

seedClients();

