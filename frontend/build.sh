#!/bin/bash

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
else
  echo "package.json not found. Skipping Node.js dependencies."
fi

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
  echo "Installing Python dependencies..."
  pip install -r requirements.txt
else
  echo "requirements.txt not found. Skipping Python dependencies."
fi