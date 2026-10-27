import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Official IndoWings Blog Posts retrieved directly from https://www.indowings.com/blog/blog.php
const FEATURED_STORY = {
  date: '21/10/2026',
  title: 'FPV vs GPS Drones: Key Differences, Applications & Advantages',
  excerpt: 'Discover key differences between FPV and GPS drones, including flight control dynamics, autonomous navigation, mapping, and mission capabilities.',
  image: '/assets/blog/article37.png',
  url: 'https://www.indowings.com/blog/fpv-vs-gps-drones.php'
};

const SPLIT_STORIES = [
  {
    part: 'PT — 01/02',
    title: 'From FPV Racing to Critical Missions',
    image: '/assets/blog/article36.png',
    url: 'https://www.indowings.com/blog/evolution-of-ready-to-fly-fpv-drones.php'
  },
  {
    part: 'PT — 02/02',
    title: 'Counter-Terrorism & Security Operations',
    image: '/assets/blog/article33.png',
    url: 'https://www.indowings.com/blog/uavs-counter-terrorism-security-operations.php'
  }
];

export default function BlogSection() {
  const blogRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.iw-blog-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: blogRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.iw-blog-featured-hero',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-blog-featured-hero',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.iw-blog-split-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-blog-dual-split-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, blogRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="news-insights" 
      ref={blogRef}
      className="iw-blog-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="iw-blog-inner">
                <header className="iw-blog-header">
          <h2 className="iw-blog-title">News & Insights</h2>

          <a 
            href="https://www.indowings.com/blog/blog.php" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="iw-blog-all-articles-link"
          >
            <span>All Articles</span>
            <svg className="iw-blog-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </header>

                <div className="iw-blog-featured-hero">
          <div className="iw-blog-featured-content">
            <span className="iw-blog-date">{FEATURED_STORY.date}</span>

            <h3 className="iw-blog-featured-headline">
              <a 
                href={FEATURED_STORY.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="iw-blog-headline-link"
              >
                {FEATURED_STORY.title}
              </a>
            </h3>

            <p className="iw-blog-featured-desc">
              {FEATURED_STORY.excerpt}
            </p>

            <a 
              href={FEATURED_STORY.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="iw-blog-read-btn"
            >
              <span>Read More</span>
              <svg className="iw-blog-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          <a 
            href={FEATURED_STORY.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="iw-blog-featured-media"
          >
            <img 
              src={FEATURED_STORY.image} 
              alt={FEATURED_STORY.title}
              className="iw-blog-hero-img"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </a>
        </div>

                <div className="iw-blog-dual-split-section">
          {SPLIT_STORIES.map((story, idx) => (
            <article key={idx} className="iw-blog-split-card">
              {/* Header: Title on Left, Read More on Right */}
              <div className="iw-blog-split-header">
                <h4 className="iw-blog-split-heading">{story.title}</h4>

                <a 
                  href={story.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="iw-blog-split-link"
                >
                  <span>Read More</span>
                  <svg className="iw-blog-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>

              {/* Dividing hairline */}
              <div className="iw-blog-split-divider" />

              {/* Cinematic Visual with PT — 01/02 Overlay */}
              <a 
                href={story.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="iw-blog-split-media"
              >
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="iw-blog-split-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                
                <div className="iw-blog-split-watermark">
                  {story.part}
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
