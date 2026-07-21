import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

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
  const [notification, setNotification] = useState({ type: '', text: '' });
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const showNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: '', text: '' }), 3000);
  };

  useEffect(() => {
    fetchProject();
    fetchMessages();

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

      // The backend emits 'receive_message' which we listen to, so we don't need to fetchMessages() manually
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
      showNotification('error', 'Failed to edit message');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await apiClient.delete(`/messages/${messageId}`);
    } catch (error) {
      console.error('Error deleting message:', error);
      showNotification('error', 'Failed to delete message');
    }
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`/projects/${projectId}/progress`, progressData);
      showNotification('success', 'Progress updated!');
      setShowProgressForm(false);
      setProgressData({ stage: '', description: '' });
      fetchProject();
    } catch (error) {
      showNotification('error', 'Error updating progress: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const isFreelancer = user.id === project.freelancerId._id;

  return (
    <div className="page">
      <Header />
      <main className="content-container">
        <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
          ← Back
        </button>

        <motion.div 
          className="project-header-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-card-top" style={{ justifyContent: 'flex-end' }}>
            <span className={`status-badge ${project.status.toLowerCase()}`}>
              {project.status}
            </span>
          </div>

          {notification.text && (
            <div className={`message ${notification.type}`} style={{ marginBottom: '16px' }}>
              {notification.text}
            </div>
          )}
          
          <div className="header-card-main">
            <div className="header-info">
              <h1>{project.jobId?.title}</h1>
              <p className="budget-text">Budget: <strong>${project.jobId?.budget}</strong></p>
            </div>

            <div className="header-team">
              <div className="team-member">
                <span className="team-role">Client</span>
                <span className="team-name">{project.clientId?.username}</span>
              </div>
              <div className="team-member">
                <span className="team-role">Freelancer</span>
                <span className="team-name">{project.freelancerId?.username}</span>
              </div>
            </div>

            <div className="header-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowProgressForm(true)}
              >
                View / Update Progress
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress Modal */}
        {showProgressForm && (
          <div className="modal-overlay">
            <div className="modal progress-modal">
              <div className="modal-header">
                <h2>Project Progress</h2>
                <button className="btn-close" onClick={() => setShowProgressForm(false)}>✕</button>
              </div>

              <div className="progress-list">
                {project.progress.length === 0 ? (
                  <p className="no-progress">No progress updates yet.</p>
                ) : (
                  project.progress.map((prog, index) => (
                    <div key={index} className="progress-item">
                      <div className="progress-item-header">
                        <h4>{prog.stage}</h4>
                        <small>{new Date(prog.updatedAt).toLocaleDateString()}</small>
                      </div>
                      <p>{prog.description}</p>
                    </div>
                  ))
                )}
              </div>

              {isFreelancer && (
                <div className="add-progress-section">
                  <h3>Add Update</h3>
                  <form onSubmit={handleAddProgress} className="progress-form">
                    <div className="form-group">
                      <label htmlFor="stage">Stage / Title</label>
                      <input
                        type="text"
                        id="stage"
                        name="stage"
                        value={progressData.stage}
                        onChange={(e) =>
                          setProgressData({ ...progressData, stage: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={progressData.description}
                        onChange={(e) =>
                          setProgressData({ ...progressData, description: e.target.value })
                        }
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Submit Update
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        <motion.div 
          className="chat-section whatsapp-style-chat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="chat-header">
            <h3>Project Chat</h3>
            <span className="online-indicator">Real-time</span>
          </div>
          <div className="messages-container">
            {messages.map((msg) => (
              <React.Fragment key={msg._id}>
                {msg.isSystemMessage ? (
                  <div className="system-message-bubble">
                    <p>{msg.message}</p>
                    <span className="timestamp">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`chat-bubble-wrapper ${msg.senderId?._id === user.id ? 'sent' : 'received'}`}
                  >
                    {msg.senderId?._id === user.id && editingMessageId !== msg._id && (
                      <div className="message-actions">
                        <button onClick={() => {
                          setEditingMessageId(msg._id);
                          setEditMessageText(msg.message);
                        }} title="Edit Message">
                          ✏️
                        </button>
                        <button onClick={() => handleDeleteMessage(msg._id)} title="Delete Message">
                          🗑️
                        </button>
                      </div>
                    )}
                    
                    {editingMessageId === msg._id ? (
                      <form onSubmit={handleEditMessage} className="edit-message-form">
                        <input 
                          type="text" 
                          value={editMessageText} 
                          onChange={(e) => setEditMessageText(e.target.value)}
                          className="edit-chat-input"
                          autoFocus
                        />
                        <button type="submit" className="btn-save-edit">✓</button>
                        <button type="button" className="btn-cancel-edit" onClick={() => setEditingMessageId(null)}>✕</button>
                      </form>
                    ) : (
                      <div className="chat-bubble">
                        {msg.senderId?._id !== user.id && (
                          <strong className="sender-name">{msg.senderId?.username}</strong>
                        )}
                        <p>{msg.message}</p>
                        <span className="timestamp">
                          {msg.isEdited && <span className="edited-tag">(edited)</span>}
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              required
              className="chat-input"
            />
            <button type="submit" className="btn-send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};
