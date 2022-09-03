import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="layoutMain">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
