import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const CreateTutor = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/api/tutoring/tutor", { name, email });
            setSuccessMessage('Tutor created successfully!');
            setErrorMessage('');
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error creating tutor: ', error);
            setErrorMessage('Failed to create tutor. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Link to="/">Back to Tutors</Link>
            <h2 style={{textAlign:"center"}}>Create Tutor</h2>
            {loading && <div>Loading...</div>}
            {errorMessage && <div style={{color:"red"}}>{errorMessage}</div>}
            {successMessage && <div style={{color:"lightgreen"}}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{marginTop:"1rem"}}>Create Tutor</button>
            </form>
        </div>
    );
};

export default CreateTutor;
