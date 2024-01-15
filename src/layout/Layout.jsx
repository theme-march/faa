import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="pages-min-height">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
