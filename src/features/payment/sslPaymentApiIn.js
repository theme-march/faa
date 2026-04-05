import { apiSlice } from "../api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getPaymentSettings: bulider.query({
      query: () => ({
        url: "/payment_settings",
        method: "GET",
      }),
    }),

    memberPayment: bulider.mutation({
      query: (data) => ({
        url: "/payment_membership",
        method: "POST",
        body: data,
      }),
    }),

    donationPayment: bulider.mutation({
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
export const {
  useGetPaymentSettingsQuery,
  useDonationPaymentMutation,
  useMemberPaymentMutation,
  usePaymentStatusQuery,
} = paymentApi;
