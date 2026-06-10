import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './Introduction.css';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Only run if the element exists
    if (!textRef.current) return;

    // Split text into words and characters
    const split = new SplitType(textRef.current, {
      types: 'words',
      tagName: 'span',
      wordClass: 'manifesto-word'
    });

    const ctx = gsap.context(() => {
      // Animate opacity of each word on scroll
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
          }
        }
      );

      // Subtle move-up animation for the header line
      gsap.fromTo(
        '.intro-heading-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.intro-heading',
            start: 'top 90%',
            end: 'top 70%',
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="manifesto" className="intro-section theme-bright" ref={sectionRef}>
      <div className="container">
        <div className="intro-grid-layout">
          <div className="intro-heading-col">
            <div className="intro-heading">
              <span className="intro-num">
                {"01 /".split("").map((char, index) => (
                  <span key={index} className="heading-char">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="intro-label">
                {"PHILOSOPHY".split("").map((char, index) => (
                  <span key={index} className="heading-char">
                    {char}
                  </span>
                ))}
              </span>
              <div className="intro-heading-line"></div>
            </div>
          </div>
          
          <div className="intro-content-col">
            <h2 ref={textRef} className="manifesto-text">
              We believe that digital craftsmanship lies at the intersection of absolute utility and elegant design. A web application is not just a bundle of code, but an architectural space. We curate experiences that flow, load instantly, and leave a lasting impression of luxury and details.
            </h2>
            
            <div className="intro-subtext-grid">
              <div className="intro-subtext-item">
                <span className="subtext-title">
                  {"THE MEDIUM".split("").map((char, index) => (
                    <span key={index} className="heading-char">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <p className="subtext-p">
                  Clean state management, clean database queries, and custom, lightweight UI engines. We avoid frameworks that bloat and design templates that genericize.
                </p>
              </div>
              
              <div className="intro-subtext-item">
                <span className="subtext-title">
                  {"THE AESTHETIC".split("").map((char, index) => (
                    <span key={index} className="heading-char">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <p className="subtext-p">
                  Restraint in color, elegance in typography, and animation that feels physics-based and organic, never distracting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
