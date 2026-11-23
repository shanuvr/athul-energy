import express from "express";
import {
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  deleteGalleryImage,
} from "../controller/galleryController.js";
import { galleryUpload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllGalleryImages);
router.get("/:id", getGalleryImageById);

// Admin routes (protected + file upload handling)
router.post("/", protect, galleryUpload.single("image"), createGalleryImage);
router.delete("/:id", protect, deleteGalleryImage);

export default router;

