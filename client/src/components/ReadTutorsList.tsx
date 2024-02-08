import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const [tutors, setTutors] = useState({});

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8082/api/tutoring/tutor")
            .then((res) => setTutors(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <div className="TutorsList">
                {Object.keys(tutors).map((key) => {
                    let tutor: Tutor = tutors[key];
                    return <div key={tutor.tutor_id} className="TutorCard">
                        <TutorCard 
                            id={tutor.tutor_id}
                            name={tutor.name}
                            email={tutor.email}
                        />
                    </div>
                })}
            </div>
            {/* <div>
                <Link
                    to={`/create-tutor`}
                    className="AddTutorBtn"
                >
                    Add Tutor
                </Link>
            </div> */}
        </div>
    )
}

export default ReadTutorsList;