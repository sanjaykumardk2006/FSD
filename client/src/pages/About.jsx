import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div className="page">
      <Header />
      <main className="content-container">
        <h1>About Freelancer Hub</h1>
        <p>
          Freelancer Hub is a modern marketplace connecting talented freelancers with clients who need
          their expertise. We provide a seamless platform for collaboration, communication, and project
          management.
        </p>
        <h2>Our Mission</h2>
        <p>
          To empower freelancers and businesses by creating a transparent, efficient, and fair marketplace
          where skills meet opportunities.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Secure payment system</li>
          <li>Real-time communication</li>
          <li>Project tracking and management</li>
          <li>Verified profiles and portfolios</li>
          <li> 24/7 Support</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};
