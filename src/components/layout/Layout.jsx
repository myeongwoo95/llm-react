import React from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const layoutPaths = [
    "/",
    "/auth/signup",
    "/auth/signin",
    "/auth/findaccount",
  ];
  const shouldApplyLayout = layoutPaths.includes(location.pathname);

  return (
    <div className={!shouldApplyLayout ? "layout" : ""}>
      {!shouldApplyLayout && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
