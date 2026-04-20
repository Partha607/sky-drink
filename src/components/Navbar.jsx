import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import InstagramIcon from './InstagramIcon.jsx';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 
          ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md py-4 shadow-2xl shadow-yellow-500/10' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center pr-8 md:pr-12">
          
          {/* Logo - loud and prominent */}
          <a href="#showcase" className="clickable flex items-center group">
            <img 
              src={logo.src} 
              alt="Sky Drink Logo" 
              className="h-20 md:h-24 w-auto transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" 
            />
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-bold tracking-wide uppercase text-sm text-white">
            <a href="#showcase" className="clickable hover:text-yellow-400 transition-colors">Showcase</a>
            <a href="#flavors" className="clickable hover:text-yellow-400 transition-colors">Flavors</a>
            <a href="#roots" className="clickable hover:text-yellow-400 transition-colors">Our Roots</a>
            <a href="#vibecheck" className="clickable hover:text-yellow-400 transition-colors">Vibe Check</a>
            <a 
              href="https://www.instagram.com/skydrink.official_/" 
              target="_blank" 
              rel="noreferrer"
              className="clickable flex items-center gap-2 bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105 active:scale-95"
            >
              <InstagramIcon className="w-4 h-4" />
              Follow Us
            </a>
          </div>

          <button 
            className="md:hidden text-white clickable p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-8 h-8 text-yellow-400" />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-zinc-950 z-[100] flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-12">
            {/* Mobile menu logo */}
            <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <img 
                src={logo.src} 
                alt="Sky Drink Logo" 
                className="h-24 w-auto [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" 
              />
            </a>
            <button 
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-10 h-10 text-yellow-400" />
            </button>
          </div>

          <div className="flex flex-col gap-6 font-black uppercase text-3xl text-white">
            <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-zinc-800 rounded-lg active:scale-95 transition-transform">Showcase</a>
            <a href="#flavors" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-zinc-800 rounded-lg active:scale-95 transition-transform">Flavors</a>
            <a href="#roots" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-zinc-800 rounded-lg active:scale-95 transition-transform">Our Roots</a>
            <a href="#vibecheck" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-zinc-800 rounded-lg active:scale-95 transition-transform">Vibe Check</a>
            
            <a 
              href="https://www.instagram.com/skydrink.official_/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-4 bg-yellow-400 text-black p-6 rounded-2xl active:scale-95 transition-transform"
            >
              <InstagramIcon className="w-8 h-8" />
              Follow on Insta
            </a>
          </div>
        </div>
      )}
    </>
  );
}
