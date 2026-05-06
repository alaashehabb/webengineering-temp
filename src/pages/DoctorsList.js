import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors, deleteDoctor } from '../services/api';

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        if (!id) {
            alert("Error: Doctor ID is missing.");
            return;
        }
        
        if (window.confirm("Are you sure you want to remove this doctor?")) {
            try {
                await deleteDoctor(id);
                fetchDoctors(); 
            } catch (err) {
                alert("Could not delete. Check if CORS is enabled in your .NET Program.cs file.");
            }
        }
    };

    if (loading) return <p style={{ padding: '20px' }}>Loading doctors...</p>;
    if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
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
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {doctors.map(doctor => (
                        <li key={doctor.id || doctor.Id} style={{ 
                            marginBottom: '15px', 
                            fontSize: '18px',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '10px' 
                        }}>
                            {/* DISPLAYING THE UNIQUE ID STARTING FROM 1000 */}
                            <span style={{ 
                                backgroundColor: '#f0f0f0', 
                                padding: '2px 8px', 
                                borderRadius: '4px', 
                                marginRight: '10px',
                                fontWeight: 'bold',
                                color: '#555'
                            }}>
                                ID: {doctor.id || doctor.Id}
                            </span>

                            <strong>{doctor.name || doctor.Name}</strong> - {doctor.specialization || doctor.Specialization || "No specialty listed"} 
                            
                            <button 
                                onClick={() => handleDelete(doctor.id || doctor.Id)}
                                style={{ marginLeft: '15px', color: 'red', cursor: 'pointer', border: '1px solid red', borderRadius: '3px', padding: '2px 10px' }}
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