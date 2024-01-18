import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["events", "eventsById"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.171.172:3000/api/v1",
  }),
  endpoints: (bulider) => ({}),
});
