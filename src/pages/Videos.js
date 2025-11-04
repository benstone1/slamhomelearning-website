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
  
  let value = current.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }
  result.push(value);
  return result;
}

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
    <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-lg">
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

function Videos() {
  const [videos, setVideos] = useState([]);
  const [worksheets, setWorksheets] = useState([]);

  useEffect(() => {
    // Fetch video links
    const fetchVideos = fetch(`/video_links.csv?v=${Date.now()}`)
      .then(res => res.text())
      .then(text => {
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
        
        // Filter out empty entries and ensure we have both title and link
        const validVideos = data.filter(video => 
          video.Title && 
          video.Link && 
          video.Title.trim() !== '' && 
          video.Link.trim() !== ''
        );
        
        return validVideos;
      });

    // Fetch worksheet metadata
    const fetchWorksheets = fetch(`/worksheets/worksheet_metadata.csv?v=${Date.now()}`)
      .then(res => res.text())
      .then(text => {
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
        return data.filter(ws => ws.Filename && ws.Filename.trim() !== '');
      });

    // Wait for both to complete
    Promise.all([fetchVideos, fetchWorksheets]).then(([videoData, worksheetData]) => {
      setVideos(videoData);
      setWorksheets(worksheetData);
    });
  }, []);

  // Function to find worksheets related to a video
  const getRelatedWorksheets = (videoTitle) => {
    return worksheets.filter(worksheet => 
      worksheet['Video Title'] && 
      worksheet['Video Title'].trim() !== '' && 
      worksheet['Video Title'] !== 'n/a' &&
      worksheet['Video Title'].toLowerCase().includes(videoTitle.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1E90D2' }}>
              Videos
            </h1>
          </motion.div>
        </div>
      </section>

      {/* YouTube Subscribe Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-red-600 text-3xl">📺</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Subscribe to Our YouTube Channel
            </h3>
          </div>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Get notified when we upload new educational videos and never miss helpful content for your child's learning journey!
          </p>
          <a
            href="https://www.youtube.com/channel/UC8TelRAzxmor0LQl58Njq9A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe Now
          </a>
        </motion.div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          {videos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-8xl mb-8">🎬</div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Coming Soon!</h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're working on adding helpful educational videos to support your child's learning journey. 
                Check back soon for engaging content that makes learning fun and accessible.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1 xl:grid-cols-2">
              {videos.map((video, idx) => {
                const relatedWorksheets = getRelatedWorksheets(video.Title);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 border border-gray-100"
                  >
                    <div className="mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                        {video.Title}
                      </h3>
                    </div>
                    
                    <YouTubeEmbed 
                      videoId={getYouTubeVideoId(video.Link)} 
                      title={video.Title} 
                    />

                    {/* Related Worksheets */}
                    {relatedWorksheets.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Related Resources ({relatedWorksheets.length})
                        </h4>
                        <div className="space-y-2">
                          {relatedWorksheets.map((worksheet, wsIdx) => (
                            <div
                              key={wsIdx}
                              className="flex items-start justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer"
                              onClick={() => {
                                const params = new URLSearchParams(worksheet).toString();
                                window.location.href = `/worksheet/${wsIdx}?${params}`;
                              }}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight">
                                  {worksheet.Filename.trim().replace(/\.pdf$/i, '')}
                                </p>
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                                    worksheet.Category === 'Activity' ? 'bg-green-100 text-green-700' :
                                    worksheet.Category === 'Parent Guide' ? 'bg-blue-100 text-blue-700' :
                                    worksheet.Category === 'Games' || worksheet.Category === 'Ganes' ? 'bg-purple-100 text-purple-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {worksheet.Category === 'Games' || worksheet.Category === 'Ganes' ? 'Game' : worksheet.Category}
                                  </span>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {worksheet.Subject}
                                  </span>
                                  {/* Grade levels using new CSV format */}
                                  <div className="flex items-center gap-1">
                                    {worksheet.isKinder === 'TRUE' && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">K</span>}
                                    {worksheet.isFirst === 'TRUE' && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">1st</span>}
                                    {worksheet.isSecond === 'TRUE' && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">2nd</span>}
                                  </div>
                                </div>
                              </div>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Videos;