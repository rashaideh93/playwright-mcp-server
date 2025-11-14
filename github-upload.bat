@echo off
cd /d "C:\Users\mohammad.rashaideh\OneDrive - Department of Community Development\Desktop\test"

echo ===== Initializing Git Repository =====
"C:\Program Files\Git\bin\git.exe" init

echo.
echo ===== Configuring Git User =====
"C:\Program Files\Git\bin\git.exe" config user.name "rashaideh93"
"C:\Program Files\Git\bin\git.exe" config user.email "rashideh1993@gmail.com"

echo.
echo ===== Adding all files =====
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo ===== Creating initial commit =====
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Playwright MCP Server v1.0.0"

echo.
echo ===== Adding remote repository =====
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/rashaideh93/playwright-mcp-server.git

echo.
echo ===== Renaming branch to main =====
"C:\Program Files\Git\bin\git.exe" branch -M main

echo.
echo ===== Pushing to GitHub =====
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ===== SUCCESS! =====
echo Your project has been uploaded to:
echo https://github.com/rashaideh93/playwright-mcp-server
pause
