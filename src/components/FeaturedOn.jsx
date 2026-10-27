import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_LOGOS = [
  { id: 'wion', name: 'WION News', src: '/assets/media/wion.svg' },
  { id: 'gadgets360', name: 'Gadgets 360 NDTV', src: '/assets/media/gadgets360.svg' },
  { id: 'cxotoday', name: 'CXOtoday.com', src: '/assets/media/cxotoday.svg' },
  { id: 'dataquest', name: 'Dataquest', src: '/assets/media/dataquest.svg' },
  { id: 'kisantak', name: 'Kisan Tak', src: '/assets/media/kisantak.svg' },
  { id: 'krishijagran', name: 'Krishi Jagran', src: '/assets/media/krishijagran.svg' },
  { id: 'ndtv', name: 'NDTV News', src: '/assets/media/ndtv.svg' },
  { id: 'takeone', name: 'Take One Digital', src: '/assets/media/takeone.svg' }
];

export default function FeaturedOn() {
  const sectionRef = useRef(null);
  // Duplicate for seamless 100% infinite marquee loop
  const marqueeList = [...FEATURED_LOGOS, ...FEATURED_LOGOS, ...FEATURED_LOGOS];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.iw-featured-title', '.iw-featured-subtitle'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.iw-featured-marquee-wrapper',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="featured" 
      ref={sectionRef}
      className="iw-featured-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* BACKGROUND AMBIENT GRADIENTS & TECHNICAL GRID */}
      <div className="iw-featured-grid" aria-hidden="true" />
      <div className="iw-featured-glow" aria-hidden="true" />

      {/* HEADER: WE ARE OFFICIALLY FEATURED ON */}
      <div className="iw-featured-header">
        <h2 className="iw-featured-title">
          WE ARE OFFICIALLY FEATURED ON
        </h2>

        <p className="iw-featured-subtitle">
          Leading national publications, defense technology networks, and broadcast media tracking IndoWings aerospace innovation.
        </p>
      </div>

      {/* FLOATING LOGO MARQUEE TRACK */}
      <div className="iw-featured-marquee-wrapper">
        <div className="iw-featured-marquee-track">
          {marqueeList.map((logo, index) => {
            // Apply slight staggered floating animation delay to each card
            const floatDelay = `${(index % 8) * 0.4}s`;
            return (
              <div 
                key={`${logo.id}-${index}`}
                className="iw-floating-logo-card"
                style={{ animationDelay: floatDelay }}
                title={logo.name}
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="iw-floating-logo-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
