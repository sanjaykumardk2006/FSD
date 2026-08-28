import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Users, Briefcase, FileText, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import '../App.css'; // For basic styling, assumes it exists

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab') || 'overview';

  const [metrics, setMetrics] = useState({ totalUsers: 0, totalJobs: 0, totalProjects: 0, activeDisputes: 0 });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
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
            <Briefcase size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Total Jobs</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.totalJobs}</h3>
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
            <AlertTriangle size={28} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Active Disputes</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.activeDisputes}</h3>
          </div>
        </div>

      </div>
    </div>
  );

  const renderUsers = (roleFilter) => {
    const filteredUsers = users.filter(u => 
      u.role === roleFilter && 
      (u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
       u.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
    const filteredJobs = jobs.filter(j => 
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (j.clientId?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                  <button 
                    onClick={() => deleteJob(job._id)}
                    disabled={actionLoading}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', opacity: actionLoading ? 0.5 : 1 }}
                  >
                    Delete
                  </button>
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

  const renderProposals = () => {
    const filteredProposals = proposals.filter(p => 
      (p.freelancerId?.username || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (p.jobId?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                  <button 
                    onClick={() => deleteProposal(prop._id)}
                    disabled={actionLoading}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgba(230, 57, 70, 0.1)', color: '#e63946', opacity: actionLoading ? 0.5 : 1 }}
                  >
                    Delete
                  </button>
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

  const renderDisputes = () => {
    const filteredDisputes = disputes.filter(d => 
      (d.jobId?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.clientId?.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.freelancerId?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
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
            </div>
          ))
        )}
      </div>
    </div>
  );

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
    </div>
  );
};
