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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
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
