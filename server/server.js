const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Suppress punycode deprecation warning
process.noDeprecation = true;

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
// CORS configuration - allow requests from frontend
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    // Allow any Vercel preview/production URL for this project
    const isVercelURL = /^https:\/\/freelancer.*\.vercel\.app$/.test(origin)
      || /^https:\/\/fsd.*\.vercel\.app$/.test(origin);

    if (allowedOrigins.includes(origin) || isVercelURL) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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

// Validate environment variables
if (!process.env.MONGO_URL) {
  console.error('ERROR: MONGO_URL environment variable is not set');
  process.exit(1);
}

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    // Connect DB AFTER server starts
    await connectDB();
    console.log("MongoDB connected successfully");

    // Start cron AFTER DB is ready
    scheduleProjectReminders();
    console.log("Cron scheduler initialized");

  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
});