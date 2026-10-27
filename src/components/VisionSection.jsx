import React from 'react';

export default function VisionSection() {
  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="about" 
      className="iw-about-minimal-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* TACTICAL DEFENSE CYBER GRID BACKGROUND */}
      <div className="iw-about-grid-bg" aria-hidden="true" />
      <div className="iw-about-ambient-radial" aria-hidden="true" />

      {/* ULTRA-MINIMAL WIDE EDITORIAL CONTAINER */}
      <div className="iw-about-minimal-container">
        
        {/* MINIMAL BADGE */}
        <div className="iw-about-minimal-badge">
          <span className="iw-about-square-icon" />
          <span className="iw-about-badge-text">ABOUT US</span>
        </div>

        {/* REFINED, ELEGANT HEADLINE */}
        <h2 className="iw-about-minimal-headline">
          Power Beyond Imagination
        </h2>

        {/* WIDE-SPREAD CLEAN PARAGRAPHS (NO BOXES, NO BORDERS, PURE TYPOGRAPHY) */}
        <div className="iw-about-minimal-spread">
          <p className="iw-about-minimal-p">
            Indo Wings Private Limited is an India's Fastest Growing Drone & Anti Drone Manufacturer company of Advanced Unmanned Aerial Vehicles (UAVs) & Anti-UAVs. Pioneer in providing drone services for various industries and setting high standards in advancements of aerospace technology.
          </p>

          <p className="iw-about-minimal-p">
            Our expert-led R&D team develops a wide range of market-leading Drones and Anti-Drone Systems. We are technical experts in the successful application of GIS solutions for multiple sectors. Highly inspired and driven by the iconic Make in India initiative to empower industries around the nation with the best of AI.
          </p>
        </div>

        {/* MINIMALIST 'KNOW MORE' LINK */}
        <div className="iw-about-minimal-action">
          <a 
            href="#products" 
            onClick={handleScrollToProducts}
            className="iw-about-minimal-link"
          >
            <span>Know more</span>
            <span className="iw-about-link-arrow">→</span>
          </a>
        </div>

        {/* SUBTLE ROTATING VORTEX ICON */}
        <div className="iw-about-minimal-vortex" aria-hidden="true">
          <svg 
            className="iw-about-vortex-svg" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="44" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.2" strokeDasharray="4 6" />
            <circle cx="50" cy="50" r="30" stroke="rgba(245, 130, 32, 0.2)" strokeWidth="1.2" strokeDasharray="3 5" />
            <path 
              d="M50 18C32.327 18 18 32.327 18 50C18 67.673 32.327 82 50 82C67.673 82 82 67.673 82 50" 
              stroke="url(#vortexGradMin)" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d="M50 28C37.85 28 28 37.85 28 50C28 62.15 37.85 72 50 72" 
              stroke="#f58220" 
              strokeWidth="1.6" 
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
            <defs>
              <linearGradient id="vortexGradMin" x1="18" y1="18" x2="82" y2="82" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f58220" />
                <stop offset="0.6" stopColor="#ffffff" />
                <stop offset="1" stopColor="#f58220" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

      {/* BOTTOM TRANSITION ARC & ORCHESTRATION BADGE */}
      <div className="iw-about-bottom-arc-container">
        <svg 
          className="iw-about-arc-svg" 
          viewBox="0 0 1400 90" 
          fill="none" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d="M0 90 C 400 15, 1000 15, 1400 90" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
            strokeDasharray="4 6" 
          />
        </svg>

        <a 
          href="#products" 
          onClick={handleScrollToProducts}
          className="iw-about-orchestration-badge"
          title="Scroll down to Autonomous Products"
        >
          <span className="iw-about-orchestration-dot" />
          <span className="iw-about-orchestration-text">MISSION ORCHESTRATION</span>
        </a>
      </div>
    </section>
  );
}
