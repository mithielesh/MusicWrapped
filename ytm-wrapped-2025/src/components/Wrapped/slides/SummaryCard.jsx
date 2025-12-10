import React, { useRef, useState, useEffect } from 'react';
import { Download, Music, Clock, Zap } from 'lucide-react';
import html2canvas from 'html2canvas';
import { fetchArtistImage } from '../../../utils/musicApi';

const SummaryCard = ({ data }) => {
  const exportRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const loadHero = async () => {
      if (data.topArtists[0]) {
        const url = await fetchArtistImage(data.topArtists[0].name);
        setHeroImage(url);
      }
    };
    loadHero();
  }, [data]);

  const getVibe = () => {
    const mins = data.totalMinutes;
    if (mins > 60000) return "The Main Character";
    if (mins > 30000) return "The Audiophile";
    if (mins > 15000) return "The Vibe Curator";
    if (mins > 5000) return "The Explorer";
    return "The Casual Listener";
  };
  const vibeTitle = getVibe();

  const handleDownload = async (e) => {
    e.stopPropagation(); 
    if (exportRef.current) {
      setIsGenerating(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const canvas = await html2canvas(exportRef.current, {
          scale: 3, 
          useCORS: true,
          backgroundColor: null,
          logging: false,
        });

        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = image;
        link.download = `ytm-wrapped-2025.png`;
        link.click();
      } catch (err) {
        console.error("Export failed", err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="w-full h-full relative bg-[#050505] font-sans overflow-hidden flex flex-col">
      
      {/* ============================================================
          1. THE EXPORT CARD (NO GAPS - HAIRLINE FIT)
         ============================================================ */}
      <div className="fixed left-[-9999px] top-0 z-0 pointer-events-none">
        <div 
  ref={exportRef}
  className="w-[400px] min-h-[760px] flex flex-col p-6 items-center text-center"
  style={{ background: 'linear-gradient(to bottom, #1a1a1a, #000000)' }}
>
    {/* Header */}
    <div className="mt-6 mb-3 flex items-center gap-2 opacity-50">
      <Music size={14} className="text-white" />

      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white leading-none relative -top-[4px]">
        2025 Wrapped
      </span>
    </div>



    {/* Artist Image */}
    <div className="w-28 h-28 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden mb-4 bg-[#222]">
        {heroImage ? (
            <img src={heroImage} className="w-full h-full object-cover" alt="" crossOrigin="anonymous"/>
        ) : <div className="w-full h-full bg-gray-800" />}
    </div>

    {/* Artist + Vibe */}
    <div className="mb-3 w-full px-2">
      <h2 className="text-3xl font-black text-white leading-tight mb-2 break-words -top-[3px]">
        {data.topArtists[0]?.name}
      </h2>

      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 border border-white/5 mb-2">
        <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider relative -top-[1.5px]">
          {vibeTitle}
        </p>
      </div>

    </div>


    {/* Stats */}
    <div className="flex gap-10 mb-7 border-t border-white/10 pt-3 w-full justify-center">
        <div className="text-center">
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-1">Minutes</p>
            <p className="text-lg font-bold text-white leading-none">
                {data.totalMinutes.toLocaleString()}
            </p>
        </div>
        <div className="text-center">
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-1">Top Songs</p>
            <p className="text-lg font-bold text-white leading-none">
                {data.totalSongs}
            </p>
        </div>
    </div>

    {/* Top Songs */}
    <div className="w-full text-left bg-white/5 rounded-2xl p-5 border border-white/5 max-h-[360px] overflow-hidden mt-5">
        <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-3 text-center">
            Top Tracks
        </p>

        <div className="flex flex-col gap-3">
            {data.topSongs.slice(0, 5).map((song, i) => (
                <div 
                    key={i} 
                    className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                    <span className={`text-sm font-bold w-4 text-center ${
                        i === 0 ? 'text-yellow-500' : 'text-white/30'
                    }`}>
                        {i + 1}
                    </span>

                    <div className="flex-1 break-words">
                        <div className="text-xs text-white/90 leading-snug">
                            <span className="font-bold">{song.name}</span>
                            <span className="text-white/30 mx-1">•</span>
                            <span className="text-[10px] text-white/50">{song.artist}</span>
                        </div>
                    </div>

                    <span className="text-[9px] text-white/20 font-mono">{song.count}</span>
                </div>
            ))}
          </div>
        </div>

          {/* Footer */}
          <div className="mt-6 opacity-30">
            <span className="text-[8px] uppercase tracking-widest">
                YouTube Music Wrapped
            </span>
          </div>
        </div>
      </div>


      {/* ============================================================
          2. THE VISIBLE SCREEN (Untouched)
         ============================================================ */}
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
         {heroImage ? (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-[80px] scale-110"
                style={{ backgroundImage: `url(${heroImage})` }}
            />
         ) : <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black" />}
         <div className="absolute inset-0 bg-[#0a0a0a]/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16 max-w-7xl mx-auto">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6 animate-fade-in-up w-full">
            <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-4">
                    <Zap size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-xs font-bold tracking-widest uppercase text-white/90">2025 Wrapped</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-2">
                    {vibeTitle}
                </h1>
            </div>

            <div className="flex gap-8">
                <div className="text-left">
                    <p className="text-xs text-white/50 uppercase font-bold mb-1">Minutes</p>
                    <p className="text-3xl font-bold text-white">{data.totalMinutes.toLocaleString()}</p>
                </div>
                <div className="w-px bg-white/10"></div>
                <div className="text-left">
                    <p className="text-xs text-white/50 uppercase font-bold mb-1">Top Artist</p>
                    <p className="text-3xl font-bold text-white truncate max-w-[200px]">{data.topArtists[0]?.name}</p>
                </div>
            </div>

            <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="hidden md:flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl z-50 cursor-pointer"
            >
                {isGenerating ? "Capturing..." : <><Download size={20} /> Download Card</>}
            </button>
        </div>

        {/* Right Side (Preview) */}
        <div className="flex-1 w-full max-w-md animate-fade-in-up delay-200 hidden md:block">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white/20">
                        {heroImage && <img src={heroImage} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Top Artist</p>
                        <h2 className="text-3xl font-bold text-white">{data.topArtists[0]?.name}</h2>
                    </div>
                </div>
                <div className="space-y-3">
                    {data.topSongs.slice(0, 5).map((song, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className={`text-lg font-bold w-6 text-center ${i===0 ? 'text-yellow-400' : 'text-white/30'}`}>{i+1}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-white truncate">{song.name}</p>
                                <p className="text-xs text-white/50 truncate">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Mobile Button */}
        <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="md:hidden w-full mt-8 flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl z-50 relative"
        >
            {isGenerating ? "Capturing..." : <><Download size={20} /> Save Collectible</>}
        </button>

      </div>
    </div>
  );
};

export default SummaryCard;