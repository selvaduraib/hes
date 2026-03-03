# HES Application Startup Script
# This script helps start the development server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HES - Head End System" -ForegroundColor Cyan
Write-Host "  Starting Development Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Start the development server
Write-Host "Starting Vite development server..." -ForegroundColor Green
Write-Host "The application will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev

