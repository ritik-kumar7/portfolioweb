import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../../assets/profile.jpg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const STRENGTHS = [
  'Full Stack Development',
  'MERN Stack Architecture',
  'Performance Optimization',
  'API Security & Integration',
  'SEO-Friendly Auditing',
  'Clean Code & Structure',
  'Responsive UI Engineering',
  'Interactive Artistry'
];

export default function About() {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale parallax on the profile image
      gsap.fromTo(
        '.about-profile-img',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Clip path reveal on the image frame
      gsap.fromTo(
        imageFrameRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stagger strengths list reveal
      gsap.fromTo(
        '.strength-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-strengths-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section theme-bright" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="about-header">
          <div className="about-header-left">
            <span className="about-sec-num">08 /</span>
            <h2 className="about-sec-title">THE BUILDER</h2>
          </div>
          <p className="about-header-desc">
            A look into the philosophy, background, and core capabilities driving our development process.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="about-grid">
          {/* Profile Image (Left) */}
          <div className="about-media-col">
            <div className="about-image-frame" ref={imageFrameRef}>
              <img 
                src={profileImage} 
                alt="Ritik Kumar Profile" 
                className="about-profile-img"
                loading="lazy" 
              />
              <div className="about-image-overlay"></div>
            </div>
          </div>

          {/* Biography & Strengths (Right) */}
          <div className="about-details-col">
            <div className="about-bio-block">
              <span className="about-bio-tag">BIOGRAPHY</span>
              <p className="about-bio-text">
                I am a passionate Full Stack Web Developer and Creative Digital Builder based in India. With professional experience designing, building, and maintaining modern, high-performance web applications, I combine structured logic with creative layout choreography.
              </p>
              <p className="about-bio-text">
                My primary playground includes React.js, Next.js, Node.js, and MongoDB, backed by custom animations utilizing GSAP and Framer Motion. I excel at building responsive frontends, integrating complex third-party REST APIs, designing clean database schemas, and setting up high-performance cloud hosting infrastructures.
              </p>
            </div>

            <div className="about-objective-block">
              <span className="about-bio-tag">CAREER OBJECTIVE</span>
              <p className="about-obj-text">
                To leverage my web development expertise in building innovative, scalable, and impactful digital products while continuously expanding my technical knowledge and contributing to business growth through modern technology solutions.
              </p>
            </div>

            <div className="about-strengths-block">
              <span className="about-bio-tag">CORE CAPABILITIES</span>
              <div className="about-strengths-grid">
                {STRENGTHS.map((str, idx) => (
                  <div key={idx} className="strength-item">
                    <span className="strength-num">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="strength-label">{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
