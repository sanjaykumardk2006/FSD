import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../App.css';

export const Home = () => {
  const navigate = useNavigate();

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

        <section className="content-section">
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

        <section className="content-section" style={{ marginBottom: '80px' }}>
          <h2>How It Works</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">👤</div>
              <h3>Create Your Profile</h3>
              <p>Sign up and showcase your skills or post your project requirements to get started.</p>
            </div>
            <div className="card">
              <div className="card-icon">🔍</div>
              <h3>Find the Perfect Match</h3>
              <p>Browse freelancers or job listings to find exactly what you need for your project.</p>
            </div>
            <div className="card">
              <div className="card-icon">🤝</div>
              <h3>Collaborate & Communicate</h3>
              <p>Work directly with your partner through messaging and project management tools.</p>
            </div>
            <div className="card">
              <div className="card-icon">✅</div>
              <h3>Deliver & Get Paid</h3>
              <p>Complete the project, make payment, and leave reviews for future opportunities.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
