import axios, { type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:5000/api";

export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL !== undefined
    ? process.env.NEXT_PUBLIC_MEDIA_URL
    : "http://localhost:5000";

export const AUTH_TOKEN_KEY = "athul_admin_token";

/**
 * Global configured Axios client for API requests
 * withCredentials: true ensures httpOnly refreshToken cookie is automatically included
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Automatically attach JWT Access Token for authenticated requests
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Concurrency queue to handle multiple 401s without multiple refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Response Interceptor:
 * If an Access Token expires (HTTP 401), automatically call /auth/refresh
 * using the httpOnly refreshToken cookie, save the new Access Token, and retry.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt refresh on login or refresh endpoint itself
    const isAuthRoute =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRoute) {
      if (isRefreshing) {
        // If a refresh is already underway, queue this request until it finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call backend refresh endpoint (sends httpOnly cookie automatically)
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          refreshResponse.data?.accessToken || refreshResponse.data?.token;

        if (newAccessToken && typeof window !== "undefined") {
          localStorage.setItem(AUTH_TOKEN_KEY, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return api(originalRequest);
        } else {
          throw new Error("No access token returned from refresh endpoint");
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          // If the user is on an admin dashboard page, redirect them to login
          if (window.location.pathname.startsWith("/dashboard")) {
            window.location.href = "/login?expired=true";
          }
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Logout helper:
 * Clears backend httpOnly cookie, removes local access token, and redirects to login
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Ignore error if already unauthenticated
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/login";
    }
  }
}

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
  if (!MEDIA_BASE_URL) {
    return cleanPath;
  }
  return `${MEDIA_BASE_URL}${cleanPath}`;
}

export default api;

