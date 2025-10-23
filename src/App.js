import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Subject from './pages/Subject';
import WorksheetDetail from './pages/WorksheetDetail';
import ParentResources from './pages/ParentResources';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src="/images/slam-logo.png" 
              alt="SLAM - Supporting Literacy And Math" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/reading" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md font-medium">
              Reading
            </Link>
            <Link to="/math" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md font-medium">
              Math
            </Link>
            <Link to="/parent-resources" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md font-medium">
              Parent Resources
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md font-medium">
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="block text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/reading"
                className="block text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                onClick={closeMenu}
              >
                Reading
              </Link>
              <Link
                to="/math"
                className="block text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                onClick={closeMenu}
              >
                Math
              </Link>
              <Link
                to="/parent-resources"
                className="block text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                onClick={closeMenu}
              >
                Parent Resources
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
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
        <Route path="/worksheet/:id" element={<WorksheetDetail />} />
        <Route path="/parent-resources" element={<ParentResources />} />
      </Routes>
    </Router>
  );
}

export default App;
