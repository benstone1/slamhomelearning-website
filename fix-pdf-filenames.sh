#!/bin/bash

echo "🔧 Fixing PDF file names..."

# Function to clean up filename
clean_filename() {
    local file="$1"
    local dir="$2"
    
    # Extract just the filename without path
    local basename=$(basename "$file")
    
    # Clean up the filename:
    # 1. Replace multiple spaces with single space
    # 2. Remove trailing spaces before .pdf
    # 3. Trim any other trailing/leading spaces
    local cleaned=$(echo "$basename" | sed 's/  */ /g' | sed 's/ \.pdf$/.pdf/' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    
    if [ "$basename" != "$cleaned" ]; then
        local old_path="$dir/$basename"
        local new_path="$dir/$cleaned"
        
        if [ -f "$old_path" ]; then
            mv "$old_path" "$new_path"
            echo "✅ Renamed: '$basename' -> '$cleaned'"
            return 0
        else
            echo "⚠️  File not found: $old_path"
            return 1
        fi
    fi
    return 0
}

# Process math files
echo "📁 Processing math files..."
cd "./public/worksheets/math/"
count=0
for file in *.pdf; do
    if [ -f "$file" ]; then
        if clean_filename "$file" "."; then
            ((count++))
        fi
    fi
done
echo "📊 Processed $count math files"

# Process reading files
echo "📁 Processing reading files..."
cd "../reading/"
count=0
for file in *.pdf; do
    if [ -f "$file" ]; then
        if clean_filename "$file" "."; then
            ((count++))
        fi
    fi
done
echo "📊 Processed $count reading files"

# Process parent resources files
echo "📁 Processing parent resources files..."
cd "../parent_resources/"
if [ -d "." ]; then
    count=0
    for file in *.pdf; do
        if [ -f "$file" ] && [ "$file" != "*.pdf" ]; then
            if clean_filename "$file" "."; then
                ((count++))
            fi
        fi
    done
    echo "📊 Processed $count parent resource files"
fi

echo "✨ File cleanup completed!"

# Return to original directory
cd "../../../"

echo ""
echo "🔍 Checking for any remaining files with spacing issues..."
remaining=$(find ./public/worksheets/ -name '*  *.pdf' -o -name '* .pdf' | wc -l)
if [ "$remaining" -eq 0 ]; then
    echo "✅ No files with spacing issues found!"
else
    echo "⚠️  $remaining files still have spacing issues:"
    find ./public/worksheets/ -name '*  *.pdf' -o -name '* .pdf'
fi