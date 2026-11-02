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
import galleryRoutes from "./routes/galleryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

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
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Static Media Folder (serves uploaded gallery photos, blog covers, PDFs, logos)
app.use("/media", express.static(path.join(__dirname, "media")));

// Root & Health Check Routes
app.get("/", (req, res) => {
  res.json({
    name: "Athul Energy Consultants API",
    status: "online",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);

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
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server after connecting to Database
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Athul Energy API Server running on port ${PORT} [ESM]`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log(`📁 Static Media: http://localhost:${PORT}/media`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error("Failed to start server due to database error:", error.message);
    process.exit(1);
  }
}

startServer();
