import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const FreelancerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    skills: [],
    experience: '',
    proposedCost: '',
    proposedDeadline: '',
    coverLetter: '',
  });
  const [notification, setNotification] = useState({ type: '', text: '' });

  const showNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: '', text: '' }), 3000);
  };

  useEffect(() => {
    fetchJobs();
    fetchProposals();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setProposalData({ ...proposalData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    setProposalData({
      ...proposalData,
      skills: e.target.value.split(',').map((skill) => skill.trim()),
    });
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/proposals/submit', {
        jobId: selectedJob._id,
        ...proposalData,
      });
      showNotification('success', 'Proposal submitted successfully!');
      setShowProposalForm(false);
      setSelectedJob(null);
      setProposalData({
        skills: [],
        experience: '',
        proposedCost: '',
        proposedDeadline: '',
        coverLetter: '',
      });
      fetchProposals();
      fetchJobs();
    } catch (error) {
      showNotification('error', 'Error submitting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProposal = async (proposalId) => {
    if (!window.confirm('Are you sure you want to delete this proposal?')) {
      return;
    }
    try {
      await apiClient.delete(`/proposals/${proposalId}`);
      showNotification('success', 'Proposal deleted successfully!');
      fetchProposals();
    } catch (error) {
      showNotification('error', 'Error deleting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-title-section">
            <h1>Freelancer Dashboard</h1>
            <span className="welcome-message">Welcome, {user?.username}!</span>
          </div>
          <div className="dashboard-actions">
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
            Available Jobs ({jobs.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            My Proposals ({proposals.length})
          </button>
        </div>

        <div className="dashboard-content">
          {notification.text && (
            <div className={`message ${notification.type}`} style={{ marginBottom: '20px' }}>
              {notification.text}
            </div>
          )}
          {activeTab === 'jobs' && (
            <div className="jobs-section">
              {jobs.length === 0 ? (
                <p>No available jobs at this moment.</p>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p className="job-meta">
                      Budget: ${job.budget} | Skills: {job.requiredSkills.join(', ')}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowProposalForm(true);
                      }}
                    >
                      Submit Proposal
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'proposals' && (
            <div className="proposals-section">
              {proposals.length === 0 ? (
                <p>You haven't submitted any proposals yet.</p>
              ) : (
                proposals.map((proposal) => (
                  <div key={proposal._id} className="proposal-card">
                    <h3>Job: {proposal.jobId?.title}</h3>
                    <p>Status: {proposal.status}</p>
                    <p>Proposed Cost: ${proposal.proposedCost}</p>
                    <p>Submitted: {new Date(proposal.createdAt).toLocaleDateString()}</p>
                    <div style={{ marginTop: '10px' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDeleteProposal(proposal._id)}
                        style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                        disabled={proposal.status === 'Accepted'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Proposal Form Modal */}
        {showProposalForm && selectedJob && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Submit Proposal for: {selectedJob.title}</h2>
              <form onSubmit={handleSubmitProposal} className="proposal-form">
                <div className="form-group">
                  <label htmlFor="skills">Your Skills (comma-separated)</label>
                  <input
                    type="text"
                    id="skills"
                    value={proposalData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Your Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={proposalData.experience}
                    onChange={handleProposalChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="proposedCost">Proposed Cost ($)</label>
                    <input
                      type="number"
                      id="proposedCost"
                      name="proposedCost"
                      value={proposalData.proposedCost}
                      onChange={handleProposalChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="proposedDeadline">Delivery Date</label>
                    <input
                      type="date"
                      id="proposedDeadline"
                      name="proposedDeadline"
                      value={proposalData.proposedDeadline}
                      onChange={handleProposalChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={proposalData.coverLetter}
                    onChange={handleProposalChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="btn btn-primary">
                    Submit Proposal
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowProposalForm(false);
                      setSelectedJob(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
