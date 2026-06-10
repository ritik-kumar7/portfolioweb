import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '../../assets/hero/andrew-kliatskyi--e_thdWzgis-unsplash.jpg';
import heroImg from '../../assets/hero_imageWEb.jpeg';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const mediaFrameRef = useRef(null);

  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "RITIK KUMAR",
    "WEB DEVELOPER",
    "WEB DESIGNER",
    "FULL STACK DEVELOPER",
    "CREATIVE BUILDER",
    "SOFTWARE ENGINEER",
    "UI UX DESIGNER",
    "CREATIVE CODER"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid line animations
      gsap.fromTo(
        '.hero-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.8,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Media frame reveal (clip path sliding open)
      gsap.fromTo(
        mediaFrameRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'power4.inOut',
          delay: 0.8
        }
      );

      // Outro scroll trigger animation (dispersing elements on scroll down)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      tl.to('.hero-title-mask', { xPercent: -60, yPercent: -20, opacity: 0, ease: 'none' }, 0)
        .to('.hero-role-tag', { xPercent: -90, yPercent: -30, opacity: 0, ease: 'none' }, 0)
        .to('.hero-subtitle-block', { xPercent: -50, yPercent: 50, opacity: 0, ease: 'none' }, 0)
        .to('.hero-experience-quick', { yPercent: 120, opacity: 0, ease: 'none' }, 0)
        .to('.monitor-mock-container', { yPercent: 80, xPercent: 15, rotation: -10, scale: 0.75, opacity: 0, ease: 'none' }, 0)
        .to('.scroll-hint-block', { yPercent: 150, opacity: 0, ease: 'none' }, 0)
        .to('.hero-footer-bar', { yPercent: 120, opacity: 0, ease: 'none' }, 0)
        .to('.hero-line-1', { yPercent: -100, opacity: 0, ease: 'none' }, 0)
        .to('.hero-line-2', { yPercent: 100, opacity: 0, ease: 'none' }, 0)
        .to('.hero-line-3', { yPercent: -100, opacity: 0, ease: 'none' }, 0)
        .to('.hero-line-4', { yPercent: 100, opacity: 0, ease: 'none' }, 0);

      // Subtle parallax on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.hero-parallax-element', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Title cycling interval (every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      const titleChars = titleRef.current.querySelectorAll('.char-span');
      if (!titleChars || titleChars.length === 0) return;

      gsap.to(titleChars, {
        y: '-100%',
        duration: 0.6,
        stagger: 0.015,
        ease: 'power3.in',
        onComplete: () => {
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Slide up title characters whenever titleIndex changes
  useEffect(() => {
    const titleChars = titleRef.current.querySelectorAll('.char-span');
    if (!titleChars || titleChars.length === 0) return;

    gsap.set(titleChars, { y: '100%' });
    gsap.to(titleChars, {
      y: '0%',
      duration: 1.0,
      stagger: 0.02,
      ease: 'power4.out',
      delay: 0.1
    });
  }, [titleIndex]);

  const getTitleLines = (text) => {
    const words = text.split(' ');
    if (words.length <= 2) return words;
    if (words.length === 3) return [`${words[0]} ${words[1]}`, words[2]];
    return [`${words[0]} ${words[1]}`, `${words[2]} ${words[3]}`];
  };

  const titleText = titles[titleIndex];

  return (
    <section
      id="cover"
      className="hero-section theme-dark"
      ref={containerRef}
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Editorial Grid Background */}
      <div className="hero-grid">
        <div className="hero-line hero-line-1"></div>
        <div className="hero-line hero-line-2"></div>
        <div className="hero-line hero-line-3"></div>
        <div className="hero-line hero-line-4"></div>
      </div>

      <div className="hero-container">
        <div className="hero-main-content">
          <div className="hero-left-column">
            <h1 className="hero-title-mask" ref={titleRef}>
              {getTitleLines(titleText).map((lineText, lIndex) => (
                <div key={lIndex} className="title-word-row">
                  {lineText.split('').map((char, cIndex) => (
                    <span key={cIndex} className="char-wrapper">
                      <span className="char-span">{char === ' ' ? '\u00A0' : char}</span>
                    </span>
                  ))}
                </div>
              ))}
            </h1>

            <div className="hero-role-tag">FULL STACK DEVELOPER / WEB DESIGNER</div>

            <div className="hero-subtitle-block">
              <span className="subtitle-tag">MANIFESTO</span>
              <p className="subtitle-desc">
                Crafting luxury digital narratives through elegant design systems, high-performance code, and interactive artistry.
              </p>
            </div>

            <div className="hero-experience-quick">
              <span className="exp-num">1.5+</span>
              <span className="exp-lbl">YEARS CRAFTING<br />THE MODERN WEB</span>
            </div>
          </div>

          <div className="hero-right-column">
            <div className="monitor-mock-container">
              <div className="hero-media-wrapper" ref={mediaFrameRef}>
                <div className="hero-parallax-element">
                  <div className="desktop-screen-content full-screen">
                    <img
                      src={heroImg}
                      alt="Ritik Kumar Showcase"
                      className="hero-img-showcase"
                    />
                    <div className="media-overlay"></div>
                  </div>
                </div>
              </div>
              {/* Physical Monitor Stand */}
              <div className="monitor-stand-neck"></div>
              <div className="monitor-stand-base"></div>
            </div>

            <div className="hero-right-meta">
              <div className="scroll-hint-block" data-cursor-text="DOWN">
                <span className="scroll-dot"></span>
                <span className="scroll-text">SCROLL TO READ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer-bar">
          <div className="footer-bar-right">
            <span>ESTABLISHED IN THE CLOUD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
