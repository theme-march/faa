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

    AddEventRegister: bulider.mutation({
      query: (data) => ({
        url: "/event_register",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["member"],
    }),
    AddEventSponsorRegister: bulider.mutation({
      query: (data) => ({
        url: "/event_sponsor_register",
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["member"],
    }),
  }),
});

export const {
  useGetEventListQuery,
  useGetEventDetailsIdQuery,
  useAddEventRegisterMutation,
  useAddEventSponsorRegisterMutation,
} = eventsApi;
