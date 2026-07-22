import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Calendar, DollarSign, Clock, MapPin, Briefcase, FileText } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'jobs';

  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  
  // Job Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requiredSkills: [],
    experienceRequired: 'Intermediate',
    category: 'Web Development',
  });

  useEffect(() => {
    fetchJobs();
    fetchProjects();
  }, []);

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
        experienceRequired: 'Intermediate',
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

  const renderJobs = () => (
    <div className="jobs-section">
      <div className="dashboard-top-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px' }}>My Posted Jobs</h2>
        <button className="btn btn-primary" onClick={() => setShowJobForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Post New Job
        </button>
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
            <button className="btn btn-primary" onClick={() => setShowJobForm(true)}>Post a Job</button>
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
                    <button className="btn btn-secondary" onClick={() => navigate(`/job/${job._id}/proposals`)}>View Proposals</button>
                    <button className="btn btn-danger" style={{ background: 'var(--danger)', color: 'white', border: 'none' }} onClick={() => handleDeleteJob(job._id)}>Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderProjects = () => (
    <div className="projects-section">
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Active Projects</h2>
      {projects.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <Briefcase size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No active projects</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Accept a proposal to start a project.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.map((project) => (
            <motion.div key={project._id} className="card" variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} initial="hidden" animate="visible">
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Project: {project.jobId?.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Freelancer: <strong>{project.freelancerId?.username}</strong></p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span style={{ color: 'var(--primary-action)', fontWeight: '600' }}>{project.status}</span>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/project/${project._id}`)}>
                Open Workspace
              </button>
            </motion.div>
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
      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'proposals' && renderPlaceholder('View Proposals (Select a job from "My Jobs" to view its proposals)')}
      {activeTab === 'completed' && renderPlaceholder('Completed Projects')}
      {activeTab === 'messages' && renderPlaceholder('Messages')}
      {activeTab === 'notifications' && renderPlaceholder('Notifications')}
      {activeTab === 'payments' && renderPlaceholder('Payment History')}
      {activeTab === 'profile' && renderPlaceholder('My Profile')}

      {/* Redesigned Job Post Modal */}
      <AnimatePresence>
        {showJobForm && (
          <div className="modal-overlay">
            <motion.div 
              className="modal"
              style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Post a New Job</h2>
                <button className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={() => setShowJobForm(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePostJob} style={{ padding: '24px' }}>
                <div className="form-group floating-label">
                  <input type="text" name="title" placeholder=" " value={formData.title} onChange={handleFormChange} required />
                  <label>Project Name</label>
                </div>

                <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                  <textarea name="description" placeholder=" " value={formData.description} onChange={handleFormChange} required rows="5" style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                  <label style={{ top: '24px' }}>Project Description</label>
                </div>

                <div className="form-row">
                  <div className="form-group floating-label">
                    <input type="number" name="budget" placeholder=" " value={formData.budget} onChange={handleFormChange} required />
                    <label>Budget ($)</label>
                  </div>
                  <div className="form-group floating-label">
                    <input type="date" name="deadline" placeholder=" " value={formData.deadline} onChange={handleFormChange} required />
                    <label>Project Duration (Deadline)</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Experience Required</label>
                    <select name="experienceRequired" value={formData.experienceRequired} onChange={handleFormChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Category</label>
                    <select name="category" value={formData.category} onChange={handleFormChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Writing">Writing</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Required Skills (Hold Ctrl/Cmd to select multiple)</label>
                  <select multiple name="requiredSkills" onChange={handleSkillsChange} style={{ width: '100%', height: '120px', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Figma">Figma</option>
                    <option value="AWS">AWS</option>
                    <option value="SEO">SEO</option>
                    <option value="Copywriting">Copywriting</option>
                    <option value="UI Design">UI Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Attachments (Optional)</label>
                  <input type="file" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>Publish Job</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowJobForm(false)} style={{ flex: 1, padding: '14px' }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
