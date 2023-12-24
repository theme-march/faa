import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import navitemlist from "../../jsonData/navitemlist.json";
import { ButtonPrimary } from "../Button/Button";

export default function NavMenu() {
  const [navBar, setNavbar] = useState("");
  const [navlist, setNavList] = useState("");

  const navBarShow = () => {
    if (navBar == "") {
      setNavbar("ak-toggle_active");
    } else {
      setNavbar("");
    }

    if (navlist == "") {
      setNavList("ak-show-moblie-nav-list");
    } else {
      setNavList("");
    }
  };

  return (
    <div className="ak-main_header">
      <div className="ak-nav-container">
        <div className="ak-main_header_in">
          <div className="ak-main_header_left">
            <div className="d-flex gap-3 align-items-center">
              <Link to={"/singin"}>SingIn</Link>
              <ButtonPrimary to={"/member-registration"}>
                Became a Member
              </ButtonPrimary>
            </div>
          </div>
          <div className="ak-main_header_right">
            <div className="ak-nav">
              <ul id="ak-nav_list" className={`ak-nav_list ${navlist}`}>
                {navitemlist?.map((item) => {
                  return <MenuItem props={item} key={item.key} />;
                })}
              </ul>
              <span
                onClick={() => navBarShow()}
                id="navBar"
                className={`ak-munu_toggle ${navBar}`}
              >
                <span></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
