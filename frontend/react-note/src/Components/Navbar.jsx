import React from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = ({ searchedNotes, searchTextStatus }) => {
  const [searchText, setSearchText] = useState("");
  const [hasSearchedText, setHasSearchedText] = useState(false);
  // Update hasSearchedText based on the searchText length
  useEffect(() => {
    setHasSearchedText(searchText.length > 0); // Set true if search text exists
    searchTextStatus(searchText.length > 0); // Pass the status to parent (MainLayout)
  }, [searchText, searchTextStatus]);

  const handleSearchText = (val) => {
    setSearchText(val);
  };
  useEffect(() => {
    if (searchText.length < 3) return;
    axios
      .get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then((response) => {
        console.log("Searched notes:", response.data);
        searchedNotes(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [searchText]);

  return (
    <nav className="bg-white mx-auto max-w-full py-5 shadow-md overflow-hidden">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 px-5">
        {/* Brand Name */}
        <Link to="/" className="font-bold text-xl text-gray-900">
          Notey
        </Link>

        {/* Search Bar */}
        <div className="w-full sm:w-auto flex items-center justify-center">
          <div className="flex w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-[40px] border border-gray-300 rounded-md overflow-hidden">
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="w-full px-3 py-2 text-gray-700 outline-none"
              value={searchText}
              onChange={(e) => handleSearchText(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600">
              Search
            </button>
          </div>
        </div>

        {/* Add Notes Button */}
        <Link to="/add-notes" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
            <FaSquarePlus />
            Add Notes
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
