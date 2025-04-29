
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import { clearSearch } from "../features/member/memberSearchSlice";
import Fuse from "fuse.js";

import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

const PaginateButton = React.memo(({ number, onClick, isActive, children, disabled }) => (
  <li className={`page-item ${isActive ? "active" : ""} ${disabled ? "disabled" : ""}`}>
    <button
      onClick={() => onClick(number)}
      className="page-link"
      disabled={disabled}
    >
      {children || number}
    </button>
  </li>
));

export default function Membership() {
  const dispatch = useDispatch();
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;

  const { search: searchTerm } = useSelector((state) => state.memberSearch);
  const { data: membersData, isLoading, isError } = useGetMembersListQuery();

  // Fuse.js search config
  const fuseOptions = useMemo(() => ({
    keys: [
      "name",
      "designation_name",
      "occupation",
      "phone_number",
      "hsc_passing_year",
      "email",
      "membership_number",
      "session",
    ],
    threshold: 0.3,
  }), []);

  // Reset search when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, [dispatch]);

  // Search and filter logic
  useEffect(() => {
    if (!membersData?.result) return;

    const fuse = new Fuse(membersData.result, fuseOptions);
    const results = searchTerm
      ? fuse.search(searchTerm).map((res) => res.item)
      : membersData.result;

    setFilteredMembers([...results].sort((a, b) => b.id - a.id));
    setCurrentPage(1);
  }, [membersData, searchTerm, fuseOptions]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [totalPages]);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
    }
    if (isError) {
      return <ErrorShow message="There was an error loading the data" />;
    }
    if (!filteredMembers.length) {
      return <ErrorShow message="No results found" />;
    }

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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <PaginateButton
                  key={number}
                  number={number}
                  onClick={() => handlePageChange(number)}
                  isActive={currentPage === number}
                />
              ))}

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
