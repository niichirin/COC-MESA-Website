import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";


interface TutorCardProps {
    id: number,
    name: string,
    email: string
}

const TutorCard: React.FC<TutorCardProps> = ({ id, name, email}) => {
    return (
        <>
            <h3>{name}</h3>
            <p><b>Email: </b><u><a href={`mailto:${email}`}>{email}</a></u></p>
        </>
    )
}

export default TutorCard;