import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, Sparkles } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "What's your 3 AM vibe?",
    options: [
      { text: "Grinding on a new project", flavor: "Mango Fizz" },
      { text: "Deep in the creative zone", flavor: "Lychee Fizz" },
      { text: "Out doing wild stuff", flavor: "Spice Vibe" }
    ]
  },
  {
    id: 2,
    text: "Choose your aesthetic",
    options: [
      { text: "High-contrast Neon", flavor: "Mango Fizz" },
      { text: "Smooth & Chill", flavor: "Lychee Fizz" },
      { text: "Aggressive Streetwear", flavor: "Spice Vibe" }
    ]
  },
  {
    id: 3,
    text: "What's your ultimate goal?",
    options: [
      { text: "Building an empire", flavor: "Mango Fizz" },
      { text: "Setting the trends", flavor: "Lychee Fizz" },
      { text: "Breaking the rules", flavor: "Spice Vibe" }
    ]
  }
];

const flavorProfiles = {
  "Mango Fizz": { color: "text-orange-500", bg: "bg-orange-500", glow: "shadow-[0_0_30px_rgba(249,115,22,0.5)]" },
  "Lychee Fizz": { color: "text-pink-500", bg: "bg-pink-500", glow: "shadow-[0_0_30px_rgba(236,72,153,0.5)]" },
  "Spice Vibe": { color: "text-green-500", bg: "bg-green-500", glow: "shadow-[0_0_30px_rgba(34,197,94,0.5)]" },
};

export default function VibeCheck() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ "Mango Fizz": 0, "Lychee Fizz": 0, "Spice Vibe": 0 });
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef(null);

  const handleAnswer = (flavor) => {
    const newScores = { ...scores, [flavor]: scores[flavor] + 1 };
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate Result
      const topFlavor = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setResult(topFlavor);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { backgroundColor: '#09090b', pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `SkyDrink-HustlerID-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Canvas generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScores({ "Mango Fizz": 0, "Lychee Fizz": 0, "Spice Vibe": 0 });
    setResult(null);
  };

  return (
    <section id="vibecheck" className="py-24 bg-zinc-900 border-y border-zinc-800 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 text-white">Vibe <span className="text-pink-500">Check</span></h2>
          <p className="text-zinc-400 font-medium">Take the test. Find your flavor. Get your Hustler ID.</p>
        </div>

        {!result ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-6">
              Question {currentQ + 1} of {questions.length}
            </div>
            <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-8">
              {questions[currentQ].text}
            </h3>
            <div className="flex flex-col gap-4">
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.flavor)}
                  className="clickable bg-zinc-900 hover:bg-yellow-400 hover:text-black border border-zinc-800 transition-colors p-6 rounded-xl text-left font-black uppercase text-xl md:text-2xl"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {/* The Hustler ID Card (Target for html2canvas) */}
            <div 
              ref={cardRef} 
              className={`w-full max-w-sm rounded-[2rem] border-4 p-8 relative overflow-hidden bg-black text-white ${flavorProfiles[result].glow} ${flavorProfiles[result].color.replace('text', 'border')}`}
            >
              {/* Background accent */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-30 ${flavorProfiles[result].bg}`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className={`w-6 h-6 ${flavorProfiles[result].color}`} />
                  <span className="font-black uppercase tracking-widest text-sm">Sky Drink ID</span>
                </div>

                <div className="mb-8">
                  <p className="text-zinc-400 text-xs font-bold uppercase mb-1">Your Flavor Match</p>
                  <h3 className={`text-4xl font-black uppercase leading-8 ${flavorProfiles[result].color}`}>
                    {result}
                  </h3>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl mb-6">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Hustler Number</p>
                  <p className="font-mono text-xl tracking-widest">SKY_{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
                
                <div className={`text-center p-3 rounded-lg font-black uppercase text-sm ${flavorProfiles[result].bg} text-black`}>
                  10% OFF PROMO: SKYHUSTLE
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="clickable flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all text-lg"
              >
                {isGenerating ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                Download ID
              </button>
              <button 
                onClick={resetQuiz}
                className="clickable flex items-center justify-center gap-2 bg-transparent text-white border-2 border-zinc-700 px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all text-lg"
              >
                <RefreshCw className="w-6 h-6" /> Retake
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
