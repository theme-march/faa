import { apiSlice } from "../api/apiSlice";

const jobsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getJobsList: bulider.query({
      query: () => ({
        url: `/job_list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobsListQuery } = jobsApi;
