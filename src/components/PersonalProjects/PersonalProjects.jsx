import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '../../assets/brandi-redd-aJTiW00qqtI-unsplash.jpg';
import './PersonalProjects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'SHOWXPRESS',
    category: 'Full-Stack Web App',
    tech: 'React / Node / MongoDB / Stripe / Clerk',
    image: '/src/assets/myProjectImages/show-xpress.png',
    link: 'https://show-xpress7.vercel.app/'
  },
  {
    id: '02',
    title: 'CHATWINGS',
    category: 'Real-Time AI Chat',
    tech: 'React / Node / MongoDB / Gemini API',
    image: '/src/assets/myProjectImages/chatWings.png',
    link: 'https://chatswings.netlify.app/'
  },
  {
    id: '03',
    title: 'CODEXEYE',
    category: 'AI Code Reviewer',
    tech: 'React / Gemini API / Monaco Editor',
    image: '/src/assets/myProjectImages/codex.png',
    link: 'https://codexeye.netlify.app/'
  },
  {
    id: '04',
    title: 'VIDBUZZ',
    category: 'Video Conferencing',
    tech: 'React / Tailwind CSS / Zego Cloud',
    image: '/src/assets/myProjectImages/videocall.png',
    link: 'https://vidbuzz.netlify.app/'
  },
  {
    id: '05',
    title: 'COOLFANTA',
    category: 'Creative Product Showcase',
    tech: 'React / GSAP / Web Animation',
    image: '/src/assets/myProjectImages/coolFanta.png',
    link: 'https://coolfanta.netlify.app/'
  }
];

export default function PersonalProjects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal project grid blocks on scroll
      gsap.fromTo(
        '.project-grid-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect on images within their frames
      const images = gsap.utils.toArray('.project-image');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
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
        </div>

      </div>
    </section>
  );
}
