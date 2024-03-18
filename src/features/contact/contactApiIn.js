import { apiSlice } from "../api/apiSlice";

const contactApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addContact: bulider.mutation({
      query: (data) => ({
        url: "/contact_save",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddContactMutation } = contactApi;
