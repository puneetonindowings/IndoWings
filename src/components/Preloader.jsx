import React, { useState, useEffect } from 'react';

/**
 * Preloader / Intro splash screen
 */
export default function Preloader({ onExitStart }) {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'visible' | 'exiting' | 'done'

  useEffect(() => {
    // Lock scrolling during splash animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1. Reveal logo with subtle scale & crisp opacity
    const enterTimer = setTimeout(() => {
      setPhase('visible');
    }, 60);

    // 2. Start graceful exit (fade out logo & background) after 1.4 seconds
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
      if (onExitStart) onExitStart();
    }, 1400);

    // 3. Remove completely from DOM after transition completes (800ms exit transition)
    const doneTimer = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = originalOverflow || '';
    }, 2250);

    // Allow user to click anywhere to skip/fast-forward
    const handleSkip = () => {
      setPhase('exiting');
      if (onExitStart) onExitStart();
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = originalOverflow || '';
      }, 350);
    };

    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('click', handleSkip, { once: true });

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('keydown', handleSkip);
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div 
      className={`iw-preloader-overlay ${phase === 'exiting' ? 'iw-preloader-exit' : ''}`}
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div 
        className={`iw-preloader-content ${
          phase === 'visible' ? 'iw-preloader-content-show' : ''
        } ${phase === 'exiting' ? 'iw-preloader-content-exit' : ''}`}
      >
        <div className="iw-preloader-logo-wrapper">
          <img 
            src="/assets/indowing-light.png" 
            alt="IndoWings" 
            className="iw-preloader-logo"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
