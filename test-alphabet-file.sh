#!/bin/bash

echo "🔍 Testing specific file: Alphabet Book Suggestions"
echo "================================================="

# Test the exact CSV entry
filename="Alphabet Book Suggestions"
subject="Reading"

# Add .pdf extension
filename_with_pdf="${filename}.pdf"
file_path="./public/worksheets/reading/${filename_with_pdf}"

echo "Original filename: '$filename'"
echo "With .pdf: '$filename_with_pdf'"
echo "Expected path: '$file_path'"

# Check if file exists
if [[ -f "$file_path" ]]; then
    echo "✅ File exists!"
    echo "File details:"
    ls -la "$file_path"
else
    echo "❌ File NOT found"
    echo "Let's see what files are similar:"
    find ./public/worksheets/reading/ -name "*Alphabet*" -type f
fi

# Test URL encoding
echo ""
echo "URL encoding test:"
echo "Raw URL: /worksheets/reading/$filename_with_pdf"
echo "Encoded URL:"
node -e "console.log('/worksheets/reading/' + encodeURIComponent('$filename_with_pdf'))"