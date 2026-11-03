import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a Multer upload middleware configured for a specific subfolder inside 'media/'
 * @param {string} subfolder - The folder name under media (e.g., 'gallery', 'blog', 'downloads')
 * @param {Array<string>} allowedExtensions - List of valid file extensions
 * @param {number} maxFileSizeMB - Maximum file size in MB
 */
export function createUploader(
  subfolder = "gallery",
  allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg"],
  maxFileSizeMB = 10
) {
  const uploadDir = path.join(__dirname, "..", "media", subfolder);

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Clean base name: remove special characters, replace spaces with hyphens
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50);

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
      cb(null, `${uniqueSuffix}-${baseName}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type '${ext}'. Allowed types: ${allowedExtensions.join(
            ", "
          )}`
        ),
        false
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxFileSizeMB * 1024 * 1024,
    },
  });
}

// Pre-configured uploader for Gallery images
export const galleryUpload = createUploader("gallery", [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

// Pre-configured uploader for Blog cover images (max 10MB)
export const blogUpload = createUploader("blog", [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
], 10);

export default galleryUpload;
