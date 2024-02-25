import React, { useEffect } from "react";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import { useSelector } from "react-redux";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useState } from "react";

export default function Membership() {
  const [membersList, setMemberList] = useState([]);

  const { search: name } = useSelector((state) => state.memberSearch);
  const { data: members, isLoading, isError } = useGetMembersListQuery();

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && members?.result.length < 0) {
    content = <ErrorShow message={"No data found"} />;
  }

  useEffect(() => {
    if (!isLoading && !isError && members?.result.length > 0) {
      const filterList = members.result.filter((item) => {
        const itemName = item.name.toLowerCase();
        const userTypeText = name.toLowerCase();
        return itemName?.indexOf(userTypeText) > -1;
      });

      if (filterList) {
        setMemberList(filterList);
      } else {
        setMemberList(members.result);
      }
    }
  }, [members, name]);

  if (membersList.length > 0) {
    content = membersList?.map((item) => (
      <MemberCard key={item.id} props={item} />
    ));
  }

  return (
    <>
      <div className="ak-height-60 ak-height-lg-60"></div>
      <SearchMember />
      <div className="ak-height-50 ak-height-lg-30"></div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {content}
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
