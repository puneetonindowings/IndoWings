import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('IndoWings Portal Authentication: Access link sent to ' + email);
    onClose();
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
            <div>
              <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '2px' }}>
                INDOWINGS PORTAL
              </div>
              <h2 className="iw-modal-title">Sign In to Dashboard</h2>
            </div>
            <button type="button" className="iw-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="iw-form-field">
              <label>Enterprise Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  required 
                  className="iw-input" 
                  placeholder="operator@indowings.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="iw-form-field">
              <label>Access Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  required 
                  className="iw-input" 
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="iw-submit-btn">
              <span>Authenticate &amp; Enter</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
