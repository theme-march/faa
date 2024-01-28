import { apiSlice } from "../api/apiSlice";

const eventsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getEventList: bulider.query({
      query: () => ({
        url: "/event_list",
      }),
      // providesTags: ["events"],
    }),

    getEventDetailsId: bulider.query({
      query: (id) => ({
        url: `/event_details/${id}`,
        method: "GET",
      }),
      // providesTags: ["eventsById"],
    }),
  }),
});

export const { useGetEventListQuery, useGetEventDetailsIdQuery } = eventsApi;
