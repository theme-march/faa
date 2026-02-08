

// import React, { useState, useMemo, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { searchMemberName } from "../../features/member/memberSearchSlice";
// import Fuse from "fuse.js";
// import { debounce } from "lodash";

// export default function SearchMember({ members }) {
//   const [input, setInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const dispatch = useDispatch();

//   // ✅ Initialize Fuse.js
//   const fuse = useMemo(() => {
//     if (!members?.length) return null;
//     return new Fuse(members, {
//       keys: ["name", "membership_number", "organization_name"],
//       threshold: 0.3,
//     });
//   }, [members]);

//   // ✅ Debounced search for suggestions
//   const debouncedSearch = useMemo(
//     () =>
//       debounce((value) => {
//         if (!fuse || !value.trim()) {
//           setSuggestions([]);
//           return;
//         }
//         const result = fuse.search(value);
//         setSuggestions(result.map((r) => r.item).slice(0, 8)); // show top 8
//       }, 200),
//     [fuse]
//   );

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
//     debouncedSearch(value);
//   };

//   // ✅ When user presses Enter
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       dispatch(searchMemberName(input.trim()));
//       setSuggestions([]); // hide suggestion list
//     }
//   };

//   // ✅ When user clicks suggestion
//   const handleSelect = (name) => {
//     setInput(name);
//     dispatch(searchMemberName(name));
//     setSuggestions([]); // hide list after select
//   };

//   // ✅ Hide suggestion list when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".search-member-section")) {
//         setSuggestions([]);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <div className="search-member-section" style={{ position: "relative" }}>
//       <p className="search-title">Search Member</p>
//       <div className="search-member">
//         <input
//           type="text"
//           className="text-input-filed"
//           placeholder="Name / ID / Session / Batch / HSC / Organization ..."
//           value={input}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown} // 👈 handle Enter key
//         />

//         {suggestions.length > 0 && (
//           <ul className="suggestion-list">
//             {suggestions.map((s, i) => (
//               <li key={i} onClick={() => handleSelect(s.name)}>
//                 {s.name}{" "}
//                 <span className="text-muted">
//                   ({s.membership_number || "N/A"})
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { searchMemberName } from "../../features/member/memberSearchSlice";

export default function SearchMember({ members = [] }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= FUSE CONFIG ================= */
  const fuse = useMemo(() => {
    if (!members.length) return null;

    return new Fuse(members, {
      keys: ["name", "membership_number", "organization_name"],
      threshold: 0.3,
    });
  }, [members]);

  /* ================= DEBOUNCED SEARCH ================= */
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (!fuse || !value.trim()) {
          setSuggestions([]);
          return;
        }
        const result = fuse.search(value);
        setSuggestions(result.slice(0, 8).map((r) => r.item));
      }, 200),
    [fuse]
  );

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  /* ================= ENTER KEY ================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(searchMemberName(input.trim()));
      setSuggestions([]);
    }
  };

  /* ================= CLICK SUGGESTION → PROFILE ================= */
  const handleSelect = (member) => {
    setInput("");
    setSuggestions([]);
    navigate(`/member-details/${member.id}`); // ✅ CORRECT URL
  };

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-member-section")) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="search-member-section"
      style={{ position: "relative" }}
    >
      <p className="search-title">Search Member</p>

      <div className="search-member">
        <input
          type="text"
          className="text-input-filed"
          placeholder="Name / ID / Session / Batch / HSC / Organization ..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {/* 🔽 SUGGESTION LIST */}
        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((member) => (
              <li
                key={member.id}
                onClick={() => handleSelect(member)}
              >
                <strong>{member.name}</strong>{" "}
                <span className="text-muted">
                  ({member.membership_number || "N/A"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
