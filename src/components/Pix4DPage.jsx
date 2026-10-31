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
  Box,
  MapPin,
  TrendingUp,
  Sliders,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Database,
  Grid,
  FileText,
  Activity,
  Award
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 1. 5 CORE PHOTOGRAMMETRY PILLARS (JHALAR SUSPENDED CARDS)
// ---------------------------------------------------------------------------
const CAPABILITIES = [
  {
    num: '01',
    icon: '/assets/pix4d/accuracy.svg',
    title: 'Survey-Grade\nMetric Accuracy',
    desc: 'Generate sub-centimeter georeferenced orthomosaics, digital surface models (DSMs), and 3D textured meshes with complete GCP and RTK/PPK support.',
    cordLength: 35
  },
  {
    num: '02',
    icon: '/assets/pix4d/drone_mapping.svg',
    title: 'Full Drone Autonomy\n& RGB/Multispectral',
    desc: 'Process imagery captured from RGB, thermal, and multispectral drone payloads. Perfect compatibility with IndoWings Cyberone UAV survey fleets.',
    cordLength: 85
  },
  {
    num: '03',
    icon: '/assets/pix4d/digitize.svg',
    title: 'Dense 3D Point Cloud\nClassification',
    desc: 'Automatic machine learning ground point classification separating terrain, vegetation, buildings, and roads for precision volumetrics.',
    cordLength: 20
  },
  {
    num: '04',
    icon: '/assets/pix4d/surveying.svg',
    title: 'CAD & GIS Vectorization\nInteroperability',
    desc: 'Seamless export to industry-standard formats: GeoTIFF, LAS/LAZ, DXF, OBJ, SHP, and LandXML for direct workflow integration in AutoCAD & ArcGIS.',
    cordLength: 95
  },
  {
    num: '05',
    icon: '/assets/indosim/icons/icon-01.svg',
    title: 'Authorized Licensing\n& Local Support in India',
    desc: 'Official IndoWings partner support providing enterprise perpetual keys, rental licenses, corporate training, and dedicated Indian support.',
    cordLength: 45
  }
];

// ---------------------------------------------------------------------------
// 2. PIX4D SOFTWARE SUITE MODULES (AUTHENTIC MEDIA FROM EXISTING SITE)
// ---------------------------------------------------------------------------
const SOFTWARE_SUITE = [
  {
    id: 'mapper',
    name: 'PIX4Dmapper',
    tag: 'FLAGSHIP PHOTOGRAMMETRY',
    headline: 'Desktop Photogrammetry for Professional Drone Mapping',
    desc: 'Transform raw RGB, multispectral, and thermal drone imagery into survey-grade 2D orthomosaics, digital elevation models (DEM/DSM), and dense 3D point clouds.',
    bullets: [
      'Sub-centimeter accuracy with RTK/PPK and ground control points (GCPs)',
      'Automated rayCloud editor for multi-perspective visual verification',
      'Instant volume calculations, cut-and-fill analysis, and slope angles',
      'Full compatibility with Windows workstations with GPU acceleration'
    ],
    image: '/assets/pix4d/Raycloud_interface.png'
  },
  {
    id: 'matic',
    name: 'PIX4Dmatic',
    tag: 'LARGE-SCALE MAPPING',
    headline: 'Next-Generation Processing for Massive Datasets & Corridors',
    desc: 'Engineered specifically for processing thousands of high-resolution images. Handles highway corridors, extensive mining sites, and large cadastral boundaries at 3x speed.',
    bullets: [
      'Optimized for large drone datasets (>5,000 to 20,000+ images)',
      'Simultaneous processing of terrestrial LiDAR & aerial drone photogrammetry',
      'Advanced multi-GPU pipeline reducing compute bottlenecks',
      'Seamless one-click export into PIX4Dsurvey for CAD vector drafting'
    ],
    image: '/assets/pix4d/HEADER_wide.png'
  },
  {
    id: 'survey',
    name: 'PIX4Dsurvey',
    tag: 'PHOTOGRAMMETRY TO CAD',
    headline: 'Bridge the Gap Between Reality Capture and CAD Deliverables',
    desc: 'Extract vector survey lines, contours, and spot heights directly from 3D point clouds. Eliminates cumbersome manual tracing and speeds up drafting.',
    bullets: [
      'Extract curb lines, building footprints, and breaklines in vector format',
      'Integrated TIN mesh creation and automated contour line generation',
      'Native export to DXF, DWG, and LandXML for AutoCAD and Civil 3D',
      'Dramatically reduces CAD drafting time from days to hours'
    ],
    image: '/assets/pix4d/color_point_cloud.jpg'
  },
  {
    id: 'cloud',
    name: 'PIX4Dcloud',
    tag: 'ONLINE COLLABORATION',
    headline: 'Cloud Processing, Site Timeline Tracking & Stakeholder Sharing',
    desc: 'Upload drone images directly from the field for automated cloud photogrammetry. Compare site progress over time and share interactive 3D models via URL.',
    bullets: [
      'Cloud-based processing accessible on any browser with zero local hardware load',
      'Timeline 4D comparison tool to inspect day-to-day site progress',
      'Interactive measurement tools for distances, areas, and volumes',
      'Secure web sharing with clients, contractors, and project stakeholders'
    ],
    image: '/assets/pix4d/classified_point_cloud.jpg'
  }
];

// ---------------------------------------------------------------------------
// 3. TARGETED INDUSTRY APPLICATIONS (REAL PHOTOS FROM WEBSITE)
// ---------------------------------------------------------------------------
const REAL_INDUSTRY_STORIES = [
  {
    title: 'Mine Surveying & Volumetrics',
    tag: 'MINING & AGGREGATE',
    desc: 'Volumetric measurement of stockpiles, cut-and-fill analysis, and pit hazard mapping using terrestrial handheld viDoc scanning and aerial drone models.',
    image: '/assets/pix4d/HEA_BLOG_KGSS_2023.jpg'
  },
  {
    title: 'Ground Reality Capture & RTK Scanning',
    tag: 'CONSTRUCTION & CADASTRAL',
    desc: 'Pairing smartphones with RTK rovers (viDoc) and IndoWings UAVs for sub-inch ground verification, trench mapping, and underground utility marking.',
    image: '/assets/pix4d/HEA_BLOG_Atay_viDoc_2023.jpg'
  },
  {
    title: 'Linear Corridors & Power Transmission',
    tag: 'INFRASTRUCTURE & UTILITIES',
    desc: 'High-speed processing of railway corridors, highway expansions, and transmission towers with automated 3D mesh surface reconstruction.',
    image: '/assets/pix4d/HEADER_wide.png'
  },
  {
    title: 'Survey-Grade Digital Elevation Modeling',
    tag: 'TERRAIN & GIS MAPPING',
    desc: 'Creation of DSM, DTM, and contour lines for flood inundation studies, watershed planning, and municipal smart city infrastructure planning.',
    image: '/assets/pix4d/BACKGROUND_3D_mesh.jpg'
  }
];

// ---------------------------------------------------------------------------
// 4. LICENSING OPTIONS AVAILABLE THROUGH INDOWINGS
// ---------------------------------------------------------------------------
const LICENSING_OPTIONS = [
  {
    plan: 'Enterprise Perpetual License',
    badge: 'POPULAR FOR DEFENSE & SURVEY ACADEMIES',
    desc: 'One-time investment granting permanent desktop software authorization with 1 full year of software upgrades and technical support.',
    features: [
      'Perpetual software license key',
      '1 year of software upgrades & technical support included',
      'Unlimited local desktop processing',
      'Onboarding and training support by IndoWings photogrammetry team'
    ]
  },
  {
    plan: 'Annual Subscription Rental',
    badge: 'FLEXIBLE ENTERPRISE',
    desc: 'Cost-effective annual operational subscription for project-based survey contractors and dynamic drone service providers.',
    features: [
      'Always running the latest release of PIX4D software',
      'Continuous technical support from IndoWings specialists',
      'Desktop processing + cloud processing credits bundle',
      'Easy annual renewal and team license seat pooling'
    ]
  },
  {
    plan: 'Educational & Institutional Pack',
    badge: 'UNIVERSITIES & RPTOs',
    desc: 'Specialized lab bundles for academic colleges, universities, and DGCA RPTO academies teaching drone surveying and GIS.',
    features: [
      'Multi-seat lab licenses for computer classrooms',
      'Authorized training syllabus and student exercise datasets',
      'Subsidized institutional pricing for accredited universities',
      'Teacher training workshops certified by IndoWings'
    ]
  }
];

// ---------------------------------------------------------------------------
// 5. SYSTEM REQUIREMENTS FOR PIX4D WORKSTATIONS
// ---------------------------------------------------------------------------
const SPECS_DATA = [
  { label: 'Operating System', val: 'Windows 10 / Windows 11 (64-bit) / macOS supported on cloud' },
  { label: 'Processor (CPU)', val: 'Quad-core Intel Core i7 / i9 or AMD Ryzen 7 / 9 (Multi-threaded)' },
  { label: 'System Memory (RAM)', val: '32GB DDR4/DDR5 (64GB - 128GB recommended for >2,000 images)' },
  { label: 'Graphics Processing (GPU)', val: 'NVIDIA GeForce RTX 3060 / 4070 / Quadro (CUDA Enabled)' },
  { label: 'Storage (SSD)', val: '1TB NVMe M.2 SSD recommended for fast read/write cache' },
  { label: 'Input Formats', val: 'JPG, TIFF (RGB, Thermal Radiometric, Multispectral Bands)' },
  { label: 'Output Formats', val: 'GeoTIFF, LAS, LAZ, OBJ, PLY, DXF, SHP, KML, LandXML, PDF Report' },
  { label: 'Partner Authorization', val: 'Official IndoWings Reseller & Technical Integration in India' }
];

// ---------------------------------------------------------------------------
// 6. FREQUENTLY ASKED QUESTIONS
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: 'Why should we purchase PIX4D software through IndoWings?',
    a: 'IndoWings is an official Pix4D partner in India. When purchasing through IndoWings, you receive Indian billing with GST compliance, dedicated local technical onboarding, and guaranteed compatibility with IndoWings survey drones like Cyberone Max and Cyberone Pro.'
  },
  {
    q: 'What is the main difference between PIX4Dmapper and PIX4Dmatic?',
    a: 'PIX4Dmapper is the classic industry-standard photogrammetry software for desktop processing of small-to-medium drone mapping projects. PIX4Dmatic is the next-generation engine designed specifically for massive datasets (5,000 to 20,000+ images), corridor flights, and hybrid aerial-photogrammetry + LiDAR fusion.'
  },
  {
    q: 'Does PIX4D support RTK/PPK data from IndoWings drones?',
    a: 'Yes. PIX4D seamlessly reads high-precision RTK/PPK geotags from IndoWings survey drones, allowing you to achieve survey-grade accuracy (sub-3cm horizontal and vertical) with minimal or zero ground control points.'
  },
  {
    q: 'Can PIX4D be deployed offline for defense and sensitive projects?',
    a: 'Yes. PIX4Dmapper offers dedicated offline licensing and desktop-only workflows where sensitive survey imagery never leaves your air-gapped workstation or secure local network.'
  },
  {
    q: 'Are educational discounts available for colleges and universities?',
    a: 'Yes. IndoWings offers specialized Educational Lab packages for universities, engineering colleges, and DGCA RPTOs to set up multi-user surveying and photogrammetry labs.'
  }
];

export default function Pix4DPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const heroVideoRef = useRef(null);
  const brandLettersRef = useRef([]);
  const suitePinRef = useRef(null);
  const suiteScrollTriggerRef = useRef(null);
  const activeModuleRef = useRef(0);
  const [activeModule, setActiveModule] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Direct Tab Click: Smoothly moves the scrollbar to the exact module segment inside the pinned suite
  const handleTabClick = (idx) => {
    setActiveModule(idx);
    activeModuleRef.current = idx;
    if (suiteScrollTriggerRef.current) {
      const trigger = suiteScrollTriggerRef.current;
      // Target progress offset: 0 -> 0.05, 1 -> 0.32, 2 -> 0.60, 3 -> 0.88
      const targetP = (idx + 0.35) / SOFTWARE_SUITE.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Animations (Clean and performant, exactly matching IndoWings defense standard)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bottom Stretch PIX4D Letters Reveal
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

      // 4. Section 3: GSAP ScrollTrigger Pinned Sequence (4 Photogrammetry Modules)
      // When scrolling down, the section pins in place, smoothly cycling through all 4 modules,
      // and only after all 4 have been shown does the page unpin and move to the next section.
      const suiteEl = suitePinRef.current;
      if (suiteEl) {
        const trigger = ScrollTrigger.create({
          trigger: suiteEl,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const newIdx = Math.min(
              SOFTWARE_SUITE.length - 1,
              Math.floor(p * SOFTWARE_SUITE.length)
            );
            if (newIdx !== activeModuleRef.current) {
              activeModuleRef.current = newIdx;
              setActiveModule(newIdx);
            }
          }
        });
        suiteScrollTriggerRef.current = trigger;
      }
    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="pix4d-page" style={{ backgroundColor: '#000000', color: '#ffffff' }}>

      {/* =========================================================================
          SECTION 1: HERO SCREEN (OFFICIAL 1080P PHOTOGRAMMETRY VIDEO + BOTTOM BRAND)
          ========================================================================= */}
      <section className="indo-sim-hero">
        
        {/* FULLSCREEN BACKGROUND PHOTOGRAMMETRY VIDEO (FROM OFFICIAL SITE) */}
        <div className="indo-sim-hero-video-bg-wrap">
          <video
            ref={heroVideoRef}
            src="/assets/pix4d/pix4d-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/pix4d/BACKGROUND_3D_mesh.jpg"
            className="indo-sim-hero-video-bg"
            style={{ filter: 'contrast(1.08) brightness(1.02) saturate(1.12)' }}
          />
          <div className="indo-sim-hero-video-overlay" />
        </div>

        {/* Ambient Floating Scroll Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="indo-sim-hero-scroll-indicator"
          onClick={() => scrollToSection('capabilities')}
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

        {/* FULL-WIDTH STRETCHED BOTTOM BRAND TEXT: PIX4D */}
        <div 
          className="indo-sim-hero-bottom-brand-container" 
          aria-label="PIX4D"
        >
          <div className="indo-sim-hero-bottom-brand-row">
            {'PIX4D'.split('').map((char, idx) => (
              <span 
                key={idx} 
                ref={(el) => (brandLettersRef.current[idx] = el)}
                className={`indo-sim-bottom-char ${idx >= 3 ? 'is-orange-char' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: 5 CORE PHOTOGRAMMETRY CAPABILITIES (JHALAR SUSPENDED CARDS)
          ========================================================================= */}
      <section id="capabilities" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">AUTHORIZED PARTNER // INDIA</span>
            <h2 className="indo-fly-section-title">Professional Photogrammetry & 3D Reality Capture</h2>
            <p className="indo-fly-section-subtitle">
              Turn drone imagery into survey-grade 2D maps, 3D point clouds, and CAD deliverables. Officially distributed and supported in India by IndoWings.
            </p>

            {/* Action Buttons */}
            <div className="indo-fly-hero-actions">
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo('Pix4D Software Suite')}
                className="indo-fly-primary-btn"
              >
                <span>Request Software Quote</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('suite')}
                className="indo-fly-secondary-btn"
              >
                <span>Explore Software Suite</span>
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
          SECTION 3: COMPLETE SOFTWARE SUITE (PINNED SCROLL SEQUENCE: 4 MODULES)
          ========================================================================= */}
      <section 
        id="suite" 
        ref={suitePinRef} 
        className="pix4d-suite-pinned-section"
      >
        <div className="pix4d-suite-inner">

          {/* Section Head with Module Counter & Clean Subtitle */}
          <div className="indo-fly-section-head" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
              <span className="indo-fly-tag" style={{ margin: 0 }}>SOFTWARE PORTFOLIO</span>
              <span style={{ 
                fontFamily: 'Space Grotesk, monospace', 
                fontSize: '0.75rem', 
                letterSpacing: '0.12em', 
                color: '#ff7a1a', 
                background: 'rgba(255,122,26,0.1)', 
                border: '1px solid rgba(255,122,26,0.25)', 
                padding: '3px 10px', 
                borderRadius: '9999px',
                fontWeight: 700 
              }}>
                STEP {activeModule + 1} / 04
              </span>
            </div>
            <h2 className="indo-fly-section-title" style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', marginBottom: '0.35rem' }}>
              The Complete Pix4D Photogrammetry Suite
            </h2>
            <p className="indo-fly-section-subtitle" style={{ fontSize: '0.95rem', margin: 0 }}>
              Scroll to explore all 4 specialized engines — from desktop photogrammetry to corridor processing, CAD vectorization, and cloud inspection.
            </p>
          </div>

          {/* Interactive Navigation Tabs + Synced Progress Bar */}
          <div className="pix4d-suite-nav-wrapper">
            <div className="pix4d-suite-tabs-bar">
              {SOFTWARE_SUITE.map((mod, idx) => {
                const isActive = activeModule === idx;
                const isPast = activeModule > idx;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleTabClick(idx)}
                    className={`pix4d-suite-tab-btn ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                    title={`Jump to ${mod.name}`}
                  >
                    <span className="pix4d-suite-tab-num">0{idx + 1}</span>
                    <span className="pix4d-suite-tab-name">{mod.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="suiteActiveTabIndicator"
                        className="pix4d-suite-tab-active-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Micro Progress Bar along bottom of tabs */}
            <div className="pix4d-suite-progress-track">
              <div 
                className="pix4d-suite-progress-fill" 
                style={{ width: `${((activeModule + 1) / SOFTWARE_SUITE.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Pinned Viewport Stage for the 4 Slides */}
          <div className="pix4d-suite-slides-stage">
            {SOFTWARE_SUITE.map((mod, idx) => {
              const isActive = activeModule === idx;
              return (
                <div
                  key={mod.id}
                  className={`pix4d-suite-slide ${isActive ? 'is-active' : ''}`}
                  style={{
                    position: idx === 0 ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: isActive ? 1 : 0,
                    transform: isActive 
                      ? 'translateY(0) scale(1)' 
                      : (idx < activeModule ? 'translateY(-20px) scale(0.98)' : 'translateY(20px) scale(0.98)'),
                    transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: isActive ? 'auto' : 'none',
                    visibility: Math.abs(activeModule - idx) <= 1 ? 'visible' : 'hidden'
                  }}
                >
                  <div className="indo-fly-split-row" style={{ margin: 0, alignItems: 'center' }}>
                    
                    {/* Media Mockup Left */}
                    <div className="indo-fly-media-card pix4d-suite-media-box">
                      <div className="pix4d-suite-window-bar">
                        <div className="pix4d-suite-window-dots">
                          <span style={{ background: '#ef4444' }} />
                          <span style={{ background: '#eab308' }} />
                          <span style={{ background: '#22c55e' }} />
                        </div>
                        <span className="pix4d-suite-window-title">{mod.name} Workstation Engine</span>
                      </div>
                      <div className="pix4d-suite-media-wrap">
                        <img
                          src={mod.image}
                          alt={mod.name}
                          className="indo-fly-media-img"
                          draggable="false"
                        />
                      </div>
                    </div>

                    {/* Text Details Right */}
                    <div className="indo-fly-split-text pix4d-suite-text-box">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                        <span className="indo-fly-tag" style={{ margin: 0 }}>{mod.tag}</span>
                      </div>
                      
                      <h3 className="indo-fly-split-title" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.85rem)', marginBottom: '0.65rem' }}>
                        {mod.headline}
                      </h3>
                      
                      <p className="indo-fly-split-desc" style={{ fontSize: '0.92rem', lineHeight: '1.55', marginBottom: '1rem' }}>
                        {mod.desc}
                      </p>

                      <div className="indo-fly-feature-list" style={{ gap: '0.6rem', marginBottom: '1.25rem' }}>
                        {mod.bullets.map((b, i) => (
                          <div key={i} className="indo-fly-feature-item" style={{ fontSize: '0.88rem' }}>
                            <CheckCircle2 size={16} style={{ color: '#ff7a1a', flexShrink: 0 }} />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => onOpenDemo && onOpenDemo(`Pix4D - ${mod.name}`)}
                          className="indo-fly-primary-btn"
                          style={{ padding: '9px 20px', fontSize: '0.88rem' }}
                        >
                          <span>Request {mod.name} Quote</span>
                          <ArrowRight size={15} />
                        </button>

                        <div className="pix4d-suite-scroll-hint">
                          {idx < 3 ? (
                            <>
                              <span>SCROLL FOR NEXT MODULE</span>
                              <ChevronDown size={14} className="pix4d-bounce-hint" />
                            </>
                          ) : (
                            <>
                              <span>SCROLL FOR CASE STUDIES</span>
                              <ChevronDown size={14} className="pix4d-bounce-hint" />
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REAL OPERATIONAL STORIES & CASE STUDIES (FROM WEBSITE)
          ========================================================================= */}
      <section className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">OPERATIONAL CASE STUDIES</span>
            <h2 className="indo-fly-section-title">Proven in the Field Across Indian Projects</h2>
            <p className="indo-fly-section-subtitle">
              Authentic field applications where IndoWings UAV mapping and Pix4D photogrammetry solve complex enterprise surveying challenges.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '2.5rem'
          }}>
            {REAL_INDUSTRY_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="indo-fly-mission-card"
              >
                <div className="indo-fly-mission-media">
                  <img
                    src={story.image}
                    alt={story.title}
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
                    {story.tag}
                  </span>
                </div>

                <div className="indo-fly-mission-body">
                  <h3 className="indo-fly-mission-title">{story.title}</h3>
                  <p className="indo-fly-mission-desc">{story.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: KEY DELIVERABLES & OUTPUTS (3-CARD REALITY CAPTURE SHOWCASE)
          ========================================================================= */}
      <section className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">SURVEY-GRADE OUTPUTS</span>
            <h2 className="indo-fly-section-title">Deliverables Engineered for Surveyors & Engineers</h2>
            <p className="indo-fly-section-subtitle">
              High-fidelity metric results ready for immediate ingestion into GIS, CAD, BIM, and enterprise analytics platforms.
            </p>
          </div>

          <div className="indo-fly-mission-grid">
            
            {/* Output 1: 3D Point Cloud */}
            <div className="indo-fly-mission-card">
              <div className="indo-fly-mission-media">
                <img
                  src="/assets/pix4d/color_point_cloud.jpg"
                  alt="3D Dense Point Cloud"
                  draggable="false"
                />
              </div>
              <div className="indo-fly-mission-body">
                <h3 className="indo-fly-mission-title">Dense 3D Point Cloud</h3>
                <p className="indo-fly-mission-desc">
                  Millions of millimeter-accurate 3D coordinates with natural RGB colorization. Classified by ground, vegetation, and structure classes.
                </p>
                <div className="indo-fly-mission-bullets">
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Export formats: .LAS, .LAZ, .PLY, .XYZ</span>
                  </div>
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Accurate volumetric and elevation slicing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output 2: 2D Orthomosaic */}
            <div className="indo-fly-mission-card">
              <div className="indo-fly-mission-media">
                <img
                  src="/assets/pix4d/classified_point_cloud.jpg"
                  alt="2D Orthomosaic & DSM"
                  draggable="false"
                />
              </div>
              <div className="indo-fly-mission-body">
                <h3 className="indo-fly-mission-title">True Orthomosaic & DSM</h3>
                <p className="indo-fly-mission-desc">
                  Distortion-free, perspective-corrected aerial basemaps with sub-centimeter GSD ground resolution.
                </p>
                <div className="indo-fly-mission-bullets">
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Export formats: GeoTIFF (.tif), .KML</span>
                  </div>
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Includes Digital Surface (DSM) & Terrain (DTM) Models</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output 3: 3D Textured Mesh */}
            <div className="indo-fly-mission-card">
              <div className="indo-fly-mission-media">
                <img
                  src="/assets/pix4d/Raycloud_interface.png"
                  alt="3D Textured Triangle Mesh"
                  draggable="false"
                />
              </div>
              <div className="indo-fly-mission-body">
                <h3 className="indo-fly-mission-title">3D Textured Mesh & CAD Vectors</h3>
                <p className="indo-fly-mission-desc">
                  Photorealistic 3D triangulated reality models for architectural BIM, municipal planning, and CAD vector digitization.
                </p>
                <div className="indo-fly-mission-bullets">
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Export formats: .OBJ, .FBX, .DXF, .DWG</span>
                  </div>
                  <div className="indo-fly-mission-bullet-item">
                    <CheckCircle2 size={14} />
                    <span>Direct import into AutoCAD, Revit & Bentley MicroStation</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LICENSING PLANS THROUGH INDOWINGS
          ========================================================================= */}
      <section id="licensing" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">FLEXIBLE PROCUREMENT</span>
            <h2 className="indo-fly-section-title">Official Licensing & Support Options</h2>
            <p className="indo-fly-section-subtitle">
              Procure genuine Pix4D licenses with local Indian invoicing, GST benefits, and certified deployment training from IndoWings engineers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            marginTop: '2.5rem'
          }}>
            {LICENSING_OPTIONS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0d0f14',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '18px',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
                }}
              >
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#ff7a1a',
                  letterSpacing: '0.1em',
                  marginBottom: '0.85rem'
                }}>
                  {item.badge}
                </span>

                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 0.85rem 0'
                }}>
                  {item.plan}
                </h3>

                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.72)',
                  margin: '0 0 1.75rem 0'
                }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flexGrow: 1 }}>
                  {item.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#ff7a1a" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDemo && onOpenDemo(`Pix4D - ${item.plan}`)}
                  className="indo-fly-secondary-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Request Quote & Invoicing</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SYSTEM SPECIFICATIONS (DARK DEFENSE TABLE)
          ========================================================================= */}
      <section id="specs" className="indo-fly-section">
        <div className="indo-fly-container">

          <div className="indo-fly-section-head">
            <span className="indo-fly-tag">WORKSTATION COMPATIBILITY</span>
            <h2 className="indo-fly-section-title">Hardware System Specifications</h2>
            <p className="indo-fly-section-subtitle">
              Recommended hardware configuration for smooth GPU-accelerated photogrammetric rayCloud processing.
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
            <span className="indo-fly-tag">FREQUENT INQUIRIES</span>
            <h2 className="indo-fly-section-title">Frequently Asked Questions</h2>
            <p className="indo-fly-section-subtitle">
              Answers regarding licensing, RTK/PPK processing, offline deployments, and official support in India.
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
              <span className="indo-fly-tag">START MAPPING WITH PRECISION</span>
              <h2 className="indo-fly-cta-title">Ready to Integrate Pix4D with Your Drone Fleet?</h2>
              <p className="indo-fly-cta-desc">
                Contact our geospatial photogrammetry specialists for official licensing, enterprise trial activations, and custom hardware-software bundles.
              </p>

              <div className="indo-fly-hero-actions" style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  onClick={() => onOpenDemo && onOpenDemo('Pix4D Software Suite')}
                  className="indo-fly-primary-btn"
                >
                  <span>Request Enterprise Demo & Quote</span>
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
