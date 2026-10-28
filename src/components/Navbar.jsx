import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

/**
 * Clean, standard IndoWings navigation data matching indowings.com
 */
const menuData = {
  products: [
    { label: 'Cyberone Trainer Drone', drone: 'Cyberone Trainer Drone', route: 'cyberone-trainer', href: '#/products/cyberone-trainer-drone' },
    { label: 'Cyberone Lite', drone: 'Cyberone Lite', route: 'cyberone-lite', href: '#/products/cyberone-lite' },
    { label: 'Cyberone Pro', drone: 'Cyberone Pro', route: 'cyberone-pro', href: '#/products/cyberone-pro' },
    { label: 'Cyberone Max', drone: 'Cyberone Max', route: 'cyberone-max', href: '#/products/cyberone-max' },
    { label: 'E-Series Pro', drone: 'E-Series Pro', href: '#e-series-pro' },
    { label: 'S-Series Pro', drone: 'S-Series Pro', href: '#s-series-pro' }
  ],
  software: [
    { label: 'IndoFly', drone: 'IndoFly' },
    { label: 'IndoSIM', drone: 'IndoSIM' },
    { label: 'Pix4D', drone: 'Pix4D' }
  ],
  industries: [
    { label: 'Mapping & Survey', drone: 'Mapping & Survey' },
    { label: 'Forest Monitoring', drone: 'Forest Monitoring' },
    { label: 'Fire Fighting', drone: 'Fire Fighting' },
    { label: 'Disaster Management', drone: 'Disaster Management' },
    { label: 'Energy & Power Transmission', drone: 'Energy & Power Transmission' },
    { label: 'Agriculture', drone: 'Agriculture' }
  ],
  company: [
    { label: 'About Us', action: 'about' },
    { label: 'Media', href: '#news-insights' },
    { label: 'Careers', action: 'demo' }
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
            } else if (item.action === 'about' || item.action === 'manifesto') {
              const el = document.getElementById('manifesto') || document.getElementById('about');
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
  const [activeMenu, setActiveMenu] = useState(null); // 'products' | 'software' | 'industries' | 'company' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedSection, setExpandedSection] = useState('products');
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
        
        {/* LEFT: INDOWINGS LOGO */}
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

        {/* CENTER: STANDARD MAIN NAVIGATION */}
        <nav className="iw-nav-center">
          
          {/* 1. PRODUCTS */}
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

          {/* 2. SOFTWARE */}
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

          {/* 3. INDUSTRIES */}
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

          {/* 4. COMPANY */}
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

        {/* RIGHT: ACTION BUTTONS */}
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
            <span>REQUEST DEMO</span>
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

      {/* FULLSCREEN MOBILE MENU */}
      {(mobileMenuOpen || isClosing) && (
        <div 
          className={`iw-fullscreen-menu ${mobileMenuOpen && !isClosing ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* TOP BAR: BRAND LOGO + CLOSE BUTTON */}
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
              
              {/* 1. PRODUCTS ACCORDION */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'products' ? null : 'products')}
                >
                  <span>PRODUCTS</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'products' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'products' && (
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
                      Cyberone Trainer Drone
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
                      Cyberone Lite
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
                      Cyberone Pro
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
                      Cyberone Max
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
                      E-Series Pro
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
                      S-Series Pro
                    </button>
                  </div>
                )}
              </div>

              {/* 2. SOFTWARE ACCORDION */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'software' ? null : 'software')}
                >
                  <span>SOFTWARE</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'software' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'software' && (
                  <div className="iw-fs-sublinks">
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('IndoFly');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      IndoFly
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('IndoSIM');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      IndoSIM
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Pix4D');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Pix4D
                    </button>
                  </div>
                )}
              </div>

              {/* 3. INDUSTRIES ACCORDION */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'industries' ? null : 'industries')}
                >
                  <span>INDUSTRIES</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'industries' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'industries' && (
                  <div className="iw-fs-sublinks">
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Mapping & Survey');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Mapping & Survey
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Forest Monitoring');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Forest Monitoring
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Fire Fighting');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Fire Fighting
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Disaster Management');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Disaster Management
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Energy & Power Transmission');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Energy & Power Transmission
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Agriculture');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Agriculture
                    </button>
                  </div>
                )}
              </div>

              {/* 4. COMPANY ACCORDION */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item iw-fs-accordion-trigger"
                  onClick={() => setExpandedSection(prev => prev === 'company' ? null : 'company')}
                >
                  <span>COMPANY</span>
                  <ChevronDown className={`iw-fs-chevron ${expandedSection === 'company' ? 'expanded' : ''}`} size={20} />
                </button>

                {expandedSection === 'company' && (
                  <div className="iw-fs-sublinks">
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('home');
                        const el = document.getElementById('manifesto') || document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      About Us
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        if (onNavigate) onNavigate('home');
                        const el = document.getElementById('news-insights');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Media
                    </button>
                    <button
                      type="button"
                      className="iw-fs-sublink"
                      onClick={() => {
                        handleCloseMobile();
                        onOpenDemo('Careers at IndoWings');
                      }}
                    >
                      <span className="iw-fs-dot"></span>
                      Careers
                    </button>
                  </div>
                )}
              </div>

              {/* 5. ANTI-DRONE */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item"
                  onClick={() => {
                    handleCloseMobile();
                    onSelectAntiDrone();
                  }}
                >
                  <span>ANTI-DRONE</span>
                  <ArrowRight size={18} className="iw-fs-item-arrow" />
                </button>
              </div>

              {/* 6. CONTACT */}
              <div className="iw-fs-nav-group">
                <button
                  type="button"
                  className="iw-fs-item"
                  onClick={() => {
                    handleCloseMobile();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onOpenDemo('Contact Us');
                  }}
                >
                  <span>CONTACT</span>
                  <ArrowRight size={18} className="iw-fs-item-arrow" />
                </button>
              </div>

            </nav>

            {/* BOTTOM ACTIONS */}
            <div className="iw-fs-bottom">
              <button 
                type="button" 
                className="iw-fs-cta-primary"
                onClick={() => {
                  handleCloseMobile();
                  onOpenDemo();
                }}
              >
                <span>REQUEST DEMO</span>
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
                <span>LOGIN</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
