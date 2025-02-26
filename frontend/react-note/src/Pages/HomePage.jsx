import React from "react";
import NoteCardContainer from "../Components/NoteCardContainer";
import Filter from "../Components/Filter";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [filteredNewText, setFilteredNewText] = useState([]);
  const { searchedNotes, activeSearch } = useOutletContext();
  return (
    <div className="bg-gray-100 min-h-screen">
      <Filter upfilterText={setFilteredNewText} />
      <NoteCardContainer
        filteredNewText={filteredNewText}
        searchedNotes={searchedNotes}
        activeSearch={activeSearch}
      />
    </div>
  );
};

export default HomePage;
