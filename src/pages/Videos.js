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

  useEffect(() => {
    fetch(`/worksheets/worksheet_metadata.csv?v=${Date.now()}`)
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
        
        // Filter for resources with video links
        const videosOnly = data.filter(ws => 
          ws['Video Link'] && 
          ws['Video Link'] !== 'n/a' && 
          ws['Video Link'].trim() !== ''
        );
        
        // Deduplicate videos by URL
        const uniqueVideos = [];
        const seenUrls = new Set();
        
        videosOnly.forEach(video => {
          const url = video['Video Link'].trim();
          if (!seenUrls.has(url)) {
            seenUrls.add(url);
            uniqueVideos.push(video);
          }
        });
        
        setVideos(uniqueVideos);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Video Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Educational videos and tutorials to support learning at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Available Videos ({videos.length})
          </h2>
          
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
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {videos.map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        video.Subject === 'Math' ? 'bg-orange-100 text-orange-800' :
                        video.Subject === 'Reading' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {video.Subject}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {video['Video Title'] && video['Video Title'] !== 'n/a' ? video['Video Title'] : video.Filename}
                    </h3>
                    
                    {video.Description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {video.Description}
                      </p>
                    )}
                  </div>
                  
                  <YouTubeEmbed 
                    videoId={getYouTubeVideoId(video['Video Link'])} 
                    title={video['Video Title']} 
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Videos;