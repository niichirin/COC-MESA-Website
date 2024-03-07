import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Tutor, Course } from "./Interfaces.ts"
import BackToTutors from "./BackToTutors";
import UpdateTutorCourses from "./UpdateTutorCourses.tsx"
import UpdateTutorSchedule from "./UpdateTutorSchedule.tsx";

// updates tutor by ID from DB

const UpdateTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [courses, setCourses] = useState<{ [key: string]: Course }>();
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
        <div>
            <BackToTutors />
            <form className="TutorCard" onSubmit={handleUpdate}>
                <label>
                    <b>Name: </b>
                    <input
                        type="text"
                        value={newName}
                        onChange={handleChangeName}
                    />
                </label>
                <br></br>
                <label>
                    <b>Email: </b>
                    <input
                        type="text"
                        value={newEmail}
                        onChange={handleChangeEmail}
                    />
                </label>
                <br></br>
                <UpdateTutorCourses courses={courses}/>
                <UpdateTutorSchedule schedule={tutor.schedule}/>
                <button
                    style={{ marginTop: "0.5rem" }}
                    type="submit"
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateTutor;