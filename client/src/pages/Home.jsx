import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import '../App.css';

const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500; // slightly faster overall
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic for a smoother finish without dragging too long
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={countRef}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

export const Home = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

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
      <section className="hero" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.4)), url("/hero_bg.png")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        marginBottom: '80px'
      }}>
        <div className="hero-content" style={{ color: '#ffffff' }}>
          <h2 style={{ color: '#ffffff' }}>The Premium Talent Network</h2>
          <p style={{ color: '#ffffff', opacity: 0.9 }}>
            Connect with top-tier freelancers and build your next big idea. Secure, fast, and built for production-scale collaboration.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px', gap: '8px' }}>
              Hire Talent
              <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px', gap: '8px' }}>
              Find Work
              <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </section>
      <main>

        {/* Who We Are */}
        <section className="content-section" style={{ maxWidth: '1440px', margin: '0 auto 120px', padding: '60px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>Who We Are</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '18px' }}>Empowering the future of digital work</p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', textAlign: 'center' }}>
            At Freelancer Hub, we are redefining the modern workforce by creating a seamless, transparent marketplace that connects ambitious companies with elite global talent. Born from the shift to remote-first cultures, our platform is deeply integrated with tools ensuring fair compensation, secure transactions, and real-time collaboration. By leveraging advanced AI matching algorithms and rigorous vetting, we empower independent professionals to build sustainable careers while giving businesses the agility to scale on demand. We are a dedicated partner in your growth journey, committed to fostering a community built on trust, excellence, and relentless innovation.
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
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Hire Top Freelancers</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Browse thousands of skilled freelancers across web development, design, digital marketing, and more. Our platform makes it easy to find the perfect independent professional for your specific project needs.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Seamless Collaboration</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Work directly with freelancers in our centralized project workspaces. Chat in real-time, share files securely, and track project milestones effortlessly from start to finish.</p>
              </div>
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80" alt="Seamless Collaboration" className="zoom-in-image" />
              </div>
            </div>
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" alt="Secure Milestone Payments" className="zoom-in-image" />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Secure Milestone Payments</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Pay only for approved work. Our escrow system protects both clients and freelancers by holding funds securely until project milestones are explicitly approved by you.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>24/7 Dedicated Support</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Get help whenever you need it. Our dedicated support team is available around the clock to assist you with everything from finding talent to resolving project disputes.</p>
              </div>
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" alt="24/7 Dedicated Support" className="zoom-in-image" />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Statistics */}
        <section className="content-section" style={{ maxWidth: '1440px', margin: '0 auto 120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '50px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <AnimatedNumber value={10} suffix="k+" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Freelancers</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <AnimatedNumber value={5} prefix="$" suffix="M+" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Paid to Talent</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <AnimatedNumber value={4.8} decimals={1} suffix="/5" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Average Client Rating</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>
                <AnimatedNumber value={99} suffix="%" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Project Success Rate</p>
            </div>
          </div>
        </section>

        {/* 3. Categories */}
        <section className="content-section" style={{ marginBottom: '120px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Explore Popular Categories</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Find exactly what you need from our massive talent pool</p>
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
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
              <motion.div className="card" key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} className="zoom-in-image" />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{cat.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setShowAllCategories(!showAllCategories)} style={{ padding: '16px 40px', fontSize: '16px', borderRadius: '50px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {showAllCategories ? 'Explore Less ↑' : 'Explore More ↓'}
            </button>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Secure Escrow</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We guarantee complete peace of mind for both parties. Your funds are held safely and securely until the work is fully reviewed and explicitly approved by you.</p>
            </motion.div>
            <motion.div className="card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Real-time Sync</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Communicate instantly with your team. Zero delays and perfect synchronization across all your devices ensures your project moves forward seamlessly without blockers.</p>
            </motion.div>
            <motion.div className="card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Verified Talent</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Every freelancer passes a strict vetting process to ensure top-tier quality. We carefully review their portfolios and past work to guarantee excellence on every project.</p>
            </motion.div>
          </motion.div>
        </section>



        {/* 9. Call to Action */}
        <section className="slogan-section" style={{ margin: '80px auto 40px', maxWidth: '1440px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Ready to Scale Your Business?</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px', fontSize: '20px' }}>Join thousands of modern teams building the future with our premium talent network. No credit card required to start.</p>
          <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '50px', gap: '8px' }}>
            Get Started Now
            <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
