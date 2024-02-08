import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackToTutors from "./BackToTutors";

// reads tutor by ID from DB

interface Tutor {
    tutor_id: number, 
    name: string, 
    email: string 
}

const ReadTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8082/api/tutoring/tutor/${id}`)
            .then((res) => setTutor(res.data))
            .catch((error) => console.error('Error reading tutor: ', error))
            .finally(() => setLoading(false))
    }, []);

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

    if (loading) return <div>Loading...</div>;
    if (tutor == null) return <div>No tutor with {id} found!</div>;

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Tutor Information</h2>
            <BackToTutors />
            <div className="TutorCard">
                <h3>{tutor.name}</h3>
                <p><b>Email: </b><u><a href={`mailto:${tutor.email}`}>{tutor.email}</a></u></p>
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