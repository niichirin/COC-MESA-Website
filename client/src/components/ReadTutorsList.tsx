import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import TutorCard from "./TutorCard.tsx"

// reads ALL tutors in DB

interface Tutor {
    tutor_id: number;
    name: string;
    email: string;
}

const ReadTutorsList = () => {
    
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [tutors, setTutors] = useState<{ [key: string]: Tutor }>({});

    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8082/api/tutoring/tutor")
            .then((res) => setTutors(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    }

    const handleAddClick = (e: any) => {
        navigate("/create-tutor");
    }

    const renderTutor = (key: string) => {
        let tutor: Tutor = tutors[key];
        if (tutor.name.toLowerCase().includes(search)) {
            return (    
                <div 
                    key={tutor.tutor_id} 
                    className="TutorCard"
                >
                    <TutorCard 
                        tutor={tutor}
                    />
                </div>
            )
        }
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h1>Tutors</h1>
            <div style={{ marginBottom: "1rem"}}>
                <button 
                    className="AddTutorBtn" 
                    onClick={handleAddClick}
                >
                    Add Tutor
                </button>
                <label>
                    <input
                        className="SearchTutorBar"
                        type="text"
                        placeholder="Search Tutor"
                        onChange={handleSearchChange}
                    >
                    </input>
                </label>
            </div>
            <div className="TutorsList">
                {Object.keys(tutors).map((key) => {
                    return renderTutor(key)
                })}
            </div>
        </div>
    )
    
}

export default ReadTutorsList;