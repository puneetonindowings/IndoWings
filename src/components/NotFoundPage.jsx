import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowLeft, 
  Home, 
  Compass, 
  ChevronRight, 
  Radio, 
  Plane, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Briefcase 
} from 'lucide-react';

const REGISTERED_PAGES = [
  {
    tag: 'Flagship UAV',
    name: 'Cyberone Max // Heavy-Lift Logistics & Defense',
    path: '#/products/cyberone-max',
    route: 'cyberone-max',
    keywords: 'cyberone max heavy lift delivery cargo defense uav military drone payload logistics',
    icon: Plane
  },
  {
    tag: 'Tactical UAV',
    name: 'Cyberone Pro // Battlefield Reconnaissance',
    path: '#/products/cyberone-pro',
    route: 'cyberone-pro',
    keywords: 'cyberone pro surveillance tactical reconnaissance battlefield scouting camera thermal',
    icon: Compass
  },
  {
    tag: 'Scout UAV',
    name: 'Cyberone Lite // Rapid Tactical Deployment',
    path: '#/products/cyberone-lite',
    route: 'cyberone-lite',
    keywords: 'cyberone lite rapid lightweight scout surveillance boundary security patrol',
    icon: Radio
  },
  {
    tag: 'Training UAV',
    name: 'Cyberone Trainer Drone // Dual-Pilot Instruction',
    path: '#/products/cyberone-trainer-drone',
    route: 'cyberone-trainer',
    keywords: 'cyberone trainer drone rpto remote pilot instruction dual pilot master slave learning',
    icon: ShieldCheck
  },
  {
    tag: 'Flight OS',
    name: 'IndoFly GCS // Autonomous Mission Control',
    path: '#/products/indofly',
    route: 'indofly',
    keywords: 'indofly gcs ground control station autonomous waypoint flight mapping rtsp telemetry',
    icon: Cpu
  },
  {
    tag: 'Simulator',
    name: 'IndoSim // Unreal Engine 5 UAV Flight Simulator',
    path: '#/products/indosim',
    route: 'indosim',
    keywords: 'indosim flight simulator unreal engine 5 virtual pilot training rpto master slave emergency',
    icon: Compass
  },
  {
    tag: 'Company',
    name: 'About IndoWings // Sovereign Defense Aerospace',
    path: '#home',
    route: 'home',
    keywords: 'about indowings company make in india defense aerospace manufacturers noida bengaluru',
    icon: FileText
  },
  {
    tag: 'Careers',
    name: 'Careers at IndoWings // Join Defense Aviation',
    path: '#home',
    route: 'home',
    keywords: 'career jobs engineering aerodynamics embedded pilot flight testing hiring',
    icon: Briefcase
  }
];

export default function NotFoundPage({ onNavigate, onOpenDemo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // Focus shortcut: Pressing '/' anywhere focuses search, 'Escape' clears
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchTerm('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered pages based on search term
  const filteredPages = REGISTERED_PAGES.filter((page) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase().trim();
    return (
      page.name.toLowerCase().includes(query) ||
      page.tag.toLowerCase().includes(query) ||
      page.keywords.toLowerCase().includes(query)
    );
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      if (onNavigate) onNavigate('home');
      else window.location.hash = '';
    }
  };

  const handleItemClick = (page) => {
    if (page.route) {
      if (onNavigate) onNavigate(page.route);
      else window.location.hash = page.path;
    }
  };

  return (
    <div className="iw-404-page">
      {/* Ambient Radial Background Glow */}
      <div className="iw-404-ambient-glow" />

      {/* Main Grid: Left Hero & Actions, Right Search & Directory */}
      <div className="iw-404-container">
        
        {/* LEFT PANEL: 404 CODE, TITLE & ACTION BUTTONS */}
        <div className="iw-404-left">
          
          <div className="iw-404-code-wrap">
            <span className="iw-404-digit">4</span>
            <div className="iw-404-zero-radar">
              <span className="iw-404-radar-sweep" />
              <span className="iw-404-radar-ring" />
              <span className="iw-404-crosshair-h" />
              <span className="iw-404-crosshair-v" />
              <span className="iw-404-zero-txt">0</span>
            </div>
            <span className="iw-404-digit">4</span>
          </div>

          <div className="iw-404-status-badge">
            <span className="iw-404-pulse-dot" />
            <span>RADAR LOSS // AIRSPACE UNCHARTED</span>
          </div>

          <h1 className="iw-404-title">
            Flight Coordinates Not Found
          </h1>

          <p className="iw-404-desc">
            The waypoint or route you entered is out of active geofence. The link may be archived, or the system path was recalibrated. Search registered flight profiles or return to mission headquarters.
          </p>

          <div className="iw-404-actions">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('home') : (window.location.hash = '')}
              className="iw-404-btn-primary"
            >
              <Home size={18} />
              <span>Return to Command Base</span>
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="iw-404-btn-secondary"
            >
              <ArrowLeft size={18} />
              <span>Previous Sortie</span>
            </button>
          </div>

        </div>

        {/* RIGHT PANEL: LIVE SEARCH & ROUTE DIRECTORY */}
        <div className="iw-404-right">
          
          <div className="iw-404-panel">
            <div className="iw-404-panel-head">
              <h2 className="iw-404-panel-title">Navigate Mission Directives</h2>
              <span className="iw-404-count-pill">
                {filteredPages.length} active destinations
              </span>
            </div>

            {/* Interactive Search Bar */}
            <div className="iw-404-search-box">
              <Search size={18} className="iw-404-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search UAVs, software, or manuals..."
                className="iw-404-search-input"
              />
              <kbd className="iw-404-kbd-pill" title="Press / to focus">/</kbd>
            </div>

            {/* Directory Link Cards */}
            <div className="iw-404-list">
              <AnimatePresence>
                {filteredPages.length > 0 ? (
                  filteredPages.map((page, idx) => {
                    const Icon = page.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        onClick={() => handleItemClick(page)}
                        className="iw-404-card"
                      >
                        <div className="iw-404-card-left">
                          <div className="iw-404-card-icon">
                            <Icon size={18} />
                          </div>
                          <div>
                            <span className="iw-404-card-tag">{page.tag}</span>
                            <h3 className="iw-404-card-name">{page.name}</h3>
                            <span className="iw-404-card-path">{page.path}</span>
                          </div>
                        </div>

                        <ChevronRight size={18} className="iw-404-card-arrow" />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="iw-404-empty-state"
                  >
                    <p className="iw-404-empty-title">
                      No matching airspaces for &ldquo;{searchTerm}&rdquo;
                    </p>
                    <p className="iw-404-empty-desc">
                      Try searching &ldquo;Cyberone&rdquo;, &ldquo;IndoFly&rdquo;, or &ldquo;Simulator&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="iw-404-clear-btn"
                    >
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* FOOTER AUDIT BAR */}
      <footer className="iw-404-footer">
        <div className="iw-404-footer-inner">
          <span>
            Telemetry link lost? <button type="button" onClick={() => onOpenDemo && onOpenDemo('404 Telemetry Support')} className="iw-404-support-link">Contact Tactical Support</button> &middot; 24/7 Operations Room
          </span>
          <span className="iw-404-ref-tag">REF 404-IW-TACTICAL-GEOFENCE</span>
        </div>
      </footer>
    </div>
  );
}
