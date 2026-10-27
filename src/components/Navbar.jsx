import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

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

        {/* RIGHT: 3 ACTION LINKS (ANTI-DRONE, REQUEST FOR DEMO, LOGIN) */}
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

      </div>
    </header>
  );
}
