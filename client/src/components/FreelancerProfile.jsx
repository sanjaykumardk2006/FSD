import React from 'react';
import { motion } from 'framer-motion';
import { X, User, MapPin, Mail, Phone, Globe, Link, Star, Award, Briefcase, GraduationCap } from 'lucide-react';

export const FreelancerProfile = ({ freelancerId, onClose }) => {
  // In a real app, you would fetch the full profile using freelancerId
  // For this redesign, we'll use a mocked premium profile display
  
  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <motion.div 
        className="modal"
        style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-secondary)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontSize: '20px', margin: 0 }}>Freelancer Profile</h2>
          <button className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          
          {/* Header Section */}
          <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '24px', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary-action-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'var(--primary-action)', boxShadow: 'var(--shadow-md)' }}>
              <User size={64} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Alex Developer</h1>
                  <h2 style={{ fontSize: '18px', color: 'var(--primary-action)', fontWeight: '500', marginBottom: '12px' }}>Senior Full Stack Engineer</h2>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> New York, USA</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} fill="var(--pending)" color="var(--pending)" /> 4.9 (45 Reviews)</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={16} color="var(--success)" /> Top Rated Plus</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700' }}>$65.00 <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>/ hr</span></h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>100% Job Success</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary">Invite to Job</button>
                <button className="btn btn-secondary">Message</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>About Me</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
                  I am a passionate Full Stack Developer with over 5 years of experience in building scalable web applications. I specialize in React, Node.js, and Cloud Infrastructure. I have successfully delivered over 30 projects for clients ranging from startups to enterprise companies. My focus is always on clean code, performance, and excellent user experience.
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={20} /> Work History & Reviews</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>E-commerce Dashboard Redesign</h4>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="var(--pending)" color="var(--pending)" /> 5.0</span>
                      <span>Oct 2025 - Dec 2025</span>
                      <span>Earned $4,500</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>"Alex was fantastic to work with. Delivered ahead of schedule and the code quality was superb. Will definitely hire again!"</p>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>SaaS API Integration</h4>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="var(--pending)" color="var(--pending)" /> 4.8</span>
                      <span>Aug 2025 - Sep 2025</span>
                      <span>Earned $2,200</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>"Great communication and solid technical skills. Solved complex authentication issues quickly."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Skills</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS'].map(skill => (
                    <span key={skill} style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>{skill}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><GraduationCap size={18} /> Education</h3>
                <div>
                  <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>B.S. Computer Science</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>University of Technology</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>2016 - 2020</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Contact & Links</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Globe size={18} color="var(--primary-action)" /> portfolio-alex.dev</a>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Link size={18} color="var(--primary-action)" /> github.com/alexdev</a>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Link size={18} color="var(--primary-action)" /> linkedin.com/in/alexdev</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
