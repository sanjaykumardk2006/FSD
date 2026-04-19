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
      <main className="auth-container">
        <div className="auth-form">
          <h1>Login</h1>
          
          <div className="login-type-selector">
            <button
              className={`type-btn ${loginType === 'Client' ? 'active' : ''}`}
              onClick={() => setLoginType('Client')}
            >
              Login as Client
            </button>
            <button
              className={`type-btn ${loginType === 'Freelancer' ? 'active' : ''}`}
              onClick={() => setLoginType('Freelancer')}
            >
              Login as Freelancer
            </button>
          </div>

          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="auth-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
