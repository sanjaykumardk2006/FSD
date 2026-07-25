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
    country: '',
    mobileNumber: '',
    entityType: 'Self-employed',
    service: '',
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
      country: '',
      mobileNumber: '',
      entityType: 'Self-employed',
      service: '',
    });
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
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

    if (mode === 'signup' && formData.mobileNumber && formData.mobileNumber.length !== 10) {
      setError('Mobile number must be exactly 10 digits');
      setLoading(false);
      return;
    }

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : { ...formData, role };

      const response = await apiClient.post(endpoint, payload);
      
      if (mode === 'login') {
        login(response.data.token, response.data.user);
        onClose();
        
        const userRole = response.data.user.role;
        navigate(userRole === 'Client' ? '/client-dashboard' : '/freelancer-dashboard');
      } else {
        setMode('login');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      }
      
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
              <h2>{mode === 'login' ? 'Welcome Back' : `Join as ${role === 'Client' ? 'Customer' : role}`}</h2>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-content" style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '8px' }}>
              {error && (
                <div className="message error" style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, entityType: 'Self-employed' })}
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        background: formData.entityType === 'Self-employed' ? 'var(--bg-card)' : 'transparent',
                        color: formData.entityType === 'Self-employed' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        boxShadow: formData.entityType === 'Self-employed' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      Self-employed
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, entityType: 'Company' })}
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        background: formData.entityType === 'Company' ? 'var(--bg-card)' : 'transparent',
                        color: formData.entityType === 'Company' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        boxShadow: formData.entityType === 'Company' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      Company
                    </button>
                  </div>
                  
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

                  <div className="form-group floating-label" style={{ marginTop: '20px' }}>
                    <User size={18} className="input-icon" />
                    <input type="text" name="country" placeholder=" " value={formData.country} onChange={handleChange} required />
                    <label>Country</label>
                  </div>
                  
                  <div className="form-group floating-label">
                    <User size={18} className="input-icon" />
                    <input type="tel" name="mobileNumber" placeholder=" " value={formData.mobileNumber} onChange={handleChange} required />
                    <label>Mobile Number</label>
                  </div>

                  {role === 'Freelancer' && (
                    <div className="form-group floating-label">
                      <Briefcase size={18} className="input-icon" />
                      <input type="text" name="service" placeholder=" " value={formData.service} onChange={handleChange} required />
                      <label>Service (ex: web developer)</label>
                    </div>
                  )}
                </>
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

              <div className="auth-footer" style={{ marginTop: '20px', paddingBottom: '30px' }}>
                {mode === 'login' ? (
                  <p>Don't have an account? <button type="button" className="text-btn" onClick={() => setMode('signup')}>Sign up</button></p>
                ) : (
                  <p>Already have an account? <button type="button" className="text-btn" onClick={() => setMode('login')}>Log in</button></p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
