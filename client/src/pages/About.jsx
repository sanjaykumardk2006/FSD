import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <style>{`
        .about-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 120px;
        }

        .premium-hero {
          padding: 160px 0 120px;
          text-align: center;
          animation: fadeUp 0.8s ease-out;
        }

        .premium-hero h1 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          line-height: 1.1;
          color: var(--text-primary);
        }

        .premium-hero p {
          font-size: 22px;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .premium-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 48px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        }

        .stat-single-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 60px 40px;
          margin: 120px 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .stat-single-card h3 {
          font-size: 48px;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .stat-single-card p {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .stat-single-card {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 24px;
          }
        }

        .section-header {
          font-size: 40px;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
          color: var(--text-primary);
        }

        .text-content {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .premium-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .premium-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .premium-list li::before {
          content: '→';
          color: var(--text-primary);
          font-weight: 400;
        }

        .premium-list strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin: 60px 0 120px;
        }

        @media (max-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        .value-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
        }
        
        .value-card:hover {
          background-color: var(--bg-card);
          border-color: var(--border-hover);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .value-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .office-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin: 60px 0;
        }

        .interactive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .interactive-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .interactive-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
          background-color: var(--bg-secondary);
        }
        
        .interactive-card-icon {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 20px;
          line-height: 1.5;
        }

        .btn-premium {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          padding: 16px 36px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-premium:hover {
          transform: scale(1.02);
          background-color: var(--accent-hover);
        }

        .cta-section {
          text-align: center;
          padding: 120px 40px;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 100%);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          margin-top: 120px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Header />
      
      <main className="about-main">
        {/* Hero Section */}
        <section className="premium-hero">
          <h1>Building the <span>Future of Work</span></h1>
          <p>We are on a mission to connect the world's most ambitious companies with the best talent, anywhere.</p>
        </section>

        {/* Mission & Vision */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '120px' }}>
          <div className="premium-card">
            <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '600' }}>Our Mission</h2>
            <p className="text-content" style={{ marginBottom: 0 }}>
              To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace where skills meet opportunities. We believe that talent is equally distributed globally, but opportunity is not. Our goal is to bridge that gap.
            </p>
          </div>
          <div className="premium-card" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '600' }}>Our Vision</h2>
            <p className="text-content" style={{ marginBottom: 0 }}>
              To be the world's leading platform connecting talented professionals with meaningful projects. We envision a world where anyone, anywhere, can build a successful career on their own terms, and companies can scale infinitely.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="stat-single-card">
          <div>
            <h3>2026</h3>
            <p>Founded</p>
          </div>
          <div>
            <h3>150+</h3>
            <p>Countries</p>
          </div>
          <div>
            <h3>500</h3>
            <p>Employees</p>
          </div>
          <div>
            <h3>$1B+</h3>
            <p>Earnings</p>
          </div>
        </section>

        {/* About Project */}
        <section style={{ maxWidth: '840px', margin: '0 auto 120px', textAlign: 'center' }}>
          <h2 className="section-header" style={{ textAlign: 'center' }}>About Freelancer Hub</h2>
          <p className="text-content" style={{ textAlign: 'center' }}>
            Freelancer Hub is a state-of-the-art marketplace designed to bridge the gap between world-class talent and ambitious businesses. We provide a seamless, secure, and dynamic environment where professionals can showcase their skills, and clients can easily discover, hire, and collaborate with the perfect match for their projects.
          </p>
        </section>

        {/* How It Works */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 120px' }}>
          <h2 className="section-header">How It Works</h2>
          <p className="text-content" style={{ marginBottom: '40px' }}>
            The process is designed to be as frictionless as possible. Here is a detailed look into the ecosystem that makes it work flawlessly:
          </p>
          <div className="interactive-grid">
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Intelligent Matching:</strong> Our advanced algorithms analyze client requirements and instantly match them with freelancers who possess the exact technical stack and industry experience needed.</p>
            </div>
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Comprehensive Discovery:</strong> Clients can browse through categorized, vetted portfolios, while freelancers can proactively bid on high-quality, verified project postings.</p>
            </div>
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Secure Communication:</strong> Built-in chat, video conferencing, and file-sharing capabilities mean you never have to leave the platform to collaborate.</p>
            </div>
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Escrow Protection:</strong> Funds are safely held in escrow before work begins, giving clients the power to review milestones before release, and guaranteeing freelancers they will be paid.</p>
            </div>
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Milestone Tracking:</strong> Large projects can be broken down into manageable milestones with independent deadlines and deliverables.</p>
            </div>
            <div className="interactive-card">
              <span className="interactive-card-icon">→</span>
              <p className="text-content" style={{ margin: 0, fontSize: '16px' }}><strong>Automated Invoicing:</strong> We handle the boring administrative tasks. Invoices and receipts are generated automatically upon milestone completion.</p>
            </div>
          </div>
        </section>

        {/* Who Is It For */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 120px' }}>
          <h2 className="section-header">Who Is It For?</h2>

          <div style={{ marginTop: '60px', marginBottom: '80px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px' }}>The Freelancer's Advantage</h3>
            <p className="text-content" style={{ marginBottom: '32px' }}>
              We believe that talent should not be limited by geography. Our platform empowers independent professionals to build sustainable, scalable careers:
            </p>
            <div className="interactive-grid">
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Access a diverse, global pool of high-quality clients ranging from ambitious startups to established Fortune 500 companies.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Enjoy guaranteed payment protection for every approved milestone—eliminating the stress of chasing unpaid invoices.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Utilize sophisticated platform tools to build a professional portfolio, gather client reviews, and establish a stellar reputation.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Maintain absolute flexibility to choose your projects, negotiate your timelines, and set your own hourly or fixed rates.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Participate in optional skill-verification tests to earn platform badges that instantly boost your visibility to premium clients.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Get access to dedicated support and dispute resolution teams to ensure fair treatment at all times.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px' }}>The Client's Edge</h3>
            <p className="text-content" style={{ marginBottom: '32px' }}>
              Finding the right talent quickly can make or break a project. Freelancer Hub provides businesses with the agility to scale their workforce on demand:
            </p>
            <div className="interactive-grid">
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Gain on-demand access to a highly vetted, top-tier talent pool with specialized skills across hundreds of categories.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Experience a streamlined, AI-driven hiring process that drastically reduces time-to-hire and administrative overhead.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Benefit from secure escrow payments and milestone-based tracking, ensuring you only pay for work you explicitly approve.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Leverage scalable workforce solutions, allowing you to hire a single expert or assemble an entire remote team in days.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Monitor project progress transparently with built-in time tracking, daily work diaries, and integrated communication tools.</p>
              </div>
              <div className="interactive-card">
                <span className="interactive-card-icon">→</span>
                <p className="text-content" style={{ margin: 0, fontSize: '16px' }}>Rest easy with enterprise-grade security and compliance tools designed specifically to protect your intellectual property.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '600' }}>Trust First</h3>
              <p className="text-content" style={{ marginBottom: 0, fontSize: '16px' }}>We build everything on a foundation of trust, transparency, and integrity.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L13.5 2Z"></path><path d="M13 2v7h7"></path><path d="m10 13 4 4"></path><path d="m14 13-4 4"></path></svg>
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '600' }}>Move Fast</h3>
              <p className="text-content" style={{ marginBottom: 0, fontSize: '16px' }}>We iterate quickly, learn from mistakes, and continuously improve.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '600' }}>Global Mindset</h3>
              <p className="text-content" style={{ marginBottom: 0, fontSize: '16px' }}>We embrace diversity and build for a borderless world.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '600' }}>Think Big</h3>
              <p className="text-content" style={{ marginBottom: 0, fontSize: '16px' }}>We tackle hard problems and aren't afraid to disrupt the status quo.</p>
            </div>
          </div>
        </section>

        {/* Global Offices */}
        <section>
          <h2 className="section-header" style={{ textAlign: 'center' }}>Our Offices</h2>
          <div className="office-grid">
            <div className="premium-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>San Francisco</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Global Headquarters</p>
            </div>
            <div className="premium-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>London</h3>
              <p style={{ color: 'var(--text-secondary)' }}>European Hub</p>
            </div>
            <div className="premium-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Singapore</h3>
              <p style={{ color: 'var(--text-secondary)' }}>APAC Hub</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2 style={{ fontSize: '48px', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.02em' }}>Join Our Team</h2>
          <p className="text-content" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            We are always looking for talented individuals to join our mission. Check out our open roles.
          </p>
          <button className="btn-premium">
            View Careers
          </button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
