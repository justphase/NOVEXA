#!/bin/bash
# Quick Start Script for Jaipur Novexa (Mac/Linux)

echo ""
echo "========================================"
echo " Jaipur Novexa - Quick Start"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.12+ from https://www.python.org"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "Python version: $(python3 --version)"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo ""
    echo "WARNING: .env file not found in backend folder!"
    echo ""
    echo "Please create backend/.env with your Gemini API key:"
    echo "  GEMINI_API_KEY=your_key_here"
    echo "  FLASK_ENV=development"
    echo "  FLASK_DEBUG=True"
    echo ""
    echo "Get API key from: https://ai.google.dev/"
    echo ""
    read -p "Press Enter to continue..."
fi

echo "Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt > /dev/null 2>&1

# Go back to root
cd ..

echo ""
echo "Setting up frontend..."
cd frontend

# Install Node dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install > /dev/null 2>&1
fi

cd ..

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Open Terminal 1:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "2. Open Terminal 2:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Open browser: http://localhost:5173"
echo ""
echo "4. (IMPORTANT) Add your Gemini API key to backend/.env first!"
echo ""
