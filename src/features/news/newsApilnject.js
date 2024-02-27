import { apiSlice } from "../api/apiSlice";

const newsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getNewsList: bulider.query({
      query: ({ type }) => ({
        url: `/publication?type=${type}`,
        method: "GET",
      }),
    }),
    getNewsDetailsId: bulider.query({
      query: (id) => ({
        url: `/news_details/${id}`,
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

export const {
  useGetNewsListQuery,
  useGetScrollingNewListQuery,
  useGetNewsDetailsIdQuery,
} = newsApi;
