import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Crosshair,
  Shield,
  Eye,
  Radio,
  Sliders,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Activity,
  Wifi,
  Zap,
  Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Core GCS Interactive Modules Data
const GCS_MODULES = [
  {
    id: 'plan',
    title: 'Mission Planning',
    badge: 'AUTONOMOUS NAVIGATION',
    icon: Compass,
    image: '/assets/indofly/PlanWindow.png',
    headline: 'Corridor & Polygon Autonomous Path Planning',
    desc: 'Design complex multi-waypoint flight trajectories with automated terrain-following, obstacle avoidance margins, and geofence-constrained corridors.',
    highlights: [
      'Multi-waypoint grid & corridor mapping',
      'Dynamic wind & battery path optimization',
      'Geofence-constrained autonomous routing',
      'Instant 3D survey & overlap preview'
    ],
    telemetry: {
      mode: 'AUTO_NAV',
      waypoints: '128 Pts',
      turnRadius: 'Adaptive',
      failsafe: 'Auto-RTH'
    }
  },
  {
    id: 'map',
    title: 'Real-Time Map & Telemetry',
    badge: 'GEOSPATIAL SITUATIONAL AWARENESS',
    icon: Layers,
    image: '/assets/indofly/map-window.png',
    headline: 'Live Drone Positioning & Telemetry HUD',
    desc: 'Continuous real-time geospatial tracking with live telemetry feeds, dynamic altitude profiles, airspeed vectors, and multi-layer satellite terrain overlays.',
    highlights: [
      'Live dual-GPS positioning with <0.5m drift',
      'Multi-layer satellite, hybrid & offline street maps',
      'Full HUD telemetry overlay (Groundspeed, Pitch, Roll, Yaw)',
      'Real-time distance-to-home & horizon vectors'
    ],
    telemetry: {
      gpsLock: '3D Fix (24 Sat)',
      latency: '< 45ms',
      refreshRate: '50 Hz',
      linkQuality: '99.8%'
    }
  },
  {
    id: 'video',
    title: 'Live Sensor & AI Stream',
    badge: 'EDGE-AI LOW LATENCY FEED',
    icon: Eye,
    image: '/assets/indofly/VideoWindow.png',
    headline: 'Low-Latency HD RTSP Video & Sensor Fusion',
    desc: 'Integrated sensor viewing console supporting simultaneous RGB optical streams, thermal sensor matrices, and dynamic target identification overlays.',
    highlights: [
      'Sub-50ms ultra-low latency RTSP / H.265 stream',
      'Picture-in-Picture (PiP) optical & thermal view',
      'Real-time HUD reticles with coordinates overlay',
      'Instant target distance calculation & pin-drop'
    ],
    telemetry: {
      codec: 'H.265 / HEVC',
      resolution: '4K @ 60fps',
      streamDelay: '38ms',
      thermalMatrix: '640x512'
    }
  },
  {
    id: 'safety',
    title: 'Safety & Failsafe Logic',
    badge: 'MIL-SPEC FAILSAFE ARCHITECTURE',
    icon: Shield,
    image: '/assets/indofly/SafetyWindow.png',
    headline: 'Fail-Safe Decision Engine & Boundary Guard',
    desc: 'Mission-critical autonomous safety engine providing automatic Return-To-Home, emergency safe landing zone calculation, and hardened electronic boundary confinement.',
    highlights: [
      'Multi-tier geofence containment with hard ceiling',
      'Automated Return-To-Home (RTH) on radio link loss',
      'Smart battery threshold auto-landing calculations',
      'Instant manual flight override with safety latch'
    ],
    telemetry: {
      failsafeStatus: 'ARMED // SECURE',
      geofenceRadius: '5,000 m',
      rthAltitude: '120 m AGL',
      batteryReserve: '22%'
    }
  }
];

// Tactical AI Capabilities (Bento Data)
const AI_CAPABILITIES = [
  {
    id: 'detection',
    title: 'Edge Human & Vehicle Detection',
    badge: 'NEURAL OBJECT RECOGNITION',
    image: '/assets/indofly/human-detection.jpg',
    tag: 'ON-EDGE YOLO / TENSORRT',
    desc: 'Sub-50ms object recognition runs on local compute hardware, automatically highlighting personnel, perimeter breaches, and moving tactical vehicles.',
    specs: ['Real-time 98.4% detection confidence', 'Multi-class bounding boxes', 'Zero cloud dependency']
  },
  {
    id: 'tracking',
    title: 'Slaved Optical Target Tracking',
    badge: 'GIMBAL AUTONOMOUS LOCK',
    image: '/assets/indofly/ai-tracking.jpg',
    tag: 'SLAVED GCS TRACKING',
    desc: 'Single-click target acquisition automatically slaves the 3-axis gimbal payload to keep moving targets centered regardless of UAV altitude and airspeed.',
    specs: ['Continuous centroid lock', 'Motion prediction on occlusion', 'Optical zoom autofocus slave']
  },
  {
    id: 'thermal',
    title: 'Radiometric Thermal Imaging',
    badge: 'NIGHT & LOW-VIS SENSING',
    image: null,
    icon: Zap,
    tag: '640x512 UNCOOLED VOX',
    desc: 'Dual-sensor EO/IR matrix integration provides instant isothermal spot temperature readouts and target isolation in dense fog or pitch darkness.',
    specs: ['High-contrast white-hot / black-hot palettes', 'Differential temperature alarms', 'Night search & rescue ready']
  },
  {
    id: 'ranging',
    title: 'Instant Coordinate Projection',
    badge: 'GEOLOCATION PIN-DROP',
    image: null,
    icon: Target,
    tag: 'WGS84 HUD CALCULATION',
    desc: 'Laser rangefinder fusion automatically calculates the exact real-time GPS coordinates and elevation of any crosshair target in real time.',
    specs: ['Real-time slant distance calculation', 'Instant GPS coordinate projection', 'Direct HUD telemetry reticle']
  }
];

// Engineering Configuration Data
const CONFIG_MODULES = [
  {
    title: 'Unified Drone Setup',
    subtitle: 'Pre-flight Avionics Configuration',
    image: '/assets/indofly/DroneSetupWindow.png',
    desc: 'Configure essential airframe parameters, radio data communication links, motor thrust verification, and smart power management through a single consolidated console.',
    items: [
      'Airframe profile loading for optimal aerodynamic performance',
      'Dual-band telemetry radio link & channel binding',
      'Dynamic motor test sequencing & balance verification',
      'Smart battery discharge & capacity management'
    ]
  },
  {
    title: 'Precision Sensor Calibration',
    subtitle: 'Systemic Sensor Tuning & Zeroing',
    image: '/assets/indofly/CalibrationWindow.png',
    desc: 'Achieve sub-degree flight stability across extreme operational environments with comprehensive on-screen sensor calibration and real-time health verification.',
    items: [
      '6-axis IMU, gyroscope & accelerometer tuning',
      'Magnetic compass declination & interference mapping',
      'Barometric altitude zeroing & pressure calibration',
      'Live real-time attitude feedback & health diagnostics'
    ]
  }
];

// Technical Specifications Matrix
const TECH_SPECS = [
  { label: 'Supported Platforms', value: 'Multi-Rotor, Fixed-Wing, VTOL (Cyberone Series, E-Series, S-Series)' },
  { label: 'Operating Systems', value: 'Windows 10 / 11 (64-bit), Ubuntu LTS, Android Companion (IndoFly Mobile)' },
  { label: 'Communication Protocol', value: 'MAVLink v2.0, Microhard, Silvus SC4200/4400, Encrypted LTE / 5G' },
  { label: 'Video Streaming', value: 'RTSP / UDP / H.264 / H.265 with sub-50ms glass-to-glass latency' },
  { label: 'AI Inference Engines', value: 'TensorRT / ONNX Runtime optimized on NVIDIA Jetson & High-Compute GCS' },
  { label: 'Mapping & Elevation', value: 'Offline MBTiles, GeoTIFF elevation DEM, WMS / WMTS Satellite Layers' },
  { label: 'Telemetry Export', value: 'CSV, KML, GPX, Flight Log (.bin/.tlog) with microsecond precision' }
];

// IndoFly FAQs
const INDOFLY_FAQS = [
  {
    q: 'Can IndoFly operate in completely offline, air-gapped field environments?',
    a: 'Yes. IndoFly is engineered specifically for defense and tactical field operations with 100% offline capability. Satellite base maps, elevation DEMs, and geofence data can be pre-cached locally, requiring zero internet connection during mission execution.'
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
    a: 'IndoFly incorporates multi-tier autonomous safety rules. Upon telemetry link timeout, the aircraft immediately executes user-defined protocol: automated Return-to-Home at safe designated clearance altitude, orbit-and-wait, or safe terrain-aware landing.'
  },
  {
    q: 'Is IndoFly available as a mobile application for field tablets?',
    a: 'Yes. In addition to the full-featured Windows/Linux GCS workstation software, IndoFly Companion is available for rugged Android tactical tablets, providing one-click takeoff, waypoint planning, and low-latency video streaming in the field.'
  }
];

export default function IndoFlyPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo(
        '.if-hero-elem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      // Hero GCS Mockup float
      gsap.fromTo(
        '.if-hero-device',
        { scale: 0.94, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.2 }
      );

      // Section titles reveal
      gsap.utils.toArray('.if-reveal-head').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
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

    return () => ctx.revert();
  }, []);

  const currentModule = GCS_MODULES[activeTab];

  return (
    <div ref={pageRef} className="indofly-page">
      
      {/* BACKGROUND AMBIENT GLOW & SUBTLE HUD GRID */}
      <div className="indofly-ambient">
        <div className="indofly-ambient-glow" />
        <div className="indofly-hud-grid" />
      </div>

      <div className="indofly-content">

        {/* 1. HERO SECTION: CINEMATIC GCS OPERATING SYSTEM */}
        <section className="indofly-hero indofly-container">
          {/* Breadcrumb Navigation */}
          <div className="if-hero-elem indofly-breadcrumb">
            <button 
              onClick={onBack}
              className="cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span>Software</span>
            <span>/</span>
            <span className="active">IndoFly GCS</span>
          </div>

          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            {/* Live Operational Eyebrow */}
            <div className="if-hero-elem indofly-badge">
              <span className="indofly-pulse-dot" />
              <span className="indofly-badge-text">
                AUTONOMOUS FLIGHT OS // GROUND CONTROL STATION
              </span>
            </div>

            {/* Main Title */}
            <h1 className="if-hero-elem indofly-hero-title">
              IndoFly <span className="highlight">GCS</span>
            </h1>

            {/* Concise Mission Subtitle */}
            <p className="if-hero-elem indofly-hero-subtext">
              Mission-ready autonomous flight control, real-time telemetry analytics, and edge-AI payload intelligence engineered for sovereign defense and industrial UAV operations.
            </p>

            {/* Quick Metrics Bar */}
            <div className="if-hero-elem indofly-metrics-grid">
              <div className="indofly-metric-card">
                <div className="indofly-metric-label">Deployment</div>
                <div className="indofly-metric-val">3,000+ Missions</div>
              </div>
              <div className="indofly-metric-card">
                <div className="indofly-metric-label">Video Latency</div>
                <div className="indofly-metric-val accent">&lt; 50ms RTSP</div>
              </div>
              <div className="indofly-metric-card">
                <div className="indofly-metric-label">Computer Vision</div>
                <div className="indofly-metric-val">On-Edge AI</div>
              </div>
              <div className="indofly-metric-card">
                <div className="indofly-metric-label">Connectivity</div>
                <div className="indofly-metric-val">100% Offline</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="if-hero-elem indofly-hero-actions">
              <button
                onClick={() => onOpenDemo('IndoFly GCS')}
                className="indofly-btn-primary"
              >
                <span>Request Software Demo</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#modules"
                className="indofly-btn-secondary"
              >
                Explore Core Modules
              </a>
            </div>
          </div>

          {/* Hero Device Mockup Presentation */}
          <div className="if-hero-device indofly-hero-device-wrap">
            <div className="indofly-hero-device-box">
              <div className="indofly-hero-screen">
                <img 
                  src="/assets/indofly/indifly.png" 
                  alt="IndoFly Ground Control Station Software Suite" 
                />
                
                {/* Tactical HUD Corner Elements */}
                <div className="indofly-hud-tag-tl">
                  SYS: INDOFLY_GCS_V3.8 // ACTIVE
                </div>
                <div className="indofly-hud-tag-br">
                  <span className="indofly-pulse-dot" />
                  MAVLINK_V2_ENCRYPTED
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE GCS MODULES STUDIO (INTERACTIVE WORKSPACE) */}
        <section id="modules" className="indofly-section indofly-container">
          <div className="if-reveal-head indofly-section-head">
            <span className="indofly-section-tag">
              MISSION CONTROL MODULES
            </span>
            <h2 className="indofly-section-title">
              Control Every Phase of Flight
            </h2>
            <p className="indofly-section-desc">
              Integrated, modular ground control workflows built for mission planning, real-time spatial positioning, edge sensor feeds, and active failsafe safety.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="indofly-tabs-bar">
            {GCS_MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(idx)}
                  className={`indofly-tab-btn ${isActive ? 'is-active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Workspace Display */}
          <div className="indofly-workspace-box">
            <div className="indofly-workspace-grid">
              
              {/* Left Column: High-Res Screenshot Preview with Zoom Border */}
              <div>
                <div className="indofly-screenshot-wrap">
                  <img 
                    src={currentModule.image} 
                    alt={currentModule.title}
                  />
                  <div className="indofly-screenshot-badge">
                    {currentModule.badge}
                  </div>
                </div>
              </div>

              {/* Right Column: Module Brief, Highlights & Telemetry Specs */}
              <div className="indofly-module-info">
                <div>
                  <div className="indofly-module-eyebrow">
                    <span className="indofly-dot" />
                    <span>Module 0{activeTab + 1} // {currentModule.title}</span>
                  </div>

                  <h3 className="indofly-module-headline">
                    {currentModule.headline}
                  </h3>

                  <p className="indofly-module-desc">
                    {currentModule.desc}
                  </p>

                  <div className="indofly-highlights-list">
                    {currentModule.highlights.map((item, i) => (
                      <div key={i} className="indofly-highlight-item">
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Spec Telemetry Grid */}
                <div className="indofly-telemetry-grid">
                  {Object.entries(currentModule.telemetry).map(([k, v]) => (
                    <div key={k} className="indofly-telemetry-pill">
                      <div className="indofly-telemetry-k">{k}</div>
                      <div className="indofly-telemetry-v">{v}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPUTER VISION & SENSOR INTELLIGENCE (BENTO GRID) */}
        <section className="indofly-section indofly-container">
          <div className="if-reveal-head indofly-section-head">
            <span className="indofly-section-tag">
              TACTICAL EDGE INTELLIGENCE
            </span>
            <h2 className="indofly-section-title">
              AI-Driven Computer Vision
            </h2>
            <p className="indofly-section-desc">
              Autonomous object identification, optical slaved tracking, and multi-spectral radiometric thermal imaging for low-visibility and night missions.
            </p>
          </div>

          <div className="indofly-bento-grid">
            {AI_CAPABILITIES.map((card) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.id}
                  className="indofly-bento-card"
                >
                  {/* Top Image or Graphic Container */}
                  <div className="indofly-bento-media">
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title}
                      />
                    ) : (
                      <div className="indofly-bento-placeholder">
                        <div className="indofly-bento-icon-circle">
                          {Icon && <Icon size={26} strokeWidth={2.2} />}
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                          RADIOMETRIC MATRIX
                        </span>
                      </div>
                    )}
                    <span className="indofly-bento-tag">
                      {card.tag}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="indofly-bento-body">
                    <div>
                      <div className="indofly-bento-badge">
                        {card.badge}
                      </div>
                      <h4 className="indofly-bento-title">
                        {card.title}
                      </h4>
                      <p className="indofly-bento-desc">
                        {card.desc}
                      </p>
                    </div>

                    <div className="indofly-bento-specs">
                      {card.specs.map((spec, i) => (
                        <div key={i} className="indofly-bento-spec-item">
                          <span className="indofly-dot" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PRE-FLIGHT ENGINEERING & HARDWARE TUNING (CLEAN SPLIT) */}
        <section className="indofly-section indofly-container">
          <div className="if-reveal-head indofly-section-head">
            <span className="indofly-section-tag">
              PRE-FLIGHT AVIONICS & TUNING
            </span>
            <h2 className="indofly-section-title">
              Complete Drone Setup & Sensor Zeroing
            </h2>
            <p className="indofly-section-desc">
              A unified console for airframe parameter deployment, radio channel verification, motor testing, and precision IMU sensor calibration before mission launch.
            </p>
          </div>

          <div className="indofly-config-grid">
            {CONFIG_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="indofly-config-card"
              >
                <div>
                  <div className="indofly-config-header">
                    <span className="indofly-config-subtitle">
                      {item.subtitle}
                    </span>
                    <span className="indofly-status-light" />
                  </div>

                  <h3 className="indofly-config-title">
                    {item.title}
                  </h3>

                  <p className="indofly-config-desc">
                    {item.desc}
                  </p>

                  <div className="indofly-config-img-wrap">
                    <img 
                      src={item.image} 
                      alt={item.title}
                    />
                  </div>

                  <div className="indofly-highlights-list">
                    {item.items.map((point, i) => (
                      <div key={i} className="indofly-highlight-item">
                        <CheckCircle2 size={16} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="indofly-config-footer">
                  <span>SUBSYSTEM CHECK: VERIFIED</span>
                  <span>AUTOTUNE READY</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNICAL SPECIFICATIONS MATRIX (CLEAN & MINIMAL) */}
        <section className="indofly-section indofly-container" style={{ maxWidth: '980px' }}>
          <div className="if-reveal-head indofly-section-head">
            <span className="indofly-section-tag">
              ARCHITECTURE & COMPATIBILITY
            </span>
            <h2 className="indofly-section-title">
              IndoFly Technical Specifications
            </h2>
            <p className="indofly-section-desc">
              Standardized architecture engineered to operate across varied defense datalinks and rugged computing platforms.
            </p>
          </div>

          <div className="indofly-specs-box">
            {TECH_SPECS.map((spec, idx) => (
              <div key={idx} className="indofly-spec-row">
                <span className="indofly-spec-label">
                  {spec.label}
                </span>
                <span className="indofly-spec-value">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CURATED FAQ ACCORDION */}
        <section className="indofly-section indofly-container" style={{ maxWidth: '850px' }}>
          <div className="if-reveal-head indofly-section-head">
            <span className="indofly-section-tag">
              INQUIRIES & DEPLOYMENT
            </span>
            <h2 className="indofly-section-title">
              Frequently Asked Questions
            </h2>
            <p className="indofly-section-desc">
              Technical answers regarding offline operation, hardware compatibility, and deployment licensing.
            </p>
          </div>

          <div className="indofly-faq-list">
            {INDOFLY_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`indofly-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="indofly-faq-trigger"
                  >
                    <span className="indofly-faq-question">
                      {faq.q}
                    </span>
                    <span className="indofly-faq-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="indofly-faq-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. SOVEREIGN CTA BANNER */}
        <section className="indofly-section indofly-container" style={{ maxWidth: '1000px', borderTop: 'none' }}>
          <div className="indofly-cta-box">
            <div className="indofly-cta-radial" />

            <div className="indofly-cta-inner">
              <span className="indofly-section-tag">
                INTELLIGENT AUTONOMOUS FLIGHT
              </span>

              <h2 className="indofly-cta-title">
                Ready to Deploy IndoFly on Your Fleet?
              </h2>

              <p className="indofly-cta-desc">
                Connect with our aerospace software engineers for custom ground control integrations, multi-aircraft control stations, and enterprise licensing.
              </p>

              <div className="indofly-hero-actions">
                <button
                  onClick={() => onOpenDemo('IndoFly GCS')}
                  className="indofly-btn-primary"
                >
                  <span>Request Live Software Demo</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={onBack}
                  className="indofly-btn-secondary"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
