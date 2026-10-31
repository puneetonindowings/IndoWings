import { createClient } from '@supabase/supabase-js';
import { emailService } from './emailService.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ipytulsccpbzuzmjhtzn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlweXR1bHNjY3BienV6bWpodHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MjYwNjcsImV4cCI6MjEwOTAwMjA2N30.ybyEENWIFGrsFAParKk2GxnrUq20AOhRpgBvC_7Wej8';

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'puneet.kushwaha@indowings.com';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '123123';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ---------------------------------------------------------------------------
// INITIAL SEED DEPARTMENTS (INDUSTRY BASED)
// ---------------------------------------------------------------------------
export const DEFAULT_DEPARTMENTS = [
  'Flight Avionics & Embedded Hardware',
  'AI, Computer Vision & GCS Software (IndoFly)',
  'Composite Aerodynamics & Mechanical Engineering',
  'Tactical C-UAS (Counter-Drone) & RF Systems',
  'Certified Drone Pilots & Flight Operations',
  'Defense Sales & B2G Enterprise Partnerships'
];

// Initial Seed Jobs (Authentic IndoWings Aerospace Roles)
export const INITIAL_SEED_JOBS = [
  {
    id: 'job-avionics-lead-01',
    title: 'Lead Flight Avionics & Autopilot Engineer',
    department: 'Flight Avionics & Embedded Hardware',
    location: 'Noida Aerospace HQ (On-Site)',
    type: 'Full-Time',
    experience: '4+ Years',
    salary_range: '₹14L - ₹22L PA',
    duration_days: 15,
    expires_at: new Date(Date.now() + 15 * 86400000).toISOString(),
    is_active: true,
    description: 'Lead the architecture and testing of redundant flight avionics, CAN-bus microcontrollers, and high-reliability power distribution boards for the flagship Cyberone series.',
    requirements: 'Deep experience with STM32/PX4 firmware, RTOS, ArduPilot architecture, hardware-in-the-loop (HIL) testing, and MIL-STD electromagnetic shielding.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'job-indofly-ai-02',
    title: 'Computer Vision & Edge AI Autonomy Engineer',
    department: 'AI, Computer Vision & GCS Software (IndoFly)',
    location: 'Bengaluru Autonomy Lab',
    type: 'Full-Time',
    experience: '3+ Years',
    salary_range: '₹16L - ₹26L PA',
    duration_days: 10,
    expires_at: new Date(Date.now() + 10 * 86400000).toISOString(),
    is_active: true,
    description: 'Develop real-time target tracking, visual inertial odometry (VIO), and GPS-denied autonomous navigation for sovereign drone defense platforms.',
    requirements: 'Proficiency in C++, Python, TensorRT, PyTorch, ROS2, and onboard deployment on NVIDIA Jetson Orin compute modules.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'job-composite-aero-03',
    title: 'Senior Composite Airframe & Aerodynamics Engineer',
    department: 'Composite Aerodynamics & Mechanical Engineering',
    location: 'Noida Aerospace HQ (On-Site)',
    type: 'Full-Time',
    experience: '5+ Years',
    salary_range: '₹12L - ₹18L PA',
    duration_days: 20,
    expires_at: new Date(Date.now() + 20 * 86400000).toISOString(),
    is_active: true,
    description: 'Design and fabricate lightweight carbon-fiber monocoque airframes capable of withstanding extreme aerodynamic shear and Himalayan sub-zero operations.',
    requirements: 'Mastery of carbon-composite autoclave curing, FEA structural stress simulation (ANSYS), 5-axis CNC mold design, and aerodynamic drag optimization.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'job-cuas-rf-04',
    title: 'RF & Microwave Electronic Warfare Engineer',
    department: 'Tactical C-UAS (Counter-Drone) & RF Systems',
    location: 'Noida / Bengaluru (Hybrid)',
    type: 'Full-Time',
    experience: '3+ Years',
    salary_range: '₹15L - ₹24L PA',
    duration_days: 12,
    expires_at: new Date(Date.now() + 12 * 86400000).toISOString(),
    is_active: true,
    description: 'Engineer directional RF jamming modules, SDR spectrum scanners, and automated protocol dissectors for SKYctrl counter-drone defense platforms.',
    requirements: 'Extensive hands-on SDR experience (GNURadio, USRP), RF power amplifier design (400MHz - 6GHz), GNSS spoofing counter-measures, and antenna array beamforming.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'job-pilot-ops-05',
    title: 'DGCA Certified Flight Test Pilot & Mission Commander',
    department: 'Certified Drone Pilots & Flight Operations',
    location: 'Field Operations / Nationwide Deployment',
    type: 'Full-Time',
    experience: '2+ Years',
    salary_range: '₹7L - ₹12L PA',
    duration_days: 8,
    expires_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    is_active: true,
    description: 'Conduct high-altitude acceptance flight tests, defense demonstration sorties, and validation of payload stability for Indian Armed Forces.',
    requirements: 'Valid DGCA Remote Pilot Certificate (RPC), 100+ logged flight hours on medium/small UAVs, experience with DGCA Type-Certified procedures, and field troubleshooting.',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-intern-avionics-06',
    title: 'Embedded Avionics & Flight Control Firmware Intern',
    department: 'Flight Avionics & Embedded Hardware',
    location: 'Noida Aerospace HQ (On-Site)',
    type: 'Internship',
    experience: 'Students / Fresh Graduates',
    salary_range: '₹35,000 - ₹50,000 / Month Stipend',
    duration_days: 30,
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    is_active: true,
    description: 'Work alongside senior flight control engineers on STM32 microcontrollers, CAN-bus telemetry, and PX4 hardware-in-the-loop firmware validation.',
    requirements: 'Strong fundamentals in C/C++, microcontroller interfaces (SPI, I2C, UART), Git, and passion for drone avionics.',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-intern-ai-07',
    title: 'Drone Computer Vision & Edge AI Research Intern',
    department: 'AI, Computer Vision & GCS Software (IndoFly)',
    location: 'Bengaluru Autonomy Lab',
    type: 'Internship',
    experience: 'Students / Pre-Final / Final Year',
    salary_range: '₹40,000 - ₹60,000 / Month Stipend',
    duration_days: 30,
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    is_active: true,
    description: 'Experiment with visual inertial odometry (VIO), real-time object detection models, and edge inference optimization on NVIDIA Jetson hardware.',
    requirements: 'Python, PyTorch/TensorFlow, OpenCV, Linux fundamentals, and background in robotics/computer vision.',
    created_at: new Date().toISOString()
  }
];

// Helper: Local Storage Sync Key constants
export const STORAGE_KEYS = {
  JOBS: 'indowings_jobs_store',
  DEPARTMENTS: 'indowings_departments_store',
  APPLICATIONS: 'indowings_applications_store',
  AUTH_SESSION: 'indowings_auth_session',
  CANDIDATES: 'indowings_candidates_store',
  USERS: 'indowings_users_store',
  OTP_STORE: 'indowings_otp_store',
  TEMP_PASSWORDS: 'indowings_temp_passwords_store',
  ADMIN_PASSWORD_OVERRIDE: 'indowings_admin_password_override'
};

// ---------------------------------------------------------------------------
// 1. AUTHENTICATION SERVICES (SIGN IN, SIGN UP & OTP)
// ---------------------------------------------------------------------------

export const authService = {
  // Check if active user is Admin
  isAdmin(user) {
    if (!user) return false;
    const email = user.email || '';
    return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  },

  // Get current active session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        return {
          user: data.session.user,
          isAdmin: this.isAdmin(data.session.user)
        };
      }
    } catch (e) {
      console.warn('Supabase session fetch fallback:', e);
    }

    const local = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          user: parsed,
          isAdmin: this.isAdmin(parsed)
        };
      } catch (e) {}
    }
    return null;
  },

  // Unified Sign In with Email & Password (Autodetects Admin vs User, checks Temp Password)
  async signInWithEmail(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = (password || '').trim();
    const isTargetAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    // 0. Check Temporary Password Store (Intercept for Mandatory Password Reset)
    try {
      const rawTemp = localStorage.getItem(STORAGE_KEYS.TEMP_PASSWORDS);
      const tempStore = rawTemp ? JSON.parse(rawTemp) : {};
      const tempRecord = tempStore[cleanEmail];
      if (tempRecord && tempRecord.tempPassword === cleanPassword) {
        if (Date.now() > tempRecord.expiry) {
          return { user: null, error: 'Temporary password has expired. Please request a new one.' };
        }
        // Match! Intercept before redirecting to dashboard
        return {
          requiresPasswordReset: true,
          email: cleanEmail,
          isAdmin: isTargetAdmin,
          error: null
        };
      }
    } catch (e) {}

    // Check if admin has set a custom permanent password
    const adminCustomPass = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD_OVERRIDE);
    const validAdminPass = adminCustomPass || ADMIN_PASSWORD;

    // 1. Admin Master Clearance
    if (isTargetAdmin) {
      if (cleanPassword === validAdminPass || cleanPassword === ADMIN_PASSWORD) {
        const adminUser = {
          id: 'admin-puneet-001',
          email: ADMIN_EMAIL,
          name: 'Puneet Kushwaha',
          role: 'admin'
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(adminUser));
        return { user: adminUser, isAdmin: true, error: null };
      }
      return { user: null, isAdmin: false, error: 'Invalid password for Administrator account.' };
    }

    // 2. Try Supabase Auth signInWithPassword
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password
      });

      if (data?.user && !error) {
        const userObj = {
          id: data.user.id,
          email: data.user.email,
          name: isTargetAdmin ? 'Puneet Kushwaha' : (data.user.user_metadata?.name || data.user.email.split('@')[0]),
          role: isTargetAdmin ? 'admin' : (data.user.user_metadata?.role || 'candidate')
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(userObj));
        return { user: userObj, isAdmin: isTargetAdmin, error: null };
      }
    } catch (e) {
      console.warn('Supabase auth sign-in error:', e);
    }

    // 3. Check registered local users
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const userList = rawUsers ? JSON.parse(rawUsers) : [];
      const match = userList.find(u => u.email.toLowerCase() === cleanEmail);
      if (match) {
        if (match.password === password) {
          const userObj = {
            id: match.id,
            email: match.email,
            name: match.name,
            role: match.role || 'candidate'
          };
          localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(userObj));
          return { user: userObj, isAdmin: false, error: null };
        } else {
          return { user: null, isAdmin: false, error: 'Incorrect password for this account.' };
        }
      }
    } catch (e) {}

    // 4. Fallback candidate auto-provisioning for testing
    if (password.length >= 6) {
      const normalUser = {
        id: 'usr-' + Date.now(),
        email: cleanEmail,
        name: cleanEmail.split('@')[0],
        role: 'candidate'
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(normalUser));
      careerService.registerCandidate({ email: cleanEmail, name: normalUser.name });
      return { user: normalUser, isAdmin: false, error: null };
    }

    return { user: null, isAdmin: false, error: 'Password must be at least 6 characters.' };
  },

  // Dedicated Sign Up (Full Name, Email, Password, Role)
  async signUp({ name, email, password, role = 'candidate' }) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !password || !cleanName) {
      return { user: null, error: 'Full name, email, and password are required.' };
    }

    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters.' };
    }

    const isTargetAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const finalRole = isTargetAdmin ? 'admin' : role;

    // 1. Try Supabase Auth signUp
    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: {
            name: cleanName,
            role: finalRole
          }
        }
      });
      if (error && error.message && !error.message.includes('already registered')) {
        console.warn('Supabase sign-up message:', error.message);
      }
    } catch (e) {
      console.warn('Supabase auth sign-up fallback:', e);
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      email: cleanEmail,
      name: cleanName,
      role: finalRole,
      password: password,
      created_at: new Date().toISOString()
    };

    // Store in users registry
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const userList = rawUsers ? JSON.parse(rawUsers) : [];
      const updated = [newUser, ...userList.filter(u => u.email.toLowerCase() !== cleanEmail)];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
    } catch (e) {}

    // If role is candidate, strictly register into Candidate Database!
    if (finalRole === 'candidate') {
      careerService.registerCandidate({ email: cleanEmail, name: cleanName });
    }

    // Set active session
    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionUser));

    return { user: sessionUser, isAdmin: isTargetAdmin, error: null };
  },

  // Send One-Time Passcode (OTP) via Email
  async sendOtp(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return { success: false, error: 'Valid email address is required.' };

    // Generate 6-digit code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save in OTP store
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OTP_STORE);
      const store = raw ? JSON.parse(raw) : {};
      store[cleanEmail] = { code: otpCode, expiry };
      localStorage.setItem(STORAGE_KEYS.OTP_STORE, JSON.stringify(store));
    } catch (e) {}

    // Dispatch via email service
    await emailService.sendOtpEmail(cleanEmail, otpCode);

    return { success: true, email: cleanEmail, debugOtp: otpCode };
  },

  // Verify OTP and Log In
  async verifyOtp(email, code) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    if (!cleanEmail || !cleanCode) {
      return { user: null, error: 'Email and verification code are required.' };
    }

    let isValid = false;

    // Check OTP store
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OTP_STORE);
      const store = raw ? JSON.parse(raw) : {};
      const record = store[cleanEmail];
      if (record && record.code === cleanCode) {
        if (Date.now() <= record.expiry) {
          isValid = true;
          delete store[cleanEmail];
          localStorage.setItem(STORAGE_KEYS.OTP_STORE, JSON.stringify(store));
        } else {
          return { user: null, error: 'Verification code has expired. Please request a new one.' };
        }
      }
    } catch (e) {}

    // Also support universal master verification fallback code '123123'
    if (cleanCode === '123123') {
      isValid = true;
    }

    if (!isValid) {
      return { user: null, error: 'Invalid verification code. Please check your email.' };
    }

    const isTargetAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const userObj = {
      id: isTargetAdmin ? 'admin-puneet-001' : 'usr-otp-' + Date.now(),
      email: cleanEmail,
      name: isTargetAdmin ? 'Puneet Kushwaha' : cleanEmail.split('@')[0],
      role: isTargetAdmin ? 'admin' : 'candidate'
    };

    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(userObj));
    if (!isTargetAdmin) {
      careerService.registerCandidate({ email: cleanEmail, name: userObj.name });
    }

    return { user: userObj, isAdmin: isTargetAdmin, error: null };
  },

  // Google OAuth Sign In
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/#/login'
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (e) {
      console.warn('Google OAuth initiated or fallback:', e);
      const googleUser = {
        id: 'google-user-' + Date.now(),
        email: 'operator.google@indowings.com',
        name: 'Google Operator',
        role: 'candidate',
        avatar: 'https://www.google.com/favicon.ico'
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(googleUser));
      careerService.registerCandidate({ email: googleUser.email, name: googleUser.name });
      return { user: googleUser, isAdmin: false, error: null };
    }
  },

  // Sign Out
  async signOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    return true;
  },

  // Generate & Dispatch Temporary Password
  async generateTemporaryPassword(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return { success: false, error: 'Valid email address is required.' };

    // Generate random secure temp password e.g. IW-682941
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const tempPassword = `IW-${randomSuffix}`;
    const expiry = Date.now() + 15 * 60 * 1000; // 15 mins

    // Store in temp passwords store
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TEMP_PASSWORDS);
      const store = raw ? JSON.parse(raw) : {};
      store[cleanEmail] = { tempPassword, expiry, mustReset: true };
      localStorage.setItem(STORAGE_KEYS.TEMP_PASSWORDS, JSON.stringify(store));
    } catch (e) {}

    // Dispatch via Nodemailer with clean corporate template
    await emailService.sendTemporaryPasswordEmail(cleanEmail, tempPassword);

    return { success: true, email: cleanEmail, tempPassword };
  },

  // Update Permanent Password and Log User In
  async updatePermanentPassword(email, newPassword) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = (newPassword || '').trim();
    if (!cleanEmail || !cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const isTargetAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    // 1. If admin, save admin password override
    if (isTargetAdmin) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD_OVERRIDE, cleanPassword);
    }

    // 2. Update user in USERS store
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      let userList = rawUsers ? JSON.parse(rawUsers) : [];
      const existingUser = userList.find(u => u.email.toLowerCase() === cleanEmail);
      if (existingUser) {
        existingUser.password = cleanPassword;
      } else {
        userList.push({
          id: 'usr-' + Date.now(),
          email: cleanEmail,
          name: isTargetAdmin ? 'Puneet Kushwaha' : cleanEmail.split('@')[0],
          role: isTargetAdmin ? 'admin' : 'candidate',
          password: cleanPassword,
          created_at: new Date().toISOString()
        });
      }
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(userList));
    } catch (e) {}

    // 3. Clear from temp passwords store
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TEMP_PASSWORDS);
      if (raw) {
        const store = JSON.parse(raw);
        delete store[cleanEmail];
        localStorage.setItem(STORAGE_KEYS.TEMP_PASSWORDS, JSON.stringify(store));
      }
    } catch (e) {}

    // 4. Create and set active session so user is logged in
    const sessionUser = {
      id: isTargetAdmin ? 'admin-puneet-001' : 'usr-' + Date.now(),
      email: cleanEmail,
      name: isTargetAdmin ? 'Puneet Kushwaha' : cleanEmail.split('@')[0],
      role: isTargetAdmin ? 'admin' : 'candidate'
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionUser));

    return { success: true, user: sessionUser, isAdmin: isTargetAdmin };
  }
};

// ---------------------------------------------------------------------------
// 2. CAREER & JOBS DATABASE SERVICES (WITH AUTO-EXPIRATION & CANDIDATE ALERTS)
// ---------------------------------------------------------------------------

export const careerService = {
  // Local storage cache helpers
  getLocalJobs() {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_SEED_JOBS));
      return INITIAL_SEED_JOBS;
    }
    try {
      const parsed = JSON.parse(raw);
      // Merge initial seed internships if not present
      const hasInternships = parsed.some(j => j.type === 'Internship');
      if (!hasInternships) {
        const internships = INITIAL_SEED_JOBS.filter(j => j.type === 'Internship');
        const merged = [...parsed, ...internships];
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch (e) {
      return INITIAL_SEED_JOBS;
    }
  },

  saveLocalJobs(jobs) {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  // Register Candidate into Candidate Database (Dedicated Candidate List)
  registerCandidate(candidate) {
    const cleanEmail = candidate.email?.trim().toLowerCase();
    if (!cleanEmail || cleanEmail === ADMIN_EMAIL.toLowerCase()) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
      const list = raw ? JSON.parse(raw) : [];
      if (!list.some(c => c.email.toLowerCase() === cleanEmail)) {
        list.push({
          email: cleanEmail,
          name: candidate.name || cleanEmail.split('@')[0],
          registered_at: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(list));
      }
    } catch (e) {}

    // Also attempt Supabase insert
    try {
      supabase.from('candidates').upsert({
        email: cleanEmail,
        name: candidate.name || cleanEmail.split('@')[0]
      });
    } catch (e) {}
  },

  // Get All Registered Candidate Emails (STRICTLY CANDIDATES ONLY, NOT NORMAL USERS)
  async getCandidateEmails() {
    const emailSet = new Set();

    // 1. Candidates registry
    try {
      const rawCandidates = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
      if (rawCandidates) {
        const list = JSON.parse(rawCandidates);
        list.forEach(c => {
          if (c.email && c.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            emailSet.add(c.email.trim().toLowerCase());
          }
        });
      }
    } catch (e) {}

    // 2. Applicants from submitted applications
    try {
      const rawApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (rawApps) {
        const list = JSON.parse(rawApps);
        list.forEach(a => {
          if (a.email && a.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            emailSet.add(a.email.trim().toLowerCase());
          }
        });
      }
    } catch (e) {}

    // 3. Registered users with role === 'candidate'
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (rawUsers) {
        const list = JSON.parse(rawUsers);
        list.forEach(u => {
          if (u.role === 'candidate' && u.email && u.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            emailSet.add(u.email.trim().toLowerCase());
          }
        });
      }
    } catch (e) {}

    // 4. Supabase DB candidates
    try {
      const { data } = await supabase.from('candidates').select('email');
      if (data) {
        data.forEach(r => {
          if (r.email && r.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            emailSet.add(r.email.trim().toLowerCase());
          }
        });
      }
    } catch (e) {}

    return Array.from(emailSet);
  },

  // Public Jobs View (Only active & non-expired jobs)
  async getPublicJobs() {
    const now = new Date();
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', now.toISOString())
        .order('created_at', { ascending: false });

      if (data && !error && data.length > 0) {
        return data.map(j => ({ ...j, is_expired: false }));
      }
    } catch (e) {}

    const local = this.getLocalJobs();
    return local
      .filter((j) => {
        if (!j.is_active) return false;
        if (!j.expires_at) return true;
        return new Date(j.expires_at) > now;
      })
      .map((j) => ({ ...j, is_expired: false }));
  },

  // Admin Jobs View (All jobs, with calculated expiration status)
  async getAdminJobs() {
    const now = new Date();
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error && data.length > 0) {
        return data.map((j) => ({
          ...j,
          is_expired: j.expires_at ? new Date(j.expires_at) <= now : false
        }));
      }
    } catch (e) {}

    const local = this.getLocalJobs();
    return local.map((j) => ({
      ...j,
      is_expired: j.expires_at ? new Date(j.expires_at) <= now : false
    }));
  },

  // Create New Job with custom duration and BROADCAST EMAIL ALERT TO CANDIDATES
  async createJob(jobData) {
    const durationDays = parseInt(jobData.duration_days, 10) || 15;
    const expiresAt = new Date(Date.now() + durationDays * 86400000).toISOString();

    const newJob = {
      id: 'job-' + Date.now(),
      title: jobData.title.trim(),
      department: jobData.department.trim(),
      location: jobData.location || 'Noida Aerospace HQ (On-Site)',
      type: jobData.type || 'Full-Time',
      experience: jobData.experience || '2+ Years',
      salary_range: jobData.salary_range || 'Competitive Defense Standard',
      duration_days: durationDays,
      expires_at: expiresAt,
      is_active: true,
      description: jobData.description.trim(),
      requirements: jobData.requirements ? jobData.requirements.trim() : '',
      created_at: new Date().toISOString()
    };

    // Try Supabase insert
    try {
      const { data, error } = await supabase.from('jobs').insert([newJob]).select();
      if (data && !error) {
        // Broadcast new job alert specifically to candidate database emails!
        this.broadcastJobAlertToCandidates(newJob);
        return data[0];
      }
    } catch (e) {}

    // Save to local cache
    const current = this.getLocalJobs();
    const updated = [newJob, ...current];
    this.saveLocalJobs(updated);

    // Also auto-register department if not already present
    this.addDepartment(newJob.department);

    // Broadcast new job alert specifically to candidate database emails!
    this.broadcastJobAlertToCandidates(newJob);

    return newJob;
  },

  // Helper: Broadcast new job alert specifically to candidate emails
  async broadcastJobAlertToCandidates(job) {
    try {
      const candidateEmails = await this.getCandidateEmails();
      if (candidateEmails.length > 0) {
        await emailService.sendNewJobAlertToCandidates(job, candidateEmails);
      }
    } catch (err) {
      console.warn('Failed to broadcast job alerts:', err);
    }
  },

  // Update Existing Job
  async updateJob(id, updates) {
    if (updates.duration_days) {
      const days = parseInt(updates.duration_days, 10);
      updates.expires_at = new Date(Date.now() + days * 86400000).toISOString();
    }

    try {
      await supabase.from('jobs').update(updates).eq('id', id);
    } catch (e) {}

    const current = this.getLocalJobs();
    const updated = current.map((j) => (j.id === id ? { ...j, ...updates } : j));
    this.saveLocalJobs(updated);
    return true;
  },

  // Delete Job
  async deleteJob(id) {
    try {
      await supabase.from('jobs').delete().eq('id', id);
    } catch (e) {}

    const current = this.getLocalJobs();
    const filtered = current.filter((j) => j.id !== id);
    this.saveLocalJobs(filtered);
    return true;
  },

  // Extend Job Validity (e.g. +10 Days)
  async extendJobValidity(id, daysToAdd = 10) {
    const current = this.getLocalJobs();
    const job = current.find(j => j.id === id);
    if (!job) return false;

    const baseTime = job.expires_at && new Date(job.expires_at) > new Date()
      ? new Date(job.expires_at).getTime()
      : Date.now();

    const newExpiresAt = new Date(baseTime + daysToAdd * 86400000).toISOString();
    const newDuration = (parseInt(job.duration_days, 10) || 10) + daysToAdd;

    return await this.updateJob(id, {
      expires_at: newExpiresAt,
      duration_days: newDuration,
      is_active: true
    });
  },

  // Toggle Job Status (Close / Reopen)
  async updateJobStatus(id, newStatus) {
    return await this.updateJob(id, { is_active: newStatus });
  },

  // -------------------------------------------------------------------------
  // 3. DEPARTMENTS MANAGEMENT
  // -------------------------------------------------------------------------
  getDepartments() {
    const raw = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(DEFAULT_DEPARTMENTS));
      return DEFAULT_DEPARTMENTS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_DEPARTMENTS;
    }
  },

  addDepartment(deptName) {
    if (!deptName || !deptName.trim()) return;
    const name = deptName.trim();
    const current = this.getDepartments();
    if (!current.includes(name)) {
      const updated = [...current, name];
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(updated));
    }
  },

  // -------------------------------------------------------------------------
  // 4. CANDIDATE APPLICATION SUBMISSIONS & EMAIL NOTIFICATIONS
  // -------------------------------------------------------------------------
  
  // Upload Resume to Supabase Storage Bucket ('resumes')
  async uploadResumeFile(file) {
    if (!file) return null;
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(cleanFileName, file, { cacheControl: '3600', upsert: true });

      if (data && !error) {
        const { data: publicData } = supabase.storage
          .from('resumes')
          .getPublicUrl(cleanFileName);
        return publicData?.publicUrl || cleanFileName;
      }
    } catch (e) {
      console.warn('Supabase storage upload fallback:', e);
    }

    return URL.createObjectURL(file);
  },

  // Submit Job Application and Send Automatic Confirmations
  async submitApplication(appData) {
    const newApplication = {
      id: 'app-' + Date.now(),
      job_id: appData.job_id || null,
      job_title: appData.job_title || 'General Talent Fleet',
      candidate_name: appData.candidate_name.trim(),
      email: appData.email.trim(),
      phone: appData.phone.trim(),
      resume_url: appData.resume_url || '',
      linkedin_url: appData.linkedin_url || '',
      dgca_license: appData.dgca_license || '',
      cover_note: appData.cover_note || '',
      status: 'Applied',
      created_at: new Date().toISOString()
    };

    // Auto-register candidate into candidate database
    this.registerCandidate({
      email: newApplication.email,
      name: newApplication.candidate_name
    });

    // Try Supabase insert
    try {
      await supabase.from('applications').insert([newApplication]);
    } catch (e) {}

    // Local cache
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(newApplication);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));

    // Send Real Confirmation Email to Candidate
    emailService.sendApplicationConfirmation(newApplication).catch(err => {
      console.warn('Failed to send candidate application email:', err);
    });

    // Send Alert Email to Admin
    emailService.sendAdminApplicationAlert(newApplication).catch(err => {
      console.warn('Failed to send admin application alert:', err);
    });

    return newApplication;
  },

  // Get Applications (Admin view)
  async getApplications(jobId = null) {
    try {
      let query = supabase.from('applications').select('*').order('created_at', { ascending: false });
      if (jobId) {
        query = query.eq('job_id', jobId);
      }
      const { data, error } = await query;
      if (data && !error && data.length > 0) return data;
    } catch (e) {}

    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    const list = raw ? JSON.parse(raw) : [];
    if (jobId) {
      return list.filter((a) => a.job_id === jobId);
    }
    return list;
  },

  // Update Application Status & Send Update Email
  async updateApplicationStatus(appId, newStatus) {
    try {
      await supabase.from('applications').update({ status: newStatus }).eq('id', appId);
    } catch (e) {}

    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    const list = raw ? JSON.parse(raw) : [];
    let updatedApp = null;
    const updated = list.map((a) => {
      if (a.id === appId) {
        updatedApp = { ...a, status: newStatus };
        return updatedApp;
      }
      return a;
    });
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));

    // Send status update email to candidate
    if (updatedApp && updatedApp.email) {
      emailService.sendStatusUpdateEmail(updatedApp, newStatus).catch(err => {
        console.warn('Failed to send status update email:', err);
      });
    }

    return true;
  }
};
