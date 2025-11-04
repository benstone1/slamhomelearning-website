#!/bin/bash

echo "📄 Files in CSV but missing from filesystem:"
echo "============================================="

csv_file="./public/worksheets/worksheet_metadata.csv"

# Process CSV entries with new format: Filename,Category,isKinder,isFirst,isSecond,Video Title,Subject
while IFS=',' read -r filename category isKinder isFirst isSecond video_title subject; do
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
    
    # Add .pdf extension if not present
    if [[ ! "$clean_filename" == *.pdf ]]; then
        clean_filename="${clean_filename}.pdf"
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