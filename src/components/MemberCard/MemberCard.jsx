import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateFormat from "../DateFormat/DateFormat";
import { ButtonMore } from "../Button/Button";
import MembershipCategorynNameFind from "./MembershipCategorynNameFind";

const MemberCard = ({ props }) => {
  const {
    id,
    name,
    hsc_passing_year,
    admin_approval,
    membership_category_id,
    category_name,
    membership_category_name,
    organization_name,
    member_image,
  } = props;
  const navigate = useNavigate();
  const [imageCandidateIndex, setImageCandidateIndex] = useState(0);
  const initials = useMemo(
    () =>
      (name || "M")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(""),
    [name]
  );

  const resolvedCategoryName = category_name || membership_category_name || "";
  const categoryBadgeType = useMemo(() => {
    const text = String(resolvedCategoryName || "").toLowerCase();
    if (text.includes("lifetime")) return "lifetime";
    if (text.includes("general")) return "general";
    return "other";
  }, [resolvedCategoryName]);

  const memberImageCandidates = useMemo(() => {
    const value = String(member_image || "").trim();
    if (!value) return [];

    if (/^https?:\/\//i.test(value)) return [value];

    const backendOriginFromEnv = String(import.meta.env.VITE_BACKEND_ORIGIN || "").trim();
    const backendOrigin =
      backendOriginFromEnv ||
      `${window.location.protocol}//${window.location.hostname}:3000`;

    const normalizedValue = value.replace(/\\/g, "/");
    const fileName = normalizedValue.split("/").filter(Boolean).pop();
    const candidates = [];

    const addCandidate = (src) => {
      const key = String(src || "").trim();
      if (!key) return;
      if (!candidates.includes(key)) candidates.push(key);
    };

    const toBackendUrl = (path) =>
      path.startsWith("http")
        ? path
        : `${backendOrigin}${path.startsWith("/") ? path : `/${path}`}`;

    if (normalizedValue.startsWith("/")) {
      addCandidate(normalizedValue);
      addCandidate(toBackendUrl(normalizedValue));
    } else if (normalizedValue.startsWith("images/")) {
      addCandidate(`/${normalizedValue}`);
      addCandidate(toBackendUrl(`/${normalizedValue}`));
    } else if (normalizedValue.startsWith("member/")) {
      addCandidate(`/images/${normalizedValue}`);
      addCandidate(toBackendUrl(`/images/${normalizedValue}`));
    } else if (normalizedValue.startsWith("public/member/")) {
      addCandidate(`/images/member/${normalizedValue.replace("public/member/", "")}`);
      addCandidate(
        toBackendUrl(`/images/member/${normalizedValue.replace("public/member/", "")}`)
      );
    } else {
      addCandidate(`/images/member/${normalizedValue}`);
      addCandidate(toBackendUrl(`/images/member/${normalizedValue}`));
    }

    if (fileName) {
      addCandidate(`/images/member/${fileName}`);
      addCandidate(toBackendUrl(`/images/member/${fileName}`));
      addCandidate(`/member/${fileName}`);
      addCandidate(toBackendUrl(`/member/${fileName}`));
    }

    return candidates;
  }, [member_image]);

  useEffect(() => {
    setImageCandidateIndex(0);
  }, [memberImageCandidates]);

  const categoryBadge = useMemo(() => {
    if (!resolvedCategoryName) return null;
    return (
      <span className={`member-category-badge ${categoryBadgeType}`}>
        {resolvedCategoryName}
      </span>
    );
  }, [resolvedCategoryName, categoryBadgeType]);

  const handleClick = useCallback(() => {
    if (id) navigate(`/member-details/${id}`);
  }, [id, navigate]);
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="col h-100">
        <div className="member-card text-center h-100">
          <div
            className={`member-avatar ${
              memberImageCandidates.length > 0 && imageCandidateIndex < memberImageCandidates.length
                ? "has-image"
                : ""
            }`}
          >
            {memberImageCandidates.length > 0 &&
            imageCandidateIndex < memberImageCandidates.length ? (
              <img
                src={memberImageCandidates[imageCandidateIndex]}
                alt={name || "Member"}
                className="member-avatar-image"
                onError={() => {
                  setImageCandidateIndex((prev) =>
                    prev + 1 < memberImageCandidates.length ? prev + 1 : memberImageCandidates.length
                  );
                }}
              />
            ) : (
              initials || "M"
            )}
          </div>

          <p className="member-name ak-primary-color ak-font-18">
            {name || "N/A"}
          </p>

          {hsc_passing_year && (
            <p className="member-name member-meta">
              <span className="ms-1 ak-font-16">HSC/Equivalent: </span>
              {hsc_passing_year.length > 10 ? (
                <DateFormat props={hsc_passing_year} onlyYear={true} />
              ) : (
                hsc_passing_year
              )}
            </p>
          )}

          {admin_approval !== 0 &&
            (categoryBadge ||
              (membership_category_id && (
                <MembershipCategorynNameFind id={membership_category_id} asBadge={true} />
              )))}
          {organization_name && (
            <p className="member-name member-org">
              {organization_name}
            </p>
          )}
          <ButtonMore to={`/member-details/${id}`}>
            <span className="details-btn">View Details</span>
          </ButtonMore>
        </div>
      </div>
    </div>
  );
};

export default memo(MemberCard);
