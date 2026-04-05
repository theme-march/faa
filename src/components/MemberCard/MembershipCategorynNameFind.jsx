import { useEffect, useMemo, useState } from "react";
import { useGetMembersCategoryListQuery } from "../../features/member/memberApiIn";

export default function MembershipCategorynNameFind({ label, id, asBadge = false }) {
  const {
    data: membership_category_id,
    isError,
  } = useGetMembersCategoryListQuery();
  const [MembershipCategoryData, setMembershipCategoryData] = useState({});

  useEffect(() => {
    const membership_category_name = membership_category_id?.result?.find(
      (element) => element.id == id
    );
    setMembershipCategoryData(membership_category_name);
  }, [membership_category_id, id]);

  const categoryName = useMemo(
    () => MembershipCategoryData?.category_name || "",
    [MembershipCategoryData]
  );
  const badgeType = useMemo(() => {
    const text = String(categoryName || "").toLowerCase();
    if (text.includes("lifetime")) return "lifetime";
    if (text.includes("general")) return "general";
    return "other";
  }, [categoryName]);

  if (isError) return null;

  if (asBadge && categoryName) {
    return (
      <span className={`member-category-badge ${badgeType}`}>
        {categoryName}
      </span>
    );
  }

  return (
    <div className="d-flex gap-3 align-items-center">
      {label && <h6>{label}:</h6>}
      {id && <p>{categoryName}</p>}
    </div>
  );
}
