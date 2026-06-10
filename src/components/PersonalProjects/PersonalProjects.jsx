import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import bgImage from '../../assets/brandi-redd-aJTiW00qqtI-unsplash.jpg';
import showXpress from '../../assets/myProjectImages/show-xpress.png';
import chatWings from '../../assets/myProjectImages/chatWings.png';
import codex from '../../assets/myProjectImages/codex.png';
import videocall from '../../assets/myProjectImages/videocall.png';
import coolFanta from '../../assets/myProjectImages/coolFanta.png';
import './PersonalProjects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'SHOWXPRESS',
    category: 'Full-Stack Web App',
    tech: 'React / Node / MongoDB / Stripe / Clerk',
    image: showXpress,
    link: 'https://show-xpress7.vercel.app/'
  },
  {
    id: '02',
    title: 'CHATWINGS',
    category: 'Real-Time AI Chat',
    tech: 'React / Node / MongoDB / Gemini API',
    image: chatWings,
    link: 'https://chatswings.netlify.app/'
  },
  {
    id: '03',
    title: 'CODEXEYE',
    category: 'AI Code Reviewer',
    tech: 'React / Gemini API / Monaco Editor',
    image: codex,
    link: 'https://codexeye.netlify.app/'
  },
  {
    id: '04',
    title: 'VIDBUZZ',
    category: 'Video Conferencing',
    tech: 'React / Tailwind CSS / Zego Cloud',
    image: videocall,
    link: 'https://vidbuzz.netlify.app/'
  },
  {
    id: '05',
    title: 'COOLFANTA',
    category: 'Creative Product Showcase',
    tech: 'React / GSAP / Web Animation',
    image: coolFanta,
    link: 'https://coolfanta.netlify.app/'
  }
];

export default function PersonalProjects() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split section title into characters for 3D flip-roll
    const titleSplit = new SplitType('.proj-sec-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'proj-title-char'
    });

    const ctx = gsap.context(() => {
      // Header Animations
      gsap.fromTo(
        '.proj-sec-num',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-section-header',
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
            trigger: '.proj-sec-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.proj-header-desc',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-header-desc',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Smooth Vertical Card Entrance (Prevents backdrop-filter blur rendering lag)
      const items = gsap.utils.toArray('.project-grid-item');
      items.forEach((item) => {
        const img = item.querySelector('.project-image');
        const details = item.querySelectorAll('.project-card-details > *');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        });

        // Snappy vertical translation with gentle scaling
        tl.fromTo(
          item,
          {
            y: 60,
            scale: 0.95,
            opacity: 0
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out'
          }
        );

        // Smooth zoom reduction on image
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1.0, duration: 1.1, ease: 'power2.out' },
            0.15
          );
        }

        // Details fade-in staggered cascade
        if (details.length > 0) {
          tl.fromTo(
            details,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
            0.25
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      titleSplit.revert();
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="personal-projects-section theme-dark" 
      ref={containerRef}
      style={{ 
        backgroundImage: `linear-gradient(rgba(18, 18, 17, 0.45), rgba(18, 18, 17, 0.45)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container personal-projects-container">
        
        {/* Section Header */}
        <div className="proj-section-header">
          <div className="proj-header-left">
            <span className="proj-sec-num">05 /</span>
            <h2 className="proj-sec-title">PERSONAL PROJECTS</h2>
          </div>
          <p className="proj-header-desc">
            A sandbox of creative engineering, experimental interfaces, and personal applications built to test the limits of front and backend ecosystems.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="projects-grid">
          {PROJECTS.map((proj, idx) => {
            // Determine size classes for editorial grid layout
            const sizeClass = (idx === 0 || idx === 3) ? 'grid-wide' : 'grid-standard';
            return (
              <div key={proj.id} className={`project-grid-item ${sizeClass}`}>
                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card-link"
                  data-cursor-text="OPEN"
                >
                  <div className="project-image-frame">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="project-image"
                      loading="lazy" 
                    />
                    <div className="project-image-overlay"></div>
                  </div>
                  
                  <div className="project-card-details">
                    <div className="project-card-meta">
                      <span className="project-card-num">{proj.id}</span>
                      <span className="project-card-cat">{proj.category}</span>
                    </div>
                    <h3 className="project-card-title">{proj.title}</h3>
                    <p className="project-card-tech">{proj.tech}</p>
                  </div>
                </a>
              </div>
            );
          })}

          {/* GitHub "And More" Card */}
          <div className="project-grid-item grid-standard">
            <a 
              href="https://github.com/ritik-kumar7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-card-link github-special-card"
              data-cursor-text="VISIT"
            >
              <div className="github-card-content">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="github-card-icon">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              
              <div className="project-card-details">
                <div className="project-card-meta">
                  <span className="project-card-num">++</span>
                  <span className="project-card-cat">GITHUB ARCHIVE</span>
                </div>
                <h3 className="project-card-title">AND MORE...</h3>
                <p className="project-card-tech">Explore 30+ open source builds, libraries, and experimental scripts.</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
