import React from 'react';

const Hero = () => {
  return (
    <div className="space-y-6 text-left">
      <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white">
        2025 <span className="text-neutral-500">Wrapped</span>
      </h1>
      
      <p className="text-xl text-neutral-400 font-normal leading-relaxed max-w-lg">
        Generate your YouTube Music yearly recap instantly. 
        <br />
        <span className="text-sm text-neutral-600 mt-2 block">
          Private • Client-side • Open Source
        </span>
      </p>
    </div>
  );
};

export default Hero;