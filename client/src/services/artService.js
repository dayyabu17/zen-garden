import axiosInstance from '../api/axios.js';

/**
 * Fetch all artworks from the database
 * @returns {Promise<Array>} Array of artwork objects
 */
export const getArtworks = async () => {
  try {
    const response = await axiosInstance.get('/art');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch artworks');
  }
};

/**
 * Save a new artwork to the database
 * @param {Object} data - Artwork data containing title and paths
 * @returns {Promise<Object>} Saved artwork object
 */
export const saveArtwork = async (data) => {
  try {
    const response = await axiosInstance.post('/art', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to save artwork');
  }
};
