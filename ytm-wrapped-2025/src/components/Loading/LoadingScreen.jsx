import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const messages = [
  "Connecting to the archives...",
  "Analysing your beat drops...",
  "Calculating danceability...",
  "Finding your top obsession...",
  "Judging your guilty pleasures...",
  "Generating your aura...",
  "Wrapping it all up..."
];

const LoadingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1200); // Change text every 1.2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Glowing Orb Effect */}
        <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={64} className="text-red-500" />
          </motion.div>

          <div className="h-12 overflow-hidden flex flex-col items-center">
            <motion.p 
              key={msgIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold text-white tracking-widest uppercase font-mono text-center"
            >
              {messages[msgIndex]}
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-1 bg-neutral-800 mt-12 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
          className="h-full bg-red-600"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;