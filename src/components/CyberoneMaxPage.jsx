import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CyberoneMaxPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

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
  // 5 CORE CAPABILITIES (Authentic from IndoWings Cyberone Max)
  // Presented via Overhead Jhalar / Ladi / Suspended Thread Presentation
  // ---------------------------------------------------------------------------
  const capabilities = [
    {
      num: '01',
      icon: '/assets/cyberone-max/icon-01.svg',
      title: 'Delivery of Multiple Payloads\nat Different Locations',
      desc: 'Engineered for multi-drop logistic sorties, precision tactical drops, and coordinated multi-point deliveries in extreme terrains.',
      cordLength: 35
    },
    {
      num: '02',
      icon: '/assets/cyberone-max/icon-02.svg',
      title: 'BVLOS Operations\nOver Mountains',
      desc: 'Extended Beyond Visual Line of Sight flight envelope with failsafe datalinks for rugged high-altitude alpine missions.',
      cordLength: 85
    },
    {
      num: '03',
      icon: '/assets/cyberone-max/icon-03.svg',
      title: 'Surveillance of Critical Areas\nDriven by Near Silent Acoustics',
      desc: 'Ultra-low acoustic signature rotors for covert surveillance, tactical reconnaissance, and non-intrusive perimeter tracking.',
      cordLength: 20
    },
    {
      num: '04',
      icon: '/assets/cyberone-max/icon-04.svg',
      title: 'Built to Fly High\n(Up to 23,000 ft AMSL)',
      desc: 'High-density propulsion and advanced aerodynamics enabling takeoff at 18,000 ft and operational ceilings up to 23,000 ft.',
      cordLength: 95
    },
    {
      num: '05',
      icon: '/assets/cyberone-max/icon-05.svg',
      title: 'Unprecedented Battery Back-Up\n(Solid State Slide & Lock)',
      desc: 'Next-generation solid-state chemistry offering up to 65 minutes endurance and toolless rapid field swap mechanisms.',
      cordLength: 45
    }
  ];

  // ---------------------------------------------------------------------------
  // SPECIFICATIONS DATA (100% Authentic from live cyberonemax.php)
  // ---------------------------------------------------------------------------
  const maxSpecs = [
    { label: 'Overall Length', val: '800 mm' },
    { label: 'UAV Type', val: 'Quadcopter' },
    { label: 'Weight (Including Battery)', val: '2.8 Kg' },
    { label: 'Max Payload Capacity', val: '2.2 Kg' },
    { label: 'Max Takeoff Weight (MTOW)', val: '5.0 Kg' },
    { label: 'Endurance AMSL (with Payload)', val: '65 minutes*' },
    { label: 'Endurance AMSL (At max launch alt)', val: '45 mins (with Payload) / 38 mins (Max Payload)' },
    { label: 'Wind Resistance', val: '54 Km/h (15 m/s)' },
    { label: 'Max Speed', val: '72 Km/h (20 m/s - Electronically Controlled)' },
    { label: 'Telemetry Range', val: '10 Km (Line of Sight)' },
    { label: 'Video Transmission Range', val: '10 Km (Line of Sight)' },
    { label: 'Port Types on Controller', val: 'HDMI, C-Type x 2, USB Ports x 2' },
    { label: 'Propeller Type', val: 'Foldable Low-Noise Blades' },
    { label: 'GNSS / Positioning', val: 'PPK / RTK Enabled (Compatible)' },
    { label: 'I.O. Function', val: 'H7 Based Onboard Computer, ETH Switch Hub, Exterior UART' },
    { label: 'Max Launch Altitude (AMSL)', val: '18,000 ft.' },
    { label: 'Max Operational Altitude', val: '23,000 ft.' },
    { label: 'Battery Type', val: 'Solid State Slide & Lock Battery' },
    { label: 'Protection Class', val: 'IP 53 Ingress Protection' },
    { label: 'Operating Temperature Limits', val: '-20°C to +55°C' },
    { label: 'BVLOS Control Compatibility', val: 'Yes (Optional)' },
    { label: 'Swarm Capability', val: 'Yes (Optional)' }
  ];

  // ---------------------------------------------------------------------------
  // 6 PAYLOAD INTEGRATIONS (For Pinned Horizontal Scroll Reel)
  // ---------------------------------------------------------------------------
  const payloads = [
    {
      id: 'day-night',
      num: '01',
      title: 'AI Day & Night Camera',
      desc: 'Dual sensor electro-optical and radiometric thermal array with edge-AI target detection and autonomous tracking.',
      img: '/assets/cyberone-max/thermal-camera.png'
    },
    {
      id: 'dropping',
      num: '02',
      title: 'Dropping Payloads',
      desc: 'Heavy-duty servo-controlled multi-release payload mechanism for medical supplies, life buoys, and tactical gear.',
      img: '/assets/cyberone-max/dropping-payloads.png'
    },
    {
      id: 'multispectral',
      num: '03',
      title: 'Multispectral Camera',
      desc: 'Calibrated multi-band narrow spectral sensors for precision environmental assessment and vegetation stress mapping.',
      img: '/assets/cyberone-max/multispectral.png'
    },
    {
      id: 'cinemap',
      num: '04',
      title: 'Cinemap (Mapping Camera)',
      desc: 'High-resolution global-shutter aerial mapping sensor engineered for distortion-free photogrammetry and 3D terrain modeling.',
      img: '/assets/cyberone-max/cinemap.png'
    },
    {
      id: 'too-loud',
      num: '05',
      title: 'Too Loud (Megaphones)',
      desc: 'High-decibel directional acoustic megaphone for clear aerial voice broadcasts during search & rescue and crowd control.',
      img: '/assets/cyberone-max/too-loud.png'
    },
    {
      id: 'too-bright',
      num: '06',
      title: 'Too Bright (Searchlight)',
      desc: 'Ultra-bright high-power tactical LED searchlight illuminating ground objectives from high mission altitudes.',
      img: '/assets/cyberone-max/too-bright.png'
    }
  ];

  // ---------------------------------------------------------------------------
  // 6 SECTOR SOLUTIONS (Verbatim authentic from IndoWings cyberonemax.php)
  // ---------------------------------------------------------------------------
  const sectorSolutions = [
    {
      title: 'Oil & Gas',
      desc: 'We provide drone-based plant and pipeline inspection and monitoring, route surveys for oil.',
      img: '/assets/cyberone-max/oil-gas.webp'
    },
    {
      title: 'Thermal Power',
      desc: 'Thermal power plants are among the most heavily used industrial facilities.',
      img: '/assets/cyberone-max/thermal-power.webp'
    },
    {
      title: 'Mining',
      desc: 'We provide drone-based visual and thermal inspections of chimneys, flares, flu canisters, storage yards, pipelines.',
      img: '/assets/cyberone-max/mining.jpg'
    },
    {
      title: 'Power T&D',
      desc: 'Our services include transmission tower inspection, power and utility inspection.',
      img: '/assets/cyberone-max/electricity-pylons.jpg'
    },
    {
      title: 'Solar Power',
      desc: 'We provide comprehensive drone-based solar module inspection, IR imaging, aerial thermography.',
      img: '/assets/cyberone-max/electric.jpg'
    },
    {
      title: 'Rail Road and Metro',
      desc: 'Indo Wings provides large-scale track surveys for railroads and metros, topographic surveys.',
      img: '/assets/cyberone-max/rail.jpg'
    }
  ];

  // ---------------------------------------------------------------------------
  // IN THE BOX (11 Accessories Packout)
  // ---------------------------------------------------------------------------
  const accessories = [
    { id: 'airframe', name: 'Cyberone Max', img: '/assets/cyberone-max/max.png', isFeatured: true },
    { id: 'props', name: 'Propeller Set', img: '/assets/cyberone-max/propeller.png' },
    { id: 'battery', name: 'Battery', img: '/assets/cyberone-max/battery.png' },
    { id: 'charger', name: 'Charger', img: '/assets/cyberone-max/battery-charger.png' },
    { id: 'powercable', name: 'Power Cable', img: '/assets/cyberone-max/powercable.png' },
    { id: 'connector', name: 'Charger Connector', img: '/assets/cyberone-max/chagerconnector.png' },
    { id: 'payload', name: 'Payload*', img: '/assets/cyberone-max/payloadmax.png' },
    { id: 'toolkit', name: 'Tool Kit', img: '/assets/cyberone-max/toolkit.png' },
    { id: 'memorycard', name: 'Memory Card', img: '/assets/cyberone-max/memorycard.png' },
    { id: 'logbook', name: 'Pilot Log Book', img: '/assets/cyberone-max/logbook.png' },
    { id: 'manual', name: 'User Manual', img: '/assets/cyberone-max/usermenual.png' }
  ];

  // ---------------------------------------------------------------------------
  // 6 KEY FEATURES ROW
  // ---------------------------------------------------------------------------
  const sixFeatures = [
    { title: 'Click\n-N- Lock', desc: 'Tool-free payload swap in seconds', icon: '/assets/cyberone-max/payload-ico.svg' },
    { title: 'Swappable\nBatteries', desc: '"0" Downtime between Missions', icon: '/assets/cyberone-max/battery-ico.svg' },
    { title: '2 Min Quick\nDeployment Time', desc: 'Rapid field deployment & launch', icon: '/assets/cyberone-max/quick-deploy-ico.svg' },
    { title: 'Near\nSilent Acoustics', desc: 'Covert low-noise rotor dynamics', icon: '/assets/cyberone-max/volume-ico.svg' },
    { title: 'Operational\nFor 6 Hours', desc: 'Optional continuous tether system', icon: '/assets/cyberone-max/flight-time-ico.svg' },
    { title: 'Mobile\nTouch Screen GCS', desc: 'Integrated touch display ground station', icon: '/assets/cyberone-max/drone-controller-ico.svg' }
  ];

  // ---------------------------------------------------------------------------
  // FREQUENTLY ASKED QUESTIONS (Authentic from IndoWings Cyberone Max)
  // ---------------------------------------------------------------------------
  const faqs = [
    {
      q: 'What is a surveillance drone?',
      a: 'A surveillance drone is an unmanned aerial vehicle (UAV) fitted with high-resolution cameras and sensors to gather visual, infrared, or telemetry data — used for monitoring, reconnaissance, and situational awareness in both civilian and defense applications.'
    },
    {
      q: 'How Cyber One is different from Agriculture drone?',
      a: 'Cyber One is engineered for high-altitude surveillance, mapping, and heavy payload delivery across rugged terrains. On the other hand, agriculture drones are specialized for liquid spraying and farm efficiency.'
    },
    {
      q: 'What could be the maximum take-off weight capacity?',
      a: 'The maximum take-off weight capacity (MTOW) of Cyberone Max is 5.0 Kg, supporting up to 2.2 Kg of high-performance modular payloads.'
    },
    {
      q: 'What is telemetry range?',
      a: 'Telemetry range refers to the distance over which flight control and telemetry data can be reliably transmitted between the drone and the central monitoring Ground Control Station (10 km line of sight for Cyberone Max).'
    },
    {
      q: 'What is the battery type in Cyber One Max?',
      a: 'Cyberone Max utilizes a state-of-the-art solid-state slide and lock battery system designed for high energy density, extended flight endurance, and swift hot-swap field servicing.'
    },
    {
      q: 'How much does a surveillance drone cost?',
      a: 'Pricing is customized based on procurement specifications, payload configurations (thermal, multispectral, drop systems), and institutional requirements. Connect directly with our sales engineering team via "Request for Demo" below for a detailed tender quote.'
    }
  ];

  // ---------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ORCHESTRATION
  // ---------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE
      gsap.fromTo(
        '.indo-max-hero-drone-img',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      // 2. CAPABILITIES JHALAR / LADI STAGGER
      gsap.fromTo(
        '.indo-max-jhalar-col',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-max-jhalar-track',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. SPECIFICATIONS ENTRANCE
      gsap.fromTo(
        '.indo-max-specs-header',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-max-specs-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-max-dark-table tr',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-max-dark-table',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-max-specs-drone-img',
        { opacity: 0, scale: 0.92, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-max-specs-drone-wrap',
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
        '.indo-max-video-viewport',
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-max-video-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 6. SECTOR SOLUTIONS STAGGER
      gsap.fromTo(
        '.indo-max-sector-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-max-sectors-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 7. IN THE BOX GRID STAGGER
      gsap.fromTo(
        '.indo-max-box-item',
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-max-box-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 8. 6 KEY FEATURES ROW STAGGER
      gsap.fromTo(
        '.indo-max-dark-card',
        { y: 30, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.indo-max-dark-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 9. FAQ ITEMS STAGGER
      gsap.fromTo(
        '.indo-max-faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-max-faq-list',
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
    <div className="indo-max-page" ref={pageRef} style={{ backgroundColor: '#000000', color: '#ffffff' }}>

      {/* =========================================================================
          SECTION 1: HERO SCREEN (Authentic Drone Showcase, 100vh, ZERO TEXT!)
          ========================================================================= */}
      <section className="indo-max-hero">

        {/* Fullscreen Background Drone Visual with Framer Motion reveal */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="indo-max-hero-img-wrap"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-max-hero-drone-motion"
          >
            <img
              src="/assets/cyberone-max/cyberonemax-hero-uhd.jpg"
              alt="Cyberone Max Heavy Payload UAV"
              className="indo-max-hero-drone-img"
              draggable="false"
            />
          </motion.div>

          {/* High-contrast subtle defense vignettes & gradient overlays */}
          <div className="indo-max-hero-overlay" />
        </motion.div>

        {/* Ambient Floating Scroll Indicator (Minimal Pill - Zero Clutter) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="indo-max-hero-scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-max-hero-scroll-pill"
          >
            <div className="indo-max-hero-scroll-dot" />
          </motion.div>
        </motion.div>

      </section>

      {/* =========================================================================
          SECTION 2: 5 CORE MISSION CAPABILITIES (JHALAR / LADI / SUSPENDED THREAD PRESENTATION)
          ========================================================================= */}
      <section className="indo-max-pillars-section">
        <div className="indo-max-pillars-container">

          <div className="indo-max-section-head">
            <span className="indo-max-tag">TACTICAL ADVANTAGE</span>
            <h2 className="indo-max-section-title">No Terrain Too Rugged. No Mission Too High</h2>
            <p className="indo-max-section-subtitle">
              Engineered for extreme high-altitude alpine missions, heavy multi-payload delivery sorties, and persistent surveillance with near silent acoustics.
            </p>
          </div>

          {/* JHALAR / LADI SUSPENDED THREAD PRESENTATION */}
          <div className="indo-max-jhalar-wrapper">

            {/* Continuous Overhead Guideline Wire / Thread */}
            <div className="indo-max-jhalar-wire-runner">
              <div className="indo-max-jhalar-main-thread" />
            </div>

            {/* Suspended Columns Track */}
            <div className="indo-max-jhalar-track">
              {capabilities.map((item, idx) => (
                <div key={idx} className="indo-max-jhalar-col">

                  {/* Top Connector Node Dot on Wire */}
                  <div className="indo-max-jhalar-node-wrap">
                    <span className="indo-max-jhalar-node-dot" />
                  </div>

                  {/* Vertical Suspended Cord / Thread of Staggered Length */}
                  <div
                    className="indo-max-jhalar-vertical-cord"
                    style={{ height: `${item.cordLength}px` }}
                  >
                    <span className="indo-max-vertical-thread-line" />
                  </div>

                  {/* Precision Mechanical Hanger Clip */}
                  <div className="indo-max-jhalar-clip" />

                  {/* Suspended Card */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="indo-max-pillar-card"
                  >
                    <div className="indo-max-pillar-top">
                      <span className="indo-max-pillar-num">{item.num}</span>
                      <div className="indo-max-pillar-icon-box">
                        <img
                          src={item.icon}
                          alt={item.title.replace('\n', ' ')}
                          className="indo-max-pillar-icon"
                          draggable="false"
                        />
                      </div>
                    </div>

                    <h3 className="indo-max-pillar-title">
                      {item.title.split('\n').map((line, lIdx) => (
                        <span key={lIdx} className="block">{line}</span>
                      ))}
                    </h3>

                    <p className="indo-max-pillar-desc">{item.desc}</p>
                  </motion.div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SPECIFICATIONS 50/50 (Dark Table + Floating Drone Render)
          ========================================================================= */}
      <section className="indo-max-specs-section">
        <div className="indo-max-specs-container">

          <div className="indo-max-specs-header">
            <span className="indo-max-tag">PRECISION AVIONICS</span>
            <h2 className="indo-max-specs-title">Under the Hood: Full Specifications</h2>
            <p className="indo-max-specs-subtitle">
              Authentic flight metrics engineered for high-altitude endurance, 54 km/h wind resilience, and 5.0 kg MTOW.
            </p>
          </div>

          <div className="indo-max-specs-grid">

            {/* Left Column: High-contrast authentic specifications table */}
            <div className="indo-max-specs-table-col">
              <div className="indo-max-table-wrapper">
                <table className="indo-max-dark-table">
                  <tbody>
                    {maxSpecs.map((spec, sIdx) => (
                      <tr key={sIdx}>
                        <td className="indo-max-table-label">{spec.label}</td>
                        <td className="indo-max-table-val">{spec.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Floating 3D Drone Visual (Clean, NO Cheap Badges) */}
            <div className="indo-max-specs-drone-col">
              <div className="indo-max-specs-drone-wrap">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="indo-max-specs-floating-box"
                >
                  <img
                    src="/assets/cyberone-max/cyberonemax.png"
                    alt="Cyberone Max System Airframe"
                    className="indo-max-specs-drone-img"
                    draggable="false"
                  />
                </motion.div>
                <div className="indo-max-specs-glow-ring" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PAYLOAD INTEGRATIONS (PINNED HORIZONTAL SCROLL REEL)
          ========================================================================= */}
      <section className="indo-max-horizontal-section" ref={horizontalSectionRef}>
        <div className="indo-max-horizontal-sticky">

          <div className="indo-max-horizontal-header-wrap">
            <div className="indo-max-container">
              <span className="indo-max-tag">MODULAR VERSATILITY</span>
              <h2 className="indo-max-section-title">Payload Integrations</h2>
              <p className="indo-max-section-subtitle">
                Quick-swap toolless modularity. Seamlessly mount day/night tactical cameras, aerial drop systems, multispectral sensors, and high-power acoustic megaphones.
              </p>
            </div>
          </div>

          {/* Horizontal Track Scrubbed via GSAP ScrollTrigger */}
          <div className="indo-max-horizontal-viewport">
            <div className="indo-max-horizontal-track" ref={horizontalTrackRef}>
              {payloads.map((payload) => (
                <div key={payload.id} className="indo-max-payload-slide">
                  <div className="indo-max-payload-card">
                    <div className="indo-max-payload-top">
                      <span className="indo-max-payload-num">{payload.num}</span>
                    </div>

                    <div className="indo-max-payload-img-box">
                      <img
                        src={payload.img}
                        alt={payload.title}
                        className="indo-max-payload-img"
                        draggable="false"
                      />
                    </div>

                    <div className="indo-max-payload-info">
                      <h3 className="indo-max-payload-title">{payload.title}</h3>
                      <p className="indo-max-payload-desc">{payload.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SLEEK DESIGN VIDEO SHOWCASE (100% Full-Width Edge-to-Edge)
          ========================================================================= */}
      <section className="indo-max-video-section">
        <div className="indo-max-video-header">
          <span className="indo-max-tag">AERODYNAMIC EXCELLENCE</span>
          <h2 className="indo-max-video-title">Sleek Design</h2>
          <p className="indo-max-video-subtitle">
            The Concepts of Power and Performance. Carbon-composite precision engineering built for endurance in high-mountain turbulence.
          </p>
        </div>

        {/* 100% Edge-to-Edge Video Showcase (ZERO Text Overlays) */}
        <div className="indo-max-video-viewport">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="indo-max-video-player"
          >
            <source src="/assets/cyberone-max/strick-video.mp4" type="video/mp4" />
          </video>
          <div className="indo-max-video-edge-vignette" />
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
          SECTION 7: IN THE BOX (11 Accessories Packout)
          ========================================================================= */}
      <section className="indo-max-box-section">
        <div className="indo-max-box-container">

          <div className="indo-max-section-head">
            <span className="indo-max-tag">FIELD READY</span>
            <h2 className="indo-max-section-title">In the Box</h2>
            <p className="indo-max-section-subtitle">
              Everything You Need to Fly — Out of the Box. Complete tactical packout for autonomous deployment.
            </p>
          </div>

          <div className="indo-max-box-grid">
            {accessories.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={`indo-max-box-item ${item.isFeatured ? 'is-featured' : ''}`}
              >
                <div className="indo-max-box-img-wrap">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="indo-max-box-img"
                    draggable="false"
                  />
                </div>
                <h4 className="indo-max-box-name">{item.name}</h4>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 6 KEY FEATURES ROW
          ========================================================================= */}
      <section className="indo-max-dark-section">
        <div className="indo-max-dark-container">

          <div className="indo-max-dark-grid">
            {sixFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.25)' }}
                transition={{ duration: 0.25 }}
                className="indo-max-dark-card"
              >
                <div className="indo-max-dark-icon-wrap">
                  <img
                    src={feat.icon}
                    alt={feat.title.replace('\n', ' ')}
                    className="indo-max-dark-icon"
                    draggable="false"
                  />
                </div>

                <h3 className="indo-max-dark-card-title">
                  {feat.title.split('\n').map((line, lIdx) => (
                    <span key={lIdx} className="block">{line}</span>
                  ))}
                </h3>

                <p className="indo-max-dark-card-desc">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (Authentic Accordion)
          ========================================================================= */}
      <section className="indo-max-faq-section">
        <div className="indo-max-faq-container">

          <div className="indo-max-section-head">
            <span className="indo-max-tag">KNOWLEDGE BASE</span>
            <h2 className="indo-max-section-title">FAQ's</h2>
            <p className="indo-max-section-subtitle">
              Key Questions Answered for Cyberone Max operations and technical architecture.
            </p>
          </div>

          <div className="indo-max-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`indo-max-faq-item ${isOpen ? 'is-active' : ''}`}
                >
                  <button
                    className="indo-max-faq-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="indo-max-faq-question">{faq.q}</span>
                    <span className="indo-max-faq-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="indo-max-faq-answer-wrap"
                      >
                        <p className="indo-max-faq-answer">{faq.a}</p>
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
          SECTION 10: TACTICAL CTA BANNER
          ========================================================================= */}
      <section className="indo-max-cta-section">
        <div className="indo-max-cta-container">
          <div className="indo-max-cta-box">
            <div className="indo-max-cta-content">
              <span className="indo-max-tag">COMMENCE OPERATIONS</span>
              <h2 className="indo-max-cta-title">Ready to Experience Cyberone Max?</h2>
              <p className="indo-max-cta-desc">
                Deploy high-altitude payload delivery and persistent surveillance across your operations. Connect with our flight systems engineers for mission analysis and procurement tenders.
              </p>

              <div className="indo-max-cta-actions">
                <button
                  onClick={() => onOpenDemo && onOpenDemo('Cyberone Max')}
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
