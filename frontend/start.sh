#!/bin/bash

# Start the Python API if app.py exists
if [ -f "app.py" ]; then
  echo "Starting Python API..."
  python app.py &
else
  echo "app.py not found. Skipping Python API."
fi

# Start the JavaScript server if index.js exists
if [ -f "index.js" ]; then
  echo "Starting JavaScript server..."
  node index.js
else
  echo "index.js not found. Skipping JavaScript server."
fi