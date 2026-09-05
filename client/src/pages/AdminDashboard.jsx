import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Users, Briefcase, FileText, AlertTriangle, CheckCircle, XCircle, Search, DollarSign, MessageSquare, Eye, X, Activity, Pencil, LogOut, Home, Calendar, Target, Star, Clock, AlignLeft, User } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'; 

export const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab') || 'overview';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [metrics, setMetrics] = useState({ 
    totalUsers: 0, totalJobs: 0, totalProjects: 0, activeDisputes: 0,
    financialVolume: 0, unreadMessages: 0, userBreakdown: [], projectStatusBreakdown: [], recentUsers: [] 
  });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [editingProposal, setEditingProposal] = useState(null);

  useEffect(() => {
    fetchData();
    setSearchTerm(''); // Clear search on tab change
  }, [currentTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (currentTab === 'overview') {
        const res = await apiClient.get('/admin/metrics');
        setMetrics(res.data);
      } else if (currentTab === 'customers' || currentTab === 'freelancers') {
        const res = await apiClient.get('/admin/users');
        setUsers(res.data);
      } else if (currentTab === 'jobs') {
        const res = await apiClient.get('/admin/jobs');
        setJobs(res.data);
      } else if (currentTab === 'proposals') {
        const res = await apiClient.get('/admin/proposals');
        setProposals(res.data);
      } else if (currentTab === 'disputes') {
        const res = await apiClient.get('/admin/disputes');
        setDisputes(res.data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    setActionLoading(true);
    try {
      await apiClient.put(`/admin/users/${userId}/status`);
      fetchData(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating user status');
    } finally {
      setActionLoading(false);
    }
  };

  const resolveDispute = async (projectId, status) => {
    if (!window.confirm(`Are you sure you want to resolve this dispute as ${status}?`)) return;
    
    setActionLoading(true);
    try {
      await apiClient.put(`/admin/projects/${projectId}/resolve-dispute`, { status, resolutionNotes: `Resolved as ${status} by Admin` });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error resolving dispute');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
      await apiClient.delete(`/admin/jobs/${jobId}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting job');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProposal = async (proposalId) => {
    if (!window.confirm('Are you sure you want to delete this proposal? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
      await apiClient.delete(`/admin/proposals/${proposalId}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting proposal');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await apiClient.put(`/admin/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    setActionLoading(true);
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await apiClient.put(`/admin/jobs/${editingJob._id}`, editingJob);
      setEditingJob(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProposal = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await apiClient.put(`/admin/proposals/${editingProposal._id}`, editingProposal);
      setEditingProposal(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating proposal');
    } finally {
      setActionLoading(false);
    }
  };

  const KpiCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: `0 12px 24px ${color}33` }}
      style={{ 
        padding: '24px', 
        background: 'var(--bg-card)', 
        borderRadius: '16px', 
        border: '1px solid var(--border-color)',
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: color }} />
      <div style={{ padding: '16px', background: `${color}15`, color: color, borderRadius: '12px' }}>
        <Icon size={28} />
      </div>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: '500' }}>{label}</p>
        <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>{value}</h3>
      </div>
    </motion.div>
  );

  const renderOverview = () => (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="dashboard-section"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <KpiCard icon={Users} label="Total Users" value={metrics.totalUsers} color="#4361ee" delay={0.1} />
        <KpiCard icon={DollarSign} label="Total Revenue" value={`$${metrics.financialVolume?.toLocaleString()}`} color="#10b981" delay={0.2} />
        <KpiCard icon={Briefcase} label="Total Projects" value={metrics.totalProjects} color="#7209b7" delay={0.3} />
        <KpiCard icon={MessageSquare} label="Unread Tickets" value={metrics.unreadMessages} color="#e63946" delay={0.4} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--primary-action)"/> Project Status Distribution
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={metrics.projectStatusBreakdown} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value">
                  {metrics.projectStatusBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '16px' }}>
            {metrics.projectStatusBreakdown?.map((entry, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: entry.color, boxShadow: `0 0 10px ${entry.color}80` }}></span>
                {entry.name} <span style={{ color: 'var(--text-muted)' }}>({entry.value})</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#4361ee" /> User Registration Breakdown
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.userBreakdown} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="var(--primary-action)" radius={[6, 6, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Recent Signups</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Username</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Role</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentUsers?.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row-hover">
                  <td style={{ padding: '16px', fontWeight: '600' }}>{user.username}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      background: user.role === 'Freelancer' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(67, 97, 238, 0.15)',
                      color: user.role === 'Freelancer' ? '#059669' : '#4361ee'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
              {(!metrics.recentUsers || metrics.recentUsers.length === 0) && (
                <tr>
                  <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No recent signups.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderUsers = (roleFilter) => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredUsers = users.filter(u => 
      u.role === roleFilter && 
      ((u.username || '').toLowerCase().includes(safeSearchTerm) || 
       (u.email || '').toLowerCase().includes(safeSearchTerm))
    );
    
    return (
      <motion.div 
        key={`users-${roleFilter}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="dashboard-section"
      >
        <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>{roleFilter === 'Client' ? 'Customer Management' : 'Freelancer Management'}</h2>
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder={`Search ${roleFilter === 'Client' ? 'customers' : 'freelancers'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }} 
                className="input-focus-ring"
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Username</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row-hover">
                    <td style={{ padding: '16px', fontWeight: '500' }}>{u.username}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px',
                        fontWeight: '600',
                        background: u.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: u.isActive ? '#059669' : '#ef4444'
                      }}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => toggleUserStatus(u._id)}
                          disabled={actionLoading || u._id === user._id}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: u._id === user._id ? 'not-allowed' : 'pointer',
                            background: u.isActive ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            color: u.isActive ? '#ef4444' : '#059669',
                            fontWeight: '600',
                            opacity: actionLoading ? 0.5 : 1,
                            transition: 'all 0.2s'
                          }}
                          className="btn-hover-effect"
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => setEditingUser(u)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '500', transition: 'all 0.2s' }}
                          className="btn-hover-effect"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={actionLoading || u._id === user._id}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: u._id === user._id ? 'not-allowed' : 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: '500', opacity: actionLoading ? 0.5 : 1, transition: 'all 0.2s' }}
                          className="btn-hover-effect"
                        >
                          <XCircle size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderJobs = () => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredJobs = jobs.filter(j => 
      (j.title || '').toLowerCase().includes(safeSearchTerm) || 
      (j.clientId?.username || '').toLowerCase().includes(safeSearchTerm)
    );

    return (
      <motion.div 
        key="jobs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="dashboard-section"
      >
        <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Job Management</h2>
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search jobs by title or customer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }} 
                className="input-focus-ring"
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Title</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Customer</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Budget</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job._id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row-hover">
                    <td style={{ padding: '16px', fontWeight: '600' }}>{job.title}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{job.clientId?.username}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px',
                        fontWeight: '600',
                        background: job.status === 'Open' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(156, 163, 175, 0.15)',
                        color: job.status === 'Open' ? '#059669' : 'var(--text-secondary)'
                      }}>
                        {job.status}
                      </span>
                    </td>
                  <td style={{ padding: '16px', fontWeight: '600' }}>${job.budget}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setSelectedJob(job)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '500', transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button 
                        onClick={() => setEditingJob(job)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '500', transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => deleteJob(job._id)}
                        disabled={actionLoading}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: '500', opacity: actionLoading ? 0.5 : 1, transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <XCircle size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No jobs found.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      </motion.div>
    );
  };

  const renderProposals = () => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredProposals = proposals.filter(p => 
      (p.freelancerId?.username || '').toLowerCase().includes(safeSearchTerm) || 
      (p.jobId?.title || '').toLowerCase().includes(safeSearchTerm)
    );

    return (
      <motion.div 
        key="proposals"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="dashboard-section"
      >
        <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Proposal Management</h2>
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search proposals..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }} 
                className="input-focus-ring"
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Freelancer</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Job Title</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Proposed Cost</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map(prop => (
                  <tr key={prop._id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row-hover">
                    <td style={{ padding: '16px', fontWeight: '600' }}>{prop.freelancerId?.username}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{prop.jobId?.title || 'Deleted Job'}</td>
                    <td style={{ padding: '16px', fontWeight: '600' }}>${prop.proposedCost}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px',
                        fontWeight: '600',
                        background: 'rgba(156, 163, 175, 0.15)',
                        color: 'var(--text-secondary)'
                      }}>
                        {prop.status}
                      </span>
                    </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setSelectedProposal(prop)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '500', transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button 
                        onClick={() => setEditingProposal(prop)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '500', transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => deleteProposal(prop._id)}
                        disabled={actionLoading}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: '500', opacity: actionLoading ? 0.5 : 1, transition: 'all 0.2s' }}
                        className="btn-hover-effect"
                      >
                        <XCircle size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
                {filteredProposals.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No proposals found.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      </motion.div>
    );
  };

  const renderDisputes = () => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredDisputes = disputes.filter(d => 
      (d.jobId?.title || '').toLowerCase().includes(safeSearchTerm) ||
      (d.clientId?.username || '').toLowerCase().includes(safeSearchTerm) ||
      (d.freelancerId?.username || '').toLowerCase().includes(safeSearchTerm)
    );

    return (
      <motion.div 
        key="disputes"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="dashboard-section"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dispute Management</h2>
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search disputes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }} 
              className="input-focus-ring"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {filteredDisputes.length === 0 ? (
            <div style={{ padding: '60px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <CheckCircle size={48} color="var(--primary-action)" style={{ opacity: 0.5, marginBottom: '16px', margin: '0 auto' }} />
              <p style={{ fontSize: '18px', fontWeight: '500' }}>No active disputes found.</p>
              <p>Everything is running smoothly.</p>
            </div>
          ) : (
            filteredDisputes.map((project, idx) => (
              <motion.div 
                key={project._id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{project.jobId?.title || 'Unknown Job'}</h3>
                <span style={{ padding: '6px 16px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={14} /> Disputed
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Client</p>
                  <p style={{ fontWeight: '600', fontSize: '16px' }}>{project.clientId?.username}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{project.clientId?.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Freelancer</p>
                  <p style={{ fontWeight: '600', fontSize: '16px' }}>{project.freelancerId?.username}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{project.freelancerId?.email}</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>Dispute Reason</p>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid #ef4444', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  {project.dispute?.reason || 'No reason provided.'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <button 
                  onClick={() => resolveDispute(project._id, 'Active')}
                  disabled={actionLoading}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                  className="btn-hover-effect"
                >
                  <CheckCircle size={18} /> Restore to Active
                </button>
                <button 
                  onClick={() => resolveDispute(project._id, 'Cancelled')}
                  disabled={actionLoading}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                  className="btn-hover-effect"
                >
                  <XCircle size={18} /> Cancel Project
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
      </motion.div>
    );
  };

  if (loading && !metrics.totalUsers && users.length === 0 && disputes.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div className="loader" style={{ border: '4px solid var(--border-color)', borderTop: '4px solid var(--primary-action)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'customers', label: 'Customers' },
    { id: 'freelancers', label: 'Freelancers' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'proposals', label: 'Proposals' },
    { id: 'disputes', label: 'Disputes' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '60px' }}>
      
      {/* Premium Admin Header */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 50, padding: '24px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>Admin Command Center</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Manage operations, users, and platform metrics with precision.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => navigate('/')} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '600' }}
                className="btn-hover-effect"
              >
                <Home size={18} /> Home
              </button>
              <button 
                onClick={handleLogout} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', cursor: 'pointer', fontWeight: '600' }}
                className="btn-hover-effect"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* Floating Pill Navigation */}
          <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '100px', width: 'max-content', overflowX: 'auto' }}>
            {tabs.map(tab => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(`/admin-dashboard?tab=${tab.id}`)}
                  style={{
                    position: 'relative',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    zIndex: 1
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      style={{ position: 'absolute', inset: 0, background: 'var(--primary-action)', borderRadius: '100px', zIndex: -1, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px' }}>
        <AnimatePresence mode="wait">
          {currentTab === 'overview' && renderOverview()}
          {currentTab === 'customers' && renderUsers('Client')}
          {currentTab === 'freelancers' && renderUsers('Freelancer')}
          {currentTab === 'jobs' && renderJobs()}
          {currentTab === 'proposals' && renderProposals()}
          {currentTab === 'disputes' && renderDisputes()}
        </AnimatePresence>

        {/* Job Details Modal - Premium UI */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-color)' }}
              >
                <button 
                  onClick={() => setSelectedJob(null)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', zIndex: 10 }}
                  className="btn-hover-effect"
                >
                  <X size={20} />
                </button>
                
                {/* Premium Card Header */}
                <div style={{ position: 'relative', padding: '40px 40px 32px', margin: '-40px -40px 32px -40px', background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(114, 9, 183, 0.05) 100%)', borderBottom: '1px solid var(--border-color)', borderRadius: '24px 24px 0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', borderRadius: '20px', fontSize: '13px', fontWeight: '700', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      {selectedJob.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                      <User size={16} /> {selectedJob.clientId?.username}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-primary)', paddingRight: '40px' }}>
                    {selectedJob.title}
                  </h2>
                </div>
                
                <div style={{ display: 'grid', gap: '32px' }}>
                  
                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><DollarSign size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Budget</span></div>
                      <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>${selectedJob.budget}</p>
                    </div>
                    
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Target size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Category</span></div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedJob.category}</p>
                    </div>
                    
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Star size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Experience</span></div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedJob.experienceRequired}</p>
                    </div>

                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Calendar size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Deadline</span></div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{new Date(selectedJob.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                      <AlignLeft size={20} color="var(--primary-action)" /> Project Description
                    </h3>
                    <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-secondary)', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                      {selectedJob.description}
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Required Skills</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {selectedJob.requiredSkills?.map((skill, idx) => (
                        <span key={idx} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: '1px solid var(--border-color)' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proposal Details Modal - Premium UI */}
        <AnimatePresence>
          {selectedProposal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-color)' }}
              >
                <button 
                  onClick={() => setSelectedProposal(null)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', zIndex: 10 }}
                  className="btn-hover-effect"
                >
                  <X size={20} />
                </button>
                
                {/* Premium Card Header */}
                <div style={{ position: 'relative', padding: '40px 40px 32px', margin: '-40px -40px 32px -40px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(67, 97, 238, 0.05) 100%)', borderBottom: '1px solid var(--border-color)', borderRadius: '24px 24px 0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ padding: '6px 14px', background: 'rgba(67, 97, 238, 0.15)', color: '#4361ee', borderRadius: '20px', fontSize: '13px', fontWeight: '700', border: '1px solid rgba(67, 97, 238, 0.2)' }}>
                      {selectedProposal.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                      <User size={16} /> {selectedProposal.freelancerId?.username}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: '1.3', color: 'var(--text-primary)', paddingRight: '40px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Briefcase size={28} style={{ color: 'var(--primary-action)', flexShrink: 0, marginTop: '2px' }} />
                    {selectedProposal.jobId?.title || 'Deleted Job'}
                  </h2>
                </div>
                
                <div style={{ display: 'grid', gap: '32px' }}>
                  
                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><DollarSign size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Proposed Cost</span></div>
                      <p style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>${selectedProposal.proposedCost}</p>
                    </div>
                    
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Star size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Experience</span></div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedProposal.experience}</p>
                    </div>
                    
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Calendar size={16} /> <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Delivery By</span></div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{new Date(selectedProposal.proposedDeadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                      <AlignLeft size={20} color="var(--primary-action)" /> Cover Letter
                    </h3>
                    <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                      {selectedProposal.coverLetter || 'No cover letter provided.'}
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Freelancer Skills</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {selectedProposal.skills?.map((skill, idx) => (
                        <span key={idx} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: '1px solid var(--border-color)' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit User Modal */}
        <AnimatePresence>
          {editingUser && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-color)' }}
              >
                <button 
                  onClick={() => setEditingUser(null)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  className="btn-hover-effect"
                >
                  <X size={20} />
                </button>
                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>Edit User</h2>
                <form onSubmit={handleUpdateUser} style={{ display: 'grid', gap: '20px' }}>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={editingUser.username || ''} onChange={e => setEditingUser({...editingUser, username: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={editingUser.email || ''} onChange={e => setEditingUser({...editingUser, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select value={editingUser.role || ''} onChange={e => setEditingUser({...editingUser, role: e.target.value})} required>
                      <option value="Client">Client</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                    {actionLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Job Modal */}
        <AnimatePresence>
          {editingJob && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-color)' }}
              >
                <button 
                  onClick={() => setEditingJob(null)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  className="btn-hover-effect"
                >
                  <X size={20} />
                </button>
                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>Edit Job</h2>
                <form onSubmit={handleUpdateJob} style={{ display: 'grid', gap: '20px' }}>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={editingJob.title || ''} onChange={e => setEditingJob({...editingJob, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea value={editingJob.description || ''} onChange={e => setEditingJob({...editingJob, description: e.target.value})} rows={4} required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label>Budget ($)</label>
                      <input type="number" value={editingJob.budget || ''} onChange={e => setEditingJob({...editingJob, budget: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input type="text" value={editingJob.category || ''} onChange={e => setEditingJob({...editingJob, category: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Experience Required</label>
                      <select value={editingJob.experienceRequired || ''} onChange={e => setEditingJob({...editingJob, experienceRequired: e.target.value})} required>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select value={editingJob.status || ''} onChange={e => setEditingJob({...editingJob, status: e.target.value})} required>
                        <option value="Open">Open</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                    {actionLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Proposal Modal */}
        <AnimatePresence>
          {editingProposal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-color)' }}
              >
                <button 
                  onClick={() => setEditingProposal(null)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  className="btn-hover-effect"
                >
                  <X size={20} />
                </button>
                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>Edit Proposal</h2>
                <form onSubmit={handleUpdateProposal} style={{ display: 'grid', gap: '20px' }}>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea value={editingProposal.coverLetter || ''} onChange={e => setEditingProposal({...editingProposal, coverLetter: e.target.value})} rows={5} required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label>Proposed Cost ($)</label>
                      <input type="number" value={editingProposal.proposedCost || ''} onChange={e => setEditingProposal({...editingProposal, proposedCost: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Experience Level</label>
                      <select value={editingProposal.experience || ''} onChange={e => setEditingProposal({...editingProposal, experience: e.target.value})} required>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select value={editingProposal.status || ''} onChange={e => setEditingProposal({...editingProposal, status: e.target.value})} required>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                    {actionLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
