import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Bell, 
  DollarSign, 
  User, 
  LogOut,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ArrowLeft
} from 'lucide-react';
import '../App.css'; // Make sure styles are available

export const DashboardLayout = ({ children, role }) => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const freelancerLinks = [
    { name: 'Available Jobs', icon: <Search size={20} />, path: '/freelancer-dashboard', exact: true },
    { name: 'My Proposals', icon: <FileText size={20} />, path: '/freelancer-dashboard?tab=proposals' },
    { name: 'Active Projects', icon: <Briefcase size={20} />, path: '/freelancer-dashboard?tab=projects' },
    { name: 'Completed Projects', icon: <CheckSquare size={20} />, path: '/freelancer-dashboard?tab=completed' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/freelancer-dashboard?tab=messages' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/freelancer-dashboard?tab=notifications' },
    { name: 'Earnings', icon: <DollarSign size={20} />, path: '/freelancer-dashboard?tab=earnings' },
    { name: 'Profile', icon: <User size={20} />, path: '/freelancer-dashboard?tab=profile' },
  ];

  const clientLinks = [
    { name: 'My Posted Jobs', icon: <Briefcase size={20} />, path: '/client-dashboard', exact: true },
    { name: 'View Proposals', icon: <FileText size={20} />, path: '/client-dashboard?tab=proposals' },
    { name: 'Active Projects', icon: <CheckSquare size={20} />, path: '/client-dashboard?tab=projects' },
    { name: 'Completed Projects', icon: <CheckSquare size={20} />, path: '/client-dashboard?tab=completed' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/client-dashboard?tab=messages' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/client-dashboard?tab=notifications' },
    { name: 'Payment History', icon: <DollarSign size={20} />, path: '/client-dashboard?tab=payments' },
    { name: 'Profile', icon: <User size={20} />, path: '/client-dashboard?tab=profile' },
  ];

  const navLinks = role === 'Client' ? clientLinks : freelancerLinks;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <div className="mobile-dashboard-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h2><span className="freelancer-text" style={{ fontSize: '20px' }}>Freelancer</span> <span className="hub-text" style={{ fontSize: '18px' }}>Hub</span></h2>
        </div>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 16px', borderBottom: 'none' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <button className="close-sidebar-btn" onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
             <Menu size={20} />
          </button>
        </div>

        <div className="sidebar-mini-profile" style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-action-bg)', color: 'var(--primary-action)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', overflow: 'hidden' }}>
              {user?.profile?.profileImage ? (
                <img src={user.profile.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                getInitials(user?.username)
              )}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>{user?.username || 'User'}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{role === 'Client' ? 'Customer' : role}</span>
            </div>
          </div>
          <button onClick={toggleTheme} style={{ background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0 24px 16px' }} />

        <nav className="sidebar-nav">
          <ul style={{ padding: '0 16px' }}>
            {navLinks.map((link, index) => {
              const isActive = link.exact 
                ? location.pathname === link.path.split('?')[0] && location.search === ''
                : location.search === ('?' + link.path.split('?')[1]);

              return (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span>{link.name}</span>
                    <div className="nav-icon-box">{link.icon}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="logout-btn" onClick={handleLogout}>
            <span>Logout</span>
            <div className="nav-icon-box">
              <LogOut size={20} />
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {children}
      </main>
    </div>
  );
};
