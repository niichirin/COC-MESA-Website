import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackToTutors from "./BackToTutors.tsx";
import TutorCoursesList from "./TutorCoursesList.tsx";
import TutorScheduleList from "./TutorScheduleList.tsx";

import { Tutor, Course, Schedule } from "./Interfaces.ts";

// reads tutor by ID from DB

const ReadTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [courses, setCourses] = useState<{ [key: string]: Course }>({});
    const [schedule, setSchedule] = useState<Schedule>();
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
                setSchedule(tutorRes.data.schedule)
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
        <div className="">
            <h2 className="text-center font-bold my-4">Tutor Information</h2>
            <div className="bg-neutral-900 px-8 py-4 rounded">
                <BackToTutors />
                <h2 className="font-bold mt-4 mb-2">{tutor.name}</h2>
                <p><b>Email: </b><u><a href={`mailto:${tutor.email}`}>{tutor.email}</a></u></p>
                <p className="mb-2">
                    <b>Courses: </b>
                    <TutorCoursesList courses={courses} />
                </p>
                <h3 className="font-bold mb-2">Schedule</h3>
                <TutorScheduleList inputSchedule={schedule} />
                <div className="mt-4">
                    <button
                        className="bg-neutral-600 rounded"
                        onClick={handleUpdateClick}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-800 ml-2 rounded"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReadTutor;