import React, { useEffect, useState } from 'react';
import { Clock, Music, Zap, Calendar, TrendingUp, BarChart3, Activity, Trophy } from 'lucide-react';
import { fetchArtistImage } from '../../../utils/musicApi';

const TopStats = ({ data }) => {
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const loadTheme = async () => {
      if (data.topArtists[0]) {
        const url = await fetchArtistImage(data.topArtists[0].name);
        setBgImage(url);
      }
    };
    loadTheme();
  }, [data]);

  const level = Math.floor(data.totalSongs / 50) + 1;
  const nextLevelProgress = ((data.totalSongs % 50) / 50) * 100;

  const hourly = data.hourlyActivity || new Array(24).fill(0);
  const monthly = data.monthlyStats || new Array(12).fill({ count: 0, month: '' });
  const calendar = data.calendarData || {};
  const maxHourly = Math.max(...hourly, 1);
  const maxMonthly = Math.max(...monthly.map(m => m.count), 1);

  const renderHeatmap = () => {
    const weeks = 52;
    const days = 7;
    let heatmapGrid = [];
    const values = Object.values(calendar);
    const maxCal = Math.max(...values, 1);

    for (let w = 0; w < weeks; w++) {
      let weekColumn = [];
      for (let d = 0; d < days; d++) {
        const valIndex = (w * 7) + d;
        const count = valIndex < values.length ? values[valIndex] : 0;
        
        // Heatmap Colors - Brighter for contrast
        let color = "bg-white/5"; 
        if (count > 0) color = "bg-green-500/40";
        if (count > maxCal * 0.25) color = "bg-green-500/60";
        if (count > maxCal * 0.5) color = "bg-green-500/80";
        if (count > maxCal * 0.75) color = "bg-green-400";
        
        weekColumn.push(
            <div key={d} className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${color}`} title={`${count} plays`}></div>
        );
      }
      heatmapGrid.push(<div key={w} className="flex flex-col gap-1">{weekColumn}</div>);
    }
    return heatmapGrid;
  };

  return (
    <div className="w-full h-full relative font-sans text-white overflow-hidden flex flex-col">
      
      {/* --- LAYER 1: PERSONALIZED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
         {bgImage ? (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 blur-[60px] scale-110"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
         ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] to-black" />
         )}
         {/* Lighter Overlay so background is visible */}
         <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* --- LAYER 2: DASHBOARD CONTENT --- */}
      <div className="relative z-20 w-full h-full p-4 md:p-8 pt-16 md:pt-20 overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4 flex-shrink-0">
          <div className="flex items-center gap-4">
             {/* Avatar */}
             <div className="relative">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                    <Trophy size={20} className="text-yellow-400" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-black/20 shadow-sm">
                    Lvl {level}
                </div>
             </div>
             
             <div>
                <h2 className="text-[10px] font-mono text-green-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Stats
                </h2>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md">Listening Activity</h1>
             </div>
          </div>

          <div className="text-right hidden md:block">
              <div className="text-[10px] text-white/60 font-mono uppercase mb-1 flex justify-end gap-2">
                  <span>Next Level</span>
                  <span>{Math.round(nextLevelProgress)}%</span>
              </div>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-1000 shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${nextLevelProgress}%` }}></div>
              </div>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-20">

          {/* --- KPI CARDS (FROSTED GLASS) --- */}
          {/* Changed bg-black/40 to bg-white/5 for visibility */}
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors shadow-lg">
              <div className="flex justify-between text-white/60 mb-2">
                  <Clock size={16} />
                  <span className="text-[10px] font-mono uppercase">Duration</span>
              </div>
              <div>
                  <span className="text-3xl font-bold text-white drop-shadow-sm">{Math.floor(data.totalMinutes / 60)}</span>
                  <span className="text-sm text-white/60 ml-1">hrs</span>
                  <span className="text-xl font-bold text-white ml-2">{data.totalMinutes % 60}</span>
                  <span className="text-sm text-white/60 ml-1">min</span>
              </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors shadow-lg">
              <div className="flex justify-between text-white/60 mb-2">
                  <Music size={16} />
                  <span className="text-[10px] font-mono uppercase">Volume</span>
              </div>
              <div>
                  <span className="text-3xl font-bold text-white drop-shadow-sm">{data.totalSongs.toLocaleString()}</span>
                  <p className="text-[10px] text-white/60 mt-1">Total tracks played</p>
              </div>
          </div>

           <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center justify-between relative overflow-hidden shadow-lg group">
              <div className="relative z-10">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Zap size={16} className="text-yellow-400" />
                      <span className="text-[10px] font-mono uppercase">Listener Class</span>
                  </div>
                  <div className="text-2xl font-bold text-white drop-shadow-sm">{data.timeOfDay}</div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-500/20 to-transparent group-hover:from-yellow-500/30 transition-all"></div>
          </div>


          {/* --- CHARTS (FROSTED GLASS) --- */}

          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl h-64 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-white/80 uppercase flex items-center gap-2">
                      <Activity size={14} /> 24H Activity
                  </h3>
              </div>
              <div className="flex-1 flex items-end gap-[2px] border-b border-white/10 pb-0 relative">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                      <div className="w-full h-px bg-white border-dashed"></div>
                      <div className="w-full h-px bg-white border-dashed"></div>
                  </div>
                  {hourly.map((val, i) => (
                      <div key={i} className="flex-1 group relative h-full flex items-end">
                          <div 
                              className="w-full bg-blue-500 hover:bg-blue-400 transition-all opacity-90 min-h-[2px] rounded-t-[1px] shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                              style={{ height: `${(val / maxHourly) * 100}%` }}
                          ></div>
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black/80 backdrop-blur-md text-[9px] px-2 py-1 rounded border border-white/20 whitespace-nowrap z-10">
                              {i}:00 • {val} plays
                          </div>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between text-[9px] text-white/40 mt-2 font-mono">
                  <span>00:00</span><span>12:00</span><span>23:59</span>
              </div>
          </div>

          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl h-64 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-white/80 uppercase flex items-center gap-2">
                      <TrendingUp size={14} /> Yearly Trend
                  </h3>
              </div>
              <div className="flex-1 flex items-end justify-between gap-2 border-b border-white/10 pb-0">
                  {monthly.map((m, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                          <div 
                              className="w-full max-w-[20px] bg-green-500 hover:bg-green-400 transition-all rounded-t-[2px] min-h-[2px] shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                              style={{ height: `${(m.count / maxMonthly) * 100}%` }}
                          ></div>
                          <span className="text-[8px] text-white/40 mt-2 font-mono uppercase">{m.month[0]}</span>
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 backdrop-blur-md p-2 rounded border border-white/20 z-20 min-w-[100px]">
                              <div className="text-[10px] text-gray-400">{m.month}</div>
                              <div className="text-xs font-bold text-white">{m.count} plays</div>
                              <div className="text-[9px] text-green-400 mt-1 truncate">Top: {m.topArtist || "-"}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* --- HEATMAP (FROSTED GLASS) --- */}
          
          <div className="md:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl overflow-x-auto shadow-lg">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-white/80 uppercase flex items-center gap-2">
                      <Calendar size={14} /> Consistency Graph
                  </h3>
                  <div className="text-[9px] text-white/40 flex items-center gap-1">
                      <span>Less</span>
                      <div className="w-2 h-2 bg-white/10"></div>
                      <div className="w-2 h-2 bg-green-500/30"></div>
                      <div className="w-2 h-2 bg-green-500/70"></div>
                      <div className="w-2 h-2 bg-green-400"></div>
                      <span>More</span>
                  </div>
              </div>
              
              <div className="flex gap-1 justify-between min-w-[600px]">
                  {renderHeatmap()}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopStats;