import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../App.css';

export const Home = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach((section) => {
      if (section) {
        section.style.opacity = '0';
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <Header />
      <main>
        {/* Two-Column Hero Section */}
        <section className="hero-modern" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', padding: '100px 0', minHeight: '80vh' }}>
          <div className="hero-left" style={{ textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '100px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'block' }}></span>
              Freelancer Marketplace v2.0
            </div>
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em' }}>
              The premium <br/><span style={{ color: 'var(--accent-primary)' }}>talent network</span> for modern teams.
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
              Connect with top-tier freelancers and build your next big idea. Secure, fast, and built for production-scale collaboration.
            </p>
            <div className="hero-buttons" style={{ justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Hire Talent
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Find Work
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: '700' }}>10k+</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Active Users</p>
              </div>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: '700' }}>$5M+</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Paid to Talent</p>
              </div>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: '700' }}>4.9/5</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Client Rating</p>
              </div>
            </div>
          </div>
          <div className="hero-right" style={{ position: 'relative' }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              {/* Dashboard Preview Mockup */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.1)' }}>
                {/* Mockup Header */}
                <div style={{ height: '50px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }}></div>
                </div>
                {/* Mockup Body */}
                <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', height: 'calc(100% - 50px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '32px', background: '#F3F4F6', borderRadius: '6px' }}></div>
                    <div style={{ height: '32px', background: '#F9FAFB', borderRadius: '6px' }}></div>
                    <div style={{ height: '32px', background: '#F9FAFB', borderRadius: '6px' }}></div>
                    <div style={{ height: '32px', background: '#F9FAFB', borderRadius: '6px' }}></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ height: '100px', flex: 1, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), transparent)', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                      <div style={{ height: '100px', flex: 1, background: '#F9FAFB', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                    </div>
                    <div style={{ flex: 1, background: '#F9FAFB', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div style={{ position: 'absolute', top: '10%', right: '-5%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', animation: 'fadeInUp 1s ease-out 0.5s backwards' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34,197,94,0.2)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>✓</div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '14px' }}>Project Delivered</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Just now</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Built for performance and reliability</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>🔒</div>
              <h3>Secure Escrow</h3>
              <p>Your funds are held safely until the work is reviewed and approved by you.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>⚡</div>
              <h3>Real-time Sync</h3>
              <p>Communicate instantly with your team. Zero delays, perfect synchronization.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>⭐</div>
              <h3>Verified Talent</h3>
              <p>Every freelancer passes a strict vetting process to ensure top-tier quality.</p>
            </div>
          </div>
        </section>

        {/* Top Talent */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Top Rated Freelancers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {['Alex Chen', 'Sarah Miller', 'David Kim', 'Emma Watson'].map((name, i) => (
              <div className="card" key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F3F4F6', marginBottom: '16px' }}></div>
                <h3 style={{ marginBottom: '4px' }}>{name}</h3>
                <p style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>Expert Developer</p>
                <button className="btn btn-secondary" style={{ width: '100%' }}>View Profile</button>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Zigzag */}
        <section className="content-section zigzag-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ marginBottom: '80px' }}>Streamlined Workflow</h2>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image">
                <div style={{ width: '100%', height: '300px', background: '#F9FAFB', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dashboard Preview</span>
                </div>
              </div>
              <div className="zigzag-content">
                <h3>Post a Project in seconds</h3>
                <p>Our intuitive job posting flow ensures you capture exactly what you need. Let our AI matching system instantly connect you with the right professionals.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content">
                <h3>Collaborate seamlessly</h3>
                <p>Manage everything in one place. Built-in chat, milestone tracking, and secure file sharing make project management effortless.</p>
              </div>
              <div className="zigzag-image">
                <div style={{ width: '100%', height: '300px', background: '#F9FAFB', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Workspace Preview</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Slogan */}
        <section className="slogan-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Ready to Scale Your Business?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 40px' }}>Join thousands of modern teams building the future with our premium talent network. No credit card required to start.</p>
          <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '16px 32px', fontSize: '16px' }}>
            Get Started Now
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
