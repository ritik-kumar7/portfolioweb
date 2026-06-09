import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import collectionImage1 from '../../assets/webColletion.png';
import collectionImage2 from '../../assets/webColletion2.png';
import './Narrative.css';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    title: 'THE RENDER SPEED AUDIT',
    text: 'Our architectural engineering enforces a strict performance-first mandate. Every component, image asset, stylesheet, and API call undergoes comprehensive weight audits. We target sub-500ms initial page responses by implementing server-side caching, aggressive image compression, lightweight DOM trees, and custom bundling. If a page loads slowly, it compromises user trust; we ensure your digital presence rendering remains instantaneous and frictionless.'
  },
  {
    title: 'THE CODE CRAFT INTEGRITY',
    text: 'We reject automated templating, layouts constructed via page-builders, and generic boilerplate configurations. Each component, grid structure, state transition, and routing mechanism is engineered from the ground up to fit your brand identity. By writing custom, modular React scripts and vanilla CSS styling, we avoid library bloat, ensuring clean codebases that are highly maintainable, type-safe, and scalable.'
  },
  {
    title: 'THE PHYSICS OF MOTION',
    text: 'Animations are not decorative additions; they are core cognitive guides. We model transitions and hover curves using real-world kinetic properties—mass, friction, inertia, and spring physics. Leveraging GSAP and Framer Motion, we choreograph high-performance interaction layouts that respond organically to user navigation, directing attention to critical CTA pathways and creating an intuitive digital environment.'
  }
];

export default function Narrative() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on both images
      gsap.fromTo(
        '.narrative-gallery-img',
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Stagger principle item reveal on scroll
      gsap.fromTo(
        '.narrative-detail-col',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.narrative-details-grid',
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger calculations after images load and render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="narrative-section theme-dark" ref={sectionRef}>
      <div className="container narrative-container">
        
        {/* Centered Section Header */}
        <div className="narrative-center-header">
          <span className="narrative-sec-num">07 /</span>
          <h2 className="narrative-sec-title">THE CONVICTION</h2>
          <p className="narrative-header-desc">
            A set of non-negotiable architectural mandates that govern our engineering and layout designs.
          </p>
        </div>

        {/* Side-by-side 4:3 Gallery Grid */}
        <div className="narrative-gallery-grid" ref={galleryRef}>
          
          <div className="narrative-gallery-item" data-cursor-text="VIEW">
            <div className="narrative-img-frame">
              <img 
                src={collectionImage1} 
                alt="Web Collection Showcase 1" 
                className="narrative-gallery-img"
                loading="lazy" 
              />
              <div className="narrative-img-overlay"></div>
            </div>
          </div>

          <div className="narrative-gallery-item" data-cursor-text="VIEW">
            <div className="narrative-img-frame">
              <img 
                src={collectionImage2} 
                alt="Web Collection Showcase 2" 
                className="narrative-gallery-img"
                loading="lazy" 
              />
              <div className="narrative-img-overlay"></div>
            </div>
          </div>

        </div>

        {/* 3-Column Details Stack Below */}
        <div className="narrative-details-grid">
          {PRINCIPLES.map((pr, idx) => (
            <div key={idx} className="narrative-detail-col">
              <div className="narrative-detail-divider"></div>
              <h3 className="narrative-detail-title">{pr.title}</h3>
              <p className="narrative-detail-text">{pr.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
