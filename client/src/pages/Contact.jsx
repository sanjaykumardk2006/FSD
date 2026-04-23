import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    city: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/contact/submit', formData);
      setSubmitted(true);
      setFormData({ name: '', mobileNumber: '', email: '', city: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      alert('Error sending message: ' + error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="page">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible</p>
          </div>
        </section>

        <section className="content-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '80px' }}>
            <div>
              <h2>Contact Information</h2>
              <div className="cards-grid" style={{ gridTemplateColumns: '1fr', marginTop: '30px' }}>
                <div className="card" style={{ textAlign: 'left' }}>
                  <h3>📧 Email</h3>
                  <p><a href="mailto:sanjaykumardk.24cse@kongu.edu" style={{ color: '#3b82f6', textDecoration: 'none' }}>sanjaykumardk.24cse@kongu.edu</a></p>
                </div>
                <div className="card" style={{ textAlign: 'left' }}>
                  <h3>📞 Phone</h3>
                  <p><a href="tel:xxxxxxxxxx" style={{ color: '#3b82f6', textDecoration: 'none' }}>xxxxxxxxxx</a></p>
                </div>
                <div className="card" style={{ textAlign: 'left' }}>
                  <h3>📍 Address</h3>
                  <p>Kongu Engineering College<br />Perundurai<br />Erode - 638060</p>
                </div>
              </div>
            </div>

            <div>
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '30px' }}>
                {submitted && (
                  <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="xxxxxxxxxx"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '16px', padding: '12px', fontWeight: '700' }}>
                  CONNECT
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="slogan-section">
          <h2>Let's Connect</h2>
          <p>Have questions? Our team is here to help you succeed on Freelancer Hub</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
