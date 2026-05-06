import React, { useEffect, useState } from 'react';
// Step 7: Importing Link to allow navigation between pages
import { Link } from 'react-router-dom';
// Step 3: Importing tools from your API service
import { getDoctors, deleteDoctor } from '../services/api';

function DoctorsList() {
    // Step 4: Managing data, loading, and error states
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to refresh the list from the backend
    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const data = await getDoctors(); 
            setDoctors(data);
            setError(null);
        } catch (err) {
            setError("Failed to connect to the backend. Make sure your .NET project is running.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Step 3: Delete logic
    const handleDelete = async (id) => {
        if (!id) {
            alert("Error: Doctor ID is missing.");
            return;
        }
        
        if (window.confirm("Are you sure you want to remove this doctor?")) {
            try {
                await deleteDoctor(id);
                fetchDoctors(); // Refresh list after deleting
            } catch (err) {
                // If it fails here, it's usually a CORS issue in the backend
                alert("Could not delete. Check if CORS is enabled in your .NET Program.cs file.");
            }
        }
    };

    if (loading) return <p style={{ padding: '20px' }}>Loading doctors...</p>;
    if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            {/* Step 7: Requirement - Navigation link to the Create Page */}
            <Link to="/add">
                <button style={{ 
                    marginBottom: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>
                    + Add New Doctor
                </button>
            </Link>

            <h1>Hospital Doctors</h1>

            {doctors.length === 0 ? (
                <p>No doctors found in the system.</p>
            ) : (
                <ul>
                    {doctors.map(doctor => (
                        /* Using || to handle both lowercase 'id' and uppercase 'Id' from .NET */
                        <li key={doctor.id || doctor.Id} style={{ marginBottom: '10px', fontSize: '18px' }}>
                            {/* FIX: Checking for both .name and .specialization from backend */}
                            <strong>{doctor.name || doctor.Name}</strong> - {doctor.specialization || doctor.Specialization || "No specialty listed"} 
                            <button 
                                onClick={() => handleDelete(doctor.id || doctor.Id)}
                                style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DoctorsList;