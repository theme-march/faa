import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import {
  useGetMembersCategoryListQuery,
  useGetMembersListQuery,
} from "../features/member/memberApiIn";
import { clearSearch } from "../features/member/memberSearchSlice";
import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

const PAGE_SIZE = 20;

function normalizeListResult(apiData) {
  const root = apiData || {};
  const result = root?.result;
  if (!result && !root) {
    return { rows: [], total: 0, isServerPaged: false };
  }

  if (Array.isArray(result)) {
    const totalFromRoot =
      Number(root?.total) ||
      Number(root?.count) ||
      Number(root?.totalCount) ||
      Number(root?.recordsTotal) ||
      Number(root?.recordsFiltered) ||
      Number(root?.iTotalRecords) ||
      Number(root?.iTotalDisplayRecords) ||
      result.length;
    return {
      rows: result,
      total: totalFromRoot,
      isServerPaged: totalFromRoot > result.length,
    };
  }

  const rows =
    result?.rows ||
    result?.data ||
    result?.items ||
    result?.members ||
    result?.list ||
    root?.rows ||
    root?.data ||
    root?.items ||
    root?.members ||
    root?.list ||
    [];

  const totalFromKnownKeys =
    Number(result?.total) ||
    Number(result?.count) ||
    Number(result?.totalCount) ||
    Number(result?.recordsTotal) ||
    Number(result?.recordsFiltered) ||
    Number(result?.iTotalRecords) ||
    Number(result?.iTotalDisplayRecords) ||
    Number(root?.total) ||
    Number(root?.count) ||
    Number(root?.totalCount) ||
    Number(root?.recordsTotal) ||
    Number(root?.recordsFiltered) ||
    Number(root?.iTotalRecords) ||
    Number(root?.iTotalDisplayRecords) ||
    0;

  const pageSize =
    Number(result?.limit) ||
    Number(result?.pageSize) ||
    Number(root?.limit) ||
    Number(root?.pageSize) ||
    PAGE_SIZE;
  const totalPagesMeta =
    Number(result?.totalPages) || Number(root?.totalPages) || 0;
  const inferredTotalFromPages =
    totalPagesMeta > 0 && pageSize > 0 ? totalPagesMeta * pageSize : 0;
  const total = Math.max(
    totalFromKnownKeys,
    inferredTotalFromPages,
    Array.isArray(rows) ? rows.length : 0
  );

  const isServerPaged = !!(
    result?.rows ||
    result?.data ||
    result?.items ||
    result?.totalPages ||
    result?.page ||
    result?.recordsTotal ||
    result?.recordsFiltered ||
    root?.totalPages ||
    root?.recordsTotal ||
    root?.recordsFiltered
  );

  return {
    rows: Array.isArray(rows) ? rows : [],
    total,
    isServerPaged,
  };
}

function getPageWindow(currentPage, totalPages, windowSize = 5) {
  if (totalPages <= windowSize + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [1];
  const half = Math.floor(windowSize / 2);
  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  if (currentPage <= half + 2) {
    start = 2;
    end = windowSize;
  }
  if (currentPage >= totalPages - (half + 1)) {
    start = totalPages - (windowSize - 1);
    end = totalPages - 1;
  }

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
}

export default function Membership() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMode, setSortMode] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { search = "" } = useSelector((state) => state.memberSearch);
  const deferredSearch = useDeferredValue(search.trim());

  const { data: categoryData } = useGetMembersCategoryListQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const categoryOptions = useMemo(() => {
    const rows = categoryData?.result;
    if (!Array.isArray(rows)) return [];

    return rows
      .map((item) => ({
        value: String(item?.id || "").trim(),
        label: String(item?.category_name || "").trim(),
      }))
      .filter((item) => item.value && item.label);
  }, [categoryData]);

  useEffect(() => {
    // Reset hidden global search when entering membership for a predictable first view.
    dispatch(clearSearch());
  }, [dispatch]);

  const selectedCategoryLabel = useMemo(() => {
    if (categoryFilter === "all") return "";
    return (
      categoryOptions.find((option) => option.value === categoryFilter)?.label || ""
    );
  }, [categoryFilter, categoryOptions]);

  const membershipTypeParam = useMemo(() => {
    if (categoryFilter === "all") return "all";
    const normalized = selectedCategoryLabel.toLowerCase();
    if (normalized.includes("general")) return "general";
    if (normalized.includes("lifetime") || normalized.includes("life time")) {
      return "lifetime";
    }
    if (normalized.includes("student") || normalized.includes("guest")) return "student";
    return "all";
  }, [categoryFilter, selectedCategoryLabel]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: PAGE_SIZE,
      search: deferredSearch || undefined,
      sort: sortMode,
      membership_type: membershipTypeParam,
      category_id: categoryFilter !== "all" ? categoryFilter : undefined,
    }),
    [currentPage, deferredSearch, sortMode, categoryFilter, membershipTypeParam]
  );

  const { data, isLoading, isError, isFetching } = useGetMembersListQuery(queryParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const parsed = useMemo(() => normalizeListResult(data), [data]);

  const normalizedRows = useMemo(
    () =>
      parsed.rows.map((m) => ({
        ...m,
        safeName: (m.name || "").trim(),
        safeUpper: (m.name || "").trim().toUpperCase(),
      })),
    [parsed.rows]
  );

  const localFiltered = useMemo(() => {
    if (parsed.isServerPaged) return normalizedRows;

    let list = normalizedRows;

    if (categoryFilter !== "all") {
      list = list.filter((item) => {
        return String(item?.membership_category_id || "").trim() === categoryFilter;
      });
    }

    if (deferredSearch) {
      const fuse = new Fuse(list, {
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
      list = fuse.search(deferredSearch).map((r) => r.item);
    }

    list = [...list].sort((a, b) => {
      if (sortMode === "az") return a.safeUpper.localeCompare(b.safeUpper);
      return (Number(b.id) || 0) - (Number(a.id) || 0);
    });

    return list;
  }, [parsed.isServerPaged, normalizedRows, deferredSearch, sortMode, categoryFilter]);

  const totalItems = parsed.isServerPaged ? parsed.total : localFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (categoryFilter === "all") return;
    const exists = categoryOptions.some((option) => option.value === categoryFilter);
    if (!exists) {
      setCategoryFilter("all");
      setCurrentPage(1);
    }
  }, [categoryOptions, categoryFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const pageItems = useMemo(() => {
    if (parsed.isServerPaged) return normalizedRows;
    const start = (currentPage - 1) * PAGE_SIZE;
    return localFiltered.slice(start, start + PAGE_SIZE);
  }, [parsed.isServerPaged, normalizedRows, currentPage, localFiltered]);

  const pageButtons = useMemo(
    () => getPageWindow(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <section className="membership-page">
      <div className="ak-height-60" />
      <div className="container-search-member-section">
        <SearchMember members={normalizedRows} />

        <div className="membership-controls">
          <select
            className="membership-filter-select"
            value={categoryFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setCategoryFilter(e.target.value);
            }}
          >
            <option value="all">All Memberships</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="membership-sort-group">
            <button
              type="button"
              className={`ak-sort-btn ${sortMode === "az" ? "active" : ""}`}
              onClick={() => {
                setCurrentPage(1);
                setSortMode("az");
              }}
            >
              A-Z
            </button>
            <button
              type="button"
              className={`ak-sort-btn ${sortMode === "latest" ? "active" : ""}`}
              onClick={() => {
                setCurrentPage(1);
                setSortMode("latest");
              }}
            >
              Latest
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="membership-meta">
          Showing {showingFrom} - {showingTo} of {totalItems} members
          {isFetching ? " (updating...)" : ""}
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
          {isLoading &&
            Array.from({ length: 8 }, (_, i) => <HomeLoading key={i} />)}

          {!isLoading && isError && (
            <div className="col-12">
              <ErrorShow message="Failed to load members" />
            </div>
          )}

          {!isLoading && !isError && pageItems.length === 0 && (
            <div className="col-12">
              <ErrorShow message="No members found" />
            </div>
          )}

          {!isLoading &&
            !isError &&
            pageItems.map((member) => <MemberCard key={member.id} props={member} />)}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="container mt-4">
          <ul className="pagination justify-content-center ak-pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
            </li>

            {pageButtons.map((item, idx) =>
              item === "..." ? (
                <li className="page-item disabled" key={`ellipsis-${idx}`}>
                  <span className="page-link">...</span>
                </li>
              ) : (
                <li
                  className={`page-item ${currentPage === item ? "active" : ""}`}
                  key={item}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </button>
                </li>
              )
            )}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
