import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoModal({ isOpen, onClose, initialDrone }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    drone: initialDrone || 'Cyberone Pro',
    message: ''
  });

  React.useEffect(() => {
    if (initialDrone) {
      setFormData(prev => ({ ...prev, drone: initialDrone }));
    }
  }, [initialDrone]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="iw-modal-backdrop" onClick={onClose}>
        <motion.div 
          className="iw-modal-box"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="iw-modal-header">
            <h2 className="iw-modal-title">Request a Live Demo</h2>
            <button type="button" className="iw-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>Demo Request Received</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Our technical flight operations team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="iw-form-field">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  className="iw-input" 
                  placeholder="Col. Rajesh Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="iw-form-field">
                <label>Official Email *</label>
                <input 
                  type="email" 
                  required 
                  className="iw-input" 
                  placeholder="rajesh@defense.gov.in"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="iw-form-field">
                <label>Contact Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  className="iw-input" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="iw-form-field">
                <label>Select Drone Platform *</label>
                <select 
                  className="iw-select"
                  value={formData.drone}
                  onChange={e => setFormData({ ...formData, drone: e.target.value })}
                >
                  <option value="Cyberone Trainer Drone">Cyberone Trainer Drone</option>
                  <option value="Cyberone Lite">Cyberone Lite</option>
                  <option value="Cyberone Pro">Cyberone Pro</option>
                  <option value="Cyberone Max">Cyberone Max</option>
                  <option value="E-Series Pro (Agri)">E-Series Pro (Agricultural Drone)</option>
                  <option value="S-Series Pro (Agri)">S-Series Pro (Agricultural Drone)</option>
                  <option value="Anti-Drone Counter-UAS System">Anti-Drone Counter-UAS System</option>
                </select>
              </div>

              <div className="iw-form-field">
                <label>Deployment Requirements</label>
                <textarea 
                  rows="3" 
                  className="iw-textarea" 
                  placeholder="Outline mission type, location, and preferred demo timeline..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="iw-submit-btn">
                <span>Submit Demo Request</span>
                <Send size={15} />
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
