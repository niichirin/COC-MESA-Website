import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Tutor, Course } from "./Interfaces.ts"
import BackToTutors from "./BackToTutors.tsx";
import UpdateTutorCourses from "./UpdateTutorCourses.tsx"
import UpdateTutorWeek from "./UpdateTutorWeek.tsx";

// updates tutor by ID from DB

const UpdateTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [courses, setCourses] = useState<Course[]>();
    const [loading, setLoading] = useState(false);

    const [newName, setNewName] = useState();
    const [newEmail, setNewEmail] = useState();

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
            setNewName(tutorRes.data.name)
            setNewEmail(tutorRes.data.email)
            setCourses(coursesRes.data)
        })
        .catch((error) => console.error('Error reading tutor: ', error))
        .finally(() => setLoading(false))
    }, [id]);


    const handleUpdate = () => {
        setLoading(true);
        axios
            .put(`http://localhost:8082/api/tutoring/tutor/${id}`, { name: newName, email: newEmail })
            .then((res) => {
                console.log(res.data);
                navigate(`/read-tutor/${id}`);
            })
            .catch((error) => console.error('Error updating tutor: ', error))
            .finally(() => {
                setLoading(false);
            });
    }

    const handleChangeName = (e: any) => {
        setNewName(e.target.value);
    }

    const handleChangeEmail = (e: any) => {
        setNewEmail(e.target.value);
    }

    if (loading) return <div>Loading...</div>
    if (!tutor) return <div>No tutor with ID {id} found!</div>
    
    return (
        <div className="py-4`">
            <h1 className="text-center mb-4 font-bold">Update Tutor</h1>
            <BackToTutors />
            <form 
                className="bg-neutral-900 px-8 py-4 mt-2 rounded" 
                onSubmit={handleUpdate}
            >
                <label>
                    <b>Name: </b>
                    <input
                        type="text"
                        value={newName}
                        onChange={handleChangeName}
                        className="px-4 py-1 mb-2 w-full rounded"
                    />
                </label>
                <label>
                    <b>Email: </b>
                    <input
                        type="text"
                        value={newEmail}
                        onChange={handleChangeEmail}
                        className="px-4 py-1 mb-4 w-full rounded"
                    />
                </label>
                <h3 className="font-bold mb-2">Courses</h3>
                <UpdateTutorCourses inputCourses={courses}/>
                <br></br>
                <h3 className="font-bold mb-2">Schedule</h3>
                <UpdateTutorWeek inputSchedule={tutor.schedule}/>
                <button
                    className="bg-neutral-800 rounded my-4"
                    type="submit"
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateTutor;