import React from "react";
import { Link } from "react-router-dom";

interface TutorCardProps {
    tutor: { tutor_id: number, name: string, email: string }
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
    return (
        <>
            <h3><Link to={`/read-tutor/${tutor.tutor_id}`}>{tutor.name}</Link></h3>
            <p><b>Email: </b><u><a href={`mailto:${tutor.email}`}>{tutor.email}</a></u></p>
        </>
    )
}

export default TutorCard;