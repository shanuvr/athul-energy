import express from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
} from "../controller/clientController.js";
import { protect } from "../middleware/auth.js";
import { createUploader } from "../middleware/upload.js";

const router = express.Router();

// Setup Multer uploader for clients media folder
const upload = createUploader("clients", [".png", ".jpg", ".jpeg", ".webp", ".svg"], 10);

// Public routes
router.get("/", getAllClients);
router.get("/:id", getClientById);

// Protected Admin routes
router.post("/", protect, upload.single("logo"), createClient);
router.delete("/:id", protect, deleteClient);

export default router;

