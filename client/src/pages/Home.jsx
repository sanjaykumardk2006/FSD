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
        <section className="hero-modern" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', padding: '100px 0', minHeight: '80vh' }}>
          <div className="hero-left" style={{ textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '100px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', display: 'block' }}></span>
              Freelancer Marketplace v2.0 is live
            </div>
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              The premium <br/><span style={{ color: 'var(--accent-primary)' }}>talent network</span> for modern teams.
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
              Connect with top-tier freelancers and build your next big idea. Secure, fast, and built for production-scale collaboration.
            </p>
            <div className="hero-buttons" style={{ justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Hire Talent
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')} style={{ padding: '14px 28px', fontSize: '16px' }}>
                Find Work
              </button>
            </div>
          </div>
          <div className="hero-right" style={{ position: 'relative' }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '50px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px', background: '#F9FAFB' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }}></div>
                </div>
                <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', height: 'calc(100% - 50px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '32px', background: '#F3F4F6', borderRadius: '6px' }}></div>
                    <div style={{ height: '32px', background: '#F9FAFB', borderRadius: '6px' }}></div>
                    <div style={{ height: '32px', background: '#F9FAFB', borderRadius: '6px' }}></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ height: '100px', flex: 1, background: 'rgba(59,130,246,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                      <div style={{ height: '100px', flex: 1, background: '#F9FAFB', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                    </div>
                    <div style={{ flex: 1, background: '#F9FAFB', border: '1px solid var(--border-color)', borderRadius: '12px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trusted By */}
        <section className="content-section" style={{ textAlign: 'center', margin: '40px 0 100px' }} ref={(el) => sectionRefs.current.push(el)}>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted by innovative teams worldwide</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', opacity: 0.6, fontSize: '24px', fontWeight: 'bold' }}>
            <span>Acme Corp</span>
            <span>GlobalTech</span>
            <span>Nova Studio</span>
            <span>Quantum</span>
            <span>Horizon</span>
          </div>
        </section>

        {/* 3. Platform Statistics */}
        <section className="content-section" style={{ marginBottom: '100px', textAlign: 'center' }} ref={(el) => sectionRefs.current.push(el)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', backgroundColor: 'var(--bg-secondary)', padding: '60px 40px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: '900' }}>10k+</h3>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600' }}>Active Freelancers</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: '900' }}>$5M+</h3>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600' }}>Paid to Talent</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: '900' }}>4.9/5</h3>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600' }}>Average Client Rating</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: '900' }}>99%</h3>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600' }}>Project Success Rate</p>
            </div>
          </div>
        </section>

        {/* 4. Popular Categories */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Explore Popular Categories</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Find exactly what you need from our massive talent pool</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { icon: '💻', title: 'Web Development', desc: 'React, Node, Full Stack' },
              { icon: '🎨', title: 'Graphic Design', desc: 'Logos, Branding, UI/UX' },
              { icon: '✍️', title: 'Digital Marketing', desc: 'SEO, Social Media, Ads' },
              { icon: '📱', title: 'App Development', desc: 'iOS, Android, React Native' },
              { icon: '📊', title: 'Data Analysis', desc: 'Python, SQL, Machine Learning' },
              { icon: '🎥', title: 'Video Editing', desc: 'Premiere, After Effects' },
              { icon: '🎵', title: 'Audio Production', desc: 'Mixing, Voice Over, Podcasts' },
              { icon: '📝', title: 'Content Writing', desc: 'Blogs, Copywriting, Translation' }
            ].map((cat, i) => (
              <div className="card" key={i} style={{ padding: '30px 20px', textAlign: 'left' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{cat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. How It Works */}
        <section className="content-section zigzag-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '80px' }}>How it works</h2>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image">
                <div style={{ width: '100%', height: '350px', background: '#F3F4F6', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>📝</div>
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>1. Post a Project</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Describe what you need. Our intuitive job posting flow ensures you capture exactly what you need. Let our AI matching system instantly connect you with the right professionals.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>2. Hire Top Talent</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Review proposals, portfolios, and reviews. Interview your favorites and hire the best fit for your project using our secure escrow system.</p>
              </div>
              <div className="zigzag-image">
                <div style={{ width: '100%', height: '350px', background: '#F3F4F6', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🤝</div>
              </div>
            </div>
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image">
                <div style={{ width: '100%', height: '350px', background: '#F3F4F6', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🚀</div>
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>3. Collaborate & Succeed</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Manage everything in one place. Built-in chat, milestone tracking, and secure file sharing make project management effortless.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Featured Projects */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Recently Completed Projects</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>See the amazing work done by our freelancers</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="card" key={item} style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '200px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🖼️ Project Preview</div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>E-Commerce Redesign</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>A complete overhaul of a major retail platform using React and Node.js.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>$4,500</span>
                    <span style={{ fontSize: '14px', color: 'var(--success)' }}>Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Why Choose Us */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px' }}>Built for performance and reliability</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>🔒</div>
              <h3>Secure Escrow</h3>
              <p>Your funds are held safely until the work is reviewed and approved by you.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>⚡</div>
              <h3>Real-time Sync</h3>
              <p>Communicate instantly with your team. Zero delays, perfect synchronization.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '24px' }}>⭐</div>
              <h3>Verified Talent</h3>
              <p>Every freelancer passes a strict vetting process to ensure top-tier quality.</p>
            </div>
          </div>
        </section>

        {/* 8. Top Talent */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px' }}>Top Rated Freelancers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { name: 'Alex Chen', role: 'Full Stack Developer', icon: '👨‍💻' },
              { name: 'Sarah Miller', role: 'UI/UX Designer', icon: '👩‍🎨' },
              { name: 'David Kim', role: 'Marketing Expert', icon: '👨‍💼' },
              { name: 'Emma Watson', role: 'Data Scientist', icon: '👩‍💻' }
            ].map((f, i) => (
              <div className="card" key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '35px 25px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '2px solid var(--accent-primary)' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '4px' }}>{f.name}</h3>
                <p style={{ color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: '600' }}>{f.role}</p>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>⭐⭐⭐⭐⭐</div>
                <button className="btn btn-secondary" style={{ width: '100%' }}>View Profile</button>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Testimonials */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px' }}>What our users say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="testimonial-card" key={item}>
                <div style={{ marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Freelancer Hub completely changed how we hire. The talent pool is incredible and the platform makes managing payments and communication a breeze."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E5E7EB' }}></div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>John Doe</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CEO at TechCorp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Pricing / Plans */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Simple, transparent pricing</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Choose the plan that fits your business needs</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', alignItems: 'center' }}>
            <div className="card" style={{ padding: '40px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Basic</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Perfect for individuals</p>
              <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>$0<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/mo</span></h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', textAlign: 'left' }}>
                <li style={{ marginBottom: '15px' }}>✓ Post up to 3 jobs/month</li>
                <li style={{ marginBottom: '15px' }}>✓ Basic search filters</li>
                <li style={{ marginBottom: '15px' }}>✓ Standard support</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%' }}>Start Free</button>
            </div>
            <div className="card" style={{ padding: '50px 40px', border: '2px solid var(--accent-primary)', transform: 'scale(1.05)', zIndex: 1 }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Pro</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>For growing teams</p>
              <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>$29<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/mo</span></h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', textAlign: 'left' }}>
                <li style={{ marginBottom: '15px' }}>✓ Unlimited job posts</li>
                <li style={{ marginBottom: '15px' }}>✓ Advanced AI matching</li>
                <li style={{ marginBottom: '15px' }}>✓ Priority 24/7 support</li>
                <li style={{ marginBottom: '15px' }}>✓ Dedicated account manager</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
            </div>
            <div className="card" style={{ padding: '40px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Enterprise</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>For large organizations</p>
              <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Custom</h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', textAlign: 'left' }}>
                <li style={{ marginBottom: '15px' }}>✓ Custom workflows</li>
                <li style={{ marginBottom: '15px' }}>✓ API access</li>
                <li style={{ marginBottom: '15px' }}>✓ Custom contracts</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%' }}>Contact Sales</button>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px' }}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { q: 'How does payment work?', a: 'Payments are held securely in escrow until you approve the delivered work.' },
              { q: 'What is the platform fee?', a: 'We charge a flat 5% fee on all completed projects. No hidden costs.' },
              { q: 'Can I cancel a project?', a: 'Yes, projects can be cancelled subject to our cancellation policy and dispute resolution process.' },
              { q: 'How are freelancers vetted?', a: 'We use a combination of AI screening, skill assessments, and manual review.' }
            ].map((faq, i) => (
              <div key={i} style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <h4 style={{ fontSize: '18px', marginBottom: '10px', cursor: 'pointer' }}>{faq.q} <span style={{ float: 'right' }}>+</span></h4>
                <p style={{ color: 'var(--text-secondary)', display: 'none' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Slogan CTA */}
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
