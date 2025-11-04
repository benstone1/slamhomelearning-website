
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { checkPDFExists } from '../utils/pdfChecker';

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// YouTube embed component
function YouTubeEmbed({ videoId, title }) {
  if (!videoId) return null;
  
  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-lg mb-6">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "Educational Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function WorksheetDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const worksheet = {};
  for (const [key, value] of params.entries()) {
    worksheet[key] = value;
  }

  const [pdfExists, setPdfExists] = useState(null); // null = checking, true/false = result
  
  // Check if PDF exists when component loads
  useEffect(() => {
    if (worksheet.Filename && worksheet.Subject) {
      checkPDFExists(worksheet.Filename, worksheet.Subject)
        .then(exists => setPdfExists(exists))
        .catch(() => setPdfExists(false));
    } else {
      setPdfExists(false);
    }
  }, [worksheet.Filename, worksheet.Subject]);

  // Function to format grade levels using boolean fields
  const formatGradeLevel = (worksheet) => {
    const grades = [];
    if (worksheet.isKinder === 'TRUE') grades.push('K');
    if (worksheet.isFirst === 'TRUE') grades.push('1st');
    if (worksheet.isSecond === 'TRUE') grades.push('2nd');
    
    if (grades.length === 0) return '';
    if (grades.length === 1) return grades[0];
    return grades.join(', ');
  };

  if (!worksheet.Filename) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Resource Not Found</h2>
          <p className="text-gray-600 mb-6">No worksheet data was found for this resource.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const subject = worksheet['Subject'];
  const category = worksheet['Category'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/70 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <Link 
              to={`/${subject?.toLowerCase()}`} 
              className="hover:text-emerald-600 transition-colors"
            >
              {subject} Resources
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{worksheet.Filename.trim()}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100"
        >
          {/* Badge Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              category === 'Activity' ? 'bg-green-100 text-green-800' :
              category === 'Parent Guide' ? 'bg-blue-100 text-blue-800' :
              category === 'Games' || category === 'Ganes' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {category === 'Games' || category === 'Ganes' ? 'Game' : category || 'Resource'}
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              subject === 'Math' ? 'bg-orange-100 text-orange-800' :
              subject === 'Reading' ? 'bg-indigo-100 text-indigo-800' :
              'bg-emerald-100 text-emerald-800'
            }`}>
              {subject}
            </div>
            {worksheet['Grade Level'] && (
              <div className="flex flex-wrap gap-2">
                {worksheet['Grade Level'].replace(/['"]/g, '').split(',').map((grade, idx) => {
                  const cleanGrade = grade.trim();
                  const displayGrade = cleanGrade === 'K' ? 'K' : cleanGrade.match(/^\d+$/) ? `Grade ${cleanGrade}` : cleanGrade;
                  return (
                    <div key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {displayGrade}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {worksheet.Filename.trim()}
          </h1>

          {/* Video Section */}
          {worksheet['Video Title'] && worksheet['Video Title'] !== 'n/a' && worksheet['Video Title'].trim() !== '' && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Video</h3>
              <p className="text-gray-700 mb-4 text-lg">{worksheet['Video Title']}</p>
              <p className="text-gray-600 italic">Note: Video integration needs to be configured for this resource.</p>
            </div>
          )}

          {/* Download Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pdfExists === null ? 'Checking availability...' : 
                   pdfExists === false ? 'File not available' : 
                   'Ready to get started?'}
                </h3>
                <p className="text-gray-600">
                  {pdfExists === null ? 'Please wait while we verify the file exists.' :
                   pdfExists === false ? 'This resource is currently unavailable. Please contact support.' :
                   'Download this resource and start learning today!'}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/${subject?.toLowerCase()}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  ← Back to {subject}
                </Link>
                {pdfExists === null ? (
                  <div className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-600 rounded-xl font-semibold">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Checking...
                  </div>
                ) : pdfExists === false ? (
                  <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    File Missing
                  </div>
                ) : (
                  <a
                    href={`/worksheets/${worksheet.Subject ? worksheet.Subject.toLowerCase() : ''}/${encodeURIComponent(worksheet.Filename.trim().endsWith('.pdf') ? worksheet.Filename.trim() : worksheet.Filename.trim() + '.pdf')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WorksheetDetail;
