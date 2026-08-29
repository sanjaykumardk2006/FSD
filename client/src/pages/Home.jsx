import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import '../App.css';

import AnimatedButton from '../components/AnimatedButton';
const StatsCounter = ({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const videoRef = useRef(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Pause video after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

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
      {/* 1. Hero Section */}
      <section className="hero home-video-hero" style={{ 
        marginBottom: '80px',
        position: 'relative',
        background: 'transparent'
      }}>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: -2,
            transform: 'translate3d(0, 0, 0)', /* Force GPU hardware acceleration */
            willChange: 'transform' /* Tell browser to optimize this layer */
          }}
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.15)',
          zIndex: -1,
        }}></div>

        <div className="hero-content" style={{ color: '#ffffff', textShadow: '0 2px 15px rgba(0,0,0,0.6), 0 4px 30px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#ffffff', fontSize: '56px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>Connect with Elite Global Talent</h2>
          <p style={{ color: '#ffffff', opacity: 0.9, fontSize: '20px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Freelancer Hub is the premier marketplace bridging the gap between innovative companies and top-tier freelancers. Whether you're an independent professional or a growing business, find the perfect match here.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            <AnimatedButton className="btn btn-primary" onClick={() => navigate('/search')} style={{ gap: '10px' }}>
              Get Started
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </AnimatedButton>
            <AnimatedButton className="btn btn-secondary" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'signup', role: 'Freelancer' } }))} style={{ gap: '10px' }}>
              Join Now
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </AnimatedButton>
          </div>
        </div>
      </section>
      <main>

        {/* Who We Are */}
        <section className="content-section" style={{ maxWidth: '1440px', margin: '0 auto 120px', padding: '60px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>Our Objective</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '18px' }}>A unified platform designed to streamline project lifecycles</p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', textAlign: 'center' }}>
            At Freelancer Hub, we provide a sophisticated marketplace designed to seamlessly connect Clients with skilled Freelancers. With tailored, role-based dashboards, secure authentication, and real-time notifications, we make managing digital work effortless. Whether you're an independent contractor looking for your next gig, a company seeking specialized talent, or an agency building a portfolio with verifiable certifications, our platform provides the tools and visibility you need to succeed in the modern digital economy.
          </p>
        </section>

        {/* Our Services */}
        <section className="content-section zigzag-section" style={{ marginBottom: '120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px', textAlign: 'center' }}>Freelancer Hub Services</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '80px', fontSize: '18px' }}>Everything you need to hire, manage, and pay top freelancers</p>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Hire Top Freelancers" className="zoom-in-image" />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Role-Based Dashboards</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Experience dedicated interfaces tailored to your needs. Clients can easily post jobs and manage applicants, while Freelancers get powerful tools to track applications and showcase their portfolios.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Smart Job Discovery</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Utilize our advanced job search capabilities to find the perfect projects matching your skills. Filter opportunities efficiently to focus on work that aligns with your expertise and goals.</p>
              </div>
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80" alt="Smart Job Discovery" className="zoom-in-image" />
              </div>
            </div>
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" alt="Verifiable Portfolios" className="zoom-in-image" />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Verifiable Portfolios</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Stand out from the crowd by building a comprehensive profile. Freelancers can upload certifications and define their entity type to build trust and credibility with potential clients.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Real-Time Notifications</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Stay in the loop with instant updates. Our integrated live notification system ensures you are always informed about new job applications, project updates, and important administrative actions.</p>
              </div>
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" alt="Real-Time Notifications" className="zoom-in-image" />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Statistics */}
        <section className="content-section" style={{ maxWidth: '1440px', margin: '0 auto 120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '50px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <StatsCounter value={10} suffix="k+" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Freelancers</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <StatsCounter value={5} prefix="$" suffix="M+" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Paid to Talent</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <StatsCounter value={4.8} decimals={1} suffix="/5" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Average Client Rating</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <StatsCounter value={100} suffix="%" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Project Success Rate</p>
            </div>
          </div>
        </section>

        {/* 3. Categories */}
        <section className="content-section" style={{ marginBottom: '120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Explore Popular Categories</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Find exactly what you need from our massive talent pool</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            {[
              { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', title: 'Web Development', desc: 'Build scalable, responsive web applications using the latest technologies.' },
              { image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80', title: 'Graphic Design', desc: 'Elevate your brand with stunning visual designs and intuitive UI/UX.' },
              { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80', title: 'Digital Marketing', desc: 'Drive growth and increase your online presence with targeted strategies.' },
              { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80', title: 'App Development', desc: 'Create seamless mobile experiences for both iOS and Android platforms.' },
              { image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=400&q=80', title: 'Data Science & AI', desc: 'Harness the power of machine learning and data analytics for actionable insights.' },
              { image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80', title: 'Video & Animation', desc: 'Bring your ideas to life with high-quality video production and motion graphics.' },
              { image: '/cat_writing.png', title: 'Writing & Translation', desc: 'Engage your audience with compelling copy and professional translation services.' },
              { image: '/cat_va.png', title: 'Virtual Assistance', desc: 'Streamline your operations with reliable remote administrative support.' },
              { image: '/cat_finance.png', title: 'Finance & Accounting', desc: 'Manage your business finances with expert bookkeepers and financial analysts.' },
              { image: '/cat_arch.png', title: 'Architecture & 3D', desc: 'Transform your concepts into reality with breathtaking 3D modeling.' },
              { image: '/cat_legal.png', title: 'Legal Consulting', desc: 'Protect your business with expert advice from experienced legal professionals.' },
              { image: '/cat_audio.png', title: 'Audio & Music', desc: 'Enhance your projects with professional voiceovers, mixing, and sound design.' }
            ].slice(0, showAllCategories ? 12 : 4).map((cat, i) => (
              <motion.div 
                className="card" 
                key={cat.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} className="zoom-in-image" />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{cat.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <AnimatedButton className="btn btn-secondary" onClick={() => setShowAllCategories(!showAllCategories)} style={{ padding: '16px 40px', fontSize: '16px', borderRadius: '50px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {showAllCategories ? 'Explore Less ↑' : 'Explore More ↓'}
            </AnimatedButton>
          </div>
        </section>



        {/* 6. Featured Jobs */}
        <section className="content-section" style={{ maxWidth: '1440px', margin: '0 auto 120px', padding: '60px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Featured Jobs</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>High-quality projects looking for experts right now</p>
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {[
              { title: 'E-Commerce Redesign', desc: 'Seeking a senior React developer to completely overhaul our frontend architecture.', budget: '$4,500' },
              { title: 'Fintech Mobile Application', desc: 'Need a React Native expert to build a secure cross-platform crypto wallet.', budget: '$8,200' },
              { title: 'Corporate Rebranding', desc: 'Looking for a senior designer to create a new brand identity and marketing assets.', budget: '$2,800' }
            ].map((job, i) => (
              <motion.div className="card" key={i} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }} style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{job.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0', lineHeight: '1.5', flex: 1 }}>{job.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 7. Why Choose Us */}
        <section className="content-section" style={{ marginBottom: '120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px', textAlign: 'center' }}>Built for performance and reliability</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Why top enterprises choose Freelancer Hub for their critical projects</p>
          <motion.div 
            className="testimonial-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            <motion.div className="card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Admin Moderated</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>A secure and trusted ecosystem. Our dedicated admin dashboard allows continuous moderation of projects and profiles to maintain the highest quality standards across the platform.</p>
            </motion.div>
            <motion.div className="card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Instant Connectivity</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Never miss a beat with WebSocket-powered real-time notifications. Whether it's a new job application or a profile update, you're always instantly informed.</p>
            </motion.div>
            <motion.div className="card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Tailored Experiences</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Whether you register as a Client or Freelancer, you get an interface designed specifically for your workflow, maximizing productivity and minimizing friction.</p>
            </motion.div>
          </motion.div>
        </section>



        {/* 9. Call to Action */}
        <section className="slogan-section" style={{ margin: '80px auto 40px', maxWidth: '1440px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Ready to Scale Your Business?</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px', fontSize: '20px' }}>Join thousands of modern teams building the future with our premium talent network. No credit card required to start.</p>
          <AnimatedButton className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'signup', role: 'Client' } }))} style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '50px', gap: '8px' }}>
            Get Started Now
            <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </AnimatedButton>
        </section>
      </main>
      <Footer />
    </div>
  );
};
