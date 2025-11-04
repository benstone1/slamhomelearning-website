const fs = require('fs');

// Read the CSV file
const csvPath = './public/worksheets/worksheet_metadata.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

console.log('🧹 Removing trailing whitespaces from filenames...');

// Process each line
const lines = csvContent.split('\n');
let fixedCount = 0;

const cleanedLines = lines.map((line, index) => {
    if (index === 0) {
        // Keep header as-is
        return line;
    }
    
    if (line.trim() === '') {
        // Keep empty lines
        return line;
    }
    
    // Split the line by comma to get the filename (first column)
    const parts = line.split(',');
    if (parts.length > 0) {
        const originalFilename = parts[0];
        // Remove trailing whitespace before .pdf extension
        const cleanedFilename = originalFilename.replace(/\s+\.pdf$/i, '.pdf');
        
        if (originalFilename !== cleanedFilename) {
            console.log(`✅ Fixed: "${originalFilename}" -> "${cleanedFilename}"`);
            parts[0] = cleanedFilename;
            fixedCount++;
            return parts.join(',');
        }
    }
    
    return line;
});

// Write the cleaned content back
const cleanedContent = cleanedLines.join('\n');
fs.writeFileSync(csvPath, cleanedContent);

console.log(`✅ Completed! Fixed ${fixedCount} filenames with trailing whitespaces.`);