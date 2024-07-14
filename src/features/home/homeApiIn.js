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
    getHomePopup: bulider.query({
      query: () => ({
        url: "/home_popup",
        method: "GET",
      }),
      //   providesTags: ["homeTags"],
    }),
    getMilestoneProgram: bulider.query({
      query: () => ({
        url: "/programs_list",
        method: "GET",
      }),
      //   providesTags: ["homeTags"],
    }),
    getMilestoneProgramId: bulider.query({
      query: (id) => ({
        url: `/programs_details?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetHomeIdQuery,
  useGetHomeSliderQuery,
  useGetHomePopupQuery,
  useGetMilestoneProgramQuery,
  useGetMilestoneProgramIdQuery,
} = homeApi;
