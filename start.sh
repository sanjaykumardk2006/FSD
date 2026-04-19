#!/bin/bash
# Quick Start Script for Freelancer Marketplace

echo "🚀 Starting Freelancer Marketplace..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check if MongoDB is running
if ! command -v mongosh &> /dev/null
then
    echo "⚠️  MongoDB CLI not found. Ensure MongoDB is running on localhost:27017"
fi

# Create .env file if it doesn't exist
if [ ! -f server/.env ]; then
    echo "📝 Creating .env file..."
    cp server/.env.example server/.env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Start server in background
echo "🔧 Starting backend server..."
npm run dev &
SERVER_PID=$!
echo "✅ Server started (PID: $SERVER_PID)"

# Go back to root
cd ..

# Wait a moment for server to start
sleep 2

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    kill $SERVER_PID
    exit 1
fi

# Start client
echo "🎨 Starting frontend..."
npm run dev

# Cleanup
kill $SERVER_PID
