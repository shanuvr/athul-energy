import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Admin } from "../model/Admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  process.env.JWT_SECRET ||
  "athul_energy_access_token_secret_key_2026";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  "athul_energy_refresh_token_secret_key_2026";

const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// Cookie helper
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  };
}

/**
 * @desc   Authenticate Admin and issue Access Token + Refresh Token (in httpOnly cookie)
 * @route  POST /api/auth/login
 * @access Public
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify bcrypt password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };

    // 1. Generate short-lived Access Token (15 mins)
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    });

    // 2. Generate long-lived Refresh Token (7 days)
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    // 3. Set Refresh Token in secure, httpOnly cookie
    res.cookie("refreshToken", refreshToken, getCookieOptions());

    // 4. Return Access Token in JSON response for client-side storage (localStorage)
    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      accessToken,
      token: accessToken, // for backward compatibility
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    if (
      error.name?.startsWith("Sequelize") ||
      error.original?.code === "ECONNREFUSED"
    ) {
      console.error("❌ Database connection error during login:", error.message);
      return res.status(503).json({
        success: false,
        message: "Database connection failed. Please ensure MySQL is running on port 3306.",
      });
    }
    next(error);
  }
}

/**
 * @desc   Issue new Access Token using valid Refresh Token cookie
 * @route  POST /api/auth/refresh
 * @access Public (reads httpOnly cookie)
 */
export async function refreshToken(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided. Please log in again.",
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is invalid or expired. Please log in again.",
      });
    }

    // Verify admin still exists in database
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found. Please log in again.",
      });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };

    // Generate new Access Token
    const newAccessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      token: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Clear Refresh Token cookie and log out
 * @route  POST /api/auth/logout
 * @access Public
 */
export async function logout(req, res, next) {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Get current logged-in admin
 * @route  GET /api/auth/me
 * @access Protected
 */
export async function getMe(req, res, next) {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ["password"] },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
}

