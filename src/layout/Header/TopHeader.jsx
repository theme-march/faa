import React from "react";
import MovingText from "../../components/MovingText/MovingText";
import { Link } from "react-router-dom";

export default function TopHeader() {
  return (
    <div className="container">
      <div className="top-header">
        <MovingText>{`Scrolling News and Announcement `}</MovingText>
        <div className="d-flex align-items-center">
          <ul className="d-flex align-items-center gap-4 m-0">
            <li>
              <Link to={"/"}>Career Resources</Link>
            </li>
            <li>
              <Link to={"/"}>Supports & Donations</Link>
            </li>
            <li>
              <Link to={"/"}>Helps & FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
