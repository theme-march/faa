import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { ButtonPrimary } from "../Button/Button";
import { useGetMenuListQuery } from "../../features/menuList/menuList";
import { useGetMemberDetailsIdQuery } from "../../features/member/memberApiIn";
import member from "../../assets/member/member_1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { clearAuthSession, getAuthMemberId } from "../../utils/authStorage";

function isExpiredByDate(expireDate) {
  if (!expireDate) return false;
  const parsedDate = new Date(expireDate);
  if (Number.isNaN(parsedDate.getTime())) return false;
  return parsedDate.getTime() < Date.now();
}

export default function NavMenu() {
  const authMemberId = getAuthMemberId();
  const navigate = useNavigate();
  const { data } = useGetMenuListQuery();
  const { data: memberDetailsData } = useGetMemberDetailsIdQuery(
    {
      id: authMemberId,
      viewer_id: authMemberId,
    },
    { skip: !authMemberId }
  );
  const [navBar, setNavbar] = useState("");
  const [navlist, setNavList] = useState("");

  const closeMobileNav = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 1199) {
      setNavbar("");
      setNavList("");
    }
  };

  const memberDetails = memberDetailsData?.result || {};
  const memberStatus = String(
    memberDetails?.member_status || memberDetails?.status_label || memberDetails?.membership_status || ""
  )
    .toLowerCase()
    .trim();
  const hasMemberDetails = !!memberDetailsData?.success;
  const isExpired = memberStatus.includes("expired") || isExpiredByDate(memberDetails?.expire_date);
  const isUnpaid = Number(memberDetails?.is_pay) !== 1;
  const showRenewal = hasMemberDetails && isExpired;
  const showPayment = hasMemberDetails && !isExpired && isUnpaid;

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
      clearAuthSession();
      navigate("/singin");
    }
  };
  return (
    <div className="ak-main_header">
      <div className="ak-nav-container">
        <div className="ak-main_header_in">
          <div className="ak-main_header_left">
            <div className="d-flex gap-3 align-items-center">
              {authMemberId ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="user-profile-img"
                    >
                      <Image
                        src={
                          memberDetails?.member_image
                            ? `/images/member/${memberDetails?.member_image}`
                            : member
                        }
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                            navigate(
                            authMemberId
                              ? `/member-details/${authMemberId}`
                              : "/singin"
                          )
                        }
                      >
                        {String(memberDetails?.name || "Member").slice(0, 10)}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigate("/member-registration")}
                      >
                        Create a Member
                      </Dropdown.Item>
                      {showRenewal || showPayment ? (
                        <Dropdown.Item
                          onClick={() => navigate(`/members-payment/${authMemberId}`)}
                        >
                          <span className="text-primary">{showRenewal ? "Renewal" : "Payment"}</span>
                        </Dropdown.Item>
                      ) : null}
                      {/*  <Dropdown.Item
                        onClick={() => navigate("/members-approved-list")}
                      >
                        Approval Process
                      </Dropdown.Item> */}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <span
                          className="sing-out"
                          onClick={() => singOut(authMemberId)}
                        >
                          Sign Out
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Link to={"/singin"}>Sign in</Link>
                  <ButtonPrimary to={"/member-registration"}>
                    Become a Member
                  </ButtonPrimary>
                </>
              )}
            </div>
          </div>
          <div className="ak-main_header_right">
            <div className="ak-nav">
              <ul id="ak-nav_list" className={`ak-nav_list ${navlist}`}>
                {data?.result?.map((item, index) => {
                  return (
                    <MenuItem
                      props={item}
                      key={index}
                      onNavigate={closeMobileNav}
                    />
                  );
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
