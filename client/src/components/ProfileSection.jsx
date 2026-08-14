import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../utils/apiClient';
import { User, Mail, Briefcase, Clock, FileText, Edit2, Save, X, Building, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfileSection = ({ role }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeProfileDetail, setActiveProfileDetail] = useState(null);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const availableSkills = ["React", "Node.js", "Python", "Figma", "AWS", "SEO", "Copywriting", "UI Design", "TypeScript", "Docker", "GraphQL", "TailwindCSS", "Next.js", "MongoDB"];
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    experience: '',
    resume: '',
    profileImage: '',
    companyName: '',
    entityType: 'Self-employed',
    country: '',
    mobileNumber: ''
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
        setFormData({
          bio: userData.profile?.bio || '',
          skills: userData.profile?.skills || [],
          experience: userData.profile?.experience || '',
          resume: userData.profile?.resume || '',
          profileImage: userData.profile?.profileImage || '',
          companyName: userData.companyName || '',
          entityType: userData.entityType || 'Self-employed',
          country: userData.country || '',
          mobileNumber: userData.mobileNumber || ''
        });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showMessage('error', 'Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showMessage('error', 'Resume size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, resume: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bio: formData.bio,
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        experience: formData.experience,
        resume: formData.resume,
        profileImage: formData.profileImage,
        companyName: formData.companyName,
        entityType: formData.entityType,
        country: formData.country,
        mobileNumber: formData.mobileNumber
      };
      
      const response = await apiClient.put('/auth/profile', payload);
      setProfile(response.data.user);
      updateUser(response.data.user);
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
          <div style={{ position: 'relative' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', overflow: 'hidden' }}>
              {(isEditing ? formData.profileImage : profile?.profile?.profileImage) ? (
                <img src={isEditing ? formData.profileImage : profile?.profile?.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                getInitials(profile?.username)
              )}
            </div>
            {isEditing && (
              <label style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Edit2 size={12} color="var(--text-primary)" />
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{profile?.username}</h2>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button onClick={() => setActiveProfileDetail(activeProfileDetail === 'email' ? null : 'email')} style={{ background: 'transparent', border: 'none', color: activeProfileDetail === 'email' ? 'var(--primary-action)' : 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} title="Show Email">
                <Mail size={18} />
              </button>
              <button onClick={() => setActiveProfileDetail(activeProfileDetail === 'role' ? null : 'role')} style={{ background: 'transparent', border: 'none', color: activeProfileDetail === 'role' ? 'var(--primary-action)' : 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} title="Show Role">
                <User size={18} />
              </button>
            </div>
            
            {activeProfileDetail && (
              <div style={{ background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px', width: 'fit-content' }}>
                {activeProfileDetail === 'email' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} style={{ color: 'var(--primary-action)' }} /> <span>{profile?.email || 'No email provided'}</span>
                  </div>
                )}
                {activeProfileDetail === 'role' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={14} style={{ color: 'var(--primary-action)' }} /> <span style={{ textTransform: 'capitalize' }}>{profile?.role === 'Client' ? 'Customer' : profile?.role}</span>
                  </div>
                )}
              </div>
            )}
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
                <FileText size={18} className="input-icon" style={{ top: '24px' }} />
                <textarea name="bio" placeholder=" " value={formData.bio} onChange={handleInputChange} rows="4" style={{ width: '100%', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '15px' }}></textarea>
                <label style={{ top: '24px' }}>About Me (Bio)</label>
              </div>

              {role === 'Client' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group floating-label">
                    <Building size={18} className="input-icon" />
                    <input type="text" name="companyName" placeholder=" " value={formData.companyName} onChange={handleInputChange} />
                    <label>Company Name</label>
                  </div>
                  <div className="form-group floating-label">
                    <Building size={18} className="input-icon" />
                    <select name="entityType" value={formData.entityType} onChange={handleInputChange}>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Company">Company</option>
                    </select>
                    <label>Entity Type</label>
                  </div>
                  <div className="form-group floating-label">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" name="country" placeholder=" " value={formData.country} onChange={handleInputChange} />
                    <label>Country</label>
                  </div>
                  <div className="form-group floating-label">
                    <Phone size={18} className="input-icon" />
                    <input type="text" name="mobileNumber" placeholder=" " value={formData.mobileNumber} onChange={handleInputChange} />
                    <label>Mobile Number</label>
                  </div>
                </div>
              )}

              {role === 'Freelancer' && (
                <>
                  <div className="form-group" style={{ position: 'relative', marginBottom: '24px' }}>
                    <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Skills</label>
                    <div 
                      onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
                      style={{ width: '100%', padding: '12px', minHeight: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}
                    >
                      {(!formData.skills || formData.skills.length === 0) && <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} /> Select skills...</span>}
                      {formData.skills && formData.skills.map(skill => (
                        <span key={skill} style={{ background: 'var(--primary-action)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {skill}
                          <span 
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setFormData({...formData, skills: formData.skills.filter(s => s !== skill)}); 
                            }}
                          >
                            <X size={12} />
                          </span>
                        </span>
                      ))}
                    </div>
                    
                    {isSkillsDropdownOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', zIndex: 50, maxHeight: '200px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px', boxShadow: 'var(--shadow-md)' }}>
                        {availableSkills.map(skill => (
                          <div 
                            key={skill} 
                            onClick={() => {
                              const currentSkills = formData.skills || [];
                              const isSelected = currentSkills.includes(skill);
                              let newSkills = [...currentSkills];
                              if (isSelected) {
                                newSkills = newSkills.filter(s => s !== skill);
                              } else {
                                newSkills.push(skill);
                              }
                              setFormData({...formData, skills: newSkills});
                            }}
                            style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${(formData.skills || []).includes(skill) ? 'var(--primary-action)' : 'var(--border-color)'}`, background: (formData.skills || []).includes(skill) ? 'var(--primary-action-bg)' : 'transparent', color: (formData.skills || []).includes(skill) ? 'var(--primary-action)' : 'var(--text-primary)', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div className="form-group floating-label">
                      <Clock size={18} className="input-icon" />
                      <input type="text" name="experience" placeholder=" " value={formData.experience} onChange={handleInputChange} />
                      <label>Experience (e.g. 3 years)</label>
                    </div>
                    <div className="form-group floating-label">
                      <FileText size={18} className="input-icon" />
                      <input type="file" name="resume" onChange={handleResumeChange} accept=".pdf,.doc,.docx" style={{ padding: '16px 16px 16px 40px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', width: '100%' }} />
                      <label>Resume (PDF, DOC)</label>
                      {formData.resume && <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>Resume selected/uploaded.</div>}
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
              
              {role === 'Client' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Company Name</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{profile?.companyName || 'Not specified'}</div>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Entity Type</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{profile?.entityType || 'Self-employed'}</div>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Country</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{profile?.country || 'Not specified'}</div>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Mobile Number</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{profile?.mobileNumber || 'Not specified'}</div>
                  </div>
                </div>
              )}
              
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
                      <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>Resume</div>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>
                        {profile?.profile?.resume ? (
                          <a href={profile.profile.resume} download="resume" style={{ color: 'var(--primary-action)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FileText size={16} /> View/Download Resume
                          </a>
                        ) : (
                          'Not uploaded'
                        )}
                      </div>
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
