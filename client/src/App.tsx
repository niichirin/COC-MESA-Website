import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from "./components/HomePage/HomePage";
import ReadTutor from "./components/Admin/ReadTutor";
import ReadTutorsList from "./components/Admin/ReadTutorsList";
import CreateTutor from "./components/Admin/CreateTutor";
import UpdateTutor from "./components/Admin/UpdateTutor";

const router = createBrowserRouter([
  { 
    path: `/`, 
    element: <HomePage /> 
  },
  { 
    path: `/tutors`, 
    element: <ReadTutorsList /> 
  },
  { 
    path: `/create-tutor`, 
    element: <CreateTutor /> 
  },
  { 
    path: `/read-tutor/:id`, 
    element: <ReadTutor /> 
  },
  { 
    path: `/update-tutor/:id`, 
    element: <UpdateTutor/> 
  },
], { basename: `/COC-MESA-Website/`});

const App = () => {
  return <><RouterProvider router={router}/></>
}

export default App;
