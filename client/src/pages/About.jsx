import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-modern" style={{ padding: '120px 20px', textAlign: 'center', background: '#F9FAFB', borderRadius: '24px', margin: '40px 0' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px' }}>Building the <span style={{ color: 'var(--accent-primary)' }}>Future of Work</span></h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>We are on a mission to connect the world's most ambitious companies with the best talent, anywhere.</p>
        </section>

        {/* Our Mission & Vision */}
        <section className="content-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <h2 style={{ textAlign: 'left', fontSize: '32px', marginBottom: '20px' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace where skills meet opportunities. We believe that talent is equally distributed globally, but opportunity is not. Our goal is to bridge that gap.</p>
            </div>
            <div>
              <h2 style={{ textAlign: 'left', fontSize: '32px', marginBottom: '20px' }}>Our Vision</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>To be the world's leading platform connecting talented professionals with meaningful projects. We envision a world where anyone, anywhere, can build a successful career on their own terms, and companies can scale infinitely.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="content-section" style={{ background: '#F3F4F6', padding: '80px', borderRadius: '24px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '40px' }}>Our Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '40px', color: 'var(--accent-primary)' }}>2018</h3>
              <p style={{ fontWeight: 'bold' }}>Founded</p>
            </div>
            <div>
              <h3 style={{ fontSize: '40px', color: 'var(--accent-primary)' }}>150+</h3>
              <p style={{ fontWeight: 'bold' }}>Countries</p>
            </div>
            <div>
              <h3 style={{ fontSize: '40px', color: 'var(--accent-primary)' }}>500</h3>
              <p style={{ fontWeight: 'bold' }}>Employees</p>
            </div>
            <div>
              <h3 style={{ fontSize: '40px', color: 'var(--accent-primary)' }}>$1B+</h3>
              <p style={{ fontWeight: 'bold' }}>Earnings</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="content-section">
          <h2>Our Journey</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { year: '2018', title: 'The Beginning', desc: 'Founded in a small garage in San Francisco with a vision to change how people work.' },
              { year: '2019', title: 'Seed Funding', desc: 'Raised $5M in seed funding to build out the core marketplace platform.' },
              { year: '2021', title: 'Global Expansion', desc: 'Opened offices in London and Singapore, reaching 1M active users.' },
              { year: '2023', title: 'Enterprise Launch', desc: 'Launched Freelancer Hub Enterprise to support Fortune 500 companies.' },
              { year: '2026', title: 'AI Integration', desc: 'Introduced smart AI matching, revolutionizing the hiring process.' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '40px', marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '32px', color: 'var(--accent-primary)', minWidth: '100px' }}>{item.year}</h3>
                <div>
                  <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="content-section">
          <h2>Leadership Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { name: 'Sarah Jenkins', role: 'Chief Executive Officer' },
              { name: 'Michael Chang', role: 'Chief Technology Officer' },
              { name: 'Elena Rodriguez', role: 'Chief Operating Officer' },
              { name: 'David Smith', role: 'Head of Product' },
              { name: 'Lisa Wang', role: 'Head of Design' },
              { name: 'James Wilson', role: 'Head of Engineering' }
            ].map((leader, i) => (
              <div className="card" key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#F3F4F6', margin: '0 auto 20px' }}></div>
                <h3 style={{ fontSize: '20px' }}>{leader.name}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{leader.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="content-section">
          <h2>Our Core Values</h2>
          <div className="cards-grid">
            <div className="card">
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🤝</div>
              <h3>Trust First</h3>
              <p>We build everything on a foundation of trust, transparency, and integrity.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🚀</div>
              <h3>Move Fast</h3>
              <p>We iterate quickly, learn from mistakes, and continuously improve.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🌍</div>
              <h3>Global Mindset</h3>
              <p>We embrace diversity and build for a borderless world.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>💡</div>
              <h3>Think Big</h3>
              <p>We tackle hard problems and aren't afraid to disrupt the status quo.</p>
            </div>
          </div>
        </section>

        {/* Global Offices */}
        <section className="content-section" style={{ background: '#F9FAFB', padding: '80px 40px', borderRadius: '24px' }}>
          <h2>Our Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>San Francisco</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Global Headquarters</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>London</h3>
              <p style={{ color: 'var(--text-secondary)' }}>European Hub</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>Singapore</h3>
              <p style={{ color: 'var(--text-secondary)' }}>APAC Hub</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="slogan-section" style={{ margin: '80px auto 40px' }}>
          <h2>Join Our Team</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 40px' }}>We are always looking for talented individuals to join our mission. Check out our open roles.</p>
          <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '50px' }}>
            View Careers
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
