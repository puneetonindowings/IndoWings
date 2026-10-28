import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Authentic IndoWings Instagram Reels (Scraped from official @indowings.uav)
const REELS_DATA = [
  {
    id: 'reel-1',
    title: 'Perimeter Surveillance',
    category: 'Autonomous Security',
    video: '/assets/insta/reel-1.mp4',
    url: 'https://www.instagram.com/p/DcxdkEDNj87/',
    ariaLabel: 'Watch IndoWings Autonomous Surveillance Reel on Instagram'
  },
  {
    id: 'reel-2',
    title: 'Target Tracking',
    category: 'Edge-AI Computer Vision',
    video: '/assets/insta/reel-2.mp4',
    url: 'https://www.instagram.com/p/Dccx4AWNPDq/',
    ariaLabel: 'Watch IndoWings Target Locking Reel on Instagram'
  },
  {
    id: 'reel-3',
    title: 'Police Expo Showcase',
    category: 'Cyberone Tactical Lineup',
    video: '/assets/insta/reel-3.mp4',
    url: 'https://www.instagram.com/p/DctJVlwNz_Q/',
    ariaLabel: 'Watch IndoWings Police Expo Showcase Reel on Instagram'
  },
  {
    id: 'reel-4',
    title: 'Aerial Solutions',
    category: 'Enterprise Survey & Mapping',
    video: '/assets/insta/reel-4.mp4',
    url: 'https://www.instagram.com/p/DdLz1JhtBcy/',
    ariaLabel: 'Watch IndoWings Aerial Solutions Reel on Instagram'
  },
  {
    id: 'reel-5',
    title: 'Built for Tomorrow',
    category: 'Sovereign Aerospace',
    video: '/assets/insta/reel-5.mp4',
    url: 'https://www.instagram.com/p/DcS8S8DNBtb/',
    ariaLabel: 'Watch IndoWings Built for Tomorrow Reel on Instagram'
  }
];

export default function InstagramSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  // Autoplay videos safely muted
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    });
  }, []);

  // Track active reel on horizontal touch scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const card = trackRef.current.querySelector('.iw-reel-card');
    const stride = card ? card.offsetWidth + 12 : 210;
    const idx = Math.min(
      REELS_DATA.length - 1,
      Math.max(0, Math.round(scrollLeft / stride))
    );
    setActiveIndex(idx);
  };

  const scrollToReel = (index) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.iw-reel-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      setActiveIndex(index);
    }
  };

  // Smooth entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.iw-reels-header',
        { y: 24, opacity: 0 },
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
        '.iw-reel-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-reels-track',
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
      className="iw-reels-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="iw-reels-inner">
        {/* EDITORIAL MINIMAL HEADER */}
        <header className="iw-reels-header">
          <div className="iw-reels-title-wrap">
            <span className="iw-reels-eyebrow">FIELD DISPATCHES</span>
            <h2 className="iw-reels-title">IndoWings in Action</h2>
          </div>

          <a 
            href="https://www.instagram.com/indowings.uav/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="iw-reels-insta-link"
            aria-label="Follow IndoWings on Instagram"
          >
            <Instagram size={15} strokeWidth={2.2} />
            <span>@indowings.uav</span>
            <ArrowUpRight size={14} strokeWidth={2.4} className="iw-reels-link-arrow" />
          </a>
        </header>

        {/* 5 MINIMAL PORTRAIT VIDEO CARDS */}
        <div 
          ref={trackRef}
          className="iw-reels-track"
          onScroll={handleScroll}
        >
          {REELS_DATA.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className="iw-reel-card"
            >
              {/* Continuous Auto-looping Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="iw-reel-video"
              />

              {/* Filmic Soft Bottom Vignette for Typography Legibility */}
              <div className="iw-reel-vignette" />

              {/* Minimalist Corner Instagram Glyph */}
              <div className="iw-reel-badge" title="Watch on Instagram">
                <Instagram size={13} strokeWidth={2.2} />
              </div>

              {/* Essential Card Caption (No Clutter) */}
              <div className="iw-reel-caption">
                <span className="iw-reel-category">{item.category}</span>
                <div className="iw-reel-title-row">
                  <h3 className="iw-reel-name">{item.title}</h3>
                  <div className="iw-reel-arrow">
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* STORY-STYLE SEGMENTED PROGRESS LINE (MOBILE ONLY) */}
        <div className="iw-reels-story-bar" aria-label="Reel navigation">
          {REELS_DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToReel(i)}
              className={`iw-reels-story-segment ${activeIndex === i ? 'is-active' : ''}`}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
