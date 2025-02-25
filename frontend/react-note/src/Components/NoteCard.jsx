import React from "react";
import { FaStickyNote } from "react-icons/fa";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";
import { FormatDate } from "./FormatDate";

const NoteCard = ({ note }) => {
  const body = `${note.body.split(" ").slice(0, 20).join(" ")} ...`;
  const color =
    note.category == "BUSINESS"
      ? "blue"
      : note.category == "PERSONAL"
      ? "green"
      : "purple";
  return (
    <div className="w-full p-4">
      <div className="bg-white shadow-md rounded-lg p-4 relative">
        {/* Side Stick */}
        <span
          className="absolute left-0 top-5 h-1/4 w-1 rounded-l-lg"
          style={{ backgroundColor: color }}
        ></span>

        {/* Note Icon */}
        <FaStickyNote className="ml-auto text-2xl" style={{ color: color }} />

        {/* Note Title */}
        <Link to={`/notes/${note.slug}`}>
          <h5 className="text-lg font-semibold truncate w-3/4 mb-2">
            {note.title}
          </h5>
        </Link>

        {/* Note Date */}
        <p className="text-sm text-gray-500">{FormatDate(note.updated)}</p>

        {/* Note Content */}
        <div className="mt-2">
          <p className="text-gray-600">{body}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center mt-4">
          {/* View Note */}
          <Link to="/notes-detail">
            <MdMarkunread
              className="text-2xl cursor-pointer"
              style={{ color: color }}
            />
          </Link>

          <small className="text-gray-500">{note.category}</small>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
