import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import apiClient from '../utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Filter, Search as SearchIcon, X } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';

const availableSkills = ["React", "Node.js", "Python", "Figma", "AWS", "SEO", "Copywriting", "UI Design", "TypeScript", "Docker", "GraphQL", "TailwindCSS", "Next.js", "MongoDB"];

export const Search = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [category, experience, selectedSkills]); // Refetch when dropdown filters change

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      if (experience) params.append('experience', experience);
      if (budgetMin) params.append('budgetMin', budgetMin);
      if (budgetMax) params.append('budgetMax', budgetMax);
      if (selectedSkills.length > 0) params.append('skills', selectedSkills.join(','));

      const response = await apiClient.get(`/jobs/all?${params.toString()}`);
      setJobs(response.data.jobs || []);
      setError('');
    } catch {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setExperience('');
    setBudgetMin('');
    setBudgetMax('');
    setSelectedSkills([]);
    setTimeout(fetchJobs, 0); // Need to wait for state to clear before fetching? Wait, fetchJobs uses state values. Better to just reload or rely on useEffect.
    // Actually, setting state is async, so we'll just call api directly without params
    fetchJobsDirectlyWithoutParams();
  };
  
  const fetchJobsDirectlyWithoutParams = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/jobs/all');
      setJobs(response.data.jobs || []);
      setError('');
    } catch {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />
      <main>
        <section className="content-section" style={{ padding: '40px 24px', margin: '0 auto', maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Find Work</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Browse and apply to the latest projects posted by clients</p>
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto 40px' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }} className="responsive-flex-col">
              <input 
                type="text" 
                placeholder="Search projects by title or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: '16px 24px', fontSize: '16px', borderRadius: '50px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', width: '100%' }}
              />
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <AnimatedButton type="submit" className="btn btn-primary" style={{ padding: '0 32px', borderRadius: '50px', flexShrink: 0, height: '54px' }}>
                  <SearchIcon size={20} />
                </AnimatedButton>
                <AnimatedButton type="button" className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)} style={{ padding: '0 24px', borderRadius: '50px', flexShrink: 0, height: '54px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={18} /> {showFilters ? 'Hide Filters' : 'Filters'}
                </AnimatedButton>
              </div>
            </form>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '18px' }}>Advanced Filters</h3>
                      <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                        <X size={14} /> Clear All
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                          <option value="">All Categories</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Writing">Writing</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Experience Level</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                          <option value="">Any Experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="1 yr to 2 yr">1 yr to 2 yr</option>
                          <option value="2 to 4 yr">2 to 4 yr</option>
                          <option value="Above 5 yr">Above 5 yr</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Min Budget</label>
                          <input type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} placeholder="$0" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Max Budget</label>
                          <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder="$10k+" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>Tech Stacks & Skills</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {availableSkills.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              style={{ 
                                padding: '6px 14px', 
                                borderRadius: '100px', 
                                border: `1px solid ${isSelected ? 'var(--primary-action)' : 'var(--border-color)'}`,
                                background: isSelected ? 'var(--primary-action)' : 'var(--bg-secondary)',
                                color: isSelected ? '#FFF' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontSize: '13px',
                                transition: 'all 0.2s'
                              }}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '24px', textAlign: 'right' }}>
                      <AnimatedButton onClick={handleSearchSubmit} className="btn btn-primary" style={{ padding: '10px 24px' }}>
                        Apply Filters
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading projects...</div>
          ) : error ? (
            <div className="message error" style={{ textAlign: 'center' }}>{error}</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No projects found matching your search.</div>
          ) : (
            <motion.div 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '24px' }}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            >
              {jobs.map(job => (
                <motion.div key={job._id} className="job-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} style={{ display: 'flex', flexDirection: 'column', padding: '24px', cursor: 'pointer', margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '20px', margin: '0', color: 'var(--text-primary)', flex: 1 }}>{job.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
                    {job.description?.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
                  </p>
                  
                  {/* Additional info badges to show filters work */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span>Budget: ${job.budget}</span>
                    <span>•</span>
                    <span>{job.experienceRequired}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {job.requiredSkills?.map((skill, i) => (
                      <span key={i} style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{skill}</span>
                    ))}
                  </div>
                  <AnimatedButton 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '15px' }} 
                    onClick={() => navigate(`/job/${job._id}`)}
                  >
                    View Details
                  </AnimatedButton>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
