// Utility function to check if a PDF file exists
export const checkPDFExists = async (filename, subject) => {
  if (!filename || !subject) return false;
  
  try {
    const cleanFilename = filename.trim();
    // Add .pdf extension if not present
    const pdfFilename = cleanFilename.endsWith('.pdf') ? cleanFilename : `${cleanFilename}.pdf`;
    const pdfPath = `/worksheets/${subject.toLowerCase()}/${encodeURIComponent(pdfFilename)}`;
    
    const response = await fetch(pdfPath, { 
      method: 'HEAD',  // Only check headers, don't download content
      cache: 'no-cache' 
    });
    
    return response.ok;
  } catch (error) {
    console.warn(`Error checking PDF existence for ${filename}:`, error);
    return false;
  }
};

// Batch check multiple PDFs with promise settling to avoid failing on first error
export const checkMultiplePDFsExist = async (worksheets) => {
  const results = await Promise.allSettled(
    worksheets.map(async (worksheet) => {
      const exists = await checkPDFExists(worksheet.Filename, worksheet.Subject);
      return { worksheet, exists };
    })
  );
  
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)
    .filter(({ exists }) => exists)
    .map(({ worksheet }) => worksheet);
};