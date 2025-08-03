@echo off
REM SEO Frontend Dashboard - Docker Runner Script for Windows

echo 🚀 SEO Frontend Dashboard - Docker Setup
echo ========================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop.
    echo Visit: https://docs.docker.com/desktop/windows/
    pause
    exit /b 1
)

echo.
echo Choose an option:
echo 1) 🛠️  Development mode (with hot reload)
echo 2) 🚀 Production mode  
echo 3) 🛑 Stop containers
echo 4) 🧹 Cleanup Docker resources
echo 5) ❌ Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo 🛠️  Starting in DEVELOPMENT mode...
    echo 📦 Building and starting containers...
    docker compose --profile dev up --build
) else if "%choice%"=="2" (
    echo 🚀 Starting in PRODUCTION mode...
    echo 📦 Building and starting containers...
    docker compose --profile prod up --build
) else if "%choice%"=="3" (
    echo 🛑 Stopping all containers...
    docker compose down
) else if "%choice%"=="4" (
    echo 🧹 Cleaning up Docker resources...
    docker compose down --volumes --remove-orphans
    echo 🗑️  Removing unused Docker images...
    docker image prune -f
) else if "%choice%"=="5" (
    echo 👋 Goodbye!
    exit /b 0
) else (
    echo ❌ Invalid choice. Please run the script again.
    pause
    exit /b 1
)

echo.
echo ✅ Done! Your app should be running at: http://localhost:3000
echo Press Ctrl+C to stop the containers
pause