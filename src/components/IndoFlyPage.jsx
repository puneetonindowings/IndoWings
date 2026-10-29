import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Crosshair,
  Shield,
  Eye,
  Radio,
  Sliders,
  Cpu,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Activity,
  Wifi,
  Zap,
  Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Core GCS Interactive Modules Data
const GCS_MODULES = [
  {
    id: 'plan',
    title: 'Mission Planning',
    badge: 'AUTONOMOUS NAVIGATION',
    icon: Compass,
    image: '/assets/indofly/PlanWindow.png',
    headline: 'Corridor & Polygon Autonomous Path Planning',
    desc: 'Design complex multi-waypoint flight trajectories with automated terrain-following, obstacle avoidance margins, and geofence-constrained corridors.',
    highlights: [
      'Multi-waypoint grid & corridor mapping',
      'Dynamic wind & battery path optimization',
      'Geofence-constrained autonomous routing',
      'Instant 3D survey & overlap preview'
    ],
    telemetry: {
      mode: 'AUTO_NAV',
      waypoints: '128 Pts',
      turnRadius: 'Adaptive',
      failsafe: 'Auto-RTH'
    }
  },
  {
    id: 'map',
    title: 'Real-Time Map & Telemetry',
    badge: 'GEOSPATIAL SITUATIONAL AWARENESS',
    icon: Layers,
    image: '/assets/indofly/map-window.png',
    headline: 'Live Drone Positioning & Telemetry HUD',
    desc: 'Continuous real-time geospatial tracking with live telemetry feeds, dynamic altitude profiles, airspeed vectors, and multi-layer satellite terrain overlays.',
    highlights: [
      'Live dual-GPS positioning with <0.5m drift',
      'Multi-layer satellite, hybrid & offline street maps',
      'Full HUD telemetry overlay (Groundspeed, Pitch, Roll, Yaw)',
      'Real-time distance-to-home & horizon vectors'
    ],
    telemetry: {
      gpsLock: '3D Fix (24 Sat)',
      latency: '< 45ms',
      refreshRate: '50 Hz',
      linkQuality: '99.8%'
    }
  },
  {
    id: 'video',
    title: 'Live Sensor & AI Stream',
    badge: 'EDGE-AI LOW LATENCY FEED',
    icon: Eye,
    image: '/assets/indofly/VideoWindow.png',
    headline: 'Low-Latency HD RTSP Video & Sensor Fusion',
    desc: 'Integrated sensor viewing console supporting simultaneous RGB optical streams, thermal sensor matrices, and dynamic target identification overlays.',
    highlights: [
      'Sub-50ms ultra-low latency RTSP / H.265 stream',
      'Picture-in-Picture (PiP) optical & thermal view',
      'Real-time HUD reticles with coordinates overlay',
      'Instant target distance calculation & pin-drop'
    ],
    telemetry: {
      codec: 'H.265 / HEVC',
      resolution: '4K @ 60fps',
      streamDelay: '38ms',
      thermalMatrix: '640x512'
    }
  },
  {
    id: 'safety',
    title: 'Safety & Failsafe Logic',
    badge: 'MIL-SPEC FAILSAFE ARCHITECTURE',
    icon: Shield,
    image: '/assets/indofly/SafetyWindow.png',
    headline: 'Fail-Safe Decision Engine & Boundary Guard',
    desc: 'Mission-critical autonomous safety engine providing automatic Return-To-Home, emergency safe landing zone calculation, and hardened electronic boundary confinement.',
    highlights: [
      'Multi-tier geofence containment with hard ceiling',
      'Voltage-adaptive Return-To-Home trigger thresholds',
      'Loss-of-link auto-reconnect & fallback loiter logic',
      'Parachute deployment & motor kill authority'
    ],
    telemetry: {
      rthAltitude: '100m AGL',
      batteryReserve: '22% Margin',
      linkTimeout: '3.0 sec',
      status: 'ARMED'
    }
  }
];

// Tactical AI & Sensor Intelligence Cards
const AI_CAPABILITIES = [
  {
    id: 'detection',
    badge: 'COMPUTER VISION',
    title: 'Edge-AI Detection',
    desc: 'Deep-learning neural models detect, classify, and draw predictive bounding boxes around personnel, vehicles, and assets in real time.',
    image: '/assets/indofly/human-detection.jpg',
    tag: 'REAL-TIME OBJECT ID',
    specs: ['Human & Vehicle Classification', 'Low-latency on-edge inferencing', 'Dynamic confidence metrics']
  },
  {
    id: 'tracking',
    badge: 'AUTONOMOUS SLEW',
    title: 'Smart Optical Tracking',
    desc: 'Intelligent motion estimation algorithms automatically lock onto designated targets and smoothly actuate the gimbal to maintain continuous visual track.',
    image: '/assets/indofly/ai-tracking.jpg',
    tag: 'LOCK-ON TRACKING',
    specs: ['Optical flow motion prediction', 'Adaptive occlusion recovery', 'Continuous gimbal slaving']
  },
  {
    id: 'thermal',
    badge: 'ZERO-VISIBILITY SENSING',
    title: '13-Palette Thermal Vision',
    desc: 'Seamless thermal camera management with White Hot, Black Hot, Ironbow, and Rainbow palettes for night, dense smoke, and tactical foliage penetration.',
    icon: Zap,
    tag: 'THERMAL RADIOMETRIC',
    specs: ['13 contrast-tuned palettes', 'High-contrast thermal isolation', 'Works through dense fog & night']
  },
  {
    id: 'lrf',
    badge: 'TACTICAL TELEMETRY',
    title: 'Laser Rangefinder (LRF)',
    desc: 'Sub-meter precision distance measurement feeds calculated target coordinates and elevation directly into map layers and targeting crosshairs.',
    icon: Target,
    tag: 'SUB-METER TARGETING',
    specs: ['Real-time slant distance calculation', 'Instant GPS coordinate projection', 'Direct HUD telemetry reticle']
  }
];

// Engineering Configuration Data
const CONFIG_MODULES = [
  {
    title: 'Unified Drone Setup',
    subtitle: 'Pre-flight Avionics Configuration',
    image: '/assets/indofly/DroneSetupWindow.png',
    desc: 'Configure essential airframe parameters, radio data communication links, motor thrust verification, and smart power management through a single consolidated console.',
    items: [
      'Airframe profile loading for optimal aerodynamic performance',
      'Dual-band telemetry radio link & channel binding',
      'Dynamic motor test sequencing & balance verification',
      'Smart battery discharge & capacity management'
    ]
  },
  {
    title: 'Precision Sensor Calibration',
    subtitle: 'Systemic Sensor Tuning & Zeroing',
    image: '/assets/indofly/CalibrationWindow.png',
    desc: 'Achieve sub-degree flight stability across extreme operational environments with comprehensive on-screen sensor calibration and real-time health verification.',
    items: [
      '6-axis IMU, gyroscope & accelerometer tuning',
      'Magnetic compass declination & interference mapping',
      'Barometric altitude zeroing & pressure calibration',
      'Live real-time attitude feedback & health diagnostics'
    ]
  }
];

// Technical Specifications Matrix
const TECH_SPECS = [
  { label: 'Supported Platforms', value: 'Multi-Rotor, Fixed-Wing, VTOL (Cyberone Series, E-Series, S-Series)' },
  { label: 'Operating Systems', value: 'Windows 10 / 11 (64-bit), Ubuntu LTS, Android Companion (IndoFly Mobile)' },
  { label: 'Communication Protocol', value: 'MAVLink v2.0, Microhard, Silvus SC4200/4400, Encrypted LTE / 5G' },
  { label: 'Video Streaming', value: 'RTSP / UDP / H.264 / H.265 with sub-50ms glass-to-glass latency' },
  { label: 'AI Inference Engines', value: 'TensorRT / ONNX Runtime optimized on NVIDIA Jetson & High-Compute GCS' },
  { label: 'Mapping & Elevation', value: 'Offline MBTiles, GeoTIFF elevation DEM, WMS / WMTS Satellite Layers' },
  { label: 'Telemetry Export', value: 'CSV, KML, GPX, Flight Log (.bin/.tlog) with microsecond precision' }
];

// IndoFly FAQs
const INDOFLY_FAQS = [
  {
    q: 'Can IndoFly operate in completely offline, air-gapped field environments?',
    a: 'Yes. IndoFly is engineered specifically for defense and tactical field operations with 100% offline capability. Satellite base maps, elevation DEMs, and geofence data can be pre-cached locally, requiring zero internet connection during mission execution.'
  },
  {
    q: 'Which drone models are compatible with IndoFly GCS?',
    a: 'IndoFly natively controls IndoWings entire UAV portfolio—including Cyberone Max, Cyberone Pro, Cyberone Lite, Cyberone Trainer, and agricultural series—as well as standard MAVLink v2.0 compliant autonomous platforms.'
  },
  {
    q: 'How does the AI detection and optical tracking operate without cloud connectivity?',
    a: 'All computer vision neural networks run entirely on-edge (either onboard the drone or locally on the GCS workstation). Detection bounding boxes, target classification, and gimbal slew tracking happen in real time with sub-50ms latency.'
  },
  {
    q: 'What failsafe protocols does IndoFly trigger in case of radio signal loss?',
    a: 'IndoFly incorporates multi-tier autonomous safety rules. Upon telemetry link timeout, the aircraft immediately executes user-defined protocol: automated Return-to-Home at safe designated clearance altitude, orbit-and-wait, or safe terrain-aware landing.'
  },
  {
    q: 'Is IndoFly available as a mobile application for field tablets?',
    a: 'Yes. In addition to the full-featured Windows/Linux GCS workstation software, IndoFly Companion is available for rugged Android tactical tablets, providing one-click takeoff, waypoint planning, and low-latency video streaming in the field.'
  }
];

export default function IndoFlyPage({ onBack, onOpenDemo, onNavigate }) {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo(
        '.if-hero-elem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      // Hero GCS Mockup float
      gsap.fromTo(
        '.if-hero-device',
        { scale: 0.94, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.2 }
      );

      // Section titles reveal
      gsap.utils.toArray('.if-reveal-head').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const currentModule = GCS_MODULES[activeTab];

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-[#05070a] text-white selection:bg-[#f58220] selection:text-white overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOW & SUBTLE HUD GRID */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(245,130,32,0.12)_0%,rgba(5,7,10,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      </div>

      <div className="relative z-10 w-full">

        {/* 1. HERO SECTION: CINEMATIC GCS OPERATING SYSTEM */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="if-hero-elem flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest text-white/50">
            <button 
              onClick={onBack}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span>Software</span>
            <span>/</span>
            <span className="text-[#f58220]">IndoFly GCS</span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            {/* Live Operational Eyebrow */}
            <div className="if-hero-elem inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#f58220] animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-white/80">
                AUTONOMOUS FLIGHT OS // GROUND CONTROL STATION
              </span>
            </div>

            {/* Main Title */}
            <h1 className="if-hero-elem font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
              IndoFly <span className="text-[#f58220]">GCS</span>
            </h1>

            {/* Concise Mission Subtitle */}
            <p className="if-hero-elem text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Mission-ready autonomous flight control, real-time telemetry analytics, and edge-AI payload intelligence engineered for sovereign defense and industrial UAV operations.
            </p>

            {/* Quick Metrics Bar */}
            <div className="if-hero-elem grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Deployment</div>
                <div className="text-base sm:text-lg font-bold font-heading text-white">3,000+ Missions</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Video Latency</div>
                <div className="text-base sm:text-lg font-bold font-heading text-[#f58220]">&lt; 50ms RTSP</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Computer Vision</div>
                <div className="text-base sm:text-lg font-bold font-heading text-white">On-Edge AI</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Connectivity</div>
                <div className="text-base sm:text-lg font-bold font-heading text-white">100% Offline</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="if-hero-elem flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenDemo('IndoFly GCS')}
                className="px-7 py-3.5 rounded-full bg-[#f58220] hover:bg-[#ff8f33] text-black font-semibold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(245,130,32,0.35)] hover:shadow-[0_0_40px_rgba(245,130,32,0.55)] cursor-pointer flex items-center gap-2 group"
              >
                <span>Request Software Demo</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#modules"
                className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                Explore Core Modules
              </a>
            </div>
          </div>

          {/* Hero Device Mockup Presentation */}
          <div className="if-hero-device mt-12 md:mt-16 max-w-5xl mx-auto relative">
            <div className="relative rounded-2xl md:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/15 via-white/[0.03] to-transparent border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
              <div className="rounded-xl md:rounded-2xl overflow-hidden bg-black aspect-[16/10] relative flex items-center justify-center">
                <img 
                  src="/assets/indofly/indifly.png" 
                  alt="IndoFly Ground Control Station Software Suite" 
                  className="w-full h-full object-contain p-2 md:p-6"
                />
                
                {/* Tactical HUD Corner Elements */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 tracking-wider">
                  SYS: INDOFLY_GCS_V3.8 // ACTIVE
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#f58220]/70 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f58220] animate-ping" />
                  MAVLINK_V2_ENCRYPTED
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE GCS MODULES STUDIO (INTERACTIVE WORKSPACE) */}
        <section id="modules" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="if-reveal-head text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
              MISSION CONTROL MODULES
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Control Every Phase of Flight
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Integrated, modular ground control workflows built for mission planning, real-time spatial positioning, edge sensor feeds, and active failsafe safety.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {GCS_MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                    isActive 
                      ? 'bg-white/10 text-white border-[#f58220]/60 shadow-[0_0_20px_rgba(245,130,32,0.2)]' 
                      : 'bg-white/[0.03] text-white/60 border-white/10 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#f58220]' : 'text-white/50'} />
                  <span>{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Workspace Display */}
          <div className="bg-[#0b0e13] rounded-2xl md:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: High-Res Screenshot Preview with Zoom Border */}
              <div className="lg:col-span-7">
                <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black group aspect-[16/10]">
                  <img 
                    src={currentModule.image} 
                    alt={currentModule.title}
                    className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white/70 uppercase tracking-widest">
                    {currentModule.badge}
                  </div>
                </div>
              </div>

              {/* Right Column: Module Brief, Highlights & Telemetry Specs */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#f58220] uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f58220]" />
                    <span>Module 0{activeTab + 1} // {currentModule.title}</span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                    {currentModule.headline}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {currentModule.desc}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {currentModule.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                        <CheckCircle2 size={16} className="text-[#f58220] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Spec Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                  {Object.entries(currentModule.telemetry).map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">{k}</div>
                      <div className="text-xs sm:text-sm font-semibold text-white/90 font-mono mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPUTER VISION & SENSOR INTELLIGENCE (BENTO GRID) */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="if-reveal-head text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
              TACTICAL EDGE INTELLIGENCE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Driven Computer Vision
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Autonomous object identification, optical slaved tracking, and multi-spectral radiometric thermal imaging for low-visibility and night missions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {AI_CAPABILITIES.map((card) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.id}
                  className="rounded-2xl bg-[#0c0e12] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Top Image or Graphic Container */}
                  <div className="aspect-[4/3] bg-black/60 relative overflow-hidden border-b border-white/10 flex items-center justify-center">
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#f58220]/10 border border-[#f58220]/30 flex items-center justify-center text-[#f58220] mb-3">
                          {Icon && <Icon size={26} strokeWidth={2.2} />}
                        </div>
                        <span className="font-mono text-xs text-white/50 tracking-wider">RADIOMETRIC SENSOR MATRIX</span>
                      </div>
                    )}
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[9px] text-[#f58220] tracking-wider uppercase">
                      {card.tag}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                        {card.badge}
                      </div>
                      <h4 className="font-heading text-lg font-bold text-white mb-2">
                        {card.title}
                      </h4>
                      <p className="text-white/60 text-xs leading-relaxed mb-4">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-1.5">
                      {card.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-white/70">
                          <span className="w-1 h-1 rounded-full bg-[#f58220]" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PRE-FLIGHT ENGINEERING & HARDWARE TUNING (CLEAN SPLIT) */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="if-reveal-head text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
              PRE-FLIGHT AVIONICS & TUNING
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Drone Setup & Sensor Zeroing
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              A unified console for airframe parameter deployment, radio channel verification, motor testing, and precision IMU sensor calibration before mission launch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CONFIG_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#0c0e12] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#f58220] uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-[16/9] mb-6 p-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {item.items.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                        <CheckCircle2 size={16} className="text-[#f58220] flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                  <span>SUBSYSTEM CHECK: VERIFIED</span>
                  <span>AUTOTUNE READY</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNICAL SPECIFICATIONS MATRIX (CLEAN & MINIMAL) */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/[0.08]">
          <div className="if-reveal-head text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
              ARCHITECTURE & COMPATIBILITY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              IndoFly Technical Specifications
            </h2>
            <p className="text-white/60 text-sm">
              Standardized architecture engineered to operate across varied defense datalinks and rugged computing platforms.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0c0e12] border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div className="divide-y divide-white/[0.07]">
              {TECH_SPECS.map((spec, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors">
                  <span className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white/95 text-left sm:text-right font-heading max-w-md">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CURATED FAQ ACCORDION */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
          <div className="if-reveal-head text-center mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
              INQUIRIES & DEPLOYMENT
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 text-sm">
              Technical answers regarding offline operation, hardware compatibility, and deployment licensing.
            </p>
          </div>

          <div className="space-y-3">
            {INDOFLY_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#0c0e12] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="font-heading text-sm sm:text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    <span className="text-white/40 flex-shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. SOVEREIGN CTA BANNER */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#141820] to-[#090b0f] border border-[#f58220]/30 p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(245,130,32,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[radial-gradient(ellipse_at_top,rgba(245,130,32,0.25)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="font-mono text-xs tracking-widest uppercase text-[#f58220] mb-3 block">
                INTELLIGENT AUTONOMOUS FLIGHT
              </span>

              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4 uppercase">
                Ready to Deploy IndoFly on Your Fleet?
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                Connect with our aerospace software engineers for custom ground control integrations, multi-aircraft control stations, and enterprise licensing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onOpenDemo('IndoFly GCS')}
                  className="px-8 py-4 rounded-full bg-[#f58220] hover:bg-[#ff8f33] text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(245,130,32,0.4)] hover:shadow-[0_0_50px_rgba(245,130,32,0.6)] cursor-pointer flex items-center gap-2 group"
                >
                  <span>Request Live Software Demo</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onBack}
                  className="px-6 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 text-sm font-medium transition-all duration-300 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
