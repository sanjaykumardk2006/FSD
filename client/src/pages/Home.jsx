import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../App.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-modern" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', padding: '100px 0', minHeight: '80vh' }}>
          <div className="hero-left" style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Connect with Elite Global Talent. <span style={{ color: 'var(--accent-primary)' }}>Scale Faster.</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
              Work with verified professionals, manage projects with zero friction, and enjoy the peace of mind of secure escrow payments.
            </p>
            <div className="hero-buttons" style={{ justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Find Talent
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Earn as a Freelancer
              </button>
            </div>
          </div>
          <div className="hero-right" style={{ position: 'relative' }}>
            {/* Dashboard Preview / Visual Asset Placeholder */}
            <div style={{ width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Dashboard Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top right, rgba(59,130,246,0.2), transparent)' }}></div>
            </div>
          </div>
        </section>

        {/* Trust Metrics Strip */}
        <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '40px 0', margin: '0 -20px 80px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '1200px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>$50M+</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '16px' }}>Paid to Freelancers</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>99.4%</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '16px' }}>Job Success Rate</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>10k+</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '16px' }}>Verified Projects</p>
            </div>
          </div>
        </section>

        {/* Dual-Value Proposition */}
        <section className="content-section">
          <h2 style={{ fontSize: '36px', marginBottom: '60px', textAlign: 'center' }}>A Platform Built for Everyone</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* For Clients */}
            <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '28px', color: 'var(--accent-primary)', marginBottom: '24px' }}>For Clients</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>✅</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Vetted Talent</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Access a curated pool of top-tier professionals who have passed rigorous quality checks.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🛡️</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Secure Escrow</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Your funds are protected and only released when you are 100% satisfied with the work.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>⚡</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Instant Match</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Our intelligent algorithms connect you with the perfect freelancer in minutes, not days.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* For Freelancers */}
            <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '24px' }}>For Freelancers</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>💼</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Top-Tier Contracts</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Work with premium clients on high-value projects that challenge and grow your skills.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>💰</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Guaranteed Payouts</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Never chase an invoice again. Escrow ensures you get paid for every completed milestone.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>📉</span>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Low Platform Fees</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Keep more of what you earn with transparent, highly competitive fee structures.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="content-section" style={{ marginTop: '100px', marginBottom: '100px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Explore Popular Categories</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Find exactly what you need from our massive talent pool</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Web & Software Development', icon: '💻', desc: 'Full-stack engineers, frontend wizards, and robust backend architects.' },
              { title: 'UI/UX Design', icon: '🎨', desc: 'Creative designers crafting intuitive, beautiful user experiences.' },
              { title: 'AI & Machine Learning', icon: '🤖', desc: 'Data scientists and AI engineers building the future of tech.' },
              { title: 'Data & Analytics', icon: '📊', desc: 'Analysts and data engineers turning raw data into actionable insights.' }
            ].map((cat, i) => (
              <div className="card" key={i} style={{ padding: '32px 24px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)' }}>{cat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
