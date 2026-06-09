import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedWorks.css';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    id: '01',
    title: 'AI24 DIGITAL',
    role: 'Frontend Architect / UI Engineering',
    year: '2026',
    desc: 'Modern AI-focused business platform designed to showcase digital transformation, AI offerings, and machine learning solutions.',
    video: '/src/assets/companyProjectsVideos/ai24_video.mp4',
    link: 'https://ai24.digital'
  },
  {
    id: '02',
    title: '3RDAI SECURITY',
    role: 'React.js Developer / API Specialist',
    year: '2025',
    desc: 'Professional surveillance and monitoring solution provider, integrating secure access control systems and enterprise CCTV management.',
    video: '/src/assets/companyProjectsVideos/3rdAi_video.mp4',
    link: 'https://3rdai.co'
  },
  {
    id: '03',
    title: 'BRAMHAKOSH',
    role: 'Full Stack Developer / SEO Strategist',
    year: '2025',
    desc: 'Modern spiritual and Vedic knowledge platform dedicated to Indian culture, ancient wisdom, and interactive article databases.',
    video: '/src/assets/companyProjectsVideos/bramhkoash_video.mp4',
    link: 'https://brahmakosh.com'
  },
  {
    id: '04',
    title: 'BABA CITY INN',
    role: 'UI Designer / Frontend Developer',
    year: '2025',
    desc: 'Luxury hospitality website featuring custom rooms catalog, online booking requests, and high-performance image loading.',
    video: '/src/assets/companyProjectsVideos/babaCity.mp4',
    link: 'https://babacityinn.aitota.com'
  },
  {
    id: '05',
    title: 'AMBUJ & BROTHERS',
    role: 'Lead MERN Developer / Security Lead',
    year: '2025',
    desc: 'Corporate business website built to showcase enterprise-level logistics, business operations, and secure inquiry forms.',
    video: '/src/assets/companyProjectsVideos/ambujWebstie_vidoe.mp4',
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

        // Parallax image scale effect on scroll
        gsap.fromTo(
          videoElement,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: videoWrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        // Text reveal animations
        gsap.fromTo(
          textElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
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

      </div>
    </section>
  );
}
