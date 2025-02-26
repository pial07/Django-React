import React from "react";
import NoteCard from "./NoteCard";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteCardContainer = ({
  loading,
  filteredNewText,
  searchedNotes,
  activeSearch,
}) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/notes")
      .then((response) => {
        console.log("Fetched notes:", response.data); // Debugging
        setNotes(response.data); // Ensure new array reference
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log("searchedNotes:", searchedNotes); // Debugging
  console.log("searchedcondition:", activeSearch); // Debugging
  const displayedNotes =
    searchedNotes && searchedNotes.length > 0 ? searchedNotes : notes;

  const filteredNotes =
    filteredNewText === "BUSINESS"
      ? displayedNotes.filter((note) => note.category === "BUSINESS")
      : filteredNewText === "PERSONAL"
      ? displayedNotes.filter((note) => note.category === "PERSONAL")
      : filteredNewText === "IMPORTANT"
      ? displayedNotes.filter((note) => note.category === "IMPORTANT")
      : displayedNotes;
  // Effect to set hasSearched to true when the search is performed
  // useEffect(() => {
  //   if (searchedNotes && searchedNotes.length > 0) {
  //     setHasSearched(true);
  //   }
  // }, [searchedNotes]);
  // // Conditional rendering logic

  let content;

  if (isLoading) {
    content = <Loader loading={loading} />;
  } else if (searchedNotes.length === 0 && activeSearch) {
    // If searchedNotes is empty (no results found) and search has been performed
    content = (
      <h1 className="font-bold justify-center text-blue-900">No notes found</h1>
    );
  } else if (searchedNotes === "" || searchedNotes === undefined) {
    // If search field is empty or undefined, show all notes initially
    content = filteredNotes.map((note) => (
      <NoteCard key={note.id} note={note} />
    ));
  } else {
    // If searchedNotes contains some notes, display them
    content = filteredNotes.map((note) => (
      <NoteCard key={note.id} note={note} />
    ));
  }

  return (
    <div className="mx-auto mr-10 ml-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full p-4 gap-4">
        {content}
      </div>
    </div>
  );
};

export default NoteCardContainer;
