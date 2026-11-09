/**
 * Central Application Configuration
 * Automatically detects environment or uses VITE_* env variables.
 */

export const getAdminBaseUrl = () => {
  if (import.meta.env.VITE_ADMIN_BASE_URL) {
    return import.meta.env.VITE_ADMIN_BASE_URL.replace(/\/+$/, "");
  }

  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return isLocal ? "http://localhost:3000" : "https://cms.faa-dubd.org";
};

export const ADMIN_BASE_URL = getAdminBaseUrl();
