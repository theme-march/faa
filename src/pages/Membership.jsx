

import React, {
  useEffect,
  useState,
  useMemo,
  useDeferredValue,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import { clearSearch } from "../features/member/memberSearchSlice";

import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

/* ================= PAGINATION BUTTON ================= */
const PaginateButton = React.memo(
  ({ number, onClick, isActive, children, disabled }) => (
    <li
      className={`page-item ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <button
        type="button"
        className="page-link"
        onClick={onClick}
        disabled={disabled}
      >
        {children || number}
      </button>
    </li>
  )
);

/* ================= SINGLE ALPHABET BUTTON ================= */
const AlphabetButton = React.memo(({ isActive, onToggle }) => {
  return (
    <div className="text-center">
      <button
        type="button"
        className={`ak-alpha-btn ${isActive ? "active" : ""}`}
        onClick={onToggle}
      >
        SORT (A–Z)
      </button>
    </div>
  );
});

/* ================= MAIN ================= */
export default function Membership() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [alphabetSort, setAlphabetSort] = useState(false);

  const itemsPerPage = 80;

  const { search = "" } = useSelector((state) => state.memberSearch);
  const deferredSearch = useDeferredValue(search.trim());

  const { data, isLoading, isError } = useGetMembersListQuery();

  /* ===== clear search on unmount ===== */
  useEffect(() => {
    return () => dispatch(clearSearch());
  }, [dispatch]);

  /* ================= NORMALIZE DATA ================= */
  const members = useMemo(() => {
    if (!data?.result) return [];

    return data.result.map((m) => ({
      ...m,
      safeName: (m.name || "").trim(),
      safeUpper: (m.name || "").trim().toUpperCase(),
    }));
  }, [data]);

  /* ================= FUSE ================= */
  const fuse = useMemo(() => {
    if (!members.length) return null;

    return new Fuse(members, {
      keys: [
        "safeName",
        "membership_number",
        "organization_name",
        "phone_number",
        "email",
        "session",
      ],
      threshold: 0.3,
    });
  }, [members]);

  /* ================= FILTER + SORT PIPELINE ================= */
  const filteredMembers = useMemo(() => {
    let list = members;

    // 🔍 Search
    if (deferredSearch && fuse) {
      list = fuse.search(deferredSearch).map((r) => r.item);
    }

    // 🔤 Alphabet priority sort (A → Z)
    if (alphabetSort) {
      list = [...list].sort((a, b) =>
        a.safeUpper.localeCompare(b.safeUpper)
      );
    }

    // ⬇️ Default sort (latest first)
    if (!deferredSearch && !alphabetSort) {
      list = [...list].sort((a, b) => b.id - a.id);
    }

    return list;
  }, [members, deferredSearch, fuse, alphabetSort]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMembers.length / itemsPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [alphabetSort, deferredSearch]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  /* ================= HANDLERS ================= */
  const goPrev = useCallback(
    () => setCurrentPage((p) => Math.max(1, p - 1)),
    []
  );

  const goNext = useCallback(
    () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );

  const goToPage = useCallback((n) => {
    setCurrentPage(n);
  }, []);

  /* ================= RENDER CONTENT ================= */
  const content = useMemo(() => {
    if (isLoading)
      return Array.from({ length: 6 }, (_, i) => (
        <HomeLoading key={i} />
      ));

    if (isError)
      return <ErrorShow message="Failed to load members" />;

    if (!filteredMembers.length)
      return <ErrorShow message="No members found" />;

    return currentItems.map((member) => (
      <MemberCard key={member.id} props={member} />
    ));
  }, [isLoading, isError, filteredMembers, currentItems]);

  return (
    <>
      <div className="ak-height-60" />

    <div className="container-search-member-section">
        <SearchMember members={members} />

    
      {/* 🔤 Alphabet Button */}
      <AlphabetButton
        isActive={alphabetSort}
        onToggle={() => setAlphabetSort((p) => !p)}
      />
    </div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
          {content}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="container mt-4">
          <ul className="pagination justify-content-center ak-pagination">
            <PaginateButton
              onClick={goPrev}
              disabled={currentPage === 1}
            >
              Previous
            </PaginateButton>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (n) => (
                <PaginateButton
                  key={n}
                  number={n}
                  isActive={currentPage === n}
                  onClick={() => goToPage(n)}
                />
              )
            )}

            <PaginateButton
              onClick={goNext}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginateButton>
          </ul>
        </div>
      )}
    </>
  );
}
