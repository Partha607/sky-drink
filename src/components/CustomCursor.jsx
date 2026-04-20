import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // only visible if moving inside window

  useEffect(() => {
    // Hide on viewports < 768px (Mobile Constraint)
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference" 
      style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
    >
      <div 
        className={`transition-all duration-200 ease-out flex items-center justify-center rounded-full bg-white
          ${isHovering ? 'w-12 h-12 -ml-6 -mt-6 opacity-100' : 'w-4 h-4 -ml-2 -mt-2 opacity-100'}`}
      ></div>
      {/* Trailing Aura */}
      <div 
        className={`absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 bg-yellow-400 rounded-full blur-md transition-all duration-500 ease-out -z-10
          ${isHovering ? 'scale-150 opacity-0' : 'scale-100 opacity-50'}`}
      ></div>
    </div>
  );
}
