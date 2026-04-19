import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const ClientDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    budget: '',
    deadline: '',
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
    setFormData({
      ...formData,
      requiredSkills: e.target.value.split(',').map((skill) => skill.trim()),
    });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/jobs/post', formData);
      alert('Job posted successfully!');
      setShowJobForm(false);
      setFormData({
        title: '',
        description: '',
        requiredSkills: [],
        budget: '',
        deadline: '',
      });
      fetchJobs();
    } catch (error) {
      alert('Error posting job: ' + error.response?.data?.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page">
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-header">
          <h1>Client Dashboard</h1>
          <div className="dashboard-actions">
            <span>Welcome, {user?.username}!</span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            My Jobs ({jobs.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects ({projects.length})
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'jobs' && (
            <div className="jobs-section">
              <button
                className="btn btn-primary"
                onClick={() => setShowJobForm(!showJobForm)}
              >
                {showJobForm ? 'Cancel' : 'Post New Job'}
              </button>

              {showJobForm && (
                <form onSubmit={handlePostJob} className="job-form">
                  <div className="form-group">
                    <label htmlFor="title">Job Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="requiredSkills">Required Skills (comma-separated)</label>
                    <input
                      type="text"
                      id="requiredSkills"
                      value={formData.requiredSkills.join(', ')}
                      onChange={handleSkillsChange}
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="budget">Budget ($)</label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deadline">Deadline</label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Post Job
                  </button>
                </form>
              )}

              <div className="jobs-list">
                {jobs.length === 0 ? (
                  <p>No jobs posted yet. Create one to get started!</p>
                ) : (
                  jobs.map((job) => (
                    <div key={job._id} className="job-card">
                      <h3>{job.title}</h3>
                      <p>{job.description}</p>
                      <p className="job-meta">
                        Budget: ${job.budget} | Status: {job.status}
                      </p>
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/job/${job._id}/proposals`)}
                      >
                        View Proposals
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-section">
              {projects.length === 0 ? (
                <p>No active projects yet.</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <h3>{project.jobId?.title}</h3>
                    <p>Status: {project.status}</p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/project/${project._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
