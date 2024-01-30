import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";

export default function useSinginUser() {
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const {
    data: loginUserData,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id);

  if (isSuccess && !isError && !isLoading) {
    return { loginUserData, isLoading, isSuccess, isError };
  }
}
