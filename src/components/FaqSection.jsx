import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Authentic IndoWings FAQs extracted directly from official indowings.com
const FAQS = [
  {
    id: 'faq-1',
    question: 'Why go with Indowings instead of another drone company in India?',
    answer: "Because we manufacture — we're not just assembling parts and slapping a badge on it. As an Indian drone manufacturer offering genuine enterprise drone solutions and customized UAV manufacturing, we back that up with industry-specific engineering and support that's still there a year after you bought the drone. That's usually the deciding factor for our government and enterprise clients."
  },
  {
    id: 'faq-2',
    question: 'What kinds of commercial and industrial drones do you build?',
    answer: "Surveillance drones, agricultural drones, mapping drones, inspection drones, VTOL UAVs, multirotor drones, fixed-wing drones, anti-drone systems, and a few AI-enabled aerial products for government and enterprise clients. As a customized UAV manufacturer, we don't just sell off a catalog — the goal is to match the platform to the job, whether that's a commercial drone for daily inspection runs or an industrial drone built for something far more demanding."
  },
  {
    id: 'faq-3',
    question: 'Which industries actually use Indowings drones?',
    answer: "More than people expect. We build drone solutions for agriculture, mining, and infrastructure inspection, alongside dedicated setups like a drone for railways, smart cities, and oil & gas work. GIS mapping, construction, power transmission, renewable energy, telecom, disaster response — if it involves inspecting or mapping something hard to reach, there's probably an enterprise drone application for it already."
  },
  {
    id: 'faq-4',
    question: 'Can your drones handle land surveying, GIS mapping, and aerial inspections?',
    answer: "Yes, that's actually one of our stronger areas. Think of it as a GIS mapping drone and aerial survey drone rolled into one — built for land surveying work like topographic mapping, corridor mapping, DTM and DSM generation, and volumetric survey calculations. Drone inspection here means the kind of accuracy engineering teams can actually make decisions on. Survey consultants, mining companies, and government agencies are regular customers for exactly this reason."
  },
  {
    id: 'faq-5',
    question: 'Do you make agricultural drones for spraying and precision farming?',
    answer: "We do. Our agricultural drone lineup covers crop spraying and precision farming use cases — a fertilizer spraying drone, pesticide spraying drone, and farm monitoring setups that track crop health over the season, not just at spray time. Most farmers who switch to drone spraying report less labor, less time in the field, and better coverage than doing it by hand or with old-style equipment."
  },
  {
    id: 'faq-6',
    question: 'Are your drones DGCA compliant?',
    answer: "Our platforms are built as DGCA compliant drones with commercial drone regulations in India in mind, but exact drone compliance and certification depend on the category, payload, and operational profile. That's a conversation, not a checkbox. Our team sits down with customers and walks through drone approvals and permissions before anything takes off."
  },
  {
    id: 'faq-7',
    question: 'Is there software and fleet management alongside the hardware?',
    answer: "There is. Drone software, fleet management software, mission planning software, inspection software, and aerial mapping software, backed by AI drone analytics for data processing. It's meant to work together as one cohesive system rather than a drone plus a bunch of separate tools you have to stitch together yourself."
  },
  {
    id: 'faq-8',
    question: 'What happens after I buy — training, installation, support?',
    answer: "We don't disappear after the sale. Drone pilot training, installation, preventive maintenance, drone AMC contracts, software updates, and 24/7 technical support whenever something needs attention — that's the after-sales support advantage of buying directly from an Indian manufacturer instead of a reseller."
  },
  {
    id: 'faq-9',
    question: 'How do I pick the right drone for my use case?',
    answer: "It really comes down to your industry, payload capacity, endurance requirement, the environment you're flying in, and regulatory classification. Whether you need a drone for surveying, agriculture, or an industrial inspection platform, the UAV selection process should start with the mission, not the spec sheet. Reach out to our team directly — we'll evaluate your mission requirements first and recommend hardware second."
  },
  {
    id: 'faq-10',
    question: 'Can I see a live drone demo before committing to a purchase?',
    answer: "Yes, and honestly we'd rather you did. A live drone demo tells you more in twenty minutes than any spec sheet will — flight performance, payload feeds, software, all of it in action. Reach out to book a live demonstration and our engineering team will set one up around what you're actually evaluating."
  },
  {
    id: 'faq-11',
    question: 'How do I get a quotation or set up a consultation?',
    answer: "Easiest way is our enquiry form, or call our team directly as a sovereign drone manufacturer in India ready to talk specifics. Tell us your mission parameters, request drone pricing, and our aerospace consultants will return with an engineered recommendation and a tailored quote."
  }
];

export default function FaqSection({ onOpenDemo }) {
  const sectionRef = useRef(null);
  // First item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.iw-faq-eyebrow', '.iw-faq-title', '.iw-faq-subtitle'],
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
        '.iw-faq-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.iw-faq-list',
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
      id="faq" 
      ref={sectionRef}
      className="iw-faq-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      aria-label="Frequently Asked Questions about IndoWings Drones"
    >
      <div className="iw-faq-container">
        {/* EDITORIAL HEADER */}
        <header className="iw-faq-header">
          <div className="iw-faq-eyebrow">
            <span className="iw-faq-pulse-dot" />
            <span>KNOWLEDGE BASE & GUIDELINES</span>
          </div>

          <h2 className="iw-faq-title">
            Frequently Asked Questions
          </h2>

          <p className="iw-faq-subtitle">
            Everything you need to know about our sovereign aerospace manufacturing, DGCA certifications, payload capabilities, and enterprise support.
          </p>
        </header>

        {/* ACCORDION LIST */}
        <div className="iw-faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={faq.id}
                className={`iw-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="iw-faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="iw-faq-question-text">{faq.question}</span>
                  <div className={`iw-faq-toggle-circle ${isOpen ? 'is-active' : ''}`}>
                    {isOpen ? (
                      <Minus size={16} strokeWidth={2.4} />
                    ) : (
                      <Plus size={16} strokeWidth={2.4} />
                    )}
                  </div>
                </button>

                <div 
                  id={`faq-answer-${faq.id}`}
                  className="iw-faq-answer-collapse"
                  style={{
                    maxHeight: isOpen ? '350px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                >
                  <div className="iw-faq-answer-body">
                    <p className="iw-faq-answer-text">{faq.answer}</p>
                    
                    {faq.id === 'faq-10' && (
                      <button
                        type="button"
                        onClick={() => onOpenDemo && onOpenDemo('Flight Demo')}
                        className="iw-faq-action-link"
                      >
                        <span>Schedule a Live Drone Demo</span>
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HELP & DIRECT CONTACT BANNER */}
        <div className="iw-faq-footer-banner">
          <div className="iw-faq-footer-content">
            <span className="iw-faq-footer-tag">HAVE A SPECIFIC REQUIREMENT?</span>
            <h3 className="iw-faq-footer-title">Talk to our Aerospace Defense Engineers</h3>
            <p className="iw-faq-footer-sub">
              Reach out directly for custom payload integration, DGCA clearances, or bulk fleet procurement.
            </p>
          </div>

          <div className="iw-faq-footer-actions">
            <a 
              href="mailto:connect@indowings.com"
              className="iw-faq-contact-btn email-btn"
            >
              <MessageSquare size={16} strokeWidth={2.2} />
              <span>connect@indowings.com</span>
            </a>
            <a 
              href="tel:+917669478937"
              className="iw-faq-contact-btn phone-btn"
            >
              <Phone size={15} strokeWidth={2.2} />
              <span>+91 7669478937</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
