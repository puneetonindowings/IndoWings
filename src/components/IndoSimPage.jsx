import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Monitor,
  GraduationCap,
  Award,
  Package,
  Radio,
  Sliders,
  ChevronRight,
  Maximize2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 1. 5 CORE CAPABILITIES (OFFICIAL JHALAR CARDS - SAME SIGNATURE AESTHETIC)
// ---------------------------------------------------------------------------
const CAPABILITIES = [
  {
    num: '01',
    icon: '/assets/indosim/icons/icon-06.svg',
    title: 'Six Degrees of Freedom\n(6DoF) Aerodynamics',
    desc: 'Uncompromised real flight physics covering pitch, yaw, roll, and realistic drag/lift forces calibrated to the flight envelope of IndoWings UAVs.',
    cordLength: 35
  },
  {
    num: '02',
    icon: '/assets/indosim/icons/icon-08.svg',
    title: 'Dynamic Weather &\nWind Vector Simulation',
    desc: 'Simulate high-risk meteorological conditions including monsoon downpour, dense alpine fog, snow, dust storms, turbulence, and adjustable crosswinds.',
    cordLength: 85
  },
  {
    num: '03',
    icon: '/assets/indosim/icons/icon-07.svg',
    title: 'Dual Remote Hierarchy\n(Master & Slave Mode)',
    desc: 'Dual-transmitter architecture connecting instructor and trainee simultaneously. Instructor can instantly override controls to avoid virtual crashes.',
    cordLength: 20
  },
  {
    num: '04',
    icon: '/assets/indosim/icons/icon-01.svg',
    title: 'Indigenous Base Board\n& Hardware Emulation',
    desc: 'Custom-designed hardware bridge providing 100% parameter replication of IndoWings drones with easy toggling between Manual, RTL, and Speed modes.',
    cordLength: 95
  },
  {
    num: '05',
    icon: '/assets/indosim/icons/icon-04.svg',
    title: 'Autonomous RTL &\nCrash Damage Metrics',
    desc: 'Realistic collision physics evaluating structural damage upon impact with crash count tracking, flight telemetry logs, and shortest-path RTL return.',
    cordLength: 45
  }
];

// ---------------------------------------------------------------------------
// 2. 8 OFFICIAL DRONE CAPABILITY MODULES (2x4 CLEAN GRID)
// ---------------------------------------------------------------------------
const DRONE_FEATURES = [
  {
    icon: '/assets/indosim/icons/icon-08.svg',
    title: 'Realistic Weather Simulation',
    desc: 'Wind vectors, air resistance, turbulence, fog, rain, and snow dynamically impacting aircraft stability and battery drain.'
  },
  {
    icon: '/assets/indosim/icons/icon-07.svg',
    title: 'Remote Control & Hierarchy',
    desc: 'Support for dual radio remotes (Master & Slave). Emergency instructor takeover prevents simulation training downtime.'
  },
  {
    icon: '/assets/indosim/icons/icon-06.svg',
    title: 'Movement & 6DoF Navigation',
    desc: 'Realistic 6DoF physics calculating genuine aerodynamics, stall angles, thrust-to-weight curves, and autonomous waypoint routing.'
  },
  {
    icon: '/assets/indosim/icons/icon-05.svg',
    title: 'Basic Training Missions',
    desc: 'DGCA-aligned structured syllabus: takeoff, precision hovering, figure-8 maneuvers, emergency landing, and obstacle corridors.'
  },
  {
    icon: '/assets/indosim/icons/icon-04.svg',
    title: 'Dynamic Damage System',
    desc: 'Accurate collision detection measuring structural and propeller damage upon impact, keeping training realistic without hardware repair cost.'
  },
  {
    icon: '/assets/indosim/icons/icon-03.svg',
    title: 'Realistic Parameters & Sensors',
    desc: 'Accurate simulation of onboard IMU, barometers, GPS positioning, telemetry latency, and failsafe RTL triggers.'
  },
  {
    icon: '/assets/indosim/icons/icon-02.svg',
    title: 'Flight Modes & Speed Limits',
    desc: 'Seamless switching between Stabilize, Alt-Hold, Loiter, RTL, and Mission modes matching field ground control station interfaces.'
  },
  {
    icon: '/assets/indosim/icons/icon-01.svg',
    title: 'Indigenous Base Board Bridge',
    desc: 'Sovereign hardware bridge designed in India replicating the electronic architecture and control algorithms of IndoWings UAVs.'
  }
];

// ---------------------------------------------------------------------------
// 3. TARGETED OPERATIONAL FACILITIES (4-CARD GRID FROM WEBSITE)
// ---------------------------------------------------------------------------
const DEPLOYMENTS = [
  {
    image: '/assets/indosim/traning.jpg',
    tag: 'DGCA RPTOs',
    title: 'Remote Pilot Training Organizations',
    desc: 'Structured pilot certification curriculum covering mandatory DGCA simulator hours, emergency failsafes, and BVLOS readiness.'
  },
  {
    image: '/assets/indosim/university.jpg',
    tag: 'UNIVERSITIES',
    title: 'Aeronautical & Engineering Colleges',
    desc: 'Hands-on UAV aerodynamics laboratory training for aerospace engineering undergraduates, researchers, and drone tech clubs.'
  },
  {
    image: '/assets/indosim/4.jpg',
    tag: 'DEFENSE BASES',
    title: 'Military & Security Squadrons',
    desc: 'Tactical night surveillance rehearsals, border corridor navigation, and payload camera tracking in harsh simulated environments.'
  },
  {
    image: '/assets/indosim/5.jpg',
    tag: 'ENTERPRISE ACADEMIES',
    title: 'Industrial Training Facilities',
    desc: 'Pre-deployment operator training for powerline inspection, mining survey, mapping, and agricultural spraying drones.'
  }
];

// ---------------------------------------------------------------------------
// 4. HARDWARE PACKAGE (WHAT'S IN THE BOX)
// ---------------------------------------------------------------------------
const HARDWARE_PACKAGE = [
  {
    title: 'Industrial Flight Controller',
    badge: 'CORE TRANSMITTER',
    desc: 'Dual-gimbal physical transmitter with authentic spring tension and tactile response identical to live UAV field operations.',
    image: '/assets/indosim/Controller.png'
  },
  {
    title: 'Dual Remotes (Master & Slave)',
    badge: 'INSTRUCTOR BUS',
    desc: 'Paired physical remotes enabling real-time instructor monitoring and instant control takeover for zero-crash training.',
    image: '/assets/indosim/Controller.png'
  },
  {
    title: 'IndoSIM Setup USB Drive',
    badge: 'SOFTWARE SUITE',
    desc: 'High-speed USB drive preloaded with Unreal Engine simulation scenarios, fleet aerodynamic models, and offline installer.',
    image: null
  },
  {
    title: 'Air-Gapped Hardware Key (Dongle)',
    badge: 'CRYPTOGRAPHIC KEY',
    desc: 'Cryptographic USB security key providing perpetual, 100% air-gapped license authorization without internet dependency.',
    image: null
  }
];

// ---------------------------------------------------------------------------
// 5. TECHNICAL SPECIFICATIONS (AUTHENTIC DARK DEFENSE TABLE)
// ---------------------------------------------------------------------------
const SPECS_DATA = [
  { label: 'Operating System', val: 'Windows 10 / Windows 11 (64-bit)' },
  { label: 'Processor (CPU)', val: 'Quad-core Intel Core i5 / AMD Ryzen 5, 2.5 GHz or faster' },
  { label: 'System Memory (RAM)', val: '8GB DDR4 (16GB Recommended for High Graphics)' },
  { label: 'Graphics Card (GPU)', val: 'NVIDIA GeForce GTX 1660 / RTX Series (DirectX 12)' },
  { label: 'Display Resolution', val: '1920 x 1080 Full HD (4K & Multi-Screen Supported)' },
  { label: 'Hardware Interface', val: 'USB 2.0 / USB 3.0 Type-A (Dual Controller Interface)' },
  { label: 'Simulation Engine', val: 'Unreal Engine 6DoF Real-Time Physics Core' },
  { label: 'Network Requirement', val: '100% Offline (Air-Gapped Cryptographic USB Key)' }
];

// ---------------------------------------------------------------------------
// 6. FREQUENTLY ASKED QUESTIONS
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: 'Does IndoSIM require an active internet connection to run?',
    a: 'No. IndoSIM operates 100% offline using a cryptographic USB hardware security key (dongle). It requires zero internet access and can be safely installed in air-gapped defense labs, secure bases, and remote training sites.'
  },
  {
    q: 'How does the Master-Slave dual remote system work?',
    a: 'Both physical radio transmitters connect to the workstation simultaneously via USB. The student pilots on the Slave remote while the certified instructor monitors on the Master remote. The instructor can flip a switch to instantly seize control in under 10ms.'
  },
  {
    q: 'Is IndoSIM compliant with DGCA RPTO pilot training requirements?',
    a: 'Yes. IndoSIM fully satisfies the DGCA pilot syllabus modules for basic flight instruction, 6DoF flight maneuvers, figure-8 patterns, failsafe procedures, and inclement weather handling.'
  },
  {
    q: 'What is included in the complete IndoSIM hardware bundle?',
    a: 'The complete bundle includes the physical flight controller, 2x paired handheld transmitters (Master & Slave), IndoSIM setup USB flash drive, cryptographic hardware dongle key, and full offline scenario packages.'
  },
  {
    q: 'Can we simulate the exact flight dynamics of IndoWings drones?',
    a: 'Yes. IndoSIM includes pre-calibrated digital aerodynamic twins of the entire IndoWings fleet (Cyberone Max, Pro, Lite, and Trainer), replicating their weight, inertia, thrust curves, and sensor parameters.'
  }
];

export default function IndoSimPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const heroVideoRef = useRef(null);
  const brandLettersRef = useRef([]);
  const [openFaq, setOpenFaq] = useState(0);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Animations (Clean and performant, exactly matching IndoFly/CyberOne standard)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bottom Stretch INDOSIM Letters Reveal
      const validChars = brandLettersRef.current.filter(Boolean);
      if (validChars.length > 0) {
        gsap.fromTo(
          validChars,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.05,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      // 2. Capabilities Jhalar Cascade Stagger
      gsap.fromTo(
        '.indo-fly-jhalar-col',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-fly-jhalar-track',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Section Titles Reveal
      gsap.utils.toArray('.indo-fly-section-head').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="indo-sim-page" style={{ backgroundColor: '#000000', color: '#ffffff' }}>

      {/* =========================================================================
          SECTION 1: HERO SCREEN (PRISTINE FULLSCREEN FLIGHT VIDEO + BOTTOM BRAND)
          ========================================================================= */}
      <section className="indo-sim-hero">
        
        {/* FULLSCREEN BACKGROUND FLIGHT SIMULATION VIDEO */}
        <div className="indo-sim-hero-video-bg-wrap">
          <video
            ref={heroVideoRef}
            src="/assets/indosim/banner.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/indosim/poster.jpg"
            className="indo-sim-hero-video-bg"
          />
          <div className="indo-sim-hero-video-overlay" />
        </div>

        {/* Ambient Floating Scroll Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="indo-sim-hero-scroll-indicator"
          onClick={() => scrollToSection('scope')}
          style={{ cursor: 'pointer' }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-sim-hero-scroll-pill"
          >
            <div className="indo-sim-hero-scroll-dot" />
          </motion.div>
        </motion.div>

        {/* FULL-WIDTH STRETCHED BOTTOM BRAND TEXT: INDOSIM */}
        <div 
          className="indo-sim-hero-bottom-brand-container" 
          aria-label="INDOSIM"
        >
          <div className="indo-sim-hero-bottom-brand-row">
            {'INDOSIM'.split('').map((char, idx) => (
              <span 
                key={idx} 
                ref={(el) => (brandLettersRef.current[idx] = el)}
                className={`indo-sim-bottom-char ${idx >= 4 ? 'is-orange-char' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: 5 CORE TRAINING CAPABILITIES (JHALAR / SUSPENDED THREAD)
          ========================================================================= */}
      <section id="capabilities" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">INDIA'S MOST ADVANCED DRONE SIMULATOR</span>
            <h2 className="indo-fly-section-title">Full Fledged Military Training Simulator</h2>
            <p className="indo-fly-section-subtitle">
              Comprehensive turnkey solution engineered for RPTO classrooms, defense establishments, and aerospace R&D labs with true 6DoF aerodynamics and zero crash risk.
            </p>

            {/* Action Buttons */}
            <div className="indo-fly-hero-actions">
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo('IndoSIM Flight Simulator')}
                className="indo-fly-primary-btn"
              >
                <span>Request Simulator Demo</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('scope')}
                className="indo-fly-secondary-btn"
              >
                <span>Explore Simulator Scope</span>
              </button>
            </div>
          </div>

          {/* JHALAR / LADI SUSPENDED THREAD PRESENTATION */}
          <div className="indo-fly-jhalar-wrapper">
            <div className="indo-fly-jhalar-wire-runner">
              <div className="indo-fly-jhalar-main-thread" />
            </div>

            <div className="indo-fly-jhalar-track">
              {CAPABILITIES.map((item, idx) => (
                <div key={idx} className="indo-fly-jhalar-col">
                  <div className="indo-fly-jhalar-node-wrap">
                    <span className="indo-fly-jhalar-node-dot" />
                  </div>

                  <div
                    className="indo-fly-jhalar-vertical-cord"
                    style={{ height: `${item.cordLength}px` }}
                  >
                    <span className="indo-fly-vertical-thread-line" />
                  </div>

                  <div className="indo-fly-jhalar-clip" />

                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="indo-fly-pillar-card"
                  >
                    <div className="indo-fly-pillar-top">
                      <span className="indo-fly-pillar-num">{item.num}</span>
                      <div className="indo-fly-pillar-icon-box">
                        <img src={item.icon} alt="" style={{ width: '22px', height: '22px' }} />
                      </div>
                    </div>

                    <h3 className="indo-fly-pillar-title" style={{ whiteSpace: 'pre-line' }}>
                      {item.title}
                    </h3>
                    <p className="indo-fly-pillar-desc">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SCOPE & OPERATIONAL CAPABILITY (2-COLUMN ALTERNATING)
          ========================================================================= */}
      <section id="scope" className="indo-fly-section">
        <div className="indo-fly-container">

          {/* Row 1: Comprehensive Training Scope (Image Left, Text Right) */}
          <div className="indo-fly-split-row">
            
            {/* Image Card Left */}
            <div className="indo-fly-media-card">
              <img
                src="/assets/indosim/indosim03.jpg"
                alt="IndoSIM High-Fidelity Flight Simulator"
                className="indo-fly-media-img"
                draggable="false"
              />
            </div>

            {/* Text Right */}
            <div className="indo-fly-split-text">
              <span className="indo-fly-tag">SIMULATOR SCOPE</span>
              <h2 className="indo-fly-split-title">Comprehensive Turnkey Training Solution</h2>
              <p className="indo-fly-split-desc">
                The Indo Wings IndoSIM is an end-to-end simulation infrastructure designed for pilot academies and defense centers. It covers the full training lifecycle — starting from basic flight instruction to briefing, simulated operational sorties, and emergency drills.
              </p>

              <div className="indo-fly-feature-list">
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Centralized infrastructure for deploying multi-workstation drone classrooms</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Calibrated digital twin aerodynamics matching the entire IndoWings fleet</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Zero physical damage to expensive carbon fiber airframes or optical payloads</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Real-time flight data logging, flight path replay, and pilot debriefing</span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Precision Airfield & BVLOS Navigation (Text Left, Image Right) */}
          <div className="indo-fly-split-row" style={{ marginTop: '4rem' }}>
            
            {/* Text Left */}
            <div className="indo-fly-split-text">
              <span className="indo-fly-tag">REALISTIC ENVIRONMENTS</span>
              <h2 className="indo-fly-split-title">Precision Airfields & Mountain BVLOS Corridors</h2>
              <p className="indo-fly-split-desc">
                Built on Unreal Engine, IndoSIM accurately models physical ground terrain, elevation gradients, wind shears, and thermal updrafts to prepare pilots for complex real-world sorties.
              </p>

              <div className="indo-fly-feature-list">
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Standard runway takeoffs, figure-8 maneuvers, and precision hover grid training</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>High-altitude mountain valley corridors with variable density altitudes</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Close-quarters industrial inspection around high-voltage transmission lines</span>
                </div>
                <div className="indo-fly-feature-item">
                  <CheckCircle2 size={18} />
                  <span>Emergency RTL routing through mountain passes avoiding terrain collision</span>
                </div>
              </div>
            </div>

            {/* Image Card Right */}
            <div className="indo-fly-media-card">
              <img
                src="/assets/indosim/indosim01.jpg"
                alt="Airfield Runway Training"
                className="indo-fly-media-img"
                draggable="false"
              />
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 8 CORE DRONE FEATURES & CAPABILITIES (2x4 CLEAN GRID)
          ========================================================================= */}
      <section className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">UNREAL ENGINE ARCHITECTURE</span>
            <h2 className="indo-fly-section-title">Drone Features & Capabilities</h2>
            <p className="indo-fly-section-subtitle">
              IndoSim provides a highly realistic Unreal Engine environment for development, testing, and pilot certification across eight dedicated engineering modules.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem'
          }}>
            {DRONE_FEATURES.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(255,106,0,0.45)' }}
                transition={{ duration: 0.2 }}
                style={{
                  background: '#0d0f14',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255,106,0,0.1)',
                  border: '1px solid rgba(255,106,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <img src={feat.icon} alt="" style={{ width: '22px', height: '22px' }} />
                </div>

                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 0.65rem 0'
                }}>
                  {feat.title}
                </h3>

                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0
                }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HARDWARE SUITE & MASTER-SLAVE TRANSMITTER
          ========================================================================= */}
      <section id="hardware" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">TURNKEY PACKAGE</span>
            <h2 className="indo-fly-section-title">What&apos;s Included in IndoSIM Suite</h2>
            <p className="indo-fly-section-subtitle">
              Complete plug-and-play package including physical dual-gimbal transmitters, Master/Slave instructor interconnects, and cryptographic security dongle.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem'
          }}>
            {HARDWARE_PACKAGE.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0d0f14',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
                }}
              >
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#ff7a1a',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem'
                }}>
                  {item.badge}
                </span>

                {item.image && (
                  <div style={{
                    width: '100%',
                    height: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        maxHeight: '130px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))'
                      }}
                    />
                  </div>
                )}

                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 0.5rem 0'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TARGETED OPERATIONAL FACILITIES (RPTO, UNIVERSITIES, DEFENSE)
          ========================================================================= */}
      <section id="deployments" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">OPERATIONAL APPLICATIONS</span>
            <h2 className="indo-fly-section-title">Designed for India&apos;s Drone Training Ecosystem</h2>
            <p className="indo-fly-section-subtitle">
              Deployed across flight academies, universities, and defense units for certified, zero-risk pilot training.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem'
          }}>
            {DEPLOYMENTS.map((item, idx) => (
              <div
                key={idx}
                className="indo-fly-mission-card"
              >
                <div className="indo-fly-mission-media">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(11,13,18,0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#ff7a1a'
                  }}>
                    {item.tag}
                  </span>
                </div>

                <div className="indo-fly-mission-body">
                  <h3 className="indo-fly-mission-title">{item.title}</h3>
                  <p className="indo-fly-mission-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TECHNICAL SPECIFICATIONS (AUTHENTIC DARK DEFENSE TABLE)
          ========================================================================= */}
      <section id="specs" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">HARDWARE SPECIFICATIONS</span>
            <h2 className="indo-fly-section-title">Workstation System Requirements</h2>
            <p className="indo-fly-section-subtitle">
              Engineered to operate 100% air-gapped without recurring online licenses or mandatory internet connection.
            </p>
          </div>

          <div className="indo-fly-specs-wrap">
            {SPECS_DATA.map((row, idx) => (
              <div key={idx} className="indo-fly-spec-row">
                <span className="indo-fly-spec-label">{row.label}</span>
                <span className="indo-fly-spec-value">{row.val}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FREQUENTLY ASKED QUESTIONS (PLUS / MINUS ACCORDION)
          ========================================================================= */}
      <section id="faqs" className="indo-fly-section">
        <div className="indo-fly-container indo-fly-faq-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">TECHNICAL INQUIRIES</span>
            <h2 className="indo-fly-section-title">Frequently Asked Questions</h2>
            <p className="indo-fly-section-subtitle">
              Answers regarding offline air-gapped dongles, DGCA RPTO curriculum, and hardware pairing.
            </p>
          </div>

          <div className="indo-fly-faq-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`indo-fly-faq-item ${isOpen ? 'is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="indo-fly-faq-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="indo-fly-faq-question">{faq.q}</span>
                    <span className="indo-fly-faq-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="indo-fly-faq-answer-wrap"
                      >
                        <p className="indo-fly-faq-answer">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: BOTTOM CTA BANNER (AUTHENTIC COPY & BUTTON)
          ========================================================================= */}
      <section className="indo-fly-section" style={{ borderTop: 'none' }}>
        <div className="indo-fly-container">
          <div className="indo-fly-cta-box">
            <div className="indo-fly-cta-content">
              <span className="indo-fly-tag">TRAIN WITHOUT LIMITS</span>
              <h2 className="indo-fly-cta-title">Ready to Equip Your Facility with IndoSIM?</h2>
              <p className="indo-fly-cta-desc">
                Deploy India&apos;s most advanced military and DGCA drone flight simulator. Connect with our aerospace engineers for academy bundles, institutional quotes, and custom drone physics integration.
              </p>

              <div className="indo-fly-hero-actions" style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  onClick={() => onOpenDemo && onOpenDemo('IndoSIM Flight Simulator')}
                  className="indo-fly-primary-btn"
                >
                  <span>Request Simulator Demo</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities')}
                  className="indo-fly-secondary-btn"
                >
                  <span>Review Capabilities</span>
                </button>
              </div>
            </div>
            <div className="indo-fly-cta-ambient" />
          </div>
        </div>
      </section>

    </div>
  );
}
