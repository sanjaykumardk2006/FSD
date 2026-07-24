import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ChevronDown, User, Briefcase, Menu, X } from 'lucide-react';
import '../App.css';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('Client');
  
  // Dropdown states
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAuth = (mode, role) => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthModalOpen(true);
    setLoginDropdownOpen(false);
    setSignupDropdownOpen(false);
  };

  useEffect(() => {
    const handleOpenAuth = (e) => {
      if (e.detail) {
        openAuth(e.detail.mode, e.detail.role);
      }
    };
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <h1><span className="freelancer-text">Freelancer</span> <span className="hub-text">Hub</span></h1>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
            <NavLink to="/search" onClick={() => setIsMobileMenuOpen(false)}>Jobs</NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
            
            {user ? (
              <>
                <NavLink to={user.role === 'Client' ? '/client-dashboard' : '/freelancer-dashboard'} className="btn btn-primary" style={{color: 'white'}}>Dashboard</NavLink>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--danger)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Logout</button>
              </>
            ) : (
              <div className="auth-nav-group">
                <div 
                  className="dropdown-container" 
                  onMouseEnter={() => setLoginDropdownOpen(true)}
                  onMouseLeave={() => setLoginDropdownOpen(false)}
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                >
                  <button className="nav-dropdown-btn">
                    Login <ChevronDown size={14} />
                  </button>
                  {loginDropdownOpen && (
                    <div className="dropdown-menu right">
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
                  className="dropdown-container"
                  onMouseEnter={() => setSignupDropdownOpen(true)}
                  onMouseLeave={() => setSignupDropdownOpen(false)}
                  onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
                >
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px', color: 'white' }}>
                    Sign Up <ChevronDown size={14} />
                  </button>
                  {signupDropdownOpen && (
                    <div className="dropdown-menu right">
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
            )}
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        initialRole={authRole}
      />
    </>
  );
};
