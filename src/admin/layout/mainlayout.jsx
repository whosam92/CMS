import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="right-panel">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
