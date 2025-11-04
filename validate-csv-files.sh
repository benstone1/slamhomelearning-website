#!/bin/bash

echo "🔍 Checking CSV entries against actual PDF files..."

csv_file="./public/worksheets/worksheet_metadata.csv"
math_dir="./public/worksheets/math"
reading_dir="./public/worksheets/reading"
parent_dir="./public/worksheets/parent_resources"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
total_tests=0
passed_tests=0
failed_tests=0

echo ""
echo "============================================================"
echo "📋 TESTING CSV ENTRIES AGAINST ACTUAL FILES"
echo "============================================================"

# Skip header line and process CSV
tail -n +2 "$csv_file" | while IFS=',' read -r filename category subject grade_level category_type description || [ -n "$filename" ]; do
    ((total_tests++))
    
    # Clean up the filename and subject (remove quotes, trim spaces)
    clean_filename=$(echo "$filename" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    clean_subject=$(echo "$subject" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    
    if [ -z "$clean_filename" ] || [ -z "$clean_subject" ]; then
        echo -e "${RED}❌ Line $total_tests: Empty filename or subject${NC}"
        ((failed_tests++))
        continue
    fi
    
    # Determine the expected file path based on subject
    case "${clean_subject,,}" in
        "math")
            expected_path="$math_dir/$clean_filename"
            ;;
        "reading")
            expected_path="$reading_dir/$clean_filename"
            ;;
        "parent resources guide"|"parent_resources")
            expected_path="$parent_dir/$clean_filename"
            ;;
        *)
            echo -e "${RED}❌ Line $total_tests: Unknown subject '${clean_subject}' for '${clean_filename}'${NC}"
            ((failed_tests++))
            continue
            ;;
    esac
    
    # Check if file exists
    if [ -f "$expected_path" ]; then
        echo -e "${GREEN}✅ Line $total_tests: '${clean_filename}' - File exists${NC}"
        ((passed_tests++))
    else
        echo -e "${RED}❌ Line $total_tests: '${clean_filename}' - File NOT FOUND at: ${expected_path}${NC}"
        ((failed_tests++))
    fi
done

# Count the results from the subshell
passed_tests=0
failed_tests=0
total_tests=0

# Recount for final summary (since subshell variables don't persist)
tail -n +2 "$csv_file" | while IFS=',' read -r filename category subject grade_level category_type description || [ -n "$filename" ]; do
    ((total_tests++))
    
    clean_filename=$(echo "$filename" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    clean_subject=$(echo "$subject" | sed 's/^"//;s/"$//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    
    if [ -z "$clean_filename" ] || [ -z "$clean_subject" ]; then
        ((failed_tests++))
        continue
    fi
    
    case "${clean_subject,,}" in
        "math")
            expected_path="$math_dir/$clean_filename"
            ;;
        "reading")
            expected_path="$reading_dir/$clean_filename"
            ;;
        "parent resources guide"|"parent_resources")
            expected_path="$parent_dir/$clean_filename"
            ;;
        *)
            ((failed_tests++))
            continue
            ;;
    esac
    
    if [ -f "$expected_path" ]; then
        ((passed_tests++))
    else
        ((failed_tests++))
    fi
done

echo ""
echo "============================================================"
echo "📊 CSV VALIDATION SUMMARY"
echo "============================================================"
echo "Total Entries: $total_tests"
echo -e "${GREEN}✅ Files Found: $passed_tests${NC}"
echo -e "${RED}❌ Files Missing: $failed_tests${NC}"

if [ $failed_tests -eq 0 ]; then
    echo -e "${GREEN}🎉 SUCCESS: All CSV entries have corresponding files!${NC}"
    success_rate=100
else
    success_rate=$((passed_tests * 100 / total_tests))
    echo -e "${YELLOW}📈 Success Rate: ${success_rate}%${NC}"
fi

echo ""
echo "🔍 Checking for orphaned files (files not in CSV)..."

# Check for orphaned files in each directory
check_orphaned() {
    local dir="$1"
    local subject="$2"
    
    if [ ! -d "$dir" ]; then
        return
    fi
    
    local file_count=$(find "$dir" -name "*.pdf" -type f | wc -l)
    echo -e "${BLUE}📁 $subject directory: $file_count PDF files${NC}"
    
    for file_path in "$dir"/*.pdf; do
        if [ -f "$file_path" ]; then
            local file_name=$(basename "$file_path")
            
            # Check if this filename exists in CSV
            if ! grep -q "^$file_name," "$csv_file" && ! grep -q "^\"$file_name\"," "$csv_file"; then
                echo -e "${YELLOW}⚠️  Orphaned file: $file_name (not in CSV)${NC}"
            fi
        fi
    done
}

check_orphaned "$math_dir" "MATH"
check_orphaned "$reading_dir" "READING" 
check_orphaned "$parent_dir" "PARENT_RESOURCES"

echo ""
echo "✨ Validation completed!"