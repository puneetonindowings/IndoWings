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
  Radio
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 5 CORE CAPABILITIES (AUTHENTIC INDOFY GROUND CONTROL SYSTEM)
// Signature IndoWings Jhalar / Suspended Thread Presentation
// ---------------------------------------------------------------------------
const CAPABILITIES = [
  {
    num: '01',
    icon: Monitor,
    title: 'Multi-Device Cross-Platform\nDeployment',
    desc: 'Unified operational interface across Windows 11, Linux workstations, and rugged Android tactical field tablets with zero driver setup.',
    cordLength: 35
  },
  {
    num: '02',
    icon: Compass,
    title: 'Autonomous Waypoint\n& Corridor Survey',
    desc: 'Sub-meter waypoint navigation, polygon survey tracks, automated camera trigger spacing, and dynamic terrain-following elevation awareness.',
    cordLength: 85
  },
  {
    num: '03',
    icon: Crosshair,
    title: 'On-Edge AI Detection\n& Slaved Tracking',
    desc: 'Real-time human and vehicle identification powered by local neural networks with automated continuous gimbal lock during maneuvers.',
    cordLength: 20
  },
  {
    num: '04',
    icon: Flame,
    title: 'Multispectral Thermal\n& Radiometric Fusion',
    desc: '13 radiometric thermal palettes including White Hot, Black Hot, and Ironbow for complete situational awareness in zero visibility.',
    cordLength: 95
  },
  {
    num: '05',
    icon: Radio,
    title: 'Air-Gapped 100% Offline\nField Operations',
    desc: 'Completely self-contained tactical flight operations with local MBTiles satellite caches and DEM elevation files requiring zero internet.',
    cordLength: 45
  }
];

// ---------------------------------------------------------------------------
// MISSION CONTROL MODULES (PLAN, SAFETY, VIDEO)
// ---------------------------------------------------------------------------
const MISSION_CARDS = [
  {
    id: 'plan',
    title: 'Plan Window',
    image: '/assets/indofly/PlanWindow.png',
    desc: 'Design autonomous missions with waypoint navigation and intelligent path routing.',
    bullets: [
      'Waypoint mission planning + Mapping',
      'Auto path optimization',
      'Geofence-aware routing'
    ]
  },
  {
    id: 'safety',
    title: 'Safety Window',
    image: '/assets/indofly/SafetyWindow.png',
    desc: 'Configure mission-critical safety parameters for secure, failsafe drone operations.',
    bullets: [
      'Geofencing & boundary control',
      'Battery failsafe triggers',
      'Return-to-home logic'
    ]
  },
  {
    id: 'video',
    title: 'Video Window',
    image: '/assets/indofly/VideoWindow.png',
    desc: 'Real-time RTSP streaming with AI detection overlays and sensor telemetry.',
    bullets: [
      'Live low-latency video feed',
      'AI detection bounding boxes',
      'Thermal + RGB fusion'
    ]
  }
];

// ---------------------------------------------------------------------------
// AI & TACTICAL SENSOR CAPABILITIES (CLEAN VISUAL CARDS - ZERO BROKEN IMAGES)
// ---------------------------------------------------------------------------
const AI_CAPABILITIES = [
  {
    id: 'detection',
    tag: 'COMPUTER VISION',
    title: 'AI-Based Detection',
    icon: Eye,
    desc: 'Real-time human and vehicle identification powered by lightweight neural networks running locally on-edge.',
    bullets: [
      'Real-time human & vehicle detection',
      'Bounding box overlays on live video',
      'Optimized for low-latency local processing',
      'Reliable detection in dynamic field environments'
    ]
  },
  {
    id: 'tracking',
    tag: 'AUTONOMOUS TRACKING',
    title: 'Advanced AI Tracking',
    icon: Crosshair,
    desc: 'Automatically follow and track targets with intelligent motion prediction and adaptive tracking.',
    bullets: [
      'Auto-follow selected targets with gimbal lock',
      'Keeps target continuously centered in frame',
      'Handles visual occlusion & rapid motion shifts',
      'Reduces pilot workload during pursuit'
    ]
  },
  {
    id: 'thermal',
    tag: 'VISION IN ZERO VISIBILITY',
    title: 'Thermal Camera Integration',
    icon: Flame,
    desc: 'Real-time thermal imaging with 13 color palettes for mission-critical visibility in complete darkness, fog, and smoke.',
    bullets: [
      'White Hot, Black Hot, Ironbow & Rainbow palettes',
      'Enhanced thermal contrast for rapid target isolation',
      'Operates in night, dense fog, and smoke',
      'Simultaneous RGB and thermal video fusion'
    ]
  },
  {
    id: 'lrf',
    tag: 'PRECISION TARGETING',
    title: 'Laser Rangefinder (LRF)',
    icon: Maximize2,
    desc: 'Accurate real-time distance measurement for enhanced targeting, mapping, and situational awareness.',
    bullets: [
      'Real-time slant distance measurement to targets',
      'Overlay distance and GPS coordinates on HUD',
      'Instant coordinate projection on map',
      'Supports defense, surveillance & industrial missions'
    ]
  }
];

// ---------------------------------------------------------------------------
// TECHNICAL SPECIFICATIONS (MATCHING CYBERONE DEFENSE TABLE)
// ---------------------------------------------------------------------------
const TECH_SPECS = [
  { label: 'Compatible Platforms', val: 'Cyberone Series (Max, Pro, Lite, Trainer), E-Series, S-Series & MAVLink v2.0' },
  { label: 'Operating Systems', val: 'Windows 10 / 11 (64-bit), Ubuntu LTS, Android Companion (IndoFly Mobile)' },
  { label: 'Communication Protocol', val: 'MAVLink v2.0, Microhard, Silvus SC4200/4400, Encrypted 4G / 5G LTE' },
  { label: 'Video Streaming Latency', val: 'Sub-50ms glass-to-glass (RTSP / UDP / H.264 / H.265 standard)' },
  { label: 'AI Compute Architecture', val: 'On-Edge NVIDIA Jetson / TensorRT / ONNX (Zero cloud required)' },
  { label: 'Mapping & Elevation', val: 'Offline MBTiles, GeoTIFF elevation DEM, WMS / WMTS Satellite Layers' },
  { label: 'Flight Log Export', val: 'Microsecond Telemetry (.bin / .tlog), CSV, KML, GPX' },
  { label: 'Field Deployment', val: '100% Air-gapped offline operation in remote field environments' }
];

// ---------------------------------------------------------------------------
// FREQUENTLY ASKED QUESTIONS
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: 'Can IndoFly operate in completely offline, air-gapped field environments?',
    a: 'Yes. IndoFly is engineered specifically for defense and tactical field operations with 100% offline capability. Satellite base maps, elevation DEMs, and geofence profiles can be pre-cached locally, requiring zero internet connection during mission execution.'
  },
  {
    q: 'Which drone models are compatible with IndoFly GCS?',
    a: 'IndoFly natively controls IndoWings entire UAV portfolio—including Cyberone Max, Cyberone Pro, Cyberone Lite, Cyberone Trainer, and agricultural series—as well as standard MAVLink v2.0 compliant autonomous platforms.'
  },
  {
    q: 'How does the AI detection and optical tracking operate without cloud connectivity?',
    a: 'All computer vision neural networks run entirely on-edge (either onboard the drone or locally on the GCS workstation). Detection bounding boxes, target classification, and gimbal slew tracking happen in real time with sub-50ms latency.'
  },
  {
    q: 'What failsafe protocols does IndoFly trigger in case of radio signal loss?',
    a: 'IndoFly incorporates multi-tier autonomous safety rules. Upon telemetry link timeout, the aircraft immediately executes user-defined protocols: automated Return-to-Home at safe designated clearance altitude, orbit-and-wait, or safe terrain-aware landing.'
  },
  {
    q: 'Is IndoFly available as a mobile application for field tablets?',
    a: 'Yes. In addition to the full-featured Windows/Linux GCS workstation software, IndoFly Companion is available for rugged Android tactical tablets, providing one-click takeoff, waypoint planning, and low-latency video streaming in the field.'
  }
];

// ---------------------------------------------------------------------------
// MISSION SORTIE PROFILES (INTERACTIVE MISSION MAP SIMULATOR)
// ---------------------------------------------------------------------------
const MISSION_PROFILES = [
  {
    id: 'mapping',
    name: 'Corridor Mapping',
    waypoints: [
      { id: '1', num: '1', x: 20, y: 72 },
      { id: '2', num: '2', x: 38, y: 35 },
      { id: '3', num: '3', x: 68, y: 30 },
      { id: '4', num: '4', x: 84, y: 68 }
    ],
    pathD: 'M 20 72 Q 28 48, 38 35 T 68 30 T 84 68'
  },
  {
    id: 'perimeter',
    name: 'Border Perimeter',
    waypoints: [
      { id: '1', num: '1', x: 16, y: 30 },
      { id: '2', num: '2', x: 48, y: 22 },
      { id: '3', num: '3', x: 82, y: 40 },
      { id: '4', num: '4', x: 72, y: 78 }
    ],
    pathD: 'M 16 30 Q 32 20, 48 22 T 82 40 T 72 78'
  },
  {
    id: 'recon',
    name: 'Tactical Recon',
    waypoints: [
      { id: '1', num: '1', x: 15, y: 75 },
      { id: '2', num: '2', x: 42, y: 58 },
      { id: '3', num: '3', x: 62, y: 40 },
      { id: '4', num: '4', x: 88, y: 25 }
    ],
    pathD: 'M 15 75 Q 28 65, 42 58 T 62 40 T 88 25'
  }
];

// ---------------------------------------------------------------------------
// THERMAL SENSOR PALETTES (INTERACTIVE SENSOR & AI LAB)
// ---------------------------------------------------------------------------
const THERMAL_PALETTES = [
  { id: 'rgb', label: 'Daylight RGB', color: '#ff7a1a', note: 'Standard Optical 4K Stream' },
  { id: 'white-hot', label: 'White Hot', color: '#ffffff', note: 'High Contrast Tactical Thermal' },
  { id: 'ironbow', label: 'Ironbow', color: '#f59e0b', note: 'Dynamic Spectrum Heat Map' },
  { id: 'black-hot', label: 'Black Hot', color: '#64748b', note: 'Covert Dark Heat Signatures' },
  { id: 'nvg', label: 'NVG Night Vision', color: '#22c55e', note: 'Phosphor Green Matrix' }
];

export default function IndoFlyPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeMission, setActiveMission] = useState(0);
  const [activePalette, setActivePalette] = useState('ironbow');
  const [isTargetLocked, setIsTargetLocked] = useState(true);

  // Safe In-Page Smooth Scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      gsap.fromTo(
        '.indo-fly-brand-left',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.indo-fly-brand-right',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.indo-fly-hero-drone-img',
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      // 2. Capabilities Jhalar Stagger (CyberOne Cascade)
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

      // 3. Section Reveals
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

        // 4. Media Cards Reveal
        gsap.utils.toArray('.indo-fly-media-card').forEach((card) => {
          gsap.fromTo(
            card,
            { y: 35, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        });

        // 5. Mission Cards Stagger
        gsap.fromTo(
          '.indo-fly-mission-card',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.indo-fly-mission-grid',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );

        // 6. AI Cards Stagger
        gsap.fromTo(
          '.indo-fly-ai-card',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.indo-fly-ai-grid',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );

        // 7. Specs Rows Stagger
        gsap.fromTo(
          '.indo-fly-spec-row',
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.indo-fly-specs-wrap',
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

    return (
      <div ref={pageRef} className="indo-fly-page">

        {/* =========================================================================
          SECTION 1: HERO SCREEN (AUTHENTIC VISUAL SHOWCASE, 100VH, ZERO TEXT!)
          Matches CyberoneMaxPage & CyberoneProPage exactly.
          ========================================================================= */}
        <section className="indo-fly-hero">

          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="indo-fly-hero-img-wrap"
          >
            {/* FLANKING INDO...FLY BRAND TYPOGRAPHY (IN BACKGROUND / BEHIND HARDWARE) */}
            <div className="indo-fly-hero-brand-flank">
              <span className="indo-fly-brand-left">INDO</span>
              <span className="indo-fly-brand-right">FLY</span>
            </div>

            {/* STABLE DEVICE CLUSTER (IN FOREGROUND / IN FRONT OF TEXT) */}
            <div className="indo-fly-hero-drone-motion">
              <img
                src="/assets/indofly/indifly.png"
                alt="IndoFly Multi-Device Ground Control Station"
                className="indo-fly-hero-drone-img"
                draggable="false"
              />
            </div>

            <div className="indo-fly-hero-overlay" />
          </motion.div>

          {/* Ambient Floating Scroll Indicator Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="indo-fly-hero-scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="indo-fly-hero-scroll-pill"
            >
              <div className="indo-fly-hero-scroll-dot" />
            </motion.div>
          </motion.div>

        </section>

        {/* =========================================================================
          SECTION 2: 5 CORE MISSION CAPABILITIES (JHALAR / SUSPENDED THREAD)
          ========================================================================= */}
        <section id="features" className="indo-fly-section">
          <div className="indo-fly-container">

            <div className="indo-fly-section-head">
              <span className="indo-fly-tag">TACTICAL ADVANTAGE</span>
              <h2 className="indo-fly-section-title">Mission-Ready Autonomous Flight Platform</h2>
              <p className="indo-fly-section-subtitle">
                Deployed across 3,000+ defense & enterprise drones with edge-AI detection, tactical thermal imaging, and real-time mission telemetry.
              </p>

              {/* Action Buttons */}
              <div className="indo-fly-hero-actions">
                <button
                  type="button"
                  onClick={() => onOpenDemo && onOpenDemo('IndoFly GCS')}
                  className="indo-fly-primary-btn"
                >
                  <span>Request Software Demo</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('mission-modules')}
                  className="indo-fly-secondary-btn"
                >
                  <span>Explore Modules</span>
                </button>
              </div>
            </div>

            {/* JHALAR / LADI SUSPENDED THREAD PRESENTATION */}
            <div className="indo-fly-jhalar-wrapper">
              <div className="indo-fly-jhalar-wire-runner">
                <div className="indo-fly-jhalar-main-thread" />
              </div>

              <div className="indo-fly-jhalar-track">
                {CAPABILITIES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
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
                            <Icon size={20} />
                          </div>
                        </div>

                        <h3 className="indo-fly-pillar-title">{item.title}</h3>
                        <p className="indo-fly-pillar-desc">{item.desc}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
          SECTION 3: REAL-TIME MISSION MAP
          ========================================================================= */}
        <section className="indo-fly-section">
          <div className="indo-fly-container">

            <div className="indo-fly-split-row">

              {/* Left: Text & Features */}
              <div className="indo-fly-split-text">
                <span className="indo-fly-tag">MISSION MAPPING</span>
                <h2 className="indo-fly-split-title">Real-Time Mission Map & Telemetry HUD</h2>
                <p className="indo-fly-split-desc">
                  IndoFly provides a powerful, interactive mission map with real-time drone tracking, waypoint planning, and live flight telemetry overlays.
                </p>

                <div className="indo-fly-feature-list">
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Live GPS tracking & drone position with sub-0.5m accuracy</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Waypoint-based autonomous missions with corridor curves</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Geofence & airspace boundary enforcement</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Offline satellite, topographic DEM & street vector maps</span>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('avionics')}
                    className="indo-fly-secondary-btn"
                    style={{ display: 'inline-flex' }}
                  >
                    <span>Explore Avionics →</span>
                  </button>
                </div>
              </div>

              {/* Right: Interactive Mission Map Sortie Simulator */}
              <div className="indo-fly-sim-card">

                {/* Simulator Mode Switcher Pills (Centered & Clean - Zero Extra Clutter) */}
                <div className="indo-fly-sim-topbar">
                  <div className="indo-fly-sim-modes">
                    {MISSION_PROFILES.map((prof, idx) => (
                      <button
                        key={prof.id}
                        type="button"
                        onClick={() => setActiveMission(idx)}
                        className={`indo-fly-sim-mode-btn ${activeMission === idx ? 'is-active' : ''}`}
                      >
                        {prof.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Viewport with Map Background + Animated Flight Waypoints */}
                <div className="indo-fly-sim-viewport">
                  <img
                    src="/assets/indofly/map-window.png"
                    alt="Real-Time Mission Map Sortie View"
                    className="indo-fly-sim-map-img"
                    draggable="false"
                  />

                  {/* SVG Flight Spline Overlay */}
                  <svg
                    className="indo-fly-sim-svg-overlay"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={MISSION_PROFILES[activeMission].pathD}
                      fill="none"
                      stroke="#ff7a1a"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      style={{ filter: 'drop-shadow(0 0 4px #ff7a1a)' }}
                    />
                  </svg>

                  {/* Minimal Waypoint Circular Nodes */}
                  {MISSION_PROFILES[activeMission].waypoints.map((wp) => (
                    <div
                      key={wp.id}
                      className="indo-fly-sim-waypoint"
                      style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                    >
                      <div className="indo-fly-sim-wp-dot">{wp.num}</div>
                    </div>
                  ))}

                  {/* Animated Flying UAV Blip */}
                  <motion.div
                    key={activeMission}
                    animate={{
                      left: MISSION_PROFILES[activeMission].waypoints.map(w => `${w.x}%`),
                      top: MISSION_PROFILES[activeMission].waypoints.map(w => `${w.y}%`)
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    className="indo-fly-sim-drone"
                  >
                    <div className="indo-fly-sim-radar-pulse" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="#ff7a1a" stroke="#ffffff" strokeWidth="2" />
                      <line x1="12" y1="2" x2="12" y2="7" stroke="#ff7a1a" strokeWidth="2" />
                      <line x1="12" y1="17" x2="12" y2="22" stroke="#ff7a1a" strokeWidth="2" />
                      <line x1="2" y1="12" x2="7" y2="12" stroke="#ff7a1a" strokeWidth="2" />
                      <line x1="17" y1="12" x2="22" y2="12" stroke="#ff7a1a" strokeWidth="2" />
                    </svg>
                  </motion.div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
          SECTION 4: PRE-FLIGHT SETUP & SENSOR CALIBRATION (2-COLUMN ALTERNATING)
          ========================================================================= */}
        <section id="avionics" className="indo-fly-section">
          <div className="indo-fly-container">

            {/* Row 1: Drone Setup Window (Image Left, Text Right) */}
            <div className="indo-fly-split-row">

              {/* Image Card Left */}
              <div className="indo-fly-media-card">
                <img
                  src="/assets/indofly/DroneSetupWindow.png"
                  alt="Drone Setup Window"
                  className="indo-fly-media-img"
                  draggable="false"
                />
              </div>

              {/* Text Right */}
              <div className="indo-fly-split-text">
                <span className="indo-fly-tag">AVIONICS CONFIGURATION</span>
                <h2 className="indo-fly-split-title">Drone Setup Window</h2>
                <p className="indo-fly-split-desc">
                  Configure and manage all essential drone parameters through a unified interface designed for precision and mission readiness.
                </p>

                <div className="indo-fly-feature-list">
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Airframe configuration for optimal flight performance</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Radio setup for stable communication and control</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Sensor calibration (compass, IMU, gyroscope, pressure)</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Motor testing and balance verification</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Power management for efficiency and flight duration</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 2: Calibration Window (Text Left, Image Right) */}
            <div className="indo-fly-split-row" style={{ marginTop: '5rem' }}>

              {/* Text Left */}
              <div className="indo-fly-split-text">
                <span className="indo-fly-tag">SENSOR TUNING</span>
                <h2 className="indo-fly-split-title">Calibration Window</h2>
                <p className="indo-fly-split-desc">
                  Ensure optimal flight performance by accurately calibrating onboard sensors and maintaining system stability across diverse operating environments.
                </p>

                <div className="indo-fly-feature-list">
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Compass & accelerometer calibration</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Level horizon alignment</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Pressure & altitude sensor tuning</span>
                  </div>
                  <div className="indo-fly-feature-item">
                    <CheckCircle2 size={18} />
                    <span>Real-time calibration feedback</span>
                  </div>
                </div>
              </div>

              {/* Image Card Right */}
              <div className="indo-fly-media-card">
                <img
                  src="/assets/indofly/CalibrationWindow.png"
                  alt="Calibration Window"
                  className="indo-fly-media-img"
                  draggable="false"
                />
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
          SECTION 5: MISSION CONTROL INTERFACE (3-CARD SHOWCASE)
          ========================================================================= */}
        <section id="mission-modules" className="indo-fly-section">
          <div className="indo-fly-container">

            <div className="indo-fly-section-head">
              <span className="indo-fly-tag">MISSION CONTROL MODULES</span>
              <h2 className="indo-fly-section-title">Control Every Phase of Flight</h2>
              <p className="indo-fly-section-subtitle">
                Integrated, modular ground control workflows built for mission planning, active failsafe safety, and sub-50ms sensor feeds.
              </p>
            </div>

            <div className="indo-fly-mission-grid">
              {MISSION_CARDS.map((card) => (
                <div key={card.id} className="indo-fly-mission-card">

                  {/* Image */}
                  <div className="indo-fly-mission-media">
                    <img
                      src={card.image}
                      alt={card.title}
                      draggable="false"
                    />
                  </div>

                  {/* Body */}
                  <div className="indo-fly-mission-body">
                    <div>
                      <h3 className="indo-fly-mission-title">{card.title}</h3>
                      <p className="indo-fly-mission-desc">{card.desc}</p>
                    </div>

                    <div className="indo-fly-mission-bullets">
                      {card.bullets.map((b, i) => (
                        <div key={i} className="indo-fly-mission-bullet-item">
                          <span className="indo-fly-mission-dot" />
                          <span>{b}</span>
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
          SECTION 6: AI & SENSOR INTELLIGENCE (2x2 CLEAN GRID - ZERO BROKEN IMAGES)
          ========================================================================= */}
        <section className="indo-fly-section">
          <div className="indo-fly-container">

            <div className="indo-fly-section-head">
              <span className="indo-fly-tag">TACTICAL EDGE SENSORS</span>
              <h2 className="indo-fly-section-title">AI-Driven Computer Vision & Tracking</h2>
              <p className="indo-fly-section-subtitle">
                Real-time object recognition, slaved optical tracking, and multi-spectral radiometric thermal vision running locally on edge compute.
              </p>
            </div>

            {/* INTERACTIVE MULTISPECTRAL THERMAL & AI TRACKING LAB */}
            <div className="indo-fly-thermal-lab">

              {/* Top Palette Switcher Bar */}
              <div className="indo-fly-thermal-header">
                <div className="indo-fly-thermal-title-group">
                  <span className="indo-fly-tag" style={{ margin: 0, paddingBottom: 0, border: 'none' }}>
                    SENSOR MODE:
                  </span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', color: '#ffffff', fontWeight: 700 }}>
                    {THERMAL_PALETTES.find(p => p.id === activePalette)?.note}
                  </span>
                </div>

                <div className="indo-fly-thermal-palettes">
                  {THERMAL_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => setActivePalette(pal.id)}
                      className={`indo-fly-palette-btn ${activePalette === pal.id ? 'is-active' : ''}`}
                    >
                      <span
                        className="indo-fly-palette-color-pip"
                        style={{ backgroundColor: pal.color }}
                      />
                      <span>{pal.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport with Video Feed + Live Target Tracking Reticle */}
              <div className="indo-fly-thermal-canvas-wrap">
                <img
                  src="/assets/indofly/VideoWindow.png"
                  alt="Tactical Video Stream"
                  className={`indo-fly-thermal-img palette-${activePalette}`}
                  draggable="false"
                />

                {/* Slaved AI Target Tracking Reticle */}
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    borderColor: ['#ff7a1a', '#ffffff', '#ff7a1a']
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="indo-fly-target-reticle"
                >
                  <div className="indo-fly-target-tag">
                    TRK #01: TARGET ACQUIRED [98.6%]
                  </div>
                </motion.div>
              </div>

              {/* Live Sensor Telemetry Strip */}
              <div className="indo-fly-thermal-hud-strip">
                <div>
                  FOV: <span className="accent">42.5° H // 30X EO</span>
                </div>
                <div>
                  SLANT RANGE (LRF): <span className="accent">480 M</span>
                </div>
                <div>
                  ISOTHERMAL TEMP: <span className="accent">37.4°C [DELTA +14.2°C]</span>
                </div>
                <div>
                  LATENCY: <span className="accent">&lt; 45MS RTSP GLASS-TO-GLASS</span>
                </div>
              </div>

            </div>

            <div className="indo-fly-ai-grid">
              {AI_CAPABILITIES.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.id} className="indo-fly-ai-card">

                    <div>
                      <div className="indo-fly-ai-card-head">
                        <span className="indo-fly-ai-card-tag">{card.tag}</span>
                        <div className="indo-fly-ai-card-icon">
                          <Icon size={22} />
                        </div>
                      </div>

                      <h3 className="indo-fly-ai-card-title">{card.title}</h3>
                      <p className="indo-fly-ai-card-desc">{card.desc}</p>
                    </div>

                    <div className="indo-fly-ai-card-bullets">
                      {card.bullets.map((b, i) => (
                        <div key={i} className="indo-fly-ai-card-item">
                          <CheckCircle2 size={16} color="#ff7a1a" style={{ flexShrink: 0 }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
          SECTION 7: TECHNICAL SPECIFICATIONS (DARK DEFENSE TABLE)
          ========================================================================= */}
        <section className="indo-fly-section">
          <div className="indo-fly-container">

            <div className="indo-fly-section-head">
              <span className="indo-fly-tag">TECHNICAL SPECIFICATIONS</span>
              <h2 className="indo-fly-section-title">System Architecture & Compatibility</h2>
              <p className="indo-fly-section-subtitle">
                Engineered for robust compatibility across defense datalinks and rugged field workstations.
              </p>
            </div>

            <div className="indo-fly-specs-wrap">
              {TECH_SPECS.map((spec, idx) => (
                <div key={idx} className="indo-fly-spec-row">
                  <span className="indo-fly-spec-label">{spec.label}</span>
                  <span className="indo-fly-spec-val">{spec.val}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
          SECTION 8: FREQUENTLY ASKED QUESTIONS (PLUS / MINUS ACCORDION)
          ========================================================================= */}
        <section className="indo-fly-section">
          <div className="indo-fly-container indo-fly-faq-container">

            <div className="indo-fly-section-head">
              <span className="indo-fly-tag">INQUIRIES</span>
              <h2 className="indo-fly-section-title">Frequently Asked Questions</h2>
              <p className="indo-fly-section-subtitle">
                Technical answers regarding offline operation, drone compatibility, and deployment.
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
                <span className="indo-fly-tag">MISSION CONTROL</span>
                <h2 className="indo-fly-cta-title">Control Every Aspect of Your Drone Mission</h2>
                <p className="indo-fly-cta-desc">
                  From planning to real-time execution — IndoFly gives you complete operational control.
                </p>

                <div className="indo-fly-hero-actions" style={{ marginBottom: 0 }}>
                  <button
                    type="button"
                    onClick={() => onOpenDemo && onOpenDemo('IndoFly GCS')}
                    className="indo-fly-primary-btn"
                  >
                    <span>Request Software Demo</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('features')}
                    className="indo-fly-secondary-btn"
                  >
                    <span>Explore Features</span>
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
