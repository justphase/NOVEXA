@echo off
REM Quick Start Script for Jaipur Novexa
REM This script sets up and runs both backend and frontend

echo.
echo ========================================
echo  Jaipur Novexa - Quick Start
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.12+ from https://www.python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Python version:
python --version
echo.
echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Check if .env file exists
if not exist "backend\.env" (
    echo.
    echo WARNING: .env file not found in backend folder!
    echo.
    echo Please create backend\.env with your Gemini API key:
    echo   GEMINI_API_KEY=your_key_here
    echo   FLASK_ENV=development
    echo   FLASK_DEBUG=True
    echo.
    echo Get API key from: https://ai.google.dev/
    echo.
    pause
)

echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1

REM Go back to root
cd ..

echo.
echo Setting up frontend...
cd frontend

REM Install Node dependencies
if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install >nul 2>&1
)

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open Terminal 1:
echo    cd backend
echo    venv\Scripts\activate
echo    python app.py
echo.
echo 2. Open Terminal 2:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open browser: http://localhost:5173
echo.
echo 4. (IMPORTANT) Add your Gemini API key to backend/.env first!
echo.
pause
