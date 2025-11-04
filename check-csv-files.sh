#!/bin/bash

echo "🔍 CSV vs Files Validation Report"
echo "=================================="

csv_file="./public/worksheets/worksheet_metadata.csv"
passed=0
failed=0
missing_files=()

echo ""
echo "❌ MISSING FILES (in CSV but not on disk):"
echo "----------------------------------------"

# Process CSV entries
while IFS=',' read -r filename category subject grade_level category_type description; do
    # Skip header
    if [[ "$filename" == "Filename" ]]; then
        continue
    fi
    
    # Clean filename and subject
    clean_filename=$(echo "$filename" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    clean_subject=$(echo "$subject" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    
    # Skip empty lines
    if [[ -z "$clean_filename" ]]; then
        continue
    fi
    
    # Determine file path
    if [[ "${clean_subject,,}" == "math" ]]; then
        file_path="./public/worksheets/math/$clean_filename"
    elif [[ "${clean_subject,,}" == "reading" ]]; then
        file_path="./public/worksheets/reading/$clean_filename"
    else
        echo "   ⚠️  Unknown subject: $clean_subject for $clean_filename"
        ((failed++))
        continue
    fi
    
    # Check if file exists
    if [[ -f "$file_path" ]]; then
        ((passed++))
    else
        echo "   📄 $clean_filename"
        missing_files+=("$clean_filename")
        ((failed++))
    fi
    
done < "$csv_file"

echo ""
echo "✅ ORPHANED FILES (on disk but not in CSV):"
echo "----------------------------------------"

# Check math directory
echo "📁 Math files:"
for file in ./public/worksheets/math/*.pdf; do
    if [[ -f "$file" ]]; then
        filename=$(basename "$file")
        if ! grep -q "^$filename," "$csv_file" && ! grep -q "^\"$filename\"," "$csv_file"; then
            echo "   📄 $filename"
        fi
    fi
done

# Check reading directory  
echo "📁 Reading files:"
for file in ./public/worksheets/reading/*.pdf; do
    if [[ -f "$file" ]]; then
        filename=$(basename "$file")
        if ! grep -q "^$filename," "$csv_file" && ! grep -q "^\"$filename\"," "$csv_file"; then
            echo "   📄 $filename"
        fi
    fi
done

echo ""
echo "📊 SUMMARY:"
echo "==========="
total=$((passed + failed))
echo "Total CSV entries: $total"
echo "✅ Files found: $passed"
echo "❌ Files missing: $failed"

if [[ $failed -eq 0 ]]; then
    echo "🎉 Perfect match! All CSV entries have corresponding files."
else
    success_rate=$((passed * 100 / total))
    echo "📈 Success rate: ${success_rate}%"
    echo ""
    echo "🔧 FILES TO INVESTIGATE:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
fi