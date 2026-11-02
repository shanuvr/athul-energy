import express from "express";
import {
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  deleteGalleryImage,
} from "../controller/galleryController.js";
import { galleryUpload } from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getAllGalleryImages);
router.get("/:id", getGalleryImageById);

// Admin routes (file upload handling)
router.post("/", galleryUpload.single("image"), createGalleryImage);
router.delete("/:id", deleteGalleryImage);

export default router;

