import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Authentic IndoWings Instagram Reels scraped directly from live www.indowings.com
const INSTAGRAM_POSTS = [
  {
    id: 'reel-1',
    title: 'Surveillance',
    subtitle: 'Autonomous Perimeter Security',
    video: '/assets/insta/reel-1.mp4',
    url: 'https://www.instagram.com/p/DcxdkEDNj87/',
    ariaLabel: 'View Indo Wings Surveillance Drone Technology Reel on Instagram'
  },
  {
    id: 'reel-2',
    title: 'Target Tracking',
    subtitle: 'Edge-AI Computer Vision',
    video: '/assets/insta/reel-2.mp4',
    url: 'https://www.instagram.com/p/Dccx4AWNPDq/',
    ariaLabel: 'View Indo Wings Target Locking & Tracking Reel on Instagram'
  },
  {
    id: 'reel-3',
    title: 'Police Expo',
    subtitle: 'Cyberone Tactical Lineup',
    video: '/assets/insta/reel-3.mp4',
    url: 'https://www.instagram.com/p/DctJVlwNz_Q/',
    ariaLabel: 'View Indo Wings Police Expo Showcase Reel on Instagram'
  },
  {
    id: 'reel-4',
    title: 'Aerial Solutions',
    subtitle: 'Enterprise Survey & Mapping',
    video: '/assets/insta/reel-4.mp4',
    url: 'https://www.instagram.com/p/DdLz1JhtBcy/',
    ariaLabel: 'View Indo Wings Aerial Solutions Reel on Instagram'
  },
  {
    id: 'reel-5',
    title: 'Built for the Future',
    subtitle: 'Next-Gen Sovereign Aerospace',
    video: '/assets/insta/reel-5.mp4',
    url: 'https://www.instagram.com/p/DcS8S8DNBtb/',
    ariaLabel: 'View Indo Wings Built for the Future Reel on Instagram'
  }
];

export default function InstagramSection() {
  const sectionRef = useRef(null);
  const tilesWrapperRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  // Track active reel on horizontal touch scroll
  const handleScroll = () => {
    if (!tilesWrapperRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tilesWrapperRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const card = tilesWrapperRef.current.querySelector('.iw-insta-tile');
    const stride = card ? card.offsetWidth + 12 : 210;
    const idx = Math.min(
      INSTAGRAM_POSTS.length - 1,
      Math.max(0, Math.round(scrollLeft / stride))
    );
    setActiveIndex(idx);
  };

  const scrollByAmount = (direction) => {
    if (!tilesWrapperRef.current) return;
    const card = tilesWrapperRef.current.querySelector('.iw-insta-tile');
    const stride = card ? card.offsetWidth + 12 : 210;
    tilesWrapperRef.current.scrollBy({
      left: direction * stride,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (index) => {
    if (!tilesWrapperRef.current) return;
    const cards = tilesWrapperRef.current.querySelectorAll('.iw-insta-tile');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      setActiveIndex(index);
    }
  };

  // Ensure videos autoplay muted safely across modern browser policies
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy handled safely
          });
        }
      }
    });
  }, []);

  // Smooth entrance animation matching BlogSection & ProductShowcase
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.iw-insta-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.iw-insta-tile',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-insta-tiles-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="instagram-showcase" 
      ref={sectionRef}
      className="iw-insta-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="iw-insta-inner">
        {/* MINIMAL EDITORIAL HEADER WITH AMPLE CLEARANCE */}
        <header className="iw-insta-header">
          <div className="iw-insta-header-left">
            <div className="iw-insta-eyebrow">
              <span className="iw-insta-pulse-dot" />
              <span>FOLLOW OUR JOURNEY</span>
            </div>
            <h2 className="iw-insta-title">IndoWings on Instagram</h2>
          </div>

          <a 
            href="https://www.instagram.com/indowings.uav/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="iw-insta-follow-btn"
            aria-label="Follow IndoWings on Instagram"
          >
            <Instagram size={16} strokeWidth={2.2} />
            <span>@indowings.uav</span>
            <ArrowUpRight size={15} strokeWidth={2.2} className="iw-insta-btn-arrow" />
          </a>
        </header>

        {/* 5 VERTICAL REEL CARDS WITH SMOOTH MOBILE SCROLL */}
        <div 
          ref={tilesWrapperRef}
          className="iw-insta-tiles-wrapper"
          onScroll={handleScroll}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {INSTAGRAM_POSTS.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                className={`iw-insta-tile ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                {/* 9:16 REEL VIDEO BACKGROUND */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="iw-insta-video"
                />

                {/* CINEMATIC SHADE & VIGNETTE */}
                <div className="iw-insta-shade" />

                {/* TOP BAR: FROSTED INSTAGRAM BADGE */}
                <div className="iw-insta-tile-top">
                  <div className="iw-insta-badge-circle" title="Open Reel on Instagram">
                    <Instagram size={15} strokeWidth={2.3} />
                  </div>
                </div>

                {/* BOTTOM INFO OVERLAY */}
                <div className="iw-insta-tile-bottom">
                  <span className="iw-insta-tile-subtitle">{item.subtitle}</span>
                  <div className="iw-insta-tile-headline-row">
                    <h3 className="iw-insta-tile-title">{item.title}</h3>
                    <div className="iw-insta-view-icon">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* SUBTLE BORDER HIGHLIGHT */}
                <div className="iw-insta-border-glow" />
              </a>
            );
          })}
        </div>

        {/* MOBILE CAROUSEL CONTROLS: PROGRESS PILLS & ARROWS */}
        <div className="iw-insta-controls-mobile">
          <div className="iw-insta-dots" role="tablist" aria-label="Reel selector">
            {INSTAGRAM_POSTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToCard(i)}
                className={`iw-insta-dot ${activeIndex === i ? 'is-active' : ''}`}
                aria-label={`Go to reel ${i + 1}`}
              />
            ))}
          </div>

          <div className="iw-insta-nav-arrows">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              className="iw-insta-arrow-btn"
              aria-label="Previous reel"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              className="iw-insta-arrow-btn"
              aria-label="Next reel"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
