import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { useGetMembersListQuery } from "../../features/member/memberApiIn";
import { searchMemberName } from "../../features/member/memberSearchSlice";

function pickRows(apiData) {
  const result = apiData?.result;
  if (!result) return [];
  if (Array.isArray(result)) return result;

  const rows =
    result?.rows ||
    result?.data ||
    result?.members ||
    result?.list ||
    [];

  return Array.isArray(rows) ? rows : [];
}

export default function SearchMember({ members = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState("");

  const shouldSearchServer = isModalOpen && debouncedInput.length > 0;
  const searchQuery = useMemo(
    () => ({
      page: 1,
      limit: 12,
      search: debouncedInput || undefined,
    }),
    [debouncedInput]
  );

  const { data: searchedMembersData } = useGetMembersListQuery(searchQuery, {
    skip: !shouldSearchServer,
    refetchOnMountOrArgChange: true,
  });

  const fuse = useMemo(() => {
    if (!members.length) return null;
    return new Fuse(members, {
      keys: ["name", "membership_number", "organization_name", "session", "email"],
      threshold: 0.3,
    });
  }, [members]);

  const debouncedLocalSearch = useMemo(
    () =>
      debounce((value) => {
        if (!fuse || !value.trim()) {
          setSuggestions([]);
          return;
        }
        const result = fuse.search(value);
        setSuggestions(result.slice(0, 8).map((r) => r.item));
      }, 220),
    [fuse]
  );

  useEffect(() => {
    return () => {
      debouncedLocalSearch.cancel();
    };
  }, [debouncedLocalSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(input.trim());
    }, 220);
    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    if (!isModalOpen || !debouncedInput) {
      setSuggestions([]);
      return;
    }

    const apiRows = pickRows(searchedMembersData);
    if (apiRows.length > 0) {
      setSuggestions(apiRows.slice(0, 8));
      return;
    }

    // Fallback in case API response is temporarily empty/unavailable.
    debouncedLocalSearch(debouncedInput);
  }, [isModalOpen, debouncedInput, searchedMembersData, debouncedLocalSearch]);

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const closeOnEsc = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [isModalOpen]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(searchMemberName(input.trim()));
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (member) => {
    setInput("");
    setDebouncedInput("");
    setSuggestions([]);
    setIsModalOpen(false);
    navigate(`/member-details/${member.id}`);
  };

  return (
    <div className="search-member-section" style={{ position: "relative" }}>
      <div className="search-member-inline">
        <p className="search-title">Search Member</p>
        <button
          type="button"
          className="search-trigger"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="search-trigger-icon">
            <i className="fas fa-search" />
          </span>
          <span className="search-trigger-text">Search</span>
          <span className="search-trigger-shortcut">CTRL K</span>
        </button>
      </div>

      {isModalOpen ? (
        <div
          className="search-modal-backdrop"
          onClick={() => {
            setIsModalOpen(false);
            setInput("");
            setDebouncedInput("");
          }}
        >
          <div className="search-modal" onClick={(event) => event.stopPropagation()}>
            <div className="search-modal-head">
              <div className="search-modal-input-wrap">
                <i className="fas fa-search" />
                <input
                  type="text"
                  className="search-modal-input"
                  placeholder="Search member by name / id / organization..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <button
                type="button"
                className="search-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close search"
              >
                x
              </button>
            </div>

            <div className="search-modal-body">
              {suggestions.length > 0 ? (
                <>
                  <p className="search-modal-caption">Members</p>
                  <ul className="suggestion-list in-modal">
                    {suggestions.map((member) => (
                      <li key={member.id} onClick={() => handleSuggestionClick(member)}>
                        <strong>{member.name}</strong>{" "}
                        <span className="text-muted">({member.membership_number || "N/A"})</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="search-modal-empty">Start typing to find members</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
