import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { ButtonPrimary } from "../Button/Button";
import { useGetMenuListQuery } from "../../features/menuList/menuList";
import member from "../../assets/member/member_1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

export default function NavMenu() {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { data } = useGetMenuListQuery();
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
  const singOut = (id) => {
    if (id) {
      localStorage.removeItem("user");
      navigate("/singin");
    }
  };
  return (
    <div className="ak-main_header">
      <div className="ak-nav-container">
        <div className="ak-main_header_in">
          <div className="ak-main_header_left">
            <div className="d-flex gap-3 align-items-center">
              {loginUser ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="user-profile-img"
                    >
                      <Image
                        src={
                          loginUser?.img
                            ? `http://174.138.171.172:3000/member/${loginUser?.img}`
                            : member
                        }
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {loginUser?.name.slice(0, 10)}
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span onClick={() => navigate("/member-registration")}>
                          Create a Member
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <span
                          className="sing-out"
                          onClick={() => singOut(loginUser?.id)}
                        >
                          Sing Out
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Link to={"/singin"}>Sign in</Link>
                  <ButtonPrimary to={"/member-registration"}>
                    Became a Member
                  </ButtonPrimary>
                </>
              )}
            </div>
          </div>
          <div className="ak-main_header_right">
            <div className="ak-nav">
              <ul id="ak-nav_list" className={`ak-nav_list ${navlist}`}>
                {data?.result?.map((item, index) => {
                  return <MenuItem props={item} key={index} />;
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
