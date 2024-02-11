import { apiSlice } from "../api/apiSlice";

const newsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getNewsList: bulider.query({
      query: ({ type }) => ({
        url: `/publication?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewsListQuery } = newsApi;
