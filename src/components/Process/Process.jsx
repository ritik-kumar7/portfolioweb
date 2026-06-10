import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Compass, Database, Layout, Rocket } from 'lucide-react';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Compass,
    title: 'THE DISCOVERY & CURATION',
    desc: 'Understanding client needs, mapping technical scope, and formulating a distinct layout direction. I analyze the typography, pacing, and visual story before writing a single line of markup.',
    manifesto: 'No templates. Every digital piece is architected from absolute scratch.'
  },
  {
    icon: Database,
    title: 'THE CORE ARCHITECTURE',
    desc: 'Designing database schemas in MongoDB/MySQL and configuring routing frameworks in Node.js. I lay out the data flow with emphasis on security, caching models, and strict type safety.',
    manifesto: 'High performance is not an afterthought; it is built into the foundation.'
  },
  {
    icon: Layout,
    title: 'THE INTUITIVE INTERFACE',
    desc: 'Crafting modular frontend states in React.js. Implementing physics-based GSAP and Framer Motion interactions, maintaining strict visual alignment and typographic grids.',
    manifesto: 'Animations must serve user cognition, not just visual decoration.'
  },
  {
    icon: Rocket,
    title: 'THE AUDIT & DEPLOYMENT',
    desc: 'Conducting intensive performance testing, Lighthouse SEO compliance auditing, and responsive layout testing. Deploying to Vercel, Netlify, or AWS cloud infrastructures.',
    manifesto: 'Zero load-time friction. Seamless rendering across all devices.'
  }
];

export default function Process() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Split title characters for intro
    const introSplit = new SplitType('.process-main-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'proc-title-char'
    });

    const isMobile = window.innerWidth <= 768;
    const scrollContainer = scrollContainerRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      let scrollTween;

      if (!isMobile) {
        const scrollWidth = scrollContainer.scrollWidth;
        const amountToScroll = scrollWidth - window.innerWidth;

        scrollTween = gsap.to(scrollContainer, {
          x: -amountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
          }
        });
      }

      // Intro title 3D roll-in
      gsap.fromTo(
        introSplit.chars,
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
            trigger: '.process-main-title',
            start: isMobile ? 'top 90%' : 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.process-lbl',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-lbl',
            start: isMobile ? 'top 90%' : 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.process-intro-p',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-intro-p',
            start: isMobile ? 'top 90%' : 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      if (!isMobile) {
        gsap.fromTo(
          '.scroll-arrow-hint',
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.scroll-arrow-hint',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Step slides entry animations
      const steps = gsap.utils.toArray('.step-slide');
      steps.forEach((step) => {
        const borderLine = step.querySelector('.slide-border-line');
        const iconWrapper = step.querySelector('.slide-step-icon-wrapper');
        const title = step.querySelector('.slide-step-title');
        const desc = step.querySelector('.slide-step-desc');
        const manifesto = step.querySelector('.slide-step-manifesto');

        // Dynamic config depending on screen viewport
        const triggerConfig = (startOffset) => ({
          trigger: step,
          ...(isMobile 
            ? { start: `top ${startOffset}` } 
            : { containerAnimation: scrollTween, start: `left ${startOffset}` }),
          toggleActions: 'play none none reverse'
        });

        if (borderLine) {
          gsap.fromTo(borderLine, 
            { [isMobile ? 'width' : 'height']: '0%' },
            { 
              [isMobile ? 'width' : 'height']: isMobile ? '100%' : '70%', 
              duration: 1.2, 
              ease: 'power2.out',
              scrollTrigger: triggerConfig('90%')
            }
          );
        }

        if (iconWrapper) {
          gsap.fromTo(iconWrapper,
            { scale: 0.4, rotation: -45, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'back.out(1.7)',
              scrollTrigger: triggerConfig('85%')
            }
          );
        }

        if (title) {
          gsap.fromTo(title,
            { x: isMobile ? 0 : 50, y: isMobile ? 20 : 0, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: triggerConfig('80%')
            }
          );
        }

        if (desc) {
          gsap.fromTo(desc,
            { x: isMobile ? 0 : 30, y: isMobile ? 15 : 0, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: triggerConfig('75%')
            }
          );
        }

        if (manifesto) {
          gsap.fromTo(manifesto,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: triggerConfig('70%')
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      introSplit.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="process-pin-section theme-bright">
      <div ref={scrollContainerRef} className="process-scroll-container">
        
        {/* Intro Slide */}
        <div className="process-slide intro-slide">
          <div className="slide-content">
            <span className="process-lbl">06 / WORKFLOW</span>
            <h2 className="process-main-title">THE WAY <br /> I BUILD</h2>
            <p className="process-intro-p">
              Scroll horizontally to explore my structured process. I guide ideas through a methodical progression of research, architecture, custom design, and rigorous performance auditing.
            </p>
            <div className="scroll-arrow-hint">
              <span>DRAG OR SCROLL DOWN</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="process-slide step-slide" data-cursor-text="FLOW">
              <div className="slide-border-line"></div>
              <div className="slide-inner-content">
                <div className="slide-step-header">
                  <span className="slide-step-icon-wrapper">
                    <Icon className="slide-step-icon" />
                  </span>
                  <span className="slide-step-slash">/</span>
                  <span className="slide-step-tag">PHASE 0{idx + 1}</span>
                </div>
                
                <h3 className="slide-step-title">{step.title}</h3>
                <p className="slide-step-desc">{step.desc}</p>
                
                <div className="slide-step-manifesto">
                  <span className="manifesto-tag">PRINCIPLE</span>
                  <p className="manifesto-p">"{step.manifesto}"</p>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
