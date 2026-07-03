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
            <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <h2 style={{ textAlign: 'left', fontSize: '32px', marginBottom: '20px', color: 'white' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace where skills meet opportunities. We believe that talent is equally distributed globally, but opportunity is not. Our goal is to bridge that gap.</p>
            </div>
            <div style={{ background: 'white', border: '2px dashed var(--accent-primary)', padding: '40px', borderRadius: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--accent-primary)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>✨</div>
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

        {/* Values Map */}
        <section className="content-section" style={{ padding: '60px 20px', marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '80px', color: '#065F46', fontSize: '36px' }}>Our Core Values</h2>
          
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Map Path Line - Realistic Route */}
            <svg style={{ position: 'absolute', top: '50px', bottom: '50px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: 'calc(100% - 100px)', zIndex: -1 }} className="hide-on-mobile" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Route shadow/base */}
              <path d="M50,0 C 90,15 90,20 50,33.33 C 10,45 10,55 50,66.66 C 90,75 90,85 50,100" fill="none" stroke="#D1FAE5" strokeWidth="8" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              {/* Dashed map trail */}
              <path d="M50,0 C 90,15 90,20 50,33.33 C 10,45 10,55 50,66.66 C 90,75 90,85 50,100" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="8 12" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            </svg>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {/* Value 1: Left */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'right', paddingRight: '40px' }}>
                  <div style={{ color: '#10B981', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <h3 style={{ color: '#064E3B', fontSize: '24px', marginBottom: '12px' }}>Trust First</h3>
                  <p style={{ color: '#047857', fontSize: '16px' }}>We build everything on a foundation of trust, transparency, and integrity.</p>
                </div>
                {/* Map GPS Pin */}
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', background: '#10B981', borderRadius: '50%', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>

              {/* Value 2: Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'left', paddingLeft: '40px' }}>
                  <div style={{ color: '#10B981', marginBottom: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L13.5 2Z"></path><path d="M13 2v7h7"></path><path d="m10 13 4 4"></path><path d="m14 13-4 4"></path></svg>
                  </div>
                  <h3 style={{ color: '#064E3B', fontSize: '24px', marginBottom: '12px' }}>Move Fast</h3>
                  <p style={{ color: '#047857', fontSize: '16px' }}>We iterate quickly, learn from mistakes, and continuously improve.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', background: '#10B981', borderRadius: '50%', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>

              {/* Value 3: Left */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'right', paddingRight: '40px' }}>
                  <div style={{ color: '#10B981', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                  </div>
                  <h3 style={{ color: '#064E3B', fontSize: '24px', marginBottom: '12px' }}>Global Mindset</h3>
                  <p style={{ color: '#047857', fontSize: '16px' }}>We embrace diversity and build for a borderless world.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', background: '#10B981', borderRadius: '50%', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>

              {/* Value 4: Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'left', paddingLeft: '40px' }}>
                  <div style={{ color: '#10B981', marginBottom: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                  <h3 style={{ color: '#064E3B', fontSize: '24px', marginBottom: '12px' }}>Think Big</h3>
                  <p style={{ color: '#047857', fontSize: '16px' }}>We tackle hard problems and aren't afraid to disrupt the status quo.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', background: '#10B981', borderRadius: '50%', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>
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
