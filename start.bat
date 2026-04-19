@echo off
REM Quick Start Script for Freelancer Marketplace (Windows)

echo 🚀 Starting Freelancer Marketplace...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist "server\.env" (
    echo 📝 Creating .env file...
    copy server\.env.example server\.env
    echo ✅ .env file created. Please update it with your configuration.
)

REM Install server dependencies
echo.
echo 📦 Installing server dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install server dependencies
    exit /b 1
)

REM Start server in new window
echo 🔧 Starting backend server...
start "Freelancer Marketplace - Backend" npm run dev

REM Go back to root
cd ..

REM Wait a moment for server to start
timeout /t 3 /nobreak

REM Install client dependencies
echo.
echo 📦 Installing client dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install client dependencies
    exit /b 1
)

REM Start client
echo 🎨 Starting frontend...
call npm run dev
