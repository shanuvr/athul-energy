import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleFeatured,
  togglePublish,
} from "../controller/blogController.js";
import { protect } from "../middleware/auth.js";
import { blogUpload } from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Protected Admin routes
router.post("/", protect, blogUpload.single("coverImage"), createBlog);
router.put("/:id", protect, blogUpload.single("coverImage"), updateBlog);
router.delete("/:id", protect, deleteBlog);
router.patch("/:id/toggle-featured", protect, toggleFeatured);
router.patch("/:id/toggle-publish", protect, togglePublish);

export default router;

