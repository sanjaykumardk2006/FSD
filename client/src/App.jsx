import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PrivateRoute } from './utils/PrivateRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { DashboardLayout } from './components/DashboardLayout';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Search } from './pages/Search';
import { ClientDashboard } from './pages/ClientDashboard';
import { FreelancerDashboard } from './pages/FreelancerDashboard';
import { JobProposals } from './pages/JobProposals';
import { ProjectDetail } from './pages/ProjectDetail';
import { VerifyEmail } from './pages/VerifyEmail';
import { ResetPassword } from './pages/ResetPassword';
import { PublicJobDetail } from './pages/PublicJobDetail';
import { AdminDashboard } from './pages/AdminDashboard';

import './App.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/job/:jobId" element={<PublicJobDetail />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes wrapped with DashboardLayout */}
            <Route
              path="/client-dashboard/*"
              element={
                <PrivateRoute>
                  <DashboardLayout role="Client">
                    <ClientDashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/freelancer-dashboard/*"
              element={
                <PrivateRoute>
                  <DashboardLayout role="Freelancer">
                    <FreelancerDashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard/*"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            
            {/* Note: JobProposals and ProjectDetail will be accessed from within Dashboards, 
                or they can have their own routes wrapped in DashboardLayout too. */}
            <Route
              path="/job/:jobId/proposals"
              element={
                <PrivateRoute>
                  <DashboardLayout role="Client">
                    <JobProposals />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <PrivateRoute>
                  {/* We'll pass the role dynamically in ProjectDetail or just render the layout there if needed,
                      but wrapping here requires knowing the role. For now, since both access it, we'll let ProjectDetail handle layout or wrap it based on user context. 
                      Actually, we need AuthContext to know the role here, which is tricky outside of components.
                      Let's just remove DashboardLayout wrapper here and let the page itself render DashboardLayout so it can access user.role.
                  */}
                  <ProjectDetail />
                </PrivateRoute>
              }
            />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
