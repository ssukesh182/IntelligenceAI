#!/bin/bash

# Install Node.js dependencies
if [ -f "package.json" ]; then
  npm install
fi

# Install Python dependencies
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
fi