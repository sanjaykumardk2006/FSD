import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-modern" style={{ padding: '120px 20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '24px', margin: '40px 0' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px' }}>Building the <span style={{ color: 'var(--accent-primary)', animation: 'none' }}>Future of Work</span></h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>We are on a mission to connect the world's most ambitious companies with the best talent, anywhere.</p>
        </section>

        {/* Our Mission & Vision */}
        <section className="content-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div style={{ background: 'var(--accent-primary)', color: 'var(--bg-primary)', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <h2 style={{ textAlign: 'left', fontSize: '32px', marginBottom: '20px', color: 'var(--bg-primary)', animation: 'none', filter: 'none' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: 'var(--bg-secondary)', lineHeight: '1.8' }}>To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace where skills meet opportunities. We believe that talent is equally distributed globally, but opportunity is not. Our goal is to bridge that gap.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '2px dashed var(--accent-primary)', padding: '40px', borderRadius: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>✨</div>
              <h2 style={{ textAlign: 'left', fontSize: '32px', marginBottom: '20px' }}>Our Vision</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>To be the world's leading platform connecting talented professionals with meaningful projects. We envision a world where anyone, anywhere, can build a successful career on their own terms, and companies can scale infinitely.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="content-section" style={{ background: 'var(--bg-secondary)', padding: '80px', borderRadius: '24px', textAlign: 'center' }}>
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

        {/* Project Description */}
        <section className="content-section" style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'left' }}>About Freelancer Hub</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            Freelancer Hub is a state-of-the-art marketplace designed to bridge the gap between world-class talent and ambitious businesses. We provide a seamless, secure, and dynamic environment where professionals can showcase their skills, and clients can easily discover, hire, and collaborate with the perfect match for their projects.
          </p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Born from the necessity to adapt to modern remote-first work cultures, our platform is deeply integrated with tools that ensure transparency and fair compensation. Whether you are a small startup trying to launch your MVP or an enterprise company scaling your operations, Freelancer Hub acts as the ultimate catalyst for your goals.
          </p>
        </section>

        {/* How It Works */}
        <section className="content-section" style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'left' }}>How It Works</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            The process is designed to be as frictionless as possible. Here is a detailed look into the ecosystem that makes it work flawlessly:
          </p>
          <ul style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><strong>Intelligent Matching:</strong> Our advanced algorithms analyze client requirements and instantly match them with freelancers who possess the exact technical stack and industry experience needed.</li>
            <li><strong>Comprehensive Discovery:</strong> Clients can browse through categorized, vetted portfolios, while freelancers can proactively bid on high-quality, verified project postings.</li>
            <li><strong>Secure Communication:</strong> Built-in chat, video conferencing, and file-sharing capabilities mean you never have to leave the platform to collaborate.</li>
            <li><strong>Escrow Protection:</strong> Funds are safely held in escrow before work begins, giving clients the power to review milestones before release, and guaranteeing freelancers they will be paid.</li>
            <li><strong>Milestone Tracking:</strong> Large projects can be broken down into manageable milestones with independent deadlines and deliverables.</li>
            <li><strong>Automated Invoicing:</strong> We handle the boring administrative tasks. Invoices and receipts are generated automatically upon milestone completion.</li>
          </ul>
        </section>

        {/* Purpose for Freelancers & Clients */}
        <section className="content-section" style={{ maxWidth: '800px', margin: '0 auto 100px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'left' }}>Who Is It For?</h2>

          <h3 style={{ fontSize: '28px', color: 'var(--accent-primary)', marginTop: '40px', marginBottom: '20px' }}>The Freelancer's Advantage</h3>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            We believe that talent should not be limited by geography. Our platform empowers independent professionals to build sustainable, scalable careers:
          </p>
          <ul style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <li>Access a diverse, global pool of high-quality clients ranging from ambitious startups to established Fortune 500 companies.</li>
            <li>Enjoy guaranteed payment protection for every approved milestone—eliminating the stress of chasing unpaid invoices.</li>
            <li>Utilize sophisticated platform tools to build a professional portfolio, gather client reviews, and establish a stellar reputation.</li>
            <li>Maintain absolute flexibility to choose your projects, negotiate your timelines, and set your own hourly or fixed rates.</li>
            <li>Participate in optional skill-verification tests to earn platform badges that instantly boost your visibility to premium clients.</li>
            <li>Get access to dedicated support and dispute resolution teams to ensure fair treatment at all times.</li>
          </ul>

          <h3 style={{ fontSize: '28px', color: 'var(--accent-primary)', marginTop: '40px', marginBottom: '20px' }}>The Client's Edge</h3>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            Finding the right talent quickly can make or break a project. Freelancer Hub provides businesses with the agility to scale their workforce on demand:
          </p>
          <ul style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li>Gain on-demand access to a highly vetted, top-tier talent pool with specialized skills across hundreds of categories.</li>
            <li>Experience a streamlined, AI-driven hiring process that drastically reduces time-to-hire and administrative overhead.</li>
            <li>Benefit from secure escrow payments and milestone-based tracking, ensuring you only pay for work you explicitly approve.</li>
            <li>Leverage scalable workforce solutions, allowing you to hire a single expert or assemble an entire remote team in days.</li>
            <li>Monitor project progress transparently with built-in time tracking, daily work diaries, and integrated communication tools.</li>
            <li>Rest easy with enterprise-grade security and compliance tools designed specifically to protect your intellectual property.</li>
          </ul>
        </section>

        {/* Values Map */}
        <section className="content-section" style={{ padding: '60px 20px', marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '80px', fontSize: '36px' }}>Our Core Values</h2>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Map Path Line - Realistic Route */}
            <svg style={{ position: 'absolute', top: '50px', bottom: '50px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: 'calc(100% - 100px)', zIndex: -1 }} className="hide-on-mobile" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Route shadow/base */}
              <path d="M50,0 C 90,15 90,20 50,33.33 C 10,45 10,55 50,66.66 C 90,75 90,85 50,100" fill="none" stroke="var(--border-color)" strokeWidth="8" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              {/* Dashed map trail */}
              <path className="map-route-active" d="M50,0 C 90,15 90,20 50,33.33 C 10,45 10,55 50,66.66 C 90,75 90,85 50,100" fill="none" stroke="var(--accent-primary)" strokeWidth="4" strokeDasharray="8 12" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {/* Value 1: Left */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'right', paddingRight: '40px' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginBottom: '12px' }}>Trust First</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>We build everything on a foundation of trust, transparency, and integrity.</p>
                </div>
                {/* Map GPS Pin */}
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div className="gps-pin" style={{ background: 'var(--accent-primary)' }}></div>
                </div>
              </div>

              {/* Value 2: Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'left', paddingLeft: '40px' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L13.5 2Z"></path><path d="M13 2v7h7"></path><path d="m10 13 4 4"></path><path d="m14 13-4 4"></path></svg>
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginBottom: '12px' }}>Move Fast</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>We iterate quickly, learn from mistakes, and continuously improve.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div className="gps-pin" style={{ background: 'var(--accent-primary)' }}></div>
                </div>
              </div>

              {/* Value 3: Left */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'right', paddingRight: '40px' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginBottom: '12px' }}>Global Mindset</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>We embrace diversity and build for a borderless world.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div className="gps-pin" style={{ background: 'var(--accent-primary)' }}></div>
                </div>
              </div>

              {/* Value 4: Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '45%', textAlign: 'left', paddingLeft: '40px' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginBottom: '12px' }}>Think Big</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>We tackle hard problems and aren't afraid to disrupt the status quo.</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                  <div className="gps-pin" style={{ background: 'var(--accent-primary)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Offices */}
        <section className="content-section" style={{ background: 'var(--bg-secondary)', padding: '80px 40px', borderRadius: '24px' }}>
          <h2>Our Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>San Francisco</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Global Headquarters</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>London</h3>
              <p style={{ color: 'var(--text-secondary)' }}>European Hub</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
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
