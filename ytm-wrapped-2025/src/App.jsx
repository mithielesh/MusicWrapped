import React, { useState } from 'react';
import Layout from './components/Layout'; // Import the new layout
import Hero from './components/Landing/Hero';
import Steps from './components/Landing/Steps';
import Uploader from './components/Landing/Uploader';
import LoadingScreen from './components/Loading/LoadingScreen';
import SlideDeck from './components/Wrapped/SlideDeck';
import { processHistory } from './utils/processor';

const App = () => {
  const [stage, setStage] = useState('landing');
  const [wrappedData, setWrappedData] = useState(null);

  const handleFileUpload = async (file) => {
    setStage('processing');
    
    try {
      // 1. Run the heavy calculation
      const stats = await processHistory(file);
      
      // 2. Artificial delay (optional) - keeps the loading screen visible for 1.5s 
      // so the user feels like "work" is being done.
      setTimeout(() => {
        setWrappedData(stats);
        setStage('wrapped');
      }, 1500);
      
    } catch (error) {
      console.error(error);
      alert("Error processing file. Make sure it is the correct watch-history.json");
      setStage('landing');
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-10">
        
        {/* LANDING */}
        {stage === 'landing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center animate-fade-in">
            <div className="space-y-8">
              <Hero />
              <Steps />
            </div>
            <div className="w-full h-full min-h-[500px]">
              <Uploader onUpload={handleFileUpload} />
            </div>
          </div>
        )}

        {/* LOADING & WRAPPED */}
        {stage === 'processing' && <LoadingScreen />}
        {stage === 'wrapped' && wrappedData && <SlideDeck data={wrappedData} />}
        
      </div>
    </Layout>
  );
};

export default App;