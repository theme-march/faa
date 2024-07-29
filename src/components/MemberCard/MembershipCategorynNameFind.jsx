import React, { useEffect, useState } from "react";
import { useGetMembersCategoryListQuery } from "../../features/member/memberApiIn";

export default function MembershipCategorynNameFind({ label, id }) {
  const {
    data: membership_category_id,
    isLoading,
    isError,
  } = useGetMembersCategoryListQuery();
  const [MembershipCategoryData, setMembershipCategoryData] = useState({});

  useEffect(() => {
    const membership_category_name = membership_category_id?.result?.find(
      (element) => element.id == id
    );
    setMembershipCategoryData(membership_category_name);
  }, [membership_category_id, id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Not loading data</p>;
  return (
    <div className="d-flex gap-3 align-items-center  p-2">
      {label && <h6>{label}:</h6>}
      {id && <p> {MembershipCategoryData?.category_name}</p>}
    </div>
  );
}
