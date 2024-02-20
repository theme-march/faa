import { apiSlice } from "../api/apiSlice";

const newsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getNewsList: bulider.query({
      query: ({ type }) => ({
        url: `/publication?type=${type}`,
        method: "GET",
      }),
    }),
    getScrollingNewList: bulider.query({
      query: () => ({
        url: `/scrolling_news_list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewsListQuery, useGetScrollingNewListQuery } = newsApi;
