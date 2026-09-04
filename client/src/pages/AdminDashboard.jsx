import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Users, Briefcase, FileText, AlertTriangle, CheckCircle, XCircle, Search, DollarSign, MessageSquare, Eye, X } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../App.css'; // For basic styling, assumes it exists

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab') || 'overview';

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
      fetchData(); // Refresh users list
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
      fetchData(); // Refresh disputes list
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

  const renderOverview = () => (
    <div className="dashboard-section">
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Platform Overview</h2>
      
      {/* Top KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(67, 97, 238, 0.1)', color: 'var(--primary-action)', borderRadius: '12px' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Total Users</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.totalUsers}</h3>
          </div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(56, 176, 0, 0.1)', color: '#38b000', borderRadius: '12px' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Total Revenue</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>${metrics.financialVolume?.toLocaleString()}</h3>
          </div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(114, 9, 183, 0.1)', color: '#7209b7', borderRadius: '12px' }}>
            <FileText size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Total Projects</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.totalProjects}</h3>
          </div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', borderRadius: '12px' }}>
            <MessageSquare size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Unread Tickets</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.unreadMessages}</h3>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Project Status Pie Chart */}
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Project Status Distribution</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.projectStatusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {metrics.projectStatusBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {metrics.projectStatusBreakdown?.map((entry, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: entry.color }}></span>
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>

        {/* User Breakdown Bar Chart */}
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>User Registration Breakdown</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.userBreakdown} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip cursor={{ fill: 'var(--bg-primary)' }} contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
                <Bar dataKey="value" fill="var(--primary-action)" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Recent Signups</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Username</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Role</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentUsers?.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{user.username}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      background: user.role === 'Freelancer' ? 'rgba(56, 176, 0, 0.1)' : 'rgba(67, 97, 238, 0.1)',
                      color: user.role === 'Freelancer' ? '#38b000' : 'var(--primary-action)'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!metrics.recentUsers || metrics.recentUsers.length === 0) && (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No recent signups.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );

  const renderUsers = (roleFilter) => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredUsers = users.filter(u => 
      u.role === roleFilter && 
      ((u.username || '').toLowerCase().includes(safeSearchTerm) || 
       (u.email || '').toLowerCase().includes(safeSearchTerm))
    );
    
    return (
      <div className="dashboard-section">
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>{roleFilter === 'Client' ? 'Customer Management' : 'Freelancer Management'}</h2>
        
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder={`Search ${roleFilter === 'Client' ? 'customers' : 'freelancers'} by name or email...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }} 
          />
        </div>

        <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Username</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{u.username}</td>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      background: u.isActive ? 'rgba(56, 176, 0, 0.1)' : 'rgba(230, 57, 70, 0.1)',
                      color: u.isActive ? '#38b000' : '#e63946'
                    }}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => toggleUserStatus(u._id)}
                      disabled={actionLoading || u._id === user._id}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: u._id === user._id ? 'not-allowed' : 'pointer',
                        background: u.isActive ? 'rgba(230, 57, 70, 0.1)' : 'rgba(56, 176, 0, 0.1)',
                        color: u.isActive ? '#e63946' : '#38b000',
                        opacity: actionLoading ? 0.5 : 1
                      }}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderJobs = () => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredJobs = jobs.filter(j => 
      (j.title || '').toLowerCase().includes(safeSearchTerm) || 
      (j.clientId?.username || '').toLowerCase().includes(safeSearchTerm)
    );

    return (
      <div className="dashboard-section">
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Job Management</h2>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search jobs by title or customer name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }} 
          />
        </div>

        <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Title</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Customer</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Budget</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{job.title}</td>
                  <td style={{ padding: '12px' }}>{job.clientId?.username}</td>
                  <td style={{ padding: '12px' }}>{job.status}</td>
                <td style={{ padding: '12px' }}>${job.budget}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setSelectedJob(job)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    >
                      View
                    </button>
                    <button 
                      onClick={() => deleteJob(job._id)}
                      disabled={actionLoading}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', opacity: actionLoading ? 0.5 : 1 }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No jobs found.</td></tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  const renderProposals = () => {
    const safeSearchTerm = (searchTerm || '').toLowerCase();
    const filteredProposals = proposals.filter(p => 
      (p.freelancerId?.username || '').toLowerCase().includes(safeSearchTerm) || 
      (p.jobId?.title || '').toLowerCase().includes(safeSearchTerm)
    );

    return (
      <div className="dashboard-section">
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Proposal Management</h2>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search proposals by freelancer name or job title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }} 
          />
        </div>

        <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Freelancer</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Job Title</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Proposed Cost</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map(prop => (
                <tr key={prop._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{prop.freelancerId?.username}</td>
                  <td style={{ padding: '12px' }}>{prop.jobId?.title || 'Deleted Job'}</td>
                  <td style={{ padding: '12px' }}>${prop.proposedCost}</td>
                  <td style={{ padding: '12px' }}>{prop.status}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setSelectedProposal(prop)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    >
                      View
                    </button>
                    <button 
                      onClick={() => deleteProposal(prop._id)}
                      disabled={actionLoading}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', opacity: actionLoading ? 0.5 : 1 }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              ))}
              {filteredProposals.length === 0 && (
                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No proposals found.</td></tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
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
      <div className="dashboard-section">
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Dispute Management</h2>
        
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search disputes by job title, client, or freelancer name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }} 
          />
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredDisputes.length === 0 ? (
            <div style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No disputes found.
            </div>
          ) : (
            filteredDisputes.map(project => (
              <div key={project._id} style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Project: {project.jobId?.title || 'Unknown Job'}</h3>
                <span style={{ padding: '6px 12px', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                  Disputed
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Client</p>
                  <p style={{ fontWeight: '500' }}>{project.clientId?.username} ({project.clientId?.email})</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Freelancer</p>
                  <p style={{ fontWeight: '500' }}>{project.freelancerId?.username} ({project.freelancerId?.email})</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Dispute Reason:</p>
                <p style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid #e63946' }}>
                  {project.dispute?.reason || 'No reason provided.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  onClick={() => resolveDispute(project._id, 'Active')}
                  disabled={actionLoading}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--primary-action-bg)', color: 'var(--primary-action)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                >
                  <CheckCircle size={18} /> Restore to Active
                </button>
                <button 
                  onClick={() => resolveDispute(project._id, 'Cancelled')}
                  disabled={actionLoading}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                >
                  <XCircle size={18} /> Cancel Project
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

  if (loading && !metrics.totalUsers && users.length === 0 && disputes.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading admin data...</div>;
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage platform users, metrics, and disputes.</p>
      </div>

      {currentTab === 'overview' && renderOverview()}
      {currentTab === 'customers' && renderUsers('Client')}
      {currentTab === 'freelancers' && renderUsers('Freelancer')}
      {currentTab === 'jobs' && renderJobs()}
      {currentTab === 'proposals' && renderProposals()}
      {currentTab === 'disputes' && renderDisputes()}

      {/* Job Details Modal */}
      {selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setSelectedJob(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Job Details</h2>
            <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Title</p>
                <p style={{ fontSize: '18px', fontWeight: '500' }}>{selectedJob.title}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Customer</p>
                <p>{selectedJob.clientId?.username} ({selectedJob.clientId?.email})</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Description</p>
                <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                  {selectedJob.description}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Budget</p>
                  <p>${selectedJob.budget}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Status</p>
                  <p>{selectedJob.status}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Category</p>
                  <p>{selectedJob.category}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Experience Required</p>
                  <p>{selectedJob.experienceRequired}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Deadline</p>
                  <p>{new Date(selectedJob.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Required Skills</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {selectedJob.requiredSkills?.map((skill, idx) => (
                    <span key={idx} style={{ padding: '4px 10px', background: 'var(--bg-primary)', borderRadius: '20px', fontSize: '12px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setSelectedProposal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Proposal Details</h2>
            <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Freelancer</p>
                <p style={{ fontSize: '18px', fontWeight: '500' }}>{selectedProposal.freelancerId?.username} ({selectedProposal.freelancerId?.email})</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Job Title</p>
                <p>{selectedProposal.jobId?.title || 'Deleted Job'}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Cover Letter</p>
                <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {selectedProposal.coverLetter || 'No cover letter provided.'}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Proposed Cost</p>
                  <p>${selectedProposal.proposedCost}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Status</p>
                  <p>{selectedProposal.status}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Experience</p>
                  <p>{selectedProposal.experience}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Proposed Deadline</p>
                  <p>{new Date(selectedProposal.proposedDeadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Freelancer Skills</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {selectedProposal.skills?.map((skill, idx) => (
                    <span key={idx} style={{ padding: '4px 10px', background: 'var(--bg-primary)', borderRadius: '20px', fontSize: '12px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
