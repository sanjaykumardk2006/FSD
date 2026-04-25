import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>About Freelancer Hub</h2>
            <p>Connecting talent with opportunity, transforming the way work gets done</p>
          </div>
        </section>

        <section className="content-section">
          <h2>Our Story</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace where skills meet opportunities.</p>
            </div>
            <div className="card">
              <div className="card-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To be the world's leading platform connecting talented professionals with meaningful projects and opportunities.</p>
            </div>
          </div>
        </section>

        <section className="content-section zigzag-section">
          <h2>How We Work</h2>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" alt="Create Profile" />
              </div>
              <div className="zigzag-content">
                <h3>Create Your Profile</h3>
                <p>Sign up and build your professional profile by showcasing your skills, experience, and portfolio. Clients can post project requirements, while freelancers can highlight their expertise to attract the right opportunities.</p>
              </div>
            </div>

            <div className="zigzag-item zigzag-right">
              <div className="zigzag-image">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" alt="Find Match" />
              </div>
              <div className="zigzag-content">
                <h3>Find the Perfect Match</h3>
                <p>Explore a wide range of projects or talented freelancers. Use filters based on skills, budget, and experience to connect with the perfect match for your needs.</p>
              </div>
            </div>

            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" alt="Collaborate" />
              </div>
              <div className="zigzag-content">
                <h3>Collaborate & Communicate</h3>
                <p>Work seamlessly with built-in chat and project management tools. Share updates, track progress, and stay aligned throughout the project lifecycle.</p>
              </div>
            </div>

            <div className="zigzag-item zigzag-right">
              <div className="zigzag-image">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" alt="Get Paid" />
              </div>
              <div className="zigzag-content">
                <h3>Deliver & Get Paid</h3>
                <p>Complete your work, submit deliverables, and receive secure payments. Clients can review freelancers, helping build trust and unlock future opportunities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Why Choose Freelancer Hub?</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">🔐</div>
              <h3>Secure Platform</h3>
              <p>Your data and payments are protected with industry-leading security measures.</p>
            </div>
            <div className="card">
              <div className="card-icon">💎</div>
              <h3>Quality Talent</h3>
              <p>Access a curated network of verified freelancers with proven track records.</p>
            </div>
            <div className="card">
              <div className="card-icon">⚡</div>
              <h3>Fast & Efficient</h3>
              <p>Find the right freelancer and start your project in minutes, not days.</p>
            </div>
            <div className="card">
              <div className="card-icon">💬</div>
              <h3>Great Support</h3>
              <p>Our dedicated support team is always available to help you succeed.</p>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ marginBottom: '80px' }}>
          <h2>Our Team & Community</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">🌟</div>
              <h3>Expert Support Team</h3>
              <p>Our dedicated team of professionals works 24/7 to ensure your success and resolve any issues quickly.</p>
            </div>
            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>Learning Resources</h3>
              <p>Access free courses, tutorials, and guides to help you succeed on the platform and grow your skills.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏅</div>
              <h3>Recognition Programs</h3>
              <p>Get recognized for your achievements with badges and certifications that boost your profile visibility.</p>
            </div>
            <div className="card">
              <div className="card-icon">🤝</div>
              <h3>Community Events</h3>
              <p>Join webinars, networking events, and competitions to connect with professionals and stay updated.</p>
            </div>
          </div>
        </section>

        <section className="slogan-section">
          <h2>Building the Future of Work</h2>
          <p>Empowering individuals and businesses to achieve their full potential through meaningful connections</p>
        </section>

        <section className="content-section">
          <h2>Key Statistics</h2>
          <div className="cards-grid">
            <div className="card stats-card">
              <h3>1M+ Users</h3>
              <p>Join thousands of freelancers and clients finding success on our platform every day.</p>
            </div>
            <div className="card stats-card">
              <h3>150+ Countries</h3>
              <p>Operating globally, connecting talented professionals across continents and time zones.</p>
            </div>
            <div className="card stats-card">
              <h3>500K+ Connections</h3>
              <p>Thousands of successful collaborations happening every month on our platform.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
