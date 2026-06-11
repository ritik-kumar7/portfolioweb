import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

// Import Modular Components
import Loader from './components/Loader/Loader.jsx';
import CustomCursor from './components/CustomCursor/CustomCursor.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Introduction from './components/Introduction/Introduction.jsx';
import FeaturedWorks from './components/FeaturedWorks/FeaturedWorks.jsx';
import Experience from './components/Experience/Experience.jsx';
import PersonalProjects from './components/PersonalProjects/PersonalProjects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Process from './components/Process/Process.jsx';
import About from './components/About/About.jsx';
import Narrative from './components/Narrative/Narrative.jsx';
import Contact from './components/Contact/Contact.jsx';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactModal from './components/ContactModal/ContactModal.jsx';
import Notification from './components/Notification/Notification.jsx';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis scroll updates
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after elements render
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  const handleStartReveal = useCallback(() => {
    setReveal(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const showNotification = useCallback((title, message, type) => {
    setToast({ show: true, title, message, type });
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  return (
    <>
      {loading && (
        <Loader 
          onStartReveal={handleStartReveal} 
          onComplete={handleLoaderComplete} 
        />
      )}
      
      {reveal && (
        <div className="portfolio-app-wrapper">
          <CustomCursor />
          <Navbar onConverseClick={() => setShowModal(true)} />
          
          <main>
            {/* Section 1: Cover/Hero */}
            <Hero />
            
            {/* Section 2: Philosophy Manifesto */}
            <Introduction />
            
            {/* Section 3: Professional Journey Timeline */}
            <Experience />
            
            {/* Section 4: Commercial Selected Works (Videos 16:9) */}
            <FeaturedWorks />
            
            {/* Section 4: Technical Skills Index */}
            <Skills />

            {/* Section 5: Personal Projects (Personal 16:9 Images) */}
            <PersonalProjects />
            
            {/* Section 7: Process Workflow */}
            <Process />
            
            {/* Section 8: Roman Numeral Convictions */}
            <Narrative />
            
            {/* Section 9: The Builder Portrait (3:4 Image) & Bio */}
            <About />
            
            {/* Section 10: Contact Form */}
            <ContactForm showNotification={showNotification} />
            
            {/* Section 11: Grand Footer Connect */}
            <Contact />
          </main>

          {showModal && (
            <ContactModal 
              onClose={() => setShowModal(false)} 
              showNotification={showNotification} 
            />
          )}

          {toast.show && (
            <Notification 
              title={toast.title} 
              message={toast.message} 
              type={toast.type} 
              onClose={handleCloseToast} 
            />
          )}
        </div>
      )}
      <Analytics />
    </>
  );
}
