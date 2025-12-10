import React, { useEffect, useState } from 'react';
import { fetchTrackImage } from '../../../utils/musicApi';
import { Music, PlayCircle, ExternalLink } from 'lucide-react';

const TopSongs = ({ data }) => {
  const [songImages, setSongImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const song of data.topSongs) {
        const url = await fetchTrackImage(song.artist, song.name); 
        if (url) images[song.name] = url;
      }
      setSongImages(images);
    };
    loadImages();
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col p-6 md:p-8 bg-[#0a0a0a] pt-16 md:pt-24 overflow-y-auto pb-24">
      
      {/* HEADER */}
      <div className="relative z-10 mb-8 animate-fade-in-up">
        <h2 className="text-sm text-blue-500 font-bold tracking-widest mb-2 uppercase">
          On Repeat
        </h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          Top Songs
        </h1>
      </div>

      {/* VINYL LIST CONTAINER */}
      <div className="space-y-6 max-w-4xl mx-auto w-full pr-4">
        {data.topSongs.map((song, idx) => (
          <a 
            key={idx} 
            href={`https://music.youtube.com/search?q=${encodeURIComponent(`${song.name} ${song.artist}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center animate-slide-in-right cursor-pointer"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            
            {/* 1. RANK NUMBER (Left Side) */}
            <div className="w-12 text-4xl font-black text-neutral-800 group-hover:text-white/20 transition-colors mr-4 text-right">
                {idx + 1}
            </div>

            {/* 2. THE VINYL COMPONENT */}
            <div className="relative h-20 md:h-24 w-full flex items-center bg-neutral-900/50 hover:bg-neutral-800/80 rounded-l-xl border-l-4 border-l-transparent hover:border-l-blue-500 transition-all duration-300 pr-4 overflow-visible">
                
                {/* A. The Spinning Disc (Slides out) */}
                <div className="absolute left-2 h-16 w-16 md:h-20 md:w-20 rounded-full bg-black flex items-center justify-center transition-transform duration-500 ease-out group-hover:translate-x-12 md:group-hover:translate-x-16 group-hover:rotate-[360deg]">
                    <div className="absolute inset-0 rounded-full border-[6px] border-neutral-900 opacity-50"></div>
                    <div className="absolute inset-2 rounded-full border-[2px] border-neutral-800 opacity-50"></div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 animate-spin-slow"></div>
                </div>

                {/* B. The Album Sleeve (Cover Art) */}
                <div className="relative z-10 h-20 w-20 md:h-24 md:w-24 flex-shrink-0 shadow-2xl ml-[-1px]">
                    {songImages[song.name] ? (
                        <img 
                            src={songImages[song.name]} 
                            alt={song.name} 
                            className="w-full h-full object-cover rounded-md shadow-[5px_0_10px_rgba(0,0,0,0.5)]"
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center rounded-md border border-white/5">
                             <Music size={24} className="text-neutral-600" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10 pointer-events-none rounded-md"></div>
                </div>

                {/* C. Song Info */}
                <div className="flex-1 ml-6 md:ml-20 z-0 pl-4 py-2 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                        {song.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-400 font-medium truncate">
                            {song.artist || "Unknown Artist"}
                        </p>
                        <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-600"></span>
                        <p className="hidden md:block text-xs text-gray-500 font-mono">
                            {song.count} plays
                        </p>
                    </div>
                </div>

                {/* D. Play / External Link Icon */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4 text-blue-500 flex flex-col items-center gap-1">
                    <PlayCircle size={28} />
                    <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block">Listen</span>
                </div>

            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopSongs;