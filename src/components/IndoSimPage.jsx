import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Eye,
  Crosshair,
  Flame,
  Maximize2,
  Monitor,
  Compass,
  Radio,
  Shield,
  Sliders,
  CloudRain,
  Wind,
  Layers,
  Cpu,
  GraduationCap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertTriangle,
  Award,
  Package,
  Glasses
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 1. 5 CORE CAPABILITIES (AUTHENTIC OFFICIAL INDOSIM CAPABILITIES)
// Signature IndoWings Jhalar / Suspended Thread Presentation
// ---------------------------------------------------------------------------
const CAPABILITIES = [
  {
    num: '01',
    icon: '/assets/indosim/icons/icon-06.svg',
    title: 'Six Degrees of Freedom\n(6DoF) Aerodynamics',
    desc: 'Uncompromised flight physics covering pitch, yaw, roll, and realistic drag/lift forces precisely calibrated to the flight envelope of IndoWings UAVs.',
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
// 2. SIMULATION THEATERS (REAL HIGH-FIDELITY SCREENSHOTS)
// ---------------------------------------------------------------------------
const SIM_THEATERS = [
  {
    id: 'runway',
    name: 'Airfield & Runway Operations',
    tag: 'DGCA BASIC FLIGHT',
    image: '/assets/indosim/indosim01.jpg',
    weather: 'Clear Skies // 1013 hPa',
    desc: 'Practice precision takeoff, stabilized hover, figure-8 patterns, and controlled touchdown on standard runway environments.'
  },
  {
    id: 'mountain',
    name: 'Alpine Mountain Corridor',
    tag: 'BVLOS HIGHLAND SORTIE',
    image: '/assets/indosim/indosim02.jpg',
    weather: 'Crosswind 14 m/s // Valley Shear',
    desc: 'Navigate narrow valley passes, mountain ridge wind shears, and steep terrain-following autonomous waypoints at high density altitudes.'
  },
  {
    id: 'urban',
    name: 'Industrial Infrastructure & Geofence',
    tag: 'TACTICAL INSPECTION',
    image: '/assets/indosim/indosim03.jpg',
    weather: 'Thermal Inversion // Structural Obstacles',
    desc: 'Conduct sub-meter close-quarters industrial inspection around transmission towers, processing plants, and strict polygonal geofence boundaries.'
  },
  {
    id: 'weather',
    name: 'Adverse Weather & Fog Penetration',
    tag: 'ZERO VISIBILITY SENSING',
    image: '/assets/indosim/indosim04.jpg',
    weather: 'Dense Fog // Heavy Monsoon Rain',
    desc: 'Switch to EO/IR thermal cameras and radar telemetry to navigate through dense smoke, blizzard snow, and driving rain.'
  }
];

// ---------------------------------------------------------------------------
// 3. WHAT'S IN THE BOX (OFFICIAL HARDWARE SUITE)
// ---------------------------------------------------------------------------
const BOX_ITEMS = [
  {
    num: '01',
    name: 'Industrial Flight Controller',
    badge: 'CORE HARDWARE',
    desc: 'Full-size dual-gimbal physical transmitter with authentic spring tension and tactile handling identical to live field UAV stations.',
    image: '/assets/indosim/Controller.png'
  },
  {
    num: '02',
    name: 'Dual Remotes (Master & Slave)',
    badge: 'INSTRUCTOR BUS',
    desc: 'Two paired radio transmitters configured in a Master/Slave hierarchy allowing real-time instructor override and guided training.',
    image: '/assets/indosim/Controller.png'
  },
  {
    num: '03',
    name: 'IndoSIM Setup Flash Drive',
    badge: 'SOFTWARE SUITE',
    desc: 'High-speed USB drive preloaded with Unreal Engine simulation scenarios, Cyberone fleet digital twins, and offline installers.',
    image: null
  },
  {
    num: '04',
    name: 'Hardware Security Key (Dongle)',
    badge: 'AIR-GAPPED LICENSE',
    desc: 'Cryptographic USB dongle providing perpetual, air-gapped license authorization without requiring active internet connectivity.',
    image: null
  },
  {
    num: '05',
    name: 'VR Headset (Optional Add-on)',
    badge: 'IMMERSIVE COCKPIT',
    desc: 'Optional low-latency VR headset integration for full 360-degree pilot immersion and spatial awareness.',
    image: null
  }
];

// ---------------------------------------------------------------------------
// 4. TARGET AUDIENCES / TRAINING SECTORS
// ---------------------------------------------------------------------------
const AUDIENCE_CARDS = [
  {
    id: 'rpto',
    title: 'Remote Pilot Training Organizations (RPTOs)',
    tag: 'DGCA COMPLIANT',
    image: '/assets/indosim/traning.jpg',
    headline: 'Zero Crash Risk. Unlimited Student Flight Hours.',
    points: [
      'Full compliance with DGCA remote pilot training syllabus',
      'Zero drone maintenance and crash replacement expenses',
      'Multi-seat networked classrooms managed from single console',
      'Automated student logbook export & maneuver scoring'
    ]
  },
  {
    id: 'rnd',
    title: 'Research & Development Labs & Universities',
    tag: 'AEROSPACE R&D',
    image: '/assets/indosim/university.jpg',
    headline: 'Validate Flight Algorithms & Custom Payloads.',
    points: [
      'Custom hardware bridge board for flight controller integration',
      'Test autonomous navigation and path-planning algorithms',
      'Simulate novel sensor payloads before hardware fabrication',
      'Open telemetry integration for aerospace engineering programs'
    ]
  },
  {
    id: 'defense',
    title: 'Defense & Homeland Security Forces',
    tag: 'MILITARY COCKPIT',
    image: '/assets/indosim/4.jpg',
    headline: 'High-Risk Tactical Missions in Zero-Consequence Environment.',
    points: [
      'Practice tactical reconnaissance, border patrols, and covert BVLOS',
      'Simulate electronic jamming, radio loss, and battery emergency RTL',
      'Air-gapped 100% offline deployment for classified defense bases',
      'Debrief sorties with microsecond telemetry replay'
    ]
  }
];

// ---------------------------------------------------------------------------
// 5. TECHNICAL SPECIFICATIONS (AUTHENTIC TABLE)
// ---------------------------------------------------------------------------
const SPECS_DATA = [
  { label: 'Operating System', val: 'Windows 10 / 11 (64-bit)' },
  { label: 'Processor (CPU)', val: 'Quad-core Intel or AMD, 2.5 GHz or faster' },
  { label: 'System Memory (RAM)', val: '8GB DDR4-3200 (16GB Recommended)' },
  { label: 'Graphics Card (GPU)', val: 'NVIDIA GTX 1660 Super 4GB / RTX Series' },
  { label: 'Display Resolution', val: '1080p (Full HD) / 4K Multi-Monitor Supported' },
  { label: 'Hardware Interface', val: 'USB 2.0 / 3.0 Type-A (Dual Controller Interface)' },
  { label: 'Simulation Engine', val: 'High-Fidelity Unreal Engine Aerodynamic Core' },
  { label: 'Network Requirement', val: '100% Offline (Air-gapped Hardware Key Dongle)' }
];

// ---------------------------------------------------------------------------
// 6. FREQUENTLY ASKED QUESTIONS
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: 'Does IndoSIM require an active internet connection to run?',
    a: 'No. IndoSIM is engineered with a cryptographic USB hardware security key (dongle) that provides perpetual, 100% air-gapped operation. It can be deployed in remote military bases, secure aerospace facilities, and classrooms with zero internet connection.'
  },
  {
    q: 'How does the Master-Slave dual remote controller system work?',
    a: 'Two physical transmitters connect to the workstation simultaneously. The student pilots on the Slave remote, while the instructor monitors on the Master remote. If the student makes an error or enters an uncontrolled dive, the instructor flips an override switch to instantly take command of the aircraft.'
  },
  {
    q: 'Is IndoSIM compliant with DGCA RPTO pilot training requirements?',
    a: 'Yes. IndoSIM provides full adherence to DGCA training curriculum modules including basic controls (takeoff, hover, landing), 6DoF waypoint navigation, emergency failsafes, RTL execution, and inclement weather handling.'
  },
  {
    q: 'Can we simulate the exact flight dynamics of IndoWings drones?',
    a: 'Yes. IndoSIM includes pre-calibrated digital aerodynamic twins of the entire IndoWings fleet—including Cyberone Max, Cyberone Pro, Cyberone Lite, and Cyberone Trainer—matching their weight, inertia, thrust-to-weight ratios, and sensor telemetry.'
  },
  {
    q: 'What is included in the complete IndoSIM hardware bundle?',
    a: 'The standard package includes the physical flight controller, 2x handheld radio transmitters (Master & Slave), IndoSIM setup USB flash drive, cryptographic hardware dongle key, and complete scenario modules. A VR headset add-on is also available.'
  }
];

export default function IndoSimPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const videoRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTheater, setActiveTheater] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Interactive Master/Slave Console State
  const [consoleMode, setConsoleMode] = useState('student'); // 'student' | 'error' | 'override'
  const [diveAlert, setDiveAlert] = useState(false);

  // Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Orchestration
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Brand Flank Entrance
      gsap.fromTo(
        '.indo-sim-brand-left',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.indo-sim-brand-right',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.indo-sim-hero-drone-img',
        { scale: 0.92, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      // 2. Capabilities Jhalar Cascade Stagger
      gsap.fromTo(
        '.indo-sim-jhalar-col',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-sim-jhalar-track',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Section Titles Reveal
      gsap.utils.toArray('.indo-sim-section-head').forEach((el) => {
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

      // 4. Video Box Reveal
      gsap.fromTo(
        '.indo-sim-video-container',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-sim-video-container',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlayingVideo(true);
    } else {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div ref={pageRef} className="indo-sim-page">

      {/* =========================================================================
          SECTION 1: HERO SCREEN (100VH, AUTHENTIC WORKSTATION SHOWCASE)
          ========================================================================= */}
      <section className="indo-sim-hero">
        {/* FULLSCREEN BACKGROUND FLIGHT SIMULATION VIDEO */}
        <div className="indo-sim-hero-video-bg-wrap">
          <video
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

        {/* FLANKING INDO...SIM BRAND TYPOGRAPHY */}
        <div className="indo-sim-hero-brand-flank">
          <span className="indo-sim-brand-left">INDO</span>
          <span className="indo-sim-brand-right">SIM</span>
        </div>

        {/* Ambient Floating Scroll Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="indo-sim-hero-scroll-indicator"
          onClick={() => scrollToSection('features')}
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
      </section>

      {/* =========================================================================
          SECTION 2: 5 CORE TRAINING CAPABILITIES (JHALAR / SUSPENDED THREAD)
          ========================================================================= */}
      <section id="features" className="indo-sim-section">
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">INDIA'S MOST ADVANCED DRONE SIMULATOR</span>
            <h2 className="indo-sim-section-title">Full Fledged Military Training Simulator</h2>
            <p className="indo-sim-section-subtitle">
              Comprehensive turnkey solution engineered for RPTO classrooms, defense establishments, and aerospace R&D labs with true 6DoF aerodynamics and zero crash risk.
            </p>

            {/* Action Buttons */}
            <div className="indo-sim-hero-actions">
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo('IndoSIM Flight Simulator')}
                className="indo-sim-primary-btn"
              >
                <span>Request Simulator Demo</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('video-showcase')}
                className="indo-sim-secondary-btn"
              >
                <span>Watch Simulation Video</span>
              </button>
            </div>
          </div>

          {/* JHALAR / LADI SUSPENDED THREAD PRESENTATION */}
          <div className="indo-sim-jhalar-wrapper">
            <div className="indo-sim-jhalar-wire-runner">
              <div className="indo-sim-jhalar-main-thread" />
            </div>

            <div className="indo-sim-jhalar-track">
              {CAPABILITIES.map((item, idx) => (
                <div key={idx} className="indo-sim-jhalar-col">
                  <div className="indo-sim-jhalar-node-wrap">
                    <span className="indo-sim-jhalar-node-dot" />
                  </div>

                  <div
                    className="indo-sim-jhalar-vertical-cord"
                    style={{ height: `${item.cordLength}px` }}
                  >
                    <span className="indo-sim-vertical-thread-line" />
                  </div>

                  <div className="indo-sim-jhalar-clip" />

                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="indo-sim-pillar-card"
                  >
                    <div className="indo-sim-pillar-top">
                      <span className="indo-sim-pillar-num">{item.num}</span>
                      <div className="indo-sim-pillar-icon-box">
                        <img src={item.icon} alt="" style={{ width: '22px', height: '22px' }} />
                      </div>
                    </div>

                    <h3 className="indo-sim-pillar-title" style={{ whiteSpace: 'pre-line' }}>
                      {item.title}
                    </h3>
                    <p className="indo-sim-pillar-desc">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OFFICIAL FLIGHT SIMULATION VIDEO SHOWCASE
          ========================================================================= */}
      <section id="video-showcase" className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">CINEMATIC REAL-TIME PHYSICS</span>
            <h2 className="indo-sim-section-title">Official Flight Simulation Video</h2>
            <p className="indo-sim-section-subtitle">
              Watch real-time flight telemetry, dynamic terrain rendering, and cockpit HUD instruments in action.
            </p>
          </div>

          <div className="indo-sim-video-container" style={{
            position: 'relative',
            maxWidth: '1060px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 122, 26, 0.3)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 50px rgba(255, 122, 26, 0.15)',
            backgroundColor: '#000000'
          }}>
            <video
              ref={videoRef}
              src="/assets/indosim/banner.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Video Controls Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              gap: '0.65rem',
              zIndex: 10
            }}>
              <button
                type="button"
                onClick={toggleVideoPlay}
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {isPlayingVideo ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Tactical HUD Header */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid rgba(255,122,26,0.3)',
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.72rem',
              color: '#ff7a1a',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff7a1a', boxShadow: '0 0 8px #ff7a1a' }} />
              INDOSIM // REAL-TIME COCKPIT HUD FEED
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MASTER-SLAVE INSTRUCTOR CONSOLE (INTERACTIVE SIMULATOR)
          ========================================================================= */}
      <section id="master-slave" className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">INSTRUCTOR-STUDENT BUS</span>
            <h2 className="indo-sim-section-title">Master & Slave Remote System</h2>
            <p className="indo-sim-section-subtitle">
              Two physical transmitters operate a single drone simultaneously. The instructor maintains instant override authority while students learn without physical crash danger.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {/* Visual Hardware Controller Showcase */}
            <div style={{
              background: '#090b10',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: '#ff7a1a',
                letterSpacing: '0.1em'
              }}>
                DUAL HARDWARE TRANSMITTER BUS
              </div>

              <img
                src="/assets/indosim/Controller.png"
                alt="IndoSIM Physical Radio Transmitter"
                style={{
                  maxWidth: '320px',
                  width: '90%',
                  height: 'auto',
                  margin: '1.5rem auto 1rem',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85))'
                }}
              />

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1rem'
              }}>
                <div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>MASTER (INSTRUCTOR)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ff7a1a' }}>Full Override Latch</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>SLAVE (STUDENT)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#4ade80' }}>Active Flight Stick</div>
                </div>
              </div>
            </div>

            {/* Interactive Hierarchy & Three Core Protocols */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  background: '#0b0d12',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(255,122,26,0.12)',
                      color: '#ff7a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Mono',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      1
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
                      Instructor-Student Mode
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.55' }}>
                    The master controller is held by the instructor while the slave is operated by the student. The instructor can take over immediately to prevent dangerous trajectories.
                  </p>
                </div>

                <div style={{
                  background: '#0b0d12',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(255,122,26,0.12)',
                      color: '#ff7a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Mono',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      2
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
                      Progressive Learning
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.55' }}>
                    Gradually transfer control authority (pitch, roll, throttle) from instructor to student as skills sharpen, creating a safe and structured progression.
                  </p>
                </div>

                <div style={{
                  background: '#0b0d12',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(255,122,26,0.12)',
                      color: '#ff7a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Mono',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      3
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
                      Real-Time Feedback & Scoring
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.55' }}>
                    Provide instant vocal corrections and stick inputs while telemetry logs analyze flight paths, deviation from designated tracks, and crash count.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SIMULATION THEATERS & METEOROLOGY (REAL PHOTOS)
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">DYNAMIC ENVIRONMENT ENGINE</span>
            <h2 className="indo-sim-section-title">Simulation Theaters & Weather Modes</h2>
            <p className="indo-sim-section-subtitle">
              Authentic environments captured in high-fidelity Unreal Engine graphics. Switch theaters below to inspect varying flight conditions.
            </p>
          </div>

          {/* Theater Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            {SIM_THEATERS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTheater(idx)}
                style={{
                  background: activeTheater === idx ? '#ff7a1a' : 'rgba(255,255,255,0.05)',
                  color: activeTheater === idx ? '#000000' : '#ffffff',
                  fontWeight: activeTheater === idx ? '700' : '500',
                  border: activeTheater === idx ? '1px solid #ff7a1a' : '1px solid rgba(255,255,255,0.12)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.25s ease'
                }}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Active Theater Viewport */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
            maxWidth: '1060px',
            margin: '0 auto',
            backgroundColor: '#000'
          }}>
            <img
              src={SIM_THEATERS[activeTheater].image}
              alt={SIM_THEATERS[activeTheater].name}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Theater HUD Banner */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              background: 'rgba(9, 11, 16, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#ff7a1a',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.25rem'
                }}>
                  {SIM_THEATERS[activeTheater].tag} // {SIM_THEATERS[activeTheater].weather}
                </span>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: '#fff' }}>
                  {SIM_THEATERS[activeTheater].name}
                </h4>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>
                  {SIM_THEATERS[activeTheater].desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo(`IndoSIM - ${SIM_THEATERS[activeTheater].name}`)}
                className="indo-sim-primary-btn"
                style={{ padding: '0.65rem 1.35rem', fontSize: '0.82rem' }}
              >
                <span>Fly This Theater</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHAT'S IN THE BOX (TACTICAL HARDWARE UNBOXING)
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">HARDWARE PACKAGE</span>
            <h2 className="indo-sim-section-title">What's In The Box</h2>
            <p className="indo-sim-section-subtitle">
              Every IndoSIM commercial license ships with the complete physical flight control bundle and air-gapped security key.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {BOX_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0b0d12',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: '0.85rem', fontWeight: '700', color: '#ff7a1a' }}>
                    {item.num}
                  </span>
                  <span style={{
                    fontFamily: 'Space Mono',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {item.badge}
                  </span>
                </div>

                {item.image ? (
                  <div style={{
                    height: '90px',
                    background: '#06070a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <img src={item.image} alt={item.name} style={{ maxHeight: '75px', maxWidth: '85%', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div style={{
                    height: '90px',
                    background: '#06070a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: 'rgba(255,255,255,0.25)'
                  }}>
                    <Package size={32} />
                  </div>
                )}

                <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '700', color: '#fff' }}>
                  {item.name}
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            *Optional VR headset integration allows users to experience added cockpit immersion according to pilot preference.
          </p>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TARGETED DEPLOYMENTS (RPTO, R&D LABS, DEFENSE)
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">INSTITUTIONAL DEPLOYMENTS</span>
            <h2 className="indo-sim-section-title">Built For RPTOs, Universities & Defense</h2>
            <p className="indo-sim-section-subtitle">
              IndoSIM infrastructure allows multiple simulator units to be networked together as a centralized aviation training academy.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {AUDIENCE_CARDS.map((aud) => (
              <div
                key={aud.id}
                style={{
                  background: '#0b0d12',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={aud.image}
                    alt={aud.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #0b0d12 0%, transparent 60%)'
                  }} />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.75)',
                    border: '1px solid rgba(255,122,26,0.3)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontFamily: 'Space Mono',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    color: '#ff7a1a',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {aud.tag}
                  </span>
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
                    {aud.title}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: '#ff7a1a', fontWeight: '600', marginBottom: '1.25rem' }}>
                    {aud.headline}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {aud.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.45' }}>
                        <CheckCircle2 size={15} style={{ color: '#ff7a1a', flexShrink: 0, marginTop: '2px' }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SYSTEM REQUIREMENTS (DARK DEFENSE TABLE)
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">HARDWARE ARCHITECTURE</span>
            <h2 className="indo-sim-section-title">Recommended System Requirements</h2>
            <p className="indo-sim-section-subtitle">
              Verified workstation specifications to achieve a consistent 60+ FPS flight simulation with ultra-low glass-to-glass latency.
            </p>
          </div>

          <div style={{
            maxWidth: '860px',
            margin: '0 auto',
            background: '#0c0e12',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            {SPECS_DATA.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1.1rem 1.5rem',
                  borderBottom: idx === SPECS_DATA.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'
                }}
              >
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#ffffff', textAlign: 'right' }}>
                  {s.val}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">

          <div className="indo-sim-section-head">
            <span className="indo-sim-tag">INQUIRIES & DEPLOYMENTS</span>
            <h2 className="indo-sim-section-title">Frequently Asked Questions</h2>
            <p className="indo-sim-section-subtitle">
              Answers regarding DGCA compliance, offline security keys, remote controller hierarchy, and multi-seat deployments.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#0c0e12',
                    border: isOpen ? '1px solid rgba(255,122,26,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#ffffff'
                    }}
                  >
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.02rem', fontWeight: '700' }}>
                      {faq.q}
                    </span>
                    <span style={{ color: '#ff7a1a', flexShrink: 0 }}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 1.5rem 1.25rem',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                          fontSize: '0.88rem',
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: '1.6'
                        }}>
                          {faq.a}
                        </div>
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
          SECTION 10: SOVEREIGN CTA BANNER
          ========================================================================= */}
      <section className="indo-sim-section" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="indo-sim-container">
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #141820 0%, #090b0f 100%)',
            border: '1px solid rgba(255, 122, 26, 0.35)',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 122, 26, 0.12)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '250px',
              background: 'radial-gradient(ellipse at top, rgba(255, 122, 26, 0.28) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                color: '#ff7a1a',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                DEPLOY INDOSIM TODAY
              </span>

              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                fontWeight: '800',
                color: '#ffffff',
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}>
                Ready to Upgrade Your Drone Training Program?
              </h2>

              <p style={{
                fontSize: 'clamp(0.88rem, 1.1vw, 1.02rem)',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: '1.65',
                margin: '0 auto 2.25rem auto'
              }}>
                Connect directly with our flight simulation engineers. We deliver turn-key hardware bundles, RPTO multi-seat licensing, and custom digital twin integrations nationwide.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => onOpenDemo && onOpenDemo('IndoSIM Flight Simulator')}
                  className="indo-sim-primary-btn"
                  style={{
                    padding: '0.9rem 2.2rem',
                    fontSize: '0.92rem',
                    boxShadow: '0 0 35px rgba(255,122,26,0.45)'
                  }}
                >
                  <span>Request Live Simulator Demo</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('indofly') : (window.location.hash = '#/products/indofly')}
                  className="indo-sim-secondary-btn"
                  style={{ padding: '0.9rem 1.8rem', fontSize: '0.92rem' }}
                >
                  <span>Explore IndoFly GCS Software</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
