import express from "express";
import {
  getAllDownloads,
  getDownloadById,
  createDownload,
  deleteDownload,
} from "../controller/downloadController.js";
import { protect } from "../middleware/auth.js";
import { createUploader } from "../middleware/upload.js";

const router = express.Router();

// Setup Multer uploader for downloads folder (.pdf only, max 120MB)
const upload = createUploader("downloads", [".pdf"], 120);

// Public routes
router.get("/", getAllDownloads);
router.get("/:id", getDownloadById);

// Protected Admin routes
router.post("/", protect, upload.single("file"), createDownload);
router.delete("/:id", protect, deleteDownload);

export default router;

