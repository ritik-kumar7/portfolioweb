import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big title char slide-up
      gsap.fromTo(
        '.contact-char',
        { y: '100%' },
        {
          y: '0%',
          duration: 1.4,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-title-container',
            start: 'top 85%'
          }
        }
      );

      // Magnetic hover buttons logic
      const buttons = gsap.utils.toArray('.magnetic-link');
      buttons.forEach((btn) => {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const x = clientX - btnX;
          const y = clientY - btnY;

          gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto'
          });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "LET'S BUILD SOMETHING";
  const headlineSecond = "EXCEPTIONAL";

  return (
    <section id="contact" className="contact-section theme-reddish" ref={containerRef}>
      <div className="container contact-container">
        
        {/* Large Connect Title */}
        <div className="contact-title-container">
          <h2 className="contact-huge-title">
            <span className="contact-line-mask">
              {headline.split('').map((char, index) => (
                <span key={index} className="contact-char-wrap">
                  <span className="contact-char">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
            <span className="contact-line-mask second-line">
              {headlineSecond.split('').map((char, index) => (
                <span key={index} className="contact-char-wrap">
                  <span className="contact-char">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Contact Links Grid */}
        <div className="contact-channels-grid">
          <div className="channel-box">
            <span className="channel-lbl">01 / EMAIL DIRECTLY</span>
            <a 
              href="mailto:9ritik.kumar@gmail.com" 
              className="channel-link magnetic-link"
              data-cursor-text="MAIL"
            >
              9ritik.kumar@gmail.com
            </a>
          </div>

          <div className="channel-box">
            <span className="channel-lbl">02 / NETWORKS</span>
            <div className="networks-flex">
              <a 
                href="https://www.linkedin.com/in/ritik-kumar7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-link magnetic-link"
                data-cursor-text="LINKEDIN"
              >
                LinkedIn
              </a>
              <span className="net-sep">—</span>
              <a 
                href="https://github.com/ritik-kumar7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-link magnetic-link"
                data-cursor-text="GITHUB"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="channel-box">
            <span className="channel-lbl">03 / CURRICULUM VITAE</span>
            <a 
              href="/src/assets/myProjectImages/Ritik_kumar_resume.pdf" 
              download="Ritik_Kumar_Resume.pdf"
              className="channel-link cv-link magnetic-link"
              data-cursor-text="DOWNLOAD"
            >
              GET RESUME PDF <span className="arrow">↓</span>
            </a>
          </div>
        </div>

        {/* Colophon & Footer Metadata */}
        <div className="contact-colophon">
          <div className="colophon-left">
            <span className="colophon-logo-txt">RITIK KUMAR</span>
            <span className="colophon-sub">CREATIVE BUILDER & FULL STACK DEVELOPER</span>
          </div>

          <div className="colophon-center">
            <span>© 2026 / ALL RIGHTS RESERVED</span>
            <span>DEVELOPED FOR MAXIMUM PERFORMANCE</span>
          </div>

          <div className="colophon-right">
            <span>POWERED BY React.js, GSAP & Lenis</span>
            <a 
              href="#cover" 
              className="back-to-top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              data-cursor-text="UP"
            >
              BACK TO COVER ↑
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
