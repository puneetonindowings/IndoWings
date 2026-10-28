import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionManifesto() {
  const manifestoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll scrub on the hangar background image
      gsap.fromTo(
        '.iw-manifesto-bg-img',
        { scale: 1.08, y: -25 },
        {
          scale: 1,
          y: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      );

      // Headline and paragraphs reveal
      gsap.fromTo(
        '.iw-manifesto-headline',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-manifesto-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        ['.iw-manifesto-p-lead', '.iw-manifesto-p-sub'],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-manifesto-paragraphs',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, manifestoRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={manifestoRef}
      className="iw-manifesto-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
            <div className="iw-manifesto-bg-wrapper">
        <img
          src="/assets/indo-hangar-manifesto.jpg"
          alt="IndoWings Autonomous Defense Aircraft & Tactical UAV Hangar"
          className="iw-manifesto-bg-img"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* CINEMATIC SHADOW GRADIENT TO PROTECT TEXT READABILITY ON LEFT */}
        <div className="iw-manifesto-gradient-overlay" aria-hidden="true" />
        <div className="iw-manifesto-bottom-fade" aria-hidden="true" />

        {/* ANTI-THEFT SHIELD */}
        <div 
          className="iw-manifesto-shield" 
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* LOWER-LEFT ASYMMETRIC CONTENT STACK (STAGGERED EDITORIAL LAYOUT) */}
      <div className="iw-manifesto-content">
        <div className="iw-manifesto-text-block">
          
          {/* HEADING: EXACT TWO-LINE RHYTHM */}
          <h2 className="iw-manifesto-headline">
            IndoWings deploys AI-enabled<br className="iw-br-desktop" />
            precision mass at scale.
          </h2>

          {/* PARAGRAPHS: STAGGERED / INDENTED OFFSET RELATIVE TO HEADING */}
          <div className="iw-manifesto-paragraphs">
            <p className="iw-manifesto-p-lead">
              Indo Wings Private Limited is India's fastest growing drone & anti-drone manufacturer of Advanced Unmanned Aerial Vehicles (UAVs) & Anti-UAV systems — setting benchmark standards in aerospace technology and sovereign defense.
            </p>

            <p className="iw-manifesto-p-sub">
              Our expert-led R&D team develops tactical surveillance UAVs, heavy-payload platforms, and anti-drone defense grids. Technical experts in GIS solutions for multiple sectors, highly inspired and driven by the iconic Make in India initiative to empower defense and industry with sovereign AI.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
