import Art from '../models/Art.js';

// Get all saved artworks
export const getArt = async (req, res) => {
  try {
    const artworks = await Art.find().sort({ createdAt: -1 });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching artworks', 
      error: error.message 
    });
  }
};

// Save new artwork
export const saveArt = async (req, res) => {
  try {
    const { title, paths } = req.body;
    
    const newArt = new Art({
      title,
      paths
    });
    
    const savedArt = await newArt.save();
    res.status(201).json(savedArt);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error saving artwork', 
      error: error.message 
    });
  }
};
