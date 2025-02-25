import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditNotePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes/${slug}`)
      .then((response) => {
        console.log("Fetched notes:", response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [slug]);

  const updateNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((response) => {
        console.log("Note updated:", response.data);
        toast.success("Updated the note");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updatedNoteObject = {
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
    updateNote(updatedNoteObject, slug);
    navigate(`/notes/${slug}`);
    console.log(newNote);
  };

  return (
    <div className="flex bg-gray-100 w-auto">
      <form
        onSubmit={handleSubmit}
        class="w-[500px] mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 mt-7"
      >
        <h5 class="text-lg font-semibold text-gray-900 text-center">
          Update Note
        </h5>

        {/* <!-- Title Input --> */}
        <div>
          <label for="noteTitle" class="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="noteTitle"
            placeholder="Enter note's title"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* <!-- Content Textarea --> */}
        <div>
          <label for="noteContent" class="block text-gray-700 font-medium">
            Content
          </label>
          <textarea
            id="noteContent"
            rows="4"
            placeholder="Enter note's content"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {/* <!-- Category Select --> */}
        <div>
          <label for="noteCategory" class="block text-gray-700 font-medium">
            Note's category
          </label>
          <select
            id="noteCategory"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pick a category</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="IMPORTANT">Important</option>
          </select>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNotePage;
