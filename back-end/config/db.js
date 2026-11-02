import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "athul_energy_db";

// Sequelize instance
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

/**
 * Ensures the database exists and establishes connection
 */
export async function connectDB() {
  try {
    // 1. Try to create database if it doesn't exist (Local dev)
    // On cPanel, databases are created in cPanel UI so CREATE DATABASE may be restricted;
    // we catch and proceed to connect to the existing database.
    try {
      const connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
      await connection.end();
    } catch {
      // Proceed to authenticate with the existing cPanel database
    }

    // 2. Authenticate Sequelize connection
    await sequelize.authenticate();
    console.log(`✅ MySQL Database connected: [${DB_NAME}] on ${DB_HOST}:${DB_PORT}`);
    return true;
  } catch (error) {
    console.error(`❌ Database connection failed:`, error.message);
    throw error;
  }
}

export default {
  sequelize,
  connectDB,
};
