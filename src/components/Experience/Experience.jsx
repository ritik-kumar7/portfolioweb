import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    company: 'DIIN Technology',
    role: 'Web Developer',
    period: 'Nov 2025 — Present',
    desc: 'Led the development of scalable React applications, customized administrative panels, secure REST APIs, and business architectures. Collaborated closely with designers and product managers to execute premium, performance-optimized digital products.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'Vercel']
  },
  {
    company: 'Digicoder Technology',
    role: 'MERN Stack Developer Intern',
    period: 'May 2025 — Nov 2025',
    desc: 'Completed rigorous full-stack internship focusing on MERN database schema designs, modular frontend states, Express route security, and team git workflows. Built and deployed multiple functional web projects.',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'GitHub', 'CSS3']
  }
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the rows on scroll
      gsap.fromTo(
        '.exp-row',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-table',
            start: 'top 80%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Draw horizontal dividers
      gsap.fromTo(
        '.exp-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.exp-table',
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section theme-dark" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="exp-section-header">
          <div className="exp-header-left">
            <span className="exp-sec-num">02 /</span>
            <h2 className="exp-sec-title">PROFESSIONAL JOURNEY</h2>
          </div>
          <p className="exp-header-desc">
            A track record of translating corporate requirements and creative design systems into highly polished production-level platforms.
          </p>
        </div>

        {/* Experience Table */}
        <div className="exp-table">
          <div className="exp-divider"></div>
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="exp-row" data-cursor-text="EXP">
              <div className="exp-col exp-period-col">
                <span className="exp-period">{exp.period}</span>
              </div>
              
              <div className="exp-col exp-role-col">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-company">{exp.company}</span>
              </div>
              
              <div className="exp-col exp-desc-col">
                <p className="exp-desc">{exp.desc}</p>
                <div className="exp-tags">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="exp-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="exp-divider"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
