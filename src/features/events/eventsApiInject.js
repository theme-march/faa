import { apiSlice } from "../api/apiSlice";

const eventsApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addevent: bulider.mutation({
      query: (data) => ({
        url: "/event",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["events"],
    }),

    getEvents: bulider.query({
      query: () => ({
        url: "/evetns",
      }),
      // providesTags: ["events"],
    }),

    getEventId: bulider.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      // providesTags: ["eventsById"],
    }),
  }),
});

export const { useGetEventIdQuery, useGetEventsQuery, useAddeventMutation } =
  eventsApi;
