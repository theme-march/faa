import { apiSlice } from "../api/apiSlice";

const memberApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    memberRegister: bulider.mutation({
      query: (data) => ({
        url: "/member_register",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["member"],
    }),
    memberSingIn: bulider.mutation({
      query: (data) => ({
        url: "/member_login",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["member"],
    }),

    memberGet: bulider.query({
      query: ({ name }) => ({
        url: `/member/?q=${name}`,
        method: "GET",
      }),
      //   providesTags: ["members"],
    }),

    memberGetId: bulider.query({
      query: (id) => ({
        url: `/members/${id}`,
        method: "GET",
      }),
      //   providesTags: ["membersById"],
    }),
  }),
});

export const { useMemberRegisterMutation, useMemberSingInMutation } = memberApi;
