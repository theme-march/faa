import { apiSlice } from "../api/apiSlice";

const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    memberRegister: builder.mutation({
      query: (data) => ({
        url: "/member_register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["members", "memberMeta"],
    }),

    memberSingIn: builder.mutation({
      query: (data) => ({
        url: "/member_login",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: data,
      }),
    }),

    memberSession: builder.query({
      query: () => ({
        url: "/member_session",
        method: "GET",
      }),
    }),

    memberForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/member_forgot_password",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),

    memberResetPassword: builder.mutation({
      query: (data) => ({
        url: "/member_reset_password",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),

    memberUpdatePassword: builder.mutation({
      query: (data) => ({
        url: "/change_password",
        method: "POST",
        body: data,
      }),
    }),
    updateMemberInfo: builder.mutation({
      query: (data) => ({
        url: "/member_update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) =>
        arg?.id
          ? ["members", "memberMeta", { type: "memberDetails", id: String(arg.id) }]
          : ["members", "memberMeta"],
    }),

    memberListApproved: builder.mutation({
      query: (data) => ({
        url: "/member_list_for_approved",
        method: "POST",
        body: data,
      }),
    }),

    memberApproved: builder.mutation({
      query: (data) => ({
        url: "/member_approved",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["members", "memberMeta", "memberDetails"],
    }),

    getMemberDetailsId: builder.query({
      query: (arg) => {
        // UPDATED
        const input = typeof arg === "object" && arg !== null ? arg : { id: arg };
        const id = input?.id;
        return {
          url: `/user_details/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [{ type: "memberDetails", id: String(arg?.id || arg) }],
    }),



    getMembersList: builder.query({
      query: (params = {}) => ({
        url: `/member_list`,
        method: "GET",
        params,
      }),
      providesTags: (result) => {
        const resultData = result?.result;
        const rows = Array.isArray(resultData)
          ? resultData
          : resultData?.rows || resultData?.data || resultData?.members || resultData?.list || [];
        const rowTags = Array.isArray(rows)
          ? rows
            .map((row) => row?.id)
            .filter(Boolean)
            .map((id) => ({ type: "memberDetails", id: String(id) }))
          : [];
        return ["members", ...rowTags];
      },
    }),

    getMembersCategoryList: builder.query({
      query: () => ({
        url: `/category_list`,
        method: "GET",
      }),
      providesTags: ["memberCategories"],
    }),

    getMembersSessionList: builder.query({
      query: () => ({
        url: `/batch_session_list`,
        method: "GET",
      }),
    }),

    getMembersOccupationList: builder.query({
      query: () => ({
        url: `/occupation_list`,
        method: "GET",
      }),
    }),

    getExpeirGenaralMembersList: builder.query({
      // UPDATED
      query: (memberId) => ({
        url: `/expired-only`,
        method: "GET",
        params: memberId ? { member_id: memberId } : undefined,
      }),
      providesTags: ["memberMeta"],
    }),
  }),
});

export const {
  useMemberRegisterMutation,
  useMemberSingInMutation,
  useMemberSessionQuery,
  useMemberForgotPasswordMutation,
  useMemberResetPasswordMutation,
  useMemberListApprovedMutation,
  useMemberApprovedMutation,
  useGetMemberDetailsIdQuery,
  useGetMembersListQuery,
  useGetMembersCategoryListQuery,
  useGetMembersOccupationListQuery,
  useGetMembersSessionListQuery,
  useMemberUpdatePasswordMutation,
  useUpdateMemberInfoMutation,
  useGetExpeirGenaralMembersListQuery,
} = memberApi;
