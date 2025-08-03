#!/bin/bash

# SEO Frontend Dashboard - Docker Runner Script

echo "🚀 SEO Frontend Dashboard - Docker Setup"
echo "========================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Function to run development mode
run_dev() {
    echo "🛠️  Starting in DEVELOPMENT mode..."
    echo "📦 Building and starting containers..."
    
    # Use docker compose if available, fallback to docker-compose
    if docker compose version &> /dev/null; then
        docker compose --profile dev up --build
    else
        docker-compose --profile dev up --build
    fi
}

# Function to run production mode
run_prod() {
    echo "🚀 Starting in PRODUCTION mode..."
    echo "📦 Building and starting containers..."
    
    # Use docker compose if available, fallback to docker-compose
    if docker compose version &> /dev/null; then
        docker compose --profile prod up --build
    else
        docker-compose --profile prod up --build
    fi
}

# Function to stop containers
stop_containers() {
    echo "🛑 Stopping all containers..."
    
    if docker compose version &> /dev/null; then
        docker compose down
    else
        docker-compose down
    fi
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    
    if docker compose version &> /dev/null; then
        docker compose down --volumes --remove-orphans
    else
        docker-compose down --volumes --remove-orphans
    fi
    
    echo "🗑️  Removing unused Docker images..."
    docker image prune -f
}

# Main menu
echo ""
echo "Choose an option:"
echo "1) 🛠️  Development mode (with hot reload)"
echo "2) 🚀 Production mode"
echo "3) 🛑 Stop containers"
echo "4) 🧹 Cleanup Docker resources"
echo "5) ❌ Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        run_dev
        ;;
    2)
        run_prod
        ;;
    3)
        stop_containers
        ;;
    4)
        cleanup
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Done! Your app should be running at: http://localhost:3000"
echo "Press Ctrl+C to stop the containers"