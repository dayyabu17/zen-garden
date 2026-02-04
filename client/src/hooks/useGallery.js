import { useState, useEffect, useCallback } from 'react';
import { getArtworks, deleteArtwork } from '../services/artService';

/**
 * Custom hook for managing gallery state and operations
 * @returns {Object} Gallery state and handlers
 */
export const useGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all artworks on mount
   */
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getArtworks();
        setArtworks(data);
      } catch (err) {
        setError(err.message || 'Failed to load artworks');
        console.error('Error fetching artworks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  /**
   * Delete an artwork by ID
   * @param {string} id - Artwork ID to delete
   */
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteArtwork(id);
      // Update local state after successful deletion
      setArtworks((prev) => prev.filter((artwork) => artwork._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete artwork');
      console.error('Error deleting artwork:', err);
      throw err;
    }
  }, []);

  return {
    artworks,
    isLoading,
    error,
    handleDelete,
  };
};
