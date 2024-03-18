import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackToTutors from "./BackToTutors.tsx";
import TutorCoursesList from "./TutorCoursesList.tsx";
import TutorScheduleList from "./TutorScheduleList.tsx";

import { Tutor, Course } from "./Interfaces.ts";

// reads tutor by ID from DB

const ReadTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [courses, setCourses] = useState<{ [key: string]: Course }>({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`http://localhost:8082/api/tutoring/tutor/${id}`),
            axios.get(`http://localhost:8082/api/tutoring/tutor/course/${id}`)
        ])
        .then(([tutorRes, coursesRes]) => {
            setTutor(tutorRes.data)
            setCourses(coursesRes.data)
        })
        .catch((error) => console.error('Error reading tutor: ', error))
        .finally(() => setLoading(false))
    }, [id]);
    const handleUpdateClick = () => {
        navigate(`/update-tutor/${id}`)
    }

    const handleDeleteClick = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8082/api/tutoring/tutor/${id}`)
            .then(() => navigate('/tutors/'))
            .catch((error) => console.error('Error deleting tutor: ', error))
            .finally(() => setLoading(false));
    }

    if (loading) return <div>Loading...</div>;
    if (tutor == null) return <div>No tutor with {id} found!</div>;
      
    return (
        <div>
            <h2 style={{textAlign: "center"}}>Tutor Information</h2>
            <BackToTutors />
            <div className="TutorCard">
                <h2>{tutor.name}</h2>
                <p><b>Email: </b><u><a href={`mailto:${tutor.email}`}>{tutor.email}</a></u></p>
                <TutorCoursesList courses={courses}/>
                <TutorScheduleList tutor={tutor}/>
            </div>
            <button 
                onClick={handleUpdateClick}
            >
                Update
            </button>
            <button 
                style={{ marginLeft: "0.5rem"}}
                className="DeleteTutorBtn"
                onClick={handleDeleteClick}
            >
                Delete
            </button>
        </div>
    )
}

export default ReadTutor;