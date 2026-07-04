import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <Header />
      <main>
        {/* Vision Section */}
        <section className="hero-modern" style={{ padding: '100px 20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '24px', margin: '40px 0', border: '1px solid var(--border-color)' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-primary)' }}>
            Redefining the Future of <span style={{ color: 'var(--accent-primary)' }}>Remote Work</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            We believe the freelance economy is broken. We are here to fix it by eliminating exorbitant platform fees, cutting through administrative bloat, and putting an end to the race-to-the-bottom bidding wars. We empower true professionals to connect with companies that value quality and transparency above all else.
          </p>
        </section>

        {/* Core Pillars */}
        <section className="content-section" style={{ padding: '60px 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '36px' }}>Our Core Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '40px 30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Integrity & Security</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We prioritize the safety of our users with robust escrow systems, transparent contracts, and strict data protection policies.</p>
            </div>
            
            <div style={{ background: 'var(--bg-card)', padding: '40px 30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Quality Over Quantity</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We curate our talent pool and client base carefully. We would rather have 100 excellent matches than 10,000 mediocre ones.</p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '40px 30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Global Collaboration</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Great ideas have no borders. We build the tools necessary for seamless collaboration across any timezone and culture.</p>
            </div>
          </div>
        </section>

        {/* Company Profile & Team */}
        <section className="content-section" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Who We Are</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Founded in 2023, Freelancer Hub is a specialized technology brand built by engineers, for engineers and visionary businesses. We are a small, highly technical team obsessed with creating the perfect remote work ecosystem.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Team Member 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid var(--bg-secondary)' }}>
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="Founder 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Alex Chen</h3>
              <p style={{ color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '12px' }}>Co-Founder & CEO</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>Former Senior Engineering Manager with 10+ years scaling distributed systems and managing remote teams.</p>
            </div>

            {/* Team Member 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid var(--bg-secondary)' }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" alt="Founder 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Sarah Jenkins</h3>
              <p style={{ color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '12px' }}>Co-Founder & CTO</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>Systems architect passionate about blockchain escrow solutions and AI-driven matching algorithms.</p>
            </div>

            {/* Team Member 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid var(--bg-secondary)' }}>
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" alt="Founder 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>David Okoye</h3>
              <p style={{ color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '12px' }}>Head of Product</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>UX expert dedicated to creating frictionless workflows for both clients and freelancers.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
