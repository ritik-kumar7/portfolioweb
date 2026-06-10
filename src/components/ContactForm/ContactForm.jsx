import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm({ showNotification }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Split section title into characters for 3D flip-roll
    const titleSplit = new SplitType('.contact-form-sec-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'ctf-title-char'
    });

    const ctx = gsap.context(() => {
      // Header Animations
      gsap.fromTo(
        '.contact-form-sec-num',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        titleSplit.chars,
        { 
          rotationX: -90, 
          y: '50%', 
          opacity: 0, 
          transformOrigin: 'top center' 
        },
        {
          rotationX: 0,
          y: '0%',
          opacity: 1,
          stagger: 0.04,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-form-sec-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.contact-form-header-desc',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-header-desc',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Columns Entry
      gsap.fromTo(
        '.contact-form-info-col',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-info-col',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.contact-form-card-col',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-card-col',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stagger form input fields & button inside card
      gsap.fromTo(
        '.form-input-group, .contact-form-submit-btn',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.actual-contact-form',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.revert();
    };
  }, []);

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
    <section id="contact-form-section" className="contact-form-section theme-reddish" ref={sectionRef}>
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
