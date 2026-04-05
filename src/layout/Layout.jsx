import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollTop from "./ScrollTop";
import AddModal from "../components/AddModal/AddModal";
import AuthSessionSync from "../components/Auth/AuthSessionSync";
export default function Layout() {
  return (
    <>
      <AuthSessionSync />
      <AddModal />
      <Header />
      <ScrollTop />
      <div className="pages-min-height">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
