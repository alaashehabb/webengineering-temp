import React, { useState } from 'react';
import { addDoctor } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

function CreateDoctor() {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            // FIX: Using Capital letters to match the C# 'DoctorRequest' properties exactly
            await addDoctor({ 
                Name: name, 
                Specialization: specialty 
            }); 
            
            alert('Doctor added successfully!');
            navigate('/doctors'); 
        } catch (error) {
            // This will help us see the error in the browser console (Press F12)
            console.error("Add failed. Error details:", error.response?.data || error.message);
            alert('Failed to add doctor. Check the console for details.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add a New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <br />
                <div>
                    <label>Specialty: </label>
                    <input 
                        type="text" 
                        value={specialty} 
                        onChange={(e) => setSpecialty(e.target.value)} 
                        required 
                    />
                </div>
                <br />
                <button type="submit">Save Doctor</button>
            </form>
        </div>
    );
}

export default CreateDoctor;