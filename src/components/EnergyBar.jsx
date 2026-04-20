import React, { useState, useEffect } from 'react';

export default function EnergyBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = scrollY / windowHeight;
      setScrollProgress(ratio || 0); // prevent NaN
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // compute once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMaxEnergy = scrollProgress > 0.98;

  return (
    <div className="fixed right-0 top-0 w-1 md:w-3 h-full bg-zinc-900 z-[100] border-l border-zinc-800">
      <div 
        className={`w-full bottom-0 absolute transition-all duration-100 ease-out 
          ${isMaxEnergy ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-pulse' : 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]'}`}
        style={{ height: `${scrollProgress * 100}%` }}
      />
      {isMaxEnergy && (
        <div className="hidden md:block absolute top-1/2 -left-32 -translate-y-1/2 text-red-500 font-black tracking-widest uppercase rotate-[-90deg] animate-bounce whitespace-nowrap">
          Max Energy
        </div>
      )}
    </div>
  );
}
