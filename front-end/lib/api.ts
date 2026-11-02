import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:5000";

/**
 * Global configured Axios client for API requests
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Automatically attach JWT token for authenticated requests
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("athul_admin_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Centralized response error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Optional: Handle token expiration
      // localStorage.removeItem("athul_admin_token");
    }
    return Promise.reject(error);
  }
);

/**
 * Helper to get the full absolute URL for uploaded media files
 * (handles relative paths like '/media/gallery/photo.webp' or external URLs)
 */
export function getMediaUrl(path?: string | null): string {
  if (!path) return "/placeholder-image.webp";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE_URL}${cleanPath}`;
}

export default api;

