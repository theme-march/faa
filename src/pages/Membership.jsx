import React from "react";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import { useSelector } from "react-redux";
import { selectorMember } from "../features/member/memberSelector";

export default function Membership() {
  const { search: name } = useSelector(selectorMember);

  return (
    <>
      <div className="ak-height-60 ak-height-lg-60"></div>
      <SearchMember />
      <div className="ak-height-50 ak-height-lg-30"></div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
