import mongoose from 'mongoose';
const { Schema } = mongoose;

const PathSchema = new Schema({
  points: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true }
    }
  ],
  color: { type: String, required: true },
  brushSize: { type: Number, required: true }
}, { _id: false });

const ArtSchema = new Schema({
  title: { 
    type: String, 
    default: 'Untitled Flow' 
  },
  paths: {
    type: [PathSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Art', ArtSchema);
