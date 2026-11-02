import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Gallery } from "../model/Gallery.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc   Get all gallery images (optional category filter)
 * @route  GET /api/gallery
 * @access Public
 */
export async function getAllGalleryImages(req, res, next) {
  try {
    const { category } = req.query;
    const where = {};

    if (category && category.toLowerCase() !== "all") {
      where.category = category;
    }

    const images = await Gallery.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Get single gallery image by ID
 * @route  GET /api/gallery/:id
 * @access Public
 */
export async function getGalleryImageById(req, res, next) {
  try {
    const image = await Gallery.findByPk(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: `Gallery image not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Upload and create a new gallery image
 * @route  POST /api/gallery
 * @access Admin (Protected)
 */
export async function createGalleryImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file (PNG, JPG, JPEG, WEBP)",
      });
    }

    const { caption, title, category, alt } = req.body;

    if (!caption || !caption.trim()) {
      // Clean up uploaded file if validation fails
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(400).json({
        success: false,
        message: "Image caption is required",
      });
    }

    // Relative web URL for static serving
    const imageUrl = `/media/gallery/${req.file.filename}`;

    const newImage = await Gallery.create({
      caption: caption.trim(),
      title: title?.trim() || "",
      category: category?.trim() || "Energy audits",
      imageUrl,
      alt: alt?.trim() || caption.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    // If database insertion failed, remove the uploaded file
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
}

/**
 * @desc   Delete a gallery image from database and disk
 * @route  DELETE /api/gallery/:id
 * @access Admin (Protected)
 */
export async function deleteGalleryImage(req, res, next) {
  try {
    const image = await Gallery.findByPk(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: `Gallery image not found with ID ${req.params.id}`,
      });
    }

    // Remove the physical file from media/gallery
    if (image.imageUrl && image.imageUrl.startsWith("/media/gallery/")) {
      const fileName = path.basename(image.imageUrl);
      const filePath = path.join(__dirname, "..", "media", "gallery", fileName);
      await fs.unlink(filePath).catch((err) => {
        console.warn(`File on disk could not be removed: ${filePath}`, err.message);
      });
    }

    await image.destroy();

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
}

