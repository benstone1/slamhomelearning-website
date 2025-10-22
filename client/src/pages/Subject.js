import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Subject({ subject }) {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [worksheets, setWorksheets] = useState([]);

  useEffect(() => {
    fetch('/worksheets/worksheet_metadata.csv')
      .then(res => res.text())
      .then(text => {
        // Parse CSV
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = values[i] ? values[i].trim() : '';
          });
          return obj;
        });
        // Filter by subject
        let filtered = data.filter(ws => ws.Subject && ws.Subject.toLowerCase() === subject.toLowerCase());
        // Search and tag filter
        if (search) {
          filtered = filtered.filter(ws => ws.Filename && ws.Filename.toLowerCase().includes(search.toLowerCase()));
        }
        if (tag) {
          filtered = filtered.filter(ws => ws.Category && ws.Category.toLowerCase().includes(tag.toLowerCase()));
        }
        setWorksheets(filtered);
      });
  }, [search, tag, subject]);

  // Choose image based on subject
  let imageSrc = '';
  let imageAlt = '';
  if (subject === 'Math') {
    imageSrc = '/images/Math_Game.jpeg';
    imageAlt = 'Math Game';
  } else if (subject === 'Reading') {
    imageSrc = '/images/Book_Reading.jpeg';
    imageAlt = 'Book Reading';
  }

  return (
    <div style={{ position: 'relative', padding: '2rem' }}>
      {imageSrc && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          zIndex: 0,
          overflow: 'hidden',
          borderRadius: '12px',
          background: '#f5f5f5'
        }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              opacity: 0.25,
              filter: 'blur(1px)',
              display: 'block'
            }}
          />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ marginTop: imageSrc ? '60px' : 0 }}>{subject} Worksheets</h2>
        <div style={{ marginBottom: '1rem' }}>
      </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400, margin: '0 auto' }}>
        {worksheets.map((ws, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              minWidth: '220px',
              maxWidth: '260px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer'
            }}
            onClick={() => {
              // Pass worksheet metadata via query string
              const params = new URLSearchParams(ws).toString();
              window.location.href = `/worksheet/${idx}?${params}`;
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{ws.Filename || 'Untitled'}</h3>
            {/* Optionally show category, grade, etc. here */}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Subject;
