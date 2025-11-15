@echo off
echo Setting up Ayla Gizlice Portfolio - SvelteKit Version
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed
echo.

REM Install dependencies
echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.

REM Create a sample Google Sheets URL file
if not exist google-sheets-config.txt (
    echo Creating Google Sheets configuration file...
    echo your-google-sheets-json-url-here > google-sheets-config.txt
    echo.
    echo Please edit google-sheets-config.txt with your actual Google Sheets JSON URL
    echo Then update src/routes/+page.server.js with this URL
    echo.
)

echo Setup complete!
echo.
echo To start development:
echo   npm run dev
echo.
echo To build for production:
echo   npm run build
echo.
echo See README-SVELTEKIT.md for detailed instructions
echo.
pause
