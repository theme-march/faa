import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import { getAuthMemberId } from "../utils/authStorage";

export default function useSinginUser() {
  const authMemberId = getAuthMemberId();

  const {
    data: loginUserData,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberDetailsIdQuery(
    { id: authMemberId, viewer_id: authMemberId },
    { skip: !authMemberId }
  );

  if (isSuccess && !isError && !isLoading) {
    return { loginUserData, isLoading, isSuccess, isError };
  }
}
