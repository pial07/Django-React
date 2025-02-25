import { useState, useEffect, use } from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import AddNotesPage from "./Pages/AddNotesPage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import EditNotePage from "./Pages/EditNotePage";
import axios from "axios";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (val) => {
    setSearchText(val);
  };
  useEffect(() => {
    if (searchText.length < 3) return;
    axios
      .get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then((response) => {
        setSearchedNotes(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [searchText]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            searchText={searchText}
            handelSearchText={handleSearchText}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/add-notes" element={<AddNotesPage />} />
        <Route path="/edit-note/:slug" element={<EditNotePage />} />
        <Route path="notes/:slug" element={<NoteDetailPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
