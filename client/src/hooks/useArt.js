import { useContext } from 'react';
import { ArtContext } from '../context/ArtContext.jsx';

/**
 * Custom hook to access ArtContext
 * Must be used within ArtProvider
 */
export const useArt = () => {
  const context = useContext(ArtContext);
  
  if (!context) {
    throw new Error('useArt must be used within ArtProvider');
  }
  
  return context;
};
