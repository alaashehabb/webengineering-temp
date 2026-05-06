import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DoctorsList from './pages/DoctorsList';
import CreateDoctor from './pages/CreateDoctor'; // Step 5: Imported the Create Page

function App() {
  return (
    <Router>
      <div className="App">
        {/* Step 7: Requirement - Navigation bar with links */}
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/doctors" style={{ marginRight: '15px' }}>View Doctors</Link>
          <Link to="/add">Add Doctor</Link>
        </nav>

        {/* Step 2: Requirement - Setting up the path for each page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/add" element={<CreateDoctor />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;