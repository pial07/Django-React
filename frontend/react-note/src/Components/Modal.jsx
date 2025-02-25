import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Modal = ({ handleIsOpen, deleteNote }) => {
  const navigate = useNavigate();
  const handleDeleteNote = () => {
    deleteNote();
    navigate("/");
    toast.success("Note deleted");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
        <button
          onClick={handleIsOpen}
          className="absolute top-2 right-2 text-xl bg-transparent border-none cursor-pointer"
        >
          ×
        </button>
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Delete Note</h2>
          <p className="mt-2">Are you sure you want to delete this note?</p>
          <div className="flex justify-center mt-5">
            <button
              onClick={handleDeleteNote}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-3"
            >
              Delete
            </button>
            <button
              onClick={handleIsOpen}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
