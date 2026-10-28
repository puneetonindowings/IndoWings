import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

/**
 * EXACT SPACEX STYLE MINIMALIST VERTICAL TEXT DROPDOWN
 * Clean, pure uppercase navigation items floating directly beneath parent nav items
 */
const menuData = {
  company: [
    { label: 'ABOUT INDOWINGS', action: 'manifesto' },
    { label: 'LEADERSHIP & VISION', action: 'manifesto' },
    { label: 'NEWS & INSIGHTS', href: '#news-insights' },
    { label: 'CAREERS & CULTURE', action: 'demo' }
  ],
  products: [
    { label: 'CYBERONE TRAINER', drone: 'Cyberone Trainer Drone', route: 'cyberone-trainer', href: '#/products/cyberone-trainer-drone' },
    { label: 'CYBERONE LITE', drone: 'Cyberone Lite', route: 'cyberone-lite', href: '#/products/cyberone-lite' },
    { label: 'CYBERONE PRO', drone: 'Cyberone Pro', route: 'cyberone-pro', href: '#/products/cyberone-pro' },
    { label: 'CYBERONE MAX', drone: 'Cyberone Max', route: 'cyberone-max', href: '#/products/cyberone-max' },
    { label: 'E-SERIES PRO', drone: 'E-Series Pro', href: '#e-series-pro' },
    { label: 'S-SERIES PRO', drone: 'S-Series Pro', href: '#s-series-pro' }
  ],
  software: [
    { label: 'INDOFLY AUTONOMY OS', drone: 'IndoFly Autonomy OS' },
    { label: 'INDOSIM SIMULATOR', drone: 'IndoSIM Simulator' },
    { label: 'PIX4D GEOSPATIAL', drone: 'Pix4D Geospatial Suite' }
  ],
  industries: [
    { label: 'DEFENSE & BORDERS', drone: 'Defense & Borders' },
    { label: 'MAPPING & SURVEY', drone: 'Mapping & Survey' },
    { label: 'FOREST MONITORING', drone: 'Forest Monitoring' },
    { label: 'DISASTER RELIEF & SAR', drone: 'Disaster Relief & SAR' },
    { label: 'ENERGY & POWER TRANSMISSION', drone: 'Energy & Power Transmission' },
    { label: 'PRECISION AGRICULTURE', drone: 'Precision Agriculture' }
  ]
};

function SpaceXDropdown({ items, onOpenDemo, onNavigate, onClose }) {
  return (
    <div 
      className="iw-spacex-dropdown" 
      onMouseDown={(e) => e.stopPropagation()}
      role="menu"
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          type="button"
          className="iw-spacex-item"
          role="menuitem"
          onClick={() => {
            if (item.route && onNavigate) {
              onNavigate(item.route);
            } else if (item.href && item.href.startsWith('#/')) {
              window.location.hash = item.href;
            } else if (item.href) {
              const el = document.querySelector(item.href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else if (item.action === 'manifesto') {
              const el = document.getElementById('manifesto');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onOpenDemo();
            } else if (item.drone) {
              onOpenDemo(item.drone);
            } else {
              onOpenDemo();
            }
            onClose();
          }}
        >
          <span className="iw-spacex-item-text">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Navbar({ onOpenDemo, onOpenLogin, onSelectAntiDrone, onNavigate }) {
  const [activeMenu, setActiveMenu] = useState(null); // 'company' | 'products' | 'software' | 'industries' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedSection, setExpandedSection] = useState('fleet');
  const leaveTimeoutRef = useRef(null);

  const handleOpenMobile = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
  };

  const handleCloseMobile = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 350);
  };

  useEffect(() => {
    if (mobileMenuOpen && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isClosing]);

  const handleMouseEnter = (menu) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  return (
    <header className="iw-header">
      <div className="iw-header-inner">
        
        {/* LEFT: EXACT INDOWINGS LOGO (Crisp White + Orange Wing Bars) */}
        <a 
          href="#" 
          className="iw-brand" 
          aria-label="IndoWings"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('home');
            else window.location.hash = '';
          }}
        >
          <img 
            src="/assets/indowing-light.png" 
            alt="IndoWings Logo" 
            className="iw-logo-img" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </a>

        {/* CENTER: 5 MAIN NAVS WITH EXACT SPACEX VERTICAL DROPDOWNS */}
        <nav className="iw-nav-center">
          
          {/* 1. COMPANY */}
          <div 
            className={`iw-nav-item ${activeMenu === 'company' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="iw-nav-btn">
              COMPANY <ChevronDown className="iw-chevron" />
            </button>
            {activeMenu === 'company' && (
              <SpaceXDropdown 
                items={menuData.company} 
                onOpenDemo={onOpenDemo} 
                onNavigate={onNavigate}
                onClose={() => setActiveMenu(null)} 
              />
            )}
          </div>

          {/* 2. PRODUCTS */}
          <div 
            className={`iw-nav-item ${activeMenu === 'products' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="iw-nav-btn">
              PRODUCTS <ChevronDown className="iw-chevron" />
            </button>
            {activeMenu === 'products' && (
              <SpaceXDropdown 
                items={menuData.products} 
                onOpenDemo={onOpenDemo} 
                onNavigate={onNavigate}
                onClose={() => setActiveMenu(null)} 
              />
            )}
          </div>

          {/* 3. SOFTWARE */}
          <div 
            className={`iw-nav-item ${activeMenu === 'software' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('software')}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="iw-nav-btn">
              SOFTWARE <ChevronDown className="iw-chevron" />
            </button>
            {activeMenu === 'software' && (
              <SpaceXDropdown 
                items={menuData.software} 
                onOpenDemo={onOpenDemo} 
                onNavigate={onNavigate}
                onClose={() => setActiveMenu(null)} 
              />
            )}
          </div>

          {/* 4. INDUSTRIES */}
          <div 
            className={`iw-nav-item ${activeMenu === 'industries' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('industries')}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="iw-nav-btn">
              INDUSTRIES <ChevronDown className="iw-chevron" />
            </button>
            {activeMenu === 'industries' && (
              <SpaceXDropdown 
                items={menuData.industries} 
                onOpenDemo={onOpenDemo} 
                onNavigate={onNavigate}
                onClose={() => setActiveMenu(null)} 
              />
            )}
          </div>

          {/* 5. CONTACT */}
          <div className="iw-nav-item">
            <button 
              type="button" 
              className="iw-nav-btn" 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else if (onOpenDemo) {
                  onOpenDemo();
                }
              }}
            >
              CONTACT
            </button>
          </div>

        </nav>

        {/* RIGHT: 3 ACTION LINKS + MOBILE BURGER TOGGLE */}
        <div className="iw-nav-right">
          <button 
            type="button" 
            className="iw-action-link iw-action-desktop-only"
            onClick={onSelectAntiDrone}
          >
            <span>ANTI-DRONE</span>
            <ArrowRight className="iw-action-arrow" />
          </button>

          <button 
            type="button" 
            className="iw-action-link iw-action-desktop-only" 
            onClick={() => onOpenDemo()}
          >
            <span>REQUEST FOR DEMO</span>
            <ArrowRight className="iw-action-arrow" />
          </button>

          <button 
            type="button" 
            className="iw-action-link iw-action-desktop-only" 
            onClick={onOpenLogin}
          >
            <span>LOGIN</span>
            <ArrowRight className="iw-action-arrow" />
          </button>

          {/* MOBILE BURGER TOGGLE */}
          <button 
            type="button" 
            className="iw-mobile-toggle"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            onClick={mobileMenuOpen ? handleCloseMobile : handleOpenMobile}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* FULLSCREEN MOBILE MENU (HARMATTAN AI & SPACEX AESTHETIC) */}
      {(mobileMenuOpen || isClosing) && (
        <div 
          className={`iw-fullscreen-menu ${mobileMenuOpen && !isClosing ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* TOP BAR: BRAND LOGO + HARMATTAN AI STYLE TACTICAL BOXED CLOSE BUTTON */}
          <div className="iw-fs-header">
            <a
              href="#"
              className="iw-fs-logo-link"
              onClick={(e) => {
                e.preventDefault();
                handleCloseMobile();
                if (onNavigate) onNavigate('home');
                else window.location.hash = '';
              }}
            >
              <img 
                src="/assets/indowing-light.png" 
                alt="IndoWings" 
                className="iw-fs-logo" 
              />
            </a>

            <button 
              type="button" 
              className="iw-fs-close-btn"
              onClick={handleCloseMobile}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.4} />
            </button>
          </div>

          {/* MAIN BODY NAVIGATION LINKS */}
          <div className="iw-fs-body">
            <nav className="iw-fs-nav-list">
              
              {/* SECTION 1: DRONE FLEET ACCORDION */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'fleet' ? null : 'fleet')}
                >
                  <span>FLEET & PRODUCTS</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'fleet' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'fleet' && (
                  <div className="iw-fs-sublinks">
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('cyberone-trainer');
                        else window.location.hash = '#/products/cyberone-trainer-drone';
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      CYBERONE TRAINER DRONE
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('cyberone-lite');
                        else window.location.hash = '#/products/cyberone-lite';
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      CYBERONE LITE (TACTICAL SCOUT)
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('cyberone-pro');
                        else window.location.hash = '#/products/cyberone-pro';
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      CYBERONE PRO (SURVEILLANCE)
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('cyberone-max');
                        else window.location.hash = '#/products/cyberone-max';
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      CYBERONE MAX (HEAVY LIFT)
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('home');
                        const el = document.getElementById('e-series-pro');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      E-SERIES PRO (AGRICULTURE)
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('home');
                        const el = document.getElementById('s-series-pro');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      S-SERIES PRO (MAPPING)
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 2: DEFENSE CAPABILITIES */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'defense' ? null : 'defense')}
                >
                  <span>DEFENSE & C-UAS</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'defense' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'defense' && (
                  <div className="iw-fs-sublinks">
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onSelectAntiDrone();
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      SKYCTRL ANTI-DRONE C-UAS
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Autonomous Border Security');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      BORDER SURVEILLANCE GRID
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Tactical Reconnaissance');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      TACTICAL RECONNAISSANCE
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 3: COMPANY & MANIFESTO */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item"
                  onClick={() => {
                    handleCloseMobile();
                    if (onNavigate) onNavigate('home');
                    const el = document.getElementById('manifesto') || document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>SOVEREIGN MANIFESTO</span>
                  <ArrowRight size={18} className="iw-fs-item-arrow" />
                </button>
              </div>

              {/* SECTION 4: NEWS & INSIGHTS */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item"
                  onClick={() => {
                    handleCloseMobile();
                    if (onNavigate) onNavigate('home');
                    const el = document.getElementById('news-insights');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>NEWS & INSIGHTS</span>
                  <ArrowRight size={18} className="iw-fs-item-arrow" />
                </button>
              </div>

              {/* SECTION 5: CONTACT & CAREERS */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item"
                  onClick={() => {
                    handleCloseMobile();
                    onOpenDemo('General Inquiry & Careers');
                  }}
                >
                  <span>CONTACT US</span>
                  <ArrowRight size={18} className="iw-fs-item-arrow" />
                </button>
              </div>

            </nav>

            {/* BOTTOM HIGH-IMPACT HARMATTAN-STYLE ACTIONS */}
            <div className="iw-fs-bottom">
              <button 
                type="button" 
                className="iw-fs-cta-primary"
                onClick={() => {
                  handleCloseMobile();
                  onOpenDemo();
                }}
              >
                <span>REQUEST FLIGHT DEMO</span>
                <ArrowUpRight size={20} strokeWidth={2.5} />
              </button>

              <button 
                type="button" 
                className="iw-fs-cta-secondary"
                onClick={() => {
                  handleCloseMobile();
                  onOpenLogin();
                }}
              >
                <span>DEFENSE PORTAL LOGIN</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
