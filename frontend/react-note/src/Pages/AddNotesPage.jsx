import React, { use } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNotesPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((response) => {
        console.log("Note added:", response.data);
        toast.success("Added new note");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const newNote = {
    title: title,
    body: body,
    category: category,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !body && !category) {
      alert("Please fill all the fields");
      return;
    }
    addNote(newNote);
    navigate("/");
    console.log(newNote);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h5 className="text-xl font-semibold mb-4">Add New Note</h5>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="noteTitle"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="noteTitle"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note's title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-4">
          <label
            htmlFor="noteContent"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="noteContent"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note's content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label
            htmlFor="noteCategory"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Note's category
          </label>
          <select
            id="noteCategory"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Pick a category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pick a category</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="IMPORTANT">Important</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotesPage;
