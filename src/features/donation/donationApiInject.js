import { apiSlice } from "../api/apiSlice";

const donationApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    /*  getEventList: bulider.query({
      query: () => ({
        url: "/event_list",
      }),
    }),

    getEventDetailsId: bulider.query({
      query: (id) => ({
        url: `/event_details/${id}`,
        method: "GET",
      }),
    }), */

    AddDonationRegister: bulider.mutation({
      query: (data) => ({
        url: "/donation_register",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddDonationRegisterMutation } = donationApi;
