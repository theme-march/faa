import { useEffect } from "react";
import { useMemberSessionQuery } from "../../features/member/memberApiIn";
import {
  clearAuthSession,
  getStoredToken,
  getStoredRefreshToken,
  isTokenValid,
  setAuthSession,
} from "../../utils/authStorage";

export default function AuthSessionSync() {
  const token = getStoredToken();
  const canValidateSession = Boolean(token && isTokenValid(token));

  const { data, isError } = useMemberSessionQuery(undefined, {
    skip: !canValidateSession,
  });

  const hasValidSessionUser = Boolean(data?.result?.id);

  useEffect(() => {
    if (!canValidateSession) {
      clearAuthSession();
      return;
    }

    if (isError) {
      clearAuthSession();
      return;
    }

    if (!hasValidSessionUser) return;

    // UPDATED
    setAuthSession({
      token,
      refreshToken: getStoredRefreshToken(),
    });
  }, [canValidateSession, hasValidSessionUser, isError, token]);

  return null;
}
