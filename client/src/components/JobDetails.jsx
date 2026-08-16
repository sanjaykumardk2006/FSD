import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, DollarSign, Clock, Tag, Briefcase, FileText } from 'lucide-react';

import AnimatedButton from './AnimatedButton';
export const JobDetails = ({ job, onClose, onApply }) => {
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
          <h2 style={{ fontSize: '20px', margin: 0 }}>Project Details</h2>
          <AnimatedButton className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={onClose}>
            <X size={20} />
          </AnimatedButton>
        </div>

        <div style={{ padding: '32px' }}>
          
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>{job.title}</h1>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> Worldwide</span>
              <span className="status-badge" style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '12px', background: 'var(--success-bg)', color: 'var(--success)' }}>Open</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <DollarSign color="var(--text-secondary)" size={24} />
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Budget</h4>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>${job.budget}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fixed Price</p>
              </div>
            </div>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Calendar color="var(--text-secondary)" size={24} />
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Duration</h4>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>{new Date(job.deadline).toLocaleDateString()}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Deadline</p>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Briefcase color="var(--text-secondary)" size={24} />
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Experience Level</h4>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>Intermediate</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Required</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Project Description</h3>
            <div style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {job.description}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Skills & Expertise Needed</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {job.requiredSkills.map((skill, i) => (
                <span key={i} style={{ background: 'var(--primary-action-bg)', color: 'var(--primary-action)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>About the Client</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--text-muted)', borderRadius: '50%' }}></div>
              <div>
                <p style={{ fontWeight: '600', fontSize: '15px' }}>{job.clientId?.username || 'Client Name'}</p>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> United States</span>
                  <span>15 Jobs Posted</span>
                  <span>$10k+ Total Spent</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <AnimatedButton className="btn btn-primary" style={{ flex: 1, padding: '16px', fontSize: '16px' }} onClick={onApply}>
              Submit a Proposal
            </AnimatedButton>
            <AnimatedButton className="btn btn-secondary" style={{ padding: '16px 24px', fontSize: '16px' }}>
              Save Job
            </AnimatedButton>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
