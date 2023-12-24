import React from "react";
import TopHeader from "./TopHeader";
import HeaderLogo from "./HeaderLogo";
import NavMenu from "../../components/Nav/NavMenu";

export default function Header() {
  return (
    <header>
      <TopHeader />
      <HeaderLogo />
      <NavMenu />
      <div className="ak-border-width"></div>
    </header>
  );
}
