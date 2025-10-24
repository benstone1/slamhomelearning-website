
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from "framer-motion";

function WorksheetDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const worksheet = {};
  for (const [key, value] of params.entries()) {
    worksheet[key] = value;
  }

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
            <span className="text-gray-900">{worksheet.Filename}</span>
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
            {worksheet.Filename}
          </h1>

          {/* Video Section */}
          {worksheet['Video Title'] && worksheet['Video Title'] !== 'n/a' && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Related Video</h3>
                  <p className="text-gray-700">{worksheet['Video Title']}</p>
                </div>
              </div>
            </div>
          )}

          {/* Resource Description */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Resource</h3>
            <div className="space-y-3 text-gray-700">
              {worksheet.Description ? (
                <p className="leading-relaxed">{worksheet.Description}</p>
              ) : (
                <p>
                  This {category?.toLowerCase() || 'resource'} is designed to support {subject?.toLowerCase() || 'learning'} skills 
                  {worksheet['Grade Level'] && ` for ${worksheet['Grade Level'] === 'K' ? 'kindergarten' : `grade ${worksheet['Grade Level']}`} students`}.
                </p>
              )}
            </div>
          </div>

          {/* Download Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to get started?</h3>
                <p className="text-gray-600">Download this resource and start learning today!</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/${subject?.toLowerCase()}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  ← Back to {subject}
                </Link>
                <a
                  href={`/worksheets/${subject ? subject.toLowerCase() : ''}/${encodeURIComponent(worksheet.Filename)}.pdf`}
                  download
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WorksheetDetail;
