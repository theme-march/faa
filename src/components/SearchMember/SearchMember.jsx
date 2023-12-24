import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMemberName } from "../../features/member/memberSearchSlice";

export default function SearchMember() {
  const { search } = useSelector((state) => state.memberSearch);
  const [input, setInput] = useState(search);
  const dispatch = useDispatch();

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
            placeholder="Name / Id / Session"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="button-primary ms-3">Search Member</button>
        </form>
      </div>
    </div>
  );
}
