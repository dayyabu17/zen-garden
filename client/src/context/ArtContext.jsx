import { createContext, useState, useCallback } from 'react';
import { getArtworks, saveArtwork } from '../services/artService.js';

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all artworks from the database
   */
  const fetchArtworks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getArtworks();
      setArtworks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch artworks');
      console.error('Error fetching artworks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Save a new artwork and add it to the list
   */
  const createArtwork = useCallback(async (artworkData) => {
    try {
      setIsLoading(true);
      setError(null);
      const newArtwork = await saveArtwork(artworkData);
      setArtworks((prev) => [newArtwork, ...prev]);
      return newArtwork;
    } catch (err) {
      setError(err.message || 'Failed to save artwork');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Set the active artwork for replay/edit mode
   * @param {Object|null} artwork - The artwork to activate, or null to clear
   */
  const setActiveArt = useCallback((artwork) => {
    setActiveArtwork(artwork);
  }, []);

  const value = {
    // State
    artworks,
    selectedArtwork,
    activeArtwork,
    isLoading,
    error,
    
    // Actions
    fetchArtworks,
    createArtwork,
    setSelectedArtwork,
    setActiveArt,
  };

  return (
    <ArtContext.Provider value={value}>
      {children}
    </ArtContext.Provider>
  );
};
