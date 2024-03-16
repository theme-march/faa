import { apiSlice } from "../api/apiSlice";

const galleryApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getGalleryList: bulider.query({
      query: () => ({
        url: "/gallery",
        method: "GET",
      }),
      // providesTags: ["events"],
    }),
  }),
});

export const { useGetGalleryListQuery } = galleryApi;
