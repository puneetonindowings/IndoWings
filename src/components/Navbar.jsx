import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

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
  const leaveTimeoutRef = useRef(null);

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
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE SLIDE-OVER DRAWER */}
      <div className={`iw-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="iw-mobile-drawer-inner">
          
          <div className="iw-mobile-drawer-header">
            <img src="/assets/indowing-light.png" alt="IndoWings" className="iw-mobile-drawer-logo" />
            <button 
              type="button" 
              className="iw-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="iw-mobile-nav-group">
            <span className="iw-mobile-group-title">DRONE FLEET</span>
            <div className="iw-mobile-links">
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('cyberone-trainer');
                  else window.location.hash = '#/products/cyberone-trainer-drone';
                }}
              >
                <span className="iw-mobile-link-orange">|</span> CYBERONE TRAINER
              </button>
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('cyberone-lite');
                  else window.location.hash = '#/products/cyberone-lite';
                }}
              >
                <span className="iw-mobile-link-orange">|</span> CYBERONE LITE
              </button>
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('cyberone-pro');
                  else window.location.hash = '#/products/cyberone-pro';
                }}
              >
                <span className="iw-mobile-link-orange">|</span> CYBERONE PRO
              </button>
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('cyberone-max');
                  else window.location.hash = '#/products/cyberone-max';
                }}
              >
                <span className="iw-mobile-link-orange">|</span> CYBERONE MAX
              </button>
            </div>
          </div>

          <div className="iw-mobile-nav-group">
            <span className="iw-mobile-group-title">COMPANY & VISION</span>
            <div className="iw-mobile-links">
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('manifesto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onNavigate) onNavigate('home');
                }}
              >
                ABOUT INDOWINGS
              </button>
              <button 
                type="button"
                className="iw-mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onOpenDemo();
                }}
              >
                CONTACT US
              </button>
            </div>
          </div>

          <div className="iw-mobile-nav-group">
            <span className="iw-mobile-group-title">ACTIONS</span>
            <div className="iw-mobile-actions">
              <button 
                type="button" 
                className="iw-mobile-action-btn iw-mobile-action-demo"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
              >
                REQUEST FOR DEMO
              </button>
              <button 
                type="button" 
                className="iw-mobile-action-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectAntiDrone();
                }}
              >
                ANTI-DRONE DEFENSE
              </button>
              <button 
                type="button" 
                className="iw-mobile-action-btn iw-mobile-action-login"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
              >
                PORTAL LOGIN
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="iw-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
