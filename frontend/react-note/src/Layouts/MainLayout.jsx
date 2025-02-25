import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MainLayout = ({ searchText, handleSearchText }) => {
  return (
    <div>
      <Navbar searchText={searchText} handleSearchText={handleSearchText} />
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default MainLayout;
