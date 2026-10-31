import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  ExternalLink,
  Maximize2,
  X,
  ArrowRight,
  Tv,
  Newspaper,
  Shield,
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 1. PINNED FLAGSHIP BROADCAST SHOWCASE (4 TOP NATIONAL STORIES)
// ---------------------------------------------------------------------------
const FLAGSHIP_STORIES = [
  {
    num: '01',
    tag: 'ETV BHARAT · SPECIAL INVESTIGATION',
    badge: 'NATIONAL INVESTIGATION',
    title: 'Advanced Drone Technology for Hawk-Eyed Crowd Surveillance at Maha Kumbh Mela',
    source: 'ETV Bharat',
    date: 'November 2024',
    type: 'article',
    url: 'https://www.etvbharat.com/en/!bharat/advanced-drone-technology-to-keep-a-hawk-eyed-view-of-the-crowd-during-maha-kumbh-mela-enn24110504485',
    image: '/assets/media/bharat.webp',
    stat: 'MILLIONS MONITORED',
    statLabel: 'Real-Time Crowd Security & Public Safety'
  },
  {
    num: '02',
    tag: 'NDTV GADGETS 360 · PRIME-TIME FEATURE',
    badge: 'PRIME-TIME TELEVISION',
    title: 'Indo Wings Cyber One: Brilliantly Useful? | The Gadgets 360 Show',
    source: 'NDTV Gadgets 360',
    date: 'National Television',
    type: 'youtube',
    youtubeId: 'QOa0zTUhCFo',
    image: '/assets/media/gadgets-360.webp',
    stat: 'FLAGSHIP UAV',
    statLabel: 'DGCA Type-Certified Multi-Rotor'
  },
  {
    num: '03',
    tag: 'INDIAN ARMY · NORTHERN COMMAND HQ',
    badge: 'DEFENSE SYMPOSIUM',
    title: 'IndoWings Showcases Acoustic-Silent Stealth Drone at North Tech Symposium',
    source: 'North Tech Conclave',
    date: 'Udhampur Symposium',
    type: 'youtube',
    youtubeId: '2Dezsls2EZw',
    image: '/assets/media/silent-drone.png',
    stat: 'ACOUSTIC STEALTH',
    statLabel: 'Zero-Sound Propulsion at Mission Altitude'
  },
  {
    num: '04',
    tag: 'KISAN TAK · INDIA TODAY GROUP',
    badge: 'EXECUTIVE PROFILE',
    title: 'किसानों के लिए ड्रोन बनाने के लिए छोड़ा लंदन ! Paras Jain Special Broadcast',
    source: 'Kisan Tak',
    date: 'Executive Feature',
    type: 'youtube',
    youtubeId: 'cZSWG1t6QZI',
    image: '/assets/media/kisan-tak.webp',
    stat: '100% INDIGENOUS',
    statLabel: 'Homegrown Deep-Tech Innovation'
  }
];

// ---------------------------------------------------------------------------
// 2. CURATED VISUAL ARCHIVE (CLEAN, MINIMAL, IMAGE-FIRST)
// ---------------------------------------------------------------------------
const ARCHIVE_ITEMS = [
  {
    id: 'maha-kumbh-etv',
    category: 'press',
    title: 'Advanced Drone Technology for Hawk-Eyed Crowd Surveillance at Maha Kumbh Mela',
    source: 'ETV Bharat Special',
    type: 'article',
    url: 'https://www.etvbharat.com/en/!bharat/advanced-drone-technology-to-keep-a-hawk-eyed-view-of-the-crowd-during-maha-kumbh-mela-enn24110504485',
    image: '/assets/media/bharat.webp'
  },
  {
    id: 'kisan-agro-drone',
    category: 'broadcast',
    title: 'Precision Agri-Drone Flight Demonstration & Agricultural Automation',
    source: 'Agriculture & Kisan Drones',
    type: 'youtube',
    youtubeId: 'XzTKA-PziZ4',
    image: '/assets/media/agriculture-kisan-drone.webp'
  },
  {
    id: 'channel-partner',
    category: 'broadcast',
    title: 'Join IndoWings As An Authorized UAV & Anti-UAV Channel Partner Nationwide',
    source: 'Corporate Network',
    type: 'youtube',
    youtubeId: 'kEbeRtSLj5k',
    image: '/assets/media/channel-partner.webp'
  },
  {
    id: 'indo-pacific-geo',
    category: 'defense',
    title: 'IndoWings at Indo-Pacific Geo Intelligence Forum 2024: Geospatial Sovereignty',
    source: 'Defense Summit',
    type: 'youtube',
    youtubeId: 'Z9jtu8GhwT8',
    image: '/assets/media/indo-pacific-geo-intelligence.webp'
  },
  {
    id: 'press-clipping-hindi',
    category: 'press',
    title: 'स्वदेशी ड्रोन जाएगा सीमा पार, पुलिस एक्सपो में दिखाई अपनी ताकत',
    source: 'Dainik Jagran / National Hindi Daily',
    type: 'photo',
    image: '/assets/media/1.png'
  },
  {
    id: 'tv-interview-paras',
    category: 'press',
    title: 'Paras Jain Addresses National Media on Indigenous UAV Avionics and Defense R&D',
    source: 'National Television Interview',
    type: 'photo',
    image: '/assets/media/4.png'
  },
  {
    id: 'press-clipping-english',
    category: 'press',
    title: 'Pioneering Commercial and Defense UAV Avionics in India: Industry Spotlight',
    source: 'National Daily Business Press',
    type: 'photo',
    image: '/assets/media/2.png'
  },
  {
    id: 'drone-expo-flight',
    category: 'defense',
    title: 'Tactical UAV Live Flight Maneuvers at National Aerospace Conclave',
    source: 'Live Flight Demonstration',
    type: 'photo',
    image: '/assets/media/8.png'
  },
  {
    id: 'kisan-tak-paras',
    category: 'broadcast',
    title: 'किसानों के लिए ड्रोन बनाने के लिए छोड़ा लंदन ! Paras Jain Special Broadcast',
    source: 'Kisan Tak / India Today',
    type: 'youtube',
    youtubeId: 'cZSWG1t6QZI',
    image: '/assets/media/kisan-tak.webp'
  },
  {
    id: 'drone-exhibition-7',
    category: 'defense',
    title: 'Live Tactical Demonstration of Counter-Drone Jamming Technology',
    source: 'Defense Expo & Field Trials',
    type: 'youtube',
    youtubeId: 'TTLL89Z1gyk',
    image: '/assets/media/7.webp'
  },
  {
    id: 'ndtv-gadgets-360',
    category: 'broadcast',
    title: 'Indo Wings Cyber One: Brilliantly Useful? | The Gadgets 360 Show',
    source: 'NDTV Gadgets 360',
    type: 'youtube',
    youtubeId: 'QOa0zTUhCFo',
    image: '/assets/media/gadgets-360.webp'
  },
  {
    id: 'silent-drone-north-tech',
    category: 'defense',
    title: 'Indo Wings Pvt Ltd Showcases Silent Drone in North Tech Symposium at Udhampur',
    source: 'Northern Command Indian Army',
    type: 'youtube',
    youtubeId: '2Dezsls2EZw',
    image: '/assets/media/silent-drone.png'
  },
  {
    id: 'minister-pratap-sarangi',
    category: 'defense',
    title: 'Union Minister Pratap Chandra Sarangi Inspects IndoWings Aerospace Fleet',
    source: 'Foodpro / Ministerial Delegation',
    type: 'youtube',
    youtubeId: 'bgPwBYjYKAk',
    image: '/assets/media/maxresdefault.jpg'
  },
  {
    id: 'fasal-agri',
    category: 'broadcast',
    title: 'ADOWINGS - कम लागत में किसानों के लिए बेहतरीन ड्रोन सुविधा, जानें क्या है खास ?',
    source: 'Kisan Fasal Special',
    type: 'youtube',
    youtubeId: 'TTLL89Z1gyk',
    image: '/assets/media/fasal.webp'
  },
  {
    id: 'wholesale-facility',
    category: 'broadcast',
    title: 'Wholesale Price में Drone खरीदें और Business करें: Agro Drone Full Demand',
    source: 'Manufacturing & Commercial Fleet',
    type: 'youtube',
    youtubeId: 'r5oJqWhMvc8',
    image: '/assets/media/indowings-agri.webp'
  },
  {
    id: 'anti-drone-system',
    category: 'defense',
    title: 'SKYctrl Tactical Anti-Drone Gun: Counter-UAS Directional RF Interception',
    source: 'Counter-UAS Systems',
    type: 'youtube',
    youtubeId: 'GvwpaxOjKfE',
    image: '/assets/media/anti-drone-gun-india.webp'
  }
];

// ---------------------------------------------------------------------------
// 3. MOVING PRESS TICKER OUTLETS
// ---------------------------------------------------------------------------
const PRESS_TICKER = [
  'NDTV GADGETS 360',
  'ETV BHARAT',
  'KISAN TAK (INDIA TODAY)',
  'NORTH TECH SYMPOSIUM (INDIAN ARMY)',
  'INDO-PACIFIC GEO FORUM',
  'WION NEWS',
  'CXO TODAY',
  'DATAQUEST'
];

export default function MediaPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);

  // Pinned Flagship Broadcast sequence
  const showcasePinRef = useRef(null);
  const showcaseTriggerRef = useRef(null);
  const activeStoryRef = useRef(0);
  const [activeStory, setActiveStory] = useState(0);

  // Archive filter state: 'all' | 'broadcast' | 'press' | 'defense'
  const [filter, setFilter] = useState('all');

  // Modals for YouTube & Lightbox
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const loopTicker = [...PRESS_TICKER, ...PRESS_TICKER, ...PRESS_TICKER, ...PRESS_TICKER];

  const filteredArchive = filter === 'all'
    ? ARCHIVE_ITEMS
    : ARCHIVE_ITEMS.filter((item) => item.category === filter);

  const handleStoryTabClick = (idx) => {
    setActiveStory(idx);
    activeStoryRef.current = idx;
    if (showcaseTriggerRef.current) {
      const trigger = showcaseTriggerRef.current;
      const targetP = (idx + 0.35) / FLAGSHIP_STORIES.length;
      const targetY = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
        setActivePhotoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // GSAP SCROLLTRIGGER PINNED STORY SHOWCASE
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // PINNED SHOWCASE: Pins and scrolls through the 4 flagship stories before unpinning!
      const showcaseEl = showcasePinRef.current;
      if (showcaseEl) {
        const trigger = ScrollTrigger.create({
          trigger: showcaseEl,
          start: 'top top',
          end: '+=1600',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const scrubP = Math.min(0.999, p / 0.92);
            const newIdx = Math.min(
              FLAGSHIP_STORIES.length - 1,
              Math.floor(scrubP * FLAGSHIP_STORIES.length)
            );
            if (newIdx !== activeStoryRef.current) {
              activeStoryRef.current = newIdx;
              setActiveStory(newIdx);
            }
          }
        });
        showcaseTriggerRef.current = trigger;
      }

    }, pageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleCardClick = (item) => {
    if (item.type === 'youtube') {
      setActiveVideoModal(item);
    } else if (item.type === 'photo') {
      setActivePhotoModal(item);
    } else if (item.type === 'article' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div ref={pageRef} className="media-page-wrapper">

      {/* =========================================================================
          SECTION 1: GSAP PINNED FLAGSHIP BROADCAST SHOWCASE (DIRECT START - IMAGE 2)
          ========================================================================= */}
      <section 
        id="flagship-showcase"
        ref={showcasePinRef}
        className="about-pinned-section media-showcase-first-section"
        style={{ background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingTop: 'clamp(85px, 11vh, 110px)' }}
      >
        <div className="about-pinned-inner">

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="about-eyebrow">
              NATIONAL BROADCAST & PRESS SPOTLIGHT
            </span>
            <h2 className="about-section-title">
              Featured Coverage
            </h2>
          </div>

          {/* Story Selector Dots/Track */}
          <div className="media-showcase-nav">
            {FLAGSHIP_STORIES.map((story, idx) => (
              <button
                key={story.num}
                type="button"
                onClick={() => handleStoryTabClick(idx)}
                className={`media-showcase-pill ${activeStory === idx ? 'is-active' : ''}`}
              >
                <span>{story.num}</span>
                <span className="media-showcase-pill-source">{story.source}</span>
              </button>
            ))}
          </div>

          {/* Active Cinema Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={FLAGSHIP_STORIES[activeStory].num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="media-cinema-card"
            >
              <div className="media-cinema-grid">
                
                {/* Left: Cinema Video/Photo Stage */}
                <div 
                  className="media-cinema-visual"
                  onClick={() => handleCardClick(FLAGSHIP_STORIES[activeStory])}
                >
                  <img
                    src={FLAGSHIP_STORIES[activeStory].image}
                    alt={FLAGSHIP_STORIES[activeStory].title}
                    className="media-cinema-img"
                    draggable="false"
                  />
                  <div className="media-cinema-overlay" />

                  {/* Play Button */}
                  <div className="media-cinema-play-btn">
                    {FLAGSHIP_STORIES[activeStory].type === 'youtube' ? (
                      <div className="media-play-icon-circle">
                        <Play size={24} fill="#ffffff" color="#ffffff" style={{ marginLeft: '4px' }} />
                      </div>
                    ) : (
                      <div className="media-play-icon-circle is-article">
                        <ExternalLink size={20} color="#ffffff" />
                      </div>
                    )}
                  </div>

                  <span className="media-cinema-badge">
                    {FLAGSHIP_STORIES[activeStory].type === 'youtube' ? 'PLAY BROADCAST' : 'READ COVERAGE'}
                  </span>
                </div>

                {/* Right: Clean Editorial Narrative */}
                <div className="media-cinema-details">
                  <span className="media-cinema-tag">
                    {FLAGSHIP_STORIES[activeStory].tag}
                  </span>

                  <h3 className="media-cinema-headline">
                    {FLAGSHIP_STORIES[activeStory].title}
                  </h3>

                  {/* Highlight Stat Box */}
                  <div className="media-cinema-stat-box">
                    <div className="media-cinema-stat-val">
                      {FLAGSHIP_STORIES[activeStory].stat}
                    </div>
                    <div className="media-cinema-stat-lbl">
                      {FLAGSHIP_STORIES[activeStory].statLabel}
                    </div>
                  </div>

                  <div className="media-cinema-footer">
                    <button
                      type="button"
                      onClick={() => handleCardClick(FLAGSHIP_STORIES[activeStory])}
                      className="indo-fly-primary-btn"
                      style={{ padding: '12px 26px', fontSize: '0.92rem' }}
                    >
                      <span>
                        {FLAGSHIP_STORIES[activeStory].type === 'youtube' ? 'Watch Full Broadcast' : 'Read Full Coverage'}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                      STAGE 0{activeStory + 1} OF 04
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          ACCREDITED PRESS TICKER (SINGLE LINE MINIMALIST RUNNER)
          ========================================================================= */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#050608', overflow: 'hidden' }}>
        <div className="about-accred-marquee-wrapper">
          <div className="about-accred-marquee-track">
            {loopTicker.map((name, idx) => (
              <div key={`${name}-${idx}`} className="media-minimal-ticker-item">
                <span className="media-ticker-star">★</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MINIMAL ARCHIVE VAULT (IMAGE-FIRST, ZERO CLUTTER)
          ========================================================================= */}
      <section className="about-section" style={{ background: '#050608', padding: '4.5rem 2rem 6rem' }}>
        <div className="about-container">

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="about-eyebrow" style={{ marginBottom: '0.35rem' }}>
                MEDIA REEL & GALLERY
              </span>
              <h2 className="about-section-title">
                Broadcast & Event Vault
              </h2>
            </div>

            {/* Clean Category Filters */}
            <div className="media-clean-filters">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`media-clean-filter-btn ${filter === 'all' ? 'is-active' : ''}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter('broadcast')}
                className={`media-clean-filter-btn ${filter === 'broadcast' ? 'is-active' : ''}`}
              >
                Broadcasts
              </button>
              <button
                type="button"
                onClick={() => setFilter('press')}
                className={`media-clean-filter-btn ${filter === 'press' ? 'is-active' : ''}`}
              >
                Press
              </button>
              <button
                type="button"
                onClick={() => setFilter('defense')}
                className={`media-clean-filter-btn ${filter === 'defense' ? 'is-active' : ''}`}
              >
                Exhibitions
              </button>
            </div>
          </div>

          {/* Clean 3-Column Image-First Grid */}
          <div className="media-vault-grid">
            {filteredArchive.map((item) => (
              <div 
                key={item.id}
                className="media-vault-card"
                onClick={() => handleCardClick(item)}
              >
                <div className="media-vault-media">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="media-vault-img"
                    draggable="false"
                  />
                  <div className="media-vault-overlay" />

                  {/* Icon Indicator */}
                  <div className="media-vault-icon-badge">
                    {item.type === 'youtube' && <Play size={14} fill="#ffffff" color="#ffffff" />}
                    {item.type === 'photo' && <Maximize2 size={14} color="#ffffff" />}
                  </div>
                </div>

                <div className="media-vault-info">
                  <span className="media-vault-source">
                    {item.source}
                  </span>
                  <h3 className="media-vault-title">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MINIMAL PRESS DESK & ASSETS BANNER
          ========================================================================= */}
      <section className="about-section" style={{ background: '#000000', padding: '5rem 2rem 7rem' }}>
        <div className="about-container">

          <div className="about-banner-card" style={{ maxWidth: '960px' }}>
            <span className="about-eyebrow" style={{ color: '#ff7a1a', marginBottom: '0.5rem' }}>
              PRESS COMMUNICATIONS
            </span>

            <h2 className="about-banner-title">
              Media Inquiries & Press Kit
            </h2>

            <p className="about-banner-desc" style={{ maxWidth: '580px' }}>
              For official press statements, executive interviews with Founder Paras Jain, or verified high-resolution aerospace fleet imagery, contact our media desk.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo('Media Kit Request / Press Inquiry')}
                className="indo-fly-primary-btn"
                style={{ padding: '13px 30px', fontSize: '0.95rem' }}
              >
                <span>Request Press Kit</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('about')}
                className="indo-fly-secondary-btn"
                style={{ padding: '13px 26px', fontSize: '0.95rem' }}
              >
                <span>About IndoWings</span>
              </button>
            </div>

            {/* Direct Press Contacts */}
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'var(--font-main)'
            }}>
              <span><strong style={{ color: '#ffffff' }}>Email:</strong> connect@indowings.com</span>
              <span><strong style={{ color: '#ffffff' }}>Corporate:</strong> +91 76694 78937</span>
              <span><strong style={{ color: '#ffffff' }}>Office:</strong> Sector 63, Noida, UP</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MODAL 1: HIGH-RES YOUTUBE VIDEO PLAYER MODAL
          ========================================================================= */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="media-modal-backdrop"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="media-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="media-modal-head">
                <div>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#ff7a1a', fontWeight: 700 }}>
                    {activeVideoModal.source}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: '2px 0 0' }}>
                    {activeVideoModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="media-modal-close-btn"
                  title="Close Video"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="media-modal-video-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="media-modal-iframe"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: HIGH-RES PHOTO LIGHTBOX MODAL
          ========================================================================= */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="media-modal-backdrop"
            onClick={() => setActivePhotoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="media-modal-card"
              style={{ maxWidth: '850px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="media-modal-head">
                <div>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#ff7a1a', fontWeight: 700 }}>
                    {activePhotoModal.source}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: '2px 0 0' }}>
                    {activePhotoModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePhotoModal(null)}
                  className="media-modal-close-btn"
                  title="Close Image"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="media-lightbox-stage">
                <img
                  src={activePhotoModal.image}
                  alt={activePhotoModal.title}
                  className="media-lightbox-img"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
