import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { gsap } from 'gsap';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to('.scroll-to-top', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to('.scroll-to-top', {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top fixed bottom-8 right-8 z-[60] w-14 h-14 bg-zinc-950/80 backdrop-blur-md border-2 border-yellow-400 text-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-shadow group clickable opacity-0 translate-y-5 scale-75"
      aria-label="Scroll to top"
    >
      <Zap className="w-6 h-6 fill-yellow-400 group-hover:scale-125 transition-transform" />
    </button>
  );
}
