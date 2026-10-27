import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plus,
  Minus
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CyberoneLitePage({ onBack, onOpenDemo }) {
  const pageRef = useRef(null);

  // ---------------------------------------------------------------------------
  // STATE DEFINITIONS
  // ---------------------------------------------------------------------------

  // Section 4: Interactive 360 Drone Viewer State (Starts on frame 17, matching official angle)
  const [frame360, setFrame360] = useState(17);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartFrame, setDragStartFrame] = useState(17);
  const totalFrames = 30; // 0.png to 29.png

  // Section 6: Markets 3-Card Carousel State (0 to 6)
  const [marketIndex, setMarketIndex] = useState(0);
  const [isMarketHovered, setIsMarketHovered] = useState(false);

  // Section 9: FAQ Accordion State (Supports toggle open/close)
  const [openFaq, setOpenFaq] = useState(0);

  // ---------------------------------------------------------------------------
  // 360 INTERACTIVE VIEWER CONTROLS (Manual Drag Only - No Auto-Rotation)
  // ---------------------------------------------------------------------------

  // Mouse & Touch Drag handlers for 360 viewer
  const handleStartDrag = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartFrame(frame360);
  };

  const handleMoveDrag = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    const sensitivity = 12; // pixels per frame
    const frameDelta = Math.floor(deltaX / sensitivity);
    let newFrame = (dragStartFrame - frameDelta) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    setFrame360(newFrame);
  };

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  // ---------------------------------------------------------------------------
  // MARKETS CAROUSEL AUTO-ADVANCE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isMarketHovered) return;
    const interval = setInterval(() => {
      setMarketIndex(prev => (prev + 1) % 7);
    }, 4500);
    return () => clearInterval(interval);
  }, [isMarketHovered]);

  // ---------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ANIMATIONS (FULL PAGE ORCHESTRATION)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // 1. HERO VIDEO: Cinematic scale-down entrance
      gsap.fromTo(
        '.indo-lite-hero-video',
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' }
      );

      // 2. SECTION 1: POWER BEYOND IMAGINATION
      gsap.fromTo(
        '.indo-lite-big-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-power-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-power-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-power-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-cap-card',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-lite-capabilities-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. SECTION 2: SPECIFICATIONS TABLE
      gsap.fromTo(
        ['.indo-lite-section-title', '.indo-lite-model-subtitle'],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-specs-table-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-grid-cell',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-lite-grid-table',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. SECTION 3: SLEEK DESIGN + STATS + FULL-WIDTH VIDEO
      const sleekTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.indo-lite-sleek-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      sleekTl
        .fromTo('.indo-lite-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.indo-lite-sleek-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
        .fromTo(
          '.indo-lite-sleek-stat',
          { y: 35, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.4)' },
          '-=0.4'
        );

      // Cinematic Parallax zoom on the full-width sleek video
      gsap.fromTo(
        '.indo-lite-sleek-video',
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.indo-lite-sleek-video-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      );

      // 5. SECTION 4: COME AND WITNESS OF 360 DEGREE
      gsap.fromTo(
        ['.indo-lite-witness-title', '.indo-lite-witness-subtitle', '.indo-lite-witness-instruction'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-witness-360-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-witness-img',
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-witness-canvas',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 6. SECTION 5: CORE SUBSYSTEM ROWS (Battery, Payload, RTK)
      const techRows = gsap.utils.toArray('.indo-lite-tech-row');
      techRows.forEach((row) => {
        const isReverse = row.classList.contains('reverse');
        const media = row.querySelector('.indo-lite-tech-media');
        const text = row.querySelector('.indo-lite-tech-text');

        if (media && text) {
          gsap.fromTo(
            media,
            { x: isReverse ? 50 : -50, opacity: 0, scale: 0.94 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            }
          );

          gsap.fromTo(
            text,
            { x: isReverse ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // 7. SECTION 6: MARKETS CAROUSEL
      gsap.fromTo(
        ['.indo-lite-markets-title', '.indo-lite-markets-subtitle'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-markets-carousel-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-market-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-lite-carousel-container',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 8. SECTION 7: IN THE BOX (11 accessories grid)
      gsap.fromTo(
        ['.indo-lite-box-heading', '.indo-lite-box-subheading'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-box-showcase-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-box-item-card',
        { y: 35, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-lite-box-showcase-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 9. SECTION 8: 6 KEY FEATURES ROW
      gsap.fromTo(
        '.indo-lite-six-feat-card',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: '.indo-lite-six-features-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 10. SECTION 9: FREQUENTLY ASKED QUESTIONS
      gsap.fromTo(
        ['.indo-lite-faq-title', '.indo-lite-faq-sub'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indo-lite-official-faq-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.indo-lite-official-faq-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.indo-lite-official-faq-list',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // DATA DEFINITIONS (100% Authentic IndoWings Cyberone Lite)
  // ---------------------------------------------------------------------------

  // Section 1: 5 Core Capability Icons (Official IndoWings SVGs)
  const capabilityIcons = [
    {
      title: 'Day and night surveillance system',
      icon: '/assets/cyberone-lite/D-N-Surveillance.svg'
    },
    {
      title: 'Vehicle/ person detection and tracking',
      icon: '/assets/cyberone-lite/vehicle-person-detection-tracking.svg'
    },
    {
      title: 'Surveillance and reconnaissance',
      icon: '/assets/cyberone-lite/Surveillance-reconnaissance.svg'
    },
    {
      title: 'Traffic monitoring and crowd control',
      icon: '/assets/cyberone-lite/traffic-monitoring-crowd-control.svg'
    },
    {
      title: 'Real time information transfer through secured network',
      icon: '/assets/cyberone-lite/real-time-information-transfer.svg'
    }
  ];

  // Section 2: Authentic 4-Column Specifications Grid (Exact Match to Official IndoWings Site)
  const specRows = [
    // Row 1
    [
      { label: 'Overall Length', val: '600 mm' },
      { label: 'UAV Type', val: 'Quadcopter' },
      { label: 'Weight Including Battery', val: '2.6 Kg' },
      { label: 'Max Payload Capacity', val: '1 Kg' }
    ],
    // Row 2
    [
      { label: 'Max Takeoff Weight Capacity', val: '3.6 Kg' },
      { label: 'Ideal Flight Time', note: '(Varies with different payloads & flight conditions)', val: '45 Minutes*' },
      { label: 'Wind Resistance', val: '35 Km/h (10m/s)' },
      { label: 'Max Speed', note: '(Electronically Controlled)', val: '45 Km/h (12m/s)' }
    ],
    // Row 3
    [
      { label: 'Telemetry Range', note: '(Instrumental Range)', val: '3 - 4 Km (Line of Sight)' },
      { label: 'Video Transmission Range', note: '(According to Environmental Conditions)', val: '3 – 4 Km (Line of Sight)' },
      { label: 'Propellor Type', val: 'Foldable' },
      { label: 'Port Types on Controller', val: 'HDMI, C-Type x 2, USB-A Ports x 2, SIM Card Slot, TF Card Slot, GH 1.25 4 PIN' }
    ],
    // Row 4
    [
      { label: 'I O Function', val: 'H7 Based Onboard Computer, Embedding Capability, ETH Data Switch Hub, Exterior UART Interface' },
      { label: 'Max Launch Altitude (AMSL)', val: '18000 ft.' },
      { label: 'Max Operational Altitude', val: '23000 ft.' },
      { label: 'Battery Type', val: 'Solid State Slide & Lock Battery' }
    ],
    // Row 5
    [
      { label: 'Operating Temperature Limits', val: '-20°C | 50°C' },
      { label: 'BVLOS Control Compatibility', val: 'Yes (Optional)' },
      { label: '', val: '', isEmpty: true },
      { label: '', val: '', isEmpty: true }
    ]
  ];

  // Section 6: Markets (7 Exact Sectors from Official IndoWings Screenshots)
  const marketItems = [
    { id: 'security', name: 'SAFETY & SECURITY', img: '/assets/cyberone-lite/market-security.webp' },
    { id: 'disaster', name: 'DISASTER MANAGEMENT', img: '/assets/cyberone-lite/market-disaster.webp' },
    { id: 'city', name: 'CITY MANAGEMENT', img: '/assets/cyberone-lite/market-city.webp' },
    { id: 'agri', name: 'AGRICULTURE', img: '/assets/cyberone-lite/market-agriculture.webp' },
    { id: 'construction', name: 'CONSTRUCTION', img: '/assets/cyberone-lite/market-construction.webp' },
    { id: 'power', name: 'POWER & UTILITY', img: '/assets/cyberone-lite/market-power.webp' },
    { id: 'mining', name: 'MINING', img: '/assets/cyberone-lite/market-mining.webp' }
  ];

  // Section 7: In the Box (11 Certified Accessories)
  const accessories = [
    { id: 'airframe', name: 'Cyberone Lite', img: '/assets/cyberone-lite/cyberone-lite-cutout.png', isFeatured: true },
    { id: 'props', name: 'Propeller', img: '/assets/cyberone-lite/box-propeller.png' },
    { id: 'battery', name: 'Battery', img: '/assets/cyberone-lite/box-battery.png' },
    { id: 'charger', name: 'Charger', img: '/assets/cyberone-lite/box-charger.png' },
    { id: 'powercable', name: 'Power Cable', img: '/assets/cyberone-lite/box-powercable.png' },
    { id: 'connector', name: 'Charger Connector', img: '/assets/cyberone-lite/box-connector.png' },
    { id: 'gimbal', name: 'Payload', img: '/assets/cyberone-lite/box-payload.png' },
    { id: 'toolkit', name: 'Tool Kit', img: '/assets/cyberone-lite/box-toolkit.png' },
    { id: 'memorycard', name: 'Memory Card', img: '/assets/cyberone-lite/box-memorycard.png' },
    { id: 'logbook', name: 'Pilot Log Book', img: '/assets/cyberone-lite/box-logbook.png' },
    { id: 'manual', name: 'User Manual', img: '/assets/cyberone-lite/box-manual.png' }
  ];

  // Section 8: 6 Key Features Icons Row (Exact Match to User Screenshot 2)
  const featureIconsRow = [
    { title: 'Click -N- Lock', icon: '/assets/cyberone-lite/step-01.svg' },
    { title: 'Swappable Batteries', icon: '/assets/cyberone-lite/step-02.svg' },
    { title: '2 Min Quick Deployment Time', icon: '/assets/cyberone-lite/step-03.svg' },
    { title: 'Near Silent Acoustics', icon: '/assets/cyberone-lite/step-04.svg' },
    { title: 'Operational For 6 Hours', icon: '/assets/cyberone-lite/step-05.svg' },
    { title: 'Mobile Touch Screen GCS', icon: '/assets/cyberone-lite/step-06.svg' }
  ];

  // Section 9: Frequently Asked Questions (Exact Match to User Screenshots 2 & 3)
  const faqs = [
    {
      q: 'What is Cyberone Lite?',
      a: 'Indo wings makes a surveillance drone named Cyberone Lite, and it is also used for mapping, delivery and surveillance purposes.'
    },
    {
      q: 'Can Cyberone Lite create detailed maps?',
      a: 'Yes, Cyberone Lite excels in mapping capabilities. It utilizes advanced mapping technologies to generate detailed and accurate maps of different areas, making it valuable for cartography and urban planning.'
    },
    {
      q: 'In which industries is the Cyberone Lite commonly used?',
      a: 'Cyberone Lite is commonly deployed across safety & security, disaster management, smart city monitoring, precision agriculture, construction, power & utilities, and mining sectors.'
    },
    {
      q: 'Can you provide examples of real-world applications for the Cyberone Lite?',
      a: 'Real-world applications include border reconnaissance, perimeter surveillance, flood search-and-rescue, high-voltage pipeline inspections, forest wildfire tracking, and centimeter-accurate cadastral land survey mapping.'
    },
    {
      q: 'How can I request a demo?',
      a: 'You can click "Request for Demo" in the top navigation or click the button below to schedule an on-field operational flight demonstration with our technical specialists.'
    },
    {
      q: 'Is there a maintenance plan or technical support available for the Cyber One?',
      a: 'Yes, IndoWings provides dedicated warranty coverage, routine maintenance packages, pilot training certification, and 24/7 technical field support across India.'
    },
    {
      q: 'What is the delivery capacity of drone?',
      a: 'Cyberone Lite has a maximum payload capacity of 1.0 kg, engineered for rapid delivery of critical medical kits, emergency supplies, and specialized sensing modules.'
    },
    {
      q: 'How can I obtain pricing information for the S-Series agricultural drones or connect with your sales team for inquiries?',
      a: 'You can reach our sales liaison team directly at connect@indowings.com or call our toll-free support line at 1800 572 7363 / +917669478937.'
    }
  ];

  return (
    <div className="indo-lite-page" ref={pageRef}>

      {/* =========================================================================
          SCREEN 1: FULLSCREEN HERO VIDEO (Pristine, 100% Intact)
          ========================================================================= */}
      <section className="indo-lite-hero">
        <video
          src="/assets/cyberone-lite/video-opener.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="indo-lite-hero-video"
          onContextMenu={(e) => e.preventDefault()}
        />
      </section>

      {/* =========================================================================
          SECTION 1: POWER BEYOND IMAGINATION (Exact Match to User Screenshot 1)
          ========================================================================= */}
      <section className="indo-lite-power-section">
        <div className="indo-lite-container text-center">

          <h2 className="indo-lite-big-heading">
            POWER BEYOND<br className="hidden sm:inline" /> IMAGINATION
          </h2>

          <p className="indo-lite-power-subtitle">
            Turning your visions into missions with a sharp eagle-eye approach. Conquering the toughest of terrains and weather to accomplish the given command.
          </p>

          {/* 5 Capability Icons Horizontal Row */}
          <div className="indo-lite-capabilities-grid">
            {capabilityIcons.map((item, idx) => (
              <div key={idx} className="indo-lite-cap-card">
                <div className="indo-lite-cap-icon-wrap">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="indo-lite-cap-img"
                    draggable="false"
                  />
                </div>
                <p className="indo-lite-cap-label">{item.title}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SPECIFICATIONS (Exact 4-Column Dark Table from User Screenshot 2)
          ========================================================================= */}
      <section className="indo-lite-specs-table-section">
        <div className="indo-lite-container">

          <h2 className="indo-lite-section-title">SPECIFICATIONS</h2>
          <p className="indo-lite-model-subtitle">Model Name : Cyberone Lite</p>

          <div className="indo-lite-table-wrapper">
            <div className="indo-lite-grid-table">
              {specRows.map((row, rIdx) => (
                <React.Fragment key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className={`indo-lite-grid-cell ${cell.isEmpty ? 'empty-cell' : ''}`}
                    >
                      {!cell.isEmpty && (
                        <>
                          <span className="indo-lite-cell-label">
                            {cell.label}
                            {cell.note && <span className="indo-lite-cell-note block text-white/60 font-normal text-[11px]">{cell.note}</span>}
                          </span>
                          <span className="indo-lite-cell-val">{cell.val}</span>
                        </>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SLEEK DESIGN (Exact Match to User Screenshot 3)
          ========================================================================= */}
      <section className="indo-lite-sleek-section">
        <div className="indo-lite-container text-center">

          <p className="indo-lite-eyebrow">The Concepts of Power and Performance</p>
          <h2 className="indo-lite-sleek-title">SLEEK DESIGN</h2>

          {/* 3 Large Stat Metrics Row */}
          <div className="indo-lite-sleek-stats-row">
            <div className="indo-lite-sleek-stat">
              <span className="indo-lite-stat-number">Up to 45 km/h</span>
              <span className="indo-lite-stat-tag orange">FLY SPEED</span>
            </div>

            <div className="indo-lite-sleek-stat">
              <span className="indo-lite-stat-number">45 minutes*</span>
              <span className="indo-lite-stat-tag cyan">FLIGHT TIME</span>
            </div>

            <div className="indo-lite-sleek-stat">
              <span className="indo-lite-stat-number">Up to 10 m/s</span>
              <span className="indo-lite-stat-tag magenta">WIND RESISTANCE</span>
            </div>
          </div>

        </div>

        {/* Drone Sleek Design Video - 100% Full Width Edge-to-Edge */}
        <div className="indo-lite-sleek-video-wrap">
          <video
            src="/assets/cyberone-lite/video-strick.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="indo-lite-sleek-video"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COME AND WITNESS OF 360° DEGREE (Exact Match to User Screenshot 4)
          ========================================================================= */}
      <section className="indo-lite-witness-360-section">
        <div className="indo-lite-container text-center">

          <h2 className="indo-lite-witness-title">Come and Witness of 360° Degree</h2>
          <p className="indo-lite-witness-subtitle">Get a feel for what it's like to own Cyberone Lite.</p>
          <p className="indo-lite-witness-instruction">Click and drag the image to view.</p>

          {/* 360 Interactive Viewer Canvas - Clean, Borderless on pure black */}
          <div
            className={`indo-lite-witness-canvas ${isDragging ? 'grabbing' : 'grab'}`}
            onMouseDown={(e) => handleStartDrag(e.clientX)}
            onMouseMove={(e) => handleMoveDrag(e.clientX)}
            onMouseUp={handleEndDrag}
            onMouseLeave={handleEndDrag}
            onTouchStart={(e) => handleStartDrag(e.touches[0].clientX)}
            onTouchMove={(e) => handleMoveDrag(e.touches[0].clientX)}
            onTouchEnd={handleEndDrag}
          >
            <img
              src={`/assets/cyberone-lite/360/${frame360}.png`}
              alt={`Cyberone Lite 360 degree frame ${frame360}`}
              className="indo-lite-witness-img"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CORE SUBSYSTEM SHOWCASES (Exact Match to User Screenshots 1 & 2)
          ========================================================================= */}
      <section className="indo-lite-tech-showcase-section">
        <div className="indo-lite-container">

          {/* 1. SWAPPABLE BATTERY (Visual Left, Text Right) */}
          <div className="indo-lite-tech-row">
            <div className="indo-lite-tech-media">
              <video
                src="/assets/cyberone-lite/video-battery.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="indo-lite-tech-video"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="indo-lite-tech-text">
              <h3 className="indo-lite-tech-title">SWAPPABLE BATTERY</h3>
              <p className="indo-lite-tech-sub">Swappable Slide And Lock Battery Mechanism</p>
            </div>
          </div>

          {/* 2. PAYLOAD (Text Left, Visual Right - Exact Match to Screenshot 1) */}
          <div className="indo-lite-tech-row reverse">
            <div className="indo-lite-tech-media">
              <video
                src="/assets/cyberone-lite/video-payload.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="indo-lite-tech-video"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="indo-lite-tech-text">
              <h3 className="indo-lite-tech-title">PAYLOAD</h3>
              <p className="indo-lite-tech-sub">Max Payload Capacity 1 Kg</p>
            </div>
          </div>

          {/* 3. REAL-TIME KINEMATIC (Visual Left, Text Right - Exact Match to Screenshot 2) */}
          <div className="indo-lite-tech-row">
            <div className="indo-lite-tech-media">
              <video
                src="/assets/cyberone-lite/video-rtk.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="indo-lite-tech-video"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="indo-lite-tech-text">
              <h3 className="indo-lite-tech-title">
                REAL-TIME<br />KINEMATIC
              </h3>
              <p className="indo-lite-tech-sub">
                RTK provides highly accurate position data with centimeter-level precision in real-time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: MARKETS (Exact 3-Card Carousel from User Screenshots 3, 4, 5)
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
              {/* Duplicate array for seamless infinite sliding wrap */}
              {[...marketItems, ...marketItems.slice(0, 3)].map((item, idx) => (
                <div key={idx} className="indo-lite-market-card">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="indo-lite-market-card-img"
                    draggable="false"
                  />
                  <div className="indo-lite-market-card-overlay">
                    <div className="indo-lite-market-badge-title">
                      <span className="indo-lite-market-bar" />
                      <h4 className="indo-lite-market-name">{item.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Carousel Pagination Dots */}
          <div className="indo-lite-carousel-dots">
            {marketItems.map((_, idx) => (
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
          SECTION 7: IN THE BOX (Immediately following Markets - As Requested!)
          ========================================================================= */}
      <section className="indo-lite-box-showcase-section">
        <div className="indo-lite-container">

          <div className="text-center mb-12">
            <h2 className="indo-lite-box-heading">In the Box</h2>
            <p className="indo-lite-box-subheading">
              Discover Our Exclusive Accessory Collection
            </p>
          </div>

          {/* 11 Certified Accessories Packout Grid (4 Columns, Exactly Balanced Rows) */}
          <div className="indo-lite-box-showcase-grid">
            {accessories.map((acc) => (
              <div
                key={acc.id}
                className={`indo-lite-box-item-card ${acc.isFeatured ? 'featured-drone' : ''}`}
              >
                {/* Uniform Height & Centered Image Frame */}
                <div className="indo-lite-box-item-img-wrap">
                  <img
                    src={acc.img}
                    alt={acc.name}
                    className="indo-lite-box-item-img"
                    draggable="false"
                  />
                </div>

                {/* Clean Bottom Title Bar - Just the Name */}
                <div className="indo-lite-box-item-info">
                  <h4 className="indo-lite-box-item-title">{acc.name}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 6 KEY FEATURES ICONS ROW (Exact Match to User Screenshot 2)
          ========================================================================= */}
      <section className="indo-lite-six-features-section">
        <div className="indo-lite-container">
          <div className="indo-lite-six-features-grid">
            {featureIconsRow.map((feat, idx) => (
              <div key={idx} className="indo-lite-six-feat-card">
                <div className="indo-lite-six-feat-icon-wrap">
                  <img
                    src={feat.icon}
                    alt={feat.title}
                    className="indo-lite-six-feat-img"
                    draggable="false"
                  />
                </div>
                <h4 className="indo-lite-six-feat-label">{feat.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FAQ'S (Exact Match to User Screenshots 2 & 3)
          ========================================================================= */}
      <section className="indo-lite-official-faq-section">
        <div className="indo-lite-container max-w-4xl mx-auto">

          <div className="mb-8">
            <h2 className="indo-lite-faq-title">FAQ's</h2>
            <p className="indo-lite-faq-sub">Key Questions Answered in cyberone Lite</p>
          </div>

          {/* 8 Official Questions List */}
          <div className="indo-lite-official-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`indo-lite-official-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="indo-lite-official-faq-btn"
                  >
                    <span className="indo-lite-faq-question-text">{faq.q}</span>
                    <span className="indo-lite-faq-plus-icon">
                      {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white/70" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="indo-lite-official-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
