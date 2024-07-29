/* import React, { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import { useSelector } from "react-redux";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Membership() {
  const [membersList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(80);

  const { search: name } = useSelector((state) => state.memberSearch);
  const { data: members, isLoading, isError } = useGetMembersListQuery();
  useEffect(() => {
    if (!isLoading && !isError && members?.result.length > 0) {
      let filteredList = members.result;
      if (name) {
        const searchTerm = name.toLowerCase();
        filteredList = filteredList.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchTerm) ||
            item?.designation_name?.toLowerCase().includes(searchTerm) ||
            item?.occupation?.toLowerCase().includes(searchTerm) ||
            item?.phone_number?.toLowerCase().includes(searchTerm) ||
            item?.hsc_passing_year?.toLowerCase().includes(searchTerm) ||
            item?.email?.toLowerCase().includes(searchTerm) ||
            item?.membership_number?.toLowerCase().includes(searchTerm) ||
            item?.session?.toLowerCase().includes(searchTerm)
        );
      }

      setMemberList(filteredList);
      setCurrentPage(1);
    }
  }, [members, name, isLoading, isError]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = membersList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(membersList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  } else if (isError) {
    content = <ErrorShow message={"There was an error"} />;
  } else if (membersList.length === 0) {
    content = <ErrorShow message={"No data found"} />;
  } else {
    content = currentItems.map((item) => (
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

      <div className="ak-height-20 ak-height-lg-20"></div>
      <div className="container">
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
} */

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

const PaginateButton = React.memo(({ number, onClick }) => (
  <li className="page-item">
    <button onClick={() => onClick(number)} className="page-link">
      {number}
    </button>
  </li>
));

export default function Membership() {
  const [membersList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;

  const { search: name } = useSelector((state) => state.memberSearch);
  const { data: members, isLoading, isError } = useGetMembersListQuery();

  useEffect(() => {
    if (isLoading || isError || !members?.result.length) return;

    let filteredList = members.result;

    if (name) {
      const searchTerm = name.toLowerCase();
      filteredList = filteredList.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchTerm) ||
          item?.designation_name?.toLowerCase().includes(searchTerm) ||
          item?.occupation?.toLowerCase().includes(searchTerm) ||
          item?.phone_number?.toLowerCase().includes(searchTerm) ||
          item?.hsc_passing_year?.toLowerCase().includes(searchTerm) ||
          item?.email?.toLowerCase().includes(searchTerm) ||
          item?.membership_number?.toLowerCase().includes(searchTerm) ||
          item?.session?.toLowerCase().includes(searchTerm)
      );
    }

    setMemberList(filteredList);
    setCurrentPage(1);
  }, [members, name, isLoading, isError]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => membersList.slice(indexOfFirstItem, indexOfLastItem),
    [membersList, indexOfFirstItem, indexOfLastItem]
  );

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(membersList.length / itemsPerPage) },
        (_, i) => i + 1
      ),
    [membersList.length]
  );

  let content;
  if (isLoading) {
    content = Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
  } else if (isError) {
    content = <ErrorShow message={"There was an error loading the data"} />;
  } else if (!membersList.length) {
    content = <ErrorShow message={"No data found"} />;
  } else {
    content = currentItems.map((item) => (
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

      <div className="ak-height-20 ak-height-lg-20"></div>
      <div className="container">
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <PaginateButton key={number} number={number} onClick={paginate} />
          ))}
        </ul>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
