import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
// Astro/Vite will output the resolved URL for the asset
import northeastFlavour from '../assets/Northeast-flavour.png';

const neStates = [
  { name: 'Assam', vibe: 'The Homeland', lore: 'Where the hustle begins. Home of the roaring Brahmaputra, lush tea gardens, and the Sky Drink HQ.', color: 'text-yellow-400', bg: 'bg-yellow-400' },
  { name: 'Meghalaya', vibe: 'Elevated Energy', lore: 'Fueling the underground music, street culture, and relentless rain-or-shine hustle of the Abode of Clouds.', color: 'text-green-400', bg: 'bg-green-400' },
  { name: 'Nagaland', vibe: 'Warrior Spirit', lore: 'Fierce and unstoppable. Honoring ancient traditions while pushing the boundaries of modern sports and art.', color: 'text-red-500', bg: 'bg-red-500' },
  { name: 'Arunachal', vibe: 'First to Rise', lore: 'The land of the rising sun. For the early risers chasing peaks and grinding before the rest of the world wakes up.', color: 'text-orange-400', bg: 'bg-orange-400' },
  { name: 'Sikkim', vibe: 'Pure Altitude', lore: 'Crisp, relentless focus inspired by the highest peaks. Clean energy for a sharp mind.', color: 'text-blue-400', bg: 'bg-blue-400' },
  { name: 'Manipur', vibe: 'The Powerhouse', lore: 'Fueling a legendary athletic legacy. The raw energy behind combat sports champions and iron wills.', color: 'text-pink-500', bg: 'bg-pink-500' },
  { name: 'Mizoram', vibe: 'Rhythm & Flow', lore: 'Smooth, sustained energy for the creators, the musicians, and the night owls building the culture.', color: 'text-purple-400', bg: 'bg-purple-400' },
  { name: 'Tripura', vibe: 'Deep Roots', lore: 'Blending royal heritage with the modern hustle. Working today for a stronger, unstoppable tomorrow.', color: 'text-emerald-400', bg: 'bg-emerald-400' }
];

export default function RootsMap() {
  const [activeState, setActiveState] = useState(neStates[0]);

  return (
    <section id="roots" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Dynamic Background Glow based on Active State */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 transition-colors duration-700 pointer-events-none ${activeState.bg}`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pr-8 md:pr-12">
        <div className="text-center mb-16">
           <div className="inline-block bg-zinc-900 text-zinc-400 font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm mb-4 border border-zinc-800">
              Our Territory
            </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white">
            Explore the <span className={`transition-colors duration-500 ${activeState.color}`}>Northeast</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
          
          {/* Interactive States List 
              Mobile: Horizontal snap scroll. Desktop: Vertical column */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x touch-pan-x lg:w-1/3 gap-4 pb-4 lg:pb-0">
            {neStates.map((state) => (
              <button
                key={state.name}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) setActiveState(state);
                }}
                onClick={() => setActiveState(state)}
                className={`clickable shrink-0 lg:shrink group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left snap-center w-64 lg:w-auto
                  ${activeState.name === state.name 
                    ? 'bg-zinc-900 border-zinc-700 shadow-lg' 
                    : 'border-transparent hover:bg-zinc-900/50 hover:border-zinc-800'}`}
              >
                <div>
                  <h4 className={`text-xl font-black uppercase tracking-wide transition-colors ${activeState.name === state.name ? state.color : 'text-zinc-400 group-hover:text-white'}`}>
                    {state.name}
                  </h4>
                  {activeState.name === state.name && (
                    <p className="text-sm font-bold uppercase text-zinc-500 mt-1 animate-pulse hidden lg:block">Select to explore</p>
                  )}
                </div>
                <ArrowUpRight className={`hidden md:block w-5 h-5 transition-transform ${activeState.name === state.name ? `opacity-100 ${state.color}` : 'opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </button>
            ))}
          </div>

          {/* Dynamic Content Display */}
          <div className="lg:w-2/3 flex flex-col md:flex-row gap-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-20 transition-colors duration-500 ${activeState.bg}`}></div>
            
            <div className="md:w-1/2 flex flex-col justify-center gap-6 z-10">
              <div>
                <h3 className={`text-sm font-black uppercase tracking-widest mb-2 transition-colors duration-500 ${activeState.color}`}>
                  {activeState.vibe}
                </h3>
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-none text-white">
                  {activeState.name}
                </h2>
              </div>
              
              <p className="text-lg text-zinc-400 font-medium leading-relaxed min-h-[100px]">
                {activeState.lore}
              </p>
              
              <div className="mt-auto">
                <a href="https://www.instagram.com/skydrink.official_/" target="_blank" rel="noreferrer" className="clickable inline-flex items-center gap-2 text-white font-bold uppercase hover:gap-4 transition-all pb-4">
                  Show your state pride <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Uploaded Northeast Image used as artistic element */}
            <div className="md:w-1/2 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center p-4 min-h-[250px]">
               <img 
                  src={typeof northeastFlavour === 'object' ? northeastFlavour.src : northeastFlavour} 
                  alt="Northeast India Map - Strong, Proud, Unstoppable" 
                  className={`w-full h-auto max-h-[350px] object-contain transition-all duration-700 ease-in-out
                    ${activeState.name === 'Assam' ? 'scale-100' : 'scale-110 opacity-60 mix-blend-luminosity'}`}
                />
                {/* Overlay text for flavor over map */}
                <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-black shadow-lg transition-colors duration-500 ${activeState.bg}`}>
                     Strong • Proud • Unstoppable
                   </span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
