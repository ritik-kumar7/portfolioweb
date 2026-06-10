import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    num: '01',
    category: 'FRONTEND ARCHITECTURE',
    skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'HTML5 / CSS3', 'Responsive Design', '& More..']
  },
  {
    num: '02',
    category: 'BACKEND & INFRASTRUCTURE',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication Systems', 'Clerk / Firebase', 'Payment Gateways']
  },
  {
    num: '03',
    category: 'DATABASES & CACHING',
    skills: ['MongoDB', 'Mongoose', 'MySQL', 'Database Optimization', 'Relational Schemas', 'NoSQL Architectures']
  },
  {
    num: '04',
    category: 'DEVELOPMENT WORKFLOWS',
    skills: ['Git & GitHub', 'Vite / Webpack', 'Postman API Testing', 'Vercel / Netlify', 'Figma & UI Prototyping', 'Prompt Engineering', 'Ai Tools']
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Split section title into characters
    const titleSplit = new SplitType('.skills-sec-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'skills-title-char'
    });

    const ctx = gsap.context(() => {
      // Header Animations
      gsap.fromTo(
        '.skills-sec-num',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-header',
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
            trigger: '.skills-sec-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.skills-header-desc',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-header-desc',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Alternating 3D starting states for construction assembly look
      const START_STATES = [
        { x: -140, y: -100, rotateZ: -12, rotateY: 35 },
        { x: 140, y: -100, rotateZ: 12, rotateY: -35 },
        { x: -140, y: 100, rotateZ: -8, rotateY: 30 },
        { x: 140, y: 100, rotateZ: 8, rotateY: -30 }
      ];

      // Choreographed 3D Block and Pill reveal for each skill category card
      const blocks = gsap.utils.toArray('.skills-block');
      blocks.forEach((block, idx) => {
        const startState = START_STATES[idx] || { x: 0, y: 90, rotateZ: 0, rotateY: 0 };
        const header = block.querySelector('.skills-block-header');
        const items = block.querySelectorAll('.skills-item');
        const shine = block.querySelector('.skills-shine');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        // Swing card up in 3D perspective from alternating offsets
        tl.fromTo(
          block,
          {
            x: startState.x,
            y: startState.y,
            rotationZ: startState.rotateZ,
            rotationY: startState.rotateY,
            scale: 0.75,
            opacity: 0,
            transformOrigin: 'center center'
          },
          {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power4.out'
          }
        );

        // Sweeping reflection flash across the card surface
        if (shine) {
          tl.fromTo(
            shine,
            { left: '-100%', opacity: 0 },
            { left: '150%', opacity: 1, duration: 1.1, ease: 'power3.inOut' },
            0.4
          );
        }

        // Header content entrance
        tl.fromTo(
          header,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0.3
        );

        // 3D fold-out / page-flip reveal for skill pills
        tl.fromTo(
          items,
          {
            scaleX: 0,
            rotationY: -90,
            opacity: 0,
            y: 10,
            transformOrigin: 'left center'
          },
          {
            scaleX: 1,
            rotationY: 0,
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: 'back.out(2.0)'
          },
          0.4
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.revert();
    };
  }, []);

  return (
    <section id="skills" className="skills-section theme-reddish" ref={sectionRef}>
      <div className="container">

        {/* Section Header */}
        <div className="skills-header">
          <div className="skills-header-left">
            <span className="skills-sec-num">04 /</span>
            <h2 className="skills-sec-title">TECHNICAL EXPERTISE</h2>
          </div>
          <p className="skills-header-desc">
            A comprehensive catalog of languages, libraries, databases, and deployment pipelines acquired through intensive commercial practice.
          </p>
        </div>

        {/* Skills Layout */}
        <div className="skills-grid-layout">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.num} className="skills-block" data-cursor-text="SKILLS">
              <div className="skills-shine"></div>
              <div className="skills-block-header">
                <span className="skills-block-num">{cat.num}</span>
                <h3 className="skills-block-title">{cat.category}</h3>
              </div>

              <ul className="skills-list">
                {cat.skills.map((skill, index) => (
                  <li key={index} className="skills-item">
                    <span className="skills-bullet"></span>
                    <span className="skills-text">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
