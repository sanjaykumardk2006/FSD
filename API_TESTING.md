# API Testing Guide

## Tools Needed
- **Postman** (GUI) or **curl** (CLI)
- Running backend server on port 5000

## Base URL
```
http://localhost:5000/api
```

## Authentication Flow

### 1. Signup
```
POST /auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "role": "Freelancer"
}

Response:
{
  "message": "User registered successfully. Please login.",
  "userId": "507f1f77bcf86cd799439011"
}
```

### 2. Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "role": "Freelancer"
  }
}
```

**Save the token for protected requests**

## Protected Endpoints
All protected endpoints require:
```
Authorization: Bearer <token>
```

### 3. Get User Profile
```
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

Response:
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "role": "Freelancer",
    "profile": {
      "bio": "",
      "skills": [],
      "experience": ""
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Job Endpoints

### Post a Job (Client)
```
POST /jobs/post
Authorization: Bearer <client-token>
Content-Type: application/json

{
  "title": "Build React Website",
  "description": "Need a professional e-commerce website built with React",
  "requiredSkills": ["React", "Node.js", "MongoDB"],
  "budget": 1500,
  "deadline": "2024-12-31"
}

Response:
{
  "message": "Job posted successfully",
  "job": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build React Website",
    "status": "Open",
    ...
  }
}
```

### Get All Open Jobs
```
GET /jobs/all
Content-Type: application/json

Response:
{
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Build React Website",
      "description": "...",
      "budget": 1500,
      "status": "Open",
      "clientId": {...}
    }
  ]
}
```

### Get Client's Jobs
```
GET /jobs/my-jobs
Authorization: Bearer <client-token>

Response:
{
  "jobs": [...]
}
```

### Get Job Details
```
GET /jobs/507f1f77bcf86cd799439012
```

## Proposal Endpoints

### Submit Proposal (Freelancer)
```
POST /proposals/submit
Authorization: Bearer <freelancer-token>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439012",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": "5 years in full-stack development",
  "proposedCost": 1200,
  "proposedDeadline": "2024-12-20",
  "coverLetter": "I am experienced in building React websites..."
}

Response:
{
  "message": "Proposal submitted successfully",
  "proposal": {
    "_id": "507f1f77bcf86cd799439013",
    "jobId": "507f1f77bcf86cd799439012",
    "status": "Pending",
    ...
  }
}
```

### Get Freelancer's Proposals
```
GET /proposals/my-proposals
Authorization: Bearer <freelancer-token>
```

### Get Job Proposals (Client)
```
GET /jobs/507f1f77bcf86cd799439012/proposals
Authorization: Bearer <client-token>
```

### Accept Proposal (Client)
```
PUT /proposals/507f1f77bcf86cd799439013/accept
Authorization: Bearer <client-token>
Content-Type: application/json

Response:
{
  "message": "Proposal accepted",
  "proposal": {
    "status": "Accepted",
    ...
  }
}
```

### Reject Proposal (Client)
```
PUT /proposals/507f1f77bcf86cd799439013/reject
Authorization: Bearer <client-token>
Content-Type: application/json

{
  "rejectionReason": "Found better experience match"
}

Response:
{
  "message": "Proposal rejected",
  "proposal": {
    "status": "Rejected",
    "rejectionReason": "Found better experience match",
    ...
  }
}
```

## Project Endpoints

### Get Freelancer's Projects
```
GET /projects/freelancer/projects
Authorization: Bearer <freelancer-token>
```

### Get Client's Projects
```
GET /projects/client/projects
Authorization: Bearer <client-token>
```

### Get Project Details
```
GET /projects/507f1f77bcf86cd799439014
Authorization: Bearer <token>
```

### Update Project Progress (Freelancer)
```
POST /projects/507f1f77bcf86cd799439014/progress
Authorization: Bearer <freelancer-token>
Content-Type: application/json

{
  "stage": "Frontend Development",
  "description": "Completed homepage and navigation. Starting product pages."
}

Response:
{
  "message": "Project progress updated",
  "project": {
    "progress": [
      {
        "stage": "Frontend Development",
        "description": "...",
        "updatedAt": "2024-01-15T14:30:00Z"
      }
    ],
    ...
  }
}
```

## Message Endpoints

### Send Message
```
POST /messages/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "507f1f77bcf86cd799439014",
  "receiverId": "507f1f77bcf86cd799439011",
  "message": "Hey, how's the project going?"
}

Response:
{
  "message": "Message sent",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "projectId": "507f1f77bcf86cd799439014",
    "message": "Hey, how's the project going?",
    "createdAt": "2024-01-15T14:35:00Z"
  }
}
```

### Get Project Messages
```
GET /messages/507f1f77bcf86cd799439014
Authorization: Bearer <token>

Response:
{
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "senderId": {...},
      "message": "Hey, how's the project going?",
      "isRead": false,
      "createdAt": "2024-01-15T14:35:00Z"
    }
  ]
}
```

## Notification Endpoints

### Get Notifications
```
GET /notifications
Authorization: Bearer <token>

Response:
{
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "type": "proposal_accepted",
      "title": "Proposal Accepted",
      "message": "Your proposal was accepted!",
      "isRead": false,
      "createdAt": "2024-01-15T12:00:00Z"
    }
  ]
}
```

### Get Unread Count
```
GET /notifications/unread/count
Authorization: Bearer <token>

Response:
{
  "unreadCount": 5
}
```

### Mark as Read
```
PUT /notifications/507f1f77bcf86cd799439016/read
Authorization: Bearer <token>
```

## Using Postman

1. **Create Collection**: "Freelancer Marketplace"
2. **Set Variables**: 
   - `base_url`: http://localhost:5000/api
   - `token`: (set after login)
3. **Create Requests**: 
   - In Authorization tab, select "Bearer Token"
   - Use `{{token}}` variable
4. **Test Flows**: Use pre/post request scripts

## Using curl

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "Freelancer"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Protected Request
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Common Issues

### 401 Unauthorized
- Token missing or invalid
- Token expired (exceeds 7 days)
- Authorization header format wrong

### 403 Forbidden
- User doesn't have required role
- Not the owner of resource

### 400 Bad Request
- Validation error
- Check error messages for details

### 404 Not Found
- Resource doesn't exist
- Check ID format

### 500 Server Error
- Check backend console
- Check database connection

## Testing Checklist

- [ ] User Signup (Client & Freelancer)
- [ ] User Login
- [ ] Post Job (as Client)
- [ ] View Jobs (as Freelancer)
- [ ] Submit Proposal
- [ ] View Proposals (as Client)
- [ ] Accept Proposal
- [ ] Project Progress Update
- [ ] Send Message
- [ ] Get Notifications

---

Happy testing! 🎉
