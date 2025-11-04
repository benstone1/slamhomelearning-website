const fs = require('fs');

console.log('🧹 Cleaning up CSV by removing entries for missing files...');

const csvPath = './public/worksheets/worksheet_metadata.csv';
const mathDir = './public/worksheets/math';
const readingDir = './public/worksheets/reading';

// Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');

// Get list of actual files
const mathFiles = fs.readdirSync(mathDir).filter(f => f.endsWith('.pdf'));
const readingFiles = fs.readdirSync(readingDir).filter(f => f.endsWith('.pdf'));

console.log(`📁 Found ${mathFiles.length} math files and ${readingFiles.length} reading files`);

// Process CSV lines
const cleanedLines = [];
const header = lines[0];
cleanedLines.push(header);

let removedCount = 0;
let keptCount = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line
    const parts = line.split(',');
    if (parts.length < 3) continue;
    
    const filename = parts[0].replace(/^"/, '').replace(/"$/, '').trim();
    const subject = parts[2].replace(/^"/, '').replace(/"$/, '').trim();
    
    if (!filename || !subject) continue;
    
    // Check if file exists
    let fileExists = false;
    if (subject.toLowerCase() === 'math') {
        fileExists = mathFiles.includes(filename);
    } else if (subject.toLowerCase() === 'reading') {
        fileExists = readingFiles.includes(filename);
    }
    
    if (fileExists) {
        cleanedLines.push(line);
        keptCount++;
        console.log(`✅ Keeping: ${filename}`);
    } else {
        removedCount++;
        console.log(`❌ Removing: ${filename} (file not found)`);
    }
}

// Create backup
const backupPath = csvPath.replace('.csv', '_backup_' + Date.now() + '.csv');
fs.writeFileSync(backupPath, csvContent);
console.log(`💾 Backup created: ${backupPath}`);

// Write cleaned CSV
const cleanedContent = cleanedLines.join('\n');
fs.writeFileSync(csvPath, cleanedContent);

console.log('\n📊 CLEANUP SUMMARY:');
console.log(`📄 Entries kept: ${keptCount}`);
console.log(`🗑️  Entries removed: ${removedCount}`);
console.log(`💾 Backup saved: ${backupPath}`);
console.log('✅ CSV cleaned successfully!');