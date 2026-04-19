# Frontend Setup Guide

## Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation Steps

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Footer component
├── pages/              # Page components (routes)
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Contact.jsx     # Contact form
│   ├── Signup.jsx      # User registration
│   ├── Login.jsx       # User login
│   ├── ClientDashboard.jsx        # Client dashboard
│   ├── FreelancerDashboard.jsx    # Freelancer dashboard
│   ├── JobProposals.jsx           # Job proposals page
│   └── ProjectDetail.jsx          # Project details page
├── context/            # React Context (state management)
│   └── AuthContext.jsx # Authentication context
├── utils/              # Utility functions
│   ├── apiClient.js    # Axios instance with interceptors
│   └── PrivateRoute.jsx # Protected route component
├── App.jsx             # Main app component with routing
├── App.css             # Global styles
├── index.css           # Base styles
└── main.jsx            # Application entry point
```

## Key Features

### Authentication Context (AuthContext.jsx)
- Manages user login state
- Stores token and user data
- Provides login/logout functions
- Persists auth data in localStorage

### API Client (apiClient.js)
- Axios instance for API calls
- Automatic token injection in requests
- Error handling and redirects
- Base URL configuration

### Pages

#### Authentication Pages
- **Signup.jsx**: User registration with role selection
- **Login.jsx**: Login with role selection buttons (UI only)

#### Public Pages
- **Home.jsx**: Landing page with hero section and CTA
- **About.jsx**: About marketplace information
- **Contact.jsx**: Contact form

#### Protected Pages
- **ClientDashboard.jsx**: Job posting and management
- **FreelancerDashboard.jsx**: Browse jobs and submit proposals
- **JobProposals.jsx**: View and manage proposals
- **ProjectDetail.jsx**: Project details, progress, and messaging

## Styling

### Global Styles (App.css)
- CSS custom properties for colors
- Responsive design with media queries
- Component-specific styles
- Utility classes for common patterns

### Key Colors
```css
--primary-color: #6366f1 (Indigo)
--secondary-color: #ef4444 (Red)
--success-color: #10b981 (Green)
--danger-color: #dc2626 (Dark Red)
--warning-color: #f59e0b (Amber)
```

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

## API Integration

### Making API Calls

```javascript
import apiClient from '../utils/apiClient';

// GET request
const response = await apiClient.get('/api/endpoint');

// POST request
const response = await apiClient.post('/api/endpoint', data);

// PUT request
const response = await apiClient.put('/api/endpoint', data);

// DELETE request
const response = await apiClient.delete('/api/endpoint');
```

### Error Handling
- 401 errors redirect to login
- Error messages displayed to user
- Try-catch blocks for async operations

## Forms and Validation

### Frontend Validation
- Required field checks
- Email format validation
- Number format validation
- Date validation

### Form Handling
- State management with useState
- Change handlers for input fields
- Form submission handlers
- Loading states during submission

## Routing

### Public Routes
- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/signup` - Sign up
- `/login` - Login

### Protected Routes
- `/client-dashboard` - Client dashboard
- `/freelancer-dashboard` - Freelancer dashboard
- `/job/:jobId/proposals` - Job proposals
- `/project/:projectId` - Project details

### Route Protection
Protected routes use `PrivateRoute` component:
```javascript
<Route
  path="/protected-path"
  element={
    <PrivateRoute>
      <ProtectedComponent />
    </PrivateRoute>
  }
/>
```

## Component Communication

### Props
Components receive props for data and functions:
```javascript
<Header /> // No props needed
<Footer /> // No props needed
```

### Context
Auth context provides:
```javascript
const { user, token, loading, login, logout } = useContext(AuthContext);
```

### State
Local component state with useState:
```javascript
const [formData, setFormData] = useState({});
const [loading, setLoading] = useState(false);
```

## Local Storage

Auth data stored:
- `token` - JWT authentication token
- `user` - User object (id, username, email, role)

Retrieved on app load to restore session.

## Browser DevTools

### React DevTools
- Inspect component tree
- Track props and state changes
- View context values

### Network Tab
- Monitor API calls
- Check request/response data
- View HTTP status codes

## Environment Variables

Currently using hardcoded API URL. For production:

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Update apiClient.js:
```javascript
baseURL: import.meta.env.VITE_API_URL,
```

## Performance Tips

- Lazy load images
- Use React.memo for expensive components
- Implement pagination for long lists
- Debounce search inputs
- Cache API responses

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found
```bash
# Ensure correct import paths
# Check file extensions (.jsx, .js)
# Verify relative paths
```

### CORS Errors
- Ensure backend is running on port 5000
- Check proxy configuration in vite.config.js
- Verify backend CORS middleware

## Best Practices

- Keep components focused and single-responsibility
- Use descriptive variable and function names
- Handle loading and error states
- Add proper error boundaries
- Validate user input on both client and server
- Use semantic HTML
- Test in multiple browsers
- Mobile-first responsive design

## Deployment

### Build for Production
```bash
npm run build
```

Generates optimized `dist` folder for deployment.

### Deployment Options
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

---

For backend setup, see [Backend README](../server/README.md)
