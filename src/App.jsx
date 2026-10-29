import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MissionManifesto from './components/MissionManifesto.jsx';
import ProductShowcase from './components/ProductShowcase.jsx';
import FeaturedOn from './components/FeaturedOn.jsx';
import BlogSection from './components/BlogSection.jsx';
import InstagramSection from './components/InstagramSection.jsx';
import TrustedBy from './components/TrustedBy.jsx';
import FaqSection from './components/FaqSection.jsx';
import Footer from './components/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import LoginModal from './components/LoginModal.jsx';
import Preloader from './components/Preloader.jsx';
import CyberoneLitePage from './components/CyberoneLitePage.jsx';
import CyberoneTrainerPage from './components/CyberoneTrainerPage.jsx';
import CyberoneProPage from './components/CyberoneProPage.jsx';
import CyberoneMaxPage from './components/CyberoneMaxPage.jsx';
import IndoFlyPage from './components/IndoFlyPage.jsx';
import IndoSimPage from './components/IndoSimPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState('');
  const [isReadyForHeroAnim, setIsReadyForHeroAnim] = useState(false);
  
  // Routing state: 'home' | 'cyberone-lite' | 'cyberone-trainer' | 'cyberone-pro' | 'cyberone-max' | 'indofly' | 'indosim' | '404'
  const parseCurrentRoute = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash.includes('indosim') || path.includes('indosim')) {
      return 'indosim';
    }
    if (hash.includes('indofly') || path.includes('indofly')) {
      return 'indofly';
    }
    if (hash.includes('cyberone-trainer') || path.includes('cyberone-trainer')) {
      return 'cyberone-trainer';
    }
    if (hash.includes('cyberone-lite') || path.includes('cyberone-lite')) {
      return 'cyberone-lite';
    }
    if (hash.includes('cyberone-pro') || path.includes('cyberone-pro') || hash.includes('cyberonepro') || path.includes('cyberonepro')) {
      return 'cyberone-pro';
    }
    if (hash.includes('cyberone-max') || path.includes('cyberone-max') || hash.includes('cyberonemax') || path.includes('cyberonemax')) {
      return 'cyberone-max';
    }
    if (hash.includes('404') || path.includes('404') || hash.includes('not-found') || path.includes('not-found')) {
      return '404';
    }
    if (!hash || hash === '#' || hash === '#/' || hash === '#home') {
      return 'home';
    }
    if (hash.startsWith('#/')) {
      return '404';
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(parseCurrentRoute);

  // Sync route on hash/popstate
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(parseCurrentRoute());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    if (route === 'indosim') {
      window.location.hash = '#/products/indosim';
      window.scrollTo(0, 0);
    } else if (route === 'indofly') {
      window.location.hash = '#/products/indofly';
      window.scrollTo(0, 0);
    } else if (route === 'cyberone-trainer') {
      window.location.hash = '#/products/cyberone-trainer-drone';
      window.scrollTo(0, 0);
    } else if (route === 'cyberone-lite') {
      window.location.hash = '#/products/cyberone-lite';
      window.scrollTo(0, 0);
    } else if (route === 'cyberone-pro') {
      window.location.hash = '#/products/cyberone-pro';
      window.scrollTo(0, 0);
    } else if (route === 'cyberone-max') {
      window.location.hash = '#/products/cyberone-max';
      window.scrollTo(0, 0);
    } else if (route === '404') {
      window.location.hash = '#/404';
      window.scrollTo(0, 0);
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Safety trigger in case preloader completes or is skipped
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsReadyForHeroAnim(true);
    }, 1500);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Global anti-theft protection: Prevent dragging images/videos and disabling right-click save
  useEffect(() => {
    const handleDragStart = (e) => {
      if (e.target.closest('.iw-c1-360-viewer')) return;
      e.preventDefault();
      return false;
    };

    const handleContextMenu = (e) => {
      if (
        e.target.tagName === 'IMG' || 
        e.target.tagName === 'VIDEO' || 
        e.target.closest('.qs-hero-container') || 
        e.target.closest('.iw-manifesto-section') ||
        e.target.closest('.iw-product-hero-slide') ||
        e.target.closest('.iw-featured-section') ||
        e.target.closest('.iw-blog-section') ||
        e.target.closest('.iw-insta-section') ||
        e.target.closest('.iw-trusted-section') ||
        e.target.closest('.iw-faq-section') ||
        e.target.closest('.iw-footer-section') ||
        e.target.closest('.iw-header') ||
        e.target.closest('.iw-c1-page') ||
        e.target.closest('.indo-pro-page') ||
        e.target.closest('.indo-max-page') ||
        e.target.closest('.indo-fly-page') ||
        e.target.closest('.vbat-page')
      ) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleOpenDemoWithProduct = (productName) => {
    setActiveProduct(productName || '');
    setIsDemoOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-[#f58220] selection:text-white">
      {currentRoute === 'indosim' ? (
        /* DEDICATED INDOSIM FLIGHT SIMULATION PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'IndoSIM Simulator')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <IndoSimPage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('IndoSIM Simulator')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === 'indofly' ? (
        /* DEDICATED INDOFLY GCS SOFTWARE PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'IndoFly GCS')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <IndoFlyPage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('IndoFly GCS')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === '404' ? (
        /* COLORLIB HQ V01 ADAPTED INDOWINGS DEFENSE 404 UNCHARTED AIRSPACE PAGE */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'Operations')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <NotFoundPage onNavigate={navigateTo} />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === 'cyberone-max' ? (
        /* DEDICATED CYBERONE MAX MODEL PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'Cyberone Max')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <CyberoneMaxPage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('Cyberone Max')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === 'cyberone-pro' ? (
        /* DEDICATED CYBERONE PRO MODEL PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'Cyberone Pro')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <CyberoneProPage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('Cyberone Pro')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === 'cyberone-trainer' ? (
        /* DEDICATED CYBERONE TRAINER DRONE MODEL PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'Cyberone Trainer Drone')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <CyberoneTrainerPage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('Cyberone Trainer Drone')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : currentRoute === 'cyberone-lite' ? (
        /* DEDICATED CYBERONE LITE MODEL PAGE WITH OFFICIAL NAVBAR & FOOTER */
        <>
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || 'Cyberone Lite')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <CyberoneLitePage 
            onBack={() => navigateTo('home')}
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('Cyberone Lite')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      ) : (
        /* FULL LANDING PAGE */
        <>
          {/* HARMATTAN AI INTRO PRELOADER (CINEMATIC RELOAD SPLASH SCREEN) */}
          <Preloader onExitStart={() => setIsReadyForHeroAnim(true)} />

          {/* 100% TRANSPARENT DEFENSE NAVBAR */}
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || '')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />

          {/* QUANTUM SYSTEMS STYLE HERO (NO TEXT CLUTTER, AUTO & MANUAL SCROLL) */}
          <Hero triggerAnim={isReadyForHeroAnim} />

          {/* HELSING.AI STYLE MANIFESTO & ABOUT US SECTION (INDOWINGS SOVEREIGN DEFENSE IDENTITY) */}
          <MissionManifesto 
            onOpenDemo={handleOpenDemoWithProduct}
          />

          {/* HELSING.AI CA-1 EUROPA STYLE PRODUCT STACK (WITH DYNAMIC SCROLL ZOOM EFFECT) */}
          <ProductShowcase 
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />

          {/* WE ARE OFFICIALLY FEATURED ON (FLOATING LOGOS SHOWCASE) */}
          <FeaturedOn />

          {/* ANDURIL STYLE EDITORIAL NEWS & INSIGHTS (WITH INDOWINGS SOVEREIGN DEFENSE PALETTE) */}
          <BlogSection />

          {/* AUTHENTIC INDOWINGS INSTAGRAM SHOWCASE */}
          <InstagramSection />

          {/* KEY ASSOCIATIONS & ENTERPRISE CLIENTS (CONTINUOUS SCROLLING LOOP) */}
          <TrustedBy />

          {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
          <FaqSection onOpenDemo={handleOpenDemoWithProduct} />

          {/* SHIELD AI STYLE FOOTER (WITH INDOWINGS SOVEREIGN DEFENSE AESTHETICS & GIANT WATERMARK) */}
          <Footer 
            onOpenDemo={() => handleOpenDemoWithProduct('')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigate={navigateTo}
          />
        </>
      )}

      {/* GLOBAL POPUPS */}
      <DemoModal 
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        initialDrone={activeProduct}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

