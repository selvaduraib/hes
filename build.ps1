# HES Application Build Script
# This script builds the application for production

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HES - Head End System" -ForegroundColor Cyan
Write-Host "  Building for Production..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Run TypeScript check
Write-Host "Running TypeScript check..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ TypeScript check passed" -ForegroundColor Green
    Write-Host ""
    
    # Build the application
    Write-Host "Building application..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  Build Successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Output directory: dist/" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To preview the build, run:" -ForegroundColor Yellow
        Write-Host "  npm run preview" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "Build failed. Please check the errors above." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "TypeScript check failed. Please fix the errors above." -ForegroundColor Red
}

