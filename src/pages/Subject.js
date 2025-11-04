import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { checkMultiplePDFsExist } from '../utils/pdfChecker';

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
  const [allWorksheets, setAllWorksheets] = useState([]);
  const [filteredWorksheets, setFilteredWorksheets] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Activity'); // Default to Activities
  const [isCheckingFiles, setIsCheckingFiles] = useState(false);

  // Grade levels to display
  const grades = [
    { key: 'K', label: 'Kindergarten' },
    { key: '1', label: 'First Grade' },
    { key: '2', label: 'Second Grade' }
  ];

  // Categories for filtering
  const categories = [
    { key: 'Activity', label: 'Activities', icon: '🎨' },
    { key: 'Games', label: 'Games', icon: '🎲' },
    { key: 'Parent Guide', label: 'Guides', icon: '📖' }
  ];

  // Function to check if worksheet matches the selected grade using boolean fields
  const worksheetMatchesGrade = (worksheet, gradeKey) => {
    switch(gradeKey) {
      case 'K':
        return worksheet.isKinder === 'TRUE';
      case '1':
        return worksheet.isFirst === 'TRUE';
      case '2':
        return worksheet.isSecond === 'TRUE';
      default:
        return false;
    }
  };

  useEffect(() => {
    const loadAndValidateWorksheets = async () => {
      setIsCheckingFiles(true);
      try {
        const response = await fetch(`/worksheets/worksheet_metadata.csv?v=${Date.now()}`);
        const text = await response.text();
        
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
        
        // Filter by subject and exclude Parent Resources Guide
        const subjectFiltered = data.filter(ws => 
          ws.Subject && 
          ws.Subject.toLowerCase() === subject.toLowerCase() &&
          ws.Subject !== 'Parent Resources Guide'
        ).map(ws => ({
          ...ws,
          // Add .pdf extension to filename if not present
          Filename: ws.Filename && !ws.Filename.endsWith('.pdf') ? `${ws.Filename}.pdf` : ws.Filename
        }));
        
        // Check which PDFs actually exist
        const validWorksheets = await checkMultiplePDFsExist(subjectFiltered);
        
        // Log any missing files for debugging
        const missingFiles = subjectFiltered.filter(ws => 
          !validWorksheets.find(vw => vw.Filename === ws.Filename)
        );
        if (missingFiles.length > 0) {
          console.warn(`${missingFiles.length} worksheets have missing PDF files:`, 
            missingFiles.map(ws => ws.Filename)
          );
        }
        
        setAllWorksheets(validWorksheets);
      } catch (error) {
        console.error('Error loading worksheets:', error);
        setAllWorksheets([]);
      } finally {
        setIsCheckingFiles(false);
      }
    };

    loadAndValidateWorksheets();
  }, [subject]);

  // Function to check if worksheet matches the selected category
  const worksheetMatchesCategory = (worksheet, categoryKey) => {
    const category = worksheet.Category;
    if (!category) return false;
    
    // Handle different category variations
    if (categoryKey === 'Games') {
      return category === 'Games' || category === 'Ganes'; // Handle typo in CSV
    }
    return category === categoryKey;
  };

  // Filter worksheets when grade or category changes
  useEffect(() => {
    if (selectedGrade && allWorksheets.length > 0) {
      let filtered = allWorksheets.filter(ws => worksheetMatchesGrade(ws, selectedGrade));
      
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(ws => worksheetMatchesCategory(ws, selectedCategory));
      }
      
      setFilteredWorksheets(filtered);
    } else {
      setFilteredWorksheets([]);
    }
  }, [selectedGrade, selectedCategory, allWorksheets]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1E90D2' }}>
              {subject} Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {subject === 'Math' 
                ? 'Discover engaging math activities, guides, and games to build strong number sense and problem-solving skills.'
                : 'Explore reading activities, guides, and games to develop literacy.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grade Selection */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1E90D2' }}>
            Select a Grade Level
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {grades.map((grade) => (
              <button
                key={grade.key}
                onClick={() => setSelectedGrade(grade.key)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  selectedGrade === grade.key
                    ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 shadow-md hover:shadow-lg'
                }`}
              >
                {grade.label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Worksheets Grid - Only show when grade is selected */}
      {selectedGrade && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              {grades.find(g => g.key === selectedGrade)?.label} {subject} Resources
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filter */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter by Type
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          selectedCategory === category.key
                            ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span className="text-xl mr-3">{category.icon}</span>
                        <div>
                          <div className="font-medium">{category.label}</div>
                          <div className="text-xs text-gray-500">
                            {allWorksheets.filter(ws => 
                              worksheetMatchesGrade(ws, selectedGrade) && 
                              worksheetMatchesCategory(ws, category.key)
                            ).length} items
                          </div>
                        </div>
                        {selectedCategory === category.key && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Clear filter option */}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Show All Types
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {isCheckingFiles ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">
                      Checking file availability...
                    </p>
                  </div>
                ) : filteredWorksheets.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                    <p className="text-gray-600 text-lg">
                      No {selectedCategory ? categories.find(c => c.key === selectedCategory)?.label.toLowerCase() : subject.toLowerCase()} resources found for {grades.find(g => g.key === selectedGrade)?.label}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredWorksheets.map((ws, idx) => (
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
                          <div className="flex items-center gap-2 mb-4">
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
                          
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 flex-1">
                              {(ws.Filename || 'Untitled').trim().replace(/\.pdf$/i, '')}
                            </h3>
                            {ws['Video Title'] && ws['Video Title'] !== 'n/a' && ws['Video Title'].trim() !== '' && (
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
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}

export default Subject;
