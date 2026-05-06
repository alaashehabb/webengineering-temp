import axios from 'axios';

// 1. The Base URL for your .NET Backend (Matching your port 5142)
const API_URL = 'http://localhost:5142/api';

// 2. GET: Fetch all doctors (Requirement: Fetch data)
export const getDoctors = async () => {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
};

// 3. POST: Add a new doctor (Requirement: Add data)
export const addDoctor = async (doctorData) => {
    const response = await axios.post(`${API_URL}/doctors`, doctorData);
    return response.data;
};

// 4. PUT: Update an existing doctor (Requirement: Update data)
export const updateDoctor = async (id, doctorData) => {
    const response = await axios.put(`${API_URL}/doctors/${id}`, doctorData);
    return response.data;
};

// 5. DELETE: Remove a doctor (Requirement: Delete data)
export const deleteDoctor = async (id) => {
    const response = await axios.delete(`${API_URL}/doctors/${id}`);
    return response.data;
};