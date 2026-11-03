import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryStats,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from "../controller/inquiryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public Lead Submission
router.post("/", createInquiry);

// Admin-Protected Routes
router.get("/stats", protect, getInquiryStats);
router.get("/", protect, getAllInquiries);
router.get("/:id", protect, getInquiryById);
router.patch("/:id/status", protect, updateInquiryStatus);
router.delete("/:id", protect, deleteInquiry);

export default router;
