import React, { useState } from 'react';
import './ContactForm.css';

export default function ContactForm({ showNotification }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

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
    <section id="contact-form-section" className="contact-form-section theme-reddish">
      <div className="container">

        {/* Section Header */}
        <div className="contact-form-header">
          <div className="contact-form-header-left">
            <span className="contact-form-sec-num">09 /</span>
            <h2 className="contact-form-sec-title">GET IN TOUCH</h2>
          </div>
          <p className="contact-form-header-desc">
            Submit a message directly. I usually respond within 24 hours to discuss architecture, layout, or product scopes.
          </p>
        </div>

        {/* Form Grid */}
        <div className="contact-form-grid">

          {/* Informational Text Column */}
          <div className="contact-form-info-col">
            <h3 className="form-info-title">COLLABORATION INQUIRIES</h3>
            <p className="form-info-text">
              Have an idea for a high-performance web app, a complex API backend, or interactive interface designs? Drop a line and let's turn ideas into digital products.
            </p>
            <div className="form-info-details">
              <span className="info-detail-label">LOCATION</span>
              <span className="info-detail-val">Varanasi, India</span>
            </div>
            <div className="form-info-details">
              <span className="info-detail-label">Email</span>
              <span className="info-detail-val">9ritik.kumar@gmail.com</span>
            </div>
          </div>

          {/* Actual Form Column */}
          <div className="contact-form-card-col">
            <form onSubmit={handleSubmit} className="actual-contact-form">
              <div className="form-input-group">
                <label htmlFor="form-name" className="form-input-label">FULL NAME</label>
                <input
                  type="text"
                  id="form-name"
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
                <label htmlFor="form-email" className="form-input-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  id="form-email"
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
                <label htmlFor="form-message" className="form-input-label">YOUR MESSAGE</label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell me about your project, timeline, and scope..."
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
    </section>
  );
}
