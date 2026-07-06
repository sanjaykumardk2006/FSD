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
        {/* 1. Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h2>The Premium Talent Network</h2>
            <p>
              Connect with top-tier freelancers and build your next big idea. Secure, fast, and built for production-scale collaboration.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Hire Talent
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px', backgroundColor: 'transparent', border: '1px solid white', color: 'white' }}>
                Find Work
              </button>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="content-section" style={{ maxWidth: '1200px', margin: '0 auto 140px', padding: '60px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>Who We Are</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '18px' }}>Empowering the future of digital work</p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', textAlign: 'center' }}>
            At Freelancer Hub, we are redefining the modern workforce by creating a seamless, transparent marketplace that connects ambitious companies with elite global talent. Born from the shift to remote-first cultures, our platform is deeply integrated with tools ensuring fair compensation, secure transactions, and real-time collaboration. By leveraging advanced AI matching algorithms and rigorous vetting, we empower independent professionals to build sustainable careers while giving businesses the agility to scale on demand. We are a dedicated partner in your growth journey, committed to fostering a community built on trust, excellence, and relentless innovation.
          </p>
        </section>

        {/* Our Services */}
        <section className="content-section zigzag-section" ref={(el) => sectionRefs.current.push(el)}>
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
        <section className="content-section" style={{ maxWidth: '1200px', margin: '0 auto 140px' }} ref={(el) => sectionRefs.current.push(el)}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '50px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>10k+</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Freelancers</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>$5M+</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Paid to Talent</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>4.9/5</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Average Client Rating</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>99%</h2>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Project Success Rate</p>
            </div>
          </div>
        </section>

        {/* 3. Categories */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Explore Popular Categories</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Find exactly what you need from our massive talent pool</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', title: 'Web Development', desc: 'Build scalable, responsive web applications using the latest technologies.' },
              { image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80', title: 'Graphic Design', desc: 'Elevate your brand with stunning visual designs and intuitive UI/UX.' },
              { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80', title: 'Digital Marketing', desc: 'Drive growth and increase your online presence with targeted strategies.' },
              { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80', title: 'App Development', desc: 'Create seamless mobile experiences for both iOS and Android platforms.' },
              { image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=400&q=80', title: 'Data Science & AI', desc: 'Harness the power of machine learning and data analytics for actionable insights.' },
              { image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80', title: 'Video & Animation', desc: 'Bring your ideas to life with high-quality video production and motion graphics.' }
            ].map((cat, i) => (
              <div className="card" key={i} style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} className="zoom-in-image" />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{cat.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* 6. Featured Jobs */}
        <section className="content-section" style={{ maxWidth: '1200px', margin: '0 auto 140px', padding: '60px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Featured Jobs</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>High-quality projects looking for experts right now</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'E-Commerce Redesign', desc: 'Seeking a senior React developer to completely overhaul our frontend architecture.', budget: '$4,500' },
              { title: 'Fintech Mobile Application', desc: 'Need a React Native expert to build a secure cross-platform crypto wallet.', budget: '$8,200' },
              { title: 'Corporate Rebranding', desc: 'Looking for a senior designer to create a new brand identity and marketing assets.', budget: '$2,800' }
            ].map((job, i) => (
              <div className="card" key={i} style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{job.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0', lineHeight: '1.5', flex: 1 }}>{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Why Choose Us */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px', textAlign: 'center' }}>Built for performance and reliability</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Why top enterprises choose Freelancer Hub for their critical projects</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Secure Escrow</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We guarantee complete peace of mind for both parties. Your funds are held safely and securely until the work is fully reviewed and explicitly approved by you.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Real-time Sync</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Communicate instantly with your team. Zero delays and perfect synchronization across all your devices ensures your project moves forward seamlessly without blockers.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Verified Talent</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Every freelancer passes a strict vetting process to ensure top-tier quality. We carefully review their portfolios and past work to guarantee excellence on every project.</p>
            </div>
          </div>
        </section>



        {/* 9. Call to Action */}
        <section className="slogan-section" style={{ margin: '80px auto 40px', maxWidth: '1200px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Ready to Scale Your Business?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 40px' }}>Join thousands of modern teams building the future with our premium talent network. No credit card required to start.</p>
          <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '50px' }}>
            Get Started Now
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
