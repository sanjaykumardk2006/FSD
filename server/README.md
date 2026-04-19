# Backend Setup Guide

## Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB (local or Atlas)

### Installation Steps

```bash
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start the server
npm start

# For development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

## Environment Configuration

### Create .env file

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freelancer-marketplace
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Environment Variables Explained

- **PORT**: Server port (default: 5000)
- **MONGODB_URI**: MongoDB connection string
  - Local: `mongodb://localhost:27017/database-name`
  - MongoDB Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/database-name`
- **JWT_SECRET**: Secret key for JWT signing (use strong, random string)
- **NODE_ENV**: Environment mode (development/production)

## MongoDB Setup

### Local MongoDB Installation

#### Windows
1. Download MongoDB installer
2. Run installer and follow steps
3. MongoDB runs as Windows service
4. Connect: `mongodb://localhost:27017`

#### macOS
```bash
# Using Homebrew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
# Install MongoDB
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

## Project Structure

```
server/
├── config/
│   └── database.js         # MongoDB connection setup
├── models/                 # Mongoose schemas
│   ├── User.js
│   ├── Job.js
│   ├── Proposal.js
│   ├── Project.js
│   ├── Message.js
│   └── Notification.js
├── controllers/            # Business logic
│   ├── authController.js
│   ├── jobController.js
│   ├── proposalController.js
│   ├── projectController.js
│   ├── messageController.js
│   └── notificationController.js
├── routes/                 # API endpoints
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── proposalRoutes.js
│   ├── projectRoutes.js
│   ├── messageRoutes.js
│   └── notificationRoutes.js
├── middleware/
│   └── authMiddleware.js   # JWT verification & role checking
├── utils/
│   ├── tokenUtils.js       # JWT generation & verification
│   ├── emailUtils.js       # Email sending utilities
│   └── cronScheduler.js    # Scheduled cron jobs
├── .env.example
├── package.json
└── server.js               # Application entry point
```

## Core Concepts

### Models (Database Schemas)

#### User Model
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `role` - "Client" or "Freelancer"
- `profile` - Bio, skills, experience, hourly rate
- `isActive` - Account status

#### Job Model
- `title` - Job title
- `description` - Job details
- `requiredSkills` - Array of skills
- `budget` - Project budget
- `deadline` - Project deadline
- `clientId` - Reference to Client user
- `status` - "Open", "In Progress", "Completed", "Closed"
- `assignedFreelancerId` - Reference to assigned Freelancer

#### Proposal Model
- `jobId` - Reference to Job
- `freelancerId` - Reference to Freelancer
- `skills` - Proposed skills
- `experience` - Freelancer's experience
- `proposedCost` - Bid amount
- `proposedDeadline` - Delivery date
- `coverLetter` - Optional cover letter
- `status` - "Pending", "Accepted", "Rejected"
- `rejectionReason` - Reason if rejected

#### Project Model
- `jobId` - Reference to Job
- `clientId` - Reference to Client
- `freelancerId` - Reference to Freelancer
- `status` - "Active", "On Hold", "Completed", "Cancelled"
- `progress` - Array of progress updates
- `lastUpdateDate` - Last progress update
- `completionDate` - Completion date

#### Message Model
- `projectId` - Reference to Project
- `senderId` - Reference to sending User
- `receiverId` - Reference to receiving User
- `message` - Message text
- `isRead` - Read status

#### Notification Model
- `userId` - Reference to User
- `type` - Notification type
- `title` - Notification title
- `message` - Notification content
- `relatedId` - Related resource ID
- `isRead` - Read status

### Authentication Flow

1. **Signup**
   - Validate input (name, email, password, role)
   - Check if user exists
   - Hash password with bcrypt
   - Create user in database
   - Return success message

2. **Login**
   - Validate input (email, password)
   - Find user by email
   - Compare password with hash
   - Generate JWT token
   - Return token and user data

3. **Protected Routes**
   - Extract token from Authorization header
   - Verify JWT signature
   - Attach user data to request
   - Check role permissions if needed

### Middleware

#### authMiddleware.js
- `authMiddleware`: Verify JWT token
- `roleMiddleware`: Check user role
```javascript
router.post('/action', authMiddleware, roleMiddleware(['Client']), handler);
```

### Controllers

Each controller handles business logic for a resource:

- **authController**: Registration, login, profile
- **jobController**: Job posting, retrieval, updates
- **proposalController**: Submit, accept, reject proposals
- **projectController**: Project management, progress updates
- **messageController**: Messaging between users
- **notificationController**: Notification management

## API Endpoints

### Authentication Routes
```
POST   /api/auth/signup              - Register user
POST   /api/auth/login               - Login user
GET    /api/auth/profile             - Get user profile (protected)
PUT    /api/auth/profile             - Update profile (protected)
```

### Job Routes
```
GET    /api/jobs/all                 - Get all open jobs
POST   /api/jobs/post                - Post new job (Client only)
GET    /api/jobs/my-jobs             - Get client's jobs
GET    /api/jobs/:jobId              - Get job details
GET    /api/jobs/:jobId/proposals    - Get proposals for job (Client only)
PUT    /api/jobs/:jobId/status       - Update job status (Client only)
```

### Proposal Routes
```
POST   /api/proposals/submit         - Submit proposal (Freelancer only)
GET    /api/proposals/my-proposals   - Get freelancer's proposals
PUT    /api/proposals/:id/accept     - Accept proposal (Client only)
PUT    /api/proposals/:id/reject     - Reject proposal (Client only)
```

### Project Routes
```
GET    /api/projects/freelancer/projects - Get freelancer's projects
GET    /api/projects/client/projects     - Get client's projects
GET    /api/projects/:projectId          - Get project details
POST   /api/projects/:projectId/progress - Add progress (Freelancer only)
PUT    /api/projects/:projectId/status   - Update status
GET    /api/projects/pending-updates     - Get pending updates
```

### Message Routes
```
POST   /api/messages/send            - Send message (protected)
GET    /api/messages/:projectId      - Get project messages
PUT    /api/messages/:messageId/read - Mark message as read
GET    /api/messages/unread/count    - Get unread count
```

### Notification Routes
```
GET    /api/notifications            - Get notifications
PUT    /api/notifications/:id/read   - Mark as read
GET    /api/notifications/unread/count - Get unread count
DELETE /api/notifications/:id        - Delete notification
```

## Development

### Available Scripts

```bash
# Start production server
npm start

# Start with auto-reload (nodemon)
npm run dev
```

### Testing Endpoints

Use Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "Freelancer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Form Validation

Using express-validator:

```javascript
const { body, validationResult } = require('express-validator');

exports.endpoint = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
];
```

## Error Handling

Consistent error responses:

```javascript
// Success
res.status(200).json({ message: 'Success', data: {...} });

// Validation error
res.status(400).json({ message: 'Invalid input' });

// Authentication error
res.status(401).json({ message: 'Invalid credentials' });

// Authorization error
res.status(403).json({ message: 'Access denied' });

// Not found
res.status(404).json({ message: 'Resource not found' });

// Server error
res.status(500).json({ message: 'Server error' });
```

## Security Features

### Password Hashing
```javascript
// Automatic in User model pre-save hook
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
```

### JWT Authentication
```javascript
// Tokens expire in 7 days
const token = jwt.sign(
  { userId, role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

### CORS
```javascript
app.use(cors());
```

## Scheduled Tasks

### Project Update Reminders
Cron job runs daily at 8 AM:
- Finds projects with no updates in 2 days
- Sends email notification
- Creates in-app notification

Location: `utils/cronScheduler.js`

## Database Queries

### Find Operations
```javascript
// Find one user
const user = await User.findById(userId);
const user = await User.findOne({ email });

// Find multiple
const jobs = await Job.find({ clientId, status: 'Open' });

// Populate references
const jobs = await Job.find().populate('clientId', 'username email');

// Filter and sort
const jobs = await Job.find({ status: 'Open' })
  .sort({ createdAt: -1 })
  .limit(10);
```

### Create Operations
```javascript
const user = new User({...});
await user.save();

// Or
const user = await User.create({...});
```

### Update Operations
```javascript
// Find and update
await User.findByIdAndUpdate(id, {...}, { new: true });

// Update many
await Job.updateMany({ status: 'Open' }, { status: 'Closed' });
```

### Delete Operations
```javascript
await User.findByIdAndDelete(id);
await Job.deleteMany({ status: 'Completed' });
```

## Email Integration

Currently uses console logging. To integrate actual email:

1. Install nodemailer:
   ```bash
   npm install nodemailer
   ```

2. Update `utils/emailUtils.js`:
   ```javascript
   const nodemailer = require('nodemailer');
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });
   ```

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or for older versions
mongo
```

### Port Already in Use
```bash
# Find process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

### JWT Errors
- Verify JWT_SECRET in .env
- Check token in Authorization header
- Ensure token hasn't expired

### CORS Errors
- Check frontend origin in cors()
- Verify API endpoint URLs
- Check request headers

## Performance Optimization

- Use database indexes for frequently queried fields
- Implement pagination for large datasets
- Use select() to limit returned fields
- Cache frequently accessed data
- Implement rate limiting
- Use compression middleware

## Production Deployment

### Environment Setup
```env
NODE_ENV=production
JWT_SECRET=<strong-random-key>
MONGODB_URI=<production-mongodb-url>
PORT=3000
```

### Server Options
- **Heroku**: Deploy directly from Git
- **AWS EC2**: Run with PM2
- **DigitalOcean**: Similar to EC2
- **Railway**: Modern Heroku alternative

### PM2 (Process Manager)
```bash
npm install pm2 -g
pm2 start server.js --name "freelancer-api"
pm2 save
pm2 startup
```

## Best Practices

- Use environment variables for configuration
- Validate all user inputs
- Hash passwords before storing
- Use HTTPS in production
- Implement rate limiting
- Add logging and monitoring
- Use pagination for large datasets
- Index database fields appropriately
- Handle errors gracefully
- Document API endpoints

---

For frontend setup, see [Frontend README](../client/README.md)
