import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, DollarSign, Calendar, FileText, CheckCircle, Briefcase, Filter, X, Bell, MessageSquare, User, AlignLeft, CheckSquare, Link as LinkIcon, Target, Tag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { JobDetails } from '../components/JobDetails';
import { ProfileSection } from '../components/ProfileSection';

export const FreelancerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'jobs';

  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    budget: '',
    duration: '',
    experience: '',
    category: ''
  });
  
  // Proposal Form State
  const [selectedJob, setSelectedJob] = useState(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const availableSkills = ["React", "Node.js", "Python", "Figma", "AWS", "SEO", "Copywriting", "UI Design", "TypeScript", "Docker", "GraphQL", "TailwindCSS", "Next.js", "MongoDB"];
  const [proposalData, setProposalData] = useState({
    fullName: user?.username || '',
    experience: '',
    coverLetter: '',
    completedProjects: '',
    proposedCost: '',
    proposedDeadline: '',
    resumeUpload: null,
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    projectLinks: '',
    skills: []
  });
  const [notification, setNotification] = useState({ type: '', text: '' });
  const [showJobDetails, setShowJobDetails] = useState(false);

  const showNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: '', text: '' }), 4000);
  };

  useEffect(() => {
    fetchJobs();
    fetchProposals();
    fetchProjects();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get('/notifications');
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await apiClient.get('/jobs/all');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await apiClient.get('/proposals/my-proposals');
      setProposals(response.data.proposals || []);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get('/projects/freelancer/projects');
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setProposalData({ ...proposalData, [name]: value });
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    try {
      // Send backend supported fields only, ignore mock UI fields for actual API call
      await apiClient.post('/proposals/submit', {
        jobId: selectedJob._id,
        skills: proposalData.skills.length ? proposalData.skills : ['Not specified'],
        experience: proposalData.experience || 'Not specified',
        proposedCost: proposalData.proposedCost,
        proposedDeadline: proposalData.proposedDeadline,
        coverLetter: proposalData.coverLetter
      });
      showNotification('success', 'Proposal submitted successfully!');
      setShowProposalForm(false);
      setSelectedJob(null);
      // Reset form
      setProposalData({
        fullName: user?.username || '',
        experience: '',
        coverLetter: '',
        completedProjects: '',
        proposedCost: '',
        proposedDeadline: '',
        resumeUpload: null,
        portfolioUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        projectLinks: '',
        skills: []
      });
      fetchProposals();
      fetchJobs();
    } catch (error) {
      showNotification('error', 'Error submitting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteProposal = async (proposalId) => {
    if (!window.confirm('Are you sure you want to delete this proposal?')) return;
    try {
      await apiClient.delete(`/proposals/${proposalId}`);
      showNotification('success', 'Proposal deleted successfully!');
      fetchProposals();
    } catch (error) {
      showNotification('error', 'Error deleting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleMarkNotificationRead = async (notificationId) => {
    try {
      await apiClient.put(`/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, isRead: true } : n));
      // Dispatch custom event to update header bell count
      window.dispatchEvent(new Event('notification-read'));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredJobs = jobs.filter(job => {
    // Search Query filter
    const title = job.title || '';
    const desc = job.description || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Budget filter
    let matchesBudget = true;
    if (filters.budget === 'under100') matchesBudget = job.budget < 100;
    if (filters.budget === '100to500') matchesBudget = job.budget >= 100 && job.budget <= 500;
    if (filters.budget === 'over500') matchesBudget = job.budget > 500;

    // Duration filter
    let matchesDuration = true;
    if (filters.duration) {
      const deadlineDate = new Date(job.deadline);
      const createdAtDate = new Date(job.createdAt);
      const durationDays = (deadlineDate - createdAtDate) / (1000 * 60 * 60 * 24);
      
      if (filters.duration === 'lessThanWeek') matchesDuration = durationDays < 7;
      if (filters.duration === 'lessThanMonth') matchesDuration = durationDays >= 7 && durationDays <= 30;
      if (filters.duration === 'moreThanMonth') matchesDuration = durationDays > 30;
    }

    // Experience filter
    let matchesExperience = true;
    if (filters.experience) {
      if (job.experienceRequired) {
        matchesExperience = job.experienceRequired === filters.experience;
      } else {
        // Fallback for old jobs without experienceRequired
        matchesExperience = true;
      }
    }

    // Category filter
    let matchesCategory = true;
    if (filters.category) {
      if (job.category) {
        matchesCategory = job.category === filters.category;
      } else {
        // Fallback for old jobs without category
        matchesCategory = true;
      }
    }

    return matchesSearch && matchesBudget && matchesDuration && matchesExperience && matchesCategory;
  });

  const renderJobs = () => (
    <div className="jobs-section">
      <div className="dashboard-top-actions" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Available Jobs</h2>
        
        {/* Search Bar & Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'stretch' }}>
          <div className="search-bar" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by Project Name, Skills, Category, Keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '14px 16px 14px 48px', border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', fontSize: '15px' }}
            />
            <button className="btn btn-primary" style={{ margin: '4px 6px', padding: '8px 24px', borderRadius: 'var(--radius-md)' }}>Search</button>
          </div>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: showFilters ? 'var(--bg-secondary)' : 'var(--bg-card)', padding: '0 20px', height: 'auto', borderRadius: 'var(--radius-lg)' }}
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginTop: '16px' }}
            >
              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="form-group floating-label" style={{ marginBottom: 0 }}>
                  <DollarSign size={18} className="input-icon" />
                  <select 
                    value={filters.budget} 
                    onChange={(e) => setFilters({...filters, budget: e.target.value})}
                  >
                    <option value="">Any Budget</option>
                    <option value="under100">Under $100</option>
                    <option value="100to500">$100 - $500</option>
                    <option value="over500">Over $500</option>
                  </select>
                  <label>Budget</label>
                </div>
                <div className="form-group floating-label" style={{ marginBottom: 0 }}>
                  <Calendar size={18} className="input-icon" />
                  <select 
                    value={filters.duration}
                    onChange={(e) => setFilters({...filters, duration: e.target.value})}
                  >
                    <option value="">Any Duration</option>
                    <option value="lessThanWeek">Less than 1 week</option>
                    <option value="lessThanMonth">Less than 1 month</option>
                    <option value="moreThanMonth">More than 1 month</option>
                  </select>
                  <label>Duration</label>
                </div>
                <div className="form-group floating-label" style={{ marginBottom: 0 }}>
                  <Target size={18} className="input-icon" />
                  <select 
                    value={filters.experience}
                    onChange={(e) => setFilters({...filters, experience: e.target.value})}
                  >
                    <option value="">Any Experience Level</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 yr to 2 yr">1 yr to 2 yr</option>
                    <option value="2 to 4 yr">2 to 4 yr</option>
                    <option value="Above 5 yr">Above 5 yr</option>
                  </select>
                  <label>Experience</label>
                </div>
                <div className="form-group floating-label" style={{ marginBottom: 0 }}>
                  <Tag size={18} className="input-icon" />
                  <select 
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Sales">Sales</option>
                    <option value="Virtual Assistant">Virtual Assistant</option>
                  </select>
                  <label>Category</label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="jobs-list"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        {filteredJobs.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>No jobs found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredJobs.map((job) => (
              <motion.div key={job._id} className="modern-job-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; transform = 'translateY(-2px)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; transform = 'translateY(0)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{job.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', minWidth: '100px' }}>
                    <span className="status-badge" style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: 'var(--success-bg)', color: 'var(--success)' }}>
                      Available
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}><DollarSign size={16} /> Budget: ${job.budget}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}><Clock size={16} /> Duration: By {new Date(job.deadline).toLocaleDateString()}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(job.requiredSkills || []).map((skill, i) => (
                      <span key={i} style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>{skill}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => { setSelectedJob(job); setShowJobDetails(true); }}>View Details</button>
                    <button className="btn btn-primary" onClick={() => { setSelectedJob(job); setShowProposalForm(true); }}>Apply Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderProposals = () => (
    <div className="proposals-section">
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>My Proposals</h2>
      {proposals.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No proposals submitted</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Find a job and submit your first proposal.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {proposals.map((proposal) => (
            <motion.div key={proposal._id} className="card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: proposal.status === 'Accepted' ? 'var(--success)' : proposal.status === 'Rejected' ? 'var(--danger)' : 'var(--pending)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="status-badge" style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: proposal.status === 'Accepted' ? 'var(--success-bg)' : proposal.status === 'Rejected' ? 'var(--danger-bg)' : 'var(--pending-bg)', color: proposal.status === 'Accepted' ? 'var(--success)' : proposal.status === 'Rejected' ? 'var(--danger)' : 'var(--pending)' }}>
                  {proposal.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(proposal.createdAt).toLocaleDateString()}</span>
              </div>
              
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Project: {proposal.jobId?.title}</h3>
              <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary-action)' }}>${proposal.proposedCost}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Details</button>
                <button className="btn btn-secondary" onClick={() => handleDeleteProposal(proposal._id)} style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={proposal.status === 'Accepted'}>Withdraw</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProjects = (isCompleted = false) => {
    const filteredProjects = projects.filter(p => isCompleted ? p.status === 'Completed' : p.status !== 'Completed');
    
    return (
      <div className="projects-section">
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>{isCompleted ? 'Completed Projects' : 'Active Projects'}</h2>
        {filteredProjects.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            {isCompleted ? <CheckCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} /> : <Briefcase size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />}
            <h3>No {isCompleted ? 'completed' : 'active'} projects</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isCompleted ? 'You have no completed projects yet.' : "You don't have any ongoing projects right now."}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredProjects.map((project) => (
              <motion.div key={project._id} className="card" variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} initial="hidden" animate="visible">
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{project.jobId?.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Client: <strong>{project.clientId?.username}</strong></p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ color: 'var(--primary-action)', fontWeight: '600' }}>{project.status}</span>
                </div>
                
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/project/${project._id}`)}>
                  {isCompleted ? 'View Details' : 'Open Chat / Workspace'}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMessages = () => (
    <div className="messages-section">
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Inbox</h2>
      {projects.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <MessageSquare size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No messages yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Get hired to start a project and communicate with clients.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((project) => (
            <div key={project._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => navigate(`/project/${project._id}`)} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-action-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-action)', fontWeight: 'bold' }}>
                  {project.clientId?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>{project.clientId?.username}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Project: {project.jobId?.title}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="status-badge" style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', background: project.status === 'Completed' ? 'var(--success-bg)' : 'var(--primary-action-bg)', color: project.status === 'Completed' ? 'var(--success)' : 'var(--primary-action)' }}>
                  {project.status}
                </span>
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>Go to Chat</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Notifications</h2>
      {notifications.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <Bell size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No notifications</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You're all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notification) => (
            <div key={notification._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', background: notification.isRead ? 'var(--bg-card)' : 'var(--bg-secondary)', borderRadius: '12px', border: `1px solid ${notification.isRead ? 'var(--border-color)' : 'var(--primary-action)'}`, position: 'relative', overflow: 'hidden' }}>
              {!notification.isRead && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--primary-action)' }}></div>}
              <div>
                <h4 style={{ fontSize: '16px', margin: '0 0 4px 0', color: notification.isRead ? 'var(--text-primary)' : 'var(--primary-action)' }}>{notification.title}</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>{notification.message}</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(notification.createdAt).toLocaleString()}</span>
              </div>
              {!notification.isRead && (
                <button 
                  onClick={() => handleMarkNotificationRead(notification._id)}
                  style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)' }}>This section is currently under development.</p>
    </div>
  );

  return (
    <div className="dashboard-content-wrapper">
      {notification.text && (
        <div className={`message ${notification.type}`} style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', background: notification.type === 'error' ? 'var(--danger-bg)' : 'var(--success-bg)', color: notification.type === 'error' ? 'var(--danger)' : 'var(--success)', border: `1px solid ${notification.type === 'error' ? 'var(--danger)' : 'var(--success)'}` }}>
          {notification.text}
        </div>
      )}

      {activeTab === 'jobs' && renderJobs()}
      {activeTab === 'proposals' && renderProposals()}
      {activeTab === 'projects' && renderProjects(false)}
      {activeTab === 'completed' && renderProjects(true)}
      {activeTab === 'messages' && renderMessages()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'earnings' && renderPlaceholder('Earnings')}
      {activeTab === 'profile' && <ProfileSection role="Freelancer" />}

      {/* Redesigned Proposal Form Modal */}
      <AnimatePresence>
        {showProposalForm && selectedJob && (
          <div className="modal-overlay" style={{ zIndex: 9999 }}>
            <motion.div 
              className="modal"
              style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div>
                  <h2 style={{ fontSize: '20px', margin: 0, marginBottom: '4px' }}>Submit Proposal</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>For: {selectedJob.title}</p>
                </div>
                <button className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={() => setShowProposalForm(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitProposal} style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group floating-label">
                    <User size={18} className="input-icon" />
                    <input type="text" name="fullName" placeholder=" " value={proposalData.fullName} onChange={handleProposalChange} required />
                    <label>Full Name</label>
                  </div>
                  <div className="form-group floating-label">
                    <Clock size={18} className="input-icon" />
                    <input type="number" name="experience" placeholder=" " value={proposalData.experience} onChange={handleProposalChange} required />
                    <label>Years of Experience</label>
                  </div>
                </div>

                <div className="form-group" style={{ position: 'relative', marginBottom: '24px' }}>
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Relevant Skills for this Project</label>
                  <div 
                    onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
                    style={{ width: '100%', padding: '12px', minHeight: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}
                  >
                    {(!proposalData.skills || proposalData.skills.length === 0) && <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} /> Select skills...</span>}
                    {proposalData.skills && proposalData.skills.map(skill => (
                      <span key={skill} style={{ background: 'var(--primary-action)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {skill}
                        <span 
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setProposalData({...proposalData, skills: proposalData.skills.filter(s => s !== skill)}); 
                          }}
                        >
                          <X size={12} />
                        </span>
                      </span>
                    ))}
                  </div>
                  
                  {isSkillsDropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', zIndex: 50, maxHeight: '200px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px', boxShadow: 'var(--shadow-md)' }}>
                      {availableSkills.map(skill => (
                        <div 
                          key={skill} 
                          onClick={() => {
                            const currentSkills = proposalData.skills || [];
                            const isSelected = currentSkills.includes(skill);
                            let newSkills = [...currentSkills];
                            if (isSelected) {
                              newSkills = newSkills.filter(s => s !== skill);
                            } else {
                              newSkills.push(skill);
                            }
                            setProposalData({...proposalData, skills: newSkills});
                          }}
                          style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${(proposalData.skills || []).includes(skill) ? 'var(--primary-action)' : 'var(--border-color)'}`, background: (proposalData.skills || []).includes(skill) ? 'var(--primary-action-bg)' : 'transparent', color: (proposalData.skills || []).includes(skill) ? 'var(--primary-action)' : 'var(--text-primary)', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                  <AlignLeft size={18} className="input-icon" style={{ top: '24px' }} />
                  <textarea name="coverLetter" placeholder=" " value={proposalData.coverLetter} onChange={handleProposalChange} required rows="6" style={{ width: '100%', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                  <label style={{ top: '24px' }}>Cover Letter / Proposal Details</label>
                </div>

                <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                  <CheckSquare size={18} className="input-icon" style={{ top: '24px' }} />
                  <textarea name="completedProjects" placeholder=" " value={proposalData.completedProjects} onChange={handleProposalChange} rows="3" style={{ width: '100%', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                  <label style={{ top: '24px' }}>Previously Completed Projects (Optional)</label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group floating-label">
                    <DollarSign size={18} className="input-icon" />
                    <input type="number" name="proposedCost" placeholder=" " value={proposalData.proposedCost} onChange={handleProposalChange} required />
                    <label>Proposed Amount ($)</label>
                  </div>
                  <div className="form-group floating-label">
                    <Calendar size={18} className="input-icon" />
                    <input type="text" name="proposedDeadline" placeholder=" " value={proposalData.proposedDeadline} onChange={handleProposalChange} required />
                    <label>Estimated Duration (e.g. 2 weeks)</label>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Links & Attachments</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group floating-label">
                    <LinkIcon size={18} className="input-icon" />
                    <input type="url" name="portfolioUrl" placeholder=" " value={proposalData.portfolioUrl} onChange={handleProposalChange} />
                    <label>Portfolio URL (Optional)</label>
                  </div>
                  <div className="form-group floating-label">
                    <LinkIcon size={18} className="input-icon" />
                    <input type="url" name="githubUrl" placeholder=" " value={proposalData.githubUrl} onChange={handleProposalChange} />
                    <label>GitHub URL (Optional)</label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group floating-label">
                    <LinkIcon size={18} className="input-icon" />
                    <input type="url" name="linkedinUrl" placeholder=" " value={proposalData.linkedinUrl} onChange={handleProposalChange} />
                    <label>LinkedIn URL (Optional)</label>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Resume Upload (Optional)</label>
                    <input type="file" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer' }} />
                  </div>
                </div>

                <div className="form-group floating-label">
                  <LinkIcon size={18} className="input-icon" />
                  <input type="text" name="projectLinks" placeholder=" " value={proposalData.projectLinks} onChange={handleProposalChange} />
                  <label>Other Relevant Project Links (Comma separated)</label>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '16px', fontSize: '16px' }}>Submit Proposal</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowProposalForm(false)} style={{ flex: 1, padding: '16px', fontSize: '16px' }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showJobDetails && selectedJob && (
          <JobDetails 
            job={selectedJob} 
            onClose={() => { setShowJobDetails(false); setSelectedJob(null); }} 
            onApply={() => { setShowJobDetails(false); setShowProposalForm(true); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
