import React from "react";
import NoteCard from "./NoteCard";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteCardContainer = ({ loading, filteredNewText, searchedNotes }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotes =
    filteredNewText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filteredNewText === "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filteredNewText === "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;

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

  return (
    <div className="mx-auto mr-10 ml-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full p-4 gap-4">
        {isLoading && <Loader loading={loading} />}

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;
