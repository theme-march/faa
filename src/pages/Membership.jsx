/* import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  }, [members, name, isLoading, isError, currentPage]);

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
 */

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

const PaginateButton = React.memo(
  ({ number, onClick, isActive, children, disabled }) => (
    <li
      className={`page-item ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <button
        onClick={() => onClick(number)}
        className="page-link"
        disabled={disabled}
      >
        {children || number}
      </button>
    </li>
  )
);

export default function Membership() {
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 80;
  const { search: searchTerm } = useSelector((state) => state.memberSearch);
  const { data: membersData, isLoading, isError } = useGetMembersListQuery();

  // Filter Members List Based on Search
  useEffect(() => {
    if (!membersData?.result) return;

    const lowerCasedSearch = searchTerm?.toLowerCase() || "";
    const filtered = membersData.result
      .filter((member) =>
        [
          member.name,
          member.designation_name,
          member.occupation,
          member.phone_number,
          member.hsc_passing_year,
          member.email,
          member.membership_number,
          member.session,
        ].some((field) => field?.toLowerCase().includes(lowerCasedSearch))
      )
      .sort((a, b) => b.id - a.id);

    setFilteredMembers(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [membersData, searchTerm, useSelector]);

  // Pagination Logic
  const totalPages = useMemo(
    () => Math.ceil(filteredMembers.length / itemsPerPage),
    [filteredMembers.length, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredMembers.slice(start, end);
  }, [filteredMembers, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  // Content Rendering Logic
  const renderContent = () => {
    if (isLoading)
      return Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
    if (isError)
      return <ErrorShow message="There was an error loading the data" />;
    if (!filteredMembers.length)
      return <ErrorShow message="No results found" />;

    return currentItems.map((member) => (
      <MemberCard key={member.id} props={member} />
    ));
  };

  return (
    <>
      <div className="ak-height-60 ak-height-lg-60"></div>
      <SearchMember />
      <div className="ak-height-50 ak-height-lg-30"></div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {renderContent()}
        </div>
      </div>

      {totalPages > 1 && (
        <>
          <div className="ak-height-20 ak-height-lg-20"></div>
          <div className="container">
            <ul className="pagination justify-content-center">
              <PaginateButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginateButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <PaginateButton
                    key={number}
                    number={number}
                    onClick={() => handlePageChange(number)}
                    isActive={currentPage === number}
                  />
                )
              )}

              <PaginateButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginateButton>
            </ul>
          </div>
        </>
      )}

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
