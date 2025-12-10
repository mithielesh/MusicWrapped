import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Intro = ({ data, onNext }) => {
  return (
    <div 
        onClick={onNext} 
        className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black relative overflow-hidden cursor-pointer"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 space-y-8">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
            <Play fill="black" size={32} className="ml-1" />
        </motion.div>

        <div>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
                It's a Wrap.
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 mt-4 font-light"
            >
                See how your <span className="text-white font-bold">{data.year}</span> sounded.
            </motion.p>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            className="absolute bottom-20 left-0 right-0 text-sm text-gray-500 uppercase tracking-widest"
        >
        </motion.div>
      </div>
    </div>
  );
};
export default Intro;