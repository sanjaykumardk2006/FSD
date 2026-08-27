import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ChevronDown, User, Briefcase, Menu, X, Bell, Sun, Moon } from 'lucide-react';
import apiClient from '../utils/apiClient';
import { io } from 'socket.io-client';
import { useThemeToggle } from './AnimatedThemeToggle';
import '../App.css';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark, handleToggle } = useThemeToggle('circle', 'top-left', true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('Client');
  
  // Dropdown states
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      
      const SOCKET_URL = import.meta.env.VITE_API_URL.replace('/api', '');
      socketRef.current = io(SOCKET_URL);
      
      socketRef.current.emit('join_user', user.id);
      
      socketRef.current.on('new_notification', () => {
        fetchUnreadCount();
        window.dispatchEvent(new Event('notification-received'));
      });
      
      const handleNotificationRead = () => {
        fetchUnreadCount();
      };
      window.addEventListener('notification-read', handleNotificationRead);
      
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        window.removeEventListener('notification-read', handleNotificationRead);
      };
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const response = await apiClient.get('/notifications/unread/count');
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error('Failed to fetch unread notifications count:', error);
    }
  };

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <NavLink to={user.role === 'Client' ? '/client-dashboard' : '/freelancer-dashboard'} className="btn btn-primary">Dashboard</NavLink>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '15px', fontWeight: '600', fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--danger)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>Logout</button>
              </div>
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
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px' }}>
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
            <button 
              onClick={handleToggle} 
              style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', marginLeft: 'auto' }}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {!isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        initialRole={authRole}
      />

      {user && (
        <button 
          className="floating-notification-btn"
          onClick={() => navigate(user.role === 'Client' ? '/client-dashboard?tab=notifications' : '/freelancer-dashboard?tab=notifications')}
          style={{ 
            position: 'fixed', 
            top: '100px', // Below the navbar
            right: '24px', // Nearest to the right border
            zIndex: 9999, 
            background: 'var(--danger)', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
            transition: 'transform 0.2s ease',
          }}
          title="Notifications"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Bell size={32} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: '0px', right: '0px', background: '#fff', color: 'var(--danger)', fontSize: '13px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', border: '2px solid var(--danger)' }}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}
    </>
  );
};
