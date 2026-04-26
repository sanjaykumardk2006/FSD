import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const JobProposals = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(null);
  const [notification, setNotification] = useState({ type: '', text: '' });

  const showNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: '', text: '' }), 3000);
  };

  useEffect(() => {
    fetchProposals();
  }, [jobId]);

  const fetchProposals = async () => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/proposals`);
      setProposals(response.data.proposals || []);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      await apiClient.put(`/proposals/${proposalId}/accept`);
      showNotification('success', 'Proposal accepted!');
      fetchProposals();
    } catch (error) {
      showNotification('error', 'Error accepting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      await apiClient.put(`/proposals/${proposalId}/reject`, {
        rejectionReason: rejectReason,
      });
      showNotification('success', 'Proposal rejected!');
      setShowRejectForm(null);
      setRejectReason('');
      fetchProposals();
    } catch (error) {
      showNotification('error', 'Error rejecting proposal: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <Header />
      <main className="content-container">
        <button className="btn btn-secondary" onClick={() => navigate('/client-dashboard')}>
          Back to Dashboard
        </button>
        <h1>Proposals for Job</h1>
        {notification.text && (
          <div className={`message ${notification.type}`} style={{ marginBottom: '20px' }}>
            {notification.text}
          </div>
        )}

        {proposals.length === 0 ? (
          <p>No proposals yet.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal._id} className="proposal-card">
              <h3>{proposal.freelancerId?.username}</h3>
              <p>Email: {proposal.freelancerId?.email}</p>
              <p>Skills: {proposal.skills.join(', ')}</p>
              <p>Experience: {proposal.experience}</p>
              <p>Proposed Cost: ${proposal.proposedCost}</p>
              <p>Status: {proposal.status}</p>

              {proposal.status === 'Pending' && (
                <div className="proposal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAcceptProposal(proposal._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowRejectForm(proposal._id)}
                  >
                    Reject
                  </button>
                </div>
              )}

              {showRejectForm === proposal._id && (
                <div className="reject-form">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Reason for rejection..."
                    rows="3"
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRejectProposal(proposal._id)}
                  >
                    Send Rejection
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowRejectForm(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};
