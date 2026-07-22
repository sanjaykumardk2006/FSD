import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Calendar, DollarSign, FileText, Link as LinkIcon, Download, Check, X as XIcon, Star } from 'lucide-react';

export const ProposalDetail = ({ proposal, onClose, onAccept, onReject, onViewProfile }) => {
  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <motion.div 
        className="modal"
        style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontSize: '20px', margin: 0 }}>Proposal Details</h2>
          <button className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          {/* Freelancer Info Card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'var(--primary-action)', boxShadow: 'var(--shadow-sm)' }}>
                <User size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{proposal.freelancerId?.username}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span>{proposal.experience || '3 years exp.'}</span> • <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={16} fill="var(--pending)" color="var(--pending)" /> 4.9 (12 reviews)</span>
                </p>
                <button className="text-btn" onClick={onViewProfile} style={{ fontSize: '14px' }}>View Full Profile &rarr;</button>
              </div>
            </div>
            
            <div style={{ textAlign: 'right', background: 'var(--bg-card)', padding: '16px 24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Quoted Amount</p>
              <h3 style={{ fontSize: '28px', color: 'var(--primary-action)', marginBottom: '8px' }}>${proposal.proposedCost}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                <Calendar size={14} /> Estimated: {new Date(proposal.proposedDeadline).toLocaleDateString() || '2 weeks'}
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={20} color="var(--text-secondary)" /> Cover Letter</h4>
            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {proposal.coverLetter || "Hello,\n\nI am highly interested in this project and I have the required expertise to deliver it perfectly on time. I have read your requirements and I am confident that my skills match your needs.\n\nLooking forward to discussing this further with you.\n\nBest regards,\n" + proposal.freelancerId?.username}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills & Expertise</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {(proposal.skills || ['React', 'Node.js', 'UI/UX']).map((skill, i) => (
                  <span key={i} style={{ background: 'var(--primary-action-bg)', color: 'var(--primary-action)', padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Attachments & Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-action)', fontSize: '15px' }}><Download size={18} /> Resume.pdf</a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-action)', fontSize: '15px' }}><LinkIcon size={18} /> Portfolio Website</a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-action)', fontSize: '15px' }}><LinkIcon size={18} /> GitHub Profile</a>
              </div>
            </div>
          </div>
          
          {/* Completed Projects Excerpt */}
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Similar Completed Projects</h4>
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.6' }}>
                I recently built a similar SaaS platform dashboard using React and Tailwind CSS for a marketing agency, which improved their workflow efficiency by 40%. I also have extensive experience with Node.js backends similar to your requirements.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            {proposal.status === 'Pending' ? (
              <>
                <button 
                  className="btn btn-primary" 
                  onClick={onAccept}
                  style={{ flex: 2, background: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none', padding: '16px', fontSize: '16px' }}
                >
                  <Check size={20} /> Accept & Hire Freelancer
                </button>
                <button 
                  className="btn" 
                  onClick={onReject}
                  style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--danger)', border: '1px solid var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', fontSize: '16px' }}
                >
                  <XIcon size={20} /> Decline Proposal
                </button>
              </>
            ) : (
              <div style={{ width: '100%', textAlign: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                This proposal is currently <strong>{proposal.status}</strong>.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
