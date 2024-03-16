import { apiSlice } from "../api/apiSlice";

const homeApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getHomeId: bulider.query({
      query: () => ({
        url: "/home_page",
        method: "GET",
      }),
      //   providesTags: ["homeTags"],
    }),
    getHomeSlider: bulider.query({
      query: () => ({
        url: "/home_slider",
        method: "GET",
      }),
      //   providesTags: ["homeTags"],
    }),
  }),
});

export const { useGetHomeIdQuery, useGetHomeSliderQuery } = homeApi;
