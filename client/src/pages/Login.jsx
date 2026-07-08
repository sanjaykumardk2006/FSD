import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Login = () => {
  const [step, setStep] = useState(1);
  const [loginType, setLoginType] = useState('Client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRoleSelection = (role) => {
    setLoginType(role);
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

    try {
      const response = await apiClient.post('/auth/login', formData);
      setMessage(response.data.message);
      
      // Store auth data
      login(response.data.token, response.data.user);

      // Redirect based on role
      setTimeout(() => {
        if (response.data.user.role === 'Client') {
          navigate('/client-dashboard');
        } else {
          navigate('/freelancer-dashboard');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />
      <main>
        <section className="content-section" style={{ padding: '0 24px', margin: '0 auto 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
              {step === 1 ? 'Welcome Back' : `Log in as a ${loginType}`}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              {step === 1 ? 'Choose how you want to log in' : 'Enter your credentials to access your account'}
            </p>
          </div>

          <div style={{ maxWidth: step === 1 ? '700px' : '500px', margin: '0 auto' }}>
            {step === 1 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div 
                  onClick={() => handleRoleSelection('Client')}
                  style={{ padding: '40px 30px', border: '2px solid var(--border-color)', borderRadius: '24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '64px', height: '64px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>I'm a Client</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>Log in to hire talent and manage projects.</p>
                </div>

                <div 
                  onClick={() => handleRoleSelection('Freelancer')}
                  style={{ padding: '40px 30px', border: '2px solid var(--border-color)', borderRadius: '24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '64px', height: '64px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>I'm a Freelancer</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>Log in to find work and manage earnings.</p>
                </div>
              </div>
            ) : (
              <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                <div className="auth-form" style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setStep(1)} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', marginBottom: '24px', borderRadius: '8px', transition: 'all 0.2s ease', marginLeft: '-12px', fontSize: '15px', fontWeight: '500' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back
                  </button>

                  {message && <div className="message success">{message}</div>}
                  {error && <div className="message error">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                      {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {step === 1 && (
              <p className="auth-link" style={{ marginTop: '40px', textAlign: 'center' }}>
                Don't have an account? <a href="/signup">Create one here</a>
              </p>
            )}
            {step === 2 && (
              <p className="auth-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                Don't have an account? <a href="/signup">Create one here</a>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
