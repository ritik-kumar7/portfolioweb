import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ onConverseClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('cover');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionIds = ['cover', 'manifesto', 'experience', 'works', 'projects', 'skills', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section occupies the active middle portion of the screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className={`navbar-container ${scrolled ? 'scrolled' : 'on-hero'} ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="navbar-inner">
          <a href="#cover" className="navbar-logo-link" onClick={(e) => { e.preventDefault(); scrollToSection('cover'); setMenuOpen(false); }}>
            <img src="/logo2.png" alt="Ritik Kumar Logo" className="navbar-logo" onError={(e) => { e.target.style.display = 'none'; }} />
          </a>

          {/* Desktop links */}
          <div className="navbar-links">
            <a 
              href="#manifesto" 
              className={`navbar-link ${activeSection === 'manifesto' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('manifesto'); }}
            >
              <span className="link-num">01</span> Manifesto
            </a>
            <a 
              href="#experience" 
              className={`navbar-link ${activeSection === 'experience' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
            >
              <span className="link-num">02</span> Journey
            </a>
            <a 
              href="#works" 
              className={`navbar-link ${activeSection === 'works' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('works'); }}
            >
              <span className="link-num">03</span> Selected Works
            </a>
            <a 
              href="#skills" 
              className={`navbar-link ${activeSection === 'skills' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
            >
              <span className="link-num">04</span> Expertise
            </a>
            <a 
              href="#projects" 
              className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            >
              <span className="link-num">05</span> Projects
            </a>
            <a 
              href="#about" 
              className={`navbar-link ${activeSection === 'about' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              <span className="link-num">06</span> Profile
            </a>
          </div>

          <div className="navbar-cta-wrapper">
            <a
              href="#contact"
              className={`navbar-cta-btn ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onConverseClick(); }}
              data-cursor-text="TALK"
            >
              LET'S CONVERSE
            </a>
          </div>

          {/* Hamburger Menu Icon */}
          <button 
            className={`navbar-burger ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlay Drawer */}
      <div className={`navbar-mobile-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-overlay-links">
          <a 
            href="#manifesto" 
            className={`mobile-link ${activeSection === 'manifesto' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('manifesto'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">01 /</span> Manifesto
          </a>
          <a 
            href="#experience" 
            className={`mobile-link ${activeSection === 'experience' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('experience'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">02 /</span> Journey
          </a>
          <a 
            href="#works" 
            className={`mobile-link ${activeSection === 'works' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('works'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">03 /</span> Selected Works
          </a>
          <a 
            href="#skills" 
            className={`mobile-link ${activeSection === 'skills' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('skills'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">04 /</span> Expertise
          </a>
          <a 
            href="#projects" 
            className={`mobile-link ${activeSection === 'projects' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">05 /</span> Projects
          </a>
          <a 
            href="#about" 
            className={`mobile-link ${activeSection === 'about' ? 'active' : ''}`} 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); setMenuOpen(false); }}
          >
            <span className="mobile-link-num">06 /</span> Profile
          </a>

          <div className="mobile-cta-wrapper">
            <a 
              href="#contact" 
              className={`mobile-cta-btn ${activeSection === 'contact' ? 'active' : ''}`} 
              onClick={(e) => { e.preventDefault(); onConverseClick(); setMenuOpen(false); }}
            >
              LET'S CONVERSE
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
