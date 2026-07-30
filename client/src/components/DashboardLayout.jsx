import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  Sun
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
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', margin: 0 }}><span className="freelancer-text">Freelancer</span> <span className="hub-text">Hub</span></h2>
          </div>
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
             <X size={24} />
          </button>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar" style={{ overflow: 'hidden' }}>
            {user?.profile?.profileImage ? (
              <img src={user.profile.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              getInitials(user?.username)
            )}
          </div>
          <div className="profile-info">
            <h3>{user?.username || 'User'}</h3>
            <span className={`role-badge ${role.toLowerCase()}`}>
              {role === 'Client' ? 'Customer' : role}
            </span>
            <span className="profile-email">{user?.email}</span>
          </div>
          

        </div>

        <nav className="sidebar-nav">
          <ul>
            {navLinks.map((link, index) => {
              const isActive = link.exact 
                ? location.pathname === link.path.split('?')[0] && location.search === ''
                : location.search === ('?' + link.path.split('?')[1]);

              return (
                <li key={index}>
                  <NavLink 
                    to={link.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="logout-btn" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s ease', width: '100%' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
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
