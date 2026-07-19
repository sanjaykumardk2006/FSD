import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'Client',
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    mobileNumber: '',
    countryCode: '+91',
    entityType: 'Self-employed',
    service: '',
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (formData.password !== formData.passwordConfirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const submissionData = { ...formData };
      submissionData.mobileNumber = `${formData.countryCode}${formData.mobileNumber}`;
      const response = await apiClient.post('/auth/signup', submissionData);
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />
      <main style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0', background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.03) 0%, transparent 50%)' }}>
        <section className="content-section" style={{ padding: '0 24px', width: '100%', margin: '0 auto' }}>
          <motion.div 
            style={{ textAlign: 'center', marginBottom: '40px' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
              {step === 1 ? 'Join Freelancer Hub' : `Sign up as a ${formData.role === 'Client' ? 'Customer' : formData.role}`}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              {step === 1 ? 'Choose how you want to use our platform' : 'Enter your details to create an account'}
            </p>
          </motion.div>
          
          <div style={{ maxWidth: step === 1 ? '900px' : '600px', margin: '0 auto' }}>
            {step === 1 ? (
              <motion.div 
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
              >
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  onClick={() => handleRoleSelection('Client')}
                  style={{ padding: '40px 30px', border: '2px solid var(--border-color)', borderRadius: '24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '64px', height: '64px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Sign Up as a Customer</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>I want to hire top freelancers for my projects.</p>
                </motion.div>

                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  onClick={() => handleRoleSelection('Freelancer')}
                  style={{ padding: '40px 30px', border: '2px solid var(--border-color)', borderRadius: '24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '64px', height: '64px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Sign Up as a Freelancer</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>I'm looking for work and want to earn money.</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <button 
                  onClick={() => setStep(1)} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', marginBottom: '16px', borderRadius: '8px', transition: 'all 0.2s ease', marginLeft: '0', fontSize: '15px', fontWeight: '500' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back
                </button>
                <div className="auth-form" style={{ position: 'relative' }}>

                  <form onSubmit={handleSubmit}>
                      <>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-primary)' }}>You are</p>
                          <div style={{ display: 'flex', gap: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                              <input type="radio" name="entityType" value="Self-employed" checked={formData.entityType === 'Self-employed'} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#10b981' }} />
                              Self-employed
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                              <input type="radio" name="entityType" value="Company" checked={formData.entityType === 'Company'} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#10b981' }} />
                              Company
                            </label>
                          </div>
                        </div>

                        {formData.entityType === 'Company' ? (
                          <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                              type="text"
                              id="companyName"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              placeholder="Company Name"
                              required
                            />
                          </div>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
                            <div className="form-group">
                              <label htmlFor="firstName">First Name</label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="lastName">Last Name</label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                              />
                            </div>
                          </div>
                        )}
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="mobileNumber">Mobile Number</label>
                          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <select
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleChange}
                              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', width: '110px', flexShrink: 0 }}
                            >
                              <option value="+91">+91 (IN)</option>
                              <option value="+1">+1 (US)</option>
                              <option value="+44">+44 (UK)</option>
                              <option value="+61">+61 (AU)</option>
                            </select>
                            <input
                              type="tel"
                              id="mobileNumber"
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              placeholder="xxxxxxxxxx"
                              required
                              style={{ flex: 1, width: '100%', minWidth: 0 }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                          />
                        </div>
                        {formData.role === 'Freelancer' && (
                          <div className="form-group">
                            <label htmlFor="service">Service</label>
                            <input
                              type="text"
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              placeholder="ex: web developer, editor, etc"
                              required
                            />
                          </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create password"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                            <input
                              type="password"
                              id="passwordConfirmation"
                              name="passwordConfirmation"
                              value={formData.passwordConfirmation}
                              onChange={handleChange}
                              placeholder="Confirm password"
                              required
                            />
                          </div>
                        </div>
                      </>
                    {message && <div className="message success">{message}</div>}
                    {error && <div className="message error">{error}</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                      {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
            
            {step === 1 && (
              <p className="auth-link" style={{ marginTop: '40px', textAlign: 'center' }}>
                Already a member? <Link to="/login">Sign in</Link>
              </p>
            )}
            {step === 2 && (
              <p className="auth-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                Already a member? <Link to="/login">Sign in</Link>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
