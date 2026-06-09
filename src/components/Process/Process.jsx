import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Database, Layout, Rocket } from 'lucide-react';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Compass,
    title: 'THE DISCOVERY & CURATION',
    desc: 'Understanding client needs, mapping technical scope, and formulating a distinct layout direction. We analyze the typography, pacing, and visual story before writing a single line of markup.',
    manifesto: 'No templates. Every digital piece is architected from absolute scratch.'
  },
  {
    icon: Database,
    title: 'THE CORE ARCHITECTURE',
    desc: 'Designing database schemas in MongoDB/MySQL and configuring routing frameworks in Node.js. We lay out the data flow with emphasis on security, caching models, and strict type safety.',
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
    // Only run on desktop/tablet where horizontal scroll is comfortable
    if (window.innerWidth <= 768) return;

    const scrollContainer = scrollContainerRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainer.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="process-pin-section theme-bright">
      <div ref={scrollContainerRef} className="process-scroll-container">
        
        {/* Intro Slide */}
        <div className="process-slide intro-slide">
          <div className="slide-content">
            <span className="process-lbl">06 / WORKFLOW</span>
            <h2 className="process-main-title">THE WAY WE BUILD</h2>
            <p className="process-intro-p">
              Scroll horizontally to explore our structured process. We guide ideas through a methodical progression of research, architecture, custom design, and rigorous performance auditing.
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
