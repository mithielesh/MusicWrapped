// src/utils/processor.js

export const processHistory = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const rawData = JSON.parse(event.target.result);
        const stats = analyzeData(rawData);
        resolve(stats);
      } catch (error) {
        reject("Invalid JSON file");
      }
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsText(file);
  });
};

// THE SANITIZER: Cleans up titles for better API matching
const cleanString = (str) => {
  if (!str) return "";
  return str
    .replace("Watched ", "") // Remove YouTube's prefix
    .replace(" - Topic", "")
    .replace("VEVO", "")
    .replace(/official video/gi, "")
    .replace(/official audio/gi, "")
    .replace(/lyrics/gi, "")
    // Remove text in parentheses/brackets non-greedily
    .replace(/[\(\[].*?[\)\]]/g, "") 
    .trim();
};

const analyzeData = (data) => {
  const YEAR = 2025;
  let totalSongs = 0;
  let totalMs = 0;
  
  const songStats = {}; 
  const artistCounts = {}; 
  const hourlyActivity = new Array(24).fill(0); // 0-23 hours
  
  // NEW: Monthly Breakdown (Jan-Dec)
  // Structure: [ { count: 0, artists: { 'Name': 5 } }, ... ]
  const monthlyRaw = new Array(12).fill(0).map(() => ({ count: 0, artists: {} }));

  // NEW: Calendar Heatmap Data
  const calendarData = {}; 

  data.forEach((entry) => {
    if (!entry.time) return;
    const date = new Date(entry.time);
    
    // YEAR FILTER
    if (date.getFullYear() !== YEAR) return;

    // MUSIC FILTER: Only keep music-related entries
    const isMusicService = entry.header === 'YouTube Music';
    const isMusicUrl = entry.titleUrl && entry.titleUrl.includes('music.youtube.com');
    const hasArtist = entry.subtitles && entry.subtitles.length > 0;

    if (!isMusicService && !isMusicUrl && !hasArtist) return;
    if (entry.title === "Watched a video that has been removed") return;

    // 1. CLEAN DATA
    let title = cleanString(entry.title);
    
    let artist = "Unknown Artist";
    if (entry.subtitles && entry.subtitles.length > 0) {
      artist = cleanString(entry.subtitles[0].name);
    }

    // 2. AGGREGATE STATS
    totalSongs++;
    
    // Unique ID: Title + Artist
    const uniqueId = `${title}|||${artist}`;
    
    if (!songStats[uniqueId]) {
      songStats[uniqueId] = { title, artist, count: 0 };
    }
    songStats[uniqueId].count++;
    
    // Track Artist Count
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;

    // Track Hourly Activity
    hourlyActivity[date.getHours()]++;

    // Estimate Time (3.5 mins per song)
    totalMs += 210000;

    // --- NEW LOGIC FOR TRENDS ---

    // A. Monthly Aggregation
    const monthIndex = date.getMonth(); // 0 = Jan
    monthlyRaw[monthIndex].count++;
    const currentMonthArtists = monthlyRaw[monthIndex].artists;
    currentMonthArtists[artist] = (currentMonthArtists[artist] || 0) + 1;

    // B. Calendar Data (YYYY-MM-DD)
    const dayKey = date.toISOString().split('T')[0];
    calendarData[dayKey] = (calendarData[dayKey] || 0) + 1;
  });

  // 3. POST-PROCESS MONTHLY STATS
  const monthlyStats = monthlyRaw.map((m, index) => {
    // Find top artist for this month
    let topArtist = "N/A";
    let maxPlays = 0;
    
    Object.entries(m.artists).forEach(([art, count]) => {
      if (count > maxPlays) {
        maxPlays = count;
        topArtist = art;
      }
    });

    return { 
      month: new Date(0, index).toLocaleString('default', { month: 'short' }), 
      count: m.count, 
      topArtist 
    };
  });

  // 4. SORT & RANK TOP LISTS
  const topSongs = Object.values(songStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(s => ({ name: s.title, artist: s.artist, count: s.count }));

  const topArtists = Object.entries(artistCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) 
    .map(([name, count]) => ({ name, count }));

  // 5. DETERMINE "VIBE" (Time of Day)
  const maxHour = hourlyActivity.indexOf(Math.max(...hourlyActivity));
  let timeOfDay = "Night Owl 🦉";
  if (maxHour >= 5 && maxHour < 12) timeOfDay = "Morning Bird";
  if (maxHour >= 12 && maxHour < 17) timeOfDay = "Afternoon Vibe";
  if (maxHour >= 17 && maxHour < 22) timeOfDay = "Evening Chiller";

  return {
    year: YEAR,
    totalSongs,
    totalMinutes: Math.floor(totalMs / 60000),
    topSongs,
    topArtists,
    hourlyActivity,
    timeOfDay,
    monthlyStats, // Added for Trends Tab
    calendarData  // Added for Heatmap
  };
};