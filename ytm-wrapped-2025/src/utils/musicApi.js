// src/utils/musicApi.js

// We use the public iTunes API - No Key Required!
const BASE_URL = 'https://itunes.apple.com/search';

// Fallback image (Vinyl Icon) if iTunes fails
const FALLBACK_IMAGE = "https://img.icons8.com/ios-filled/500/222222/vinyl-record.png";

export const fetchArtistImage = async (artistName) => {
  if (!artistName) return null;
  try {
    // Search for the artist's top album to get a high-quality cover
    const response = await fetch(`${BASE_URL}?term=${encodeURIComponent(artistName)}&entity=album&limit=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Get the 100x100 image but upgrade it to 600x600 for high res
      const lowResUrl = data.results[0].artworkUrl100;
      return lowResUrl.replace('100x100bb', '600x600bb'); 
    }
    return null;
  } catch (error) {
    console.warn(`iTunes API Error for ${artistName}:`, error);
    return null;
  }
};

export const fetchTrackImage = async (artistName, trackName) => {
  if (!trackName) return null;
  try {
    // Search for the specific track
    const searchTerm = `${artistName} ${trackName}`;
    const response = await fetch(`${BASE_URL}?term=${encodeURIComponent(searchTerm)}&entity=song&limit=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const lowResUrl = data.results[0].artworkUrl100;
      return lowResUrl.replace('100x100bb', '600x600bb');
    }
    
    // Fallback: If track not found, try just the artist image
    return await fetchArtistImage(artistName);
  } catch (error) {
    return FALLBACK_IMAGE;
  }
};