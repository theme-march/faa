// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchMemberName } from "../../features/member/memberSearchSlice";
// import { debounce } from "lodash";

// export default function SearchMember() {
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();

//     // Debounced function to handle input changes
//     const handleChange = debounce((e) => {
//       dispatch(searchMemberName(e.target.value));
//     }, 300);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     // dispatch(searchMemberName(input));
//     handleChange(e);
//   };

//   const headerSearch = (e) => {
//     e.preventDefault();
//     dispatch(searchMemberName(input));
//   };
//   return (
//     <div className="search-member-section">
//       <div>
//         <p className="search-title">Search Member</p>
//         <form className="search-member" onSubmit={headerSearch}>
//           <input
//             type="text"
//             className="text-input-filed"
//             placeholder="Name / ID / Session / Batch / HSC / Organization"
//             value={input || ""}
//             onChange={handleInputChange}
//           />
//           <button className="button-primary ms-3">Search Member</button>
//         </form>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchMemberName } from "../../features/member/memberSearchSlice";

// export default function SearchMember() {
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const headerSearch = (e) => {
//     e.preventDefault();
//     dispatch(searchMemberName(input.trim()));
//   };

//   return (
//     <div className="search-member-section">
//       <div>
//         <p className="search-title">Search Member</p>
//         <form className="search-member" onSubmit={headerSearch}>
//           <input
//             type="text"
//             className="text-input-filed"
//             placeholder="Name / ID / Session / Batch / HSC / Organization"
//             value={input}
//             onChange={handleInputChange}
//           />
//           <button type="submit" className="button-primary ms-3">
//             Search Member
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { searchMemberName } from "../../features/member/memberSearchSlice";
import Fuse from "fuse.js";
import { debounce } from "lodash";

export default function SearchMember({ members }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const fuse = useMemo(() => {
    if (!members?.length) return null;
    return new Fuse(members, {
      keys: [
        "name",
        "membership_number",
        "organization_name",
        "phone_number",
        "hsc_passing_year",
        "email",
        "session",
      ],
      threshold: 0.3,
    });
  }, [members]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(searchMemberName(value.trim()));

        if (!fuse || !value.trim()) {
          setSuggestions([]);
          return;
        }

        const result = fuse.search(value);
        setSuggestions(result.map((r) => r.item).slice(0, 8)); // Top 8 suggestions
      }, 200),
    [dispatch, fuse]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  const handleSelect = (name) => {
    setInput(name);
    dispatch(searchMemberName(name));
    setSuggestions([]);
  };

  return (
    <div className="search-member-section" style={{ position: "relative" }}>
      <p className="search-title">Search Member</p>
      <div className="search-member">
        <input
          type="text"
          className="text-input-filed"
          placeholder="Type name or ID..."
          value={input}
          onChange={handleInputChange}
        />

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSelect(s.name)}>
                {s.name}{" "}
                <span className="text-muted">
                  ({s.membership_number || "N/A"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
