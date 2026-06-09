import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop screens
    if (window.innerWidth <= 1024) return;

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    // Use GSAP quickSetter for optimal 60fps performance
    const setDotX = gsap.quickSetter(cursorDot, 'x', 'px');
    const setDotY = gsap.quickSetter(cursorDot, 'y', 'px');
    const setRingX = gsap.quickSetter(cursorRing, 'x', 'px');
    const setRingY = gsap.quickSetter(cursorRing, 'y', 'px');

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth lerp animation for the trailing ring
    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      ring.x += (mouse.x - ring.x) * dt;
      ring.y += (mouse.y - ring.y) * dt;
      setRingX(ring.x);
      setRingY(ring.y);
    };

    gsap.ticker.add(ticker);

    // Hover triggers
    const onMouseEnterLink = (e) => {
      setIsHovering(true);
      cursorRing.classList.add('hovered');
      cursorDot.classList.add('hovered');
      
      const text = e.currentTarget.getAttribute('data-cursor-text');
      if (text) {
        setCursorText(text);
        cursorRing.classList.add('has-text');
      }
    };

    const onMouseLeaveLink = () => {
      setIsHovering(false);
      setCursorText('');
      cursorRing.classList.remove('hovered');
      cursorDot.classList.remove('hovered');
      cursorRing.classList.remove('has-text');
    };

    // Attach event listeners to all interactive items
    const updateListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, .cursor-hover-trigger, [data-cursor-text]'
      );
      
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });

      return () => {
        hoverables.forEach((el) => {
          el.removeEventListener('mouseenter', onMouseEnterLink);
          el.removeEventListener('mouseleave', onMouseLeaveLink);
        });
      };
    };

    const cleanupListeners = updateListeners();

    // Create an observer to watch for dynamic DOM changes
    const observer = new MutationObserver(() => {
      cleanupListeners();
      updateListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
      cleanupListeners();
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth <= 1024) return null;

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorRingRef} className="custom-cursor-ring">
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </div>
    </>
  );
}
