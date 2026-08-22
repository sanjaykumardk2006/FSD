import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Calendar, DollarSign, Clock, MapPin, Briefcase, FileText, X, Bell, MessageSquare, CheckCircle, AlignLeft, Tag, Target, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ProfileSection } from '../components/ProfileSection';

import AnimatedButton from '../components/AnimatedButton';
export const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'jobs';

  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const availableSkills = ["React", "Node.js", "Python", "Figma", "AWS", "SEO", "Copywriting", "UI Design", "TypeScript", "Docker", "GraphQL", "TailwindCSS", "Next.js", "MongoDB"];
  
  // Job Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requiredSkills: [],
    experienceRequired: '1 yr to 2 yr',
    category: 'Web Development',
  });

  useEffect(() => {
    fetchJobs();
    fetchProjects();
    fetchNotifications();
    fetchInbox();

    const handleNewNotification = () => {
      fetchNotifications();
    };
    window.addEventListener('notification-received', handleNewNotification);
    
    return () => {
      window.removeEventListener('notification-received', handleNewNotification);
    };
  }, []);

  const fetchInbox = async () => {
    try {
      const response = await apiClient.get('/messages/inbox');
      setInbox(response.data.inbox || []);
    } catch (error) {
      console.error('Error fetching inbox:', error);
    }
  };

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
      const response = await apiClient.get('/jobs/my-jobs');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get('/projects/client/projects');
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData({ ...formData, requiredSkills: value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      // We only send backend-supported fields
      const payload = {
        title: formData.title,
        description: formData.description,
        requiredSkills: formData.requiredSkills.length ? formData.requiredSkills : ['Not Specified'],
        budget: formData.budget,
        deadline: formData.deadline,
        category: formData.category,
        experienceRequired: formData.experienceRequired,
      };
      await apiClient.post('/jobs/post', payload);
      alert('Job posted successfully!');
      setShowJobForm(false);
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        requiredSkills: [],
        experienceRequired: '1 yr to 2 yr',
        category: 'Web Development',
      });
      fetchJobs();
    } catch (error) {
      alert('Error posting job: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? All associated proposals will also be deleted.')) {
      return;
    }
    try {
      await apiClient.delete(`/jobs/${jobId}`);
      fetchJobs();
    } catch (error) {
      alert('Error deleting job: ' + error.response?.data?.message);
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

  const handleDeleteNotification = async (notificationId) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      await apiClient.delete(`/notifications/${notificationId}`);
      setNotifications(notifications.filter(n => n._id !== notificationId));
      // If deleting an unread notification, the header count should update
      window.dispatchEvent(new Event('notification-read'));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const renderJobs = () => (
    <div className="jobs-section">
      <div className="dashboard-top-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px' }}>My Posted Jobs</h2>
        <AnimatedButton className="btn btn-primary" onClick={() => setShowJobForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Post New Job
        </AnimatedButton>
      </div>

      <motion.div 
        className="jobs-list"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        {jobs.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Briefcase size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>No jobs posted yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Create your first job posting to start receiving proposals.</p>
            <AnimatedButton className="btn btn-primary" onClick={() => setShowJobForm(true)}>Post a Job</AnimatedButton>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map((job) => (
              <motion.div key={job._id} className="modern-job-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{job.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: job.status === 'Open' ? 'var(--success-bg)' : 'var(--pending-bg)', color: job.status === 'Open' ? 'var(--success)' : 'var(--pending)' }}>
                      {job.status}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}><DollarSign size={16} /> Budget: ${job.budget}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}><Calendar size={16} /> Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {job.requiredSkills.slice(0, 3).map((skill, i) => (
                      <span key={i} style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>{skill}</span>
                    ))}
                    {job.requiredSkills.length > 3 && <span style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>+{job.requiredSkills.length - 3} more</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AnimatedButton className="btn btn-secondary" onClick={() => navigate(`/job/${job._id}/proposals`)}>View Proposals</AnimatedButton>
                    <AnimatedButton className="btn btn-danger" style={{ background: 'var(--danger)', color: 'white', border: 'none' }} onClick={() => handleDeleteJob(job._id)}>Delete</AnimatedButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
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
              {isCompleted ? 'You have no completed projects yet.' : 'Accept a proposal to start a project.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredProjects.map((project) => (
              <motion.div key={project._id} className="card" variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} initial="hidden" animate="visible">
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Project: {project.jobId?.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Freelancer: <strong>{project.freelancerId?.username}</strong></p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ color: 'var(--primary-action)', fontWeight: '600' }}>{project.status}</span>
                </div>
                
                <AnimatedButton className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/project/${project._id}`)}>
                  {isCompleted ? 'View Details' : 'Open Workspace'}
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMessages = () => (
    <div className="messages-section">
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Global Inbox</h2>
      {inbox.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <MessageSquare size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No messages yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Start a project to communicate with freelancers.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {inbox.map((item) => (
            <div key={item.project._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: item.unreadCount > 0 ? 'var(--bg-secondary)' : 'var(--bg-card)', borderRadius: '12px', border: `1px solid ${item.unreadCount > 0 ? 'var(--primary-action)' : 'var(--border-color)'}`, transition: 'background 0.2s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onClick={() => navigate(`/project/${item.project._id}`)} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={(e) => e.currentTarget.style.background = item.unreadCount > 0 ? 'var(--bg-secondary)' : 'var(--bg-card)'}>
              {item.unreadCount > 0 && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--primary-action)' }}></div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-action-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-action)', fontWeight: 'bold', flexShrink: 0, overflow: 'hidden' }}>
                  {item.otherUser.profileImage ? (
                    <img src={item.otherUser.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    item.otherUser.username?.charAt(0).toUpperCase()
                  )}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '16px', margin: 0, color: item.unreadCount > 0 ? 'var(--text-primary)' : 'inherit', fontWeight: item.unreadCount > 0 ? '600' : 'normal' }}>{item.otherUser.username}</h4>
                    {item.latestMessage && (
                      <span style={{ fontSize: '12px', color: item.unreadCount > 0 ? 'var(--primary-action)' : 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                        {new Date(item.latestMessage.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--primary-action)' }}>Project: {item.project.title}</p>
                  <p style={{ margin: 0, fontSize: '14px', color: item.unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.latestMessage ? (
                      <>
                        {item.latestMessage.senderId._id === user.id ? 'You: ' : ''}
                        {item.latestMessage.isSystemMessage ? <i>System Message</i> : item.latestMessage.message}
                      </>
                    ) : (
                      <span style={{ fontStyle: 'italic' }}>No messages yet</span>
                    )}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', marginLeft: '16px' }}>
                {item.unreadCount > 0 && (
                  <span style={{ background: 'var(--primary-action)', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px' }}>
                    {item.unreadCount} new
                  </span>
                )}
                <AnimatedButton className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>Go to Chat</AnimatedButton>
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
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {!notification.isRead && (
                  <AnimatedButton 
                    onClick={() => handleMarkNotificationRead(notification._id)}
                    style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  >
                    Mark as Read
                  </AnimatedButton>
                )}
                <AnimatedButton 
                  onClick={() => handleDeleteNotification(notification._id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                  title="Delete Notification"
                >
                  <Trash2 size={16} />
                </AnimatedButton>
              </div>
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
      {activeTab === 'jobs' && renderJobs()}
      {activeTab === 'projects' && renderProjects(false)}
      {activeTab === 'proposals' && renderPlaceholder('View Proposals (Select a job from "My Jobs" to view its proposals)')}
      {activeTab === 'completed' && renderProjects(true)}
      {activeTab === 'messages' && renderMessages()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'payments' && renderPlaceholder('Payment History')}
      {activeTab === 'profile' && <ProfileSection role="Client" />}

      {/* Redesigned Job Post Modal */}
      <AnimatePresence>
        {showJobForm && (
          <div className="modal-overlay">
            <motion.div 
              className="modal"
              style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Post a New Job</h2>
                <AnimatedButton className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={() => setShowJobForm(false)}>
                  <X size={20} />
                </AnimatedButton>
              </div>

              <form onSubmit={handlePostJob} style={{ padding: '24px' }}>
                <div className="form-group floating-label">
                  <Briefcase size={18} className="input-icon" />
                  <input type="text" name="title" placeholder=" " value={formData.title} onChange={handleFormChange} required />
                  <label>Project Name</label>
                </div>

                <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                  <AlignLeft size={18} className="input-icon" style={{ top: '24px' }} />
                  <textarea name="description" placeholder=" " value={formData.description} onChange={handleFormChange} required rows="5" style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                  <label style={{ top: '24px' }}>Project Description</label>
                </div>

                <div className="form-row">
                  <div className="form-group floating-label">
                    <DollarSign size={18} className="input-icon" />
                    <input type="number" name="budget" placeholder=" " value={formData.budget} onChange={handleFormChange} required />
                    <label>Budget ($)</label>
                  </div>
                  <div className="form-group floating-label">
                    <Calendar size={18} className="input-icon" />
                    <input type="date" name="deadline" placeholder=" " value={formData.deadline} onChange={handleFormChange} required />
                    <label>Project Duration (Deadline)</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group floating-label">
                    <Target size={18} className="input-icon" />
                    <select name="experienceRequired" value={formData.experienceRequired} onChange={handleFormChange}>
                      <option value="Fresher">Fresher</option>
                      <option value="1 yr to 2 yr">1 yr to 2 yr</option>
                      <option value="2 to 4 yr">2 to 4 yr</option>
                      <option value="Above 5 yr">Above 5 yr</option>
                    </select>
                    <label>Experience Required</label>
                  </div>
                  <div className="form-group floating-label">
                    <Tag size={18} className="input-icon" />
                    <select name="category" value={formData.category} onChange={handleFormChange}>
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

                <div className="form-group" style={{ position: 'relative' }}>
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Required Skills</label>
                  <div 
                    onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
                    style={{ width: '100%', padding: '12px', minHeight: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}
                  >
                    {formData.requiredSkills.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Select skills...</span>}
                    {formData.requiredSkills.map(skill => (
                      <span key={skill} style={{ background: 'var(--primary-action)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {skill}
                        <span 
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setFormData({...formData, requiredSkills: formData.requiredSkills.filter(s => s !== skill)}); 
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
                            const isSelected = formData.requiredSkills.includes(skill);
                            let newSkills = [...formData.requiredSkills];
                            if (isSelected) {
                              newSkills = newSkills.filter(s => s !== skill);
                            } else {
                              newSkills.push(skill);
                            }
                            setFormData({...formData, requiredSkills: newSkills});
                          }}
                          style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${formData.requiredSkills.includes(skill) ? 'var(--primary-action)' : 'var(--border-color)'}`, background: formData.requiredSkills.includes(skill) ? 'var(--primary-action-bg)' : 'transparent', color: formData.requiredSkills.includes(skill) ? 'var(--primary-action)' : 'var(--text-primary)', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Attachments (Optional)</label>
                  <input type="file" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <AnimatedButton type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>Publish Job</AnimatedButton>
                  <AnimatedButton type="button" className="btn btn-secondary" onClick={() => setShowJobForm(false)} style={{ flex: 1, padding: '14px' }}>Cancel</AnimatedButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
