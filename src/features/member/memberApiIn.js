import { apiSlice } from "../api/apiSlice";

const memberApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addMember: bulider.mutation({
      query: (data) => ({
        url: "/member",
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["member"],
    }),

    getMember: bulider.query({
      query: ({ name }) => ({
        url: `/member/?q=${name}`,
        method: "GET",
      }),
      //   providesTags: ["members"],
    }),

    getMemberId: bulider.query({
      query: (id) => ({
        url: `/members/${id}`,
        method: "GET",
      }),
      //   providesTags: ["membersById"],
    }),
  }),
});

export const { useAddMemberMutation, useGetMemberQuery, useGetMemberIdQuery } =
  memberApi;
