import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

// import HomePage from "./components/HomePage/HomePage.tsx";
import ReadTutor from "./components/Admin/ReadTutor.tsx";
import ReadTutorsList from "./components/Admin/ReadTutorsList.tsx";
import CreateTutor from "./components/Admin/CreateTutor.tsx";
import UpdateTutor from "./components/Admin/UpdateTutor.tsx";

const router = createBrowserRouter([
  // { path: "/", element: <HomePage /> },
  { path: "/tutors", element: <ReadTutorsList /> },
  { path: "/create-tutor", element: <CreateTutor /> },
  { path: "/read-tutor/:id", element: <ReadTutor /> },
  { path: "/update-tutor/:id", element: <UpdateTutor/> },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
