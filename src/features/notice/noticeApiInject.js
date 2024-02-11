import { apiSlice } from "../api/apiSlice";

const noticeApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getNoticeList: bulider.query({
      query: () => ({
        url: `/notice_list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNoticeListQuery } = noticeApi;
