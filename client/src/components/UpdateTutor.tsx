import {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackToTutors from "./BackToTutors";

// updates tutor by ID from DB

interface Tutor {
    tutor_id: number, 
    name: string, 
    email: string 
}

const UpdateTutor = () => {

    const [tutor, setTutor] = useState<Tutor>();
    const [loading, setLoading] = useState(false);

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8082/api/tutoring/tutor/${id}`)
            .then((res) => {
                setTutor(res.data);
                setNewName(res.data.name);
                setNewEmail(res.data.email);
            })
            .catch((error) => console.error('Error updating tutor: ', error))
            .finally(() => setLoading(false))
    }, []);

    const handleUpdate = () => {
        setLoading(true);
        axios  
            .put(`http://localhost:8082/api/tutoring/tutor/${id}`, { name: newName, email: newEmail } )
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
            <button 
                style={{marginTop: "0.5rem"}}
                type="submit"
            >
                Update
            </button>
        </form>
        </div>
    )
}

export default UpdateTutor;