import { apiSlice } from "../api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    memberPayment: bulider.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),

    paymentStatus: bulider.query({
      query: (tr_id) => ({
        url: `/status?tr_id=${tr_id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useMemberPaymentMutation, usePaymentStatusQuery } = paymentApi;
