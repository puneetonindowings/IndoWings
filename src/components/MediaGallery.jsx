import React, { useState } from 'react';

const mediaItems = [
  {
    id: 'gnt-noida',
    category: 'defense',
    channel: 'GNT / Aaj Tak',
    title: 'डिफेंस सेक्टर में ड्रोन का बढ़ता दखल',
    description: 'Special national report on IndoWings tactical UAV systems and indigenous military aerospace manufacturing.',
    duration: '06:42',
    thumbnail: '/assets/indo-crew.jpg'
  },
  {
    id: 'tech-tak-agri',
    category: 'agri',
    channel: 'Tech Tak / Aaj Tak',
    title: '20-30 लीटर दवा स्प्रे कर सकता है ड्रोन',
    description: 'Field demonstration of high-payload agricultural drone precision spray and terrain radar.',
    duration: '04:15',
    thumbnail: '/assets/indo-vtol.jpg'
  },
  {
    id: 'krishi-mela',
    category: 'agri',
    channel: 'Doordarshan Krishi',
    title: 'कृषि सुनहरा: IndoWings Modern Fleet',
    description: 'Showcasing AI-empowered drone mapping and multispectral crop analysis for Indian agriculture.',
    duration: '05:20',
    thumbnail: '/assets/indo-tarmac.jpg'
  },
  {
    id: 'drone-expo',
    category: 'interviews',
    channel: 'National Drone Expo',
    title: 'Founders on Make-in-India Drone Innovation',
    description: 'Executive interview on sovereign aerospace R&D and indigenous tactical airframe manufacturing.',
    duration: '08:10',
    thumbnail: '/assets/indowings-preview.jpg'
  },
  {
    id: 'studio-interview',
    category: 'interviews',
    channel: 'Zee Business',
    title: 'Precision Agriculture & Strategic GIS Revolution',
    description: 'Industry dialogue on how proprietary GIS solutions empower enterprise survey and national infrastructure.',
    duration: '07:35',
    thumbnail: '/assets/indowings-hangar-helsing.jpg'
  },
  {
    id: 'ndtv-anti-drone',
    category: 'defense',
    channel: 'NDTV India',
    title: 'NDTV Special: Anti-Drone Radar & Airspace Shield',
    description: 'Testing the SKYctrl counter-drone ecosystem: AESA radar tracking and directional RF interception.',
    duration: '09:18',
    thumbnail: '/assets/indowings-ucav-europa.jpg'
  }
];

const featuredNetworks = [
  'NDTV', 'Aaj Tak', 'Good News Today', 'Doordarshan', 'Zee Business', 'CNBC-TV18', 'The Economic Times', 'Tech Tak'
];

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredItems = activeTab === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeTab);

  return (
    <section 
      id="media" 
      className="iw-media-min-section"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* SUBTLE DEFENSE GRID BACKGROUND */}
      <div className="iw-media-min-grid" aria-hidden="true" />
      <div className="iw-media-min-ambient" aria-hidden="true" />

      <div className="iw-media-min-container">
        
        {/* MINIMAL HEADER */}
        <div className="iw-media-min-header">
          <div className="iw-media-min-badge">
            <span className="iw-media-square-icon" />
            <span className="iw-media-badge-text">MEDIA GALLERY</span>
          </div>

          <h2 className="iw-media-min-title">
            Journey Through Our Multimedia Showcase
          </h2>

          {/* CLEAN, MINIMAL TEXT TABS */}
          <div className="iw-media-min-tabs">
            <button
              type="button"
              className={`iw-media-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <span className="iw-media-tab-sep">/</span>
            <button
              type="button"
              className={`iw-media-tab-btn ${activeTab === 'defense' ? 'active' : ''}`}
              onClick={() => setActiveTab('defense')}
            >
              Defense & Tactical
            </button>
            <span className="iw-media-tab-sep">/</span>
            <button
              type="button"
              className={`iw-media-tab-btn ${activeTab === 'agri' ? 'active' : ''}`}
              onClick={() => setActiveTab('agri')}
            >
              Agriculture & GIS
            </button>
            <span className="iw-media-tab-sep">/</span>
            <button
              type="button"
              className={`iw-media-tab-btn ${activeTab === 'interviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('interviews')}
            >
              Interviews
            </button>
          </div>
        </div>

        {/* CLEAN, SOPHISTICATED 3-COLUMN VIDEO GRID */}
        <div className="iw-media-min-grid-layout">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="iw-media-min-card"
              onClick={() => setSelectedVideo(item)}
              role="button"
              tabIndex={0}
            >
              <div className="iw-media-min-thumb-box">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="iw-media-min-img"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
                <div className="iw-media-min-thumb-shade" />

                {/* Minimal Frosted Play Button */}
                <div className="iw-media-min-play-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </div>

                <span className="iw-media-min-duration">{item.duration}</span>
              </div>

              <div className="iw-media-min-content">
                <span className="iw-media-min-channel">{item.channel}</span>
                <h3 className="iw-media-min-card-title">{item.title}</h3>
                <p className="iw-media-min-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ULTRA-MINIMAL "OFFICIALLY FEATURED ON" STRIP */}
        <div className="iw-media-min-featured">
          <span className="iw-media-featured-label">We are Officially Featured on</span>
          
          <div className="iw-media-min-ticker">
            <div className="iw-media-ticker-inner">
              {featuredNetworks.concat(featuredNetworks).map((name, i) => (
                <span key={`${name}-${i}`} className="iw-ticker-item">
                  <span className="iw-ticker-dot">•</span>
                  <span className="iw-ticker-text">{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* MINIMAL VIDEO PREVIEW MODAL */}
      {selectedVideo && (
        <div className="iw-min-modal-backdrop" onClick={() => setSelectedVideo(null)}>
          <div className="iw-min-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="iw-min-modal-top">
              <span className="iw-min-modal-channel">{selectedVideo.channel}</span>
              <button 
                type="button" 
                className="iw-min-modal-close" 
                onClick={() => setSelectedVideo(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="iw-min-modal-video-wrap">
              <video 
                src="/assets/indo-hero-video.mp4" 
                controls 
                autoPlay 
                className="iw-min-modal-video"
              />
            </div>

            <div className="iw-min-modal-bottom">
              <h4 className="iw-min-modal-title">{selectedVideo.title}</h4>
              <p className="iw-min-modal-desc">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
