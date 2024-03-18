import { apiSlice } from "../api/apiSlice";

const pageDetails = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addPageDetails: bulider.mutation({
      query: (data) => ({
        url: "/page_details",
        method: "POST",
        body: data,
      }),
    }),

    getAboutUsMessage: bulider.query({
      query: () => ({
        url: "/about_us_message",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddPageDetailsMutation, useGetAboutUsMessageQuery } =
  pageDetails;
