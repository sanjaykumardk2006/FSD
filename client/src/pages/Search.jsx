import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import apiClient from '../utils/apiClient';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import AnimatedButton from '../components/AnimatedButton';
export const Search = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get('/jobs/all');
        // response.data contains { jobs: [...] }
        setJobs(response.data.jobs || []);
      } catch {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <Header />
      <main>
        <section className="content-section" style={{ padding: '40px 24px', margin: '0 auto', maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Find Work</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Browse and apply to the latest projects posted by clients</p>
          </div>

          <div style={{ marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
            <input 
              type="text" 
              placeholder="Search projects by title or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '16px 24px', fontSize: '16px', borderRadius: '50px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading projects...</div>
          ) : error ? (
            <div className="message error" style={{ textAlign: 'center' }}>{error}</div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No projects found matching your search.</div>
          ) : (
            <motion.div 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '24px' }}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            >
              {filteredJobs.map(job => (
                <motion.div key={job._id} className="job-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} style={{ display: 'flex', flexDirection: 'column', padding: '24px', cursor: 'pointer', margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '20px', margin: '0', color: 'var(--text-primary)', flex: 1 }}>{job.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
                    {job.description?.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {job.requiredSkills?.map((skill, i) => (
                      <span key={i} style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{skill}</span>
                    ))}
                  </div>
                  <AnimatedButton 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '15px' }} 
                    onClick={() => {
                      if (user) {
                        navigate(user.role === 'Client' ? '/client-dashboard' : '/freelancer-dashboard?tab=jobs');
                      } else {
                        window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login', role: 'Freelancer' } }));
                      }
                    }}
                  >
                    View Details
                  </AnimatedButton>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
