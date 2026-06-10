import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ai24Video from '../../assets/companyProjectsVideos/ai24_video.mp4';
import thirdAiVideo from '../../assets/companyProjectsVideos/3rdAi_video.mp4';
import brahmakoshVideo from '../../assets/companyProjectsVideos/bramhkoash_video.mp4';
import babaCityVideo from '../../assets/companyProjectsVideos/babaCity.mp4';
import ambujVideo from '../../assets/companyProjectsVideos/ambujWebstie_vidoe.mp4';
import './FeaturedWorks.css';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    id: '01',
    title: 'AI24 DIGITAL',
    role: 'AI Agency & Digital Solutions Platform',
    year: '2026',
    desc: 'Modern AI-focused business platform designed to showcase digital transformation, AI offerings, and machine learning solutions.',
    video: ai24Video,
    link: 'https://ai24.digital'
  },
  {
    id: '02',
    title: '3RDAI SECURITY',
    role: 'Enterprise Security & CCTV Management System',
    year: '2025',
    desc: 'Professional surveillance and monitoring solution provider, integrating secure access control systems and enterprise CCTV management.',
    video: thirdAiVideo,
    link: 'https://3rdai.co'
  },
  {
    id: '03',
    title: 'BRAMHAKOSH',
    role: 'Vedic Archive & Cultural Knowledge Portal',
    year: '2025',
    desc: 'Modern spiritual and Vedic knowledge platform dedicated to Indian culture, ancient wisdom, and interactive article databases.',
    video: brahmakoshVideo,
    link: 'https://brahmakosh.com'
  },
  {
    id: '04',
    title: 'BABA CITY INN',
    role: 'Luxury Hotel & Booking Management Engine',
    year: '2025',
    desc: 'Luxury hospitality website featuring custom rooms catalog, online booking requests, and high-performance image loading.',
    video: babaCityVideo,
    link: 'https://babacityinn.aitota.com'
  },
  {
    id: '05',
    title: 'AMBUJ & BROTHERS',
    role: 'Industrial Logistics & Supply Chain Portal',
    year: '2025',
    desc: 'Corporate business website built to showcase enterprise-level logistics, business operations, and secure inquiry forms.',
    video: ambujVideo,
    link: 'https://ambujandbrothers.com'
  }
];

export default function FeaturedWorks() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.work-item');
      
      items.forEach((item) => {
        const videoWrapper = item.querySelector('.work-video-wrapper');
        const mediaCol = item.querySelector('.work-media-col');
        const videoElement = item.querySelector('video');
        const textElements = item.querySelectorAll('.animate-work-text');

        // ScrollTrigger to play video when in view
        ScrollTrigger.create({
          trigger: videoWrapper,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => videoElement.play().catch(() => {}),
          onEnterBack: () => videoElement.play().catch(() => {}),
          onLeave: () => videoElement.pause(),
          onLeaveBack: () => videoElement.pause()
        });



        // Unified entrance timeline for media column and text details (zoom & rise from deep below)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(
          mediaCol,
          { 
            y: 180, 
            scale: 0.5, 
            opacity: 0, 
            transformOrigin: 'center bottom' 
          },
          { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            duration: 2.0, 
            ease: 'back.out(0.8)' 
          },
          0
        );

        tl.fromTo(
          textElements,
          { 
            y: 140, 
            scale: 0.5, 
            opacity: 0,
            transformOrigin: 'center bottom'
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            stagger: 0.12,
            ease: 'back.out(1.0)'
          },
          0.3
        );
      });

      // Reveal the "And More" block at the bottom on scroll
      gsap.fromTo(
        '.works-more-block',
        { y: 60, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.works-more-block',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="works-section theme-reddish" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="works-header">
          <div className="works-header-left">
            <span className="works-sec-num">03 /</span>
            <h2 className="works-sec-title">SELECTED WORKS</h2>
          </div>
          <p className="works-header-desc">
            A curated selection of commercial and enterprise web architectures built for performance, security, and elegant user interaction.
          </p>
        </div>

        {/* Works List */}
        <div className="works-list">
          {WORKS.map((work, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={work.id} 
                className={`work-item ${isEven ? 'even-layout' : 'odd-layout'}`}
              >
                {/* Media Column */}
                <div className="work-media-col">
                  <a 
                    href={work.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="work-video-link"
                    data-cursor-text="VISIT"
                  >
                    <div className="work-video-wrapper">
                      <video 
                        className="work-video" 
                        loop 
                        muted 
                        playsInline
                      >
                        <source src={work.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="work-media-overlay">
                        <span className="video-status-badge">
                          <span className="status-dot"></span>
                          LIVE PREVIEW
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Details Column */}
                <div className="work-details-col">
                  <div className="work-meta animate-work-text">
                    <span className="work-index">{work.id}</span>
                    <span className="work-sep">/</span>
                    <span className="work-type">CLIENT WORK</span>
                  </div>
                  
                  <h3 className="work-title animate-work-text">{work.title}</h3>
                  
                  <span className="work-role animate-work-text">{work.role}</span>
                  
                  <p className="work-desc animate-work-text">{work.desc}</p>
                  
                  <div className="work-bottom animate-work-text">
                    <span className="work-year">YEAR — {work.year}</span>
                    <a 
                      href={work.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="work-link-arrow"
                    >
                      EXPLORE ARCHITECTURE <span className="arrow">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* And More / Archives Minimal Display */}
        <div className="works-more-block">
          <div className="more-divider"></div>
          <div className="more-minimal-display" data-cursor-text="MORE">
            <span className="ampersand">&</span> MORE
          </div>
          <div className="more-subtext-pill">
            A CURATED FRACTION — <span className="pill-highlight">ADDITIONAL PLATFORMS</span> SUCCESSFULLY DELIVERED
          </div>
        </div>

      </div>
    </section>
  );
}
