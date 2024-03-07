import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from "./components/HomePage/HomePage";
import ReadTutor from "./components/Admin/ReadTutor";
import ReadTutorsList from "./components/Admin/ReadTutorsList";
import CreateTutor from "./components/Admin/CreateTutor";
import UpdateTutor from "./components/Admin/UpdateTutor";

// require('dotenv').config()

// const repoName = process.env.REPO_NAME;
// const router = createBrowserRouter([
//   { path: `${repoName}/`, element: <HomePage /> },
//   { path: `${repoName}/tutors`, element: <ReadTutorsList /> },
//   { path: `${repoName}/create-tutor`, element: <CreateTutor /> },
//   { path: `${repoName}/read-tutor/:id`, element: <ReadTutor /> },
//   { path: `${repoName}/update-tutor/:id`, element: <UpdateTutor/> },
// ]);

// const router = createBrowserRouter([
//   { path: `/`, element: <HomePage /> },
//   { path: `/tutors`, element: <ReadTutorsList /> },
//   { path: `/create-tutor`, element: <CreateTutor /> },
//   { path: `/read-tutor/:id`, element: <ReadTutor /> },
//   { path: `/update-tutor/:id`, element: <UpdateTutor/> },
// ]);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/tutors" Component={ReadTutorsList} />
        <Route path="/create-tutor" Component={CreateTutor} />
        <Route path="/read-tutor/:id" Component={ReadTutor} />
        <Route path="/update-tutor/:id" Component={UpdateTutor} />
      </Routes>
    </Router>
  );
}

export default App;
