import React from "react";
import { FiEdit } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatDate } from "../Components/FormatDate";
import Modal from "../Components/Modal";

const NoteDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({});
  const { slug } = useParams();
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const deleteNote = (slug) => {
    axios.delete(`http://127.0.0.1:8000/notes/${slug}/`).catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes/${slug}`)
      .then((response) => {
        console.log("Fetched notes:", response.data);
        setNote(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [slug]);

  return (
    <>
      <div className="bg-gray-100 py-7">
        <div className="note-container bg-white shadow-md rounded-lg p-5 w-full sm:w-3/4 md:w-[600px] lg:w-[700px] mx-auto">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 text-center">
            {note.title}
          </h3>

          {/* Date Section */}
          <div className="flex justify-center items-center gap-5 text-sm text-gray-500 mt-2">
            <p className="note-date">Created: {FormatDate(note.created)}</p>
            <p className="note-date">
              Last updated: {FormatDate(note.updated)}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center gap-3 mt-4 ">
            <Link to={`/edit-note/${slug}`}>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                <FiEdit />
                <span>Edit</span>
              </button>
            </Link>
            <button
              onClick={handleIsOpen}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <BiSolidTrashAlt />
              <span>Delete</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4 leading-relaxed">{note.body}</p>
        </div>
      </div>
      {isOpen && (
        <Modal
          handleIsOpen={handleIsOpen}
          deleteNote={() => deleteNote(slug)}
        />
      )}
    </>
  );
};

export default NoteDetailPage;
