import React from "react";
import NoteCardContainer from "../Components/NoteCardContainer";
import Filter from "../Components/Filter";
import { useState } from "react";

const HomePage = ({ searchedNotes }) => {
  const [filteredNewText, setFilteredNewText] = useState([]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Filter upfilterText={setFilteredNewText} />
      <NoteCardContainer
        filteredNewText={filteredNewText}
        searchedNotes={searchedNotes}
      />
    </div>
  );
};

export default HomePage;
