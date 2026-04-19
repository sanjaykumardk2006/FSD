import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Client',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const response = await apiClient.post('/auth/signup', formData);
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
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Join Freelancer Hub</h2>
            <p>Start your journey by creating an account today</p>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '80px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="auth-form" style={{ marginTop: '30px' }}>
              {message && <div className="message success">{message}</div>}
              {error && <div className="message error">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Full Name</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
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
                    placeholder="Create a strong password (min 6 characters)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">I'm signing up as</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ padding: '10px 12px', fontSize: '16px' }}
                  >
                    <option value="Client">👤 Client (Hiring freelancers)</option>
                    <option value="Freelancer">💼 Freelancer (Looking for work)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
                  {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
                </button>
              </form>

              <p className="auth-link" style={{ marginTop: '20px' }}>
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
