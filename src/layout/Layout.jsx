import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollTop from "./ScrollTop";

export default function Layout() {
  return (
    <>
      <Header />
      <ScrollTop />
      <div className="pages-min-height">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
