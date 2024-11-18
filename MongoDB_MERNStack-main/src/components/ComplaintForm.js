import React, { useState } from 'react';
import './ComplaintForm.css';

function ComplaintForm() {
    const [name, setName] = useState('');
    const [complaint, setComplaint] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success message

        try {
            const response = await fetch('http://localhost:3009/api/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, complaint }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the response as text
                console.error('Error response:', errorText); // Log the error response
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Complaint submitted:', data);
            setSuccessMessage('Complaint submitted successfully!');
            // Reset form
            setName('');
            setComplaint('');
        } catch (error) {
            console.error('Submission error:', error);
            setErrorMessage('An error occurred while submitting your complaint. Please try again.');
        }
    };

    return (
        <div className="complaint-container">
            <form onSubmit={handleSubmit}>
                <h2>Complaint Form</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Complaint</label>
                    <textarea
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit Complaint</button>
            </form>
        </div>
    );
}

export default ComplaintForm;
