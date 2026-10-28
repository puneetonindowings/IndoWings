import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const slidesData = [
  { id: 0, type: 'video', src: '/assets/cyberone-max/strick-video.mp4', label: '01' },
  { id: 1, type: 'image', src: '/assets/cyberone-max/cyberonemax-hero-uhd.jpg', label: '02' },
  { id: 2, type: 'image', src: '/assets/cyberone-trainer/trainer-hero-hd.jpg', label: '03' },
  { id: 3, type: 'image', src: '/assets/cyberone-pro/cyberonepro4.avif', label: '04' },
  { id: 4, type: 'image', src: '/assets/cyberone-lite/lite-hero-hd.jpg', label: '05' }
];

export default function Hero({ triggerAnim = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const isScrollingRef = useRef(false);
  const brandContainerRef = useRef(null);
  const lettersRef = useRef([]);

  const totalSlides = slidesData.length;

  // AUTO SCROLL TIMER: 18 seconds for relaxed cinematic pace
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 18000);
    return () => clearInterval(timer);
  }, [totalSlides, currentSlide]);

  // Video playback management on slide change & viewport visibility
  useEffect(() => {
    let isIntersecting = true;

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (!isIntersecting && videoRef.current) {
        videoRef.current.pause();
      } else if (isIntersecting && currentSlide === 0 && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, { threshold: 0.1 });

    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    if (currentSlide === 0 && isIntersecting) {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => observer.disconnect();
  }, [currentSlide]);

  // MANUAL KEYBOARD NAVIGATION: Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // GSAP: Staggered slide-up & fade-in from bottom triggered when preloader begins exiting
  useEffect(() => {
    const validLetters = lettersRef.current.filter(Boolean);
    if (!validLetters.length) return;

    if (!triggerAnim) {
      gsap.set(validLetters, { yPercent: 110, opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validLetters,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.05,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    }, brandContainerRef);

    return () => ctx.revert();
  }, [triggerAnim]);

  const activeNumber = slidesData[currentSlide].label;

  return (
    <section 
      className="qs-hero-container" 
      id="hero"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      
      {/* FULLSCREEN PRISTINE MEDIA STACK (PROTECTED AGAINST DRAG & THEFT) */}
      <div className="qs-media-stack">
        
        {/* SLIDE 0: AUTHENTIC INDOWINGS TACTICAL UAV VIDEO */}
        <div className={`qs-slide ${currentSlide === 0 ? 'active' : ''}`}>
          <video
            ref={videoRef}
            className="qs-media"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/cyberone-max/cyberonemax-hero-uhd.jpg"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src="/assets/cyberone-max/strick-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* SLIDE 1: CYBERONE MAX HEAVY LIFT */}
        <div className={`qs-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <img 
            src="/assets/cyberone-max/cyberonemax-hero-uhd.jpg" 
            alt="IndoWings Cyberone Max Heavy-Lift UAV" 
            className="qs-media" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* SLIDE 2: CYBERONE TRAINER FIELD UAV */}
        <div className={`qs-slide ${currentSlide === 2 ? 'active' : ''}`}>
          <img 
            src="/assets/cyberone-trainer/trainer-hero-hd.jpg" 
            alt="IndoWings Cyberone Trainer Remote Pilot UAV" 
            className="qs-media" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* SLIDE 3: CYBERONE PRO TACTICAL SURVEILLANCE */}
        <div className={`qs-slide ${currentSlide === 3 ? 'active' : ''}`}>
          <img 
            src="/assets/cyberone-pro/cyberonepro4.avif" 
            alt="IndoWings Cyberone Pro Tactical Surveillance UAV" 
            className="qs-media" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* SLIDE 4: CYBERONE LITE AGILE SCOUT */}
        <div className={`qs-slide ${currentSlide === 4 ? 'active' : ''}`}>
          <img 
            src="/assets/cyberone-lite/lite-hero-hd.jpg" 
            alt="IndoWings Cyberone Lite Tactical Scout UAV in Flight" 
            className="qs-media" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* TRANSPARENT PROTECTIVE SHIELD: Blocks direct drag & download to other tabs/browsers */}
        <div 
          className="qs-media-shield"
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        ></div>

      </div>

      {/* EXACT QUANTUM SYSTEMS VERTICAL IN-PAGE SLIDER (SCREENSHOT 1: c-in-page-nav) */}
      <div 
        className="qs-vertical-slider"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        onClick={() => setCurrentSlide((currentSlide + 1) % totalSlides)}
        title="Click or Scroll to Change Slide"
      >
        <div className="qs-slider-track">
          <div 
            className="qs-slider-fill"
            style={{ 
              height: `${100 / totalSlides}%`, 
              top: `${(currentSlide / totalSlides) * 100}%` 
            }}
          ></div>
        </div>
        <span className="qs-slider-number">{activeNumber}</span>
      </div>

      {/* HELSING.AI STYLE FULL-WIDTH HERO BRAND (EXACT IMAGE 2 REPLICA + GSAP SLIDE-UP ANIMATION) */}
      <div 
        className="iw-hero-helsing-container" 
        ref={brandContainerRef}
        aria-label="INDOWINGS"
      >
        <div className="iw-hero-helsing-row">
          {'INDOWINGS'.split('').map((char, idx) => (
            <span 
              key={idx} 
              ref={(el) => (lettersRef.current[idx] = el)}
              className="iw-helsing-char"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
