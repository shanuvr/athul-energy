import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import { connectDB } from "./config/db.js";
import { initDB } from "./config/initDB.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import { generateSitemapXml, syncSitemapFiles } from "./utils/sitemapGenerator.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware (configured to allow static media access from frontend)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS configuration (allow requests from Next.js front-end)
const allowedOrigins = [
  "http://localhost:3000",
  "https://new.athulenergy.com",
  "https://athulenergy.com",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive during development
    },
    credentials: true,
  })
);

// Request Logger
app.use(morgan("dev"));

// Cookie Parser Middleware
app.use(cookieParser());

// Body Parsing Middleware
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));

// Static Media Folder (serves uploaded gallery photos, blog covers, PDFs, logos)
app.use(
  "/media",
  express.static(path.join(__dirname, "media"), {
    maxAge: "7d",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  })
);

// Root & Health Check Routes
app.get("/", (req, res) => {
  res.json({
    name: "Athul Energy Consultants API",
    status: "online",
    environment: process.env.NODE_ENV || "production",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes (supports both direct and Passenger /api base URI)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/gallery", galleryRoutes);
app.use("/gallery", galleryRoutes);

app.use("/api/clients", clientRoutes);
app.use("/clients", clientRoutes);

app.use("/api/downloads", downloadRoutes);
app.use("/downloads", downloadRoutes);

app.use("/api/blog", blogRoutes);
app.use("/blog", blogRoutes);

app.use("/api/inquiries", inquiryRoutes);
app.use("/inquiries", inquiryRoutes);

// Dynamic SEO Sitemap endpoint (served directly from live database)
const handleSitemapRequest = async (req, res) => {
  try {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const protocol = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
    const siteUrl = process.env.SITE_URL || `${protocol}://${host}`;
    const xml = await generateSitemapXml(siteUrl);
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.header("Cache-Control", "public, max-age=1800, s-maxage=3600");
    return res.status(200).send(xml);
  } catch (err) {
    console.error("Error serving dynamic sitemap:", err);
    res.status(500).send("Error generating dynamic sitemap");
  }
};

app.get("/sitemap.xml", handleSitemapRequest);
app.get("/api/sitemap.xml", handleSitemapRequest);

// 404 Fallback Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: [${req.method}] ${req.originalUrl}`,
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack || err);
  const isDbError =
    err.name?.startsWith("Sequelize") ||
    err.original?.code === "ECONNREFUSED" ||
    err.code === "ECONNREFUSED";
  const status = isDbError ? 503 : (err.status || 500);
  const message = isDbError
    ? "Database service is temporarily unavailable. Please verify MySQL connection on port 3306."
    : (err.message || "Internal Server Error");

  res.status(status).json({
    success: false,
    message,
  });
});

// Start Server after connecting to Database & Auto-seeding
async function startServer() {
  try {
    await connectDB();
    await initDB();
    console.log("Database connected and initialized successfully.");
    try {
      await syncSitemapFiles();
    } catch (e) {
      console.warn("Initial sitemap sync skipped:", e.message);
    }
  } catch (error) {
    console.error("Database connection warning:", error.message);
    try {
      const fs = await import("fs");
      fs.appendFileSync(
        path.join(__dirname, "startup-error.log"),
        `[${new Date().toISOString()}] ${error.stack || error.message}\n`
      );
    } catch {}
  }

  // Always listen so Passenger/LiteSpeed gets HTTP response (prevents 503)
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Athul Energy API Server running on port ${PORT} [ESM]`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`📁 Static Media: http://localhost:${PORT}/media`);
    console.log(`===============================================`);
  });
}

startServer();
