import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, ChevronUp } from 'lucide-react';

export const Footer = () => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);

  const openAuth = (mode, role) => {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode, role } }));
    setLoginDropdownOpen(false);
    setSignupDropdownOpen(false);
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 style={{ position: 'relative', paddingBottom: '12px', marginBottom: '16px' }}>
              About us
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', backgroundColor: '#10B981' }}></span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '16px', marginBottom: '20px' }}>
              Freelancer Hub is a premium digital marketplace connecting ambitious businesses with top-tier global talent.
            </p>

          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            
            <div 
              style={{ position: 'relative', cursor: 'pointer', width: 'fit-content' }}
              onMouseEnter={() => setLoginDropdownOpen(true)}
              onMouseLeave={() => setLoginDropdownOpen(false)}
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
            >
              <a href="#login" onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Login <ChevronUp size={14} />
              </a>
              {loginDropdownOpen && (
                <div className="dropdown-menu" style={{ bottom: '100%', top: 'auto', left: 0, marginBottom: '8px' }}>
                  <button onClick={(e) => { e.stopPropagation(); openAuth('login', 'Freelancer'); }}>
                    <User size={16} /> As Freelancer
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); openAuth('login', 'Client'); }}>
                    <Briefcase size={16} /> As Customer
                  </button>
                </div>
              )}
            </div>

            <div 
              style={{ position: 'relative', cursor: 'pointer', width: 'fit-content' }}
              onMouseEnter={() => setSignupDropdownOpen(true)}
              onMouseLeave={() => setSignupDropdownOpen(false)}
              onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
            >
              <a href="#signup" onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Sign Up <ChevronUp size={14} />
              </a>
              {signupDropdownOpen && (
                <div className="dropdown-menu" style={{ bottom: '100%', top: 'auto', left: 0, marginBottom: '8px' }}>
                  <button onClick={(e) => { e.stopPropagation(); openAuth('signup', 'Freelancer'); }}>
                    <User size={16} /> As Freelancer
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); openAuth('signup', 'Client'); }}>
                    <Briefcase size={16} /> As Customer
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="footer-contact-item">
              <p style={{ marginBottom: '12px' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Email</strong>
                <a href="mailto:sanjaykumardk2006@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  sanjaykumardk2006@gmail.com
                </a>
              </p>

            </div>
            <div className="social-links" style={{ marginTop: '20px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
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
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Freelancer Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
