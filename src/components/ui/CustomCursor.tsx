import React, { useEffect, useRef, useState } from 'react';

/**
 * Animated custom cursor with a dot and ring follower.
 * Hides the native cursor globally via CSS on body.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Hover detection for interactive elements
    const addHover = () => setIsHovered(true);
    const removeHover = () => setIsHovered(false);
    const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // Smooth ring follow animation
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        dot.style.left = `${mouseX.current}px`;
        dot.style.top = `${mouseY.current}px`;

        ringX.current += (mouseX.current - ringX.current) * 0.12;
        ringY.current += (mouseY.current - ringY.current) * 0.12;
        ring.style.left = `${ringX.current}px`;
        ring.style.top = `${ringY.current}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: isVisible ? 1 : 0, transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})` }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'hovered' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
