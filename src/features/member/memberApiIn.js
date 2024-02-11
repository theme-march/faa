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

    memberListApproved: bulider.mutation({
      query: (data) => ({
        url: "/member_list_for_approved",
        method: "POST",
        body: data,
      }),
    }),

    memberApproved: bulider.mutation({
      query: (data) => ({
        url: "/member_approved",
        method: "POST",
        body: data,
      }),
    }),

    getMemberDetailsId: bulider.query({
      query: (id) => ({
        url: `/user_details/${id}`,
        method: "GET",
      }),
    }),

    getMembersList: bulider.query({
      query: () => ({
        url: `/member_list`,
        method: "GET",
      }),
    }),
    /* getMembersList: bulider.query({
      query: ({ name }) => ({
        url: `member_list?name=${name}`,
        method: "GET",
      }),
    }), */
  }),
});

export const {
  useMemberRegisterMutation,
  useMemberSingInMutation,
  useMemberListApprovedMutation,
  useMemberApprovedMutation,
  useGetMemberDetailsIdQuery,
  useGetMembersListQuery,
} = memberApi;
