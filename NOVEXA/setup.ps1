# Environment Setup for Windows PowerShell

# Run this file with: powershell -ExecutionPolicy Bypass -File .\setup.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Jaipur Novexa - Windows Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
$pythonCheck = & python --version 2>&1
if ($?) {
    Write-Host "✓ Python found: $pythonCheck" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Install from https://www.python.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeCheck = & node --version
$npmCheck = & npm --version
Write-Host "✓ Node.js: $nodeCheck" -ForegroundColor Green
Write-Host "✓ npm: $npmCheck" -ForegroundColor Green

Write-Host ""
Write-Host "Setting up Backend..." -ForegroundColor Yellow

Push-Location backend

# Create venv
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Gray
    & python -m venv venv
}

# Activate venv
Write-Host "Activating virtual environment..." -ForegroundColor Gray
& ".\venv\Scripts\Activate.ps1"

# Install requirements
Write-Host "Installing Python dependencies..." -ForegroundColor Gray
& pip install -q -r requirements.txt

# Check for .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠ .env file not found!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Create backend\.env with:" -ForegroundColor Yellow
    Write-Host 'GEMINI_API_KEY=your_api_key_here' -ForegroundColor Cyan
    Write-Host 'FLASK_ENV=development' -ForegroundColor Cyan
    Write-Host 'FLASK_DEBUG=True' -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Get API key from: https://ai.google.dev/" -ForegroundColor Cyan
}

Pop-Location

Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Yellow

Push-Location frontend

# Install npm packages
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Node dependencies..." -ForegroundColor Gray
    & npm install -q
}

Pop-Location

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Add your Gemini API key to backend\.env" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "   python app.py" -ForegroundColor White
Write-Host ""
Write-Host "2. Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Open: http://localhost:5173" -ForegroundColor Cyan
