import React from 'react';

export default function Footer({ onOpenDemo, onOpenLogin, onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="iw-footer-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="iw-footer-inner">
        
                <div className="iw-footer-main-grid">
          
          {/* 1. LEFT COLUMN: LOGO, CORPORATE & BENGALURU OFFICES, COMMS & SOCIALS */}
          <div className="iw-footer-left-col">
            <a href="#" className="iw-footer-logo-link" aria-label="IndoWings">
              <img 
                src="/assets/indowing-light.png" 
                alt="IndoWings" 
                className="iw-footer-logo-img"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </a>

            <div className="iw-footer-offices">
              <div className="iw-office-block">
                <h5 className="iw-office-title">Corporate Office</h5>
                <p className="iw-office-desc">
                  A-21, Sector-60, Noida, Gautam Buddha Nagar,<br />
                  (U.P.) 201301, India
                </p>
              </div>

              <div className="iw-office-block">
                <h5 className="iw-office-title">Bengaluru Office</h5>
                <p className="iw-office-desc">
                  #15, State Bank of India Road, Off Museum Road,<br />
                  Bengaluru – 560001, India
                </p>
              </div>

              <div className="iw-footer-contact-links">
                <a href="tel:18005727363" className="iw-footer-contact-item">
                  <img src="/assets/footer/call-ico.svg" alt="Call" className="iw-contact-icon" />
                  <span>1800 572 7363</span>
                </a>

                <a href="mailto:connect@indowings.com" className="iw-footer-contact-item">
                  <img src="/assets/footer/email-ico.svg" alt="Email" className="iw-contact-icon" />
                  <span>connect@indowings.com</span>
                </a>
              </div>

              {/* SOCIAL MEDIA ICONS (EXACT INDOWINGS LINKS) */}
              <div className="iw-footer-socials">
                <a href="https://www.facebook.com/Indowings.uav/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <img src="/assets/footer/facebook.svg" alt="Facebook" />
                </a>
                <a href="https://in.linkedin.com/company/indowings" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="/assets/footer/linkedin.svg" alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/indowings.uav/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src="/assets/footer/instagram.svg" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/@IndoWings_" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <img src="/assets/footer/youtube.svg" alt="YouTube" />
                </a>
              </div>

              {/* PRIVACY POLICY & TERMS */}
              <div className="iw-footer-legal-links">
                <a href="https://www.indowings.com/privacy-policy.php" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                <span className="iw-legal-sep">|</span>
                <a href="https://www.indowings.com/terms.php" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>

          {/* 2. RIGHT NAVIGATION & ACCREDITATIONS COLUMNS */}
          <div className="iw-footer-right-cols">
            
            {/* COL A: PRODUCTS */}
            <div className="iw-footer-col">
              <h5 className="iw-col-heading">Products</h5>
              <ul className="iw-col-list">
                <li>
                  <a 
                    href="#/products/cyberone-trainer-drone" 
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('cyberone-trainer');
                      }
                    }}
                  >
                    Cyberone Trainer
                  </a>
                </li>
                <li>
                  <a 
                    href="#/products/cyberone-lite" 
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('cyberone-lite');
                      }
                    }}
                  >
                    Cyberone Lite
                  </a>
                </li>
                <li>
                  <a 
                    href="#/products/cyberone-pro" 
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('cyberone-pro');
                      }
                    }}
                  >
                    Cyberone Pro
                  </a>
                </li>
                <li>
                  <a 
                    href="#/products/cyberone-max" 
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('cyberone-max');
                      }
                    }}
                  >
                    Cyberone Max
                  </a>
                </li>
                <li><a href="https://www.indowings.com/products/e-seriespro.php" target="_blank" rel="noopener noreferrer">E-Series Pro</a></li>
                <li><a href="https://www.indowings.com/products/s-seriespro.php" target="_blank" rel="noopener noreferrer">S-Series Pro</a></li>
              </ul>
            </div>

            {/* COL B: INDUSTRIES */}
            <div className="iw-footer-col">
              <h5 className="iw-col-heading">Industries</h5>
              <ul className="iw-col-list">
                <li><a href="https://www.indowings.com/industries/mapping-survey.php" target="_blank" rel="noopener noreferrer">Mapping & Survey</a></li>
                <li><a href="https://www.indowings.com/industries/forest-monitoring.php" target="_blank" rel="noopener noreferrer">Forest Monitoring</a></li>
                <li><a href="https://www.indowings.com/industries/fire-fighting-management.php" target="_blank" rel="noopener noreferrer">Fire Fighting</a></li>
                <li><a href="https://www.indowings.com/industries/disaster-management.php" target="_blank" rel="noopener noreferrer">Disaster Management</a></li>
                <li><a href="https://www.indowings.com/industries/energy-power-transmission.php" target="_blank" rel="noopener noreferrer">Energy & Power Transmission</a></li>
                <li><a href="https://www.indowings.com/industries/agriculture-industry.php" target="_blank" rel="noopener noreferrer">Agriculture</a></li>
              </ul>
            </div>

            {/* COL C: QUICK LINKS */}
            <div className="iw-footer-col">
              <h5 className="iw-col-heading">Quick Links</h5>
              <ul className="iw-col-list">
                <li><a href="https://www.indowings.com/company/about.php" target="_blank" rel="noopener noreferrer">Who We Are</a></li>
                <li><button type="button" onClick={onOpenDemo} className="iw-footer-btn-link">Our Team</button></li>
                <li><a href="https://www.indowings.com/company/media.php" target="_blank" rel="noopener noreferrer">Media</a></li>
                <li><a href="https://www.indowings.com/company/career.php" target="_blank" rel="noopener noreferrer">Careers</a></li>
                <li><button type="button" onClick={onOpenDemo} className="iw-footer-btn-link">Connect</button></li>
                <li><a href="https://www.indowings.com/become-dealer.php" target="_blank" rel="noopener noreferrer">Become a Partner</a></li>
                <li><a href="https://www.indowings.com/declaration-of-use.php" target="_blank" rel="noopener noreferrer">Educational License Form</a></li>
                <li><a href="https://www.indowings.com/blog/blog.php" target="_blank" rel="noopener noreferrer">Blog</a></li>
              </ul>
            </div>

            {/* COL D: SOFTWARE & ACCREDITATION BADGES */}
            <div className="iw-footer-col iw-footer-accreditations-col">
              <h5 className="iw-col-heading">Software</h5>
              <a href="https://www.indowings.com/products/pix4d.php" target="_blank" rel="noopener noreferrer" className="iw-pix4d-link">
                <img src="/assets/footer/pix4d-footer.webp" alt="Pix4D Partner" className="iw-pix4d-logo" />
              </a>

              {/* CERTIFICATE BADGES */}
              <div className="iw-footer-badges">
                <img src="/assets/footer/cer.png" alt="ISO Certifications" className="iw-badge-cer" />
                <img src="/assets/footer/cer1.svg" alt="Startup India / Make in India" className="iw-badge-startup" />
                <img src="/assets/footer/great-place-to-work.png" alt="Great Place To Work Certified" className="iw-badge-gptw" />
              </div>

              {/* COPYRIGHT */}
              <div className="iw-footer-copyright-text">
                Copyright © {currentYear} IndoWings. All rights reserved
              </div>
            </div>

          </div>
        </div>

                <div className="iw-footer-watermark-wrapper" aria-hidden="true">
          <span className="iw-footer-watermark-text">
            INDOWINGS<span className="iw-footer-watermark-reg">®</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
