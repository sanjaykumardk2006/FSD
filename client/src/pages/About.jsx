import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion, animate, useInView } from 'framer-motion';
import { Brain, Search, ShieldCheck, Briefcase, FileText, Target, CheckCircle2, Globe, Banknote, Shield, BriefcaseBusiness, UserCheck, MessageSquare, Clock, ShieldAlert, Users, BookOpen, Heart, TrendingUp } from 'lucide-react';

const AnimatedNumber = ({ from, to, duration = 2, prefix = "", suffix = "" }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value)}${suffix}`;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, suffix, duration]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
};

export const About = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <style>{`
        .about-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 160px;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto auto;
          gap: 24px;
        }

        .bento-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          position: relative;
        }

        .bento-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.08);
          border-color: #111111;
        }

        .bento-card-large {
          grid-column: span 2;
        }

        .bento-card-tall {
          grid-row: span 2;
        }

        .bento-icon-wrapper {
          width: 48px;
          height: 48px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: #111111;
        }
        
        .bento-title {
          font-size: 20px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 12px;
        }
        
        .bento-desc {
          font-size: 16px;
          color: #555555;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-card-large {
            grid-column: span 2;
          }
          .bento-card-tall {
            grid-row: span 1;
          }
        }

        @media (max-width: 600px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-card-large {
            grid-column: span 1;
          }
        }

        .premium-panels-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        @media (max-width: 900px) {
          .premium-panels-container {
            grid-template-columns: 1fr;
          }
        }

        .premium-panel {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 22px;
          padding: 48px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .premium-panel:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #111111;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .checklist-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .checklist-icon {
          flex-shrink: 0;
          color: #111111;
          margin-top: 2px;
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
          margin: 160px 0;
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

        .marquee-container {
          overflow: hidden;
          width: 100%;
          margin: 80px 0 160px;
          padding: 20px 0;
          position: relative;
        }

        .marquee-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: scrollLeft 20s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); }
        }

        .core-values-section {
          margin: 160px auto;
          max-width: 1000px;
        }
        
        .core-values-header {
          font-family: Georgia, serif;
          color: #0c2b45;
          font-size: 40px;
          font-weight: 600;
          margin-bottom: 60px;
        }

        .core-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px 80px;
        }

        .core-value-card {
          display: flex;
          flex-direction: column;
        }

        .core-value-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .core-value-title {
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: #0c2b45;
          margin-bottom: 16px;
        }

        .core-value-desc {
          font-size: 18px;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .core-values-grid {
            grid-template-columns: 1fr;
          }
          .core-values-section {
            padding: 0 24px;
          }
        }

        .value-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
          width: 350px;
          flex-shrink: 0;
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
          padding: 100px 40px;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 100%);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          margin: 160px auto 0;
          max-width: 1000px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Header />
      
      <main className="about-main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h2>About Freelancer Hub</h2>
            <p>
              We are building the infrastructure for the future of digital work. A premium marketplace connecting ambitious businesses with elite global talent.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '160px' }}>
          <div className="premium-card" style={{ borderColor: '#000000' }}>
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
            <h3><AnimatedNumber from={0} to={150} suffix="+" duration={1} /></h3>
            <p>Countries</p>
          </div>
          <div>
            <h3><AnimatedNumber from={0} to={500} suffix="+" duration={1} /></h3>
            <p>Employees</p>
          </div>
          <div>
            <h3><AnimatedNumber from={0} to={1} prefix="$" suffix="B+" duration={1} /></h3>
            <p>Earnings</p>
          </div>
        </section>

        {/* About Project */}
        <section style={{ maxWidth: '840px', margin: '0 auto 160px', textAlign: 'center' }}>
          <h2 className="section-header" style={{ textAlign: 'center' }}>About Freelancer Hub</h2>
          <p className="text-content" style={{ textAlign: 'center' }}>
            Freelancer Hub is a state-of-the-art marketplace designed to bridge the gap between world-class talent and ambitious businesses. We provide a seamless, secure, and dynamic environment where professionals can showcase their skills, and clients can easily discover, hire, and collaborate with the perfect match for their projects.
          </p>
        </section>

        {/* How It Works */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 160px' }}>
          <h2 className="section-header" style={{ textAlign: 'center', fontSize: '48px', color: '#111111' }}>How It Works</h2>
          <p className="text-content" style={{ marginBottom: '60px', textAlign: 'center', color: '#555555', fontSize: '20px' }}>
            The process is designed to be as frictionless as possible. Here is a detailed look into the ecosystem that makes it work flawlessly:
          </p>
          <motion.div 
            className="bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              hidden: { opacity: 0 }
            }}
          >
            {/* Large Card */}
            <motion.div className="bento-card bento-card-large" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><Brain size={24} /></div>
              <h3 className="bento-title">Intelligent Matching</h3>
              <p className="bento-desc">Our advanced algorithms analyze client requirements and instantly match them with freelancers who possess the exact technical stack and industry experience needed.</p>
            </motion.div>
            
            {/* Small Card */}
            <motion.div className="bento-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><Search size={24} /></div>
              <h3 className="bento-title">Comprehensive Discovery</h3>
              <p className="bento-desc">Clients can browse through categorized, vetted portfolios, while freelancers can proactively bid on high-quality, verified project postings.</p>
            </motion.div>

            {/* Small Card */}
            <motion.div className="bento-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><MessageSquare size={24} /></div>
              <h3 className="bento-title">Secure Communication</h3>
              <p className="bento-desc">Built-in chat, video conferencing, and file-sharing capabilities mean you never have to leave the platform to collaborate.</p>
            </motion.div>
            
            {/* Medium Card */}
            <motion.div className="bento-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><ShieldCheck size={24} /></div>
              <h3 className="bento-title">Escrow Protection</h3>
              <p className="bento-desc">Funds are safely held in escrow before work begins, giving clients the power to review milestones before release, and guaranteeing freelancers they will be paid.</p>
            </motion.div>

            {/* Tall Card */}
            <motion.div className="bento-card bento-card-tall" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><Target size={24} /></div>
              <h3 className="bento-title">Milestone Tracking</h3>
              <p className="bento-desc">Large projects can be broken down into manageable milestones with independent deadlines and deliverables.</p>
            </motion.div>
            
            {/* Wide Card */}
            <motion.div className="bento-card bento-card-large" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="bento-icon-wrapper"><FileText size={24} /></div>
              <h3 className="bento-title">Automated Invoicing</h3>
              <p className="bento-desc">We handle the boring administrative tasks. Invoices and receipts are generated automatically upon milestone completion.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Who Is It For */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 160px' }}>
          <h2 className="section-header" style={{ textAlign: 'center', fontSize: '48px', color: '#111111', marginBottom: '16px' }}>Who Is It For?</h2>
          <p className="text-content" style={{ textAlign: 'center', color: '#555555', fontSize: '20px', maxWidth: '800px', margin: '0 auto 60px' }}>
            Built for those who demand excellence. Whether you are scaling a startup or building an independent career, we provide the tools you need.
          </p>

          <div className="premium-panels-container">
            <motion.div 
              className="premium-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#111111' }}>The Freelancer's Advantage</h3>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '40px', lineHeight: '1.6' }}>
                We believe that talent should not be limited by geography. Our platform empowers independent professionals to build sustainable, scalable careers:
              </p>
              
              <div className="checklist-item">
                <Globe size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Access a diverse, global pool of high-quality clients ranging from ambitious startups to established Fortune 500 companies.</span>
              </div>
              <div className="checklist-item">
                <Banknote size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Enjoy guaranteed payment protection for every approved milestone—eliminating the stress of chasing unpaid invoices.</span>
              </div>
              <div className="checklist-item">
                <Briefcase size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Utilize sophisticated platform tools to build a professional portfolio, gather client reviews, and establish a stellar reputation.</span>
              </div>
              <div className="checklist-item">
                <Clock size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Maintain absolute flexibility to choose your projects, negotiate your timelines, and set your own hourly or fixed rates.</span>
              </div>
              <div className="checklist-item">
                <CheckCircle2 size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Participate in optional skill-verification tests to earn platform badges that instantly boost your visibility to premium clients.</span>
              </div>
              <div className="checklist-item">
                <Shield size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Get access to dedicated support and dispute resolution teams to ensure fair treatment at all times.</span>
              </div>
            </motion.div>

            <motion.div 
              className="premium-panel"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#111111' }}>The Client's Edge</h3>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '40px', lineHeight: '1.6' }}>
                Finding the right talent quickly can make or break a project. Freelancer Hub provides businesses with the agility to scale their workforce on demand:
              </p>

              <div className="checklist-item">
                <UserCheck size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Gain on-demand access to a highly vetted, top-tier talent pool with specialized skills across hundreds of categories.</span>
              </div>
              <div className="checklist-item">
                <Brain size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Experience a streamlined, AI-driven hiring process that drastically reduces time-to-hire and administrative overhead.</span>
              </div>
              <div className="checklist-item">
                <ShieldCheck size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Benefit from secure escrow payments and milestone-based tracking, ensuring you only pay for work you explicitly approve.</span>
              </div>
              <div className="checklist-item">
                <BriefcaseBusiness size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Leverage scalable workforce solutions, allowing you to hire a single expert or assemble an entire remote team in days.</span>
              </div>
              <div className="checklist-item">
                <Target size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Monitor project progress transparently with built-in time tracking, daily work diaries, and integrated communication tools.</span>
              </div>
              <div className="checklist-item">
                <ShieldAlert size={24} className="checklist-icon" />
                <span style={{ fontSize: '18px', color: '#111111', lineHeight: '1.6' }}>Rest easy with enterprise-grade security and compliance tools designed specifically to protect your intellectual property.</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="core-values-section">
          <h2 className="core-values-header" style={{ textAlign: 'center', marginBottom: '16px' }}>Our Core Values</h2>
          <p className="text-content" style={{ textAlign: 'center', color: '#555555', fontSize: '20px', maxWidth: '800px', margin: '0 auto 60px' }}>
            The guiding principles that shape our culture, drive our decisions, and define how we serve our community.
          </p>
          <div className="core-values-grid">
            <div className="core-value-card">
              <div className="core-value-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                <Users size={32} />
              </div>
              <h3 className="core-value-title">Community</h3>
              <p className="core-value-desc">Building meaningful relationships that support and encourage one another in faith.</p>
            </div>
            
            <div className="core-value-card">
              <div className="core-value-icon" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
                <BookOpen size={32} />
              </div>
              <h3 className="core-value-title">Faith</h3>
              <p className="core-value-desc">Growing deeper in our understanding and practice of biblical principles.</p>
            </div>

            <div className="core-value-card">
              <div className="core-value-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <Heart size={32} />
              </div>
              <h3 className="core-value-title">Service</h3>
              <p className="core-value-desc">Serving our local and global communities with compassion and love.</p>
            </div>

            <div className="core-value-card">
              <div className="core-value-icon" style={{ backgroundColor: '#faf5ff', color: '#a855f7' }}>
                <TrendingUp size={32} />
              </div>
              <h3 className="core-value-title">Growth</h3>
              <p className="core-value-desc">Pursuing spiritual maturity and personal development through discipleship.</p>
            </div>
          </div>
        </section>

        {/* Global Offices */}
        <section>
          <h2 className="section-header" style={{ textAlign: 'center', marginBottom: '16px' }}>Our Offices</h2>
          <p className="text-content" style={{ textAlign: 'center', color: '#555555', fontSize: '20px', maxWidth: '800px', margin: '0 auto 40px' }}>
            We operate globally with a remote-first culture, anchored by strategic hubs in major tech capitals around the world.
          </p>
          <div className="marquee-container">
            <div className="marquee-track" style={{ animationDirection: 'reverse' }}>
              {/* Original 4 Cards */}
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>India</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>Singapore</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>London</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>San Francisco</h3>
              </div>

              {/* Duplicated 4 Cards */}
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>India</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>Singapore</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>London</h3>
              </div>
              <div className="premium-card" style={{ padding: '32px', width: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', margin: 0 }}>San Francisco</h3>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2 style={{ fontSize: '48px', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.02em' }}>Join Our Team</h2>
          <p className="text-content" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            We are always looking for talented individuals to join our mission. Check out our open roles.
          </p>
          <button className="btn-premium" onClick={() => navigate('/login')}>
            Join Our Team
          </button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
