import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X as XIcon, FileText, User, Star, Calendar } from 'lucide-react';
import { ProposalDetail } from '../components/ProposalDetail';
import { FreelancerProfile } from '../components/FreelancerProfile';

import AnimatedButton from '../components/AnimatedButton';
export const JobProposals = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals state
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showProposalDetail, setShowProposalDetail] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [showFreelancerProfile, setShowFreelancerProfile] = useState(false);

  useEffect(() => {
    fetchJobAndProposals();
  }, [jobId]);

  const fetchJobAndProposals = async () => {
    try {
      const jobResponse = await apiClient.get(`/jobs/${jobId}`);
      setJob(jobResponse.data.job);

      const proposalsResponse = await apiClient.get(`/proposals/job/${jobId}`);
      setProposals(proposalsResponse.data.proposals || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (proposalId, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this proposal?`)) return;
    try {
      await apiClient.put(`/proposals/${proposalId}/status`, { status });
      // If accepted, we should probably redirect to active projects or reload
      if (status === 'Accepted') {
        alert('Proposal accepted! A new project workspace has been created.');
        navigate('/client-dashboard?tab=projects');
      } else {
        fetchJobAndProposals(); // Refresh to show rejected status
        if (showProposalDetail) setShowProposalDetail(false);
      }
    } catch (err) {
      alert('Error updating proposal status: ' + err.response?.data?.message);
    }
  };

  const openProposalDetail = (proposal) => {
    setSelectedProposal(proposal);
    setShowProposalDetail(true);
  };

  const openFreelancerProfile = (freelancerId) => {
    // In a real app, you'd fetch full profile details. We'll pass the ID and let the modal handle it or just pass mocked data
    setSelectedFreelancer({ _id: freelancerId });
    setShowFreelancerProfile(true);
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading proposals...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)' }}>{error}</div>;

  return (
    <div className="proposals-page-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <AnimatedButton 
          onClick={() => navigate('/client-dashboard')} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '15px', fontWeight: '500', padding: '8px 0', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </AnimatedButton>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Proposals for: {job?.title}</h2>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          <span>Budget: ${job?.budget}</span>
          <span>•</span>
          <span>Status: {job?.status}</span>
          <span>•</span>
          <span>Total Proposals: {proposals.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {proposals.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>No proposals yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Freelancers haven't submitted any proposals for this job.</p>
          </div>
        ) : (
          proposals.map((proposal) => (
            <motion.div 
              key={proposal._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Proposal Header */}
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'var(--text-muted)' }}>
                    <User size={32} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{proposal.freelancerId?.username}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={14} style={{ color: 'var(--pending)' }} fill="var(--pending)" /> {proposal.freelancerId?.averageRating ? proposal.freelancerId.averageRating.toFixed(1) : 'New'} ({proposal.freelancerId?.totalReviews || 0} reviews) • {proposal.experience || '3 years exp.'}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '24px', color: 'var(--primary-action)', marginBottom: '4px' }}>${proposal.proposedCost}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                    <Calendar size={14} /> in {new Date(proposal.proposedDeadline).toLocaleDateString() || '2 weeks'}
                  </p>
                </div>
              </div>

              {/* Proposal Body (Excerpt) */}
              <div style={{ padding: '24px', flex: 1 }}>
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cover Letter</h4>
                <p style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {proposal.coverLetter || "I am very interested in this project and have the required skills to deliver high quality work."}
                </p>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                  {(proposal.skills || ['React', 'Node.js']).map((skill, i) => (
                    <span key={i} style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Proposal Actions */}
              <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <AnimatedButton className="btn btn-secondary" onClick={() => openProposalDetail(proposal)}>Read Full Proposal</AnimatedButton>
                  <AnimatedButton className="btn btn-secondary" onClick={() => openFreelancerProfile(proposal.freelancerId?._id)}>View Profile</AnimatedButton>
                </div>
                
                {proposal.status === 'Pending' ? (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AnimatedButton 
                      className="btn" 
                      onClick={() => handleUpdateStatus(proposal._id, 'Rejected')}
                      style={{ background: 'var(--bg-card)', color: 'var(--danger)', border: '1px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <XIcon size={16} /> Decline
                    </AnimatedButton>
                    <AnimatedButton 
                      className="btn btn-primary" 
                      onClick={() => handleUpdateStatus(proposal._id, 'Accepted')}
                      style={{ background: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', border: 'none' }}
                    >
                      <Check size={16} /> Accept Proposal
                    </AnimatedButton>
                  </div>
                ) : (
                  <span className={`status-badge ${proposal.status.toLowerCase()}`} style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', background: proposal.status === 'Accepted' ? 'var(--success-bg)' : 'var(--danger-bg)', color: proposal.status === 'Accepted' ? 'var(--success)' : 'var(--danger)' }}>
                    {proposal.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProposalDetail && selectedProposal && (
          <ProposalDetail 
            proposal={selectedProposal} 
            onClose={() => setShowProposalDetail(false)} 
            onAccept={() => handleUpdateStatus(selectedProposal._id, 'Accepted')}
            onReject={() => handleUpdateStatus(selectedProposal._id, 'Rejected')}
            onViewProfile={() => {
              setShowProposalDetail(false);
              openFreelancerProfile(selectedProposal.freelancerId?._id);
            }}
          />
        )}

        {showFreelancerProfile && selectedFreelancer && (
          <FreelancerProfile 
            freelancerId={selectedFreelancer._id} 
            onClose={() => setShowFreelancerProfile(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
