import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../utils/apiClient';
import { User, Mail, Briefcase, Clock, DollarSign, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfileSection = ({ role }) => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
    hourlyRate: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      const userData = response.data.user;
      setProfile(userData);
      if (userData.profile) {
        setFormData({
          bio: userData.profile.bio || '',
          skills: userData.profile.skills ? userData.profile.skills.join(', ') : '',
          experience: userData.profile.experience || '',
          hourlyRate: userData.profile.hourlyRate || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showMessage('error', 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: formData.experience,
        hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : undefined
      };
      
      const response = await apiClient.put('/auth/profile', payload);
      setProfile(response.data.user);
      setIsEditing(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', 'Failed to update profile.');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading profile...</div>;
  }

  return (
    <div className="profile-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {message.text && (
        <div className={`message ${message.type}`} style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', background: message.type === 'error' ? 'var(--danger-bg)' : 'var(--success-bg)', color: message.type === 'error' ? 'var(--danger)' : 'var(--success)', border: `1px solid ${message.type === 'error' ? 'var(--danger)' : 'var(--success)'}` }}>
          {message.text}
        </div>
      )}

      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        {/* Profile Header */}
        <div style={{ padding: '32px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '24px', position: 'relative' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
            {getInitials(profile?.username)}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{profile?.username}</h2>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={16} /> {profile?.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}><User size={16} /> {profile?.role}</span>
            </div>
          </div>
          
          {!isEditing && (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)} style={{ position: 'absolute', right: '32px', top: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Details Form/View */}
        <div style={{ padding: '32px' }}>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                <textarea name="bio" placeholder=" " value={formData.bio} onChange={handleInputChange} rows="4" style={{ width: '100%', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                <label style={{ top: '24px' }}>About Me (Bio)</label>
              </div>

              {role === 'Freelancer' && (
                <>
                  <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                    <Briefcase size={18} className="input-icon" />
                    <input type="text" name="skills" placeholder=" " value={formData.skills} onChange={handleInputChange} />
                    <label>Skills (comma separated)</label>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div className="form-group floating-label">
                      <Clock size={18} className="input-icon" />
                      <input type="text" name="experience" placeholder=" " value={formData.experience} onChange={handleInputChange} />
                      <label>Experience (e.g. 3 years)</label>
                    </div>
                    <div className="form-group floating-label">
                      <DollarSign size={18} className="input-icon" />
                      <input type="number" name="hourlyRate" placeholder=" " value={formData.hourlyRate} onChange={handleInputChange} />
                      <label>Hourly Rate ($)</label>
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(false); fetchProfile(); }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>About Me</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{profile?.profile?.bio || 'No bio provided.'}</p>
              </div>
              
              {role === 'Freelancer' && (
                <>
                  <div>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profile?.profile?.skills?.length > 0 ? (
                        profile.profile.skills.map((skill, index) => (
                          <span key={index} style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', color: 'var(--text-primary)' }}>
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>No skills listed.</span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Experience</div>
                      <div style={{ fontSize: '18px', fontWeight: '600' }}>{profile?.profile?.experience || 'Not specified'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Hourly Rate</div>
                      <div style={{ fontSize: '18px', fontWeight: '600' }}>{profile?.profile?.hourlyRate ? `$${profile.profile.hourlyRate}/hr` : 'Not specified'}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
