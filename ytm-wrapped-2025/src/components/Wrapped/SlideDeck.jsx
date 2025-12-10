import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Intro from './slides/Intro';
import TopStats from './slides/TopStats';
import TopArtists from './slides/TopArtists';
import TopSongs from './slides/TopSongs';
import SummaryCard from './slides/SummaryCard';
import { X } from 'lucide-react';

const SlideDeck = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < 4) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slides = [
    <Intro data={data} onNext={nextSlide} />,
    <TopStats data={data} />,
    <TopArtists data={data} />,
    <TopSongs data={data} />,
    <SummaryCard data={data} />
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-sans overflow-hidden flex flex-col">
      
      {/* Progress Bar (Notch Safe) */}
      <div className="absolute top-2 md:top-4 left-4 right-4 z-50 flex gap-2 h-1 md:h-1.5 safe-area-top">
        {slides.map((_, idx) => (
          <div key={idx} className="flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: idx <= currentSlide ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button 
         onClick={() => window.location.reload()} 
         className="absolute top-8 right-6 z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Slide Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="w-full h-full"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Tap Zones */}
      {currentSlide !== 0 && (
        <div className="absolute inset-y-0 left-0 w-[20%] z-40" onClick={prevSlide} />
      )}
      <div className="absolute inset-y-0 right-0 w-[20%] z-40" onClick={nextSlide} />

    </div>
  );
};

export default SlideDeck;