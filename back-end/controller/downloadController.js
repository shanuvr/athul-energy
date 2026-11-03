import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Op } from "sequelize";
import { Download } from "../model/Download.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatBytes(bytes) {
  if (bytes === 0) return "0 KB";
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

/**
 * @desc   Get all downloads (with optional category, search, and limit filters)
 * @route  GET /api/downloads
 * @access Public
 */
export async function getAllDownloads(req, res, next) {
  try {
    const { category, search, limit } = req.query;
    const where = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      where[Op.or] = [
        { title: { [Op.like]: q } },
        { category: { [Op.like]: q } },
        { year: { [Op.like]: q } },
      ];
    }

    const queryOptions = {
      where,
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
    };

    if (limit && !isNaN(Number(limit))) {
      queryOptions.limit = Number(limit);
    }

    const downloads = await Download.findAll(queryOptions);

    return res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    if (
      error.name?.startsWith("Sequelize") ||
      error.original?.code === "ECONNREFUSED"
    ) {
      console.error("❌ Database error during getAllDownloads:", error.message);
      return res.status(503).json({
        success: false,
        message: "Database service unavailable. Please check MySQL connection.",
        data: [],
      });
    }
    next(error);
  }
}

/**
 * @desc   Get single download by ID
 * @route  GET /api/downloads/:id
 * @access Public
 */
export async function getDownloadById(req, res, next) {
  try {
    const item = await Download.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Download not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Upload and create a new download document
 * @route  POST /api/downloads
 * @access Admin (Protected)
 */
export async function createDownload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF document (.pdf file)",
      });
    }

    const { title, category, year, order } = req.body;

    if (!title || !title.trim()) {
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(400).json({
        success: false,
        message: "Document name is required",
      });
    }

    const fileUrl = `/media/downloads/${req.file.filename}`;
    const fileSize = formatBytes(req.file.size);
    const docYear = year && year.trim() ? year.trim() : new Date().getFullYear().toString();

    const newDoc = await Download.create({
      title: title.trim(),
      category: category && category.trim() ? category.trim() : "Government Orders",
      fileUrl,
      fileName: req.file.originalname,
      fileSize,
      year: docYear,
      displayOrder: order && !isNaN(Number(order)) ? Number(order) : 0,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: newDoc,
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
}

/**
 * @desc   Delete download by ID
 * @route  DELETE /api/downloads/:id
 * @access Admin (Protected)
 */
export async function deleteDownload(req, res, next) {
  try {
    const item = await Download.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Document not found with ID ${req.params.id}`,
      });
    }

    // Delete physical file if inside /media/downloads/
    if (item.fileUrl && item.fileUrl.startsWith("/media/downloads/")) {
      const filename = path.basename(item.fileUrl);
      const filePath = path.join(__dirname, "..", "media", "downloads", filename);
      await fs.unlink(filePath).catch(() => {});
    }

    await item.destroy();

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getAllDownloads,
  getDownloadById,
  createDownload,
  deleteDownload,
};

