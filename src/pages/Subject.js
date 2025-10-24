import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// Helper function to parse CSV lines with proper quote handling
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      // Remove surrounding quotes if present and trim
      let value = current.trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      result.push(value);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Handle the last value
  let value = current.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }
  result.push(value);
  return result;
}

function Subject({ subject }) {
  const [worksheets, setWorksheets] = useState([]);

  // Function to parse and format grade levels
  const formatGradeLevel = (gradeString) => {
    if (!gradeString) return '';
    
    // Remove quotes and extra spaces
    const cleanGrade = gradeString.replace(/['"]/g, '').trim();
    
    // Handle single grades
    if (cleanGrade === 'K') return 'K';
    if (cleanGrade.match(/^\d+$/)) return `Grade ${cleanGrade}`;
    
    // Handle multiple grades (e.g., "K, 1", "K, 1, 2")
    const grades = cleanGrade.split(',').map(g => g.trim()).filter(g => g);
    if (grades.length > 1) {
      const formattedGrades = grades.map(g => {
        if (g === 'K') return 'K';
        if (g.match(/^\d+$/)) return g;
        return g;
      });
      return formattedGrades.join(', ');
    }
    
    // Default case
    return cleanGrade;
  };

  useEffect(() => {
    fetch('/worksheets/worksheet_metadata.csv')
      .then(res => res.text())
      .then(text => {
        // Parse CSV properly handling quoted values
        const lines = text.split('\n').filter(line => line.trim());
        const headers = parseCSVLine(lines[0]);
        const data = lines.slice(1).map(line => {
          const values = parseCSVLine(line);
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = values[i] || '';
          });
          return obj;
        });
        // Filter by subject
        const filtered = data.filter(ws => ws.Subject && ws.Subject.toLowerCase() === subject.toLowerCase());
        setWorksheets(filtered);
      });
  }, [subject]);

  // Choose image and colors based on subject
  let imageSrc = '';
  let imageAlt = '';
  let accentColor = 'emerald';
  if (subject === 'Math') {
    imageSrc = '/images/Math_Game.jpeg';
    imageAlt = 'Math Game';
    accentColor = 'blue';
  } else if (subject === 'Reading') {
    imageSrc = '/images/Book_Reading.jpeg';
    imageAlt = 'Book Reading';
    accentColor = 'purple';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {imageSrc && (
          <div className="absolute inset-0 h-80">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90"></div>
          </div>
        )}
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {subject} Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {subject === 'Math' 
                ? 'Discover engaging math activities, games, and resources to build strong number sense and problem-solving skills.'
                : 'Explore reading activities, book suggestions, and tools to develop literacy skills from kindergarten through 2nd grade.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Worksheets Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Available Resources ({worksheets.length})
          </h2>
          
          {worksheets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg">No resources found for {subject}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {worksheets.map((ws, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    // Pass worksheet metadata via query string
                    const params = new URLSearchParams(ws).toString();
                    window.location.href = `/worksheet/${idx}?${params}`;
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-emerald-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          ws.Category === 'Activity' ? 'bg-green-100 text-green-800' :
                          ws.Category === 'Parent Guide' ? 'bg-blue-100 text-blue-800' :
                          ws.Category === 'Games' || ws.Category === 'Ganes' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ws.Category === 'Games' || ws.Category === 'Ganes' ? 'Game' : ws.Category || 'Resource'}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          subject === 'Math' ? 'bg-orange-100 text-orange-800' :
                          subject === 'Reading' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {subject}
                        </div>
                      </div>
                      {ws['Grade Level'] && (
                        <div className="flex flex-wrap gap-1">
                          {ws['Grade Level'].replace(/['"]/g, '').split(',').map((grade, idx) => {
                            const cleanGrade = grade.trim();
                            const displayGrade = cleanGrade === 'K' ? 'K' : cleanGrade.match(/^\d+$/) ? `Grade ${cleanGrade}` : cleanGrade;
                            return (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                                {displayGrade}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 flex-1">
                        {ws.Filename || 'Untitled'}
                      </h3>
                      {ws['Video Link'] && ws['Video Link'] !== 'n/a' && ws['Video Link'].trim() !== '' && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                            </svg>
                            Video
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-end mt-auto pt-4">
                      <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        <span className="text-sm font-medium mr-1">View</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Subject;
