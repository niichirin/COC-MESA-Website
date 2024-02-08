import React from "react";
import { useNavigate } from "react-router-dom";

const BackToTutors = () => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate('/');
    return <button className="BackToTutorsBtn" onClick={handleGoBack}>Back to Tutors</button>
}

export default BackToTutors;