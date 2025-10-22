import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Subject from './pages/Subject';
import WorksheetDetail from './pages/WorksheetDetail';
import ParentResources from './pages/ParentResources';
import Activities from './pages/Activities';

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '0.5rem 1rem', background: '#eee', justifyContent: 'flex-end' }}>
      <Link to="/">Home</Link>
      <Link to="/reading">Reading</Link>
      <Link to="/math">Math</Link>
      <Link to="/activities">At Home Activities</Link>
      <Link to="/parent-resources">Parent Resources</Link>
      <Link to="/about">About Us</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/math" element={<Subject subject="Math" />} />
        <Route path="/reading" element={<Subject subject="Reading" />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/worksheet/:id" element={<WorksheetDetail />} />
        <Route path="/parent-resources" element={<ParentResources />} />
      </Routes>
    </Router>
  );
}

export default App;
