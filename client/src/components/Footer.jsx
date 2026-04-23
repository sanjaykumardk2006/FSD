import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Freelancer Hub</h3>
            <div className="footer-contact-item">
              <strong>Email</strong>
              <p><a href="mailto:sanjaykumardk.24cse@kongu.edu">sanjaykumardk.24cse@kongu.edu</a></p>
            </div>
            <div className="footer-contact-item">
              <strong>Phone</strong>
              <p><a href="tel:7397544021">7397544021</a></p>
            </div>
            <div className="footer-contact-item">
              <strong>Address</strong>
              <p>Kongu Engineering College, Perundurai, Erode - 638060</p>
            </div>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.5 9-1.5 9-5.5v-1c.67-.5 1.33-1.17 2-2z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a6 6 0 00-6 6v4H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
            </div>
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
            <a href="/signup">Sign Up</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Freelancer Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
