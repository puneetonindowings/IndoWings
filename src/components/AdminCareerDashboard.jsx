import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  LogOut,
  ChevronRight,
  Shield,
  Activity,
  ArrowLeft,
  X,
  Mail,
  Phone,
  Sparkles,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Archive,
  BarChart2,
  GraduationCap
} from 'lucide-react';
import { careerService, authService, ADMIN_EMAIL } from '../lib/supabase.js';
import { emailService } from '../lib/emailService.js';

export default function AdminCareerDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('active-jobs'); // 'active-jobs' | 'history' | 'applicants' | 'departments'
  
  // Data states
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailLogs, setEmailLogs] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all'); // 'all' | 'Full-Time' | 'Internship'

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // New Job Form State
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('');
  const [newJobCustomDept, setNewJobCustomDept] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Noida Aerospace HQ (On-Site)');
  const [newJobType, setNewJobType] = useState('Full-Time');
  const [newJobExp, setNewJobExp] = useState('3-5 Years');
  const [newJobSalary, setNewJobSalary] = useState('₹12L - ₹20L PA');
  const [newJobDuration, setNewJobDuration] = useState('10'); // Default 10 days!
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobReqs, setNewJobReqs] = useState('');

  // New Department Form State
  const [newDeptInput, setNewDeptInput] = useState('');

  // Load Data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const allJobs = await careerService.getAdminJobs();
      const allDepts = careerService.getDepartments();
      const allApps = await careerService.getApplications();

      setJobs(allJobs);
      setDepartments(allDepts);
      setApplications(allApps);

      const logs = emailService.getEmailLogs();
      const candEmails = await careerService.getCandidateEmails();
      setEmailLogs(logs);
      setCandidateCount(candEmails.length);

      if (allDepts.length > 0 && !newJobDept) {
        setNewJobDept(allDepts[0]);
      }
    } catch (e) {
      console.error('Error loading admin dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Filter Jobs: Active vs History/Expired
  const activeJobs = jobs.filter((j) => !j.is_expired && j.is_active);
  const historyJobs = jobs.filter((j) => j.is_expired || !j.is_active);

  // Filter Active Jobs by Search, Dept & Type
  const filteredActiveJobs = activeJobs.filter((j) => {
    const matchesSearch = 
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDeptFilter === 'all' || j.department === selectedDeptFilter;
    const matchesType = selectedTypeFilter === 'all' || j.type === selectedTypeFilter;
    return matchesSearch && matchesDept && matchesType;
  });

  // Filter Applicants
  const filteredApplicants = applications.filter((app) => {
    const matchesSearch = 
      app.candidate_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Remaining Days & Progress for a job
  const getJobTimelineData = (createdAt, expiresAt) => {
    if (!expiresAt) return { days: 999, text: 'Permanent', percent: 100 };
    const diffMs = new Date(expiresAt) - new Date();
    const days = Math.ceil(diffMs / 86400000);
    
    // total days calculation
    const totalMs = new Date(expiresAt) - new Date(createdAt || Date.now());
    const totalDays = Math.max(1, Math.ceil(totalMs / 86400000));
    const percent = Math.min(100, Math.max(0, Math.round((days / totalDays) * 100)));

    if (days <= 0) return { days: 0, text: 'Expired', percent: 0 };
    return { days, text: `${days} Days Left`, percent };
  };

  // Handle Create Job
  const handleCreateJobSubmit = async (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    let finalDept = newJobDept;
    if (newJobDept === '__custom__' && newJobCustomDept.trim()) {
      finalDept = newJobCustomDept.trim();
      careerService.addDepartment(finalDept);
    }

    const durationDays = parseInt(newJobDuration, 10) || 10;
    const expiresAt = new Date(Date.now() + durationDays * 86400000).toISOString();

    const newJob = {
      title: newJobTitle.trim(),
      department: finalDept || 'General Aerospace Engineering',
      location: newJobLocation,
      type: newJobType,
      experience: newJobExp,
      salary_range: newJobSalary,
      description: newJobDesc.trim(),
      requirements: newJobReqs.split('\n').filter(r => r.trim()).map(r => r.trim()),
      is_active: true,
      expires_at: expiresAt
    };

    await careerService.createJob(newJob);
    setIsCreateModalOpen(false);
    
    // Reset inputs
    setNewJobTitle('');
    setNewJobDesc('');
    setNewJobReqs('');
    setNewJobDuration('10');

    await loadDashboardData();
  };

  // Add 10 Days Life to a job
  const handleExtendJobLife = async (jobId, daysToAdd = 10) => {
    await careerService.extendJobValidity(jobId, daysToAdd);
    await loadDashboardData();
  };

  // Archive / Close a job
  const handleToggleJobStatus = async (jobId, currentStatus) => {
    await careerService.updateJobStatus(jobId, !currentStatus);
    await loadDashboardData();
  };

  // Delete Job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Delete this defense job posting permanently?')) {
      await careerService.deleteJob(jobId);
      await loadDashboardData();
    }
  };

  // Add Department
  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDeptInput.trim()) return;
    careerService.addDepartment(newDeptInput.trim());
    setNewDeptInput('');
    setIsAddDeptModalOpen(false);
    setDepartments(careerService.getDepartments());
  };

  // Update Application Status
  const handleUpdateAppStatus = async (appId, newStatus) => {
    await careerService.updateApplicationStatus(appId, newStatus);
    await loadDashboardData();
  };

  // Logout
  const handleLogout = async () => {
    await authService.signOut();
    if (onNavigate) onNavigate('login');
  };

  // Department color theme tags (Outcrowd soft tag style)
  const getDeptTagClass = (dept) => {
    const d = dept.toLowerCase();
    if (d.includes('avionics')) return 'outcrowd-tag-cyan';
    if (d.includes('ai') || d.includes('vision') || d.includes('indofly')) return 'outcrowd-tag-amber';
    if (d.includes('aerodynamics') || d.includes('composite')) return 'outcrowd-tag-violet';
    if (d.includes('c-uas') || d.includes('rf')) return 'outcrowd-tag-rose';
    if (d.includes('pilot') || d.includes('flight')) return 'outcrowd-tag-emerald';
    return 'outcrowd-tag-blue';
  };

  return (
    <div className="outcrowd-admin-stage">
      
      {/* =======================================================================
          OUTCROWD MODULAR CANVAS SHELL
          Matching Reference Image: media_1793432996124_99e3959a.jpg
          ======================================================================= */}
      <div className="outcrowd-shell">

        {/* -------------------------------------------------------------
            LEFT COMPACT VERTICAL DOCK (OUTCROWD ICON RAIL)
            ------------------------------------------------------------- */}
        <aside className="outcrowd-rail">
          <div className="outcrowd-rail-top">

            
            <nav className="outcrowd-rail-nav">
              <button 
                type="button" 
                onClick={() => setActiveTab('active-jobs')}
                className={`outcrowd-rail-btn ${activeTab === 'active-jobs' ? 'is-active' : ''}`}
                title="Active Job Postings"
              >
                <Briefcase size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => setActiveTab('history')}
                className={`outcrowd-rail-btn ${activeTab === 'history' ? 'is-active' : ''}`}
                title="History & Expired Postings"
              >
                <Clock size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => setActiveTab('applicants')}
                className={`outcrowd-rail-btn ${activeTab === 'applicants' ? 'is-active' : ''}`}
                title="Candidate Applications"
              >
                <Users size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => setActiveTab('departments')}
                className={`outcrowd-rail-btn ${activeTab === 'departments' ? 'is-active' : ''}`}
                title="Engineering Departments"
              >
                <FolderPlus size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => setActiveTab('emails')}
                className={`outcrowd-rail-btn ${activeTab === 'emails' ? 'is-active' : ''}`}
                title="Candidate Email Alerts"
              >
                <Mail size={18} />
              </button>
            </nav>
          </div>

          <div className="outcrowd-rail-bottom">
            <button 
              type="button" 
              onClick={() => onNavigate && onNavigate('career')} 
              className="outcrowd-rail-btn"
              title="Open Public Career Portal"
            >
              <ExternalLink size={18} />
            </button>
            <button 
              type="button" 
              onClick={handleLogout} 
              className="outcrowd-rail-btn is-logout"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* -------------------------------------------------------------
            MAIN WORKSPACE CONTENT
            ------------------------------------------------------------- */}
        <main className="outcrowd-main">
          
          {/* TOP BAR: SEARCH, PILL TABS, ADMIN PROFILE & POST BUTTON */}
          <header className="outcrowd-topbar">
            
            {/* Pill Tab Switcher (Matching Outcrowd [Dashboard | Postings | Reports]) */}
            <div className="outcrowd-pills">
              <button
                type="button"
                onClick={() => setActiveTab('active-jobs')}
                className={`outcrowd-pill ${activeTab === 'active-jobs' ? 'is-active' : ''}`}
              >
                Active Postings ({activeJobs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`outcrowd-pill ${activeTab === 'history' ? 'is-active' : ''}`}
              >
                History &amp; Expired ({historyJobs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('applicants')}
                className={`outcrowd-pill ${activeTab === 'applicants' ? 'is-active' : ''}`}
              >
                Applications ({applications.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('departments')}
                className={`outcrowd-pill ${activeTab === 'departments' ? 'is-active' : ''}`}
              >
                Departments ({departments.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('emails')}
                className={`outcrowd-pill ${activeTab === 'emails' ? 'is-active' : ''}`}
              >
                Candidate Mail Alerts ({candidateCount})
              </button>
            </div>

            {/* Right Group: Search, Quick Post Button, Profile Avatar */}
            <div className="outcrowd-top-actions">
              
              <div className="outcrowd-search-box">
                <Search size={15} className="outcrowd-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter openings or candidates..."
                  className="outcrowd-search-input"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="outcrowd-btn-add"
              >
                <Plus size={16} />
                <span>Post New Job</span>
              </button>

              <div className="outcrowd-profile-chip" title={ADMIN_EMAIL}>
                <div className="outcrowd-profile-avatar">
                  <Shield size={14} className="text-[#ff7a1a]" />
                </div>
                <div className="outcrowd-profile-info">
                  <span className="outcrowd-profile-name">Puneet Kushwaha</span>
                  <span className="outcrowd-profile-role">Admin</span>
                </div>
                <span className="outcrowd-status-dot" />
              </div>

            </div>

          </header>

          {/* OUTCROWD METRICS SUMMARY CARDS */}
          <div className="outcrowd-metrics-row">
            <div className="outcrowd-metric-card">
              <div className="outcrowd-metric-header">
                <span className="outcrowd-metric-title">LIVE ACTIVE OPENINGS</span>
                <Briefcase size={16} className="text-[#ff7a1a]" />
              </div>
              <div className="outcrowd-metric-val">{activeJobs.length}</div>
              <div className="outcrowd-metric-footer">Synced to public career portal</div>
            </div>

            <div className="outcrowd-metric-card">
              <div className="outcrowd-metric-header">
                <span className="outcrowd-metric-title">CANDIDATE APPLICATIONS</span>
                <Users size={16} className="text-[#10b981]" />
              </div>
              <div className="outcrowd-metric-val">{applications.length}</div>
              <div className="outcrowd-metric-footer">Resumes &amp; credentials received</div>
            </div>

            <div className="outcrowd-metric-card">
              <div className="outcrowd-metric-header">
                <span className="outcrowd-metric-title">EXPIRING IN &lt; 7 DAYS</span>
                <Clock size={16} className="text-[#f59e0b]" />
              </div>
              <div className="outcrowd-metric-val">
                {activeJobs.filter(j => {
                  const d = getJobTimelineData(j.created_at, j.expires_at).days;
                  return d > 0 && d <= 7;
                }).length}
              </div>
              <div className="outcrowd-metric-footer">Extend life with 1-click (+10 days)</div>
            </div>

            <div className="outcrowd-metric-card">
              <div className="outcrowd-metric-header">
                <span className="outcrowd-metric-title">DEFENSE DIVISIONS</span>
                <FolderPlus size={16} className="text-[#38bdf8]" />
              </div>
              <div className="outcrowd-metric-val">{departments.length}</div>
              <div className="outcrowd-metric-footer">Specialized engineering units</div>
            </div>
          </div>


          {/* =============================================================
              TAB 1: ACTIVE JOBS (Outcrowd Modular Card Grid)
              ============================================================= */}
          {activeTab === 'active-jobs' && (
            <div className="outcrowd-tab-view">
              
              <div className="outcrowd-view-header">
                <div>
                  <h2 className="outcrowd-view-title">Active Job Postings</h2>
                  <p className="outcrowd-view-desc">
                    These positions are currently live on the public IndoWings career board. When validity expires, positions automatically transfer to History.
                  </p>
                </div>

                <div className="outcrowd-filter-pills">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTypeFilter === 'all' ? 'bg-white text-black font-semibold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                    >
                      All Roles ({activeJobs.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTypeFilter('Full-Time')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTypeFilter === 'Full-Time' ? 'bg-white text-black font-semibold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                    >
                      Full-Time ({activeJobs.filter(j => j.type !== 'Internship').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTypeFilter('Internship')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${selectedTypeFilter === 'Internship' ? 'bg-[#38bdf8] text-black font-bold shadow-md shadow-[#38bdf8]/30' : 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 hover:bg-[#38bdf8]/20'}`}
                    >
                      <GraduationCap size={13} />
                      <span>Internships ({activeJobs.filter(j => j.type === 'Internship').length})</span>
                    </button>
                  </div>

                  <select
                    value={selectedDeptFilter}
                    onChange={(e) => setSelectedDeptFilter(e.target.value)}
                    className="outcrowd-select-filter"
                  >
                    <option value="all">All Departments ({activeJobs.length})</option>
                    {departments.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="outcrowd-empty-box">
                  <RefreshCw size={24} className="animate-spin text-[#ff7a1a] mb-2" />
                  <p>Loading active defense postings...</p>
                </div>
              ) : filteredActiveJobs.length === 0 ? (
                <div className="outcrowd-empty-box">
                  <Briefcase size={36} className="opacity-40 mb-3" />
                  <h3>No active postings found.</h3>
                  <p>Click "Post New Job" above to create a live position with customizable validity.</p>
                </div>
              ) : (
                <div className="outcrowd-cards-grid">
                  {filteredActiveJobs.map((job) => {
                    const timeline = getJobTimelineData(job.created_at, job.expires_at);
                    const isUrgent = timeline.days <= 5;
                    const isInternship = job.type === 'Internship';

                    return (
                      <div key={job.id} className={`outcrowd-job-card ${isInternship ? 'is-internship' : ''}`}>
                        
                        {/* Top: Department Tag, Internship Badge & Life Remaining */}
                        <div className="outcrowd-card-top">
                          <div className="flex items-center gap-2">
                            <span className={`outcrowd-tag ${getDeptTagClass(job.department)}`}>
                              {job.department}
                            </span>
                            {isInternship && (
                              <span className="outcrowd-intern-badge">
                                <GraduationCap size={12} />
                                <span>INTERNSHIP</span>
                              </span>
                            )}
                          </div>
                          <span className={`outcrowd-life-pill ${isUrgent ? 'is-urgent' : ''}`}>
                            <Clock size={12} />
                            <span>{timeline.text}</span>
                          </span>
                        </div>

                        {/* Title & Key Specs */}
                        <h3 className="outcrowd-card-title">{job.title}</h3>

                        <div className="outcrowd-card-specs">
                          <span className="outcrowd-spec-item">
                            <MapPin size={12} />
                            <span>{job.location}</span>
                          </span>
                          <span className="outcrowd-spec-item">
                            <Briefcase size={12} />
                            <span>{job.type} • {job.experience}</span>
                          </span>
                          {job.salary_range && (
                            <span className={`outcrowd-spec-item ${isInternship ? 'stipend' : 'salary'}`}>
                              <span>{isInternship ? `🎓 ${job.salary_range}` : job.salary_range}</span>
                            </span>
                          )}
                        </div>

                        {/* Short Description */}
                        {job.description && (
                          <p className="outcrowd-card-desc">
                            {job.description}
                          </p>
                        )}

                        {/* Validity Timeline Bar */}
                        <div className="outcrowd-timeline-box">
                          <div className="outcrowd-timeline-label">
                            <span>Job Validity Life</span>
                            <span>{timeline.text}</span>
                          </div>
                          <div className="outcrowd-progress-track">
                            <div 
                              className={`outcrowd-progress-fill ${isUrgent ? 'urgent-fill' : ''}`}
                              style={{ width: `${timeline.percent}%` }}
                            />
                          </div>
                        </div>

                        {/* Card Action Controls */}
                        <div className="outcrowd-card-actions">
                          <button
                            type="button"
                            onClick={() => handleExtendJobLife(job.id, 10)}
                            className="outcrowd-action-btn extend"
                            title="Extend job life by +10 days"
                          >
                            <Plus size={13} />
                            <span>+10 Days Life</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job.id, job.is_active)}
                            className="outcrowd-action-btn archive"
                            title="Move to History / Expired"
                          >
                            <Archive size={13} />
                            <span>Archive</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteJob(job.id)}
                            className="outcrowd-action-btn delete"
                            title="Delete permanently"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}


          {/* =============================================================
              TAB 2: HISTORY & EXPIRED
              ============================================================= */}
          {activeTab === 'history' && (
            <div className="outcrowd-tab-view">
              <div className="outcrowd-view-header">
                <div>
                  <h2 className="outcrowd-view-title">History &amp; Expired Positions</h2>
                  <p className="outcrowd-view-desc">
                    Positions whose validity period has elapsed or were manually archived. They are hidden from the public career page but preserved here in your records.
                  </p>
                </div>
              </div>

              {historyJobs.length === 0 ? (
                <div className="outcrowd-empty-box">
                  <Clock size={36} className="opacity-40 mb-3" />
                  <h3>No expired or archived jobs in history.</h3>
                  <p>When an active position passes its 10-day validity window, it will safely appear here.</p>
                </div>
              ) : (
                <div className="outcrowd-cards-grid">
                  {historyJobs.map((job) => (
                    <div key={job.id} className="outcrowd-job-card is-history">
                      <div className="outcrowd-card-top">
                        <span className="outcrowd-tag outcrowd-tag-gray">{job.department}</span>
                        <span className="outcrowd-life-pill is-expired">
                          <Clock size={12} />
                          <span>Validity Expired</span>
                        </span>
                      </div>

                      <h3 className="outcrowd-card-title">{job.title}</h3>
                      <div className="outcrowd-card-specs">
                        <span className="outcrowd-spec-item"><MapPin size={12} /> {job.location}</span>
                        <span className="outcrowd-spec-item">{job.type} • {job.experience}</span>
                      </div>

                      <div className="outcrowd-card-actions mt-4">
                        <button
                          type="button"
                          onClick={() => handleExtendJobLife(job.id, 10)}
                          className="outcrowd-action-btn extend"
                        >
                          <RefreshCw size={13} />
                          <span>Reactivate (+10 Days)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="outcrowd-action-btn delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* =============================================================
              TAB 3: CANDIDATE APPLICATIONS
              ============================================================= */}
          {activeTab === 'applicants' && (
            <div className="outcrowd-tab-view">
              <div className="outcrowd-view-header">
                <div>
                  <h2 className="outcrowd-view-title">Candidate Applications</h2>
                  <p className="outcrowd-view-desc">
                    Review incoming resumes, candidate qualifications, DGCA pilot licenses, and manage hiring pipeline statuses.
                  </p>
                </div>

                <div className="outcrowd-filter-pills">
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="outcrowd-select-filter"
                  >
                    <option value="all">All Application Statuses</option>
                    <option value="pending">Pending Review</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview Scheduled</option>
                    <option value="offer">Offer Extended</option>
                    <option value="rejected">Archived / Rejected</option>
                  </select>
                </div>
              </div>

              {filteredApplicants.length === 0 ? (
                <div className="outcrowd-empty-box">
                  <Users size={36} className="opacity-40 mb-3" />
                  <h3>No candidate applications found.</h3>
                  <p>When candidates apply via the public SpaceX-styled career page, their profiles and resumes will appear here instantly.</p>
                </div>
              ) : (
                <div className="outcrowd-table-card">
                  <table className="outcrowd-table">
                    <thead>
                      <tr>
                        <th>CANDIDATE</th>
                        <th>APPLIED ROLE</th>
                        <th>DEPARTMENT</th>
                        <th>CONTACT &amp; DGCA</th>
                        <th>RESUME</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplicants.map((app) => (
                        <tr key={app.id}>
                          <td>
                            <div className="outcrowd-candidate-name">{app.candidate_name}</div>
                            <div className="outcrowd-candidate-sub">{app.email}</div>
                          </td>
                          <td>
                            <span className="outcrowd-table-job">{app.job_title}</span>
                          </td>
                          <td>
                            <span className={`outcrowd-tag ${getDeptTagClass(app.department || '')}`}>
                              {app.department || 'General'}
                            </span>
                          </td>
                          <td>
                            <div className="outcrowd-contact-cell">
                              {app.phone && <div><Phone size={11} className="inline mr-1" />{app.phone}</div>}
                              {app.dgca_license_no && <div className="text-[#ff7a1a]">DGCA: {app.dgca_license_no}</div>}
                            </div>
                          </td>
                          <td>
                            {app.resume_url ? (
                              <button
                                type="button"
                                onClick={() => setSelectedApplicant(app)}
                                className="outcrowd-resume-btn"
                              >
                                <FileText size={13} />
                                <span>View File</span>
                              </button>
                            ) : (
                              <span className="opacity-40 text-xs">No attachment</span>
                            )}
                          </td>
                          <td>
                            <select
                              value={app.status || 'pending'}
                              onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                              className={`outcrowd-status-select status-${app.status || 'pending'}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="interview">Interview</option>
                              <option value="offer">Offer</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => setSelectedApplicant(app)}
                              className="outcrowd-icon-btn"
                              title="View Full Profile Details"
                            >
                              <Eye size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}


          {/* =============================================================
              TAB 4: DEPARTMENTS MANAGEMENT
              ============================================================= */}
          {activeTab === 'departments' && (
            <div className="outcrowd-tab-view">
              <div className="outcrowd-view-header">
                <div>
                  <h2 className="outcrowd-view-title">Defense Engineering Divisions</h2>
                  <p className="outcrowd-view-desc">
                    Manage the 6 official IndoWings aerospace departments and create custom divisions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddDeptModalOpen(true)}
                  className="outcrowd-btn-add"
                >
                  <Plus size={16} />
                  <span>Add Department</span>
                </button>
              </div>

              <div className="outcrowd-depts-grid">
                {departments.map((dept, idx) => {
                  const deptJobsCount = jobs.filter(j => j.department === dept && !j.is_expired && j.is_active).length;
                  const deptAppsCount = applications.filter(a => a.department === dept).length;

                  return (
                    <div key={idx} className="outcrowd-dept-card">
                      <div className="outcrowd-dept-card-top">
                        <span className={`outcrowd-tag ${getDeptTagClass(dept)}`}>
                          DIVISION 0{idx + 1}
                        </span>
                        <span className="outcrowd-dept-badge">{deptJobsCount} Active Jobs</span>
                      </div>

                      <h3 className="outcrowd-dept-name">{dept}</h3>
                      
                      <div className="outcrowd-dept-stats">
                        <div className="outcrowd-dept-stat">
                          <span className="val">{deptJobsCount}</span>
                          <span className="lbl">Open Roles</span>
                        </div>
                        <div className="outcrowd-dept-stat">
                          <span className="val">{deptAppsCount}</span>
                          <span className="lbl">Candidates</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        
          {/* =============================================================
              TAB 5: CANDIDATE EMAIL DISPATCHES & AUDIT LOGS
              ============================================================= */}
          {activeTab === 'emails' && (
            <div className="outcrowd-tab-view">
              <div className="outcrowd-view-header">
                <div>
                  <h2 className="outcrowd-view-title">Candidate Mail Automation &amp; Alerts</h2>
                  <p className="outcrowd-view-desc">
                    Every new job posting is automatically broadcast strictly to existing registered candidate emails in the database. General users do not receive job alerts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const logs = emailService.getEmailLogs();
                    const candEmails = await careerService.getCandidateEmails();
                    setEmailLogs(logs);
                    setCandidateCount(candEmails.length);
                  }}
                  className="outcrowd-btn-add"
                >
                  <RefreshCw size={15} />
                  <span>Refresh Mail Status</span>
                </button>
              </div>

              {/* Status Metric Cards */}
              <div className="outcrowd-metrics-row mb-6">
                <div className="outcrowd-metric-card">
                  <div className="outcrowd-metric-lbl">Verified Candidates in DB</div>
                  <div className="outcrowd-metric-val">{candidateCount}</div>
                  <div className="outcrowd-metric-sub">Eligible for instant job opening alerts</div>
                </div>

                <div className="outcrowd-metric-card">
                  <div className="outcrowd-metric-lbl">Total Emails Dispatched</div>
                  <div className="outcrowd-metric-val">{emailLogs.length}</div>
                  <div className="outcrowd-metric-sub">Transactional &amp; notification logs</div>
                </div>

                <div className="outcrowd-metric-card">
                  <div className="outcrowd-metric-lbl">Target Audience Engine</div>
                  <div className="outcrowd-metric-val" style={{ fontSize: '1.25rem', color: '#10b981' }}>Candidates Only</div>
                  <div className="outcrowd-metric-sub">General users strictly filtered out</div>
                </div>
              </div>

              {/* Dispatched Logs Table */}
              <div className="outcrowd-table-card">
                <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-sm text-white">Live Dispatched Mail Ledger</h3>
                  <span className="text-xs text-white/40">Real-time audit log</span>
                </div>

                {emailLogs.length === 0 ? (
                  <div className="outcrowd-empty-box">
                    <Mail size={32} className="opacity-40 mb-3" />
                    <h3>No email dispatches recorded yet.</h3>
                    <p>When candidates apply, register, or when you post a new defense role, dispatch logs will appear here.</p>
                  </div>
                ) : (
                  <table className="outcrowd-table">
                    <thead>
                      <tr>
                        <th>RECIPIENT</th>
                        <th>CATEGORY</th>
                        <th>SUBJECT / EVENT</th>
                        <th>TIMESTAMP</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <div className="outcrowd-candidate-name font-mono text-xs">{log.recipient}</div>
                          </td>
                          <td>
                            <span className={`outcrowd-tag ${
                              log.type === 'JOB_ALERT' ? 'outcrowd-tag-cyan' :
                              log.type === 'OTP' ? 'outcrowd-tag-amber' :
                              log.type === 'ADMIN_ALERT' ? 'outcrowd-tag-rose' : 'outcrowd-tag-emerald'
                            }`}>
                              {log.type}
                            </span>
                          </td>
                          <td>
                            <span className="text-sm text-white/90">{log.subject}</span>
                          </td>
                          <td>
                            <span className="text-xs text-white/50">{new Date(log.timestamp).toLocaleString()}</span>
                          </td>
                          <td>
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#10b981] font-semibold">
                              <CheckCircle2 size={13} /> {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

        </main>
      </div>


      {/* =======================================================================
          MODAL 1: POST NEW JOB MODAL (OUTCROWD GLASS)
          ======================================================================= */}
      {isCreateModalOpen && (
        <div className="outcrowd-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div className="outcrowd-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="outcrowd-modal-head">
              <div>
                <span className="outcrowd-modal-eyebrow">DEFENSE CAREER CONSOLE</span>
                <h3 className="outcrowd-modal-title">Create New Job Posting</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsCreateModalOpen(false)} 
                className="outcrowd-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="outcrowd-modal-form">
              <div className="outcrowd-form-row">
                <div className="outcrowd-field">
                  <label>Position Title *</label>
                  <input
                    type="text"
                    required
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="e.g. Lead Autopilot & Avionics Firmware Engineer"
                    className="outcrowd-input"
                  />
                </div>
              </div>

              <div className="outcrowd-form-row two-col">
                <div className="outcrowd-field">
                  <label>Department *</label>
                  <select
                    value={newJobDept}
                    onChange={(e) => setNewJobDept(e.target.value)}
                    className="outcrowd-select"
                  >
                    {departments.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                    <option value="__custom__">+ Custom Department</option>
                  </select>
                </div>

                {newJobDept === '__custom__' && (
                  <div className="outcrowd-field">
                    <label>Custom Department Name *</label>
                    <input
                      type="text"
                      required
                      value={newJobCustomDept}
                      onChange={(e) => setNewJobCustomDept(e.target.value)}
                      placeholder="e.g. Propulsion & Propulsion Drives"
                      className="outcrowd-input"
                    />
                  </div>
                )}

                <div className="outcrowd-field">
                  <label>Location *</label>
                  <input
                    type="text"
                    required
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="e.g. Noida Aerospace HQ (On-Site)"
                    className="outcrowd-input"
                  />
                </div>
              </div>

              <div className="outcrowd-form-row three-col">
                <div className="outcrowd-field">
                  <label>Employment Type *</label>
                  <select
                    value={newJobType}
                    onChange={(e) => {
                      const t = e.target.value;
                      setNewJobType(t);
                      if (t === 'Internship') {
                        if (!newJobSalary || newJobSalary.includes('PA')) setNewJobSalary('₹35,000 - ₹50,000 / Month Stipend');
                        if (!newJobExp || newJobExp.includes('Years')) setNewJobExp('Students / Pre-Final / Fresh Graduates');
                      } else {
                        if (newJobSalary.includes('Stipend')) setNewJobSalary('₹12L - ₹20L PA');
                        if (newJobExp.includes('Students')) setNewJobExp('3-5 Years');
                      }
                    }}
                    className="outcrowd-select"
                  >
                    <option value="Full-Time">Full-Time Defense</option>
                    <option value="Internship">🎓 Internship (Defense Technology)</option>
                    <option value="Contract">Contract / Fellowship</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>

                <div className="outcrowd-field">
                  <label>{newJobType === 'Internship' ? 'Eligible Candidates' : 'Experience Required'}</label>
                  <input
                    type="text"
                    value={newJobExp}
                    onChange={(e) => setNewJobExp(e.target.value)}
                    placeholder={newJobType === 'Internship' ? 'e.g. Students / Fresh Graduates' : 'e.g. 3+ Years'}
                    className="outcrowd-input"
                  />
                </div>

                <div className="outcrowd-field">
                  <label>{newJobType === 'Internship' ? 'Monthly Stipend' : 'Salary Package (Annual)'}</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    placeholder={newJobType === 'Internship' ? 'e.g. ₹35,000 - ₹50,000 / Mo' : 'e.g. ₹15L - ₹24L PA'}
                    className="outcrowd-input"
                  />
                </div>
              </div>

              {newJobType === 'Internship' && (
                <div className="p-3 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center gap-2 text-xs text-[#38bdf8]">
                  <GraduationCap size={16} />
                  <span>This position will be highlighted on the public portal as an Official Defense Internship.</span>
                </div>
              )}

              {/* POSTING VALIDITY LIFE (AUTO-EXPIRY CONTROLS) */}
              <div className="outcrowd-field life-highlight">
                <label className="life-label">
                  <span>Posting Validity Life (Days)</span>
                  <span className="life-sub">After this duration, the job automatically expires from the public career portal.</span>
                </label>
                <div className="outcrowd-life-selector">
                  {['7', '10', '15', '30', '60'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setNewJobDuration(d)}
                      className={`outcrowd-life-chip ${newJobDuration === d ? 'is-active' : ''}`}
                    >
                      {d} Days {d === '10' ? '(Default)' : ''}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={newJobDuration}
                    onChange={(e) => setNewJobDuration(e.target.value)}
                    placeholder="Custom"
                    className="outcrowd-life-input"
                  />
                </div>
              </div>

              <div className="outcrowd-field">
                <label>Job Description</label>
                <textarea
                  rows={3}
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  placeholder="Detail primary engineering responsibilities, project stack, and mission objectives..."
                  className="outcrowd-textarea"
                />
              </div>

              <div className="outcrowd-modal-foot">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="outcrowd-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="outcrowd-btn-publish"
                >
                  Publish Live to Career Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* =======================================================================
          MODAL 2: ADD DEPARTMENT MODAL
          ======================================================================= */}
      {isAddDeptModalOpen && (
        <div className="outcrowd-modal-backdrop" onClick={() => setIsAddDeptModalOpen(false)}>
          <div className="outcrowd-modal-dialog small" onClick={(e) => e.stopPropagation()}>
            <div className="outcrowd-modal-head">
              <h3 className="outcrowd-modal-title">Add Engineering Department</h3>
              <button type="button" onClick={() => setIsAddDeptModalOpen(false)} className="outcrowd-modal-close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddDept} className="outcrowd-modal-form">
              <div className="outcrowd-field">
                <label>Department Name *</label>
                <input
                  type="text"
                  required
                  value={newDeptInput}
                  onChange={(e) => setNewDeptInput(e.target.value)}
                  placeholder="e.g. Swarm Robotics & Ground Control"
                  className="outcrowd-input"
                />
              </div>
              <div className="outcrowd-modal-foot">
                <button type="button" onClick={() => setIsAddDeptModalOpen(false)} className="outcrowd-btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="outcrowd-btn-publish">
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* =======================================================================
          MODAL 3: VIEW APPLICANT PROFILE DETAILS
          ======================================================================= */}
      {selectedApplicant && (
        <div className="outcrowd-modal-backdrop" onClick={() => setSelectedApplicant(null)}>
          <div className="outcrowd-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="outcrowd-modal-head">
              <div>
                <span className="outcrowd-modal-eyebrow">CANDIDATE DOSSIER</span>
                <h3 className="outcrowd-modal-title">{selectedApplicant.candidate_name}</h3>
              </div>
              <button type="button" onClick={() => setSelectedApplicant(null)} className="outcrowd-modal-close">
                <X size={18} />
              </button>
            </div>

            <div className="outcrowd-dossier-body">
              <div className="outcrowd-dossier-grid">
                <div>
                  <label className="text-xs text-white/50">Target Position</label>
                  <p className="font-semibold text-white">{selectedApplicant.job_title}</p>
                </div>
                <div>
                  <label className="text-xs text-white/50">Department</label>
                  <p className="font-semibold text-white">{selectedApplicant.department}</p>
                </div>
                <div>
                  <label className="text-xs text-white/50">Email</label>
                  <p className="text-white">{selectedApplicant.email}</p>
                </div>
                <div>
                  <label className="text-xs text-white/50">Phone</label>
                  <p className="text-white">{selectedApplicant.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/50">DGCA Remote Pilot License</label>
                  <p className="text-[#ff7a1a] font-mono">{selectedApplicant.dgca_license_no || 'None'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/50">LinkedIn / Portfolio</label>
                  <p>
                    {selectedApplicant.linkedin_url ? (
                      <a href={selectedApplicant.linkedin_url} target="_blank" rel="noreferrer" className="text-[#38bdf8] underline text-sm">
                        {selectedApplicant.linkedin_url}
                      </a>
                    ) : 'Not provided'}
                  </p>
                </div>
              </div>

              {selectedApplicant.notes && (
                <div className="mt-4">
                  <label className="text-xs text-white/50">Candidate Qualification Notes</label>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white/80 mt-1">
                    {selectedApplicant.notes}
                  </div>
                </div>
              )}

              {selectedApplicant.resume_url && (
                <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-[#ff7a1a]" />
                    <span className="text-sm font-mono text-white/90">{selectedApplicant.resume_url}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-[#ff7a1a]/20 text-[#ff7a1a]">Attached PDF</span>
                </div>
              )}
            </div>

            <div className="outcrowd-modal-foot">
              <button type="button" onClick={() => setSelectedApplicant(null)} className="outcrowd-btn-cancel">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
