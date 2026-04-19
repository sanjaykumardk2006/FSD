import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Freelancer Hub</h3>
            <p>Email: contact@freelancerhub.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h3>Get Started</h3>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Freelancer Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
