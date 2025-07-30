import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // TODO: Replace with actual user role from global state (e.g., Context, Redux)
  const userRole = "admin"; //"student" or "admin"

  return (
    <div>
      <Header userRole={userRole} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
