import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic client and enterprise partners from official indowings.com
const TRUSTED_CLIENTS = [
  { id: 'tata', name: 'TATA Group', src: '/assets/clients/tata.svg' },
  { id: 'adani', name: 'Adani Group', src: '/assets/clients/adani.svg' },
  { id: 'iai', name: 'Israel Aerospace Industries (IAI)', src: '/assets/clients/iai.svg' },
  { id: 'ongc', name: 'ONGC', src: '/assets/clients/ongc.svg' },
  { id: 'cel', name: 'Central Electronics Limited (CEL)', src: '/assets/clients/cel.svg' },
  { id: 'coal-india', name: 'Coal India Limited', src: '/assets/clients/coal-india.svg' },
  { id: 'rmr', name: 'Ministry of Railways', src: '/assets/clients/rmr.svg' },
  { id: 'nabl', name: 'NABL India', src: '/assets/clients/nabl.svg' },
  { id: 'cll', name: 'Confederation of Indian Industry (CII)', src: '/assets/clients/cll.svg' },
  { id: 'daybes', name: 'Daybest', src: '/assets/clients/daybes.svg' },
  { id: 'vantage', name: 'Vantage Security', src: '/assets/clients/vantage.svg' },
  { id: 'nayara', name: 'Nayara Energy', src: '/assets/clients/nayara.svg' },
  { id: 'assac', name: 'Assam State Space Applications Centre', src: '/assets/clients/assac.svg' },
  { id: 'ala', name: 'ALA Aerospace', src: '/assets/clients/ala.svg' }
];

export default function TrustedBy() {
  const sectionRef = useRef(null);

  // Triple the array for a completely seamless, infinite continuous loop
  const loopClients = [...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.iw-trusted-eyebrow', '.iw-trusted-title', '.iw-trusted-subtitle'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.iw-trusted-marquee-wrapper',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
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
      id="trusted-by"
      ref={sectionRef}
      className="iw-trusted-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      aria-label="Organizations and Partners Trusted By IndoWings"
    >
      <div className="iw-trusted-container">
        {/* EDITORIAL HEADER */}
        <header className="iw-trusted-header">
          <div className="iw-trusted-eyebrow">
            <span className="iw-trusted-pulse-dot" />
            <span>ENTERPRISE & PUBLIC SECTOR TIE-UPS</span>
          </div>

          <h2 className="iw-trusted-title">
            Trusted By
          </h2>

          <p className="iw-trusted-subtitle">
            With strong leadership and deep connections in the private & public sector in India, IndoWings is associated with various key associations across industry.
          </p>
        </header>

        {/* CONTINUOUS MARQUEE LOOP ROW WITH DUAL-EDGE FADE */}
        <div className="iw-trusted-marquee-wrapper">
          {/* LEFT & RIGHT AMBIENT EDGE FADES */}
          <div className="iw-trusted-fade-left" aria-hidden="true" />
          <div className="iw-trusted-fade-right" aria-hidden="true" />

          {/* INFINITE RUNNING TRACK */}
          <div className="iw-trusted-track">
            {loopClients.map((client, index) => (
              <div 
                key={`${client.id}-${index}`}
                className="iw-trusted-card"
                title={client.name}
              >
                <img 
                  src={client.src} 
                  alt={`${client.name} partner logo`}
                  className="iw-trusted-img"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
