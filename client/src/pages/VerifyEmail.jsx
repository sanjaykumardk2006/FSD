import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

import AnimatedButton from '../components/AnimatedButton';
export const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await apiClient.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed. The token may be invalid or expired.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', width: '100%', textAlign: 'center', border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>Email Verification</h2>
        
        {status === 'verifying' && <p style={{ color: 'var(--text-secondary)' }}>Verifying your email address. Please wait...</p>}
        
        {status === 'success' && (
          <div>
            <p style={{ color: 'var(--success)', marginBottom: '24px' }}>{message}</p>
            <AnimatedButton className="btn btn-primary" onClick={() => navigate('/')} style={{ width: '100%' }}>
              Go to Login
            </AnimatedButton>
          </div>
        )}
        
        {status === 'error' && (
          <div>
            <p style={{ color: 'var(--danger)', marginBottom: '24px' }}>{message}</p>
            <AnimatedButton className="btn btn-secondary" onClick={() => navigate('/')} style={{ width: '100%' }}>
              Return Home
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};
