import React, { useState, useEffect } from 'react';
import './ContactModal.css';

export default function ContactModal({ onClose, showNotification }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://portfolioback-sj8p.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showNotification('Success!', 'Message sent successfully.', 'success');
        setFormData({ name: '', email: '', message: '' });
        // Smoothly close after a short delay
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        const data = await response.json().catch(() => ({}));
        showNotification('Error', data.message || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error', 'An error occurred. Please try again later.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div
        className="contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          className="contact-modal-close-btn"
          onClick={onClose}
          aria-label="Close contact modal"
          data-cursor-text="CLOSE"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="contact-modal-content">
          <div className="contact-modal-header">
            <span className="contact-modal-lbl">START A CONVERSATION</span>
            <h3 className="contact-modal-title">LET'S CONVERSE</h3>
            <p className="contact-modal-desc">
              Have a project in mind or want to sync up? Fill in the details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-modal-form">
            <div className="form-input-group">
              <label htmlFor="modal-name" className="form-input-label">FULL NAME</label>
              <input
                type="text"
                id="modal-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Raj Kumar"
                className="contact-text-input"
                disabled={submitting}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="modal-email" className="form-input-label">EMAIL ADDRESS</label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. raj@gmail.com"
                className="contact-text-input"
                disabled={submitting}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="modal-message" className="form-input-label">YOUR MESSAGE</label>
              <textarea
                id="modal-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Tell me about your project or inquiry..."
                className="contact-textarea-input"
                disabled={submitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-form-submit-btn"
              disabled={submitting}
              data-cursor-text={submitting ? "SENDING..." : "SEND"}
            >
              {submitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
