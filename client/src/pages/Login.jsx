import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Login = () => {
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
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome Back</h2>
            <p>Log in to your Freelancer Hub account and continue your journey</p>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '80px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="auth-form" style={{ marginTop: '30px' }}>
              <div className="login-type-selector">
                <button
                  className={`type-btn ${loginType === 'Client' ? 'active' : ''}`}
                  onClick={() => setLoginType('Client')}
                >
                  👤 Client
                </button>
                <button
                  className={`type-btn ${loginType === 'Freelancer' ? 'active' : ''}`}
                  onClick={() => setLoginType('Freelancer')}
                >
                  💼 Freelancer
                </button>
              </div>

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
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
                  {loading ? 'Logging in...' : 'LOGIN'}
                </button>
              </form>

              <p className="auth-link" style={{ marginTop: '20px' }}>
                Don't have an account? <a href="/signup">Create one here</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
