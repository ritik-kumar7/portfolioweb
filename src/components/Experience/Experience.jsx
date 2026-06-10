import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
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
    role: 'MERN Stack Developer',
    isIntern: true,
    period: 'May 2025 — Nov 2025',
    desc: 'Completed rigorous full-stack internship focusing on MERN database schema designs, modular frontend states, Express route security, and team git workflows. Built and deployed multiple functional web projects.',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'GitHub', 'CSS3']
  }
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Split the section header title into characters
    const titleSplit = new SplitType('.exp-sec-title', {
      types: 'chars',
      tagName: 'span',
      charClass: 'exp-title-char'
    });

    const ctx = gsap.context(() => {
      // Header number and desc animations
      gsap.fromTo(
        '.exp-sec-num',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-section-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        titleSplit.chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.03,
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.exp-sec-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.exp-header-desc',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-header-desc',
            start: 'top 90%',
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
          duration: 1.6,
          stagger: 0.15,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.exp-table',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Multi-directional reveal for individual experience rows
      const rows = gsap.utils.toArray('.exp-row');
      rows.forEach((row) => {
        const period = row.querySelector('.exp-period-col');
        const role = row.querySelector('.exp-role-col');
        const desc = row.querySelector('.exp-desc-col');
        const tags = row.querySelectorAll('.exp-tag');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(
          period,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0
        )
        .fromTo(
          role,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.1
        )
        .fromTo(
          desc,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.2
        )
        .fromTo(
          tags,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.8)' },
          0.3
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.revert();
    };
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
                <h3 className="exp-role">{exp.company}</h3>
                <span className="exp-company">
                  {exp.role}
                  {exp.isIntern && (
                    <>
                      <br />
                      <span className="exp-intern-badge">( INTERN )</span>
                    </>
                  )}
                </span>
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
