import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

import AnimatedButton from '../components/AnimatedButton';
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    city: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      let errorText = 'Something went wrong';
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        errorText = error.response.data.errors.map(e => e.msg).join(', ');
      } else if (error.response?.data?.message) {
        errorText = error.response.data.message;
      }
      setErrorMsg('Error sending message: ' + errorText);
      setTimeout(() => setErrorMsg(''), 5000);
    }
  };

  return (
    <div className="page">
      <style>{`
        .contact-layout {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 80px;
          align-items: stretch;
          margin-bottom: 80px;
          padding: 0 24px;
        }
        @media (max-width: 768px) {
          .contact-layout {
            gap: 40px;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      <Header />
      <main>
        <section className="hero" style={{ minHeight: 'auto', padding: '100px 24px 60px', marginBottom: '40px' }}>
          <div className="hero-content">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible</p>
          </div>
        </section>

        <section className="content-section">
          <div className="contact-layout">
            <motion.div 
              style={{ textAlign: 'left', flex: '1 1 350px', maxWidth: '450px' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 style={{ marginBottom: '10px' }}>Contact Information</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '16px' }}>Find our physical office and mailing details here.</p>
              <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>

                <div className="card" style={{ textAlign: 'left', maxWidth: '450px', margin: '0', width: '100%', height: '100%', padding: '40px', boxSizing: 'border-box' }}>
                  <h3 style={{ marginTop: 0 }}>Address</h3>
                  <p>Kongu Engineering College<br />Perundurai<br />Erode - 638060</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ textAlign: 'left', flex: '1 1 400px', maxWidth: '500px' }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h2 style={{ marginBottom: '10px' }}>Send us a Message</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '16px' }}>Drop us a line and we will get back to you within 24 hours.</p>
              <div className="card" style={{ maxWidth: '500px', width: '100%', margin: '0', padding: '40px', boxSizing: 'border-box', textAlign: 'left' }}>
                <form onSubmit={handleSubmit} className="contact-form">
                {submitted && (
                  <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}
                {errorMsg && (
                  <div className="message error" style={{ marginBottom: '20px' }}>
                    {errorMsg}
                  </div>
                )}
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="name" style={{ marginBottom: '4px', display: 'block' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
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
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="mobileNumber" style={{ marginBottom: '4px', display: 'block' }}>Mobile Number <span style={{ color: '#ef4444' }}>*</span></label>
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
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="email" style={{ marginBottom: '4px', display: 'block' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
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
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="city" style={{ marginBottom: '4px', display: 'block' }}>City <span style={{ color: '#ef4444' }}>*</span></label>
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
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="message" style={{ marginBottom: '4px', display: 'block' }}>Message <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="4"
                    required
                  ></textarea>
                </div>
                <AnimatedButton type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '16px', padding: '14px', fontWeight: '700' }}>
                  CONNECT
                </AnimatedButton>
              </form>
              </div>
            </motion.div>
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
