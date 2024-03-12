import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["events", "eventsById"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (bulider) => ({}),
});
