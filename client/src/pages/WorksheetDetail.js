import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WorksheetDetail() {
  const { id } = useParams();
  const [worksheet, setWorksheet] = useState(null);

  useEffect(() => {
    fetch(`/api/worksheets/${id}`)
      .then(res => res.json())
      .then(data => setWorksheet(data));
  }, [id]);

  if (!worksheet) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{worksheet.title}</h2>
      <p>{worksheet.description}</p>
      <p>Subject: {worksheet.subject}</p>
      <p>Tags: {worksheet.tags.join(', ')}</p>
      <a href={`/${worksheet.pdfPath}`} target="_blank" rel="noopener noreferrer">Download PDF</a>
    </div>
  );
}

export default WorksheetDetail;
