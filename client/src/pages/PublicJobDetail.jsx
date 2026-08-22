import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Clock, DollarSign, Calendar, ArrowLeft, Briefcase, Share2 } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';

export const PublicJobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await apiClient.get(`/jobs/${jobId}`);
        setJob(response.data.job);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = () => {
    if (user) {
      if (user.role === 'Freelancer') {
        navigate(`/freelancer-dashboard?tab=jobs`);
      } else {
        // Clients can't apply to jobs
        navigate(`/client-dashboard`);
      }
    } else {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'signup', role: 'Freelancer' } }));
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div>Loading project details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="page">
        <Header />
        <main style={{ padding: '60px 24px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Project Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{error || "The project you're looking for doesn't exist or has been removed."}</p>
          <Link to="/search" className="btn btn-primary">Browse Other Projects</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Formatting date
  const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="page">
      {/* Dynamic SEO Meta Tags */}
      <SEO 
        title={`${job.title} - Freelance Job`}
        description={job.description.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
        type="article"
      />

      <Header />
      <main style={{ background: 'var(--bg-primary)', paddingBottom: '80px' }}>
        {/* Breadcrumb / Back button */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <button onClick={() => navigate('/search')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '15px' }}>
            <ArrowLeft size={16} /> Back to Search
          </button>
        </div>

        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '32px', margin: 0, color: 'var(--text-primary)', lineHeight: '1.3' }}>{job.title}</h1>
                <AnimatedButton onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', color: 'var(--text-primary)', flexShrink: 0 }}>
                  <Share2 size={16} /> {copySuccess ? copySuccess : 'Share'}
                </AnimatedButton>
              </div>
              
              <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> Posted on {postedDate}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {job.status}</div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Description</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                  {job.description}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Required Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {job.requiredSkills?.map((skill, i) => (
                    <span key={i} style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                  {job.clientId?.username?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Client</h4>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{job.clientId?.username || 'Unknown'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <DollarSign size={20} style={{ color: 'var(--text-secondary)', marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '16px', color: 'var(--text-primary)' }}>${job.budget}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Fixed Budget</div>
                  </div>
                </div>
              </div>

              <AnimatedButton 
                onClick={handleApply} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', fontWeight: '600', textAlign: 'center' }}
              >
                {user ? (user.role === 'Freelancer' ? 'Apply Now' : 'View as Client') : 'Log in to Apply'}
              </AnimatedButton>
              
              {!user && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginTop: '16px', marginBottom: 0 }}>
                  Already have an account? <span onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login', role: 'Freelancer' } }))} style={{ color: 'var(--primary-action)', cursor: 'pointer' }}>Log in</span>
                </p>
              )}
            </div>
          </div>
          
        </section>
      </main>
      <Footer />
    </div>
  );
};
