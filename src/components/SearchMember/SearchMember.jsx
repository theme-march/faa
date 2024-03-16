import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMemberName } from "../../features/member/memberSearchSlice";

export default function SearchMember() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const headerSearch = (e) => {
    e.preventDefault();
    dispatch(searchMemberName(input));
  };

  return (
    <div className="search-member-section">
      <div>
        <p className="search-title">Search Member</p>
        <form className="search-member" onSubmit={headerSearch}>
          <input
            type="text"
            className="text-input-filed"
            placeholder="Name / ID / Session / Batch / HSC / Organization"
            value={input || ""}
            onChange={handleInputChange}
          />
          <button className="button-primary ms-3">Search Member</button>
        </form>
      </div>
    </div>
  );
}
