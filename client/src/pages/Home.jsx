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

        <section className="slogan-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2>Your Success is Our Mission</h2>
          <p>Join thousands of successful freelancers and clients building their dreams on Freelancer Hub</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
