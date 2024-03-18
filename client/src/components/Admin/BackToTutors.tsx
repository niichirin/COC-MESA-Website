import { useNavigate } from "react-router-dom";

const BackToTutors = () => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate('/tutors/');
    return (
        <button 
            className="rounded" 
            onClick={handleGoBack}
        >
            Back to Tutors
        </button>
    ) 
}

export default BackToTutors;