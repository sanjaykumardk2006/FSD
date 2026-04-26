import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [projectId]);

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

      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
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
      console.error('Error updating progress:', error.response?.data?.message || error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const isFreelancer = user.id === project.freelancerId._id;

  return (
    <div className="page">
      <Header />
      <main className="content-container">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="project-details">
          <h1>{project.jobId?.title}</h1>
          <p>Status: {project.status}</p>
          <p>Budget: ${project.jobId?.budget}</p>

          <div className="project-team">
            <div>
              <h3>Client</h3>
              <p>{project.clientId?.username}</p>
            </div>
            <div>
              <h3>Freelancer</h3>
              <p>{project.freelancerId?.username}</p>
            </div>
          </div>

          {isFreelancer && (
            <div className="progress-section">
              <h3>Project Progress</h3>
              <button
                className="btn btn-primary"
                onClick={() => setShowProgressForm(!showProgressForm)}
              >
                {showProgressForm ? 'Cancel' : 'Add Progress Update'}
              </button>

              {showProgressForm && (
                <form onSubmit={handleAddProgress} className="progress-form">
                  <div className="form-group">
                    <label htmlFor="stage">Stage</label>
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
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Progress
                  </button>
                </form>
              )}

              <div className="progress-list">
                {project.progress.map((prog, index) => (
                  <div key={index} className="progress-item">
                    <h4>{prog.stage}</h4>
                    <p>{prog.description}</p>
                    <small>{new Date(prog.updatedAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="chat-section">
          <h3>Messages</h3>
          <div className="messages-container">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`message ${msg.senderId._id === user.id ? 'sent' : 'received'}`}
              >
                <strong>{msg.senderId?.username}:</strong>
                <p>{msg.message}</p>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              required
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
