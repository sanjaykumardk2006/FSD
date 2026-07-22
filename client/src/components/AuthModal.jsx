import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Briefcase, ChevronRight } from 'lucide-react';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login', initialRole = 'Client' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    setMode(initialMode);
    setRole(initialRole);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : { ...formData, role };

      const response = await apiClient.post(endpoint, payload);
      
      login(response.data.token, response.data.user);
      onClose();
      
      const userRole = response.data.user.role;
      navigate(userRole === 'Client' ? '/client-dashboard' : '/freelancer-dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || `${mode === 'login' ? 'Login' : 'Signup'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay auth-overlay">
          <motion.div 
            className="modal auth-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <button className="close-modal-btn" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="auth-header">
              <h2>{mode === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
              <p>
                {mode === 'login' 
                  ? `Sign in as a ${role}`
                  : `Join as a ${role}`
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-content">
              {error && (
                <div className="message error" style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div className="form-group floating-label">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder=" "
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <label>Username</label>
                </div>
              )}

              <div className="form-group floating-label">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="form-group floating-label">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
              </div>

              {mode === 'signup' && (
                <div className="form-group floating-label">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label>Confirm Password</label>
                </div>
              )}

              <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
                {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                {!loading && <ChevronRight size={18} />}
              </button>
            </form>

            <div className="auth-footer">
              {mode === 'login' ? (
                <p>Don't have an account? <button className="text-btn" onClick={() => setMode('signup')}>Sign up</button></p>
              ) : (
                <p>Already have an account? <button className="text-btn" onClick={() => setMode('login')}>Log in</button></p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
