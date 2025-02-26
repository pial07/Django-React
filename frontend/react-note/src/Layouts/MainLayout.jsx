import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const MainLayout = () => {
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <div>
      <Navbar
        searchedNotes={setSearchedNotes}
        searchTextStatus={setActiveSearch}
      />
      <ToastContainer />
      <Outlet context={{ searchedNotes, activeSearch }} />
    </div>
  );
};

export default MainLayout;
