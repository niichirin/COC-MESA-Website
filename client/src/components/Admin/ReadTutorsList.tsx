import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

    const handleAddClick = () => {
        navigate("/create-tutor");
    }

    // re-use this memoized component until the search input changes
    // this prevents re-renders on every refresh
    const renderedTutors = useMemo(() => {
        return Object.keys(tutors).map((key) => {
            const tutor: Tutor = tutors[key];
            if (tutor.name.toLowerCase().includes(search.toLowerCase())) {
                return (
                    <div 
                        key={tutor.tutor_id}
                        className="bg-neutral-900 px-8 py-4 rounded"
                    >
                        <TutorCard tutor={tutor} />
                    </div>
                );
            }
            return null;
        });
    }, [tutors, search]);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-4">Tutors</h1>
            <div className="mb-4">
                <button
                    className="bg-neutral-700 rounded px-4 py-2 mr-4"
                    onClick={handleAddClick}
                >
                    Add Tutor
                </button>
                <label>
                    <input
                        className="bg-neutral-600 px-4 py-2 rounded"
                        type="text"
                        placeholder="Search Tutor"
                        onChange={handleSearchChange}
                    >
                    </input>
                </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {renderedTutors}
            </div>
        </div>
    )

}

export default ReadTutorsList;