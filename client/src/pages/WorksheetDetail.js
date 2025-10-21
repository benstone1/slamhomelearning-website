
import React from 'react';
import { useLocation } from 'react-router-dom';

function WorksheetDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const worksheet = {};
  for (const [key, value] of params.entries()) {
    worksheet[key] = value;
  }

  if (!worksheet.Filename) return <div style={{ padding: '2rem' }}>No worksheet data found.</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#047857' }}>{worksheet.Filename}</h2>
      <div style={{ marginBottom: '1rem', color: '#374151' }}>
        <div><strong>Category:</strong> {worksheet['Category']}</div>
        <div><strong>Grade Level:</strong> {worksheet['Grade Level']}</div>
        <div><strong>Video Title:</strong> {worksheet['Video Title']}</div>
        <div><strong>Subject:</strong> {worksheet['Subject']}</div>
      </div>
      {/* Download link: assumes PDF is named after Filename and in public/worksheets */}
      <a
        href={`/worksheets/${encodeURIComponent(worksheet.Filename)}.pdf`}
        download
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: '#fff',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          marginTop: '1rem'
        }}
      >
        Download Worksheet PDF
      </a>
    </div>
  );
}

export default WorksheetDetail;
