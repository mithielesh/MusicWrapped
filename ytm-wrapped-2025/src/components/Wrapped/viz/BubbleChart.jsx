import React, { useEffect, useState, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { fetchArtistImage } from '../../../utils/musicApi';

const BubbleChart = ({ data }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef({}); // Store images without triggering re-renders

  // 1. Measure Container Size (Responsive)
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 2. Fetch Images & Prepare Data Scales
  useEffect(() => {
    const loadData = async () => {
      // A. Fetch Images concurrently
      const imagePromises = data.map(artist => fetchArtistImage(artist.name));
      const imageUrls = await Promise.all(imagePromises);
      data.forEach((artist, i) => {
        imagesRef.current[artist.name] = imageUrls[i];
      });
      setImagesLoaded(true);
    };
    loadData();
  }, [data]);


  // 3. D3 Simulation Engine
  const simulationData = useMemo(() => {
    if (dimensions.width === 0 || !imagesLoaded) return [];

    // A. Create a scale for circle sizes based on play counts
    const minCount = d3.min(data, d => d.count) || 0;
    const maxCount = d3.max(data, d => d.count) || 1;

    // Define size range based on screen width (smaller on mobile)
    const isMobile = dimensions.width < 768;
    const minRadius = isMobile ? 30 : 50;
    const maxRadius = isMobile ? 70 : 110;

    // Use scaleSqrt so area is proportional to value, not radius
    const radiusScale = d3.scaleSqrt()
      .domain([minCount, maxCount])
      .range([minRadius, maxRadius]);

    // B. Prepare raw nodes
    const rawNodes = data.map(d => ({
      ...d,
      radius: radiusScale(d.count),
      // Initial random positions near center
      x: dimensions.width / 2 + (Math.random() - 0.5) * 50,
      y: dimensions.height / 2 + (Math.random() - 0.5) * 50,
    }));

    // C. Run Simulation
    // We run it synchronously here to get final positions before rendering,
    // instead of animating the packing process, for a cleaner look.
    const simulation = d3.forceSimulation(rawNodes)
      // Pull towards center
      .force("x", d3.forceX(dimensions.width / 2).strength(0.05))
      .force("y", d3.forceY(dimensions.height / 2).strength(0.05))
      // Prevent overlap (with a little padding)
      .force("collide", d3.forceCollide(d => d.radius + 2).strength(1))
      // Add a slight repulsion charge so they don't clump too tightly
      .force("charge", d3.forceManyBody().strength(-20));

    // Run simulation manually for 300 ticks to settle positions
    for (let i = 0; i < 300; ++i) simulation.tick();
    simulation.stop();

    return rawNodes;
  }, [data, dimensions, imagesLoaded]);


  // Set finalized nodes to state for rendering
  useEffect(() => {
    if (simulationData.length > 0) {
      setNodes(simulationData);
    }
  }, [simulationData]);


  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Loading state while images fetch and sim runs */}
      {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 animate-pulse">
              Generating Bubbles...
          </div>
      )}

      {dimensions.width > 0 && nodes.length > 0 && (
        <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
          <defs>
            {/* Define gradients and image patterns for each node */}
            {nodes.map((node, i) => {
                const imgUrl = imagesRef.current[node.name];
                return (
                    <React.Fragment key={i}>
                        {/* Define Image Pattern */}
                        {imgUrl && (
                             <pattern id={`img-${i}`} x="0" y="0" height="1" width="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                <image x="0" y="0" width="100" height="100" href={imgUrl} preserveAspectRatio="xMidYMid slice"/>
                             </pattern>
                        )}
                        {/* Define Fallback Gradient */}
                        <radialGradient id={`grad-${i}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor={i % 2 === 0 ? "#ef4444" : "#3b82f6"} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={i % 2 === 0 ? "#7f1d1d" : "#1e3a8a"} stopOpacity="0.8" />
                        </radialGradient>
                    </React.Fragment>
                )
            })}
            {/* Glow filter for hover */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
          </defs>

          {/* Render the Bubbles */}
          {nodes.map((node, i) => {
             const imgUrl = imagesRef.current[node.name];
             return (
              <motion.g 
                key={node.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: node.x,
                    y: node.y
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    delay: i * 0.1 // Staggered entrance
                }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.1, zIndex: 10 }}
                style={{ filter: "url(#glow)" }} // Add subtle glow
              >
                {/* The main circle bubble */}
                <circle
                  r={node.radius}
                  fill={imgUrl ? `url(#img-${i})` : `url(#grad-${i})`}
                  className="stroke-white/10 stroke-2 group-hover:stroke-white/50 transition-colors"
                />
                
                {/* Overlay for text readability on hover */}
                <motion.circle
                    r={node.radius}
                    fill="black"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.4 }}
                />

                {/* Text Labels (Centered) */}
                <foreignObject x={-node.radius} y={-node.radius} width={node.radius * 2} height={node.radius * 2} pointerEvents="none">
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md break-words line-clamp-2">{node.name}</p>
                        <p className="text-gray-300 text-xs mt-1 font-mono">{node.count}</p>
                    </div>
                </foreignObject>
              </motion.g>
            )})}
        </svg>
      )}
    </div>
  );
};

export default BubbleChart;