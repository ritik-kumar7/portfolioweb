import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    num: '01',
    category: 'FRONTEND ARCHITECTURE',
    skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'HTML5 / CSS3', 'Responsive Design']
  },
  {
    num: '02',
    category: 'BACKEND & INFRASTRUCTURE',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication Systems', 'Clerk / Firebase', 'Payment Gateways (Stripe)']
  },
  {
    num: '03',
    category: 'DATABASES & CACHING',
    skills: ['MongoDB', 'Mongoose', 'MySQL', 'Database Optimization', 'Relational Schemas', 'NoSQL Architectures']
  },
  {
    num: '04',
    category: 'DEVELOPMENT WORKFLOWS',
    skills: ['Git & GitHub', 'Vite / Webpack', 'Postman API Testing', 'Vercel / Netlify', 'Figma & UI Prototyping', 'Prompt Engineering']
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the skill blocks
      gsap.fromTo(
        '.skills-block',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid-layout',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
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
