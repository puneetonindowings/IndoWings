import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MissionManifesto from './components/MissionManifesto.jsx';
import ProductShowcase from './components/ProductShowcase.jsx';
import FeaturedOn from './components/FeaturedOn.jsx';
import BlogSection from './components/BlogSection.jsx';
import Footer from './components/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import LoginModal from './components/LoginModal.jsx';
import Preloader from './components/Preloader.jsx';
import CyberoneLitePage from './components/CyberoneLitePage.jsx';
import CyberoneTrainerPage from './components/CyberoneTrainerPage.jsx';
import CyberoneProPage from './components/CyberoneProPage.jsx';
import CyberoneMaxPage from './components/CyberoneMaxPage.jsx';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState('');
  const [isReadyForHeroAnim, setIsReadyForHeroAnim] = useState(false);
  
  // Routing state: 'home' | 'cyberone-lite' | 'cyberone-trainer' | 'cyberone-pro' | 'cyberone-max'
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
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
    return 'home';
  });

  // Sync route on hash/popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('cyberone-trainer') || path.includes('cyberone-trainer')) {
        setCurrentRoute('cyberone-trainer');
      } else if (hash.includes('cyberone-lite') || path.includes('cyberone-lite')) {
        setCurrentRoute('cyberone-lite');
      } else if (hash.includes('cyberone-pro') || path.includes('cyberone-pro') || hash.includes('cyberonepro') || path.includes('cyberonepro')) {
        setCurrentRoute('cyberone-pro');
      } else if (hash.includes('cyberone-max') || path.includes('cyberone-max') || hash.includes('cyberonemax') || path.includes('cyberonemax')) {
        setCurrentRoute('cyberone-max');
      } else {
        setCurrentRoute('home');
      }
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
    if (route === 'cyberone-trainer') {
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
        e.target.closest('.iw-footer-section') ||
        e.target.closest('.iw-header') ||
        e.target.closest('.iw-c1-page') ||
        e.target.closest('.indo-pro-page') ||
        e.target.closest('.indo-max-page') ||
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
      {currentRoute === 'cyberone-max' ? (
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
          <Navbar 
            onOpenDemo={(drone) => handleOpenDemoWithProduct(drone || '')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectAntiDrone={() => handleOpenDemoWithProduct('SKYctrl C-UAS')}
            onNavigate={navigateTo}
          />
          <Preloader onExitStart={() => setIsReadyForHeroAnim(true)} />
          <Hero triggerAnim={isReadyForHeroAnim} />
          <MissionManifesto 
            onOpenDemo={handleOpenDemoWithProduct}
          />
          <ProductShowcase 
            onOpenDemo={handleOpenDemoWithProduct}
            onNavigate={navigateTo}
          />
          <FeaturedOn />
          <BlogSection />
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

