import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onStartReveal, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 800; // 0.8 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(interval);
        if (onStartReveal) onStartReveal();
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onStartReveal, onComplete]);

  return (
    <div className={`loader-wrapper theme-dark ${progress === 100 ? 'loaded' : ''}`}>
      <div className="loader-grid">
        <div className="loader-item loader-left">
          <span className="loader-label">CREATIVE PORTFOLIO</span>
          <span className="loader-title">CREATIVE DEVELOPER</span>
        </div>
        <div className="loader-item loader-center">
          <span className="loader-edition">PORTFOLIO VOL. II</span>
          <span className="loader-tagline">CRAFTING REALITIES WITH CODE</span>
        </div>
        <div className="loader-item loader-right">
          <div className="loader-counter">
            <span className="counter-num">{progress.toString().padStart(3, '0')}</span>
            <span className="counter-pct">%</span>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical editorial gridlines in loader */}
      <div className="loader-gridlines">
        <div className="loader-line"></div>
        <div className="loader-line"></div>
        <div className="loader-line"></div>
        <div className="loader-line"></div>
      </div>
    </div>
  );
}
