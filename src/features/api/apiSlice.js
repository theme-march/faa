import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  clearAuthSession,
  getStoredRefreshToken,
  getStoredToken,
  isTokenValid,
  setAuthSession,
} from "../../utils/authStorage";

// UPDATED
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    const token = getStoredToken();
    if (token && isTokenValid(token)) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// UPDATED
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const isUnauthorized = result?.error?.status === 401;
  const isRefreshCall =
    typeof args === "string"
      ? String(args).includes("/auth/refresh")
      : String(args?.url || "").includes("/auth/refresh");

  if (isUnauthorized && !isRefreshCall) {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      clearAuthSession();
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.success) {
      const nextAccessToken =
        refreshResult.data.access_token || refreshResult.data.token || "";
      const nextRefreshToken =
        refreshResult.data.refresh_token || refreshToken;

      setAuthSession({
        token: nextAccessToken,
        refreshToken: nextRefreshToken,
      });

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAuthSession();
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  keepUnusedDataFor: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  tagTypes: [
    "events",
    "eventsById",
    "members",
    "memberDetails",
    "memberMeta",
    "memberCategories",
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
