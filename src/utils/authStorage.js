const USER_KEY = "user";
const TOKEN_KEY = "usertoken";
// UPDATED
const REFRESH_TOKEN_KEY = "userrefreshtoken";

function safeJsonParse(value, fallback = null) {
  try {
    return JSON.parse(value);
  } catch (_) {
    return fallback;
  }
}

export function decodeJwtPayload(token) {
  const rawToken = String(token || "").trim();
  if (!rawToken) return null;

  const parts = rawToken.split(".");
  if (parts.length !== 3) return null;

  try {
    const normalized = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payloadJson = atob(normalized);
    return safeJsonParse(payloadJson, null);
  } catch (_) {
    return null;
  }
}

export function getStoredUser() {
  // NEW: derive minimal identity from JWT only (avoid storing profile data in localStorage)
  localStorage.removeItem(USER_KEY);
  const memberId = getAuthMemberId();
  return memberId ? { id: memberId } : null;
}

export function getStoredToken() {
  return String(localStorage.getItem(TOKEN_KEY) || "").trim();
}

export function getStoredRefreshToken() {
  return String(localStorage.getItem(REFRESH_TOKEN_KEY) || "").trim();
}

export function isTokenValid(token = getStoredToken()) {
  const payload = decodeJwtPayload(token);
  const exp = Number(payload?.exp || 0);
  if (!exp) return false;
  return Date.now() < exp * 1000;
}

export function getTokenRemainingSeconds(token = getStoredToken()) {
  const payload = decodeJwtPayload(token);
  const exp = Number(payload?.exp || 0);
  if (!exp) return 0;
  const diff = exp * 1000 - Date.now();
  return diff > 0 ? Math.floor(diff / 1000) : 0;
}

export function getAuthMemberId() {
  const payload = decodeJwtPayload(getStoredToken());
  const tokenMemberId = payload?.userId ?? payload?.sub;
  return tokenMemberId ? String(tokenMemberId) : "";
}

export function setAuthSession({ token, refreshToken }) {
  // NEW: never persist member profile object in localStorage
  localStorage.removeItem(USER_KEY);

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function hasActiveSession() {
  const token = getStoredToken();
  if (!token || !isTokenValid(token)) return false;
  return Boolean(getAuthMemberId());
}
