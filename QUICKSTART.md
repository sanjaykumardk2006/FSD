# 🎯 Quick Start Guide

## Prerequisites Checklist
- ✅ Node.js v14+ installed
- ✅ npm or yarn available
- ✅ MongoDB running locally (or Atlas connection)
- ✅ Git installed

## 📥 Installation (5 minutes)

### Windows
```bash
# Clone repository (if not done)
git clone <repository-url>
cd FSD

# Run quick start script
./start.bat

# Or manual setup:

# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

### macOS/Linux
```bash
# Clone repository (if not done)
git clone <repository-url>
cd FSD

# Run quick start script
chmod +x start.sh
./start.sh

# Or manual setup:

# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

## 🌐 Access the Application

After starting both servers:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🧪 Testing the Application

### Step 1: Sign Up (Freelancer)
1. Go to http://localhost:3000
2. Click "Signup"
3. Fill in the form:
   - Username: freelancer1
   - Email: freelancer@test.com
   - Password: password123
   - Role: Freelancer
4. Click "Sign Up"

### Step 2: Sign Up (Client)
1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Username: client1
   - Email: client@test.com
   - Password: password123
   - Role: Client
3. Click "Sign Up"

### Step 3: Login as Client
1. Go to http://localhost:3000/login
2. Select "Login as Client" (UI for reference only)
3. Email: client@test.com
4. Password: password123
5. Click "Login"
6. Redirected to Client Dashboard

### Step 4: Post a Job
1. In Client Dashboard, click "Post New Job"
2. Fill job details:
   - Title: Build React Website
   - Description: Need a professional website
   - Skills: React, Node.js
   - Budget: 500
   - Deadline: 2024-12-31
3. Click "Post Job"

### Step 5: Login as Freelancer
1. Open new incognito window
2. Go to http://localhost:3000/login
3. Select "Login as Freelancer" (UI for reference)
4. Email: freelancer@test.com
5. Password: password123
6. Click "Login"
7. Redirected to Freelancer Dashboard

### Step 6: Browse Jobs
1. In Freelancer Dashboard, see "Available Jobs" tab
2. View the posted job
3. Click "Submit Proposal"

### Step 7: Submit Proposal
1. Fill proposal form:
   - Skills: React, Node.js, CSS
   - Experience: 3 years in web development
   - Cost: 450
   - Deadline: 2024-12-25
2. Click "Submit Proposal"

### Step 8: Accept Proposal (as Client)
1. Go back to Client Dashboard
2. In "My Jobs" tab, click job
3. Click "View Proposals"
4. See freelancer's proposal
5. Click "Accept"

### Step 9: Chat & Project Updates
1. As Client or Freelancer, go to project
2. View project details and chat
3. As Freelancer, update progress
4. Both users see messages in real-time

## 📝 Database Setup

### Local MongoDB
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod

# Windows
# Download and run MongoDB installer
```

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Add connection string to .env:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/freelancer
   ```

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process  # Windows
```

### Port 5000 Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process  # Windows
```

### MongoDB Not Running
```bash
# Check if mongod is running
ps aux | grep mongod  # macOS/Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### Dependencies Install Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s node_modules && del package-lock.json  # Windows

# Reinstall
npm install
```

### CORS Errors
- Ensure backend is running on localhost:5000
- Ensure frontend is running on localhost:3000
- Check that both are accessible in browser

### API Calls Failing
1. Verify backend is running: http://localhost:5000/api/health
2. Check browser console for errors
3. Check terminal output for server errors
4. Verify MongoDB is connected

## 📚 Documentation

- **Full README**: [README.md](./README.md)
- **Frontend Guide**: [client/README.md](./client/README.md)
- **Backend Guide**: [server/README.md](./server/README.md)
- **API Documentation**: See main README for endpoints

## 🚀 Next Steps

### Learn the Codebase
1. Explore `client/src` for React components
2. Explore `server/controllers` for API logic
3. Check `server/models` for database schemas

### Customize
- Update colors in `client/src/App.css`
- Modify API endpoints in controllers
- Add new features following existing patterns

### Deploy
- Frontend: Vercel, Netlify, GitHub Pages
- Backend: Heroku, Railway, AWS EC2

## 📞 Support

If you encounter issues:
1. Check error messages in console
2. Review documentation above
3. Check network tab in DevTools
4. Verify all prerequisites are installed
5. Try clearing cache and reinstalling

## 🎉 You're Ready!

Happy coding! The marketplace is now set up and ready to use. Explore features, customize, and build something amazing!

For detailed information, see the full [README.md](./README.md)
