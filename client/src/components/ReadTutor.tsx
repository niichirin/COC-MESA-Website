import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackToTutors from "./BackToTutors";
import TutorCoursesList from "./TutorCoursesList";
import TutorScheduleList from "./TutorScheduleList";

// reads tutor by ID from DB

interface Tutor {
    tutor_id: number, 
    name: string, 
    email: string 
    schedule: any
}

interface Course {
    course_id: number,
    name: string,
    subject: string,
    number: number
}

const ReadTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [courses, setCourses] = useState<{ [key: string]: Course }>({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8082/api/tutoring/tutor/${id}`)
            .then((res) => {setTutor(res.data); console.log(res.data)})
            .catch((error) => console.error('Error reading tutor: ', error))
            .finally(() => setLoading(false))
        axios
            .get(`http://localhost:8082/api/tutoring/tutor/course/${id}`)
            .then((res) => setCourses(res.data))
            .catch((error) => console.error('Error reading tutor courses: ', error))
            .finally(() => setLoading(false))
    }, [id]);

    const handleUpdateClick = () => {
        navigate(`/update-tutor/${id}`)
    }

    const handleDeleteClick = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8082/api/tutoring/tutor/${id}`)
            .then((res) => navigate('/'))
            .catch((error) => console.error('Error deleting tutor: ', error))
            .finally(() => setLoading(false));
    }

    const renderedCourses = useMemo(() => {
        return Object.keys(courses).reduce((accum: string, key: string, index: number) => {
            let currStr = "";
            if (courses[key].number == 0) {
                // this tutor teaches all of a subject
                switch(courses[key].subject) {
                    case "MATH": 
                        currStr = "All Math";
                        break;
                    case "PHYSIC": 
                        currStr = "All Physics";
                        break;
                    case "CMPSCI":
                        currStr = "All CS";
                        break;
                    case "ENGR":
                        currStr = "All Engineering";
                        break;
                    case "BIOSCI":
                        currStr = "All Biology";
                        break;
                    case "CHEM":
                        currStr = "All Chemistry";
                        break;
                    case "ENGL":
                        currStr = "All English";
                        break;
                }
            } else {
                // this tutor teaches this specific course
                currStr += courses[key].subject + '-' + courses[key].number;
            }
            // end of list
            if (index + 1 != Object.keys(courses).length){
                currStr += ", ";
            }
            // concatenate 
            return accum + currStr;
        }, "");
    }, [courses, id]);

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