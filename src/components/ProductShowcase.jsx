import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const droneFleet = [
  {
    id: 'cyberone-trainer-drone',
    categoryKey: 'surveillance',
    categoryName: 'Surveillance, Mapping & Delivery Drone',
    name: 'Cyberone Trainer Drone',
    tagline: 'Dual-pilot remote training UAV',
    image: '/assets/landing-products/cyberone-trainer.webp',
    url: 'https://www.indowings.com/products/cyberone-trainer-drone.php'
  },
  {
    id: 'cyberone-lite',
    categoryKey: 'surveillance',
    categoryName: 'Surveillance, Mapping & Delivery Drone',
    name: 'Cyberone Lite',
    tagline: 'Rapid-deployment tactical scout UAV',
    image: '/assets/landing-products/cyberone-lite.webp',
    url: 'https://www.indowings.com/products/cyberone-lite.php'
  },
  {
    id: 'cyberone-pro',
    categoryKey: 'surveillance',
    categoryName: 'Surveillance, Mapping & Delivery Drone',
    name: 'Cyberone Pro',
    tagline: 'Tactical battlefield surveillance',
    image: '/assets/landing-products/cyberone-pro.webp',
    url: 'https://www.indowings.com/products/cyberonepro_v2.php'
  },
  {
    id: 'cyberone-max',
    categoryKey: 'surveillance',
    categoryName: 'Surveillance, Mapping & Delivery Drone',
    name: 'Cyberone Max',
    tagline: 'Heavy-lift logistics & delivery UAV',
    image: '/assets/landing-products/cyberone-max.webp',
    url: 'https://www.indowings.com/products/cyberonemax.php'
  },
  {
    id: 'e-series-pro',
    categoryKey: 'agriculture',
    categoryName: 'Agricultural Drone',
    name: 'E-Series Pro',
    tagline: 'Intelligent plant protection & spraying',
    image: '/assets/landing-products/e-series-pro.webp',
    url: 'https://www.indowings.com/products/e-seriespro.php'
  },
  {
    id: 's-series-pro',
    categoryKey: 'agriculture',
    categoryName: 'Agricultural Drone',
    name: 'S-Series Pro',
    tagline: 'Multispectral crop health mapping',
    image: '/assets/landing-products/s-series-pro.webp',
    url: 'https://www.indowings.com/products/s-seriespro.php'
  }
];

export default function ProductShowcase({ onOpenDemo, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);

  const filteredProducts = droneFleet.filter(
    p => activeCategory === 'all' || p.categoryKey === activeCategory
  );

  // GSAP SCROLLTRIGGER HARDWARE-ACCELERATED SMOOTH ZOOM EFFECT
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.iw-product-hero-slide');
      const mm = gsap.matchMedia();

      // DESKTOP: Full cinematic zoom scrub
      mm.add("(min-width: 769px)", () => {
        slides.forEach((slide) => {
          const img = slide.querySelector('.iw-product-media-img');
          if (img) {
            gsap.fromTo(
              img,
              { scale: 0.92 },
              {
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                  invalidateOnRefresh: true
                }
              }
            );
          }
        });
      });

      // MOBILE: Restrained subtle zoom so drone stays 100% centered inside screen
      mm.add("(max-width: 768px)", () => {
        slides.forEach((slide) => {
          const img = slide.querySelector('.iw-product-media-img');
          if (img) {
            gsap.fromTo(
              img,
              { scale: 0.97 },
              {
                scale: 1.03,
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                  invalidateOnRefresh: true
                }
              }
            );
          }
        });
      });

      // Text details reveal
      slides.forEach((slide) => {
        const infoBlock = slide.querySelector('.iw-product-info-block');
        if (infoBlock) {
          const elements = infoBlock.children;
          gsap.fromTo(
            elements,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: slide,
                start: 'top 70%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeCategory]);

  return (
    <div className="iw-products-showcase-container" id="products" ref={containerRef}>
      
            {filteredProducts.map((prod, idx) => (
        <section
          key={prod.id}
          id={prod.id}
          className="iw-product-hero-slide"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          {/* BACKGROUND MEDIA CONTAINER WITH SCROLL-ZOOM EXPANSION */}
          <div className="iw-product-media-wrapper">
            <img
              src={prod.image}
              alt={prod.name}
              className="iw-product-media-img"
              loading="lazy"
              decoding="async"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />

            {/* CINEMATIC CONTRAST GRADIENTS */}
            <div className="iw-product-gradient-overlay" aria-hidden="true" />
            <div className="iw-product-vignette" aria-hidden="true" />

            {/* ANTI-THEFT MEDIA SHIELD */}
            <div
              className="iw-product-shield"
              aria-hidden="true"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* LOWER-LEFT PRODUCT DETAILS (CLEAN MINIMALIST EXACT REPLICA) */}
          <div className="iw-product-info-block">
            <span className="iw-product-cat-label">{prod.categoryName}</span>
            <h2 className="iw-product-title">{prod.name}</h2>
            <p className="iw-product-tagline">{prod.tagline}</p>

            {prod.id === 'cyberone-trainer-drone' ? (
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('cyberone-trainer');
                  else window.location.hash = '#/products/cyberone-trainer-drone';
                }}
                className="iw-product-learn-btn"
                id={`btn-learn-${prod.id}`}
              >
                Learn more
              </button>
            ) : prod.id === 'cyberone-lite' ? (
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('cyberone-lite');
                  else window.location.hash = '#/products/cyberone-lite';
                }}
                className="iw-product-learn-btn"
                id={`btn-learn-${prod.id}`}
              >
                Learn more
              </button>
            ) : prod.id === 'cyberone-pro' ? (
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('cyberone-pro');
                  else window.location.hash = '#/products/cyberone-pro';
                }}
                className="iw-product-learn-btn"
                id={`btn-learn-${prod.id}`}
              >
                Learn more
              </button>
            ) : prod.id === 'cyberone-max' ? (
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('cyberone-max');
                  else window.location.hash = '#/products/cyberone-max';
                }}
                className="iw-product-learn-btn"
                id={`btn-learn-${prod.id}`}
              >
                Learn more
              </button>
            ) : (
              <a
                href={prod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="iw-product-learn-btn"
                id={`btn-learn-${prod.id}`}
              >
                Learn more
              </a>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
