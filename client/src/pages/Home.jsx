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
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'block' }}></span>
              Project in Active Development
            </div>
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              The premium <br /><span style={{ color: 'var(--accent-primary)' }}>talent network</span> for modern teams.
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
            <div style={{ width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}>
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Dashboard Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="zoom-in-image" />
               <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top right, rgba(0,0,0,0.1), transparent)', pointerEvents: 'none' }}></div>
            </div>
          </div>
        </section>

        {/* 2. Statistics */}
        <section className="content-section" style={{ maxWidth: '1200px', margin: '0 auto 80px' }} ref={(el) => sectionRefs.current.push(el)}>
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
              { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80', title: 'App Development', desc: 'Create seamless mobile experiences for both iOS and Android platforms.' }
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

        {/* 4. How It Works */}
        <section className="content-section zigzag-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '80px', textAlign: 'center' }}>How it works</h2>
          <div className="zigzag-container">
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Post a Project" className="zoom-in-image" />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>1. Post a Project</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Start by providing a comprehensive description of your project requirements, budget, and timeline. Our intuitive job posting flow ensures you capture exactly what you need to attract the best talent. Let our advanced AI matching system instantly connect you with highly qualified professionals whose skills perfectly align with your goals.</p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right">
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>2. Hire Top Talent</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Carefully review customized proposals, in-depth portfolios, and verified client reviews from our top-tier freelancers. Conduct interviews with your favorite candidates to ensure a perfect cultural and technical fit. Finally, hire the absolute best match for your project with complete confidence using our secure, industry-leading escrow system.</p>
              </div>
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Hire Top Talent" className="zoom-in-image" />
              </div>
            </div>
            <div className="zigzag-item zigzag-left">
              <div className="zigzag-image zoom-out-image-container">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Collaborate & Succeed" className="zoom-in-image" />
              </div>
              <div className="zigzag-content" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>3. Collaborate & Succeed</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Manage every aspect of your project in one centralized, easy-to-use workspace. Utilize our built-in real-time chat, structured milestone tracking, and secure file sharing to keep everything organized. This effortless project management approach ensures you can focus entirely on achieving successful outcomes and scaling your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Featured Freelancers */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>Featured Freelancers</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>Work with the top 1% of talent on our platform</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Alex M.', role: 'Senior Full Stack Developer', rate: '$85/hr', rating: '5.0', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
              { name: 'Sarah T.', role: 'UI/UX Designer', rate: '$65/hr', rating: '4.9', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
              { name: 'James W.', role: 'Data Scientist', rate: '$95/hr', rating: '4.9', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
              { name: 'Elena R.', role: 'Digital Marketer', rate: '$50/hr', rating: '5.0', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80' }
            ].map((freelancer, i) => (
              <div className="card" key={i} style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                  <img src={freelancer.img} alt={freelancer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="zoom-in-image" />
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{freelancer.name}</h3>
                <p style={{ color: 'var(--accent-primary)', fontWeight: '500', marginBottom: '15px' }}>{freelancer.role}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <span>⭐ {freelancer.rating}</span>
                  <span>💰 {freelancer.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Featured Jobs */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
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
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5', flex: 1 }}>{job.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                  <span style={{ fontWeight: '800', fontSize: '18px', color: 'var(--text-primary)' }}>{job.budget}</span>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Why Choose Us */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px', textAlign: 'center' }}>Built for performance and reliability</h2>
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

        {/* 8. Testimonials */}
        <section className="content-section" ref={(el) => sectionRefs.current.push(el)}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px', textAlign: 'center' }}>What Our Users Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"Freelancer Hub completely transformed how we hire. The quality of talent is unmatched, and the escrow system gives us complete peace of mind."</p>
              <div className="testimonial-author">— Michael T., Startup Founder</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"As a freelancer, this platform is a game-changer. I get access to premium clients without the race-to-the-bottom bidding wars."</p>
              <div className="testimonial-author">— Sarah J., Senior Designer</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The real-time sync and built-in project management tools save us hours every week. It's truly a production-ready environment."</p>
              <div className="testimonial-author">— David L., Product Manager</div>
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
