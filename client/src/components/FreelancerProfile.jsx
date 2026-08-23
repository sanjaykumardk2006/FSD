import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, User, MapPin, Mail, Phone, Globe, Link, Star, Award, Briefcase, GraduationCap } from 'lucide-react';
import apiClient from '../utils/apiClient';

import AnimatedButton from './AnimatedButton';
export const FreelancerProfile = ({ freelancerId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileRes, reviewsRes] = await Promise.all([
          apiClient.get(`/auth/profile/${freelancerId}`),
          apiClient.get(`/reviews/user/${freelancerId}`)
        ]);
        setProfile(profileRes.data.user);
        setReviews(reviewsRes.data.reviews || []);
      } catch (error) {
        console.error('Error fetching freelancer profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (freelancerId) {
      fetchProfileData();
    }
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="modal-overlay" style={{ zIndex: 10000 }}>
        <div className="modal" style={{ padding: '40px', textAlign: 'center' }}>Loading Profile...</div>
      </div>
    );
  }

  if (!profile) return null;
  
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
          <AnimatedButton className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={onClose}>
            <X size={20} />
          </AnimatedButton>
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
                  <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{profile.firstName} {profile.lastName}</h1>
                  <h2 style={{ fontSize: '18px', color: 'var(--primary-action)', fontWeight: '500', marginBottom: '12px' }}>{profile.profile?.skills?.[0] || 'Freelancer'}</h2>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {profile.country && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {profile.country}</span>}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={16} fill="var(--pending)" color="var(--pending)" /> 
                      {profile.averageRating ? profile.averageRating.toFixed(1) : 'New'} ({profile.totalReviews || 0} Reviews)
                    </span>
                    {profile.averageRating >= 4.5 && profile.totalReviews >= 5 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={16} color="var(--success)" /> Top Rated</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700' }}>
                    {profile.profile?.hourlyRate ? `$${profile.profile.hourlyRate}` : 'N/A'} 
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>/ hr</span>
                  </h3>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <AnimatedButton className="btn btn-primary">Invite to Job</AnimatedButton>
                <AnimatedButton className="btn btn-secondary">Message</AnimatedButton>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>About Me</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-wrap' }}>
                  {profile.profile?.bio || 'No bio provided.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={20} /> Work History & Reviews</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {reviews.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No reviews yet.</p>
                  ) : (
                    reviews.map(review => (
                      <div key={review._id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
                        <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{review.projectId?.jobId?.title || 'Completed Project'}</h4>
                        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="var(--pending)" color="var(--pending)" /> {review.rating.toFixed(1)}</span>
                          <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                          <span>By: {review.reviewerId?.username}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>"{review.comment}"</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Skills</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {profile.profile?.skills && profile.profile.skills.length > 0 ? (
                    profile.profile.skills.map(skill => (
                      <span key={skill} style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>{skill}</span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No skills listed.</span>
                  )}
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
                  {profile.profile?.portfolio && profile.profile.portfolio.length > 0 && (
                    <a href={profile.profile.portfolio[0].link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Globe size={18} color="var(--primary-action)" /> Portfolio</a>
                  )}
                  {profile.profile?.githubUrl && (
                    <a href={profile.profile.githubUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Link size={18} color="var(--primary-action)" /> GitHub</a>
                  )}
                  {profile.profile?.linkedinUrl && (
                    <a href={profile.profile.linkedinUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}><Link size={18} color="var(--primary-action)" /> LinkedIn</a>
                  )}
                  {!profile.profile?.portfolio?.length && !profile.profile?.githubUrl && !profile.profile?.linkedinUrl && (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No links provided.</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
