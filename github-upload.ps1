# GitHub Upload Script for Playwright MCP Server

$projectPath = "C:\Users\mohammad.rashaideh\OneDrive - Department of Community Development\Desktop\test"
$gitPath = "C:\Program Files\Git\bin\git.exe"

Write-Host "=====================================" -ForegroundColor Green
Write-Host "GitHub Upload Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Change to project directory
Set-Location $projectPath
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Cyan

# Initialize repository
Write-Host ""
Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Yellow
& $gitPath init

# Configure git
Write-Host ""
Write-Host "Step 2: Configuring Git user..." -ForegroundColor Yellow
& $gitPath config user.name "rashaideh93"
& $gitPath config user.email "rashideh1993@gmail.com"

# Add all files
Write-Host ""
Write-Host "Step 3: Adding all files..." -ForegroundColor Yellow
& $gitPath add .

# Create commit
Write-Host ""
Write-Host "Step 4: Creating initial commit..." -ForegroundColor Yellow
& $gitPath commit -m "Initial commit: Playwright MCP Server v1.0.0"

# Add remote
Write-Host ""
Write-Host "Step 5: Adding remote repository..." -ForegroundColor Yellow
& $gitPath remote add origin https://github.com/rashaideh93/playwright-mcp-server.git

# Rename branch
Write-Host ""
Write-Host "Step 6: Renaming branch to main..." -ForegroundColor Yellow
& $gitPath branch -M main

# Push to GitHub
Write-Host ""
Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You will be prompted to authenticate with GitHub" -ForegroundColor Cyan
& $gitPath push -u origin main

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "✅ SUCCESS!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your project is now on GitHub at:" -ForegroundColor Cyan
Write-Host "https://github.com/rashaideh93/playwright-mcp-server" -ForegroundColor Green
Write-Host ""
