import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import collectionImage1 from '../../assets/webColletion.png';
import collectionImage2 from '../../assets/webColletion2.png';
import './Narrative.css';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    title: 'THE RENDER SPEED AUDIT',
    text: 'My architectural engineering enforces a strict performance-first mandate. Every component, image asset, stylesheet, and API call undergoes comprehensive weight audits. I target sub-500ms initial page responses by implementing server-side caching, aggressive image compression, lightweight DOM trees, and custom bundling. If a page loads slowly, it compromises user trust; I ensure your digital presence rendering remains instantaneous and frictionless.'
  },
  {
    title: 'THE CODE CRAFT INTEGRITY',
    text: 'I reject automated templating, layouts constructed via page-builders, and generic boilerplate configurations. Each component, grid structure, state transition, and routing mechanism is engineered from the ground up to fit your brand identity. By writing custom, modular React scripts and vanilla CSS styling, I avoid library bloat, ensuring clean codebases that are highly maintainable, type-safe, and scalable.'
  },
  {
    title: 'THE PHYSICS OF MOTION',
    text: 'Animations are not decorative additions; they are core cognitive guides. I model transition curves using real-world kinetic properties—mass, friction, inertia, and spring physics. Leveraging GSAP and Framer Motion, I choreograph high-performance interaction layouts that respond organically to user navigation, directing attention to critical CTA pathways and creating an intuitive digital environment.'
  }
];

export default function Narrative() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Split section title into characters for 3D flip-roll
    const titleSplit = new SplitType('.narrative-sec-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'narr-title-char'
    });

    const ctx = gsap.context(() => {
      // Header Animations
      gsap.fromTo(
        '.narrative-sec-num',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.narrative-center-header',
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
            trigger: '.narrative-sec-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.narrative-header-desc',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.narrative-header-desc',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Gallery Curtain & Zoom Reveal on Scroll
      const galleryItems = gsap.utils.toArray('.narrative-gallery-item');
      galleryItems.forEach((item) => {
        const curtain = item.querySelector('.narrative-curtain');
        const img = item.querySelector('.narrative-gallery-img');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        if (curtain) {
          tl.fromTo(curtain,
            { scaleY: 1 },
            { scaleY: 0, duration: 1.4, ease: 'power4.inOut' }
          );
        }

        if (img) {
          tl.fromTo(img,
            { scale: 1.3 },
            { scale: 1.0, duration: 1.5, ease: 'power3.out' },
            0.1
          );
        }
      });

      // Parallax scroll on both images
      gsap.fromTo(
        '.narrative-gallery-img',
        { yPercent: -8 },
        {
          yPercent: 8,
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
      const cols = gsap.utils.toArray('.narrative-detail-col');
      cols.forEach((col) => {
        const divider = col.querySelector('.narrative-detail-divider');
        const title = col.querySelector('.narrative-detail-title');
        const text = col.querySelector('.narrative-detail-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: col,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });

        // 1. Grow divider line horizontally from center
        if (divider) {
          tl.fromTo(divider,
            { scaleX: 0, transformOrigin: 'center center' },
            { scaleX: 1, duration: 1.0, ease: 'power3.out' }
          );
        }

        // 2. Fade/Slide Up Title & Description
        tl.fromTo([title, text],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        );
      });
    }, sectionRef);

    // Refresh ScrollTrigger calculations after images load and render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      titleSplit.revert();
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
            A set of non-negotiable architectural mandates that govern my engineering and layout designs.
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
              <div className="narrative-curtain"></div>
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
              <div className="narrative-curtain"></div>
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
