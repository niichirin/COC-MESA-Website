import { useState } from 'react';
import axios from 'axios';

import BackToTutors from './BackToTutors';

const CreateTutor = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/api/tutoring/tutor", { name, email });
            setSuccessMessage('Tutor created successfully! Update their info in the dashboard');
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
        <>
            <h2 className="my-2 text-center font-bold">Create Tutor</h2>
            <BackToTutors />
            <div className="px-4 py-8 mt-4 bg-neutral-900 rounded">
                {loading && <div>Loading...</div>}
                {errorMessage && <div className="text-red-400 mb-2">{errorMessage}</div>}
                {successMessage && <div className="text-green-400 mb-2">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name"><b>Name: </b></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-1 mb-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email"><b>Email: </b></label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-1 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-neutral-800 rounded">Create Tutor</button>
                </form>
            </div>
        </>
    );
};

export default CreateTutor;
