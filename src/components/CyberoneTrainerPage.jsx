import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CyberoneTrainerPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const jhalarSectionRef = useRef(null);
  const jhalarTrackRef = useRef(null);

  // FAQ Accordion State (0 is open by default, -1 is closed)
  const [openFaq, setOpenFaq] = useState(0);

  // ---------------------------------------------------------------------------
  // AUTHENTIC SPECIFICATIONS DATA (Exact match to User Screenshot 2 & IndoWings)
  // ---------------------------------------------------------------------------
  const specRows = [
    { label: 'Overall Length', val: '600 mm' },
    { label: 'UAV Type', val: 'Quadcopter' },
    { label: 'All Up Weight', val: '2.6 K' },
    { label: 'Ideal Flight Time', note: '(Varies with flight condition)', val: '50 minutes*' },
    { label: 'Wind Resistance', val: '43 Km/h' },
    { label: 'Max Speed', val: '43 Km/h' },
    { label: 'Range', note: '(Instrumental Range)', val: '2.5 Km (Line of Sight)' },
    { label: 'Operating Temperature', val: '-10 to 55 deg C' },
    { label: 'Battery Type', val: 'Lithium Swappable Battery' },
    { label: 'Camera', val: 'FPV Camera' },
    { isFull: true, val: 'Also Available in Master Slave Config.' }
  ];

  // ---------------------------------------------------------------------------
  // 6 DETAIL PHOTOS FOR HORIZONTAL LADI / JHALAR REEL (Clean & Minimal)
  // ---------------------------------------------------------------------------
  const jhalarPhotos = [
    {
      id: 'camera',
      num: '01',
      title: 'Camera',
      desc: 'Real-time FPV camera for situational awareness and orientation.',
      img: '/assets/cyberone-trainer/Camera.webp',
      cordLength: 30
    },
    {
      id: 'power',
      num: '02',
      title: 'Power Switch',
      desc: 'Top carbon weave chassis button with integrated LED diagnostics.',
      img: '/assets/cyberone-trainer/Power-Button.webp',
      cordLength: 75
    },
    {
      id: 'lock',
      num: '03',
      title: 'Click -N- Lock',
      desc: 'Precision tool-free arm clamp allowing rapid field stowage & deployment.',
      img: '/assets/cyberone-trainer/Lock-Key.webp',
      cordLength: 20
    },
    {
      id: 'gps',
      num: '04',
      title: 'GPS Module',
      desc: 'High-precision Here3 GNSS guidance puck with active status LEDs.',
      img: '/assets/cyberone-trainer/GPS.webp',
      cordLength: 85
    },
    {
      id: 'battery',
      num: '05',
      title: 'Battery',
      desc: 'Quick slide-and-lock lithium battery rail system for continuous flights.',
      img: '/assets/cyberone-trainer/battery.webp',
      cordLength: 35
    },
    {
      id: 'prop',
      num: '06',
      title: 'Motor & Propeller',
      desc: 'High-torque brushless motor with balanced low-acoustic folding blades.',
      img: '/assets/cyberone-trainer/propaller.webp',
      cordLength: 65
    }
  ];

  // ---------------------------------------------------------------------------
  // IN THE BOX (11 Accessories Packout from live site)
  // ---------------------------------------------------------------------------
  const accessories = [
    { id: 'airframe', name: 'Cyberone Trainer Drone', img: '/assets/cyberone-trainer/trainer-drone.png', isFeatured: true },
    { id: 'props', name: 'Propeller', img: '/assets/cyberone-trainer/propeller.png' },
    { id: 'battery', name: 'Battery', img: '/assets/cyberone-trainer/battery.png' },
    { id: 'charger', name: 'Charger', img: '/assets/cyberone-trainer/battery-charger.png' },
    { id: 'powercable', name: 'Power Cable', img: '/assets/cyberone-trainer/powercable.png' },
    { id: 'connector', name: 'Charger Connector', img: '/assets/cyberone-trainer/chagerconnector.png' },
    { id: 'gimbal', name: 'Payload', img: '/assets/cyberone-trainer/payload.png' },
    { id: 'toolkit', name: 'Tool Kit', img: '/assets/cyberone-trainer/toolkit.png' },
    { id: 'memorycard', name: 'Memory Card', img: '/assets/cyberone-trainer/memorycard.png' },
    { id: 'logbook', name: 'Pilot Log Book', img: '/assets/cyberone-trainer/logbook.png' },
    { id: 'manual', name: 'User Manual', img: '/assets/cyberone-trainer/usermenual.png' }
  ];

  // ---------------------------------------------------------------------------
  // 6 KEY FEATURES ROW (Screenshot 1: Styled in dark defense black)
  // ---------------------------------------------------------------------------
  const sixFeatures = [
    { title: 'Click\n-N- Lock', icon: '/assets/cyberone-trainer/payload-ico.svg' },
    { title: 'Swappable\nBatteries', icon: '/assets/cyberone-trainer/battery-ico.svg' },
    { title: '2 Min Quick\nDeployment Time', icon: '/assets/cyberone-trainer/quick-deploy-ico.svg' },
    { title: 'Near\nSilent Acoustics', icon: '/assets/cyberone-trainer/volume-ico.svg' },
    { title: 'Operational\nFor 6 Hours', icon: '/assets/cyberone-trainer/flight-time-ico.svg' },
    { title: 'Mobile\nTouch Screen GCS', icon: '/assets/cyberone-trainer/drone-controller-ico.svg' }
  ];

  // ---------------------------------------------------------------------------
  // FREQUENTLY ASKED QUESTIONS (Authentic to Cyberone Trainer Drone)
  // ---------------------------------------------------------------------------
  const faqs = [
    {
      q: 'What makes Cyberone Trainer ideal for Remote Pilot Training Organizations (RPTO)?',
      a: 'Engineered specifically for training institutions, Cyberone Trainer combines a high-durability carbon-composite airframe, electronic envelope limiting, and low-maintenance fail-safes designed to safely support intensive multi-sortie training drills.'
    },
    {
      q: 'How does the Master-Slave dual pilot configuration work?',
      a: 'The system links an instructor Ground Control Station (GCS) and a trainee GCS wirelessly. The instructor retains continuous supervisory command and can instantly take over control with a single toggle switch should the trainee lose spatial orientation.'
    },
    {
      q: 'What is the flight endurance and daily operational cycle?',
      a: 'Cyberone Trainer delivers up to 50 minutes of endurance per battery pack. With fast-swap slide-and-lock batteries and multi-bay field chargers, training centers can sustain continuous training schedules for up to 6 operational hours daily.'
    },
    {
      q: 'What camera and avionics are integrated on the drone?',
      a: 'The airframe comes standard with a low-latency FPV navigation camera for direct visual pilot feedback, high-precision Here3 GNSS multi-constellation guidance, and an integrated top carbon-weave power button with real-time telemetry diagnostics.'
    },
    {
      q: 'What accessories are included with the drone?',
      a: 'The complete package includes the Cyberone Trainer airframe, low-noise folding propellers, flight battery, intelligent charger, power cables, connector harnesses, modular training payload interface, pilot toolkit, high-speed memory card, official pilot logbook, and comprehensive user manual.'
    },
    {
      q: 'Can institutions request an on-site flight demonstration?',
      a: 'Yes, IndoWings provides dedicated on-field demonstrations for flight training academies, universities, and defense institutes across India. Click "Request for Demo" below to coordinate with our flight instructors.'
    },
    {
      q: 'Is warranty and technical maintenance support provided?',
      a: 'IndoWings provides comprehensive annual maintenance contracts (AMC), rapid spare parts availability, regular firmware updates, and instructor refresh workshops to ensure zero training downtime.'
    },
    {
      q: 'What are the wind resistance and weather operational parameters?',
      a: 'Cyberone Trainer is engineered for sustained wind resistance up to 43 km/h and operates reliably across temperatures from -10°C to +55°C, providing exceptional stability for student pilots in diverse outdoor field training environments.'
    }
  ];

  // ---------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ORCHESTRATION
  // ---------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. SPECIFICATIONS ENTRANCE
      gsap.fromTo(
        '.indo-trainer-specs-header',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-trainer-specs-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-trainer-dark-table tr',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-trainer-dark-table',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-trainer-specs-drone-img',
        { opacity: 0, scale: 0.92, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-trainer-specs-drone-wrap',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. HORIZONTAL LADI / JHALAR REEL ON SCROLL (PINNED GSAP)
      const section = jhalarSectionRef.current;
      const track = jhalarTrackRef.current;

      if (section && track) {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
          const getScrollDistance = () => {
            const distance = track.scrollWidth - window.innerWidth + 120;
            return Math.max(distance, 600);
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getScrollDistance() * 1.15}`,
              invalidateOnRefresh: true,
              anticipatePin: 1
            }
          });

          tl.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none'
          });
        });
      }

      // 3. IN THE BOX GRID STAGGER
      gsap.fromTo(
        '.indo-trainer-box-item',
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-trainer-box-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. 6 KEY FEATURES ROW STAGGER
      gsap.fromTo(
        '.indo-trainer-dark-card',
        { y: 30, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.indo-trainer-dark-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 5. FAQ ITEMS STAGGER
      gsap.fromTo(
        '.indo-trainer-faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-trainer-faq-list',
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
    <div className="indo-trainer-page" ref={pageRef} style={{ backgroundColor: '#000000', color: '#ffffff' }}>

      {/* =========================================================================
          SECTION 1: HERO SCREEN (Authentic Image from existing website, ZERO TEXT!)
          ========================================================================= */}
      <section className="indo-trainer-hero">

        {/* Fullscreen Background Drone Image with Framer Motion reveal */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="indo-trainer-hero-img-wrap"
        >
          <img
            src="/assets/cyberone-trainer/cyberone-trainer-bg.webp"
            alt="Cyberone Trainer Drone"
            className="indo-trainer-hero-img"
            draggable="false"
          />

          {/* High-contrast subtle defense vignettes & gradient overlays */}
          <div className="indo-trainer-hero-overlay" />
        </motion.div>

        {/* Ambient Floating Scroll Indicator (No Text Clutter) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="indo-trainer-hero-scroll-indicator"
        >
          <span className="indo-trainer-hero-scroll-text">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="indo-trainer-hero-scroll-pill"
          >
            <div className="indo-trainer-hero-scroll-dot" />
          </motion.div>
        </motion.div>

      </section>

      {/* =========================================================================
          SECTION 2: SPECIFICATIONS (Exact Match to User Screenshot 2)
          ========================================================================= */}
      <section className="indo-trainer-specs-section" id="specifications">
        <div className="indo-trainer-specs-container">

          {/* Section Header */}
          <div className="indo-trainer-specs-header">
            <h2 className="indo-trainer-specs-title">
              SPECIFICATIONS
            </h2>
            <p className="indo-trainer-specs-subtitle">
              Absolutely, you've summarized it perfectly. The phrase captures theessence of forward-thinking and proactive behavior.
            </p>
          </div>

          {/* 2-Column Grid: Left Dark Table, Right Drone Perspective Render (50/50) */}
          <div className="indo-trainer-specs-grid">

            {/* Left Column: Dark Table */}
            <div className="indo-trainer-table-box">
              <table className="indo-trainer-dark-table">
                <tbody>
                  {specRows.map((row, idx) => (
                    <tr key={idx}>
                      {row.isFull ? (
                        <td
                          colSpan={2}
                          style={{
                            textAlign: 'center',
                            fontWeight: 700,
                            padding: '1rem',
                            letterSpacing: '0.04em',
                            backgroundColor: '#1a1e22'
                          }}
                        >
                          {row.val}
                        </td>
                      ) : (
                        <>
                          <td style={{ width: '50%' }}>
                            {row.label}
                            {row.note && (
                              <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontWeight: 400 }}>
                                {row.note}
                              </span>
                            )}
                          </td>
                          <td style={{ width: '50%', fontWeight: 600 }}>
                            {row.val}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Column: Drone Perspective Render */}
            <div className="indo-trainer-specs-drone-wrap">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <img
                  src="/assets/cyberone-trainer/cyberone-TRAINER.webp"
                  alt="Cyberone Trainer Drone Perspective Render"
                  className="indo-trainer-specs-drone-img"
                  draggable="false"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "EVERY FACET..." HORIZONTAL PHOTOS REEL IN JHALAR FORM (MINIMAL)
          ========================================================================= */}
      <section
        className="indo-trainer-jhalar-section"
        ref={jhalarSectionRef}
      >
        <div className="indo-trainer-jhalar-inner">

          {/* Minimal Clean Header */}
          <div className="indo-trainer-jhalar-header">
            <h3 className="indo-trainer-jhalar-heading">
              Every facet of Cyberone Trainer Drone, spanning from its outer design to its internal structure, underwent meticulous analysis and refinement to achieve peak performance.
            </h3>
          </div>

          {/* Horizontal Track Container (Pinned and scrubbed by GSAP) */}
          <div className="indo-trainer-jhalar-track-container">
            <div className="indo-trainer-jhalar-track" ref={jhalarTrackRef}>
              {jhalarPhotos.map((item) => (
                <div
                  key={item.id}
                  className="indo-trainer-jhalar-col"
                >
                  {/* Clean Minimal Card */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="indo-trainer-jhalar-card group"
                  >
                    {/* Clean Photo Viewport */}
                    <div className="indo-trainer-jhalar-img-frame">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="indo-trainer-jhalar-img"
                        draggable="false"
                        loading="lazy"
                      />
                    </div>

                    {/* Minimal Information */}
                    <div className="indo-trainer-jhalar-meta">
                      <span className="indo-trainer-jhalar-num">
                        {item.num}
                      </span>
                      <h4 className="indo-trainer-jhalar-card-title">
                        {item.title}
                      </h4>
                      <p className="indo-trainer-jhalar-desc">
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
          SECTION 4: IN THE BOX (11 Accessories Grid)
          ========================================================================= */}
      <section className="indo-trainer-box-section">
        <div className="indo-trainer-box-container">

          <div className="indo-trainer-box-header">
            <h2 className="indo-trainer-box-heading">
              In the Box
            </h2>
            <p className="indo-trainer-box-subheading">
              Discover Our Exclusive Accessory Collection
            </p>
          </div>

          {/* 11 Accessories Packout Grid */}
          <div className="indo-trainer-box-grid">
            {accessories.map((acc) => (
              <motion.div
                key={acc.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className={`indo-trainer-box-item ${acc.isFeatured ? 'featured-drone' : ''}`}
              >
                <div className={`indo-trainer-box-img-wrap ${acc.isFeatured ? 'featured' : ''}`}>
                  <img
                    src={acc.img}
                    alt={acc.name}
                    className={`indo-trainer-box-img ${acc.isFeatured ? 'featured' : ''}`}
                    draggable="false"
                  />
                </div>
                <h4 className={`indo-trainer-box-title ${acc.isFeatured ? 'featured' : ''}`}>
                  {acc.name}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 6 KEY FEATURES ROW
          ========================================================================= */}
      <section className="indo-trainer-dark-features">
        <div className="indo-trainer-dark-container">

          <div className="indo-trainer-dark-header">
            <h3 className="indo-trainer-dark-title">Built for Intensive Training Sorties</h3>
            <p className="indo-trainer-dark-subtitle">
              Engineered for rapid field deployment, high endurance, and student pilot safety.
            </p>
          </div>

          <div className="indo-trainer-dark-grid">
            {sixFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="indo-trainer-dark-card"
              >
                <div className="indo-trainer-dark-icon-wrap">
                  <img
                    src={feat.icon}
                    alt={feat.title.replace('\n', ' ')}
                    className="indo-trainer-dark-img"
                    draggable="false"
                  />
                </div>
                <h4 className="indo-trainer-dark-label">
                  {feat.title}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="indo-trainer-faq-section">
        <div className="indo-trainer-faq-container">

          <div className="indo-trainer-faq-header">
            <h2 className="indo-trainer-faq-title">FAQ's</h2>
            <p className="indo-trainer-faq-subtitle">
              Everything you need to know about the Cyberone Trainer Drone platform, specifications, and training operations.
            </p>
          </div>

          {/* Accordion List */}
          <div className="indo-trainer-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`indo-trainer-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="indo-trainer-faq-btn"
                  >
                    <span className="indo-trainer-faq-q">{faq.q}</span>
                    <span className="indo-trainer-faq-icon">
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
                        className="indo-trainer-faq-answer"
                      >
                        <p style={{ margin: 0 }}>{faq.a}</p>
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
          SECTION 7: REQUEST FOR DEMO CTA SECTION
          ========================================================================= */}
      <section className="indo-trainer-cta-section">
        <div className="indo-trainer-cta-container">
          <h3 className="indo-trainer-cta-title">
            Master The Skies Today, Rule The Future Tomorrow
          </h3>
          <p className="indo-trainer-cta-subtitle">
            Connect with our flight training specialists to schedule an on-site operational demo for your academy or institution.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="indo-lite-request-demo-card"
            onClick={() => {
              if (onOpenDemo) onOpenDemo('Cyberone Trainer Drone');
            }}
          >
            <span className="indo-lite-demo-orange-bar" />
            <span className="indo-lite-demo-btn-text">
              Request for Demo
            </span>
          </motion.button>
        </div>
      </section>

    </div>
  );
}
