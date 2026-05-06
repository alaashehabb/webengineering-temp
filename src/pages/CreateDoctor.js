import React, { useState } from 'react';
import { addDoctor } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

function CreateDoctor() {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [nameError, setNameError] = useState(''); // State for input validation
    const [isSubmitting, setIsSubmitting] = useState(false); // State for loading
    const navigate = useNavigate();

    // List of 20 specializations for the dropdown
    const specializations = [
        "Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics",
        "Oncology", "Psychiatry", "Radiology", "General Surgery", "Internal Medicine",
        "Gastroenterology", "Ophthalmology", "Urology", "Anesthesiology", "Endocrinology",
        "Hematology", "Nephrology", "Pulmonology", "Rheumatology", "Emergency Medicine"
    ];

    // Logic to handle name changes and block numbers
    const handleNameChange = (e) => {
        const value = e.target.value;
        const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces

        if (!nameRegex.test(value)) {
            setNameError("Names cannot contain numbers or special characters.");
        } else {
            setNameError("");
            setName(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Final check before sending to backend
        if (nameError || name.trim() === '' || specialty === '') return;

        setIsSubmitting(true); // Start loading state
        try {
            await addDoctor({ 
                Name: name, 
                Specialization: specialty 
            }); 
            
            alert('Doctor added successfully!');
            navigate('/doctors'); 
        } catch (error) {
            console.error("Add failed. Error details:", error.response?.data || error.message);
            alert('Failed to add doctor. Check the console for details.');
        } finally {
            setIsSubmitting(false); // End loading state
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add a New Doctor</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field with Validation */}
                <div>
                    <label>Name: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={handleNameChange} 
                        required 
                    />
                    {nameError && (
                        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                            {nameError}
                        </p>
                    )}
                </div>
                
                <br />

                {/* Specialty Dropdown Requirement */}
                <div>
                    <label>Specialty: </label>
                    <select 
                        value={specialty} 
                        onChange={(e) => setSpecialty(e.target.value)} 
                        required
                        style={{ padding: '5px', borderRadius: '4px', width: '210px' }}
                    >
                        <option value="">-- Select a Specialty --</option>
                        {specializations.map((spec, index) => (
                            <option key={index} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                <button 
                    type="submit" 
                    disabled={isSubmitting || nameError || !specialty} 
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    {isSubmitting ? 'Saving...' : 'Save Doctor'}
                </button>
            </form>
        </div>
    );
}

export default CreateDoctor;