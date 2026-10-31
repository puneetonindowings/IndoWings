import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Upload,
  FileText,
  X,
  ExternalLink,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  Cpu,
  Eye,
  Radio,
  Plane,
  TrendingUp,
  Compass,
  ArrowUpRight,
  GraduationCap,
  Filter
} from 'lucide-react';
import { careerService } from '../lib/supabase.js';

export default function CareerPage({ onNavigate, onOpenDemo }) {
  const containerRef = useRef(null);

  // View state: 'overview' (SpaceX Career Story) | 'jobs' (Exact SpaceX Jobs Directory from Image 1)
  const [viewMode, setViewMode] = useState(() => {
    return window.location.hash.includes('jobs') ? 'jobs' : 'overview';
  });

  // Data states
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States for SpaceX Jobs Directory (Image 1)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepts, setSelectedDepts] = useState(['ANY']);
  const [selectedLocations, setSelectedLocations] = useState(['ANY']);
  const [selectedTypes, setSelectedTypes] = useState(['ANY']);

  // Accordion Open/Close states in Left Sidebar
  const [openAccordions, setOpenAccordions] = useState({
    program: true,
    location: true,
    discipline: true
  });

  // Apply Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form inputs
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateLinkedin, setCandidateLinkedin] = useState('');
  const [candidateDgca, setCandidateDgca] = useState('');
  const [candidateNote, setCandidateNote] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [formError, setFormError] = useState('');

  // Pre-defined available locations
  const availableLocations = [
    'Noida Aerospace HQ (On-Site)',
    'Bengaluru Autonomy Lab',
    'Field Operations / Nationwide',
    'Hybrid / Remote'
  ];

  // Pre-defined available types
  const availableTypes = [
    'Full-Time',
    'Internship'
  ];

  // Load public jobs and departments
  const loadData = async () => {
    setLoading(true);
    try {
      const publicJobs = await careerService.getPublicJobs();
      const allDepts = careerService.getDepartments();
      setJobs(publicJobs);
      setDepartments(allDepts);
    } catch (e) {
      console.error('Failed to load public career data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  // Listen to hash changes for jobs view
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.includes('jobs')) {
        setViewMode('jobs');
      } else {
        setViewMode('overview');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // GSAP Entrance for Overview
  useEffect(() => {
    if (viewMode === 'overview') {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.spacex-hero-anim',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(
          '.spacex-drone-flight',
          { x: -50, y: 50, opacity: 0 },
          { x: 0, y: 0, opacity: 0.85, duration: 1.8, ease: 'power2.out', delay: 0.3 }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [viewMode]);

  // Open Jobs Directory with specific filters
  const openJobsDirectory = (options = {}) => {
    if (options.department) {
      setSelectedDepts([options.department]);
    } else {
      setSelectedDepts(['ANY']);
    }

    if (options.type) {
      setSelectedTypes([options.type]);
    } else {
      setSelectedTypes(['ANY']);
    }

    if (options.search) {
      setSearchQuery(options.search);
    }

    window.location.hash = '#/company/career/jobs';
    setViewMode('jobs');
    window.scrollTo(0, 0);
  };

  // Close Jobs Directory and return to Overview
  const closeJobsDirectory = () => {
    window.location.hash = '#/company/career';
    setViewMode('overview');
    window.scrollTo(0, 0);
  };

  // Toggle filter checkbox helper
  const handleToggleFilter = (filterKey, value) => {
    let current;
    let setter;

    if (filterKey === 'dept') {
      current = selectedDepts;
      setter = setSelectedDepts;
    } else if (filterKey === 'loc') {
      current = selectedLocations;
      setter = setSelectedLocations;
    } else if (filterKey === 'type') {
      current = selectedTypes;
      setter = setSelectedTypes;
    }

    if (value === 'ANY') {
      setter(['ANY']);
      return;
    }

    let updated = current.filter(item => item !== 'ANY');
    if (updated.includes(value)) {
      updated = updated.filter(item => item !== value);
      if (updated.length === 0) updated = ['ANY'];
    } else {
      updated.push(value);
    }
    setter(updated);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedDepts(['ANY']);
    setSelectedLocations(['ANY']);
    setSelectedTypes(['ANY']);
    setSearchQuery('');
  };

  // Toggle accordion section
  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter Jobs for Directory (Image 1 logic)
  const filteredJobs = jobs.filter(job => {
    // 1. Department filter
    const matchesDept = 
      selectedDepts.includes('ANY') || 
      selectedDepts.includes(job.department);

    // 2. Location filter
    const matchesLoc = 
      selectedLocations.includes('ANY') || 
      selectedLocations.some(loc => job.location.toLowerCase().includes(loc.toLowerCase().split(' ')[0]));

    // 3. Type filter
    const matchesType = 
      selectedTypes.includes('ANY') || 
      selectedTypes.includes(job.type);

    // 4. Search query
    const matchesQuery = 
      !searchQuery.trim() ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesLoc && matchesType && job.is_active;
  });

  // Group filtered jobs by department (or by Category like Image 1: AEROSPACE & MECHANICAL)
  const groupedJobs = departments.reduce((acc, dept) => {
    const list = filteredJobs.filter(j => j.department === dept);
    if (list.length > 0) {
      acc[dept] = list;
    }
    return acc;
  }, {});

  // Open Apply Modal
  const handleOpenApply = (job = null) => {
    setSelectedJobForApply(job);
    setIsApplyModalOpen(true);
    setSubmitSuccess(false);
    setFormError('');
  };

  // Submit Application to Supabase
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!candidateName.trim() || !candidateEmail.trim()) {
      setFormError('Please provide your full name and valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData = {
        job_id: selectedJobForApply?.id || null,
        job_title: selectedJobForApply?.title || 'General Aerospace Application',
        department: selectedJobForApply?.department || 'General Engineering',
        candidate_name: candidateName.trim(),
        email: candidateEmail.trim(),
        phone: candidatePhone.trim(),
        linkedin_url: candidateLinkedin.trim(),
        dgca_license_no: candidateDgca.trim(),
        resume_url: resumeFile ? `resume_${Date.now()}_${resumeFile.name}` : null,
        notes: candidateNote.trim()
      };

      const res = await careerService.submitApplication(applicationData);
      if (res.error) {
        setFormError(res.error);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setFormError('Failed to submit application. Please verify your connection.');
    }
  };

  return (
    <div ref={containerRef} className="spacex-career-stage">

      {/* =======================================================================
          VIEW MODE 1: SPACEX CAREER OVERVIEW (STORY + HERO)
          ======================================================================= */}
      {viewMode === 'overview' && (
        <>
          {/* SECTION 1: SPACEX HERO ('FIND YOUR FUTURE') */}
          <section className="spacex-hero-section">
            <div className="spacex-celestial-canvas">
              <div className="spacex-stars" />
              <div className="spacex-lunar-globe" />
              <div className="spacex-lunar-atmosphere" />
              <div className="spacex-drone-flight">
                <img 
                  src="/assets/cyberonepro-official.png" 
                  alt="IndoWings Cyberone Drone" 
                  className="spacex-hero-drone-img"
                />
              </div>
            </div>

            <div className="spacex-hero-content">
              <h1 className="spacex-hero-title spacex-hero-anim">
                FIND YOUR FUTURE
              </h1>
              <p className="spacex-hero-subtitle spacex-hero-anim">
                IndoWings is looking for world class talent ready to tackle challenging projects that will sovereignly protect our nation and advance autonomous aerospace defense. We are an equal opportunity employer offering competitive salaries, comprehensive health benefits and equity packages.
              </p>

              {/* SpaceX Search Console: Clicking SEARCH opens Image 1 Directory! */}
              <div className="spacex-search-console spacex-hero-anim">
                <div className="spacex-search-input-wrap">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by position, keyword, or technology..."
                    className="spacex-search-input"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        openJobsDirectory({ search: searchQuery });
                      }
                    }}
                  />
                  <Search size={16} className="spacex-search-icon" />
                </div>

                <div className="spacex-search-select-wrap">
                  <select
                    value={selectedDepts[0] || 'ANY'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'ANY') setSelectedDepts(['ANY']);
                      else setSelectedDepts([val]);
                    }}
                    className="spacex-search-select"
                  >
                    <option value="ANY">All Programs &amp; Departments</option>
                    {departments.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="spacex-select-arrow" />
                </div>

                <button
                  type="button"
                  onClick={() => openJobsDirectory({ search: searchQuery, department: selectedDepts[0] !== 'ANY' ? selectedDepts[0] : null })}
                  className="spacex-search-btn"
                >
                  SEARCH
                </button>
              </div>

              {/* Sub-Links: VIEW ALL OPENINGS | INTERNSHIPS */}
              <div className="spacex-hero-links spacex-hero-anim">
                <button 
                  type="button" 
                  onClick={() => openJobsDirectory()} 
                  className="spacex-sublink"
                >
                  VIEW ALL OPENINGS
                </button>
                <span className="spacex-link-sep">|</span>
                <button 
                  type="button" 
                  onClick={() => openJobsDirectory({ type: 'Internship' })} 
                  className="spacex-sublink highlight"
                >
                  INTERNSHIPS
                </button>
              </div>

              <div className="spacex-scroll-indicator" onClick={() => openJobsDirectory()}>
                <ChevronDown size={24} className="spacex-bounce-arrow" />
              </div>
            </div>
          </section>

          {/* SECTION 2: SPACEX 'MAKE AN IMPACT' */}
          <section className="spacex-impact-section">
            <div className="spacex-impact-grid">
              <div className="spacex-impact-visual">
                <div className="spacex-impact-img-wrap">
                  <img 
                    src="/assets/indo-cockpit.png" 
                    alt="IndoWings Flight Operator" 
                    className="spacex-impact-img"
                  />
                  <div className="spacex-impact-overlay" />
                </div>
              </div>

              <div className="spacex-impact-content">
                <h2 className="spacex-impact-title">
                  MAKE AN IMPACT
                </h2>
                <p className="spacex-impact-text">
                  On a daily basis, IndoWings employees work on programs and projects with the potential to notably impact our lives in India and empower national sovereignty. From redundant flight avionics to global border surveillance networks to tactical counter-drone systems, our employees take pride in solving hard problems that have tangible impacts on our future in autonomous defense.
                </p>
                <div className="spacex-impact-metrics">
                  <div className="spacex-metric-card">
                    <div className="spacex-metric-num">100%</div>
                    <div className="spacex-metric-label">Sovereign Make-In-India IP</div>
                  </div>
                  <div className="spacex-metric-card">
                    <div className="spacex-metric-num">DGCA</div>
                    <div className="spacex-metric-label">Type-Certified Flight Operations</div>
                  </div>
                  <div className="spacex-metric-card">
                    <div className="spacex-metric-num">24/7</div>
                    <div className="spacex-metric-label">Critical Border Security Telemetry</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SPACEX 'LIFE AT INDOWINGS' */}
          <section className="spacex-life-section">
            <div className="spacex-saturn-atmosphere">
              <div className="spacex-saturn-rings" />
              <div className="spacex-saturn-drone">
                <img src="/assets/cyberonemax-official.png" alt="Cyberone Max" className="spacex-saturn-drone-img" />
              </div>
            </div>

            <div className="spacex-life-content">
              <h2 className="spacex-life-title">
                LIFE AT INDOWINGS
              </h2>
              <p className="spacex-life-text">
                At IndoWings, we are actively developing technologies with the potential to change the course of aerospace innovation in India and beyond. We believe that hard work and innovative solutions result in big gains, so we prioritize hiring top talent and cultivating a culture based on merit. From building our sovereign drone platforms to working with defense commanders, all IndoWings employees directly contribute to making our mission a reality.
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <button 
                  type="button" 
                  onClick={() => openJobsDirectory()}
                  className="spacex-life-btn"
                >
                  EXPLORE CAREERS &amp; OPENINGS
                </button>
              </div>
            </div>
          </section>
        </>
      )}


      {/* =======================================================================
          VIEW MODE 2: EXACT SPACEX JOBS DIRECTORY (FIRST IMAGE REFERENCE)
          Matching: media_1793436741254_dc29513a.png (spacex.com/careers/jobs)
          ======================================================================= */}
      {viewMode === 'jobs' && (
        <div className="spacex-directory-fullscreen">
          
          <div className="spacex-directory-container">
            
            {/* -------------------------------------------------------------
                LEFT COLUMN: ACCORDION FILTER SIDEBAR (EXACT MATCH TO IMAGE 1)
                ------------------------------------------------------------- */}
            <aside className="spacex-sidebar-accordion">
              
              {/* ACCORDION 1: PROGRAM / DEPARTMENT */}
              <div className="spacex-accordion-group">
                <button
                  type="button"
                  onClick={() => toggleAccordion('program')}
                  className="spacex-accordion-head"
                >
                  <span className="spacex-acc-title">PROGRAM</span>
                  {openAccordions.program ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openAccordions.program && (
                  <div className="spacex-accordion-body">
                    {/* ANY CHECKBOX */}
                    <label className="spacex-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedDepts.includes('ANY')}
                        onChange={() => handleToggleFilter('dept', 'ANY')}
                        className="spacex-checkbox-input"
                      />
                      <span className="spacex-checkbox-custom" />
                      <span className="spacex-checkbox-label">ANY</span>
                    </label>

                    {/* EACH DEPARTMENT */}
                    {departments.map((dept, idx) => (
                      <label key={idx} className="spacex-checkbox-row">
                        <input
                          type="checkbox"
                          checked={selectedDepts.includes(dept)}
                          onChange={() => handleToggleFilter('dept', dept)}
                          className="spacex-checkbox-input"
                        />
                        <span className="spacex-checkbox-custom" />
                        <span className="spacex-checkbox-label">{dept}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ACCORDION 2: LOCATION */}
              <div className="spacex-accordion-group">
                <button
                  type="button"
                  onClick={() => toggleAccordion('location')}
                  className="spacex-accordion-head"
                >
                  <span className="spacex-acc-title">LOCATION</span>
                  {openAccordions.location ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openAccordions.location && (
                  <div className="spacex-accordion-body">
                    <label className="spacex-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes('ANY')}
                        onChange={() => handleToggleFilter('loc', 'ANY')}
                        className="spacex-checkbox-input"
                      />
                      <span className="spacex-checkbox-custom" />
                      <span className="spacex-checkbox-label">ANY</span>
                    </label>

                    {availableLocations.map((loc, idx) => (
                      <label key={idx} className="spacex-checkbox-row">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(loc)}
                          onChange={() => handleToggleFilter('loc', loc)}
                          className="spacex-checkbox-input"
                        />
                        <span className="spacex-checkbox-custom" />
                        <span className="spacex-checkbox-label">{loc}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ACCORDION 3: POSITION TYPE / DISCIPLINE */}
              <div className="spacex-accordion-group">
                <button
                  type="button"
                  onClick={() => toggleAccordion('discipline')}
                  className="spacex-accordion-head"
                >
                  <span className="spacex-acc-title">DISCIPLINE / TYPE</span>
                  {openAccordions.discipline ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openAccordions.discipline && (
                  <div className="spacex-accordion-body">
                    <label className="spacex-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('ANY')}
                        onChange={() => handleToggleFilter('type', 'ANY')}
                        className="spacex-checkbox-input"
                      />
                      <span className="spacex-checkbox-custom" />
                      <span className="spacex-checkbox-label">ANY</span>
                    </label>

                    <label className="spacex-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('Full-Time')}
                        onChange={() => handleToggleFilter('type', 'Full-Time')}
                        className="spacex-checkbox-input"
                      />
                      <span className="spacex-checkbox-custom" />
                      <span className="spacex-checkbox-label">FULL-TIME DEFENSE</span>
                    </label>

                    <label className="spacex-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('Internship')}
                        onChange={() => handleToggleFilter('type', 'Internship')}
                        className="spacex-checkbox-input"
                      />
                      <span className="spacex-checkbox-custom" />
                      <span className="spacex-checkbox-label text-[#38bdf8] font-bold">INTERNSHIPS</span>
                    </label>
                  </div>
                )}
              </div>

              {/* CLEAR ALL BUTTON (Matching Image 1) */}
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="spacex-clear-all-btn"
              >
                CLEAR ALL
              </button>

              {/* FLOATING CIRCULAR CLOSE BUTTON (Matching Image 1 bottom left '✕') */}
              <div className="spacex-floating-close-wrap">
                <button
                  type="button"
                  onClick={closeJobsDirectory}
                  className="spacex-floating-close-btn"
                  title="Close jobs directory and return to overview"
                >
                  <X size={20} />
                </button>
                <span className="spacex-close-tip">Return to Overview</span>
              </div>

            </aside>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: SEARCH & ROLE LISTING ROWS (IMAGE 1)
                ------------------------------------------------------------- */}
            <main className="spacex-directory-main">
              
              {/* TOP SEARCH INPUT BAR */}
              <div className="spacex-role-search-wrap">
                <Search size={16} className="spacex-role-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a role..."
                  className="spacex-role-search-input"
                />
              </div>

              {/* RESULTS SUMMARY */}
              <div className="spacex-directory-summary">
                <span>{filteredJobs.length} Position{filteredJobs.length === 1 ? '' : 's'} available</span>
                {selectedTypes.includes('Internship') && (
                  <span className="spacex-internship-active-pill">
                    🎓 INTERNSHIPS FILTER ACTIVE
                  </span>
                )}
              </div>

              {/* GROUPED ROLE LISTINGS ROWS (Matching Image 1) */}
              {loading ? (
                <div className="spacex-directory-empty">
                  <div className="spacex-loading-pulse" />
                  <p>Querying sovereign positions...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="spacex-directory-empty">
                  <Shield size={36} className="text-[#ff7a1a] mb-3" />
                  <h3>No open positions matching your selected criteria.</h3>
                  <p>Try clearing filters or search for another keyword.</p>
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="spacex-btn-primary mt-4"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="spacex-directory-groups">
                  {Object.entries(groupedJobs).map(([deptName, deptJobs]) => (
                    <div key={deptName} className="spacex-dept-group-block">
                      
                      {/* CATEGORY HEADER (e.g. AEROSPACE & MECHANICAL in Image 1) */}
                      <div className="spacex-group-header">
                        {deptName.toUpperCase()}
                      </div>

                      {/* ROLE ROWS (Matching Image 1) */}
                      <div className="spacex-group-rows">
                        {deptJobs.map((job) => {
                          const isInternship = job.type === 'Internship';

                          return (
                            <div
                              key={job.id}
                              onClick={() => handleOpenApply(job)}
                              className={`spacex-role-row ${isInternship ? 'is-internship-row' : ''}`}
                            >
                              {/* Left: Role Title */}
                              <div className="spacex-role-left">
                                <span className="spacex-role-title">
                                  {job.title}
                                </span>
                                {isInternship && (
                                  <span className="spacex-intern-badge">
                                    <GraduationCap size={12} />
                                    <span>INTERNSHIP</span>
                                  </span>
                                )}
                              </div>

                              {/* Right: Location + Arrow ↗ */}
                              <div className="spacex-role-right">
                                <span className="spacex-role-location">{job.location}</span>
                                <ArrowUpRight size={17} className="spacex-role-arrow" />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </main>

          </div>

        </div>
      )}


      {/* =======================================================================
          APPLICATION MODAL (CLEAN SPACEX GLASS FORM)
          ======================================================================= */}
      {isApplyModalOpen && (
        <div className="spacex-modal-backdrop" onClick={() => setIsApplyModalOpen(false)}>
          <div className="spacex-modal-card" onClick={(e) => e.stopPropagation()}>
            
            <button 
              type="button" 
              onClick={() => setIsApplyModalOpen(false)} 
              className="spacex-modal-close"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitSuccess ? (
              <div className="spacex-modal-success">
                <div className="spacex-success-icon-box">
                  <CheckCircle2 size={40} className="text-[#10b981]" />
                </div>
                <h2>Application Submitted Successfully</h2>
                <p>
                  Thank you, <strong>{candidateName}</strong>. Your application for <strong>{selectedJobForApply?.title || 'Aerospace Position'}</strong> has been registered in the IndoWings talent database.
                </p>
                <div className="spacex-success-id">
                  CLEARANCE REF: IW-{(Math.random()*1000000).toFixed(0)}
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="spacex-btn-primary"
                >
                  Close &amp; Return to Openings
                </button>
              </div>
            ) : (
              <>
                <div className="spacex-modal-header">
                  <span className="spacex-modal-tag">INDOWINGS TALENT ACQUISITION</span>
                  <h3 className="spacex-modal-title">
                    {selectedJobForApply ? selectedJobForApply.title : 'General Aerospace Application'}
                  </h3>
                  <p className="spacex-modal-dept">
                    {selectedJobForApply ? `${selectedJobForApply.department} • ${selectedJobForApply.location}` : 'Defense Engineering & Operations'}
                  </p>
                  {selectedJobForApply?.type === 'Internship' && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-semibold">
                      <GraduationCap size={14} />
                      <span>OFFICIAL INDOWINGS DEFENSE INTERNSHIP PROGRAM</span>
                    </div>
                  )}
                </div>

                {formError && (
                  <div className="spacex-modal-alert">
                    <AlertCircle size={15} />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleApplySubmit} className="spacex-modal-form">
                  <div className="spacex-form-grid">
                    <div className="spacex-input-wrap">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="spacex-input"
                      />
                    </div>

                    <div className="spacex-input-wrap">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="e.g. vikram@aerospace.in"
                        className="spacex-input"
                      />
                    </div>

                    <div className="spacex-input-wrap">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="spacex-input"
                      />
                    </div>

                    <div className="spacex-input-wrap">
                      <label>LinkedIn / Portfolio / GitHub</label>
                      <input
                        type="url"
                        value={candidateLinkedin}
                        onChange={(e) => setCandidateLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="spacex-input"
                      />
                    </div>

                    <div className="spacex-input-wrap">
                      <label>DGCA Remote Pilot License No. (If applicable)</label>
                      <input
                        type="text"
                        value={candidateDgca}
                        onChange={(e) => setCandidateDgca(e.target.value)}
                        placeholder="e.g. DGCA-RPC-2025-XXXX"
                        className="spacex-input"
                      />
                    </div>

                    <div className="spacex-input-wrap">
                      <label>Resume / CV File *</label>
                      <div className="spacex-file-dropzone">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumeFile(e.target.files[0] || null)}
                          className="spacex-file-native"
                          id="spacex-resume-file"
                        />
                        <label htmlFor="spacex-resume-file" className="spacex-file-label">
                          <Upload size={16} />
                          <span>{resumeFile ? resumeFile.name : 'Upload Resume (PDF, DOCX up to 10MB)'}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="spacex-input-wrap full-width">
                    <label>Why IndoWings? / Key Defense Qualifications</label>
                    <textarea
                      rows={3}
                      value={candidateNote}
                      onChange={(e) => setCandidateNote(e.target.value)}
                      placeholder="Highlight relevant experience in avionics, computer vision, flight piloting, or defense engineering..."
                      className="spacex-textarea"
                    />
                  </div>

                  <div className="spacex-modal-footer">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="spacex-btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="spacex-btn-primary"
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
