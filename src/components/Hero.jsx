import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const slidesData = [
  { id: 0, type: 'video', src: '/assets/indo-hero-video.mp4', label: '01' },
  { id: 1, type: 'image', src: '/assets/indo-tarmac.jpg', label: '02' },
  { id: 2, type: 'image', src: '/assets/indo-crew.jpg', label: '03' },
  { id: 3, type: 'image', src: '/assets/indo-cockpit.png', label: '04' },
  { id: 4, type: 'image', src: '/assets/indo-vtol.jpg', label: '05' }
];

export default function Hero({ triggerAnim = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const isScrollingRef = useRef(false);
  const brandContainerRef = useRef(null);
  const lettersRef = useRef([]);

  const totalSlides = slidesData.length;

  // AUTO SCROLL TIMER: Increased duration to 20 seconds for a relaxed, cinematic pace
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 20000);
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

  // MANUAL KEYBOARD NAVIGATION: Optional Arrow keys
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
      {/* Background Media Stack */}
      <div className="qs-media-stack">
        {slidesData.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`qs-slide ${currentSlide === idx ? 'active' : ''}`}
          >
            {slide.type === 'video' ? (
              <video
                ref={idx === 0 ? videoRef : null}
                className="qs-media"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/assets/indo-cockpit.png"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={slide.src} 
                alt={`IndoWings Aerospace - ${slide.label}`}
                className="qs-media" 
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            )}
          </div>
        ))}
        <div className="qs-top-vignette" aria-hidden="true" />
      </div>

      {/* Vertical Slider Navigation */}
      <div 
        className="qs-vertical-slider"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        onClick={() => setCurrentSlide((currentSlide + 1) % totalSlides)}
        title="Click to advance slide"
        role="button"
        aria-label="Advance slide"
        tabIndex={0}
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

      {/* Brand Title Bar */}
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
