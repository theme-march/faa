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

    /*  getPageDetails: bulider.query({
      query: () => ({
        url: "page_details",
        method: "GET",
      }),
    }), */
  }),
});

export const { useAddPageDetailsMutation } = pageDetails;
