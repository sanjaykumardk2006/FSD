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
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to Freelancer Hub</h2>
            <p>Connect talented freelancers with exciting projects worldwide</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                Hire Freelancer
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')}>
                Find Jobs
              </button>
            </div>
          </div>
        </section>

        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Why Choose Freelancer Hub?</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Safe and secure payment system with buyer and seller protection. Your funds are always protected.</p>
            </div>
            <div className="card">
              <div className="card-icon">💬</div>
              <h3>Direct Communication</h3>
              <p>Real-time messaging with project collaborators. Stay connected throughout the entire project lifecycle.</p>
            </div>
            <div className="card">
              <div className="card-icon">📊</div>
              <h3>Project Management</h3>
              <p>Track progress, manage milestones, and stay organized. Complete visibility into every project stage.</p>
            </div>
            <div className="card">
              <div className="card-icon">⭐</div>
              <h3>Verified Profiles</h3>
              <p>Work with verified freelancers and clients. Build trust through ratings, reviews, and portfolios.</p>
            </div>
            <div className="card">
              <div className="card-icon">🌍</div>
              <h3>Global Marketplace</h3>
              <p>Access talented freelancers from around the world. Find the perfect match for your project needs.</p>
            </div>
            <div className="card">
              <div className="card-icon">🚀</div>
              <h3>24/7 Support</h3>
              <p>Dedicated support team ready to help. Get assistance whenever you need it, day or night.</p>
            </div>
          </div>
        </section>

        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Popular Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>💻</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Web Development</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>🎨</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Graphic Design</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>✍️</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Digital Marketing</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>📱</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>App Development</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>📊</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Data Analysis</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>🎥</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Video Editing</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>🎵</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Audio Production</h3>
            </div>
            <div className="card" style={{ padding: '25px 20px', transform: 'none', gridColumn: 'auto' }}>
              <div className="card-icon" style={{ fontSize: '36px', marginBottom: '10px' }}>📝</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Content Writing</h3>
            </div>
          </div>
        </section>

        <section className="content-section zigzag-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>How It Works</h2>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left" style={{ alignItems: 'center', marginBottom: '60px' }}>
              <div className="zigzag-image">
                <img src="/images/team_collaboration.png" alt="Team Collaboration" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ color: 'var(--dark-blue)', fontSize: '28px', marginBottom: '15px' }}>1. Post a Project or Find Work</h3>
                <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.8' }}>Clients can easily post their project requirements, while freelancers can browse through thousands of active job listings tailored to their skills. Our smart matching system ensures the perfect fit for your specific needs.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right" style={{ alignItems: 'center', marginBottom: '60px' }}>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ color: 'var(--dark-blue)', fontSize: '28px', marginBottom: '15px' }}>2. Collaborate Seamlessly</h3>
                <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.8' }}>Use our built-in workspace to communicate, share files, and track milestones. Work securely from anywhere in the world, whether you're in an office, working from home, or traveling as a digital nomad.</p>
              </div>
              <div className="zigzag-image">
                <img src="/images/freelancer_cafe.png" alt="Freelancer Working" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '80px', textAlign: 'center' }} ref={(el) => sectionRefs.current.push(el)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', backgroundColor: 'var(--light-bg)', padding: '60px 40px', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--dark-blue)', marginBottom: '10px', fontWeight: '900' }}>10k+</h3>
              <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>Active Freelancers</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--dark-blue)', marginBottom: '10px', fontWeight: '900' }}>$5M+</h3>
              <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>Paid to Talent</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--dark-blue)', marginBottom: '10px', fontWeight: '900' }}>4.9/5</h3>
              <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>Average Rating</p>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '60px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2>Success Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="star-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Freelancer Hub connected me with the perfect developer for my project. The communication tools made collaboration seamless and the project was delivered on time."</p>
              <p className="testimonial-author">- Sarah Johnson, CEO at TechStart</p>
            </div>
            <div className="testimonial-card">
              <div className="star-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"As a freelancer, I've found consistent work through this platform. The secure payment system and professional environment make it my go-to marketplace."</p>
              <p className="testimonial-author">- Mark Davis, Full Stack Developer</p>
            </div>
            <div className="testimonial-card">
              <div className="star-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"The platform's support team has been incredible. They helped me navigate the project management features and now I manage multiple projects efficiently."</p>
              <p className="testimonial-author">- Emily Chen, Project Manager</p>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '80px' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2>Top Rated Freelancers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
            <div className="card" style={{ transform: 'none', padding: '35px 25px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-bg)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '2px solid var(--light-blue)' }}>👨‍💻</div>
              <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Alex Chen</h3>
              <p style={{ color: 'var(--light-blue)', fontWeight: '600', marginBottom: '15px' }}>Full Stack Developer</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }} onClick={() => navigate('/signup')}>View Profile</button>
            </div>
            <div className="card" style={{ transform: 'none', padding: '35px 25px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-bg)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '2px solid var(--light-blue)' }}>👩‍🎨</div>
              <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Sarah Miller</h3>
              <p style={{ color: 'var(--light-blue)', fontWeight: '600', marginBottom: '15px' }}>UI/UX Designer</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }} onClick={() => navigate('/signup')}>View Profile</button>
            </div>
            <div className="card" style={{ transform: 'none', padding: '35px 25px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-bg)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '2px solid var(--light-blue)' }}>👨‍💼</div>
              <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>David Kim</h3>
              <p style={{ color: 'var(--light-blue)', fontWeight: '600', marginBottom: '15px' }}>Marketing Expert</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }} onClick={() => navigate('/signup')}>View Profile</button>
            </div>
            <div className="card" style={{ transform: 'none', padding: '35px 25px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-bg)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '2px solid var(--light-blue)' }}>👩‍💻</div>
              <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Emma Watson</h3>
              <p style={{ color: 'var(--light-blue)', fontWeight: '600', marginBottom: '15px' }}>Data Scientist</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }} onClick={() => navigate('/signup')}>View Profile</button>
            </div>
          </div>
        </section>

        <section className="slogan-section" style={{ margin: '80px auto 40px', maxWidth: '1400px', borderRadius: '24px', padding: '100px 20px', width: '95%' }} ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Ready to Scale Your Business?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>Join thousands of successful freelancers and clients building their dreams on Freelancer Hub. Start your journey today for free.</p>
          <div className="hero-buttons">
            <button className="btn" style={{ backgroundColor: 'white', color: 'var(--dark-blue)', padding: '15px 40px', fontSize: '18px', fontWeight: '700', borderRadius: '50px' }} onClick={() => navigate('/signup')}>Get Started Now</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
