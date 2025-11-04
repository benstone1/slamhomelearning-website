#!/bin/bash

echo "📄 Files in CSV but missing from filesystem:"
echo "============================================="

csv_file="./public/worksheets/worksheet_metadata.csv"

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
        continue
    fi
    
    # Check if file exists
    if [[ ! -f "$file_path" ]]; then
        echo "$clean_filename"
    fi
    
done < "$csv_file"