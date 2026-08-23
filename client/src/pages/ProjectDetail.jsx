import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Send, Edit2, Trash2, Check, X, Clock, MapPin, DollarSign, Briefcase, Star } from 'lucide-react';

import AnimatedButton from '../components/AnimatedButton';
export const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [progressData, setProgressData] = useState({
    stage: '',
    description: '',
  });
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Review State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchProject();
    fetchMessages();
    checkReviewStatus();

    // Setup Socket.io connection
    let SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    SOCKET_URL = SOCKET_URL.replace('/api', '');
    
    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit('join_project', projectId);

    socketRef.current.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on('edit_message', (updatedMessage) => {
      setMessages((prev) => 
        prev.map(msg => msg._id === updatedMessage._id ? updatedMessage : msg)
      );
    });

    socketRef.current.on('delete_message', ({ messageId }) => {
      setMessages((prev) => prev.filter(msg => msg._id !== messageId));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [projectId]);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchProject = async () => {
    try {
      const response = await apiClient.get(`/projects/${projectId}`);
      setProject(response.data.project);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await apiClient.get(`/messages/${projectId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const checkReviewStatus = async () => {
    try {
      const response = await apiClient.get(`/reviews/project/${projectId}`);
      const reviews = response.data.reviews || [];
      const myReview = reviews.find(r => r.reviewerId?._id === user.id || r.reviewerId === user.id);
      if (myReview) setHasReviewed(true);
    } catch (error) {
      console.error('Error fetching review status:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      alert("Please select a rating.");
      return;
    }
    try {
      const revieweeId = user.id === project.clientId._id ? project.freelancerId._id : project.clientId._id;
      await apiClient.post('/reviews/submit', {
        projectId,
        revieweeId,
        rating: reviewRating,
        comment: reviewComment
      });
      setHasReviewed(true);
      setShowReviewModal(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const receiverId =
        user.id === project.clientId._id
          ? project.freelancerId._id
          : project.clientId._id;

      await apiClient.post('/messages/send', {
        projectId,
        receiverId,
        message: newMessage,
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEditMessage = async (e) => {
    e.preventDefault();
    if (!editMessageText.trim()) return;
    
    try {
      await apiClient.put(`/messages/${editingMessageId}`, {
        message: editMessageText
      });
      setEditingMessageId(null);
      setEditMessageText('');
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await apiClient.delete(`/messages/${messageId}`);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`/projects/${projectId}/progress`, progressData);
      setShowProgressForm(false);
      setProgressData({ stage: '', description: '' });
      fetchProject();
    } catch (error) {
      alert('Error updating progress: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Workspace...</div>;
  if (!project) return <div style={{ padding: '40px', textAlign: 'center' }}>Project not found</div>;

  const isFreelancer = user.id === project.freelancerId._id;
  const otherUser = isFreelancer ? project.clientId : project.freelancerId;

  return (
    <DashboardLayout role={user.role}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', gap: '24px' }}>
        
        {/* Workspace Header */}
        <div className="chat-workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-action-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'var(--primary-action)', fontWeight: 'bold' }}>
              {otherUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{project.jobId?.title}</h2>
              <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', alignItems: 'center' }}>
                <span>{otherUser.username}</span>
                <span>•</span>
                <span className="status-badge" style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '11px', background: project.status === 'Completed' ? 'var(--success-bg)' : 'var(--primary-action-bg)', color: project.status === 'Completed' ? 'var(--success)' : 'var(--primary-action)' }}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          <div className="responsive-flex-wrap" style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'flex-end' }}>
            {project.status === 'Completed' && !hasReviewed && (
              <AnimatedButton className="btn btn-primary btn-responsive-full" onClick={() => setShowReviewModal(true)} style={{ background: 'var(--success)', border: 'none', color: '#fff' }}>
                <Star size={16} fill="white" /> Leave Review
              </AnimatedButton>
            )}
            <AnimatedButton className="btn btn-secondary btn-responsive-full" onClick={() => setShowProgressForm(true)}>Project Milestones</AnimatedButton>
            <AnimatedButton className="btn btn-primary btn-responsive-full" onClick={() => navigate(-1)}>Back</AnimatedButton>
          </div>
        </div>

        {/* Chat Interface */}
        <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px' }}>Project Discussion</h3>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></div> Real-time connection
            </span>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-primary)' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                Start the conversation with {otherUser.username}!
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = msg.senderId?._id === user.id;
                
                if (msg.isSystemMessage) {
                  return (
                    <div key={msg._id} style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                      <span style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px' }}>
                        {msg.message} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={msg._id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start', margin: '4px 0' }}>
                    <div className="chat-message-bubble" style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flexDirection: isMine ? 'row-reverse' : 'row', maxWidth: '75%' }}>
                      
                      {!isMine && (
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-action-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--primary-action)', flexShrink: 0 }}>
                          {msg.senderId?.username.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div style={{ 
                        background: isMine ? 'var(--primary-action)' : 'var(--bg-card)', 
                        color: isMine ? '#FFF' : 'var(--text-primary)',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        borderBottomRightRadius: isMine ? '4px' : '16px',
                        borderBottomLeftRadius: !isMine ? '4px' : '16px',
                        border: isMine ? 'none' : '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-sm)',
                        position: 'relative',
                        group: 'true' // for hover targeting
                      }}
                      onMouseEnter={(e) => {
                        const actions = e.currentTarget.querySelector('.msg-actions');
                        if(actions) actions.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        const actions = e.currentTarget.querySelector('.msg-actions');
                        if(actions) actions.style.opacity = '0';
                      }}
                      >
                        {editingMessageId === msg._id ? (
                          <form onSubmit={handleEditMessage} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              value={editMessageText} 
                              onChange={(e) => setEditMessageText(e.target.value)}
                              autoFocus
                              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                            />
                            <AnimatedButton type="submit" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Check size={16} /></AnimatedButton>
                            <AnimatedButton type="button" onClick={() => setEditingMessageId(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={16} /></AnimatedButton>
                          </form>
                        ) : (
                          <>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>{msg.message}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                              <span style={{ fontSize: '11px', color: isMine ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                                {msg.isEdited && <span style={{ fontStyle: 'italic', marginRight: '4px' }}>(edited)</span>}
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            {isMine && editingMessageId !== msg._id && (
                              <div className="msg-actions" style={{ position: 'absolute', top: '50%', left: '-60px', transform: 'translateY(-50%)', display: 'flex', gap: '4px', opacity: 0, transition: 'opacity 0.2s', background: 'var(--bg-card)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <AnimatedButton onClick={() => { setEditingMessageId(msg._id); setEditMessageText(msg.message); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}><Edit2 size={14} /></AnimatedButton>
                                <AnimatedButton onClick={() => handleDeleteMessage(msg._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--danger)' }}><Trash2 size={14} /></AnimatedButton>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '20px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
            <form className="chat-input-form" onSubmit={handleSendMessage} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                required
                style={{ flex: 1, width: '100%', padding: '16px 20px', borderRadius: '30px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-action)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
              <AnimatedButton type="submit" className="btn btn-primary" style={{ padding: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', flexShrink: 0 }}>
                <Send size={20} />
              </AnimatedButton>
            </form>
          </div>

        </div>

      </div>

      {/* Progress/Milestones Modal */}
      {showProgressForm && (
        <div className="modal-overlay" style={{ zIndex: 10000 }}>
          <div className="modal" style={{ maxWidth: '600px', width: '95%' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', margin: 0 }}>Project Milestones</h2>
              <AnimatedButton className="close-modal-btn" style={{ position: 'relative', top: 0, right: 0 }} onClick={() => setShowProgressForm(false)}>
                <X size={20} />
              </AnimatedButton>
            </div>

            <div style={{ padding: '24px', maxHeight: '50vh', overflowY: 'auto' }}>
              {project.progress.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0' }}>No milestones recorded yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {project.progress.map((prog, index) => (
                    <div key={index} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--primary-action)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '16px', margin: 0 }}>{prog.stage}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(prog.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>{prog.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isFreelancer && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Add New Milestone</h3>
                <form onSubmit={handleAddProgress}>
                  <div className="form-group floating-label">
                    <input type="text" placeholder=" " value={progressData.stage} onChange={(e) => setProgressData({ ...progressData, stage: e.target.value })} required style={{ background: 'var(--bg-card)' }} />
                    <label>Milestone Title</label>
                  </div>
                  <div className="form-group floating-label" style={{ marginBottom: '24px' }}>
                    <textarea placeholder=" " value={progressData.description} onChange={(e) => setProgressData({ ...progressData, description: e.target.value })} rows="3" required style={{ width: '100%', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', fontSize: '15px' }}></textarea>
                    <label style={{ top: '24px' }}>Description</label>
                  </div>
                  <AnimatedButton type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>Save Milestone</AnimatedButton>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <motion.div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', margin: 0 }}>Rate {otherUser.username}</h3>
              <AnimatedButton onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></AnimatedButton>
            </div>
            
            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>How was your experience working on this project?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star 
                        size={40} 
                        fill={(hoverRating || reviewRating) >= star ? 'var(--pending)' : 'none'} 
                        color={(hoverRating || reviewRating) >= star ? 'var(--pending)' : 'var(--text-muted)'} 
                        style={{ transition: 'all 0.2s' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Leave a comment (publicly visible)</label>
                <textarea 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe your experience..."
                  required
                  rows="4"
                  style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', outline: 'none', fontSize: '15px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <AnimatedButton type="button" className="btn btn-secondary" onClick={() => setShowReviewModal(false)} style={{ flex: 1 }}>Cancel</AnimatedButton>
                <AnimatedButton type="submit" className="btn btn-primary" style={{ flex: 1, background: 'var(--success)', border: 'none', color: '#fff' }}>Submit Review</AnimatedButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};
