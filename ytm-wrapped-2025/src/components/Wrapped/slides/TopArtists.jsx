import React from 'react';
import BubbleChart from '../viz/BubbleChart';

const TopArtists = ({ data }) => {
  // Pass the top 10 artists for a fuller chart, even if we only showed 5 before.
  // The processor already provides top 10.
  const artistsForBubble = data.topArtists; 

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900 relative overflow-hidden">
       {/* Background Abstract Gradient */}
       <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-red-900/30 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="p-6 md:p-8 pt-16 md:pt-24 relative z-10 flex-shrink-0">
        <h2 className="text-sm text-red-500 font-bold tracking-widest mb-2 uppercase animate-fade-in-up">
          Your Obsessions
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up delay-100">
          Top Artists
        </h1>
        <p className="text-gray-400 text-sm animate-fade-in-up delay-200">
            Size represents the number of plays. Hover to explore.
        </p>
      </div>

      {/* The Bubble Chart Container */}
      <div className="flex-1 w-full min-h-0 relative z-10 animate-fade-in delay-300">
          {artistsForBubble.length > 0 ? (
             <BubbleChart data={artistsForBubble} />
          ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No artist data found.
              </div>
          )}
      </div>
    </div>
  );
};

export default TopArtists;