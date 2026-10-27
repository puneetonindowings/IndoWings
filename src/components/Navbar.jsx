import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';

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
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState('products');
  const leaveTimeoutRef = useRef(null);

  // Close mobile drawer on route change or escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

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

  const handleMobileNavClick = (item) => {
    setMobileMenuOpen(false);
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
  };

  return (
    <header className="iw-header">
      <div className="iw-header-inner">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          className="iw-brand" 
          aria-label="IndoWings"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
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

        {/* Desktop Navigation */}
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
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onOpenDemo) onOpenDemo();
              }}
            >
              CONTACT
            </button>
          </div>
        </nav>

        {/* Desktop Header Actions */}
        <div className="iw-nav-right">
          <button 
            type="button" 
            className="iw-action-link"
            onClick={onSelectAntiDrone}
          >
            <span>ANTI-DRONE</span>
            <ArrowRight className="iw-action-arrow" />
          </button>

          <button 
            type="button" 
            className="iw-action-link" 
            onClick={() => onOpenDemo()}
          >
            <span>REQUEST FOR DEMO</span>
            <ArrowRight className="iw-action-arrow" />
          </button>

          <button 
            type="button" 
            className="iw-action-link" 
            onClick={onOpenLogin}
          >
            <span>LOGIN</span>
            <ArrowRight className="iw-action-arrow" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="iw-mobile-toggle-btn"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="iw-mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Drawer */}
      <div className={`iw-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="iw-mobile-drawer-inner">
          <div className="iw-mobile-drawer-header">
            <img 
              src="/assets/indowing-light.png" 
              alt="IndoWings" 
              className="iw-mobile-drawer-logo" 
            />
            <button
              type="button"
              className="iw-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="iw-mobile-menu-items">
            {/* 1. PRODUCTS ACCORDION */}
            <div className="iw-mobile-accordion-group">
              <button
                type="button"
                className={`iw-mobile-accordion-header ${mobileAccordion === 'products' ? 'active' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
              >
                <span>PRODUCTS</span>
                <ChevronDown className={`iw-mobile-accordion-arrow ${mobileAccordion === 'products' ? 'open' : ''}`} />
              </button>
              {mobileAccordion === 'products' && (
                <div className="iw-mobile-accordion-body">
                  {menuData.products.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="iw-mobile-sublink"
                      onClick={() => handleMobileNavClick(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} className="iw-mobile-sublink-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. COMPANY ACCORDION */}
            <div className="iw-mobile-accordion-group">
              <button
                type="button"
                className={`iw-mobile-accordion-header ${mobileAccordion === 'company' ? 'active' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
              >
                <span>COMPANY</span>
                <ChevronDown className={`iw-mobile-accordion-arrow ${mobileAccordion === 'company' ? 'open' : ''}`} />
              </button>
              {mobileAccordion === 'company' && (
                <div className="iw-mobile-accordion-body">
                  {menuData.company.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="iw-mobile-sublink"
                      onClick={() => handleMobileNavClick(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} className="iw-mobile-sublink-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. SOFTWARE ACCORDION */}
            <div className="iw-mobile-accordion-group">
              <button
                type="button"
                className={`iw-mobile-accordion-header ${mobileAccordion === 'software' ? 'active' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'software' ? null : 'software')}
              >
                <span>SOFTWARE</span>
                <ChevronDown className={`iw-mobile-accordion-arrow ${mobileAccordion === 'software' ? 'open' : ''}`} />
              </button>
              {mobileAccordion === 'software' && (
                <div className="iw-mobile-accordion-body">
                  {menuData.software.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="iw-mobile-sublink"
                      onClick={() => handleMobileNavClick(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} className="iw-mobile-sublink-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. INDUSTRIES ACCORDION */}
            <div className="iw-mobile-accordion-group">
              <button
                type="button"
                className={`iw-mobile-accordion-header ${mobileAccordion === 'industries' ? 'active' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'industries' ? null : 'industries')}
              >
                <span>INDUSTRIES</span>
                <ChevronDown className={`iw-mobile-accordion-arrow ${mobileAccordion === 'industries' ? 'open' : ''}`} />
              </button>
              {mobileAccordion === 'industries' && (
                <div className="iw-mobile-accordion-body">
                  {menuData.industries.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="iw-mobile-sublink"
                      onClick={() => handleMobileNavClick(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} className="iw-mobile-sublink-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DIRECT LINKS */}
            <button
              type="button"
              className="iw-mobile-direct-link"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSelectAntiDrone) onSelectAntiDrone();
              }}
            >
              <span>ANTI-DRONE DEFENSE</span>
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              className="iw-mobile-direct-link"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onOpenDemo) onOpenDemo();
              }}
            >
              <span>CONTACT</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Drawer Bottom Actions */}
          <div className="iw-mobile-drawer-footer">
            <button
              type="button"
              className="iw-mobile-primary-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
            >
              REQUEST FOR DEMO
            </button>
            <button
              type="button"
              className="iw-mobile-secondary-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
