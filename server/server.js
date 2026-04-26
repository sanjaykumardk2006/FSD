const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { scheduleProjectReminders } = require('./utils/cronScheduler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();


// 1. Middleware
app.use(cors());
app.use(express.json());


// 2. Root route (IMPORTANT for Railway)
app.get('/', (req, res) => {
  res.send('Server is running successfully 🚀');
});


// 3. Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


//4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);


//  5. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


// 6. Start server FIRST
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    // Connect DB AFTER server starts
    await connectDB();
    console.log("MongoDB connected");

    // Start cron AFTER DB is ready
    scheduleProjectReminders();

  } catch (err) {
    console.error("Startup failed:", err);
  }
});