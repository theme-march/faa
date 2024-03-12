import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["events", "eventsById"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/",
  }),
  endpoints: (bulider) => ({}),
});
