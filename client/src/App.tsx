import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import ReadTutor from "./components/ReadTutor.tsx";
import ReadTutorsList from "./components/ReadTutorsList.tsx";
import CreateTutor from "./components/CreateTutor.tsx";
import UpdateTutor from "./components/UpdateTutor.tsx";

const router = createBrowserRouter([
  { path: "/", element: <ReadTutorsList /> },
  { path: "/create-tutor", element: <CreateTutor /> },
  { path: "/read-tutor/:id", element: <ReadTutor /> },
  { path: "/update-book/:id", element: <UpdateTutor/> },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
