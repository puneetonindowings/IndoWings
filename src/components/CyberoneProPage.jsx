import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CyberoneProPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  // Specifications Tab State: 'uav' | 'payload' | 'services'
  const [activeSpecTab, setActiveSpecTab] = useState('uav');

  // FAQ Accordion State (0 is open by default, -1 is closed)
  const [openFaq, setOpenFaq] = useState(0);

  // Section 6: Markets 3-Card Carousel State (0 to 5)
  const [marketIndex, setMarketIndex] = useState(0);
  const [isMarketHovered, setIsMarketHovered] = useState(false);

  useEffect(() => {
    if (isMarketHovered) return;
    const interval = setInterval(() => {
      setMarketIndex(prev => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(interval);
  }, [isMarketHovered]);

  // ---------------------------------------------------------------------------
  // 5 CORE CAPABILITY PILLARS (Authentic from IndoWings Cyberone Pro V2)
  // ---------------------------------------------------------------------------
  const pillars = [
    {
      num: '01',
      icon: '/assets/cyberone-pro/D-N-Surveillance.svg',
      title: 'Day & Night\nSurveillance System',
      desc: 'High-sensitivity dual sensor array providing continuous situational oversight in zero-light and harsh daylight conditions.',
      cordLength: 35
    },
    {
      num: '02',
      icon: '/assets/cyberone-pro/vehicle-person-detection-tracking.svg',
      title: 'Vehicle / Person\nDetection & Tracking',
      desc: 'Edge-AI computer vision algorithms for autonomous identification and real-time locking on vehicular and human targets.',
      cordLength: 85
    },
    {
      num: '03',
      icon: '/assets/cyberone-pro/Surveillance-reconnaissance.svg',
      title: 'Surveillance &\nReconnaissance',
      desc: 'Rapid perimeter scouting and intelligence gathering with secure high-altitude stealth positioning.',
      cordLength: 20
    },
    {
      num: '04',
      icon: '/assets/cyberone-pro/traffic-monitoring-crowd-control.svg',
      title: 'Traffic Monitoring &\nCrowd Control',
      desc: 'High-angle aerial oversight for wide-area traffic flow analytics, bottleneck mitigation, and active assembly monitoring.',
      cordLength: 95
    },
    {
      num: '05',
      icon: '/assets/cyberone-pro/real-time-information-transfer.svg',
      title: 'Real-Time Info Transfer\nvia Secured Network',
      desc: 'Encrypted tactical datalink transmitting low-latency HD video and flight telemetry to field command units.',
      cordLength: 45
    }
  ];

  // ---------------------------------------------------------------------------
  // SPECIFICATIONS DATA (100% Authentic from live cyberonepro_v2.php)
  // ---------------------------------------------------------------------------
  const uavSpecs = [
    { label: 'Class of UAV', val: 'Micro or Small' },
    { label: 'Type of UAV', val: 'Copter type (Quadcopter)' },
    { label: 'Weight', val: 'Less than 6 Kg' },
    { label: 'Max. Take-off Weight', val: 'Less than 6 Kg' },
    { label: 'Take-off Altitude', val: 'More than 2000m (MSL)' },
    { label: 'Dimensions (Unfolded with props)', val: 'Not more than 600 x 750 x 230mm' },
    { label: 'Dimensions (Folded without props)', val: 'Not more than 325 x 250 x 200mm' },
    { label: 'Operational Range', val: '5km and above' },
    { label: 'Flight Time', val: '35 mins or above' },
    { label: 'Maximum Horizontal Speed', val: '15 m/s or above' },
    { label: 'Maximum Wind Resistance', val: '6 m/s or above' },
    { label: 'Obstacle Sensing', val: 'Forward, Backward, Left, Right, Upward, Downward' },
    { label: 'IP Rating', val: 'IP 42 and above' },
    { label: 'Operating Temperature', val: '0°C to 45°C or above' },
    { label: 'GCS Support', val: 'Yes (Laptop / Tablet / GCS with in-built screen)' },
    { label: 'GCS Features', val: 'Mission planning, live video feed, flight telemetry' },
    { label: 'Flight Modes', val: 'Autonomous, Manual (Position hold), Waypoint mission' },
    { label: 'GNSS Support', val: 'Yes (GPS / GLONASS / IRNSS)' },
    { label: 'Charger', val: '01 no.' },
    { label: 'Carry Case', val: '01 (Lightweight strong carry case for drone & systems)' },
    { label: 'Battery System', val: '3 sets or above (Min 7000 mAh, swappable type)' },
    { label: 'Fail-Safe Features', val: 'Return to Home (RTH) on low battery, signal loss, GPS loss' }
  ];

  const payloadSpecs = [
    { label: 'Stabilize System', val: '2-axis mechanical Gimbal or above' },
    { label: 'Integrated Sensor', val: 'RGB sensor and thermal/infrared sensor (combined)' },
    { label: 'Optical Zoom', val: 'RGB- 10x (optical) and above' },
    { label: 'Digital Zoom', val: '4x or above' },
    { label: 'Resolution', val: 'RGB- 4K or above' },
    { label: 'Sensor Size', val: '1/2.3" or better' },
    { label: 'Thermal Sensor Resolution', val: '640 x 512 or better' },
    { label: 'Thermal Sensor Pitch', val: '12μm or better' },
    { label: 'Laser Range Finder', val: 'Yes, Range- 5 to 1000m' },
    { label: 'Object Tracking', val: 'Yes (Person and Vehicle Tracking)' },
    { label: 'Payload Controllable Range', val: 'Tilt: -90° to +30° (or better), Pan: 360° continuous' },
    { label: 'Geotagging & Metadata', val: 'Embedded GPS coordinates, altitude, timestamp' },
    { label: 'Video Transmission Encryption', val: 'AES-128 / AES-256 standard' }
  ];

  const serviceSpecs = [
    { label: 'Turnkey Pilot Training', val: 'Comprehensive operational flight training for defense & institutional pilots' },
    { label: 'Firmware & Autonomy Updates', val: 'Periodic OTA OS improvements, flight envelope optimizations & security patches' },
    { label: 'Warranty & AMC Support', val: 'Comprehensive Annual Maintenance Contracts with rapid spare-parts supply' },
    { label: 'Custom Payload Integration', val: 'Engineering adaptation for specialized third-party sensors and drop systems' },
    { label: 'Flight Mission Advisory', val: 'Dedicated operational consulting for border surveillance & industrial monitoring' }
  ];

  // ---------------------------------------------------------------------------
  // 6 PAYLOAD INTEGRATIONS (For Pinned Horizontal Scroll Reel)
  // ---------------------------------------------------------------------------
  const payloads = [
    {
      id: 'thermal',
      num: '01',
      title: 'Thermal Camera',
      desc: 'High-resolution radiometric thermal imaging for nighttime reconnaissance and heat-signature detection.',
      img: '/assets/cyberone-pro/thermal-camera.png'
    },
    {
      id: 'dropping',
      num: '02',
      title: 'Dropping Payloads',
      desc: 'Precision servo-activated payload drop mechanism for emergency medical kits, life buoys, or tactical supplies.',
      img: '/assets/cyberone-pro/dropping-payloads.png'
    },
    {
      id: 'multispectral',
      num: '03',
      title: 'Multispectral',
      desc: 'Synchronized narrow-band spectral sensors for precision environmental assessment and vegetation stress analytics.',
      img: '/assets/cyberone-pro/multispectral.png'
    },
    {
      id: 'cinemap',
      num: '04',
      title: 'Cinemap',
      desc: 'High-resolution optical mapping camera engineered for distortion-free photogrammetry and 3D orthomosaics.',
      img: '/assets/cyberone-pro/cinemap.png'
    },
    {
      id: 'megaphone',
      num: '05',
      title: 'Megaphone / Loudspeaker',
      desc: 'Long-range acoustic megaphone for clear aerial voice broadcast during search & rescue or crowd management.',
      img: '/assets/cyberone-pro/too-loud.png'
    },
    {
      id: 'spotlight',
      num: '06',
      title: 'Spotlight',
      desc: 'Ultra-bright focusable LED searchlight illuminating low-light ground targets from high tactical altitudes.',
      img: '/assets/cyberone-pro/too-bright.png'
    }
  ];

  // ---------------------------------------------------------------------------
  // 6 SECTOR SOLUTIONS (Impactful Industrial Applications)
  // ---------------------------------------------------------------------------
  const sectorSolutions = [
    {
      title: 'Oil & Gas Pipeline Inspection',
      desc: 'Continuous aerial monitoring of oil & gas corridors, refinery perimeters, and pipeline leak detection.',
      img: '/assets/cyberone-pro/oil-gas.webp'
    },
    {
      title: 'Thermal Power Plant Audits',
      desc: 'Thermal analysis of boilers, cooling towers, and boiler flare stacks without costly operational shutdowns.',
      img: '/assets/cyberone-pro/thermal-power.webp'
    },
    {
      title: 'Mining & Quarry Volumetrics',
      desc: 'High-density topographic contouring, pit volume calculation, and haul road safety auditing.',
      img: '/assets/cyberone-pro/mining.jpg'
    },
    {
      title: 'High-Voltage Power Lines',
      desc: 'Insulator inspection, hot-spot thermal detection, and vegetation encroachment surveys across transmission grids.',
      img: '/assets/cyberone-pro/electricity-pylons.jpg'
    },
    {
      title: 'Renewable Solar & Wind Farms',
      desc: 'Thermographic panel cell defect classification and wind turbine blade structural integrity inspections.',
      img: '/assets/cyberone-pro/electric.jpg'
    },
    {
      title: 'Railway Track & Corridor Security',
      desc: 'Corridor surveillance, track obstruction detection, and high-precision asset cataloging for railway networks.',
      img: '/assets/cyberone-pro/rail.jpg'
    }
  ];

  // ---------------------------------------------------------------------------
  // IN THE BOX (11 Accessories Packout)
  // ---------------------------------------------------------------------------
  const accessories = [
    { id: 'airframe', name: 'Cyberone Pro Drone', img: '/assets/cyberone-pro/max-drone.png', isFeatured: true },
    { id: 'props', name: 'Propeller Set', img: '/assets/cyberone-pro/propeller.png' },
    { id: 'battery', name: 'Flight Battery', img: '/assets/cyberone-pro/battery.png' },
    { id: 'charger', name: 'Smart Charger', img: '/assets/cyberone-pro/battery-charger.png' },
    { id: 'powercable', name: 'Power Cable', img: '/assets/cyberone-pro/powercable.png' },
    { id: 'connector', name: 'Charger Connector', img: '/assets/cyberone-pro/chargerconnector.png' },
    { id: 'payload', name: 'Modular Payload', img: '/assets/cyberone-pro/payloadmax.png' },
    { id: 'toolkit', name: 'Pilot Tool Kit', img: '/assets/cyberone-pro/toolkit.png' },
    { id: 'memorycard', name: 'High-Speed Memory Card', img: '/assets/cyberone-pro/memorycard.png' },
    { id: 'logbook', name: 'Pilot Log Book', img: '/assets/cyberone-pro/logbook.png' },
    { id: 'manual', name: 'User Manual', img: '/assets/cyberone-pro/usermenual.png' }
  ];

  // ---------------------------------------------------------------------------
  // 6 KEY FEATURES ROW (Matching Cyberone Trainer / Lite)
  // ---------------------------------------------------------------------------
  const sixFeatures = [
    { title: 'Click\n-N- Lock', icon: '/assets/cyberone-pro/payload-ico.svg' },
    { title: 'Swappable\nBatteries', icon: '/assets/cyberone-pro/battery-ico.svg' },
    { title: '2 Min Quick\nDeployment Time', icon: '/assets/cyberone-pro/quick-deploy-ico.svg' },
    { title: 'Near\nSilent Acoustics', icon: '/assets/cyberone-pro/volume-ico.svg' },
    { title: 'Operational\nFor 6 Hours', icon: '/assets/cyberone-pro/flight-time-ico.svg' },
    { title: 'Mobile\nTouch Screen GCS', icon: '/assets/cyberone-pro/drone-controller-ico.svg' }
  ];

  // ---------------------------------------------------------------------------
  // FREQUENTLY ASKED QUESTIONS (Authentic from IndoWings Cyberone Pro)
  // ---------------------------------------------------------------------------
  const faqs = [
    {
      q: 'What is the major difference between Cyberone Pro and Cyberone Max?',
      a: 'Dimensions: Cyberone Max (735mm) vs Cyberone Pro (600mm).\nPayload Capacity: Cyberone Max (3kg) vs Cyberone Pro (1.5kg).\nRange: Cyberone Max (15 kms) vs Cyberone Pro (10 kms).'
    },
    {
      q: 'Which one is better on the basis of features: Cyberone Max or Pro?',
      a: 'Both are precision options designed for distinct tactical use cases. Cyberone Pro is optimized for agile multi-mission surveillance and rapid deployment, while Cyberone Max offers heavier payload transport and extended endurance.'
    },
    {
      q: 'How can we know that we are going beyond temperature limits during flight?',
      a: 'The system includes integrated thermal sensors that monitor internal avionics and battery temperatures continuously. Real-time telemetry is transmitted to the Ground Control Station (GCS) screen, alerting the pilot well before operating limits are approached.'
    },
    {
      q: 'How much does a Cyberone Pro drone cost?',
      a: 'For institutional pricing, procurement tenders, and custom payload configurations, please coordinate directly with our team. Click "Request for Demo" below to connect with an IndoWings flight systems specialist.'
    }
  ];

  // ---------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ORCHESTRATION (Identical Quality to Trainer & Lite)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE
      gsap.fromTo(
        '.indo-pro-hero-drone-img',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      // 2. CAPABILITY PILLARS JHALAR / LADI STAGGER
      gsap.fromTo(
        '.indo-pro-jhalar-col',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-pro-jhalar-track',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. SPECIFICATIONS ENTRANCE
      gsap.fromTo(
        '.indo-pro-specs-header',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-pro-specs-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-pro-dark-table tr',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-pro-dark-table',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-pro-specs-drone-img',
        { opacity: 0, scale: 0.92, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-pro-specs-drone-wrap',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. PINNED HORIZONTAL SCROLL REEL FOR PAYLOAD INTEGRATIONS
      const horizontalSection = horizontalSectionRef.current;
      const horizontalTrack = horizontalTrackRef.current;

      if (horizontalSection && horizontalTrack) {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
          const getScrollDistance = () => {
            const distance = horizontalTrack.scrollWidth - window.innerWidth + 120;
            return Math.max(distance, 600);
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: horizontalSection,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getScrollDistance() * 1.15}`,
              invalidateOnRefresh: true,
              anticipatePin: 1
            }
          });

          tl.to(horizontalTrack, {
            x: () => -getScrollDistance(),
            ease: 'none'
          });
        });
      }

      // 5. VIDEO SHOWCASE ENTRANCE
      gsap.fromTo(
        '.indo-pro-video-viewport',
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-pro-video-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 6. SECTOR SOLUTIONS STAGGER
      gsap.fromTo(
        '.indo-pro-sector-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-pro-sectors-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 7. IN THE BOX GRID STAGGER
      gsap.fromTo(
        '.indo-pro-box-item',
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-pro-box-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 8. 6 KEY FEATURES ROW STAGGER
      gsap.fromTo(
        '.indo-pro-dark-card',
        { y: 30, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.indo-pro-dark-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 9. FAQ ITEMS STAGGER
      gsap.fromTo(
        '.indo-pro-faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-pro-faq-list',
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

  const activeSpecsList = activeSpecTab === 'uav'
    ? uavSpecs
    : activeSpecTab === 'payload'
      ? payloadSpecs
      : serviceSpecs;

  return (
    <div className="indo-pro-page" ref={pageRef} style={{ backgroundColor: '#000000', color: '#ffffff' }}>

      {/* =========================================================================
          SECTION 1: HERO SCREEN (Authentic Visual, 100% Fullscreen, ZERO TEXT!)
          ========================================================================= */}
      <section className="indo-pro-hero">

        {/* Fullscreen Background Drone Visual with Framer Motion reveal */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="indo-pro-hero-img-wrap"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-pro-hero-drone-motion"
          >
            <img
              src="/assets/cyberone-pro/cyberonepro4.avif"
              alt="Cyberone Pro Drone"
              className="indo-pro-hero-drone-img"
              draggable="false"
            />
          </motion.div>

          {/* High-contrast subtle defense vignettes & gradient overlays */}
          <div className="indo-pro-hero-overlay" />
        </motion.div>

        {/* Ambient Floating Scroll Indicator (Minimal Pill - Zero Clutter) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="indo-pro-hero-scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-pro-hero-scroll-pill"
          >
            <div className="indo-pro-hero-scroll-dot" />
          </motion.div>
        </motion.div>

      </section>

      {/* =========================================================================
          SECTION 2: 5 CORE MISSION CAPABILITIES (JHALAR / LADI / THREAD SUSPENDED SHOWCASE)
          ========================================================================= */}
      <section className="indo-pro-pillars-section">
        <div className="indo-pro-pillars-container">

          <div className="indo-pro-section-head">
            <span className="indo-pro-tag">TACTICAL ADVANTAGE</span>
            <h2 className="indo-pro-section-title">Core Mission Capabilities</h2>
            <p className="indo-pro-section-subtitle">
              Engineered for superior situational awareness, high-altitude stability, and uninterrupted encrypted data flow.
            </p>
          </div>

          {/* JHALAR / LADI SUSPENDED THREAD PRESENTATION */}
          <div className="indo-pro-jhalar-wrapper">

            {/* Continuous Overhead Guideline Wire / Thread */}
            <div className="indo-pro-jhalar-wire-runner">
              <div className="indo-pro-jhalar-main-thread" />
            </div>

            {/* Suspended Columns Track */}
            <div className="indo-pro-jhalar-track">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="indo-pro-jhalar-col">

                  {/* Top Connector Node Dot on Wire */}
                  <div className="indo-pro-jhalar-node-wrap">
                    <span className="indo-pro-jhalar-node-dot" />
                  </div>

                  {/* Vertical Suspended Cord / Thread of Staggered Length */}
                  <div
                    className="indo-pro-jhalar-vertical-cord"
                    style={{ height: `${pillar.cordLength}px` }}
                  >
                    <span className="indo-pro-vertical-thread-line" />
                  </div>

                  {/* Precision Mechanical Hanger Clip */}
                  <div className="indo-pro-jhalar-clip" />

                  {/* Suspended Card */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="indo-pro-pillar-card"
                  >
                    <div className="indo-pro-pillar-top">
                      <span className="indo-pro-pillar-num">{pillar.num}</span>
                      <div className="indo-pro-pillar-icon-box">
                        <img
                          src={pillar.icon}
                          alt={pillar.title.replace('\n', ' ')}
                          className="indo-pro-pillar-icon"
                          draggable="false"
                        />
                      </div>
                    </div>
                    <h3 className="indo-pro-pillar-title">
                      {pillar.title}
                    </h3>
                    <p className="indo-pro-pillar-desc">
                      {pillar.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SPECIFICATIONS (Exact 50/50 Layout Matching Cyberone Trainer)
          ========================================================================= */}
      <section className="indo-pro-specs-section" id="specifications">
        <div className="indo-pro-specs-container">

          {/* Section Header */}
          <div className="indo-pro-specs-header">
            <h2 className="indo-pro-specs-title">
              SPECIFICATIONS
            </h2>
            <p className="indo-pro-specs-subtitle">
              Absolutely, you've summarized it perfectly. The phrase captures the essence of forward-thinking and proactive behavior.
            </p>

            {/* 3 Interactive Tabs */}
            <div className="indo-pro-specs-tabs">
              <button
                type="button"
                onClick={() => setActiveSpecTab('uav')}
                className={`indo-pro-tab-btn ${activeSpecTab === 'uav' ? 'active' : ''}`}
              >
                <span>UAV Platform</span>
                {activeSpecTab === 'uav' && (
                  <motion.div layoutId="proSpecTab" className="indo-pro-tab-indicator" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSpecTab('payload')}
                className={`indo-pro-tab-btn ${activeSpecTab === 'payload' ? 'active' : ''}`}
              >
                <span>Payload Specs</span>
                {activeSpecTab === 'payload' && (
                  <motion.div layoutId="proSpecTab" className="indo-pro-tab-indicator" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSpecTab('services')}
                className={`indo-pro-tab-btn ${activeSpecTab === 'services' ? 'active' : ''}`}
              >
                <span>Services & Support</span>
                {activeSpecTab === 'services' && (
                  <motion.div layoutId="proSpecTab" className="indo-pro-tab-indicator" />
                )}
              </button>
            </div>
          </div>

          {/* 2-Column Grid: Left Dark Table, Right Drone Perspective Render (50/50) */}
          <div className="indo-pro-specs-grid">

            {/* Left Column: Dark Table */}
            <div className="indo-pro-table-box">
              <table className="indo-pro-dark-table">
                <tbody>
                  {activeSpecsList.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ width: '48%' }}>
                        {row.label}
                      </td>
                      <td style={{ width: '52%', fontWeight: 600 }}>
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Column: Drone Perspective Render (Clean, No Pill Badges) */}
            <div className="indo-pro-specs-drone-wrap">
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <img
                  src="/assets/cyberone-pro/cyberonepro4.avif"
                  alt="Cyberone Pro Drone Perspective Render"
                  className="indo-pro-specs-drone-img"
                  draggable="false"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PAYLOAD INTEGRATIONS - HORIZONTAL PINNED SCROLL REEL
          ========================================================================= */}
      <section
        className="indo-pro-horizontal-section"
        ref={horizontalSectionRef}
      >
        <div className="indo-pro-horizontal-inner">

          {/* Header */}
          <div className="indo-pro-horizontal-header">
            <span className="indo-pro-tag">TACTICAL SENSOR ECOSYSTEM</span>
            <h3 className="indo-pro-horizontal-heading">
              Explore Diverse Tactical Payload Integrations Designed for Multi-Mission Supremacy.
            </h3>
          </div>

          {/* Horizontal Track Container (Pinned and scrubbed by GSAP) */}
          <div className="indo-pro-horizontal-track-container">
            <div className="indo-pro-horizontal-track" ref={horizontalTrackRef}>
              {payloads.map((item) => (
                <div
                  key={item.id}
                  className="indo-pro-horizontal-col"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="indo-pro-horizontal-card group"
                  >
                    {/* Photo Viewport */}
                    <div className="indo-pro-horizontal-img-frame">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="indo-pro-horizontal-img"
                        draggable="false"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="indo-pro-horizontal-meta">
                      <span className="indo-pro-horizontal-num">
                        {item.num}
                      </span>
                      <h4 className="indo-pro-horizontal-card-title">
                        {item.title}
                      </h4>
                      <p className="indo-pro-horizontal-desc">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SLEEK DESIGN VIDEO SHOWCASE (100% FULL-WIDTH EDGE-TO-EDGE)
          ========================================================================= */}
      <section className="indo-pro-video-section">
        <div className="indo-pro-video-header-container">
          <div className="indo-pro-section-head">
            <span className="indo-pro-tag">THE CONCEPTS OF POWER AND PERFORMANCE</span>
            <h2 className="indo-pro-section-title">Sleek Design</h2>
          </div>
        </div>

        {/* 100% Edge-to-Edge Full-Width Video Viewport (Zero Text Overlay) */}
        <div className="indo-pro-video-viewport">
          <video
            src="/assets/cyberone-pro/strick-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="indo-pro-video-player"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="indo-pro-video-overlay" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: MARKETS (3-Card Carousel matching Lite)
          ========================================================================= */}
      <section
        className="indo-lite-markets-carousel-section"
        onMouseEnter={() => setIsMarketHovered(true)}
        onMouseLeave={() => setIsMarketHovered(false)}
      >
        <div className="indo-lite-container">

          <h2 className="indo-lite-markets-title">MARKETS</h2>
          <p className="indo-lite-markets-subtitle">
            Find out how we use our technologies in key locations around the world.
          </p>

          {/* 3-Card Carousel Track */}
          <div className="indo-lite-carousel-container">
            <div
              className="indo-lite-carousel-track"
              style={{
                transform: `translateX(-${marketIndex * (100 / 3)}%)`
              }}
            >
              {[...sectorSolutions, ...sectorSolutions.slice(0, 3)].map((item, idx) => (
                <div key={idx} className="indo-lite-market-card">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="indo-lite-market-card-img"
                    draggable="false"
                  />
                  <div className="indo-lite-market-card-overlay">
                    <div className="indo-lite-market-badge-title">
                      <span className="indo-lite-market-bar" />
                      <h4 className="indo-lite-market-name">{item.title.toUpperCase()}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="indo-lite-carousel-dots">
            {sectorSolutions.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMarketIndex(idx)}
                className={`indo-lite-carousel-dot ${marketIndex === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: IN THE BOX (11 Accessories Grid)
          ========================================================================= */}
      <section className="indo-pro-box-section">
        <div className="indo-pro-box-container">

          <div className="indo-pro-box-header">
            <h2 className="indo-pro-box-heading">
              In the Box
            </h2>
            <p className="indo-pro-box-subheading">
              Discover Our Exclusive Accessory Collection
            </p>
          </div>

          {/* 11 Accessories Packout Grid */}
          <div className="indo-pro-box-grid">
            {accessories.map((acc) => (
              <motion.div
                key={acc.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className={`indo-pro-box-item ${acc.isFeatured ? 'featured-drone' : ''}`}
              >
                <div className={`indo-pro-box-img-wrap ${acc.isFeatured ? 'featured' : ''}`}>
                  <img
                    src={acc.img}
                    alt={acc.name}
                    className={`indo-pro-box-img ${acc.isFeatured ? 'featured' : ''}`}
                    draggable="false"
                  />
                </div>
                <h4 className={`indo-pro-box-title ${acc.isFeatured ? 'featured' : ''}`}>
                  {acc.name}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 6 KEY FEATURES ROW
          ========================================================================= */}
      <section className="indo-pro-dark-features">
        <div className="indo-pro-dark-container">

          <div className="indo-pro-dark-header">
            <h3 className="indo-pro-dark-title">Built for Tactical Mission Sorties</h3>
            <p className="indo-pro-dark-subtitle">
              Engineered for rapid field deployment, high endurance, and harsh-weather operational reliability.
            </p>
          </div>

          <div className="indo-pro-dark-grid">
            {sixFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="indo-pro-dark-card"
              >
                <div className="indo-pro-dark-icon-wrap">
                  <img
                    src={feat.icon}
                    alt={feat.title.replace('\n', ' ')}
                    className="indo-pro-dark-img"
                    draggable="false"
                  />
                </div>
                <h4 className="indo-pro-dark-label">
                  {feat.title}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="indo-pro-faq-section">
        <div className="indo-pro-faq-container">

          <div className="indo-pro-faq-header">
            <h2 className="indo-pro-faq-title">FAQ's</h2>
            <p className="indo-pro-faq-subtitle">
              Everything you need to know about the Cyberone Pro platform, payload options, and operational deployment.
            </p>
          </div>

          {/* Accordion List */}
          <div className="indo-pro-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`indo-pro-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="indo-pro-faq-btn"
                  >
                    <span className="indo-pro-faq-q">{faq.q}</span>
                    <span className="indo-pro-faq-icon">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="indo-pro-faq-answer"
                      >
                        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{faq.a}</p>
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
          SECTION 10: TACTICAL CTA BANNER (Matching Cyberone Max)
          ========================================================================= */}
      <section className="indo-max-cta-section">
        <div className="indo-max-cta-container">
          <div className="indo-max-cta-box">
            <div className="indo-max-cta-content">
              <span className="indo-max-tag">COMMENCE OPERATIONS</span>
              <h2 className="indo-max-cta-title">Ready to Experience Cyberone Pro?</h2>
              <p className="indo-max-cta-desc">
                Deploy advanced multi-mission tactical intelligence, edge-AI tracking, and persistent surveillance across your operations. Connect with our flight specialists for mission analysis and procurement tenders.
              </p>
              
              <div className="indo-max-cta-actions">
                <button 
                  onClick={() => onOpenDemo && onOpenDemo('Cyberone Pro')}
                  className="indo-max-primary-btn"
                >
                  <span>Request for Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="indo-max-cta-ambient" />
          </div>
        </div>
      </section>

    </div>
  );
}
