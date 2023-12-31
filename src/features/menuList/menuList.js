import { apiSlice } from "../api/apiSlice";

const menuListApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    /* addevent: bulider.mutation({
      query: (data) => ({
        url: "/event",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["events"],
    }), */

    getMenuList: bulider.query({
      query: () => ({
        url: "menu_list",
        method: "GET",
      }),
    }),
    /* 
    getEventId: bulider.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: ["eventsById"],
    }), */
  }),
});

export const { useGetMenuListQuery } = menuListApi;
