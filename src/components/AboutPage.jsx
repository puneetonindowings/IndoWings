import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Shield,
  Target,
  Radio,
  Cpu,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 1. 6-STAGE EVOLUTION TIMELINE DATA (AUTHENTIC MILESTONES UP TO 2026)
// ---------------------------------------------------------------------------
const TIMELINE_DATA = [
  {
    year: '2020',
    tag: 'THE GENESIS',
    title: 'Founding IndoWings in Noida',
    desc: 'Paras Jain recognized the vast untapped potential of unmanned aerial robotics in India. Founded IndoWings Pvt Ltd. to eliminate foreign dependence and lead national self-reliance in aerospace engineering.',
    stat: 'ESTABLISHED · NOIDA HQ'
  },
  {
    year: '2021',
    tag: 'INDIGENOUS R&D',
    title: 'Carbon-Composite Airframes & Avionics',
    desc: 'Invested heavily in in-house composite autoclaves, multi-rotor aerodynamics, and proprietary flight avionics capable of surviving sub-zero Himalayan altitudes and high-wind border zones.',
    stat: '10,000+ SQ. FT. PRECISION COMPLEX'
  },
  {
    year: '2022',
    tag: 'REGULATORY COMPLIANCE',
    title: 'DGCA Type Certification & Cyberone Launch',
    desc: 'Secured official Type Certification from the Directorate General of Civil Aviation (DGCA) and launched the flagship Cyberone tactical drone series for defense surveillance and mining volumetrics.',
    stat: 'DGCA TYPE CERTIFIED'
  },
  {
    year: '2023',
    tag: 'DEFENSE EXPANSION & C-UAS',
    title: 'Anti-Drone Defense & Pix4D Partnership',
    desc: 'Unveiled SKYctrl intelligent counter-drone RF interception systems and became official authorized partners for Pix4D photogrammetry suite to bridge drone imagery to survey CAD deliverables.',
    stat: 'DEFENSE & C-UAS DEPLOYED'
  },
  {
    year: '2024',
    tag: 'AUTONOMY & DEEP-TECH',
    title: 'Dual-Hub Expansion & Bengaluru Lab',
    desc: 'Expanded deep-tech operations with a dedicated Autonomy & AI R&D Center in Bengaluru, engineering encrypted radio datalinks, obstacle-avoidance edge AI, and IndoFly GCS ground station software.',
    stat: 'DUAL-HUB DOMAIN LEADER'
  },
  {
    year: '2026',
    tag: 'SOVEREIGN SUPREMACY',
    title: 'Autonomous Swarming & Border Dominance',
    desc: 'Scaling indigenous autonomous drone swarms, satellite-denied navigation systems, and AI-driven defense counter-measures to cement India’s complete sovereign airspace dominance.',
    stat: 'NATIONWIDE DEFENSE SHIELD'
  }
];

// ---------------------------------------------------------------------------
// 2. INTERACTIVE 3 PILLARS DATA (WITH LIVE ASSETS & SPECS)
// ---------------------------------------------------------------------------
const CAPABILITIES_DATA = [
  {
    id: 'tactical',
    num: '01',
    tag: 'SOVEREIGN DEFENSE',
    title: 'Autonomous UAV Airframes',
    desc: 'Military-grade composite multi-rotor and hybrid VTOL platforms engineered for high-altitude border security, tactical surveillance, and zero-fail defense missions.',
    image: '/assets/landing-products/cyberone-max.webp',
    badge: 'TACTICAL FLAGSHIP',
    specs: [
      { val: '70+ MINS', lbl: 'Max Endurance' },
      { val: '15 KM', lbl: 'Encrypted Link' },
      { val: '12 M/S', lbl: 'Wind Resistance' }
    ]
  },
  {
    id: 'survey',
    num: '02',
    tag: 'METRIC INTELLIGENCE',
    title: 'Sub-Centimeter Photogrammetry',
    desc: 'Enterprise photogrammetry and CAD vector drafting powered by PIX4Dmapper and PIX4Dmatic for mining volumetrics, cadastral boundaries, and highway corridor mapping.',
    image: '/assets/pix4d/Raycloud_interface.png',
    badge: 'AUTHORIZED PIX4D PARTNER',
    specs: [
      { val: 'SUB-3CM', lbl: 'Metric Accuracy' },
      { val: '2D & 3D', lbl: 'Point Cloud / CAD' },
      { val: 'RTK / PPK', lbl: 'Zero GCP Geotag' }
    ]
  },
  {
    id: 'cuas',
    num: '03',
    tag: 'TACTICAL COUNTER-UAS',
    title: 'SKYctrl Anti-Drone Systems',
    desc: 'Ingenious RF spectrum scanning, automatic multi-target drone classification, and directional tactical jamming to neutralize rogue unauthorized drones in restricted airspace.',
    image: '/assets/landing-products/cyberone-pro.webp',
    badge: 'AIRSPACE PROTECTION',
    specs: [
      { val: '360° RF', lbl: 'Spectrum Scan' },
      { val: '<2 SEC', lbl: 'Threat Lock' },
      { val: 'MULTI-BAND', lbl: 'Jamming Defense' }
    ]
  }
];

// ---------------------------------------------------------------------------
// 3. FOUNDER PERSPECTIVES DATA (EXACT AUTHENTIC WEBSITE CONTENT)
// ---------------------------------------------------------------------------
const FOUNDER_PERSPECTIVES = [
  {
    id: 'conviction',
    label: 'The Founding Conviction',
    headline: 'Transforming Indian Skies to Indigenous Sovereignty',
    p1: 'Paras Jain, a visionary entrepreneur, angel investor, and expert in emerging technologies, made significant strides in the aerospace world through his innovative venture, Indo Wings Pvt Ltd. As the Founder and CEO of the company, he has demonstrated unwavering dedication to transforming the drone industry.',
    p2: 'Recognizing that the transformative impact of drones and unmanned aerial vehicles (UAVs) was vastly untapped across Indian defense, infrastructure, agriculture, and logistics, he decided to create Indo Wings Pvt Ltd. in 2020.',
    quote: 'Drones are no longer just flying cameras — they are sovereign aerial intelligence assets shaping the security and industrial infrastructure of modern nations.'
  },
  {
    id: 'deeptech',
    label: 'Emerging Tech & Angel Investing',
    headline: 'Championing AI, Robotics & Early-Stage Innovation',
    p1: 'Apart from Indo Wings Pvt Ltd., Paras Jain\'s entrepreneurial spirit led him to invest in numerous startups and emerging technologies. As an angel investor, he seeks out promising ventures that align with his vision for a technologically advanced future.',
    p2: 'As an ardent advocate of emerging technologies, Paras actively promotes the adoption of artificial intelligence, machine learning, and advanced robotics to disrupt conventional processes and foster societal advancement.',
    quote: 'Building deep-tech in India requires patience, uncompromising engineering standards, and belief in homegrown talent.'
  },
  {
    id: 'future',
    label: 'The Mission Ahead',
    headline: 'Leading the Future of Autonomous Defense',
    p1: 'With Paras Jain\'s visionary leadership, Indo Wings Pvt Ltd. is committed to shaping the future of drone technology and making a positive impact on industries and communities worldwide.',
    p2: 'Under his guidance, IndoWings continues to pioneer dual manufacturing and deep-tech autonomy labs, serving critical B2B and B2G missions with zero-failure reliability.',
    quote: 'Our goal is simple: whenever high-stakes aerial intelligence is needed, India looks to sovereign, battle-ready IndoWings technology.'
  }
];

// ---------------------------------------------------------------------------
// 4. DUAL STRATEGIC HUBS DATA (NO // SLASHES)
// ---------------------------------------------------------------------------
const HUBS_DATA = [
  {
    id: 'noida',
    buttonLabel: '01 NOIDA CORPORATE HQ',
    name: 'Noida Corporate Office & Manufacturing Facility',
    tag: 'OFFICIAL HEADQUARTERS',
    address: 'A-21, Sector-60, Noida, Gautam Buddha Nagar, (U.P.) 201301, India',
    phone: '1800 572 7363',
    email: 'connect@indowings.com',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
    desc: 'Official IndoWings corporate headquarters housing executive leadership, indigenous drone research, precision aerospace assembly, and DGCA type-certified delivery operations.',
    mapEmbed: 'https://maps.google.com/maps?q=Indo%20Wings%20Pvt%20Ltd%2C%20A-21%2C%20Sector-60%2C%20Noida%2C%20Uttar%20Pradesh%20201301&t=m&z=15&output=embed&iwloc=near',
    mapLink: 'https://maps.google.com/?q=Indo+Wings+Pvt+Ltd,+A-21,+Sector-60,+Noida,+Uttar+Pradesh+201301'
  },
  {
    id: 'bengaluru',
    buttonLabel: '02 BENGALURU AUTONOMY LAB',
    name: 'Bengaluru Autonomy & Avionics Lab',
    tag: 'DEEP-TECH R&D CENTER',
    address: '#15, State Bank of India Road, Off Museum Road, Bengaluru – 560001, Karnataka, India',
    phone: '1800 572 7363',
    email: 'connect@indowings.com',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
    desc: 'Specialized deep-tech software and autonomy laboratory engineering autonomous flight navigation AI, encrypted datalinks, IndoFly GCS ground station software, and RF anti-drone systems.',
    mapEmbed: 'https://maps.google.com/maps?q=15%2C%20State%20Bank%20of%20India%20Road%2C%20Off%20Museum%20Road%2C%20Bengaluru%2C%20Karnataka%20560001&t=m&z=15&output=embed&iwloc=near',
    mapLink: 'https://maps.google.com/?q=15,+State+Bank+of+India+Road,+Off+Museum+Road,+Bengaluru,+Karnataka+560001'
  }
];

// ---------------------------------------------------------------------------
// 5. OFFICIAL ACCREDITATIONS (FOR SINGLE-LINE CONTINUOUS INFINITE TICKER)
// ---------------------------------------------------------------------------
const ACCREDITATIONS = [
  {
    id: 'dgca',
    title: 'DGCA Type Certified',
    sub: 'Govt. of India Approved',
    img: '/assets/about/cer.png'
  },
  {
    id: 'iso',
    title: 'ISO 9001:2015',
    sub: 'Aerospace Quality Standards',
    img: '/assets/about/cer1.svg'
  },
  {
    id: 'gptw',
    title: 'Great Place to Work®',
    sub: 'Certified Workplace Culture',
    img: '/assets/about/great-place-to-work.png'
  },
  {
    id: 'make-in-india',
    title: 'Make in India',
    sub: 'Defense Autonomy Champion',
    img: '/assets/about/cer.png'
  }
];

export default function AboutPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const heroVideoRef = useRef(null);
  const brandLettersRef = useRef([]);
  const manifestoRef = useRef(null);

  // 1. TIMELINE PINNED SEQUENCE REFS & STATE
  const timelinePinRef = useRef(null);
  const timelineTriggerRef = useRef(null);
  const activeTimelineRef = useRef(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  // 2. CAPABILITIES PINNED SEQUENCE REFS & STATE
  const capPinRef = useRef(null);
  const capTriggerRef = useRef(null);
  const activeCapRef = useRef(0);
  const [activeCapability, setActiveCapability] = useState(0);

  // 3. FOUNDER PINNED SEQUENCE REFS & STATE
  const founderPinRef = useRef(null);
  const founderTriggerRef = useRef(null);
  const activeFounderRef = useRef(0);
  const [activeFounderTab, setActiveFounderTab] = useState(0);

  // 4. DUAL HUBS PINNED SEQUENCE REFS & STATE
  const hubsPinRef = useRef(null);
  const hubsTriggerRef = useRef(null);
  const activeHubRef = useRef(0);
  const [activeHub, setActiveHub] = useState(0);

  // Triple array for seamless infinite marquee loop
  const loopAccreditations = [...ACCREDITATIONS, ...ACCREDITATIONS, ...ACCREDITATIONS];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Direct Tab Click Helpers that scroll to the exact pinned milestone offset
  const handleTimelineClick = (idx) => {
    setActiveTimeline(idx);
    activeTimelineRef.current = idx;
    if (timelineTriggerRef.current) {
      const trigger = timelineTriggerRef.current;
      const targetP = (idx + 0.35) / TIMELINE_DATA.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleCapabilityClick = (idx) => {
    setActiveCapability(idx);
    activeCapRef.current = idx;
    if (capTriggerRef.current) {
      const trigger = capTriggerRef.current;
      const targetP = (idx + 0.35) / CAPABILITIES_DATA.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleFounderTabClick = (idx) => {
    setActiveFounderTab(idx);
    activeFounderRef.current = idx;
    if (founderTriggerRef.current) {
      const trigger = founderTriggerRef.current;
      const targetP = (idx + 0.35) / FOUNDER_PERSPECTIVES.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleHubClick = (idx) => {
    setActiveHub(idx);
    activeHubRef.current = idx;
    if (hubsTriggerRef.current) {
      const trigger = hubsTriggerRef.current;
      const targetP = (idx + 0.35) / HUBS_DATA.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP SCROLLTRIGGER PINNED SEQUENCES
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO VIDEO: Subtle scale-down cinematic entrance
      if (heroVideoRef.current) {
        gsap.fromTo(
          heroVideoRef.current,
          { scale: 1.15, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
        );
      }

      // 2. HERO BOTTOM LETTERS: Staggered reveal matching Hero.jsx
      const validChars = brandLettersRef.current.filter(Boolean);
      if (validChars.length > 0) {
        gsap.fromTo(
          validChars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.04,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      // 3. SECTION 2: PARALLAX SCRUB ON HANGAR BACKGROUND
      if (manifestoRef.current) {
        gsap.fromTo(
          '.about-manifesto-bg-img',
          { y: -30, scale: 1.08 },
          {
            y: 30,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }

      // 4. MANIFESTO HEADLINE & METRICS REVEAL
      gsap.fromTo(
        '.about-manifesto-anim',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-manifesto-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.about-metric-block',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-metrics-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // =======================================================================
      // 5. PINNED SEQUENCE 1: EVOLUTION TIMELINE (2020 -> 2026)
      // When scrolling down, section pins in place, stepping through all 6 years.
      // Only after reaching 2026 and scrolling past does it unpin!
      // =======================================================================
      const tlEl = timelinePinRef.current;
      if (tlEl) {
        const trigger = ScrollTrigger.create({
          trigger: tlEl,
          start: 'top top',
          end: '+=1600',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const scrubP = Math.min(0.999, p / 0.92);
            const newIdx = Math.min(
              TIMELINE_DATA.length - 1,
              Math.floor(scrubP * TIMELINE_DATA.length)
            );
            if (newIdx !== activeTimelineRef.current) {
              activeTimelineRef.current = newIdx;
              setActiveTimeline(newIdx);
            }
          }
        });
        timelineTriggerRef.current = trigger;
      }

      // =======================================================================
      // 6. PINNED SEQUENCE 2: THREE PILLARS OF AEROSPACE CAPABILITY
      // Pins in place and scrubs through 01 -> 02 -> 03 before unpinning.
      // =======================================================================
      const capEl = capPinRef.current;
      if (capEl) {
        const trigger = ScrollTrigger.create({
          trigger: capEl,
          start: 'top top',
          end: '+=1500',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const scrubP = Math.min(0.999, p / 0.92);
            const newIdx = Math.min(
              CAPABILITIES_DATA.length - 1,
              Math.floor(scrubP * CAPABILITIES_DATA.length)
            );
            if (newIdx !== activeCapRef.current) {
              activeCapRef.current = newIdx;
              setActiveCapability(newIdx);
            }
          }
        });
        capTriggerRef.current = trigger;
      }

      // =======================================================================
      // 7. PINNED SEQUENCE 3: FOUNDER PERSPECTIVES (PARAS JAIN)
      // Pins in place and scrubs through 3 leadership perspectives before unpinning.
      // =======================================================================
      const founderEl = founderPinRef.current;
      if (founderEl) {
        const trigger = ScrollTrigger.create({
          trigger: founderEl,
          start: 'top top',
          end: '+=1500',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const scrubP = Math.min(0.999, p / 0.92);
            const newIdx = Math.min(
              FOUNDER_PERSPECTIVES.length - 1,
              Math.floor(scrubP * FOUNDER_PERSPECTIVES.length)
            );
            if (newIdx !== activeFounderRef.current) {
              activeFounderRef.current = newIdx;
              setActiveFounderTab(newIdx);
            }
          }
        });
        founderTriggerRef.current = trigger;
      }

      // =======================================================================
      // 8. PINNED SEQUENCE 4: DUAL STRATEGIC OPERATING HUBS
      // Pins in place and scrubs through 01 Noida -> 02 Bengaluru before unpinning.
      // =======================================================================
      const hubsEl = hubsPinRef.current;
      if (hubsEl) {
        const trigger = ScrollTrigger.create({
          trigger: hubsEl,
          start: 'top top',
          end: '+=1200',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const scrubP = Math.min(0.999, p / 0.92);
            const newIdx = Math.min(
              HUBS_DATA.length - 1,
              Math.floor(scrubP * HUBS_DATA.length)
            );
            if (newIdx !== activeHubRef.current) {
              activeHubRef.current = newIdx;
              setActiveHub(newIdx);
            }
          }
        });
        hubsTriggerRef.current = trigger;
      }

      // 9. CLOSING BANNER REVEAL
      gsap.fromTo(
        '.about-banner-card',
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-banner-card',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="about-page-wrapper">

      {/* =========================================================================
          SECTION 1: HERO SCREEN (CINEMATIC VIDEO + BOTTOM "INDOWINGS" ONLY)
          ========================================================================= */}
      <section className="about-hero-section">
        
        {/* Fullscreen Video Background */}
        <div className="about-hero-video-wrap">
          <video
            ref={heroVideoRef}
            src="/assets/indo-hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/indo-hangar-manifesto.jpg"
            className="about-hero-video"
          />
          <div className="about-hero-overlay" />
        </div>

        {/* Minimal Ambient Floating Scroll Pill */}
        <div 
          onClick={() => scrollToSection('manifesto')}
          style={{
            position: 'absolute',
            bottom: '18vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Scroll Down"
        >
          <div style={{
            width: '26px',
            height: '42px',
            borderRadius: '9999px',
            border: '2px solid rgba(255,255,255,0.45)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '6px'
          }}>
            <div style={{
              width: '5px',
              height: '9px',
              borderRadius: '9999px',
              background: '#ff7a1a',
              animation: 'aboutPillBounce 1.8s ease-in-out infinite'
            }} />
          </div>
        </div>

        {/* FULL-WIDTH STRETCHED BOTTOM BRAND: INDOWINGS (EXACT REPLICA OF HERO.JSX) */}
        <div className="about-hero-bottom-brand" aria-label="INDOWINGS">
          <div className="about-brand-row">
            {'INDOWINGS'.split('').map((char, idx) => (
              <span 
                key={idx} 
                ref={(el) => (brandLettersRef.current[idx] = el)}
                className={`about-brand-char ${idx >= 4 ? 'is-orange' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: CINEMATIC MANIFESTO (PARALLAX HANGAR VISUAL + ASYMMETRIC METRICS)
          ========================================================================= */}
      <section id="manifesto" ref={manifestoRef} className="about-manifesto-section">
        
        {/* Parallax Hangar Background Image */}
        <div className="about-manifesto-bg-wrap">
          <img
            src="/assets/indo-hangar-manifesto.jpg"
            alt="IndoWings Defense Hangar"
            className="about-manifesto-bg-img"
            draggable="false"
          />
          <div className="about-manifesto-overlay" />
        </div>

        <div className="about-manifesto-container">
          <div className="about-manifesto-grid">
            
            {/* Left: Asymmetric Editorial Block */}
            <div>
              <span className="about-eyebrow about-manifesto-anim">
                OUR MISSION · SINCE 2020
              </span>
              <h2 className="about-manifesto-big about-manifesto-anim">
                We build autonomous systems for the missions that matter most.
              </h2>
              <p className="about-manifesto-body about-manifesto-anim">
                Welcome to Indo Wings Pvt Ltd. — India’s fastest-growing drone and anti-drone manufacturing company with a strong presence in the B2B and B2G domains. For the past four years, we have been at the forefront of drone technology, delivering cutting-edge solutions that redefine possibilities across defense and commercial industries.
              </p>
            </div>

            {/* Right: High-Contrast Metrics Blocks */}
            <div className="about-metrics-grid">
              
              <div className="about-metric-block">
                <div className="about-metric-num">2020</div>
                <div className="about-metric-label">Year Established</div>
              </div>

              <div className="about-metric-block">
                <div className="about-metric-num is-orange">100%</div>
                <div className="about-metric-label">Indigenous Design</div>
              </div>

              <div className="about-metric-block">
                <div className="about-metric-num">DGCA</div>
                <div className="about-metric-label">Type Certified</div>
              </div>

              <div className="about-metric-block">
                <div className="about-metric-num">B2B / B2G</div>
                <div className="about-metric-label">Defense & Enterprise</div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: GSAP PINNED EVOLUTION TIMELINE (SCROLL 2020 ➔ 2026 THEN UNPIN)
          ========================================================================= */}
      <section 
        id="timeline"
        ref={timelinePinRef} 
        className="about-pinned-section" 
        style={{ background: '#050608', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="about-pinned-inner">

          <div style={{ textAlign: 'center', marginBottom: 'clamp(0.85rem, 1.8vh, 1.5rem)' }}>
            <span className="about-eyebrow" style={{ marginBottom: '0.25rem' }}>CHRONOLOGY · 2020 TO 2026</span>
            <h2 className="about-section-title">
              The Evolution of IndoWings
            </h2>
          </div>

          {/* Interactive / Scroll-Driven Year Selector Track */}
          <div className="about-timeline-nav">
            <div className="about-timeline-line" />
            <div 
              className="about-timeline-fill"
              style={{ width: `${(activeTimeline / (TIMELINE_DATA.length - 1)) * 100}%` }}
            />
            {TIMELINE_DATA.map((t, idx) => (
              <button
                key={t.year}
                type="button"
                onClick={() => handleTimelineClick(idx)}
                className={`about-timeline-step-btn ${activeTimeline === idx ? 'is-active' : ''}`}
                title={`Explore ${t.year} Milestone`}
              >
                <span className="about-timeline-btn-dot" />
                {t.year}
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={TIMELINE_DATA[activeTimeline].year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="about-timeline-card"
            >
              <span className="about-timeline-card-tag">
                {TIMELINE_DATA[activeTimeline].tag} · {TIMELINE_DATA[activeTimeline].year}
              </span>
              <h3 className="about-timeline-card-title">
                {TIMELINE_DATA[activeTimeline].title}
              </h3>
              <p className="about-timeline-card-desc">
                {TIMELINE_DATA[activeTimeline].desc}
              </p>

              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', color: '#ff7a1a', fontWeight: 700 }}>
                  {TIMELINE_DATA[activeTimeline].stat}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono, monospace)' }}>
                  STAGE 0{activeTimeline + 1} OF 0{TIMELINE_DATA.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: GSAP PINNED CAPABILITIES (SCROLL 01 ➔ 03 THEN UNPIN)
          ========================================================================= */}
      <section 
        id="capabilities"
        ref={capPinRef} 
        className="about-pinned-section" 
        style={{ background: '#07080b', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="about-pinned-inner">

          <div style={{ marginBottom: 'clamp(0.85rem, 1.8vh, 1.5rem)' }}>
            <span className="about-eyebrow" style={{ marginBottom: '0.25rem' }}>PORTFOLIO MATRIX</span>
            <h2 className="about-section-title">
              Three Pillars of Aerospace Capability
            </h2>
          </div>

          <div className="about-cap-interactive-grid">
            
            {/* Left: 3 Selectable Module Tabs */}
            <div className="about-cap-tabs-col">
              {CAPABILITIES_DATA.map((cap, idx) => (
                <div
                  key={cap.id}
                  onClick={() => handleCapabilityClick(idx)}
                  className={`about-cap-tab-card ${activeCapability === idx ? 'is-active' : ''}`}
                >
                  <div className="about-cap-tab-header">
                    <span className="about-cap-tab-num">{cap.num}</span>
                    <span className="about-cap-tab-tag">{cap.tag}</span>
                  </div>
                  <h3 className="about-cap-tab-title">{cap.title}</h3>
                  <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.45rem', lineHeight: '1.55' }}>
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Live Interactive Visual Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={CAPABILITIES_DATA[activeCapability].id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="about-cap-preview-stage"
              >
                <div className="about-cap-preview-hud-top">
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#ff7a1a', fontWeight: 700 }}>
                      {CAPABILITIES_DATA[activeCapability].badge}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '2px 0 0' }}>
                      {CAPABILITIES_DATA[activeCapability].title}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '4px' }}>
                    ACTIVE ASSET
                  </span>
                </div>

                <div className="about-cap-preview-media-wrap">
                  <img
                    src={CAPABILITIES_DATA[activeCapability].image}
                    alt={CAPABILITIES_DATA[activeCapability].title}
                    draggable="false"
                  />
                </div>

                {/* Technical HUD Specs */}
                <div className="about-cap-specs-bar">
                  {CAPABILITIES_DATA[activeCapability].specs.map((s, i) => (
                    <div key={i} className="about-cap-spec-item">
                      <div className="about-cap-spec-val">{s.val}</div>
                      <div className="about-cap-spec-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: GSAP PINNED FOUNDER SPOTLIGHT (SCROLL 3 PERSPECTIVES THEN UNPIN)
          ========================================================================= */}
      <section 
        id="leadership" 
        ref={founderPinRef}
        className="about-pinned-section"
        style={{ background: '#000000' }}
      >
        <div className="about-pinned-inner">

          <div className="about-founder-grid">

            {/* Left: Authentic Portrait (Large, high-impact executive visual) */}
            <div className="about-founder-img-box">
              <img
                src="/assets/about/about-1.png"
                alt="Paras Jain, Founder & CEO of IndoWings"
                className="about-founder-real-img"
                draggable="false"
              />
              <div className="about-founder-img-badge">
                <span className="about-founder-badge-dot" />
                <span>PARAS JAIN · FOUNDER & CEO</span>
              </div>
            </div>

            {/* Right: Editorial Narrative with Interactive Perspectives */}
            <div>
              <span className="about-eyebrow">
                LEADERSHIP PROFILE
              </span>

              <h2 className="about-founder-name">
                Paras Jain
              </h2>

              <div className="about-founder-title">
                Founder & Chief Executive Officer (CEO)
              </div>

              {/* Perspective Selector Pills */}
              <div className="about-founder-tabs-row">
                {FOUNDER_PERSPECTIVES.map((tab, idx) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleFounderTabClick(idx)}
                    className={`about-founder-tab-pill ${activeFounderTab === idx ? 'is-active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={FOUNDER_PERSPECTIVES[activeFounderTab].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="about-manifesto-body" style={{ marginBottom: '1.1rem', fontSize: '1.02rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.78)' }}>
                    {FOUNDER_PERSPECTIVES[activeFounderTab].p1}
                  </p>

                  <p className="about-manifesto-body" style={{ marginBottom: '1.35rem', fontSize: '1.02rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.78)' }}>
                    {FOUNDER_PERSPECTIVES[activeFounderTab].p2}
                  </p>

                  <div className="about-founder-quote" style={{ margin: '1.5rem 0', paddingLeft: '1.5rem', fontSize: '1.05rem', lineHeight: '1.65', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                    "{FOUNDER_PERSPECTIVES[activeFounderTab].quote}"
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GSAP PINNED DUAL STRATEGIC HUBS (SCROLL 01 ➔ 02 THEN UNPIN)
          ========================================================================= */}
      <section 
        id="hubs"
        ref={hubsPinRef}
        className="about-pinned-section" 
        style={{ background: '#07080b', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="about-pinned-inner">

          <div style={{ textAlign: 'center', marginBottom: 'clamp(0.85rem, 1.8vh, 1.5rem)' }}>
            <span className="about-eyebrow" style={{ marginBottom: '0.25rem' }}>STRATEGIC COMMAND</span>
            <h2 className="about-section-title">
              Dual Strategic Operating Hubs
            </h2>
          </div>

          {/* Interactive Hub Switcher Buttons (NO // SLASHES) */}
          <div className="about-hubs-switcher-row">
            {HUBS_DATA.map((hub, idx) => (
              <button
                key={hub.id}
                type="button"
                onClick={() => handleHubClick(idx)}
                className={`about-hubs-switch-btn ${activeHub === idx ? 'is-active' : ''}`}
              >
                {hub.buttonLabel}
              </button>
            ))}
          </div>

          {/* Active Hub Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={HUBS_DATA[activeHub].id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="about-hub-active-display"
            >
              <div className="about-hub-display-grid">
                
                {/* Left: Real Office Location & Direct Contact */}
                <div className="about-hub-details-col">
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.76rem', color: '#ff7a1a', letterSpacing: '0.12em', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    {HUBS_DATA[activeHub].tag}
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.1vw, 1.85rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 0.85rem', lineHeight: '1.25' }}>
                    {HUBS_DATA[activeHub].name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.88)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    <MapPin size={18} style={{ color: '#ff7a1a', flexShrink: 0, marginTop: '2px' }} />
                    <span>{HUBS_DATA[activeHub].address}</span>
                  </div>

                  <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.68)', lineHeight: '1.65', margin: '0 0 1.25rem' }}>
                    {HUBS_DATA[activeHub].desc}
                  </p>

                  {/* Authentic Contact Channels */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', padding: '0.9rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.2rem' }}>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Toll Free</span>
                      <a href={`tel:${HUBS_DATA[activeHub].phone.replace(/\s+/g, '')}`} style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
                        {HUBS_DATA[activeHub].phone}
                      </a>
                    </div>

                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</span>
                      <a href={`mailto:${HUBS_DATA[activeHub].email}`} style={{ color: '#ff7a1a', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
                        {HUBS_DATA[activeHub].email}
                      </a>
                    </div>

                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Hours</span>
                      <span style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.85rem' }}>
                        {HUBS_DATA[activeHub].hours}
                      </span>
                    </div>
                  </div>

                  <a
                    href={HUBS_DATA[activeHub].mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-hub-map-btn"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowRight size={15} />
                  </a>
                </div>

                {/* Right: Embedded Interactive Google Map */}
                <div className="about-hub-map-wrap">
                  <iframe
                    title={HUBS_DATA[activeHub].name}
                    src={HUBS_DATA[activeHub].mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '320px', borderRadius: '16px', width: '100%', height: '100%' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: MOVING ACCREDITATIONS (SINGLE LINE CONTINUOUS INFINITE TICKER)
          ========================================================================= */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: '#000000' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="about-eyebrow" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 0 }}>
            OFFICIAL ACCREDITATIONS & RECOGNITION
          </span>
        </div>

        {/* Continuous Single-Line Infinite Marquee Track */}
        <div className="about-accred-marquee-wrapper">
          <div className="about-accred-marquee-track">
            {loopAccreditations.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="about-accred-chip">
                <img src={item.img} alt={item.title} />
                <div style={{ textAlign: 'left' }}>
                  <p className="about-accred-chip-name">{item.title}</p>
                  <p className="about-accred-chip-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CLOSING CALL TO ACTION
          ========================================================================= */}
      <section className="about-section" style={{ background: '#000000' }}>
        <div className="about-container">

          <div className="about-banner-card">
            <h2 className="about-banner-title">
              Partner With IndoWings
            </h2>

            <p className="about-banner-desc">
              "Join Indo Wings in revolutionizing the drone industry as we seek resellers and distributors nationwide and worldwide!"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo('Corporate Partnership / Dealer Inquiry')}
                className="indo-fly-primary-btn"
                style={{ padding: '13px 30px', fontSize: '0.95rem' }}
              >
                <span>Inquire For Partnership</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('cyberone-max')}
                className="indo-fly-secondary-btn"
                style={{ padding: '13px 26px', fontSize: '0.95rem' }}
              >
                <span>View Defense Fleet</span>
              </button>
            </div>

            {/* EXACT CORRECTED CONTACT DETAILS */}
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'var(--font-main)'
            }}>
              <span><strong style={{ color: '#ffffff' }}>Corporate:</strong> +91 76694 78937</span>
              <span><strong style={{ color: '#ffffff' }}>Email:</strong> connect@indowings.com</span>
              <span><strong style={{ color: '#ffffff' }}>Office:</strong> Sector 63, Noida, UP</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
